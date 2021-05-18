import request from 'supertest';
import { app } from '../../app';

it('Fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(400);
});

it('Fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'nice@try.com',
      password: 'password1234',
    })
    .expect(400);
});

it('Correct Signin credentials responds with a cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
