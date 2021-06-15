module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: 'tsconfig.json'
  },
  rules: {
    'no-var': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'error',
    'no-promise-executor-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-useless-backreference': 'error',
    'require-atomic-updates': 'error',
    'no-alert': 'error',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error'
  },
  ignorePatterns: [
    '.next',
    'coverage',
    'node_modules',
    'next.config.js',
    'jest.config.js',
    'cypress/plugins/index.js',
    'public/mockServiceWorker.js'
  ],
  overrides: [
    {
      files: ['**/src/**/*.test.[t]s?(x)'],
      env: {
        jest: true
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react'
      ]
    },
    {
      files: ['**/cypress/**/*.[jt]s'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        project: 'cypress/tsconfig.json'
      }
    }
  ]
};
