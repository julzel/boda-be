module.exports = {
  // Sets the testing environment to Node
  testEnvironment: 'node',

  // Ignore node_modules for test coverage and testing
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/coverage/'],

  // Other Jest configurations
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
};
