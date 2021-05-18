import { Publisher, Subjects, OrderCancelledEvent } from '@ticket-hero/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
