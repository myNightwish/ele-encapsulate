module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "node": true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  rules: {
    'prettier/prettier': 'error',
    "indent": ["error", 4],         // 缩进使用 4 个空格
    "quotes": ["error", "single"],  // 强制使用单引号
    "semi": ["error", "always"],    // 语句末尾强制使用分号
    "comma-dangle": ["error", "only-multiline"], // 多行对象字面量中要求拖尾逗号
    "no-unused-vars": "warn",       // 未使用的变量会引起警告
    "no-console": "off",            // 允许使用 console
    "vue/html-indent": ["error", 4] // Vue 文件中的 HTML 部分缩进 4 个空格
  }
}
