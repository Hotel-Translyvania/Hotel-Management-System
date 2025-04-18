import type { Config } from "jest";

const config: Config = {
  // Test environment
  testEnvironment: "jsdom",

  // Clear mocks between tests
  clearMocks: true,

  // Coverage settings
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // File extensions
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Path aliases (matches Vite/TS config)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
  },

  // Test file patterns
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // Transform settings
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Ignore patterns
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.vite/"],

  // TypeScript support
  preset: "ts-jest/presets/js-with-ts",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig: true,
    },
  },
};

export default config;
