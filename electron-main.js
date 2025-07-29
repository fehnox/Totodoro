const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Mantém uma referência global do objeto da janela
let mainWindow;

function createWindow() {
    // Cria a janela do navegador
    mainWindow = new BrowserWindow({
        width: 480,
        height: 680,
        minWidth: 400,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'favicon_totoro.ico'),
        titleBarStyle: 'hidden', // Remove a barra de título padrão
        frame: false, // Remove a moldura da janela
        show: false, // Não mostra até estar pronta
        backgroundColor: '#f7e7ce' // Cor de fundo enquanto carrega
    });

    // Carrega o index.html da aplicação
    mainWindow.loadFile('index.html');

    // Mostra a janela quando estiver pronta
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Emitido quando a janela é fechada
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Remove o menu padrão (File, Edit, View, etc.)
    mainWindow.setMenuBarVisibility(false);
}

// Este método será chamado quando o Electron terminar a inicialização
app.whenReady().then(createWindow);

// Encerra quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handlers para os controles de janela customizados
ipcMain.handle('window-minimize', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.handle('window-maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
            return false; // Não está maximizada
        } else {
            mainWindow.maximize();
            return true; // Está maximizada
        }
    }
});

ipcMain.handle('window-close', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

ipcMain.handle('window-is-maximized', () => {
    if (mainWindow) {
        return mainWindow.isMaximized();
    }
    return false;
});
