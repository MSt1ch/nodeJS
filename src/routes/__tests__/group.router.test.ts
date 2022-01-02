import app from '../../app';
import request from 'supertest';
import {OK, UNAUTHORIZED, CREATED, NO_CONTENT} from 'http-status';

import {Group} from 'types/group';

describe('/api/groups', () => {
  let token: string | null = null;
  let group: Group | null = null;
  let createdGroup: Group | null = null;

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

  it('GET request groups with valid JWT token and return 200 status code', async () => {
    const res = await request(app)
        .get('/api/groups')
        .set('x-access-token', token as string)
        .send();

    group = JSON.parse(res.text)[0];

    expect(res.statusCode).toEqual(OK);
  });

  it('GET request group without valid JWT token and return 404 status code', async () => {
    const res = await request(app)
        .get(`/api/groups/${group.id as string}`)
        .send();

    expect(res.statusCode).toEqual(UNAUTHORIZED);
  });

  it('GET request group with valid JWT token and return 200 status code', async () => {
    const res = await request(app)
        .get(`/api/groups/${group.id as string}`)
        .set('x-access-token', token as string)
        .send();

    expect(res.statusCode).toEqual(OK);
  });

  it('PUT request group with valid JWT token and return 200 status code and changing age', async () => {
    const requestData = {...group, name: 'newName'};
    delete requestData.id;
    const res = await request(app)
        .put(`/api/groups/${group.id as string}`)
        .set('x-access-token', token as string)
        .send(requestData);

    expect(res.statusCode).toEqual(OK);
    expect(JSON.parse(res.text).name).toEqual(requestData.name);
  });

  it('POST request group with valid JWT token and return 201 status code', async () => {
    const requestData = {
      'name': 'group',
      'permissions': [
        'READ',
      ],
    };

    const res = await request(app)
        .post('/api/groups')
        .set('x-access-token', token as string)
        .send(requestData);

    createdGroup = JSON.parse(res.text);
    expect(res.status).toEqual(CREATED);
  });

  it('DELETE request group with valid JWT token and return 204 status code', async () => {
    const res = await request(app)
        .delete(`/api/groups/${createdGroup.id as string}`)
        .set('x-access-token', token as string)
        .send();

    expect(res.statusCode).toEqual(NO_CONTENT);
  });
});
