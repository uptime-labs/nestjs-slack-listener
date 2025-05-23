const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslintEslintPlugin = require("@typescript-eslint/eslint-plugin");
const _import = require("eslint-plugin-import");

const {
    fixupPluginRules,
} = require("@eslint/compat");

const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },

        globals: {
            ...globals.node,
            ...globals.jest,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslintEslintPlugin,
        import: fixupPluginRules(_import),
    },

    extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",

        "import/order": ["error", {
            alphabetize: {
                order: "asc",
            },

            groups: [["builtin", "external"], ["internal", "parent", "sibling", "index"]],
            "newlines-between": "never",
        }],
    },
}, globalIgnores(["**/.eslintrc.js"])]);
