const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/'}),
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/database/*.ts',
    '!src/database/migrations/*.ts',
    '!src/*.ts',
    '!src/@types/*.ts'
  ],
  testEnvironment: "node",
};
