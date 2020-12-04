module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/controllers/**", "src/models/**", "src/repositories/**", "src/services/**"],
  coverageDirectory: "coverage",
  modulePaths: ["<rootDir>/src/"],
  testEnvironment: "node",
  testMatch: ["**/__test__/**/*.test.ts?(x)"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
