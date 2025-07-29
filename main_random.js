// seleciona os elementos
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const gif = document.getElementById('totoroGif');

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

// Função para escolher um GIF aleatório
function getRandomGif() {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
}

// Função para atualizar o dpslay  do temporizador
function updateDisplay() {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// função para inciiar o time 
function startTimer() {
    if (!isRunning) {
        // Escolhe um GIF aleatório
        gif.src = getRandomGif();
        
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

// Atualiza o display inicial
updateDisplay();
