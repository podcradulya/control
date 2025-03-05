import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import axios from "axios"
import * as schedule from 'node-schedule'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    autoHideMenuBar: true,
    width: 1200,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  ipcMain.handle("fetch-data", async (_, url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error("Ошибка при запросе к серверу:", error);
      return { ok: false, error: (error as Error).message };
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function sendNotification(title: string, body: string) {
  const notification = new Notification({ title, body });
  notification.show();
}

function scheduleNotification(date: Date) {
  const notificationTime = new Date(date.getTime() - 2 * 60 * 60 * 1000); 

  schedule.scheduleJob(notificationTime, () => {
      sendNotification('Напоминание!', 'Срок исполнения задачи подходит к концу через 2 часа!');
  });
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
  }
});

app.whenReady().then(() => {
  createWindow()
  const targetDate = new Date('2025-03-04T02:17:00+03:00'); // Московское время (UTC+3)
    scheduleNotification(targetDate);
})
