import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import Store from 'electron-store';

// Initialize store for persistent data
// Define the schema type for better TypeScript support
interface StoreSchema {
  settings?: Record<string, any>;
  youtube_auth_token?: string;
  [key: string]: any;
}

// Create store instance with any type to bypass TypeScript errors
const store: any = new Store<StoreSchema>();

// Keep a global reference of the window object to avoid it being garbage collected
let mainWindow: BrowserWindow | null = null;

// Create the browser window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Secure setting
      contextIsolation: true, // Secure setting
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png')
  });

  // Check if we're in development or production
  if (app.isPackaged) {
    // Production mode - load from dist
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  } else {
    // Development mode - connect to Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools
    mainWindow.webContents.openDevTools();
  }

  // Window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Create window when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    // On macOS, it's common to re-create a window when the dock icon is clicked
    if (mainWindow === null) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for communication between renderer and main process
ipcMain.handle('store:get', (_, key: string) => {
  return store.has(key) ? store.get(key) : null;
});

ipcMain.handle('store:set', (_, key: string, value: any) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('select-directory', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!canceled) {
    return filePaths[0];
  }
  return null;
}); 