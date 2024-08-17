const {defineConfig, build} = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const path = require('path');
const fsExtra = require('fs-extra');
const fileSave = require('file-save');
const fs = require('fs');

// 打包入口文件
const entryDir = path.resolve(__dirname, '../packages/');
console.log('entryDir', entryDir)
// 产出的出口文件
const outDir = path.resolve(__dirname, '../lib');

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  // vite 的插件是函数式
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
  },
  server: {
    port: 8080
  }
})
// rollup配置
const rollupOptions = {
  external: ['vue','vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    },
    exports: 'named' // 或者 'default' 取决于你的模块如何导出
  }
}

// 全量打包
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.js'),
        name: "mi-encapsulate-components",
        fileName: 'index',
        formats: ['es', 'umd'] // 生成 ES 模块和 UMD 格式
      },
      outDir: path.resolve(outDir)
    }
  })
}
// 按需引入打包
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: "index",
        fileName: "index",
        formats: ['es', 'umd'] // 生成 ES 模块和 UMD 格式
      },
      outDir: path.resolve(outDir, name)
    }
  })
}
// 而对于按需引入，还需要为每个组件生成自己的package.json
const createPackageJson = (name) => {
  const fileStr =`
{
  "name": "${name}",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "style.css"
}`;
  const OUTPUT_PATH = path.resolve(outDir,`${name}/package.json`);
  fileSave(OUTPUT_PATH)
  .write(fileStr, 'utf8')
  .end('\n');
}
const createRootPackageJson = () => {
  const packageJsonPath = path.resolve(outDir, 'package.json');
  // 默认的 package.json 内容
  const defaultPackageJson = {
    "name": "mi-encapsulate-components",
    "version": "1.0.0",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css",
    "author": {
      "name": "mynightwish"
    },
    "keywords": [
      "二次封装",
      "element-plus",
      "组件封装"
    ]
  };
  // 检查文件是否存在
  if (!fs.existsSync(packageJsonPath)) {
    // 如果文件不存在，创建文件并写入默认内容
    fs.writeFileSync(packageJsonPath, JSON.stringify(defaultPackageJson, null, 2), 'utf8');
  }
}

const buildLib = async () => {
  buildAll().then(() => {
    createRootPackageJson();
  });

  // 按需引入：
  // 这里其实可以用component.json简化
  // 拿到所有的组件名数组
  const compsName = fs.readdirSync(entryDir).filter(
    name => {
      const compDir = path.resolve(entryDir, name);
      let isDir = false;
      try {
        isDir = fs.lstatSync(compDir)?.isDirectory();
      } catch {};
      return isDir && fs.readdirSync(compDir).includes('index.js');
    }
  );
  for (const name of compsName) {
    // 先打包，再补充json文件
    //这里异步问题可能导致文件路径被锁定或占用，我拆分成了打包成功再创建json文件
    await buildSingle(name).then(() => {
      createPackageJson(name);
    });
  }
}
buildLib();
