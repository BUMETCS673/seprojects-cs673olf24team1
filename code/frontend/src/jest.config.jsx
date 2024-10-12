export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const testEnvironment = 'jsdom';
export const moduleNameMapper = {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
};

export const moduleFileExtensions = [
    'js', // Include JavaScript files
    'jsx', // Include JSX files
    'ts', // Include TypeScript files
    'tsx', // Include TSX files
    'json', // Include JSON files
    'node', // Include Node files
];

// Nat: adding a transformIgnorePatterns configuration to your Jest config file 
export const transformIgnorePatterns = [
    'node_modules/(?!(axios)/)' // Ignore all node_modules except axios
];

export const transform = {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest to transform .js/.jsx files
};