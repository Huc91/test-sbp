/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier/skip-formatting'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'vue/require-default-prop': 'off',
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
    globals: {
        _: true,
    },
}
