module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js' // Excluir arquivo de inicialização da cobertura
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
