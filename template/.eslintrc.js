module.exports = {
  extends: [
    '@jrock2004/eslint-config',
    'react-app',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'react/jsx-sort-default-props': ['error', { ignoreCase: true }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        sortShapeProp: true,
      },
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': ['warn'],
    'react/prop-types': 0,
  },
};
