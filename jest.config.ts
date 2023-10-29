import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app';
const baseTestDir = '<rootDir>/src/tests';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
  testPathIgnorePatterns: [
    "/node_modules/",
    `${baseDir}/@types`
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    `${baseDir}/@types`
  ]
};

export default config;
