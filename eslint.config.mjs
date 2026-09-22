import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the ESLint legacy compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Safely converts the old format rules for Next.js
  ...compat.extends("next/core-web-vitals"),

  {
    // You can add your own custom rule overrides here later
    rules: {},
  },
];

export default eslintConfig;
