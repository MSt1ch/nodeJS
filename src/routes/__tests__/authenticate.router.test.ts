import app from '../../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import {OK, UNAUTHORIZED, BAD_REQUEST} from 'http-status';

describe('/api/login', () => {
  jest.setTimeout(10000);

  it('return 200 status and verify JWT token expiration time', async () => {
    const res = await request(app).post('/api/login').send({
      'login': 'superAdmin',
      'password': 'sadmin5432',
    });

    const token = res.text;

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoder) => {
      expect((decoder.exp as number) - (decoder.iat as number )).toEqual(200);
    });

    expect(res.statusCode).toEqual(OK);
  });

  it('wrong credentials return 401 status', async () => {
    const res = await request(app).post('/api/login').send({
      'login': 'superAdmin',
      'password': 'sadmin54322',
    });

    expect(res.statusCode).toEqual(UNAUTHORIZED);
    expect(res.body.message).toEqual('Bad username/password combination.');
  });

  it('request without body return 400 status', async () => {
    const res = await request(app).post('/api/login').send();

    expect(res.statusCode).toEqual(BAD_REQUEST);
  });
});
