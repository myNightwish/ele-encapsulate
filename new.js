'use strict';

// 注册退出事件：输出空行
process.on('exit', () => {
  console.log();
});

// 如果未传入组件名，则输出错误信息并退出程序
if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}
// 更新 components.json
const componentsFile = require('./components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
// 获取命令行参数：组件名
const componentname = process.argv[2];
// 获取组件名（英文），并转换组件名为大驼峰命名法
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '/components', componentname);
const chineseName = process.argv[3] || componentname;

// 定义需要创建的文件及其内容
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/index.vue';
      ${ComponentName}.install = function(app) {
        app.component('${ComponentName}', ${ComponentName})
      } 
    export default Tab;`
  },
  {
    filename: './src/index.vue',

    content: `<template>
      <div class="${ComponentName}-wrapper"></div>
    </template>

    <script setup>
    import { defineComponent } from 'vue';
    defineComponent({
      name: '${ComponentName}',
    })
    </script>`
  },
  {
    filename: path.join('../../examples/docs/zh-CN', `${componentname}.md`),
    content: `## ${ComponentName} ${chineseName}`
  },
  {
    filename: path.join('../../packages/theme-chalk/src', `${componentname}.scss`),
    content: `@import "mixins/mixins";
@import "common/var";

@include b(${componentname}) {
}`
  }
];

componentsFile[componentname] = `./components/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建文件结构
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('--------DONE--------!');
