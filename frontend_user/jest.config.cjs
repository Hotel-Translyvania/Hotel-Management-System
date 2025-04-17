// jest.config.cjs
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ensure this path is correct

  // Explicitly tell Jest where to find modules
  moduleDirectories: ['node_modules', 'src'], // Add 'src' if you have local modules/utils

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Tell Jest NOT to transform things in node_modules by default
  // This can prevent Babel from interfering with how libraries expect to be loaded
  transformIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^react-chartjs-2$': '<rootDir>/src/__mocks__/react-chartjs-2.js', // Adjust path if needed
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  clearMocks: true,
  coverageDirectory: 'coverage',
};