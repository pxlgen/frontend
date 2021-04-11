module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "no-undef": "off", // typescript handles undefined
    "react/jsx-uses-react": "off", // not needed with react 17
    "react/react-in-jsx-scope": "off", // not needed with react 17
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreIIFE: true,
        ignoreVoid: true,
      },
    ],
  },
  settings: {
    react: {
      version: "latest",
    },
  },
  ignorePatterns: [".eslintrc.js", "next.config.js", "tailwind.config.js", "postcss.config.js", "pages/_app.js"],
};
