// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const configButton = document.getElementById('config');
const testSoundButton = document.getElementById('testSound');
const gif = document.getElementById('totoroGif');
const notificationSound = document.getElementById('notificationSound');

// Elementos do modal
const configModal = document.getElementById('configModal');
const minutesInput = document.getElementById('minutesInput');
const saveConfigButton = document.getElementById('saveConfig');
const cancelConfigButton = document.getElementById('cancelConfig');

// Verificação de segurança
if (!timerDisplay || !startButton || !pauseButton || !resetButton || !configButton || !gif) {
    console.error('Alguns elementos não foram encontrados no DOM');
}

// Array com os GIFs do Totoro
const gifs = [
    'imagens/totoro_run.gif',
    'imagens/totoro_corda.gif',
    'imagens/totorogif_bam.gif'
];

// variaveis do pomodoro
let minutes = 25;
let seconds = 0;
let interval = null;
let isRunning = false;
let currentGifIndex = 0; // Índice do GIF atual
let isMaximized = false; // Estado da janela

// Função para garantir valores válidos
function ensureValidValues() {
    if (isNaN(minutes) || minutes <= 0 || minutes > 60) {
        minutes = 25;
    }
    if (isNaN(seconds) || seconds < 0 || seconds >= 60) {
        seconds = 0;
    }
}

// Função para atualizar o display do temporizador
function updateDisplay() {
    ensureValidValues(); // Sempre garantir valores válidos antes de mostrar
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Função para tocar som de notificação
function playNotificationSound() {
    // Método 1: Tentar Web Audio API primeiro (mais confiável)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Função para criar um beep
        function createBeep(frequency, duration, volume = 0.1) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
        
        // Sequência de beeps
        createBeep(800, 0.2); // Primeiro beep
        setTimeout(() => createBeep(600, 0.2), 300); // Segundo beep
        setTimeout(() => createBeep(800, 0.3), 600); // Terceiro beep
        
        console.log('🔔 Som de notificação tocado!');
        
    } catch (error) {
        console.log('Web Audio API falhou, tentando método alternativo:', error);
        
        // Método 2: Tentar elemento audio
        try {
            if (notificationSound) {
                // Criar um som simples via Data URL
                notificationSound.src = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAA=';
                notificationSound.play().catch(e => {
                    console.log('Audio element também falhou:', e);
                    // Método 3: Feedback visual como fallback
                    showVisualNotification();
                });
            } else {
                showVisualNotification();
            }
        } catch (audioError) {
            console.log('Todos os métodos de áudio falharam:', audioError);
            showVisualNotification();
        }
    }
}

// Função para mostrar notificação visual quando o áudio falha
function showVisualNotification() {
    // Piscar a tela com cores harmoniosas do tema
    document.body.style.transition = 'background 0.2s ease';
    document.body.style.background = 'linear-gradient(135deg, #ffb3d9 0%, #ffc0cb 50%, #ffb3e6 100%)'; // Rosa pastel dos botões
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #ffeef7 0%, #fed7e2 30%, #fbb6ce 70%, #f8bbd9 100%)'; // Volta para o gradiente original
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #ffb3d9 0%, #ffc0cb 50%, #ffb3e6 100%)'; // Rosa pastel novamente
            setTimeout(() => {
                document.body.style.background = 'linear-gradient(135deg, #ffeef7 0%, #fed7e2 30%, #fbb6ce 70%, #f8bbd9 100%)'; // Volta para o original
                document.body.style.transition = '';
            }, 150);
        }, 150);
    }, 150);
    
    console.log('🔔 Notificação visual ativa (som não disponível)');
}

