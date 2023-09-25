const supertest = require('supertest');
const app = require('../server');

describe('health check', () => {
  let result;

  beforeAll(async () => {
    const request = supertest(app);

    result = await request
      .get('/health-check')
      .send();
  });

  it('should return a 200 status code', () => {
    expect(result.statusCode).toBe(200);
  });

  it('should return a message', () => {
    expect(result.text).toBe('Up and running...');
  });
});
