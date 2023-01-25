import app from '../app.js';
import request from 'supertest';

describe('GET /movie', () => {
  it('when full movie list requested, response is correct', async () => {
    const response = await request(app).get('/movie').send();
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.movies).toBeDefined();
    expect(Array.isArray(response.body.movies)).toBe(true);
  });
  it('when a movie requested with an existing id, response is correct', async () => {
    const id = 2;
    const response = await request(app).get(`/movie/${id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBeDefined();
    expect(response.body.director).toBeDefined();
    expect(response.body.release_date).toBeDefined();
  });
  it('when a movie requested with wrong id, response contains error message', async () => {
    const id = 100;
    const response = await request(app).get(`/movie/${id}`).send();
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.serverMessage).toContain('ERROR');
  });
});

describe('POST /movie', () => {
  it('when passed a correct request, a response contains required body in JSON and correct status code', async () => {
    const title = 'New movie';
    const director = 'New director';
    const release_date = '2023-01-25';
    const response = await request(app).post('/movie').send({
      title: title,
      director: director,
      release_date: release_date,
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.id).toBeDefined();
  });
  it('when passed a request with wrong fields, a response contains error message', async () => {
    const id = '100';
    const title = 'New movie';
    const director = 'New director';
    const release_data = '2023-01-25';
    const response = await request(app).post('/movie').send({
      id: id,
      title: title,
      director: director,
      wrong_field: release_data,
    });
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.serverMessage).toContain('ERROR');
  });
});

describe('DELETE /movie', () => {
  it('when passed a correct request, a response contains required body in JSON and correct status code', async () => {
    const id = 2;
    const response = await request(app).delete(`/movie/${id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.serverMessage).toBeDefined();
  });
  it('when passed a request with wrong fields, a response contains error message', async () => {
    const id = 100;
    const response = await request(app).delete(`/movie/${id}`).send();
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.body.serverMessage).toContain('ERROR');
  });
});
