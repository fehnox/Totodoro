// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

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
}   

//função para reniciar
function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
}

//Eventos dos Botões
startButton.onclick = startTimer;
pauseButton.onclick = stopTimer;
resetButton.onclick = resetTimer;

// Atualiza o display inicial
updateDisplay();