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

const curtain = document.getElementById("curtain");
const topCurtain = document.getElementById("top-curtain");
const botCurtain = document.getElementById("bot-curtain");

let board = [
  ["","",""],
  ["","",""],
  ["","",""]
];

function entrance() {
  setTimeout(() => {
    topCurtain.classList.add("open-top");
    botCurtain.classList.add("open-bot");

    setTimeout(() => {
      curtain.style.display = "none"
    }, 1000);
  }, 1000)  ;
}

entrance();

let myBoard = document.getElementById("ttt-board");
let available = [];
let players = ["X","O"];
let currPlayer = players[0];
const rowLet = ['a','b','c'];
let isGameover = false;

function drawBattle(currBoard) {
  myBoard.innerHTML = "";
  available = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const tile = document.createElement("div");
      const theMove = document.createElement("span");

      let spot = currBoard[row][col];
      let availableSpot = `[${row}][${col}]`;

      if (spot === "X") {
        theMove.innerHTML = "X";
      } else if (spot === "O") {
        theMove.innerHTML = "O";
      } else {
        available.push(availableSpot);
      }

      tile.appendChild(theMove);
      tile.className = "tile";
      tile.classList.add(rowLet[row] + col);

      myBoard.appendChild(tile);

      tile.onclick = function () {
        if (isGameover !== true) {
          if (available.includes(availableSpot)) {
            currBoard[row][col] = currPlayer;
            saveMove();
          }
        }
      }
    }
  }
}

drawBattle(board);

function checkWinner(a,b,c) {
  return (a === b && b === c && a !== "")
}

let winningTrio = [];

function theWinner() {
  let winner = null;

  //Horizontal
  for (let row = 0; row < 3; row++) {
    if (checkWinner(board[row][0],board[row][1],board[row][2])) {
      winner = board[row][0];
      winningTrio = [`${rowLet[row]}0`,`${rowLet[row]}1`,`${rowLet[row]}2`]
    }
  }

  //Vertical
  for (let col = 0; col < 3; col++) {
    if (checkWinner(board[0][col],board[1][col],board[2][col])) {
      winner = board[0][col];
      winningTrio = [`a${col}`,`b${col}`,`c${col}`]
    } 
  }

  //Diagonal
  if (checkWinner(board[0][0],board[1][1],board[2][2])) {
    winner = board[0][0];
    winningTrio = [`a0`,`b1`,`c2`]
  }

  if (checkWinner(board[0][2],board[1][1],board[2][0])) {
    winner = board[0][2];
    winningTrio = [`a2`,`b1`,`c0`]
  }

  return (winner === players[0] ? "You win!" : winner === players[1] ? "You lose!" : null);
}

let history = [];

function saveHistory() {
  let historyBoard = [
    ["","",""],
    ["","",""],
    ["","",""]
  ]

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      historyBoard[row][col] = board[row][col]
    }
  }

  history.push(historyBoard)
}

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let versusSet = "1 Player";

async function aiTurn() {
  let aiMove = new Promise((resolve, reject) => {
    setTimeout(() => {

      let arrIndexes = available[Math.floor(Math.random() * available.length)];

      resolve(`board${arrIndexes} = "${currPlayer}"`)
    }, 250)
  });
  
  let result = await aiMove;

  eval(result);
  saveMove();
}

function nextPlayer() {
  currPlayer = currPlayer === players[0] ? players[1] : players[0];
  player1.className = currPlayer === players[0] ? "current-player" : "";
  player2.className = currPlayer === players[1] ? "current-player" : "";

  if (versusSet === "1 Player") {
    if (currPlayer === players[1]) {
      aiTurn();
    }
  }
}

let historyIndex = 0;
const playerShell = document.getElementById("players");
const gameOverShell = document.getElementById("game-over");

function gameOver() {
  isGameover = true;
  player1.className = "";
  player2.className = "";
  historyIndex = history.length - 1; 

  playerShell.style.display = "none"
  gameOverShell.style.display = "block"
}

function displayWinner() {
  for (let i = 0; i < winningTrio.length; i++) {
    const tile = document.querySelector(`.${winningTrio[i]}`);
    
    tile.classList.add("winning-trio");
  }
}

const winnerName = document.getElementById("the-winner");
const p1Name = document.getElementById("p1-name");
const p2Name = document.getElementById("p2-name");

function saveMove() {
  let result = theWinner();
  drawBattle(board);
  saveHistory();

  if (result === null) {
    if (available.length > 0) {
      nextPlayer()
    } else {
      winnerName.innerHTML = "It's a Tie!";
      gameOver()
    }
  } else {
    winnerName.innerHTML = currPlayer === players[0] ? `${p1Name.innerHTML} Wins!` : `${p2Name.innerHTML} Wins!`;
    displayWinner()
    gameOver()
  }
}

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnReset = document.getElementById("btn-reset");

function disableBtn() {
  if (historyIndex === 0) {
    btnPrev.disabled = true;
  } else if (historyIndex > 0) {
    btnPrev.disabled = false;
  }

  if (historyIndex === (history.length - 1)) {
    btnNext.disabled = true;
    displayWinner()
  } else if (historyIndex < (history.length - 1)) {
    btnNext.disabled = false;
  }
}

btnPrev.addEventListener("click", function (event) {
  historyIndex -= 1;
  drawBattle(history[historyIndex]);

  disableBtn()
});

btnNext.addEventListener("click", function (event) {
  historyIndex += 1;
  drawBattle(history[historyIndex]);

  disableBtn()
});

function resetGame() {
  board = [
    ["","",""],
    ["","",""],
    ["","",""]
  ]

  history = [];
  isGameover = false;
  currPlayer = players[0];
  winningTrio = [];
  player1.className = "current-player";
  player2.className = "";

  playerShell.style.display = "block"
  gameOverShell.style.display = "none"

  drawBattle(board);
}

btnReset.addEventListener("click", function (event) {
  resetGame()
});

const player1Elem = document.getElementById("player1");
const player2Elem = document.getElementById("player2");

function changeCharacters() {
  const p1Char = document.getElementById("p1-char");
  const p2Char = document.getElementById("p2-char");

  players = players[0] === "X" ? ["O","X"] : ["X","O"];
  p1Char.innerHTML = p1Char.innerHTML === "X" ? "O" : "X";
  p2Char.innerHTML = p2Char.innerHTML === "X" ? "O" : "X";
  resetGame()
}

player1Elem.addEventListener("click", function (event) {
  changeCharacters()
});

player2Elem.addEventListener("click", function (event) {
  changeCharacters()
});

const btnVersus = document.getElementById("versus");

btnVersus.addEventListener("click", function (event) {
  const vsAIDisplay = document.getElementById("vs-ai");
  const vs2pDisplay = document.getElementById("vs-2p");

  if (versusSet === "1 Player") {
    vsAIDisplay.style.display = "none"
    vs2pDisplay.style.display = "block"
    p2Name.innerHTML = "Player2"
    versusSet = "2 Player"
  } else {
    vsAIDisplay.style.display = "block"
    vs2pDisplay.style.display = "none"
    p2Name.innerHTML = "Computer"
    versusSet = "1 Player"
  }

  resetGame()
});
