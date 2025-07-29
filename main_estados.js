// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const gif = document.getElementById('totoroGif');

// GIFs para diferentes estados
const gifs = {
    working: 'imagens/totoro_run.gif',     // Durante o trabalho
    paused: 'imagens/totoro_corda.gif',    // Quando pausado
    finished: 'imagens/totorogif_bam.gif'  // Quando termina
};

// variaveis do pomodoro
let minutes = 25;
let seconds = 0;
let interval = null;
let isRunning = false;

// Função para atualizar o dpslay  do temporizador
function updateDisplay() {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// função para inciiar o time 
function startTimer() {
    if (!isRunning) {
        // GIF específico para quando está trabalhando
        gif.src = gifs.working;
        
        gif.style.display = 'block'; // Mostra o gif
        isRunning = true;
        interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    isRunning = false;
                    // GIF de comemoração quando termina
                    gif.src = gifs.finished;
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
    // GIF para quando está pausado
    gif.src = gifs.paused;
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

// Atualiza o display inicial
updateDisplay();
