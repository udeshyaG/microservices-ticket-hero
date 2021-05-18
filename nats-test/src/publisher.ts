import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS Streaming Server');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({ id: '123', title: 'TIcket Title', price: 500 });
  } catch (err) {
    console.error(err);
  }
});
