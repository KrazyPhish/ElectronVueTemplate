/**
 * Build environment plugin of electron
 */
import type { Plugin } from "vite";
import fs from 'node:fs';
import * as electronBuilder from 'electron-builder';
import path from 'path';

const createBuildEnv = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/client.ts'],
    bundle: true,
    outfile: 'dist/client.js',
    platform: 'node',
    target: 'node12',
    external: ['electron']
  })
}

export const ElectronBuildPlugin = (): Plugin => {
  return {
    name: 'electron-template',
    closeBundle: () => {
      createBuildEnv()
      /**
       * Electron-builder needs a main of package.jason
       */
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'client.js'
      fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4))
      /**
       * Prevent electron-builder downloading some trash files (a bug)
       */
      electronBuilder.build({
        config: {
          asar: true,
          appId: 'com.example.app',
          directories: {
            app: path.resolve(process.cwd(), 'dist'),
            output: path.resolve(process.cwd(), 'release')
          },
          productName: 'ElectronTemplate',
          nsis: {
            oneClick: false,
            allowToChangeInstallationDirectory: true
          }
        }
      })
    }
  }
}