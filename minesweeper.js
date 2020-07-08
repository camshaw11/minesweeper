// event listeners for click/window load events
document.addEventListener('DOMContentLoaded', startGame);
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

// reset button and board div
const resetBtn = document.querySelector(".reset");
const boardDiv = document.querySelector(".board");

// sound effects
let clickSound = document.getElementsByTagName("audio")[0];
let failSound = document.getElementsByTagName("audio")[1];
let markSound = document.getElementsByTagName("audio")[2];
let winSound = document.getElementsByTagName("audio")[3];


// listen for clicks on the reset button and run function
resetBtn.addEventListener("click", function() {
  // clear board object
  board = {};

  clickSound.play();

  // remove all content inside the board div
  document.querySelector(".board").innerHTML = "";
  // run start game function again
  startGame();
});


// define board object
let board = {};

// initial grid size
let grid = 6;


// function to make the board contents
function makeBoard() {

  // initialize empty array called cells
  board.cells = [];

  // every time the outer loop runs once -
  // the inner loop runs 3 times, giving our grid shape
  // ex. row 0 = col 1, 2, 3
  for (let i = 0; i < grid; i++) {
    for(let z = 0; z < grid; z++) {
        let cell = {
          row: i,
          col: z,
          isMine: Math.random() >= 0.8, // 20% chance of getting true
          isMarked: false,
          hidden: true
        }
      // push new object to cells array
      board.cells.push(cell);
    }
  }
}


// run function on page load
function startGame () {

  // call make board function
  makeBoard();

  // loop through cells and assign surrounding mines
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].isMarked = false;
  }
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()

  
  // function to play sound effects
  document.querySelector(".board").addEventListener("mousedown", function(e){
    // if left click and it is a mine
    if(e.button === 0 && e.target.classList.contains("mine")) {
      failSound.play();
      // if right click
    } else if (e.button === 2) {
      markSound.play();
      // regular left click
    } else {
      clickSound.play();
    }
  })
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // test to see if user won
  let test = true;
  // loop through cells to check if any mines are unmarked
  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      test = false;
      // if cell is not a mine and its still hidden user has not won yet
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      test = false;
    }
  }
  // if they pass the test
  if (test) {
    lib.displayMessage('You win!');
    // play success sound
    winSound.play();
  }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.


function countSurroundingMines (cell) {
  // return cell objects in an array
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  // set initial count of cells as zero
  let count = 0;
  // loop through each cell and add to the counter if it is a mine
  surrounding.forEach(cell => {
    if (cell.isMine) {
      count++;
    }
  });

  return count;
}

