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

// Função para atualizar o display do temporizador
function updateDisplay() {
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
    // Piscar a tela
    document.body.style.transition = 'background-color 0.1s';
    document.body.style.backgroundColor = '#ffeb3b';
    
    setTimeout(() => {
        document.body.style.backgroundColor = '#ffffff';
        setTimeout(() => {
            document.body.style.backgroundColor = '#ffeb3b';
            setTimeout(() => {
                document.body.style.backgroundColor = '#ffffff';
                document.body.style.transition = '';
            }, 100);
        }, 100);
    }, 100);
    
    console.log('🔔 Notificação visual ativa (som não disponível)');
}

// função para iniciar o timer 
function startTimer() {
    if (!isRunning) {
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
                    
                    // Toca o som de notificação
                    playNotificationSound();
                    
                    // Mostra o alerta após um pequeno delay para o som tocar
                    setTimeout(() => {
                        alert('🎉 Tempo esgotado! Parabéns! 🦫');
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
    seconds = 0;
    updateDisplay();
    if (gif) gif.style.display = 'none'; // Esconde o gif
}

// função para configurar o timer
function configTimer() {
    if (!isRunning) {
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
    const newMinutes = parseInt(minutesInput.value);
    
    if (newMinutes && newMinutes >= 1 && newMinutes <= 60) {
        minutes = newMinutes;
        seconds = 0;
        updateDisplay();
        closeConfigModal();
    } else {
        alert('Por favor, digite um número válido entre 1 e 60.');
        minutesInput.focus();
        minutesInput.select();
    }
}

// Função para fechar o modal
function closeConfigModal() {
    configModal.style.display = 'none';
}

// Inicializar o display
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
