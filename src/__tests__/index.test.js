const supertest = require('supertest');
const app = require('../server');

describe('GET /parties', () => {
  let result;

  describe('when no query params are provided', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return an array of all parties', () => {
      expect(result.body.length).toBeGreaterThan(0);
    });
  });

  describe('when a location param is provided', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties?location=granada')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return an array of all parties in the specified location', () => {
      expect(result.body.every((party) => party.location === 'granada')).toBe(true);
    });
  });

  describe('when a day param is provided', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties?day=wednesday')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return an array of that includes all parties that take place on the specified day and any that take place every day', () => {
      expect(result.body.every((party) => party.day === 'wednesday' || party.day === 'every day')).toBe(true);
    });
  });

  describe('when both a location param and a day param are provided', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties?location=granada&day=wednesday')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return an array of that includes all parties in the specified location that take place on the specified day or every day', () => {
      expect(result.body.every((party) => party.location === 'granada' && (party.day === 'wednesday' || party.day === 'every day'))).toBe(true);
    });
  });

  describe('when no matching parties exist', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties?location=granada&day=monday')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return an empty array', () => {
      expect(result.body).toEqual([]);
    });
  });

  describe('when an invalid param name is provided', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties?invalid_param=granada')
        .send();
    });

    it('should return a 400 status code', () => {
      expect(result.statusCode).toBe(400);
    });

    it('should return an error message', () => {
      expect(result.body).toEqual({
        error: 'Invalid query parameter(s): invalid_param',
      });
    });
  });
});

describe('GET /parties/:party', () => {
  let result;

  describe('when party does exist', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties/sunday-funday')
        .send();
    });

    it('should return a 200 status code', () => {
      expect(result.statusCode).toBe(200);
    });

    it('should return the correct party data', () => {
      expect(result.body).toEqual(expect.objectContaining(
        {
          name: 'Sunday Funday',
          day: 'sunday',
          location: 'san juan del sur',
          organising_venue: 'Pachamama Hostel',
          instagram: 'sundayfunday_poolcrawl',
        },
      ));
    });
  });

  describe('when party does not exist', () => {
    beforeAll(async () => {
      const request = supertest(app);

      result = await request
        .get('/parties/invalid-party')
        .send();
    });

    it('should return a 404 status code', () => {
      expect(result.statusCode).toBe(404);
    });

    it('should return an error message', () => {
      expect(result.body).toEqual({ error: 'Party not found' });
    });
  });
});

describe('when an invalid route is entered', () => {
  let result;

  beforeAll(async () => {
    const request = supertest(app);

    result = await request
      .get('/invalid-route')
      .send();
  });

  it('should return a 404 status code', () => {
    expect(result.statusCode).toBe(404);
  });

  it('should return an error message', () => {
    expect(result.body).toEqual({ error: 'Route not found' });
  });
});
