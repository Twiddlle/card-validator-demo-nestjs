import { HttpServer, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createApp } from '../src/app';

describe('AppController (e2e)', () => {
  let testingNestApp: INestApplication;
  let httpserver: HttpServer;

  beforeAll(async () => {
    testingNestApp = await createApp();
    await testingNestApp.init();
    httpserver = testingNestApp.getHttpServer();
  });

  it('/ (GET)', () => {
    return request(httpserver).get('/v1/').expect(200).expect('Hello World!');
  });

  it('/ should fail with auth error', async () => {
    const res: any = await request(httpserver).get(
      '/v1/cards/info/1234-5489-7896-4587',
    );
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('/ should return card info', async () => {
    const res: any = await request(httpserver)
      .get('/v1/cards/info/1234-5489-7896-4587')
      .set('x-api-key', 'not-secret-key');

    expect(res.status).toBe(200);
    expect(res.body.state).toBe('Aktivní v držení klienta');
    expect(res.body.expireAt).toBe('12.8.2020');
  });
});
