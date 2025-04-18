import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createCheckoutSession: jest.fn(),
            handleWebhook: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>(PaymentService);
  });
  

  describe('initiatePayment', () => {
    it('should call createCheckoutSession with correct parameters and return the result', async () => {
      const bookingId = '12345';
      const initiatePaymentDto = { price: 100, currency: 'USD' };
      const mockResponse = { success: true, sessionUrl: 'https://checkout.stripe.com/session/12345' };

      jest.spyOn(paymentService, 'createCheckoutSession').mockResolvedValue(mockResponse);

      const result = await paymentController.initiatePayment(bookingId, initiatePaymentDto);

      expect(paymentService.createCheckoutSession).toHaveBeenCalledWith(
        bookingId,
        initiatePaymentDto.price,
        initiatePaymentDto.currency,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});