const express = require('express');

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Handler para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.name || 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  };
  
  res.status(statusCode).json(response);
});

module.exports = app;
