import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('Returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'nicetry',
      password: 'password',
    })
    .expect(400);
});

it('Returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: '1',
    })
    .expect(400);
});

it('Returns a 400 with an missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
    })
    .expect(400);
});

it('Disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(400);
});

it('Sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'nice@try.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
