# Vite + Vue3 + Ts + Electron Template

## How to use
## 如何使用

### 1 src/client.ts file is the main process of this electron Project, can do anything here, like init window size
### 'src' 目录下的 client.ts 文件是整个 electron 的主进程，可以在这做很多事，如初始化窗口大小

```sh
/**
 * client.ts
 */
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  //Open devtools
  win.webContents.openDevTools()

  const IP = process.argv[2]

  if (IP) {
    //Dev environment
    win.loadURL(IP)
  } else {
    //Build environment
    win.loadFile('index.html')
  }
})
```

### 2 folder 'plugins' makes Dev or Build environment
### 'plugins' 文件夹用于开发或生产阶段构建环境

### 3 plugins above mentioned need to register in file tsconfig.node.json -> include
### 上述插件需要在文件 tsconfig.node.json 的配置项 include 中声明

```sh
{
  "include": [
    "plugins/**/*.ts"
  ]
}
```

### 4 add plugins to vite like vue did in file vite.config.ts
### 在文件 vite.config.ts 中像 vue 那样将插件注入 vite

```sh
import { ElectronDevPlugin } from './plugins/vite.electron.dev'
import { ElectronBuildPlugin } from './plugins/vite.electron.build'

export default defineConfig({
  plugins: [
    ElectronDevPlugin(),
    ElectronBuildPlugin()
  ],
})
```

### 5 then when you dev or build the frontend will also create the electron dev window or build electron, electron window start like this
### 然后在调试或打包前端文件时也会同时创建 electron 的调试窗口或打包electron，就像下图这样

![image1](https://github.com/KrazyPhish/ElectronVueTemplate/blob/master/src/assets/dev_show.png)

### 6 run build command will create a 'release' folder at the root catalogue, it contains a releaseed folder with a .exe file and also an installation package
### 运行打包命令同时会在根目录创建一个 'release' 的文件夹，包含一个带有可运行文件的已经解压的文件夹以及一个安装包

![image2](https://github.com/KrazyPhish/ElectronVueTemplate/blob/master/src/assets/package_exe.png)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
