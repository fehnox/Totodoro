// Função para criar um som de notificação usando Web Audio API
function createNotificationBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Função para criar um beep
        function beep(frequency, duration, volume) {
            return new Promise((resolve) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
                
                setTimeout(resolve, duration * 1000);
            });
        }
        
        // Sequência de beeps para notificação
        async function playNotificationSequence() {
            await beep(800, 0.2, 0.1); // Primeiro beep
            await new Promise(resolve => setTimeout(resolve, 100)); // Pausa
            await beep(600, 0.2, 0.1); // Segundo beep
            await new Promise(resolve => setTimeout(resolve, 100)); // Pausa
            await beep(800, 0.3, 0.1); // Terceiro beep mais longo
        }
        
        return playNotificationSequence;
    } catch (error) {
        console.log('Web Audio API não suportada:', error);
        return null;
    }
}

// Exporta a função para uso global
window.createNotificationBeep = createNotificationBeep;
