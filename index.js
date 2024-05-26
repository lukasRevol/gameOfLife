import Cell from './cell.js'; // imporrting "Cell" class from cell.js
 
const board = document.querySelector('#board'); // targeting canvas element in html by searching for element with ID "board" 
const context = board.getContext('2d'); // setting type of canvas, 2D or 3D, in this case its 2D

const cellSize = 10; // setting size of each cell

let boardWidth = window.innerWidth - window.innerWidth%cellSize; // calculating cavas width 
let boardHeight = window.innerHeight - window.innerWidth%cellSize

const rows = boardHeight/cellSize; // setting number of rows: dividing canvas height by cellSize 
const cols = boardWidth/cellSize; // setting number of columns: dividing canvas Width by cellSize

board.width = boardWidth; // setting canvas width
board.height = boardHeight; // setting canvas height

let grid = []; // empty grid, it will contain all generated cells and will be shown on screen
let newGrid = []; // empty grid for next frame of animation, it will contain next generation of cells
// after generating "newGrid". "newGrid" values will overwrite "grid" values in next animation frame 

let lastUpdateTime = 0; // variable used to calculate time difference between each animation frame. It will store startup tim of function: "update board"
const updateInterval = 100; // constant variable used to set expected time difference between each frame animation

// "SETUP FUNCTION" - function used to create array "grid" wich will be first frame of animation. All cells in this grid will have status: "dead" at start
const setup = () => {
    for (let i = 0; i < rows; i++) { // loop iterating troughtout all rows
        let arr = []; // temporary array. will be pushed to first row
		for (let j = 0; j < cols; j++) { // loop itterating troughtout all columns
            arr.push(new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')); // pushing new object "Cell" to temporary array "arr". it will repeat insid loop function
		}
		grid.push(arr); // after creating first temporary array "arr", it will push that array inside of array "grid"
	}
};
setup(); // running "setup" function, only once


// RANDOMIZING ALIVE CELLS - function that will creat 5000 cells with status alive in random positions on canvas. 
// It will choose random index in array "grid".
// Then inside that index is another array "arr". Again it will choos random index of that array
const randomCell = () => { 
    for (let i = 0; i < 5000; i++) { // hardcoded number of randomized "alive" cells
        let x = Math.floor(Math.random() * (rows-1)); //randomize number between 0 and number of rows minus 1
		let y = Math.floor(Math.random() * (cols-1)); //randomize number between 0 and number of columns minus 1
		grid[x][y].alive(context); // targeting cell with randomized idex of array "grid" and randomized index of array "arr" 
	}
};
randomCell(); // running "randomCell" function, only once.

// UPDATE EACH CELL VISUAL REPRESENTATION 
const updateCellsOncanvas = () => { // nested loops itterating troughtout all cells in canvas and running class "Cell" methode "update()" on each cell
	for (let i = 0; i < rows; i++) { // loop on rows
		for (let j = 0; j < cols; j++) { // nested loop on columns
			grid[i][j].update(context); // running methode "update()"
		}
	}
}

// Comlicated and not very beautiful function that creates new array "newGrid" with updated cell status depending on that cell neighboring cells status
const checkNeighbors = () => {

	// Nested For loops iterate through all cells in "grid" array. And on every cell it checks neighboring cells status
	for (let i = 0; i < rows; i++) {
		let arr = [];
		for (let j = 0; j < cols; j++) {
			let aliveCount = 0;
			if (i > 0 && j > 0 && grid[i - 1][j - 1].state === 'alive') {
				aliveCount += 1;
			}
			if (i != 0 && grid[i - 1][j].state === 'alive') {
				aliveCount += 1;
			}
			if (i > 0 && j < cols - 1 && grid[i - 1][j + 1].state === 'alive') {
				aliveCount += 1;
			}
			if (j > 0 && grid[i][j - 1].state === 'alive') {
				aliveCount += 1;
			}
			if (j < cols - 1 && grid[i][j + 1].state === 'alive') {
				aliveCount += 1;
			}
			if (i < rows - 1 && j > 0 && grid[i + 1][j - 1].state === 'alive') {
				aliveCount += 1;
			}
			if (i < rows - 1 && grid[i + 1][j].state === 'alive') {
				aliveCount += 1;
			}
			if (
				i < rows - 1 &&
				j < cols - 1 &&
				grid[i + 1][j + 1].state === 'alive'
			) {
				aliveCount += 1;
			}

			if (grid[i][j].state === 'alive') {
				if (aliveCount < 2 || aliveCount >= 4) {
					arr.push(
						new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')
					);
				}
				if (aliveCount === 2 || aliveCount === 3) {
					arr.push(
						new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'alive')
					);
				}
			} else if (grid[i][j].state === 'dead' && aliveCount === 3) {
				arr.push(
					new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'alive')
				);
			} else if (grid[i][j].state === 'dead' && aliveCount !== 3) {
				arr.push(
					new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')
				);
			}
		}
		newGrid.push(arr);
	}
}

const run = true

const updateBoard = (timestamp) => {
	if (timestamp - lastUpdateTime >= updateInterval) {
		
		checkNeighbors()
		grid = newGrid.slice();
		newGrid = [];
		updateCellsOncanvas()

		lastUpdateTime = timestamp;
	}
	if (run === true) {
		
		requestAnimationFrame(updateBoard);
	}
};
requestAnimationFrame(updateBoard);
