const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
    "config", {
        get: (key) => ipcRenderer.invoke("getConfig", key),
        set: (key, value) => ipcRenderer.invoke("setConfig", key, value),
        getRisePath: () => ipcRenderer.invoke("getRisePath"),
    }
);

contextBridge.exposeInMainWorld(
    "pages", {
        change: (page) => ipcRenderer.invoke("changePage", page),
        current: () => ipcRenderer.invoke("getCurrentPage"),
    }
);

contextBridge.exposeInMainWorld(
    "riseConfig", {
        get: (key) => ipcRenderer.invoke("getRiseConfig", key),
        set: (key, value) => ipcRenderer.invoke("setRiseConfig", key, value).then(console.log),
        getConfig: () => ipcRenderer.invoke("getRiseConfig"),
    }
);

contextBridge.exposeInMainWorld(
    "rise", {
        getThemes: () => ipcRenderer.invoke("getRiseThemes"),
        getScripts: () => ipcRenderer.invoke("getRiseScripts"),
    }
);