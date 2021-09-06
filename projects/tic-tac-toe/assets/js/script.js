/*Create a game of tic tac toe.
  -The design and representation and responsiveness of the tic tac toe board in the DOM is up to you.
  -The rule of whose turn it is (X or O) must be observed. You can choose whether X or O will play first.
  -The "state" of the board should strictly come from a two-dimensional array (In JS, that's array within an array).
  -You may use array built-in methods.
  
  When a player wins, you must show the history of the game.
  To do that, every move should be "saved".
  Implement (2) buttons, "Previous" and "Next", that will show up when a game is done / finished.
  When clicking "Previous" or "Next, the board should show the current move at that moment / turn.
  If there's no "next move", the next button must be disabled.
  If there's no "previous move", the previous button must be disabled.
  Implement a reset button, that:
  1. Restarts the game
  2. Hides the "Previous" and "Next" buttons
  3. Clears move history﻿
*/

let board = [
  ["","",""],
  ["","",""],
  ["","",""]
]

let available = []

let players = ["O","X"];
let currPlayer = players[0];

const rowLet = ['a','b','c'];
let myBoard = document.getElementById("ttt-board");

function drawBattle() {
  let h = myBoard.clientHeight / 3;
  let w = myBoard.clientWidth / 3;

  myBoard.innerHTML = "";
  available = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const tile = document.createElement("div");

      let spot = board[row][col];
      let availableSpot = `[${row}][${col}]`
      
      tile.className = "tile";
      tile.classList.add(rowLet[row] + col)

      if (spot === "X") {
        tile.innerHTML = "X";
      } else if (spot === "O") {
        tile.innerHTML = "O";
      } else {
        available.push(availableSpot)
      }

      myBoard.appendChild(tile);

      tile.onclick = function () {
        if (available.includes(availableSpot)) {
          board[row][col] = currPlayer;
          saveMove()
        }
      }
    }
  }
}

drawBattle()

function checkWinner(a,b,c) {
  return (a === b && b === c && a !== "")
}

function theWinner() {
  let winner = null;

  //Horizontal
  for (let row = 0; row < 3; row++) {
    if (checkWinner(board[row][0],board[row][1],board[row][2])) {
      winner = board[row][0];
    } 
  }

  //Vertical
  for (let col = 0; col < 3; col++) {
    if (checkWinner(board[0][col],board[1][col],board[2][col])) {
      winner = board[0][col];
    } 
  }

  //Diagonal
  if (checkWinner(board[0][0],board[1][1],board[2][2])) {
    winner = board[0][0];
  }

  if (checkWinner(board[0][2],board[1][1],board[2][0])) {
    winner = board[0][2];
  }

  return winner;
}

function nextPlayer() {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");

  currPlayer = currPlayer === players[0] ? players[1] : players[0];
  player1.className = currPlayer === players[0] ? "current-player" : "";
  player2.className = currPlayer === players[1] ? "current-player" : "";
}

function saveMove(row,col) {
  let result = theWinner();
  drawBattle();
  
  if (result !== null) {
    alert(`${result} wins!`)
  } else {
    if (available.length > 0) {
      nextPlayer()
    } else {
      alert(`It's a tie!`)
    }
  }
}

