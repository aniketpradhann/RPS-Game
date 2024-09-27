console.log("script initialised");

const gameObjects = ['rock', 'paper', 'scissors'];
const startBtn = document.getElementById('startbtn');
const userChoiceDiv = document.getElementById("user-choice");
const computerChoiceDiv = document.getElementById("computer-choice");
const objBtns = document.querySelectorAll('.game-objects button');
const result = document.getElementById('result');

const outcomes = {
    rock: { scissors: 'crushes', paper: 'covers' },
    paper: { rock: 'covers', scissors: 'cuts' },
    scissors: { paper: 'cuts', rock: 'crushes' },
};


let userChoiceinput = '';
let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

objBtns.forEach(button => {
    button.addEventListener('click', () => {
        userChoiceinput = button.textContent.toLowerCase();
        userChoiceDiv.textContent = `User choice: ${userChoiceinput}`;
    });
});


startBtn.addEventListener('click', function playGame() {
    console.log(roundsPlayed);

    if (!userChoiceinput) {
        result.innerText = "Please make a choice before starting the game.";
        return;
    }
    
    let computerChoice = getComputerChoice();
    computerChoiceDiv.textContent = `Computer choice: ${computerChoice}`;
    playRound(userChoiceinput, computerChoice);

    if (roundsPlayed === 5) {
        if (humanScore > computerScore) {
            result.innerText += "Congratulations! You are the overall winner!";
        } else if (humanScore < computerScore) {
            result.innerText += "Sorry, the computer is the overall winner.";
        } else {
            result.innerText += "It's a tie! No overall winner.";
        }
        humanScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        userChoiceinput = '';
        userChoiceDiv.textContent = '';
        computerChoiceDiv.textContent = '';
    }
});


function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * gameObjects.length);
    console.log(gameObjects[randomNum]);
    return gameObjects[randomNum];
}

function playRound(userChoice, computerChoice) {
    roundsPlayed++;
    result.innerText = ''; 

    if (userChoice === computerChoice) {
        result.innerText += `It's a tie! Your score: ${humanScore} | Computer score: ${computerScore}\n`;
    } else if (outcomes[userChoice] && outcomes[userChoice][computerChoice]) {
        humanScore++;
        result.innerText += `You win! ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} ${outcomes[userChoice][computerChoice]} ${computerChoice}. Your score: ${humanScore} | Computer score: ${computerScore}\n`;
    } else {
        computerScore++;
        result.innerText += `You lost! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} ${outcomes[computerChoice][userChoice]} ${userChoice}. Your score: ${humanScore} | Computer score: ${computerScore}\n`;
    }
}
