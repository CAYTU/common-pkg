/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testTimeout: 70000,
    testEnvironment: "node",
    setupFilesAfterEnv: ["./src/test/setup.ts"],
  };