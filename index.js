const board = document.querySelector('#board')

const cellSize = 20

const context = board.getContext('2d');
// let boardWidth = (window.innerWidth/2)-(window.innerWidth/2)%cellSize;
// let boardHeight = (window.innerHeight/2)-(window.innerHeight/2)%cellSize;
let boardWidth = 600;
let boardHeight = 400;

board.width = boardWidth;
board.height = boardHeight;

let cells = []

        // context.beginPath();
        // context.strokeStyle='black';
        // context.rect(0, 0, 50, 50);
        // context.stroke();
        // context.closePath();

class Cell {
    constructor(x, y, h, w, i, j) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.index = [i, j]
        this.status = "dead"
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.strokeStyle='black';
        
        context.stroke();
        context.closePath();
    }

    born(context) {
        this.status = "alive"
        context.fillStyle='green';
        context.fillRect(this.x, this.y, this.w, this.h);
        this.draw(context)
    }

    update(context) {
        this.draw(context) 
    }
}

let y = 0
for (let i = 0; i < boardHeight/cellSize; i++) {
    let x = 0
    for (let j = 0; j < boardWidth / cellSize; j++) {
        cells.push(new Cell(x, y, cellSize, cellSize, i,j))
        x+=cellSize
    }
    y+=cellSize
}


const updateBoard = () => {
    context.clearRect(0, 0, boardWidth, boardHeight);
    cells.forEach(el => {
        el.draw(context)
    });
    cells[255].born(context)
    cells.forEach(el => {
        if (el.status === "alive") {
            console.log(el);
        }
    });
};
    
setInterval(() => {
    requestAnimationFrame(updateBoard);
}, 1000);

updateBoard()