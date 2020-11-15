const overlay = document.querySelector('[data-overlay]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');
const board = document.querySelector('[data-board]');
const cells = Array.from(document.querySelectorAll('[data-cell]'));
const xWinsCounter = document.querySelector('[data-x-wins]');
const oWinsCounter = document.querySelector('[data-o-wins]');
const toggleButton = document.querySelector('[data-toggle-button]');

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
let playingCPU = true;

let xWins = 0;
let oWins = 0;

playGame();

toggleButton.addEventListener('click', () => {
    if(playingCPU) {
        toggleButton.innerText = 'Player vs. Player';
    } else {
        toggleButton.innerText = 'Player vs. CPU';
    }
    playingCPU = !playingCPU;
    playGame();
    xWins = 0;
    oWins = 0;
});

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

    //if two player mode, change turns.
    //if one player mode, let's change turns but then make the CPU pick the next move
    if(playingCPU) {
        cpuMove();
    }
    changeTurns();
    
}

function cpuMove() {
    //pick a random cell not occupied
    //fill it
    let randomCell;
    let draw = checkForDraw();
    do {
        randomCell = cells[Math.floor(Math.random() * cells.length)];
        console.log('picked a random cell');
        console.log(randomCell);
    } while((randomCell.classList.contains('x') || randomCell.classList.contains('circle')) && !draw);
    changeTurns();
    if(!draw) {
        placeMark(randomCell);
    }
}

function changeTurns() {
    xTurn = !xTurn;
}

function placeMark(cell) {
    if(xTurn) {
        cell.classList.add('x');
        console.log('placed an x');
    } else {
        cell.classList.add('circle');
        console.log('placed a circle');
    }
    if(checkWin()) {
        displayEnd(false);
    } else {
        if(checkForDraw()) {
            displayEnd(true);
        }
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
    });
}

function displayEnd(tie) {
    if(tie) {
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