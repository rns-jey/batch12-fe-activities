/* ----CLOCK---- */
// Function to refresh time clock every second
function display_c() {
  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout("display_ct()", refresh);
}

// Function to display time clock
function display_ct() {
  const timeClock = document.getElementById("time-clock");
  var d = new Date();
  var dHr = d.getHours();
  var dMin = d.getMinutes();

  if (dMin < 10) {
    dMin = "0" + dMin;
  }

  timeClock.innerHTML = dHr + ":" + dMin;
  display_c();
}

display_ct();

// Initialize localStorage
// Input initial keys for quotes and data in localStorage on first time using
const quotesArr = [
  "Almost any decision is better than no decision — just keep moving.",
  "Commitment is the ignitor of momentum.",
];

const constObj = {
  username: "",
  yourFocus: "",
  todoList: [],
};

// check if keys already exists. if not, initialize localStorage key creation
function iniStorage(keyName,keyVar) {
  localStorage.getItem(keyName) === null ? localStorage.setItem(keyName, JSON.stringify(keyVar)) : "";
}

if (typeof Storage !== "undefined") {
  iniStorage("quoteData", quotesArr);
  iniStorage("data", constObj);
}

// Variables that will hold your new data from localStorage
let newQuoteArr = JSON.parse(localStorage.getItem("quoteData"));
let dataObj = JSON.parse(localStorage.getItem("data"));
let toDoItems = dataObj["todoList"];

/* ----INSPIRATIONAL QUOTES---- */
//Display Inspirational Quote
const quoteText = document.getElementById("quoteLabel");
let curRandNum = 0;
let newRandNum = 0;

const newQuoteText = document.getElementById("newQuoteID");

// function that will get a random number from the quote array
// do not get the index of the current displayed quote
function randNum(curNum) {
  while (newRandNum === curNum) {
    newRandNum = Math.floor(Math.random() * newQuoteArr.length);
  }

  return newRandNum;
}

quoteText.innerHTML = '"' + newQuoteArr[randNum(newRandNum)] + '"';

// Show/Hide Quote Buttons on mouse hover
const generateNewQuote = document.getElementById("generate-new");
const addMyOwnQuote = document.getElementById("add-my-quote");  

function mouseOver() {
  generateNewQuote.style.visibility = "visible";
  addMyOwnQuote.style.visibility = "visible";
}

function mouseOut() {
  generateNewQuote.style.visibility = "hidden";
  addMyOwnQuote.style.visibility = "hidden";
}

document.getElementById("inspQuote").onmouseover = function () {
  mouseOver();
}

document.getElementById("inspQuote").onmouseout = function () {
  mouseOut();
}

// Generate New Quote
generateNewQuote.addEventListener("click", function (event) {
  quoteText.innerHTML = '"' + newQuoteArr[randNum(newRandNum)] + '"';
});

// Add New Quote
addMyOwnQuote.addEventListener("click", function (event) {
  quoteText.style.display = "none";
  newQuoteText.value = "";
  newQuoteText.placeholder = quoteText.innerHTML.replace(/"/g, "");
  newQuoteText.style.display = "block";
  newQuoteText.focus();
});

// new quote input box key up listener
newQuoteText.addEventListener("keyup", function (event) {
  let inputVal = newQuoteText.value.trim();
  
  // Number 13 is the "Enter" key on the keyboard
  // Number 27 is the "Esc" key on the keyboard 
  if (event.keyCode === 13) {
    if (inputVal !== "") {
      newQuoteArr.push(inputVal);
      quoteText.innerHTML = '"' + inputVal + '"';
      localStorage.setItem("quoteData", JSON.stringify(newQuoteArr));
      quoteText.style.display = "block";
      newQuoteText.style.display = "none";
    }
  } else if (event.keyCode === 27) {
    quoteText.style.display = "block";
    newQuoteText.style.display = "none";
  }
});

// Function to greet you. Show/Hide Greeting and Main Focus if name is not available
const nameContain = document.getElementById("name-container");
const greetContain = document.getElementById("greetContainer");

function greetDisplay() {
  if (typeof Storage !== "undefined") {
    const greetMsg = document.getElementById("greetLabel");
    const focusContainer = document.getElementById("focus-container");

    if (dataObj["username"] !== "") {
      greetMsg.innerHTML = "Hi " + dataObj["username"] + "!";
      nameContain.style.display = "none";
      greetContain.style.display = "block";
      focusContainer.style.visibility = "visible";
    } else {
      greetMsg.innerHTML = "";
      nameContain.style.display = "block";
      greetContain.style.display = "none";
      focusContainer.style.visibility = "hidden";
    }
  }
}

// Function to display Main Focus Text. Show/Hide Main Focus Text if available
function focusDisplay() {
  if (typeof Storage !== "undefined") {
    const focusText = document.getElementById("focusLabel");
    const askFocus = document.getElementById("focusAsk");
    const focusShell = document.getElementById("focus-shell");

    if (dataObj["yourFocus"] !== "") {
      focusText.innerHTML = dataObj["yourFocus"];
      askFocus.style.display = "none";
      focusShell.style.display = "block";
    } else {
      focusText.innerHTML = "";
      askFocus.style.display = "block";
      focusShell.style.display = "none";
    }
  }
}

// Functions to Construct, Build and Display ToDo Elements
let toDoListContainer = document.getElementById("todo-list-container");

// Function to build ToDo Elements
function buildToDos(todo, index) {
  const toDoShell = document.createElement("div");
  const toDoText = document.createElement("span");
  const toDoIcons = document.createElement("div");
  const toDoCheck = document.createElement("span");
  const toDoDelete = document.createElement("span");

  toDoShell.className = "todo-shell";
  toDoText.innerHTML = todo["description"];
  toDoText.className = "todo-desc";
  toDoIcons.className = "todo-icons";
  toDoCheck.id = "chk" + index;
  toDoCheck.innerHTML = "✔";
  toDoDelete.id = "del" + index;
  toDoDelete.innerHTML = "✘";

  if (todo["complete"] === true) {
    toDoText.className = "todo-complete";
    toDoCheck.className = "chk-complete is-complete";
  } else {
    toDoCheck.className = "chk-complete";
  }

  toDoShell.appendChild(toDoText);
  toDoShell.appendChild(toDoIcons);
  toDoIcons.appendChild(toDoCheck);
  toDoIcons.appendChild(toDoDelete);

  toDoCheck.onclick = function () {
    let newBool = todo["complete"] === true ? false : true;

    completeToDo(index, newBool);
  };

  toDoDelete.onclick = function () {
    deleteToDo(index);
  };

  return toDoShell;
}

// Construct Function to build and return ToDo Element for Display
function constructToDos(toDos) {
  const currMapArr = toDos;
  const newMapArr = currMapArr.map(buildToDos);

  return newMapArr;
}

// Clear and Display ToDo Elements 
function displayToDos() {
  toDoListContainer.innerHTML = "";

  let toDoArr = constructToDos(toDoItems);

  toDoArr.forEach(function (item) {
    toDoListContainer.appendChild(item);
  });
}

// Input Your Name
const nameInput = document.getElementById("nameID");

nameInput.addEventListener("keyup", function (event) {
  let inputVal = nameInput.value.trim();

  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    if (inputVal !== "") {
      dataObj["username"] = inputVal;
      nameInput.value = "";
      localStorage.setItem("data", JSON.stringify(dataObj));
      greetDisplay();
    }
  } else if (event.keyCode === 27) {
    nameContain.style.display = "none";
    greetContain.style.display = "block";
  }
});

