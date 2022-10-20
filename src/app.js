const { BrowserWindow, app, ipcMain } = require('electron');
const Pages = require('./utils/pages');
const Config = require('./utils/config');
const RiseConfig = require('./utils/riseConfig');
const Rise = require('./utils/rise');
const path = require('path');

let win = null;
let currentPage = "index";

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 550,
        minWidth: 575,
        minHeight: 300,
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (Config.getRisePath() === null || Config.getRisePath() === "") {
        console.error("Rise path is null");
        process.exit(1);
    }

    win.loadFile(Pages.index);
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    setupConfigHandlers();
    setupPageHandlers();
    setupRiseConfigHandlers();
    setupRiseHandlers();
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

const setupConfigHandlers = () => {
    ipcMain.handle('getConfig', (event, key) => Config.get(key));
    ipcMain.handle('getRisePath', () => Config.getRisePath());
    
    ipcMain.handle('setConfig', (event, key, value) => {
        Config.set(key, value);
    });
}

const setupPageHandlers = () => {
    ipcMain.handle('changePage', (event, page) => {
        if (page.toLowerCase() === "home" || page.toLowerCase() === "index") {
            win.loadFile(Pages.index);
            currentPage = "index";
        } else {
            win.loadFile(Pages.getPage(page));
            currentPage = page;
        }
    });

    ipcMain.handle('getCurrentPage', () => currentPage);
}

const setupRiseConfigHandlers = () => {
    ipcMain.handle('getRiseConfig', (event, key) => {
        if (key) {
            return RiseConfig.get(key);
        } else {
            return RiseConfig.config;
        }
    });
    
    ipcMain.handle('setRiseConfig', (event, key, value) => {
        RiseConfig.set(key, value);
        return "success";
    });
}

const setupRiseHandlers = () => {
    ipcMain.handle('getRiseThemes', () => Rise.getThemes());
    ipcMain.handle('getRiseScripts', () => Rise.getScripts());
}