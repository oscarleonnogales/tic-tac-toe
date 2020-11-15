const overlay = document.querySelector('[data-overlay]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');
const board = document.querySelector('[data-board]');
const cells = Array.from(document.querySelectorAll('[data-cell]'));
const xWinsCounter = document.querySelector('[data-x-wins]');
const oWinsCounter = document.querySelector('[data-o-wins]');


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;

let xWins = 0;
let oWins = 0;

playGame();

restartButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    playGame();
    xTurn = true;
});

function playGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', clickValidCell);
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.addEventListener('click', clickValidCell, {once: true});
    });
}

function clickValidCell(e) {
    const cell = e.target;
    placeMark(cell);
    if(checkWin()) {
        displayEnd();
    }
    if(checkForDraw()) {
        displayEnd();
    }
    changeTurns();
}

function changeTurns() {
    xTurn = !xTurn;
}

function placeMark(cell) {
    if(xTurn) {
        cell.classList.add('x');
    } else {
        cell.classList.add('circle');
    }
}

function checkWin() {
    
    let currentClass;
    xTurn ? currentClass = 'x' : currentClass = 'circle';

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function checkForDraw() {
    return cells.every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}

function displayEnd() {
    if(checkForDraw()) {
        winningMessage.innerText = 'It\'s A Tie!';
    } else {
        if(xTurn) {
            xWins++;
            winningMessage.innerText = 'X\'s Win!';
        } else {
            oWins++;
            winningMessage.innerText = 'O\'s Win!';
        }
    }
    xWinsCounter.innerText = `${xWins} Wins`;
    oWinsCounter.innerText = `${oWins} Wins`;
    overlay.classList.add('active');
}