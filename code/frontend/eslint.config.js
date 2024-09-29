// eslint.config.js

import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import jest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
    },
    rules: {
      // Include recommended rules
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      // Override specific rules
      'react/react-in-jsx-scope': 'off',
      'jest/no-commented-out-tests': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];