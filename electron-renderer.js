// Electron Renderer Process - Integração com controles de janela
const { ipcRenderer } = require('electron');

// Substitui os controles de janela existentes para funcionar com Electron
window.addEventListener('DOMContentLoaded', () => {
    const minimizeBtn = document.querySelector('.minimize-btn');
    const maximizeBtn = document.querySelector('.maximize-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (minimizeBtn) {
        minimizeBtn.onclick = async () => {
            await ipcRenderer.invoke('window-minimize');
        };
    }

    if (maximizeBtn) {
        maximizeBtn.onclick = async () => {
            const isMaximized = await ipcRenderer.invoke('window-maximize');
            
            // Atualiza o símbolo do botão
            if (isMaximized) {
                maximizeBtn.style.setProperty('--symbol', '"◱"');
                maximizeBtn.title = 'Restaurar';
            } else {
                maximizeBtn.style.removeProperty('--symbol');
                maximizeBtn.title = 'Maximizar';
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = async () => {
            // Remove a confirmação para funcionar como app nativo
            await ipcRenderer.invoke('window-close');
        };
    }

    // Verifica o estado inicial da janela
    const checkWindowState = async () => {
        if (maximizeBtn) {
            const isMaximized = await ipcRenderer.invoke('window-is-maximized');
            if (isMaximized) {
                maximizeBtn.style.setProperty('--symbol', '"◱"');
                maximizeBtn.title = 'Restaurar';
            }
        }
    };

    checkWindowState();
});