// função para iniciar o timer 
function startTimer() {
    if (!isRunning) {
        // Garantir valores válidos sempre
        ensureValidValues();
        
        // Verificação adicional
        if (minutes <= 0) {
            alert('Configure o timer primeiro!');
            configTimer(); // Abre a configuração automaticamente
            return;
        }
        
        // Troca para o próximo GIF na sequência
        gif.src = gifs[currentGifIndex];
        currentGifIndex = (currentGifIndex + 1) % gifs.length; // Rotaciona entre os GIFs
        
        gif.style.display = 'block'; // Mostra o gif
        isRunning = true;
        interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    isRunning = false;
                    
                    // Restaurar valores para próximo uso
                    minutes = 25;
                    seconds = 0;
                    
                    // Toca o som de notificação
                    playNotificationSound();
                    
                    // Mostra o alerta após um pequeno delay para o som tocar
                    setTimeout(() => {
                        alert('🎉 Tempo esgotado! Parabéns! 🦫');
                        updateDisplay(); // Atualizar display após terminar
                    }, 500);
                    
                    gif.style.display = 'none'; // Esconde o gif quando termina
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

// função para pausar o timer
function stopTimer() {
    clearInterval(interval);
    isRunning = false;
    gif.style.display = 'none'; // Esconde o gif quando pausa
}

// função para resetar o timer
function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    
    // Sempre restaurar para valores padrão
    minutes = 25;
    seconds = 0;
    
    updateDisplay();
    if (gif) gif.style.display = 'none'; // Esconde o gif
}

// função para configurar o timer
function configTimer() {
    if (!isRunning) {
        // Garantir valores válidos antes de abrir
        ensureValidValues();
        
        // Atualiza o input com o valor atual
        minutesInput.value = minutes;
        
        // Mostra o modal
        configModal.style.display = 'block';
        
        // Foca no input
        setTimeout(() => {
            minutesInput.focus();
            minutesInput.select();
        }, 100);
    } else {
        alert('Pause o timer antes de configurar!');
    }
}

// Função para salvar a configuração
function saveConfig() {
    const inputValue = minutesInput.value.trim();
    const newMinutes = parseInt(inputValue);
    
    // Validação simples e direta
    if (!inputValue || inputValue === '0' || isNaN(newMinutes) || newMinutes < 1 || newMinutes > 60) {
        alert('Por favor, digite um número entre 1 e 60.');
        minutesInput.value = '25'; // Valor padrão
        minutesInput.focus();
        minutesInput.select();
        return;
    }
    
    // Salvar e atualizar
    minutes = newMinutes;
    seconds = 0;
    updateDisplay();
    closeConfigModal();
}

// Função para fechar o modal
function closeConfigModal() {
    configModal.style.display = 'none';
}

// Inicializar o display
ensureValidValues(); // Garantir valores válidos na inicialização
updateDisplay();

// Função para ativar áudio (necessário para alguns navegadores)
function enableAudio() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    } catch (error) {
        console.log('Não foi possível ativar o contexto de áudio:', error);
    }
}

// Ativar áudio na primeira interação do usuário
document.addEventListener('click', enableAudio, { once: true });

//Eventos dos Botões
if (startButton) startButton.onclick = startTimer;
if (pauseButton) pauseButton.onclick = stopTimer;
if (resetButton) resetButton.onclick = resetTimer;
if (configButton) configButton.onclick = configTimer;
if (testSoundButton) testSoundButton.onclick = playNotificationSound;

// Eventos do modal
if (saveConfigButton) saveConfigButton.onclick = saveConfig;
if (cancelConfigButton) cancelConfigButton.onclick = closeConfigModal;

// Fechar modal clicando fora dele
if (configModal) {
    configModal.onclick = function(event) {
        if (event.target === configModal) {
            closeConfigModal();
        }
    };
}

// Permitir salvar com Enter no input
if (minutesInput) {
    minutesInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveConfig();
        }
    });
    
    // Permitir apenas números no input
    minutesInput.addEventListener('keypress', function(event) {
        // Permitir: backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(event.keyCode) !== -1 ||
            // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (event.keyCode === 65 && event.ctrlKey === true) ||
            (event.keyCode === 67 && event.ctrlKey === true) ||
            (event.keyCode === 86 && event.ctrlKey === true) ||
            (event.keyCode === 88 && event.ctrlKey === true)) {
            return;
        }
        // Garantir que é um número
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    });
    
    // Alternativa mais simples: permitir apenas dígitos
    minutesInput.addEventListener('input', function(event) {
        // Remove qualquer caractere que não seja número
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limita a 2 dígitos
        if (this.value.length > 2) {
            this.value = this.value.slice(0, 2);
        }
        
        // Se o valor for maior que 60, corrige para 60
        if (parseInt(this.value) > 60) {
            this.value = '60';
        }
    });
    
    // Validação ao perder o foco
    minutesInput.addEventListener('blur', function(event) {
        if (this.value === '' || this.value === '0') {
            this.value = '25'; // Sempre usar 25 como padrão
        }
    });
}

// Eventos dos controles de janela (apenas se não estiver no Electron)
if (typeof require === 'undefined') {
    // Código para navegador web
    const minimizeBtn = document.querySelector('.minimize-btn');
    const maximizeBtn = document.querySelector('.maximize-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (minimizeBtn) {
        minimizeBtn.onclick = function() {
            const main = document.querySelector('main');
            main.style.transform = 'scale(0.1)';
            main.style.opacity = '0.3';
            main.style.transition = 'all 0.3s ease';
            
            // Simula minimizar - volta ao normal após 2 segundos
            setTimeout(() => {
                main.style.transform = 'scale(1)';
                main.style.opacity = '1';
            }, 2000);
        };
    }

    if (maximizeBtn) {
        maximizeBtn.onclick = function() {
            const main = document.querySelector('main');
            
            if (!isMaximized) {
                // Maximizar
                main.style.maxWidth = '90vw';
                main.style.minHeight = '90vh';
                main.style.transition = 'all 0.3s ease';
                maximizeBtn.title = 'Restaurar';
                isMaximized = true;
            } else {
                // Restaurar
                main.style.maxWidth = '400px';
                main.style.minHeight = 'auto';
                maximizeBtn.title = 'Maximizar';
                isMaximized = false;
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            if (confirm('Tem certeza que deseja fechar o Totodoro?')) {
                window.close();
            }
        };
    }
}
