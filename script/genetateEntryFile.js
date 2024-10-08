var Components = require('./components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var endOfLine = require('os').EOL;

// 最终生成的入口文件路径
var OUTPUT_PATH = 'packages/index.js';

//  模板定义
var IMPORT_TEMPLATE = "import {{name}} from './{{package}}/index.js';";
var MAIN_TEMPLATE = `/* Automatically generated by 'build-entry.js' */
{{include}}

/* 导入组件库所有组件 */
const components = [
  {{list}}
];

/* 定义组件库组件注册安装的install方法, 当使用 use 注册插件，则所有的组件都将被注册 */
const install = function (app) {
  components.map((item) => {
    app.use(item);
  });
}

export default {
  /* 导出的对象必须具有 install，才能被 app.use() 方法安装 */
install,
  {{list}}
};
`;

var ComponentNames = Object.keys(Components);
// 用来存储不同类型模版渲染的结果
var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

ComponentNames.forEach((name) => {
    var componentName = uppercamelcase(name);

    includeComponentTemplate.push(
        render(IMPORT_TEMPLATE, {
            name: componentName,
            package: name,
        })
    );
    listTemplate.push(`  ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
    include: includeComponentTemplate.join(endOfLine),
    install: installTemplate.join(',' + endOfLine),
    list: listTemplate.join(',' + endOfLine),
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('-------- [build entry] DONE --------:', OUTPUT_PATH);
