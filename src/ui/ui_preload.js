const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld('electronAPI', {
    onPageOptionRecieve: (callback) => ipcRenderer.on('page_option_recieve', (event, ...args) => callback(...args)),
    onPageOptionClear: (callback) => ipcRenderer.on('page_option_clear', (event, ...args) => callback(...args)),
    onURLReceive: (callback) => ipcRenderer.on('url_receive', (event, ...args) => callback(...args)),
    requestPageOptions: async () => await ipcRenderer.invoke('page_option_request_all'),
    requestSystemMetadata: async () => await ipcRenderer.invoke('system_metadata_request'),
    sendPageBack: () => ipcRenderer.send('current_page_back'),
    sendPageForward: () => ipcRenderer.send('current_page_forward'),
    sendWindowClose: () => ipcRenderer.send('window_close'),
    sendWindowToggleMaximize: () => ipcRenderer.send('window_toggle_maximize'),
    sendWindowMinimize: () => ipcRenderer.send('window_minimize'),
    sendPageOptionActivate: (id) => ipcRenderer.send('page_option_activate', id),
    sendPageOptionReorder: (movingID, beforeID) => ipcRenderer.send('page_option_reorder', movingID, beforeID),
    sendPageOptionNewRequest: () => ipcRenderer.send('page_option_new_request'),
    sendPageOptionEditRequest: (id) => ipcRenderer.send('page_option_edit_request', id),
    sendSettingsRequest: () => ipcRenderer.send('settings_request')
});