import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app';
const baseTestDir = '<rootDir>/src/tests';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/docker-app_data-pc-host/',
    `${baseDir}/@types`,
    `${baseDir}/repositories/prisma.ts`,
    `${baseDir}/repositories/`,
    `${baseDir}/services/external`,
    `${baseDir}/routes`,
    `${baseDir}/controllers`,
    `${baseDir}/middlewares`,
    `${baseDir}/auth`,
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    `${baseDir}/@types`,
    `${baseDir}/repositories/`,
    `${baseDir}/repositories/prisma.ts`,
    `${baseDir}/services/external`,
    `${baseDir}/routes`,
    `${baseDir}/controllers`,
    `${baseDir}/middlewares`,
    `${baseDir}/auth`,
  ],
};

export default config;
