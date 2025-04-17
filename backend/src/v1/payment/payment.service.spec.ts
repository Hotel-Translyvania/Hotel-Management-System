import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Booking } from '../../common/entities/booking.entity';
import { Transaction } from '../../common/entities/transaction.entity';
import { EmailService } from '../../common/services/email.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as StripeModule from 'stripe';

process.env.STRIPE_SECRET_KEY = 'sk_test_123'; // Use valid test key format
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';

describe('PaymentService', () => {
    let service: PaymentService;
    let bookingRepository: Repository<Booking>;
    let transactionRepository: Repository<Transaction>;
    let emailService: EmailService;

    const mockBookingRepository = {
        findOne: jest.fn(), // Add findOne method
    };
    const mockTransactionRepository = { /* ... */ };
    const mockEmailService = { /* ... */ };

    // Mock Stripe instance methods
    const mockStripe = {
        checkout: {
            sessions: {
                create: jest.fn(),
            },
        },
    };


    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentService,
                {
                    provide: getRepositoryToken(Booking),
                    useValue: mockBookingRepository,
                },
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: mockTransactionRepository,
                },
                {
                    provide: EmailService,
                    useValue: mockEmailService,
                },
                {
                    provide: StripeModule.Stripe,
                    useValue: mockStripe, // Inject mock Stripe instance
                },
            ],
        }).compile();

        service = module.get<PaymentService>(PaymentService);
        bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
        transactionRepository = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        emailService = module.get<EmailService>(EmailService);
    });

    describe('createCheckoutSession', () => {
        it('should create a checkout session successfully', async () => {
            // Mock Stripe instance method
            mockStripe.checkout.sessions.create.mockResolvedValue({ url: 'https://stripe.com/session' });
            // ... rest of the test
        });
    });

            // Removed as mockStripe.webhooks does not exist
        it('should process a valid webhook event', async () => {
            const mockEvent = { type: 'checkout.session.completed', data: { object: { metadata: { bookingId: 'test-id' } } } };
            // Mock static method
            jest.spyOn(StripeModule.Stripe.webhooks, 'constructEvent').mockReturnValue(mockEvent as any);
            // ... rest of the test
        });

        it('should throw NotFoundException if booking is not found', async () => {
            const mockEvent = { type: 'checkout.session.completed', data: { object: { metadata: { bookingId: 'invalid-id' } } } };
            (StripeModule.Stripe.webhooks.constructEvent as jest.Mock).mockReturnValue(mockEvent);
            mockBookingRepository.findOne = jest.fn().mockResolvedValue(null);
            await expect(service.handleWebhook('raw-body', 'signature')).rejects.toThrow(NotFoundException);
        });
    });

