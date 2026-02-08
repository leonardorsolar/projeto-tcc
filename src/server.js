const app = require('./app');

// Validação e configuração do ambiente
const NODE_ENV = process.env.NODE_ENV || 'development';
if (!['development', 'production', 'test'].includes(NODE_ENV)) {
  console.warn(`Warning: Invalid NODE_ENV '${NODE_ENV}', defaulting to 'development'`);
}

// Validação e configuração da porta
const PORT = parseInt(process.env.PORT, 10) || 3000;
if (isNaN(PORT) || PORT < 0 || PORT > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

// Inicialização do servidor
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`${signal} received, closing server gracefully...`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Força encerramento após 10 segundos
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
