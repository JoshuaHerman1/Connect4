// I did this project from scratch without realizing there was starter code, but I learned some new things by doing it this way so I'll take it as a win.
// Create the game board
const board = [];
for (let i = 0; i < 6; i++) {
  const row = [];
  for (let j = 0; j < 7; j++) {
    row.push(null);
  }
  board.push(row);
}

// Render the game board
const table = document.getElementById("board");
for (let i = 0; i < 6; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < 7; j++) {
    const cell = document.createElement("td");
    cell.addEventListener("click", () => handleClick(i, j));
    row.appendChild(cell);
  }
  table.appendChild(row);
}

let currentPlayer = "red";

// Handle a click on the game board
function handleClick(i, j) {
  // Find the first empty cell in the clicked column
  for (let k = 5; k >= 0; k--) {
    if (!board[k][j]) {
      // Place a piece of the current player's color
      board[k][j] = currentPlayer;

      // Render the piece on the screen
      const cell = table.children[k].children[j];
      cell.classList.add(currentPlayer);

      // Check for a win
      if (checkWin(k, j)) {
        alert(`Player ${currentPlayer} wins!`);
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      }
      return;
    }
  }
}

// Check for a win
function checkWin(i, j) {
  // Check for horizontal win
  let count = 0;
  for (let k = 0; k < 7; k++) {
    if (board[i][k] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check for vertical win
  count = 0;
  for (let k = 0; k < 6; k++) {
    if (board[k][j] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check for diagonal win (top-left to bottom-right)
  count = 0;
  let x = i;
  let y = j;
  while (x > 0 && y > 0) {
    x--;
    y--;
  }
  while (x < 6 && y < 7) {
    if (board[x][y] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    x++;
    y++;
  }

  // Check for diagonal win (top-right to bottom-left)
  count = 0;
  x = i;
  y = j;
  while (x > 0 && y < 6) {
    x--;
    y++;
  }
  while (x < 6 && y >= 0) {
    if (board[x][y] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    x++;
    y--;
  }
  return false;
}

