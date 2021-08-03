module.exports = {
  env: { browser: true, es6: true, node: true },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 0, // _id 쓰게함
  },
};
