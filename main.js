// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const gif = document.getElementById('totoroGif');

// Elementos dos controles de janela
const minimizeBtn = document.querySelector('.minimize-btn');
const maximizeBtn = document.querySelector('.maximize-btn');
const closeBtn = document.querySelector('.close-btn');

// Array com os GIFs disponíveis
const gifs = [
    'imagens/totoro_corda.gif',
    'imagens/totoro_run.gif',
    'imagens/totorogif_bam.gif'
];

// variaveis do pomodoro
let minutes = 25;
let seconds = 0;
let interval = null;
let isRunning = false;
let currentGifIndex = 0; // Índice do GIF atual
let isMaximized = false; // Estado da janela

// Função para atualizar o dpslay  do temporizador

function updateDisplay() {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// função para inciiar o time 
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
                    alert('Tempo esgotado!');
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

//função para pausar o timer
function stopTimer() {
    clearInterval(interval);
    isRunning = false;
    gif.style.display = 'none'; // Esconde o gif
}   

//função para reniciar
function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
    gif.style.display = 'none'; // Esconde o gif
}

//Eventos dos Botões
startButton.onclick = startTimer;
pauseButton.onclick = stopTimer;
resetButton.onclick = resetTimer;

// Eventos dos controles de janela (apenas se não estiver no Electron)
if (typeof require === 'undefined') {
    // Código para navegador web
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

    maximizeBtn.onclick = function() {
        const main = document.querySelector('main');
        
        if (!isMaximized) {
            // Maximizar
            main.style.maxWidth = '90vw';
            main.style.minHeight = '90vh';
            main.style.transition = 'all 0.3s ease';
            maximizeBtn.title = 'Restaurar';
            // Troca o símbolo via CSS
            maximizeBtn.style.setProperty('--symbol', '"◱"');
            isMaximized = true;
        } else {
            // Restaurar
            main.style.maxWidth = '400px';
            main.style.minHeight = 'auto';
            maximizeBtn.title = 'Maximizar';
            // Volta o símbolo original
            maximizeBtn.style.removeProperty('--symbol');
            isMaximized = false;
        }
    };

    closeBtn.onclick = function() {
        if (confirm('Tem certeza que deseja fechar o Totodoro?')) {
            const main = document.querySelector('main');
            main.style.transform = 'scale(0)';
            main.style.opacity = '0';
            main.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                document.body.innerHTML = '<div style="text-align:center; margin-top:200px; font-family:Pacifico; color:#a3b18a; font-size:2em;">Tchau! 👋<br><small style="font-size:0.5em;">Recarregue a página para voltar</small></div>';
            }, 300);
        }
    };
}

// Atualiza o display inicial
updateDisplay();
