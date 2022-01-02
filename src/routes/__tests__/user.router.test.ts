import app from '../../app';
import request from 'supertest';
import {OK, UNAUTHORIZED, CREATED, NO_CONTENT} from 'http-status';
import {User} from 'types/user';

describe('/api/users', () => {
  let token: string | null = null;
  let user: User | null = null;
  let createdUser: User | null = null;

  beforeAll((done) => {
    jest.setTimeout(10000);
    request(app).post('/api/login').send({
      'login': 'superAdmin',
      'password': 'sadmin5432',
    }).end((err, res) => {
      token = res.text;
      done();
    });
  });

  it('GET request users with valid JWT token and return 200 status code', async () => {
    const res = await request(app)
        .get('/api/users')
        .set('x-access-token', token as string)
        .send();

    user = JSON.parse(res.text)[1];

    expect(res.statusCode).toEqual(OK);
  });

  it('GET request user without valid JWT token and return 404 status code', async () => {
    const res = await request(app)
        .get(`/api/users/${user.id as string}`)
        .send();

    expect(res.statusCode).toEqual(UNAUTHORIZED);
  });

  it('GET request user with valid JWT token and return 200 status code', async () => {
    const res = await request(app)
        .get(`/api/users/${user.id as string}`)
        .set('x-access-token', token as string)
        .send();

    expect(res.statusCode).toEqual(OK);
  });

  it('PUT request user with valid JWT token and return 200 status code and changing age', async () => {
    const requestData = {...user, age: 100};
    delete requestData.id;
    const res = await request(app)
        .put(`/api/users/${user.id as string}`)
        .set('x-access-token', token as string)
        .send(requestData);

    expect(res.statusCode).toEqual(OK);
    expect(JSON.parse(res.text).age).toEqual(requestData.age);
  });

  it('POST request user with valid JWT token and return 201 status code', async () => {
    const requestData = {
      'login': 'newUser',
      'password': '1231w',
      'age': 50,
    };

    const res = await request(app)
        .post('/api/users')
        .set('x-access-token', token as string)
        .send(requestData);

    createdUser = JSON.parse(res.text);
    expect(res.status).toEqual(CREATED);
  });

  it('DELETE request user with valid JWT token and return 204 status code', async () => {
    const res = await request(app)
        .delete(`/api/users/${createdUser.id as string}`)
        .set('x-access-token', token as string)
        .send();

    expect(res.statusCode).toEqual(NO_CONTENT);
  });
});
