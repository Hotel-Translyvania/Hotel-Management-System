// setupTests.js
import '@testing-library/jest-dom';

// Enable jest-fetch-mock for mocking fetch API calls
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

// Polyfill for ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};