module.exports = {
    rootDir: "src",
    moduleFileExtensions: ["js", "json", "ts"],
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/$1"
    },
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    preset: "ts-jest"
  };
  