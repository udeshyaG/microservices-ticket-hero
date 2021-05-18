import { Publisher, PaymentCreatedEvent, Subjects } from '@ticket-hero/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
