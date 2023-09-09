module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        "vue/max-attributes-per-line": "off",
        "vue/multi-word-component-names": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline":"off",
        "vue/first-attribute-linebreak": "off",
        "vue/html-self-closing": "off",
        "vue/html-indent": "off",
        "vue/html-closing-bracket-newline": "off",
        "no-useless-escape": "off",
    }
}