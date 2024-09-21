export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const testEnvironment = 'jsdom';
export const moduleNameMapper = {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
};