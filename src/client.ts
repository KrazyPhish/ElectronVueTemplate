/**
 * Electron main process file
 */
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      /**
       * Can use node api while processing
       */
      nodeIntegration: true,
      /**
       * Close render processing sandbox isolation
       */
      contextIsolation: false,
      /**
       * Close cross-orgin detection
       */
      webSecurity: false
    }
  })

  /**
   * Open devtools
   */
  // win.webContents.openDevTools()

  const IP = process.argv[2]
  
  if (IP) {
    /**
     * Dev environment
     */
    win.loadURL(IP)
  } else {
    /**
     * Build environment
     */
    win.loadFile('index.html')
  }
})