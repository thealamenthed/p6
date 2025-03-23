import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        fetch: "readonly",
        console: "readonly",
        URLSearchParams: "readonly",
        setTimeout: "readonly",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "warn",
      "import/named": "warn",
      "import/default": "warn",
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
        },
      ],
      "no-undef": "off", // Désactive l'erreur pour les variables non définies
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js"],
        },
      },
    },
  },
];
