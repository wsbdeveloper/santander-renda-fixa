/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ["**/**/*.test.ts"],
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"] ,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
