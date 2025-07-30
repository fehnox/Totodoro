// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const configButton = document.getElementById('config');
const gif = document.getElementById('totoroGif');
const notificationSound = document.getElementById('notificationSound');

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
    try {
        if (notificationSound) {
            notificationSound.currentTime = 0; // Reinicia o áudio
            notificationSound.play().catch(e => {
                console.log('Não foi possível tocar o som do arquivo:', e);
                // Fallback: usar Web Audio API
                useWebAudioFallback();
            });
        } else {
            // Se não há elemento de áudio, usa Web Audio API
            useWebAudioFallback();
        }
    } catch (error) {
        console.log('Erro ao tocar som:', error);
        useWebAudioFallback();
    }
}

// Função fallback usando Web Audio API
function useWebAudioFallback() {
    try {
        if (window.createNotificationBeep) {
            const playBeeps = window.createNotificationBeep();
            if (playBeeps) {
                playBeeps();
            }
        } else {
            // Fallback simples
            console.log('🔔 Timer finalizado! (Som não disponível)');
        }
    } catch (error) {
        console.log('Fallback de áudio falhou:', error);
    }
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
        const newMinutes = prompt('Digite o número de minutos (1-60):', minutes);
        const parsedMinutes = parseInt(newMinutes);
        
        if (parsedMinutes && parsedMinutes >= 1 && parsedMinutes <= 60) {
            minutes = parsedMinutes;
            seconds = 0;
            updateDisplay();
        } else if (newMinutes !== null) {
            alert('Por favor, digite um número válido entre 1 e 60.');
        }
    } else {
        alert('Pause o timer antes de configurar!');
    }
}

// Inicializar o display
updateDisplay();

//Eventos dos Botões
if (startButton) startButton.onclick = startTimer;
if (pauseButton) pauseButton.onclick = stopTimer;
if (resetButton) resetButton.onclick = resetTimer;
if (configButton) configButton.onclick = configTimer;

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
