module.exports = {
    env: {
        browser: true,
        node: true,
    },
    plugins: ['vue', 'prettier'],
    extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
    rules: {
        'prettier/prettier': 'off',
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    }
}