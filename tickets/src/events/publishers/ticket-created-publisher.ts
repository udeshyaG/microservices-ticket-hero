import { Publisher, Subjects, TicketCreatedEvent } from '@ticket-hero/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
