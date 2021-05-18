import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@ticket-hero/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
