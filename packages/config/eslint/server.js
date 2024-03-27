module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "../../../apps/sync/tsconfig.json",
      "../../../packages/database/tsconfig.json",
      "../../../packages/shared/tsconfig.json",
    ],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
        moduleDirectory: ["node_modules", "./"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-extraneous-class": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enum",
        format: ["UPPER_CASE"],
      },
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    curly: "error",
  },
};
