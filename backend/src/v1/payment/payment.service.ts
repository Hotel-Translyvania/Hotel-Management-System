// payment.service.ts
import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Transaction } from 'src/common/entities/transaction.entity';
import { EmailService } from 'src/common/services/email.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private emailService: EmailService,
  ) {
    // Initialize Stripe with your secret key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  /**
   * Create a Stripe Checkout Session for a booking payment.
   */
  async createCheckoutSession(
    bookingId: string,
    price: number,
    currency: string,
  ): Promise<{ success: boolean; sessionUrl: string; errorMessage?: string }> {
    // Retrieve the booking details for validation
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['guest'],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    try {
      // Create a Stripe Checkout session
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: `Payment for booking ${bookingId}`,
              },
              unit_amount: price, // Price in smallest currency unit (e.g., cents)
            },
            quantity: 1,
          },
        ],
        metadata: {
          bookingId, // Pass the correct bookingId here
        },
        success_url: `${process.env.FRONTEND_SUCCESS_URL}`,
        cancel_url: `${process.env.FRONTEND_FAILURE_URL}`,
      });
      console.log('Stripe session created:', session);
      return {
        success: true,
        sessionUrl: session.url ?? '',
      };
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        this.logger.error('Stripe error occurred', error);
        throw new InternalServerErrorException('Problem with Stripe server');
      }
      this.logger.error('Unexpected error occurred', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the checkout session.',
      );
    }
  }

  async handleWebhook(rawBody: string, signature: string): Promise<string> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new InternalServerErrorException('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
    }
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      this.logger.error('Webhook signature verification failed.', err);
      throw new InternalServerErrorException('Webhook signature verification failed.');
    }
    // Process the event based on its type
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata) {
        throw new InternalServerErrorException('Session metadata is null');
      }
      const bookingId = session.metadata.bookingId;
      const booking = await this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['guest'],
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      // Update your transaction table
      const transaction = this.transactionRepository.create({
        booking,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        status: 'success',
        paymentIntentId: session.payment_intent as string,
      });
      await this.transactionRepository.save(transaction);
  
      // Update the booking status to "paid"
      await this.bookingRepository.update(bookingId, { bookingStatus: 'paid' });
  
      // Optionally, send a confirmation email to the user
      const mybooking = await this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['guest'],
      });
      console.log("mybooking", mybooking?.guest.email);
      if (mybooking && mybooking.guest.email) {
        await this.emailService.sendPaymentConfirmation(
          mybooking.guest.email,
          bookingId,
          session.amount_total ?? 0,
        );
      }
    }
    return 'Received webhook';
  }

}
