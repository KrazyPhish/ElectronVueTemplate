# Vite + Vue3 + Ts + Electron Template

## How to use

### 1 client.ts is the main process of this electron Project

### 2 folder 'plugins' makes Dev or Build environment

### 3 plugins above mentioned needs to register in file tsconfig.node.json -> includes

```sh
{
  "include": [
    "plugins/**/*.ts"
  ]
}
```

### 4 add plugins to vite like vue did in file vite.config.ts

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

### 5 then when you dev or build the frontend will also create the electron dev or build

### 6 run build command will create a release folder at the root catalogue, it contains a releaseed folder with .exe file and alse an installation package

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
