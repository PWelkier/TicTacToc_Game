let boardSize = 3;
let currentPlayer = 'X';
let cells = [];

function startGame() {
    boardSize = parseInt(document.getElementById('boardSize').value);
    cells = Array.from({ length: boardSize ** 2 }, () => '');
    renderBoard();
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;

    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleMove(index));
        board.appendChild(cell);
    });
}

function handleMove(index) {
    if (cells[index] === '') {
        cells[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            alert('Hurra!!!! Gracz: '+currentPlayer + ' wygrywa! ');
            resetGame();
        } else if (cells.every(cell => cell !== '')) {
            alert('Spróbuj jeszcze raz -Remis!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winningCombos = [];
    
    for (let i = 0; i < boardSize; i++) {
        winningCombos.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
    }
    
    for (let i = 0; i < boardSize; i++) {
        winningCombos.push(Array.from({ length: boardSize }, (_, j) => i + j * boardSize));
    }
   
    winningCombos.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
    winningCombos.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));

    return winningCombos.some(combo => {
        return combo.every(index => cells[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    cells = Array.from({ length: boardSize ** 2 }, () => '');
    renderBoard();
}