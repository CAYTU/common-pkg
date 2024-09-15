/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // Should ignore the following files
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
};
