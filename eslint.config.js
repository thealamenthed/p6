import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules", "dist"], // Ignore les dossiers non pertinents
  },
  {
    languageOptions: {
      ecmaVersion: "latest", // Supporte les dernières versions de JavaScript
      sourceType: "module",
    },
    plugins: {
      eslint: js,
    },
    rules: {
      "no-unused-vars": "warn", // Avertissement sur les variables inutilisées
      "no-console": "off", // Autoriser les console.log()
    },
  },
];
