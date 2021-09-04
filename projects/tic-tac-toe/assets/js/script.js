let board = [
  ["X","O","X"],
  ["X","O","O"],
  ["O","O","X"]
]

const rowLet = ['a','b','c'];
let myBoard = document.getElementById("ttt-board");

function drawBattle() {
  let h = myBoard.clientHeight / 3;
  let w = myBoard.clientWidth / 3;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const tile = document.createElement("div");
      const theMove = document.createElement("div");

      let spot = board[row][col];

      tile.className = "tile";
      tile.classList.add(rowLet[row] + col)

      if (spot === "X") {
        theMove.innerHTML = "X";
      } else if (spot === "O") {
        theMove.innerHTML = "O";
      }

      tile.appendChild(theMove)

      thisBoard.appendChild(tile);
    }
  }
}

drawBattle()