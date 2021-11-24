module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "json",
    "prettier",
    "import",
    "@typescript-eslint",
    "unused-imports",
    "css-modules",
  ],
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
    "airbnb",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:css-modules/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },

  rules: {
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        fixToUnknown: true,
        ignoreRestArgs: false,
      },
    ],
    // "@typescript-eslint/no-use-before-define": "0",
    "@typescript-eslint/explicit-module-boundary-types": "off", // TODO: should be turned on?
    "require-await": "error",
    "react/function-component-definition": "off",
    "no-use-before-define": "off",
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/destructuring-assignment": 0,
    // "react/jsx-max-props-per-line": [1, { maximum: 1 }], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
    // "react/jsx-first-prop-new-line": [1, "multiline"], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-curly-newline": 0, // it conflicts with prettier
    "react/jsx-wrap-multilines": ["error", { arrow: true, return: true, declaration: true }],
    "jsx-a11y/tabindex-no-positive": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "spaced-comment": ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    "no-underscore-dangle": 0,
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-alert": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-plusplus": 0,
    "import/no-named-as-default": 0,
    "class-methods-use-this": 0,
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 2,
        comments: 1000,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: ["./tsconfig.json"],
      },
    },
  },
};
