import { app, BrowserWindow, WebContentsView, ipcMain } from 'electron';
import Storage from './modules/storage';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow = null;
let subviews = {};
let activeView = {};

const setupWindows = () => {
  // Fetch browser state from storage
  const lastWindowState = Storage.get("lastWindowState") || {width: 800 + 220, height: 600 + 60}

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 800 + 220,
    minHeight: 600 + 60,
    x: lastWindowState.x,
    y: lastWindowState.y,
    fullscreenable: false,
    frame: false,
    webPreferences: {
      partition: "persist:office-tools",
      preload: path.join(__dirname, '../renderer/ui_preload.js')
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Get Main Bounds
  const mainWindowBounds = mainWindow.getBounds();

  // Create Subview
  const subView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, '../renderer/page_preload.js'),
      partition: "persist:office-tools"
    }
  });
  mainWindow.contentView.addChildView(subView)
  subView.setBounds({x: 210, y: 50, width: mainWindowBounds.width - 220, height: mainWindowBounds.height - 60});

  // Handle Subview Positioning
  const handleSubViewBounds = () => {
    const newBounds = mainWindow.getBounds();
    const isMaximized = mainWindow.isMaximized();
    const extraPadding = isMaximized && process.platform != 'darwin' ? 8 : 0;
    subView.setBounds({x: 210 , y: 50, width: newBounds.width - 220 - 2*extraPadding, height: newBounds.height - 60 - 2*extraPadding})
    Storage.set("lastWindowState", newBounds);
  }

  mainWindow.on("resized", handleSubViewBounds);
  mainWindow.on("maximize", handleSubViewBounds);
  mainWindow.on("unmaximize", handleSubViewBounds);

  mainWindow.on("move", () => {
    Storage.set("lastWindowState", mainWindow.getBounds());
  })

  subView.webContents.loadURL('https://google.com');

  subviews['jira'] = subView;
  activeView.id = 'jira';
  activeView.view = subView;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  setupWindows();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      setupWindows();
    }
  });

  // Handle IPC messages
  ipcMain.handle('page_option_request', async (event) => {

  });
  ipcMain.on('current_page_back', (event) => {

  });
  ipcMain.on('current_page_forward', (event) => {

  });
  ipcMain.on('window_close', (event) => {

  });
  ipcMain.on('window_toggle_maximize', (event) => {

  });
  ipcMain.on('window_minimize', (event) => {

  });
  ipcMain.on('page_option_activate', (event, id) => {

  });
  ipcMain.on('page_option_reorder', (event, movingID, beforeID) => {

  });
  ipcMain.on('page_option_new_request', (event) => {

  });
  ipcMain.on('page_option_edit_request', (event, id) => {

  });
  ipcMain.on('settings_request', (event) => {

  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
