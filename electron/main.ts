import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import axios from "axios"
import  userStore  from "../src/store/UserStore"
import { IUser } from "../src/models/IUser";
import { TaskResponse } from "../src/models/response/TaskResponse";




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


const notifiedTasks = new Set<number>(); // Сет для хранения идентификаторов уведомленных задач

const checkTasks = async () => {
  const currentUser: IUser | null = userStore.setUser();
  if (!currentUser) return;1
  const currentTime = new Date();
  const twoHoursLater = new Date(currentTime.getTime() + 60 * 1000); // Текущее время + 1 часа

  try {
    const response = await axios.get<TaskResponse[]>('http://localhost:3300/api/task'); // Замените на ваш URL
    const tasks: TaskResponse[] = response.data;

    tasks.forEach(task => {
        const taskDate = new Date(task.datetimeon); // Преобразуем строку в дату
        if (taskDate <= twoHoursLater && taskDate > currentTime) {
            // Проверяем, было ли уже отправлено уведомление для этой задачи
            if (!notifiedTasks.has(task.id)) {
              if (task.user_author_id === currentUser.id || task.user_executor_id === currentUser.id) {
                new Notification({
                    title: 'Напоминание о сроке исполнения задачи!',
                    body: `Задача с № ${task.number_tesiz} в Тезисе должна быть выполнена через 1 час.`,
                }).show();
              }
                // Добавляем ID задачи в сет, чтобы не отправлять уведомление повторно
                notifiedTasks.add(task.id);
            }
        }
    });
} catch (error) {
    console.error('Ошибка при получении задач:', error);
}
};

setInterval(checkTasks, 10 * 1000);

app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
  }
});

app.whenReady().then(() => {
  createWindow()
  const targetDate = new Date('2025-03-04T02:17:00+03:00'); // Московское время (UTC+3)
    // scheduleNotification(targetDate);
})
