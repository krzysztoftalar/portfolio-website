module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: ['@typescript-eslint', 'react', 'import'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 0,
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                singleQuote: true,
                printWidth: 80,
                semi: true,
            },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    'sibling',
                    'parent',
                    'index',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
};
