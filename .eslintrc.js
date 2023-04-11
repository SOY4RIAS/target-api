
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "plugin:sonarjs/recommended"
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "single", "multiple"]
    }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never",
      }
    ],
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies":[
      "error",
      {
         "devDependencies":[
            "**/*.spec.ts",
            "test/**/*",
         ]
      }
    ]
  },
};
