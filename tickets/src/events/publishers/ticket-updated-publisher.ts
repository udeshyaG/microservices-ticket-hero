import { Publisher, Subjects, TicketUpdatedEvent } from '@ticket-hero/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
