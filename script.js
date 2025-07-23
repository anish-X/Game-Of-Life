// DOM elements
const table = document.getElementById('table');
const stepBtn = document.getElementById('stepBtn');
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');

const width = 50;
const height = 35;

let board = [];
let intervalId = null;

// --- Table Rendering ---
function makeRow() {
  const row = document.createElement('tr');
  for (let i = 0; i < width; i++) {
    const cell = document.createElement('td');
    cell.addEventListener('click', () => {
      cell.classList.toggle('alive');
      const rowIndex = cell.parentNode.rowIndex;
      const colIndex = cell.cellIndex;
      board[rowIndex][colIndex] = board[rowIndex][colIndex] === 1 ? 0 : 1;
    });
    row.appendChild(cell);
  }
  return row;
}

function makeTable() {
  table.innerHTML = '';
  for (let i = 0; i < height; i++) {
    table.appendChild(makeRow());
  }
}

function paintBoard(board) {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cell = table.rows[row].cells[col];
      cell.classList.toggle('alive', board[row][col] === 1);
    }
  }
}

// --- Button Handlers ---
stepBtn.addEventListener('click', () => {
  board = getNextGeneration(board);
  paintBoard(board);
});

playBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    playBtn.textContent = 'Play';
  } else {
    intervalId = setInterval(() => {
      board = getNextGeneration(board);
      paintBoard(board);
    }, 200);
    playBtn.textContent = 'Pause';
  }
});

resetBtn.addEventListener('click', () => {
  board = getRandomized();
  paintBoard(board);
});

clearBtn.addEventListener('click', () => {
  board = makeGrid();
  paintBoard(board);
  clearInterval(intervalId);
  intervalId = null;
  playBtn.textContent = 'Play';
});

// --- Initialization ---
makeTable();
board = getRandomized();
paintBoard(board);
