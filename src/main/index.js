import {app, BrowserWindow} from 'electron'

const fs = require('fs');
const path = require ('path');




/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        width: 1300,
        frame: false
    });

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    });




}


function setUserDataFolder() {

    const dir = path.dirname(app.getPath ('exe'));

    //try { fs.writeFileSync(path.join(process.cwd(), "path.txt"), dir, 'utf-8'); }
    //catch(e) { alert('Failed to save the file !'); }

    app.setPath('userData', `${dir}/msb_user_data/`);
}


setUserDataFolder();

app.on('ready', () => {

    createWindow()
})

app.on('window-all-closed', () => app.quit())

app.on('activate', () => {
    if (mainWindow === null) {
        setUserDataFolder()
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
