import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts'],
  coveragePathIgnorePatterns: ['main', 'mongodb/helper', 'protocols'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}

export default config
