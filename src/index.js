const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
const path = require('path');

let tray = undefined
let window = undefined

// Don't show the app in the doc
app.dock.hide();

app.on('ready', () => {
  createTray()
  createWindow()
})

const createTray = () => {
  tray = new Tray(path.join(__dirname+'/ocdicon_white.png'))



  tray.on('click', function (event) {
    toggleWindow()
  });




}


const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 0);

  return {x: x, y: y};
}

const createWindow = () => {
  window = new BrowserWindow({
    width: 200,
    height: 350,
    minWidth: 155,
    minHeight: 350,
    alwaysOnTop: true,
    hasShadow: false,
    show: false,
    transparent: true,
    backgroundColor: "#00ffffff",
    center:true,
    kiosk:false,
    fullscreen:false,
    frame: false,
    fullscreenable: false,
    fullscreen:false,
    resizable: false,
    useContentSize:true,
    autoHideMenuBar : true,
    titleBarStyle: 'hidden',
    minimizable: false,
    maximizable: false,
    closable: false,
    webPreferences: {
      backgroundThrottling: true,
      nodeIntegration: true
    }
  })
  window.loadURL(`file://${__dirname}/index.html`);
  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

app.on('before-quit', function (evt) {
  tray.destroy();
  app.exit(0)
});
app.on("window-all-closed", e => {
  e.preventDefault();
  app.quit();
  });


const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
}




const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
}

ipcMain.on('show-window', () => {
  showWindow()
})
ipcMain.on('request-mainprocess-action', (event, arg) => {
  console.log(arg+' From render');
    app.quit();
});