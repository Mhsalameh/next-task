import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	collectCoverage: true,
	coverageDirectory: 'coverage/jest',
	coverageReporters: ['lcov', 'text'],
	coverageThreshold: {
		global: {
			// Initially we do not require specific coverage
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	// testMatch: ['**/src/**/?(*.)+(test).ts?(x)', '**/server/**/?(*.)+(test).ts?(x)'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
