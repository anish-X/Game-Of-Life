function makeGrid() {
  const grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width).fill(0);
  }
  return grid;
}

function getRandomized() {
  const grid = makeGrid();
  let count = 0;
  while (count < 501) {
    const row = Math.floor(Math.random() * height);
    const col = Math.floor(Math.random() * width);
    if (grid[row][col] === 0) {
      grid[row][col] = 1;
      count++;
    }
  }
  return grid;
}

function cellExists(row, col) {
  return row >= 0 && row < height && col >= 0 && col < width;
}

function getCell(board, row, col) {
  return cellExists(row, col) ? board[row][col] : 0;
}

function countAliveNeighbors(board, row, col) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      count += getCell(board, row + dr, col + dc);
    }
  }
  return count;
}

function getNextGeneration(currentBoard) {
  const nextBoard = makeGrid();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const alive = currentBoard[row][col] === 1;
      const neighbors = countAliveNeighbors(currentBoard, row, col);

      if (alive && (neighbors === 2 || neighbors === 3)) {
        nextBoard[row][col] = 1;
      } else if (!alive && neighbors === 3) {
        nextBoard[row][col] = 1;
      }
    }
  }
  return nextBoard;
}
