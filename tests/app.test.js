const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return Hello World message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello World' });
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('GET /health', () => {
    it('should return health check information', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(typeof response.body.uptime).toBe('number');
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(app).get('/health');
      const timestamp = new Date(response.body.timestamp);
      
      expect(timestamp.toString()).not.toBe('Invalid Date');
    });
  });

  describe('GET /unknown-route', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message', 'Route not found');
      expect(response.body).toHaveProperty('path', '/unknown-route');
    });
  });
});

describe('Middleware', () => {
  describe('JSON Parsing', () => {
    it('should accept JSON content type', async () => {
      // Valida que o middleware JSON está configurado verificando o content-type
      const response = await request(app)
        .get('/')
        .set('Accept', 'application/json');
      
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('Error Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
