module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ensure this file exists

  // Add support for resolving modules from 'src'
  moduleDirectories: ['node_modules', 'src'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',      // TypeScript files
    '^.+\\.jsx?$': 'babel-jest',   // JS/JSX files
  },

  transformIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    // Style and image files
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // Custom mock for a library (optional)
    '^react-chartjs-2$': '<rootDir>/src/__mocks__/react-chartjs-2.js',

    // Path alias handling for "@/..."
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  clearMocks: true,
  coverageDirectory: 'coverage',
};
