let botNumber = 0;
let attempts = 0;
let maxAttempt =  3;
let level = 'easy';
let maxRange = 10;

const hintElement = document.getElementById('hint');
const guessInput = document.getElementById('guessInput');
const resultElement = document.getElementById('result');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const levelSelect = document.getElementById('level');

// fungsi pammula game sesuai level
function startGame() {
    attempts = 0;
    guessInput.value = '';
    resultElement.textContent = '';

    switch (level) {
        case 'easy':
            maxRange = 10;
            break;
        case 'medium':
            maxRange = 50;
            break;
        case 'hard':
            maxRange = 100;
            break;
    }

    botNumber = Math.floor(Math.random() * maxRange) + 1;
    hintElement.textContent = `1-${maxRange}`;
    restartBtn.style.display = 'none';
}

// fungsi  mattebak nomoro
function makeGuess() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxRange) {
        resultElement.textContent = `Masukkan angka 1 dan ${maxRange}`;
        return;
    }

    attempts++;
    if (userGuess === botNumber) {
        resultElement.textContent = `Selamat! Kamu menebak dengan benar dalam ${attempts}.`;
        restartBtn.style.display = 'block';
        guessBtn.disabled = true;
    } else if (attempts >= maxAttempt) {
        resultElement.textContent = `Kamu kalah! Angka bot adalah ${botNumber}.`;
        restartBtn.style.display = 'block';
        guessBtn.disabled = true;
    } else if (userGuess < botNumber) {
        resultElement.textContent = 'Terlalu rendah! Coba lagi.';
    } else {
        resultElement.textContent = 'Terlalu tinggi! Coba lagi.';
    }
}

//fungsi restart game atau yulangiwi game e
function restartGame() {
    guessBtn.disabled = false;
    startGame();
}

//event listeners
guessBtn.addEventListener('click', makeGuess);
restartBtn.addEventListener('click', restartGame);
levelSelect.addEventListener('change', (e) => {
    level = e.target.value;
    startGame();
});

//mulai ulang halamann
startGame();