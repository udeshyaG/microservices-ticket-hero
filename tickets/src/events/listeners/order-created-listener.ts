import { Listener, OrderCreatedEvent, Subjects } from '@ticket-hero/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //  Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //  If no ticket then throw error
    if (!ticket) {
      throw new Error('Ticket not Found');
    }

    // Mark the ticket as being reserved by setting orderId property
    ticket.set({ orderId: data.id });
    await ticket.save();

    // Publish the ticket updated event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });

    // Ack the message
    msg.ack();
  }
}
