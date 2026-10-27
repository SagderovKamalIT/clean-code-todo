import js from "@eslint/js";
import globals from "globals";

export default [
  {
    rules: {
      ...js.configs.recommended.rules,
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "error",
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "script"
    }
  },
]
