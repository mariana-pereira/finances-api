const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>'}),
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**.js'],
  testEnvironment: "node",
};
