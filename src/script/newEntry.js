// 注册退出事件：输出空行
process.on('exit', () => {
  console.log();
});

// 如果未传入组件名，则输出错误信息并退出程序
if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
// 获取命令行参数：组件名
const inputCompName = process.argv[2];
// 获取组件名（英文），并转换组件名为大驼峰命名法
const upperCameName = uppercamelcase(inputCompName);
const PackagePath = path.resolve('','src/components', upperCameName);

// 更新 components.json
const componentsFile = require('./components.json');
// import componentsFile from './components.json'
if (componentsFile[upperCameName]) {
  console.error(`${upperCameName} 已存在.`);
  process.exit(1);
}
// 定义需要创建的文件及其内容
const Files = [
  {
    filename: 'index.js',
    content: `import ${upperCameName} from './src/index.vue';
export default function(app) {
  app.component('${upperCameName}', ${upperCameName})
};
`
  },
  {
    filename: './src/index.vue',
    content: `<template>
  <div class="${inputCompName}-wrapper"></div>
</template>

<script setup>
import { defineComponent } from 'vue';
defineComponent({
  name: '${upperCameName}',
})
</script>`
  }
];

componentsFile[upperCameName] = `./components/${upperCameName}/index.js`;
fileSave(path.join(__dirname, './components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建文件结构
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('-------- [组件新建] DONE --------', OUTPUT_PATH);

