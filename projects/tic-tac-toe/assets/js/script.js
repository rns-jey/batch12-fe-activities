let board = [
  ["","",""],
  ["","",""],
  ["","",""]
]

let players = ["X","O"];
let currPlayer = players[0];

const rowLet = ['a','b','c'];
let myBoard = document.getElementById("ttt-board");

function drawBattle() {
  let h = myBoard.clientHeight / 3;
  let w = myBoard.clientWidth / 3;

  myBoard.innerHTML = "";

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const tile = document.createElement("div");
      const theMove = document.createElement("div");

      let spot = board[row][col];

      tile.className = "tile";
      tile.classList.add(rowLet[row] + col)

      if (spot === "X") {
        tile.innerHTML = "X";
      } else if (spot === "O") {
        tile.innerHTML = "O";
      }

      myBoard.appendChild(tile);

      tile.onclick = function () {
        saveMove(row,col)
      }
    }
  }
}

drawBattle()

function nextPlayer() {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");

  currPlayer = currPlayer === players[0] ? players[1] : players[0];
  player1.className = currPlayer === players[0] ? "current-player" : "";
  player2.className = currPlayer === players[1] ? "current-player" : "";
}

function saveMove(row,col) {
  board[row][col] = currPlayer;
  drawBattle();
  nextPlayer()
}

