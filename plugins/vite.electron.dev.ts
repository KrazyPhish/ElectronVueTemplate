/**
 * Dev environment plugin of electron
 */
import type { AddressInfo } from "net";
import type { Plugin } from "vite";
import { spawn } from "child_process";
import fs from 'node:fs';

const hotUpdateDev = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/client.ts'],
    bundle: true,
    outfile: 'dist/client.js',
    platform: 'node',
    target: 'node12',
    external: ['electron']
  })
}

export const ElectronDevPlugin = (): Plugin => {
  return {
    name: 'electron-template-dev',
    configureServer: (server) => {
      hotUpdateDev()
      server.httpServer?.once('listening', () => {
        /** 
         * Read vite service infomation
         * Create needed ip address
         */
        const addressInfo: AddressInfo = server.httpServer?.address() as AddressInfo
        const IP = `http://localhost:${addressInfo.port}`
        let electron_process = spawn(require('electron'), ['dist/client.js', IP])
        fs.watchFile('src/client.ts', () => {
          electron_process.kill()
          hotUpdateDev()
          electron_process = spawn(require('electron'), ['dist/client.js', IP])
        })
        /**
         * Logs
         */
        electron_process.stderr.on('data', (data) => {
          console.log(`logs`, data.toString())
        })
      })
    }
  }
}