module.exports = {
  parserOptions: {
    project: ["../../../apps/web/tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: [".*.js", "*.cjs", "node_modules/"],
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
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
        ],
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
