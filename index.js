
import Cell from './cell.js';

const board = document.querySelector('#board');
const context = board.getContext('2d');

const cellSize = 20;
const rows = 20;
const cols = 40;

let boardWidth = cellSize * cols;
let boardHeight = cellSize * rows;

board.width = boardWidth;
board.height = boardHeight;

let grid = [];
let newGrid = [];

const setup = () => {
    for (let i = 0; i < rows; i++) {
        let arr = [];
		for (let j = 0; j < cols; j++) {
            arr.push(
                new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')
			);
		}
		grid.push(arr);
	}
    
	for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].update(context);
			grid[i][j].state = 'dead';
		}
	}
};
setup();

const randomCell = () => {
    for (let i = 0; i < 200; i++) {
        let x = Math.floor(Math.random() * 19);
		let y = Math.floor(Math.random() * 39);
		grid[x][y].alive(context);
	}
};
randomCell();

let lastUpdateTime = 0;
const updateInterval = 1000;

// ---------------------------------
// tak, wiem, kod paskudny, chciałem tylko zrozumieć jak to działa, obiecuje tym razem zrobie refactor xD i tym razem dokończe projekt
// ---------------------------------
const updateBoard = (timestamp) => {
	if (timestamp - lastUpdateTime >= updateInterval) {
		for (let i = 0; i < rows; i++) {
			let arrr = [];
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
						arrr.push(
							new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')
						);
						console.log('ALIVE mniej niz 2 więcej niz 4');
					}
					if (aliveCount === 2 || aliveCount === 3) {
						arrr.push(
							new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'alive')
						);
						console.log('ALIVE miedzy 2, a 4');
					}
				} else if (grid[i][j].state === 'dead' && aliveCount === 3) {
					arrr.push(
						new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'alive')
					);
					console.log('DEAD równo 3');
				} else if (grid[i][j].state === 'dead' && aliveCount !== 3) {
					arrr.push(
						new Cell(j * cellSize, i * cellSize, cellSize, cellSize, 'dead')
					);
					console.log('DEAD inaczej niz 3');
				}
			}
			newGrid.push(arrr);
		}

		grid = newGrid.slice();
		newGrid = [];

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				grid[i][j].update(context);
			}
		}
		lastUpdateTime = timestamp;
	}
	requestAnimationFrame(updateBoard);
};
requestAnimationFrame(updateBoard);
