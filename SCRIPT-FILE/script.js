//for going to start playing
function GoingBackToPlay(){
    return location.href = "../HTML-FILE/start.html"
}

let playerScore = 0;
let computerScore = 0;
let isAnimating = false;

const choices = ['rock', 'paper', 'scissors'];

// img path
const playerImages = {
    rock: '../IMG/rock-hand.png',
    paper: '../IMG/paper-hand.png',
    scissors: '../IMG/scissors-hand.png',
    default: '../IMG/default-hand.png'
};

const computerImages = {
    rock: '../IMG/rock-hand-computer.png',
    paper: '../IMG/paper-hand-computer.png',
    scissors: '../IMG/scissors-hand-computer.png',
    default: '../IMG/default-hand.png'
};

const playerHandElement = document.getElementById('player-hand');
const computerHandElement = document.getElementById('computer-hand');
const resultMessageElement = document.getElementById('result-message');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const gameButtons = document.querySelectorAll('.game-btn');

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

function getResultMessage(result, playerChoice, computerChoice) {
    const choiceEmojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    const playerEmoji = choiceEmojis[playerChoice];
    const computerEmoji = choiceEmojis[computerChoice];
    
    switch (result) {
        case 'win':
            return `You Win! ${playerEmoji} beats ${computerEmoji}`;
        case 'lose':
            return `You Lose! ${computerEmoji} beats ${playerEmoji}`;
        case 'draw':
            return `It's a Draw! ${playerEmoji} = ${computerEmoji}`;
        default:
            return 'Make your move!';
    }
}

// Update the score display
function updateScore() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    
    // Add animation to score
    playerScoreElement.style.animation = 'none';
    computerScoreElement.style.animation = 'none';
    
    setTimeout(() => {
        playerScoreElement.style.animation = '';
        computerScoreElement.style.animation = '';
    }, 10);
}

function setButtonsDisabled(disabled) {
    gameButtons.forEach(button => {
        button.disabled = disabled;
    });
}

//   Play the shake animation before revealing result
function playShakeAnimation() {
    return new Promise(resolve => {
        // Add shake animation class
        playerHandElement.classList.add('hand-shake');
        computerHandElement.classList.add('hand-shake');
        
        // Show default hands during shake
        playerHandElement.src = playerImages.rock;
        computerHandElement.src = computerImages.rock;
        
        // Remove animation class after completion
        setTimeout(() => {
            playerHandElement.classList.remove('hand-shake');
            computerHandElement.classList.remove('hand-shake');
            resolve();
        }, 1500); // 3 shakes at 0.5s each
    });
}

function showResultAnimation(result) {
    // Remove previous result classes
    resultMessageElement.classList.remove('win', 'lose', 'draw');
    playerHandElement.classList.remove('hand-win', 'hand-lose');
    computerHandElement.classList.remove('hand-win', 'hand-lose');
    
    // Add appropriate animation classes
    setTimeout(() => {
        resultMessageElement.classList.add(result);
        
        if (result === 'win') {
            playerHandElement.classList.add('hand-win');
            computerHandElement.classList.add('hand-lose');
        } else if (result === 'lose') {
            playerHandElement.classList.add('hand-lose');
            computerHandElement.classList.add('hand-win');
        }
    }, 50);
}

async function playGame(playerChoice) {
    // Prevent clicking during animation
    if (isAnimating) return;
    isAnimating = true;
    
    // Disable buttons during animation
    setButtonsDisabled(true);
    
    // Reset result message
    resultMessageElement.classList.remove('win', 'lose', 'draw');
    resultMessageElement.textContent = 'Rock... Paper... Scissors...';
    
    // Play shake animation
    await playShakeAnimation();
    
    // Get computer choice
    const computerChoice = getComputerChoice();
    
    // Update hand images
    playerHandElement.src = playerImages[playerChoice];
    computerHandElement.src = computerImages[computerChoice];
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update scores
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    
    updateScore();
    
    // Show result message and animation
    resultMessageElement.textContent = getResultMessage(result, playerChoice, computerChoice);
    showResultAnimation(result);
    
    // Re-enable buttons
    setButtonsDisabled(false);
    isAnimating = false;
}

// Reset the game to initial state
function resetGame() {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    updateScore();
    
    // Reset hand images
    playerHandElement.src = playerImages.default;
    computerHandElement.src = computerImages.default;
    
    // Reset result message
    resultMessageElement.classList.remove('win', 'lose', 'draw');
    resultMessageElement.textContent = 'Make your move!';
    
    // Remove animation classes
    playerHandElement.classList.remove('hand-win', 'hand-lose');
    computerHandElement.classList.remove('hand-win', 'hand-lose');
    
    // Reset animation flag
    isAnimating = false;
    setButtonsDisabled(false);
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial hand images
    playerHandElement.src = playerImages.default;
    computerHandElement.src = computerImages.default;
    
    console.log('Rock Paper Scissors game loaded!');
    console.log('Click a button to play:');
    console.log('- Rock beats Scissors');
    console.log('- Paper beats Rock');
    console.log('- Scissors beats Paper');
});
