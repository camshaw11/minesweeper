document.addEventListener('DOMContentLoaded', startGame);
document.addEventListener("click", checkForWin);
document.addEventListener("contextmenu", checkForWin);

const resetBtn = document.querySelector(".reset");
const boardDiv = document.querySelector(".board");

let clickSound = new Audio("/audio/click.wav");
let failSound = new Audio("/audio/bomb.mp3");
let markSound = new Audio("/audio/mark.wav");


resetBtn.addEventListener("click", function() {
  board = {};
  boardDiv.innerHTML = "";
  console.log(boardDiv);
  console.log("clicked");
  startGame(board);
});


// define board object
let board = {};

// initial grid size
// let grid = 6;



function makeBoard() {

  // initialize empty array called cells
  board.cells = [];


  // initial grid size
  let grid = 6;

  // every time the outer loop runs once, the inner loop runs 3 times, giving our grid shape
  // ex. row 0 = col 1, 2, 3
  for (let i = 0; i < grid; i++) {
    for(let z = 0; z < grid; z++) {
        let cell = {
          row: i,
          col: z,
          isMine: Math.random() >= 0.8,
          isMarked: false,
          hidden: true
        }
      // push new object to cells array
      board.cells.push(cell);
    }
  }
}



function startGame () {

  makeBoard();

  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    board.cells[i].isMarked = false;
  }
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // myPlay();

  let test = true;

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      test = false;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      test = false;
    }
  }
  if (test) {
    lib.displayMessage('You win!');
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
    // lib.displayMessage('You win!')
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

  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  let count = 0;

  surrounding.forEach(cell => {
    if (cell.isMine) {
      count++;
    }
  });

  return count;
}

boardDiv.addEventListener("mousedown", function(e){
  if(e.button === 0 && e.target.classList.contains("mine")) {
    failSound.play();
  } else if (e.button === 2) {
    markSound.play();
  } else {
    clickSound.play();
  }
})
