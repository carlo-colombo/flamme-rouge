import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  functional.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      functional,
    },
    rules: {
      'functional/no-expression-statements': [
        'error',
        {
          ignoreCodePattern: [
            '^console\\..*',
            '^process\\.exit.*',
            '^expect\\(.*',
            '^it\\(.*',
            '^describe\\(.*',
            '^beforeEach\\(.*',
            '^afterEach\\(.*',
          ],
        },
      ],
      'functional/immutable-data': 'error',
      'functional/no-let': 'error',
      'functional/no-this-expressions': 'error',
      'functional/no-classes': 'error',
      'functional/no-mixed-types': 'error',
      'functional/prefer-readonly-type': 'error',
      'functional/functional-parameters': 'off',
      'functional/prefer-immutable-types': 'off',
      'functional/no-conditional-statements': 'error', // Bring back as it was in TSLint (no-if-statement)
    },
  },
  {
    files: ['**/*.spec.ts', '**/test/**/*.ts'],
    rules: {
      'functional/no-expression-statements': 'off',
      'functional/no-return-void': 'off',
    },
  }
);