// Edit Name
document.getElementById("edit-name-btn").onclick = function () {
  nameContain.style.display = "block";
  greetContain.style.display = "none";
  nameInput.focus();
}

// Show/Hide Edit Name on mouse hover
const editNameShell = document.getElementById("edit-name-shell");

function mouseNameOver() {
  editNameShell.style.visibility = "visible";
}

function mouseNameOut() {
  editNameShell.style.visibility = "hidden";
}

document.getElementById("greetContainer").onmouseover = function () {
  mouseNameOver();
}

document.getElementById("greetContainer").onmouseout = function () {
  mouseNameOut();
}

// Input your main focus
const focusInput = document.getElementById("focusID");

focusInput.addEventListener("keyup", function (event) {
  let inputVal = focusInput.value.trim();

  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    if (inputVal !== "") {
      dataObj["yourFocus"] = inputVal;
      focusInput.value = "";
      localStorage.setItem("data", JSON.stringify(dataObj));
      focusDisplay();
    }
  }
});

// Function to Show/Hide ToDo Container
const showToDoBtn = document.getElementById("btnShowToDo");
const hideToDoBtn = document.getElementById("todo-exit-text");
const todoContain = document.getElementById("todoContainer");
  
showToDoBtn.addEventListener("click", function (event) {
  showToDoBtn.style.display = "none";
  todoContain.style.display = "block";
});

hideToDoBtn.addEventListener("click", function (event) {
  showToDoBtn.style.display = "block";
  todoContain.style.display = "none";
});

// Class to Construct ToDo Item
class clsToDo {
  constructor(description) {
    this.description = description;
    this.complete = false;
  }
}

// Function and EventHandler to Add New ToDo
const newToDo = document.getElementById("newToDo");

newToDo.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    if (newToDo.value !== "") {
      addToDo();
    }
  }
});

function addToDo() {
  toDoItems.push(new clsToDo(newToDo.value.trim()));
  localStorage.setItem("data", JSON.stringify(dataObj));
  newToDo.value = "";
  displayToDos();
}

// Functions to Complete and Delete ToDo
function completeToDo(todoID, isComplete) {
  toDoItems[todoID].complete = isComplete;
  localStorage.setItem("data", JSON.stringify(dataObj));
  displayToDos();
}

function deleteToDo(todoID) {
  dataObj["todoList"].splice(todoID, 1);

  localStorage.setItem("data", JSON.stringify(dataObj));
  displayToDos();
}

// Function to factory reset momentum app
const resetBtn = document.getElementById("btnReset");

resetBtn.addEventListener("click", function (event) {
  localStorage.setItem("data", JSON.stringify(constObj));
  dataObj = JSON.parse(localStorage.getItem("data"));
  greetDisplay();
  focusDisplay();
  toDoListContainer.innerHTML = "";
});

// Display on load
greetDisplay();
focusDisplay();
displayToDos();