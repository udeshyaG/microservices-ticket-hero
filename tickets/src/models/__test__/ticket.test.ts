import { Ticket } from '../ticket';

it('Implements optimistic concurrency control', async (done) => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'Nice Ticket',
    price: 500,
    userId: 'randomId123',
  });

  // Save the ticket to db
  await ticket.save();

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Save the first ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('Increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'nice title',
    price: 50,
    userId: 'randomid123',
  });
  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
