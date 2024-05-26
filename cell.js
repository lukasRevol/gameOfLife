export default class Cell { 
    constructor(x, y, h, w, state) {
        this.x = x  // position of cell in row. to this parameter will be asigned array "arr" index
        this.y = y  // position of cell in column . to this parameter will be asigned array "grid" or array "newGrid" index
        this.w = w  // width of cell. constant variable "cellSize" will be asigned here
        this.h = h  // height of cell. constant variable "cellSize" will be asigned here
        this.state = state // state of cell. "dead" or "alive"
    }

    draw(context) { // methode responsible for drawing cell on canvas
        context.beginPath(); // begining path were cell will be drawn
        context.rect(this.x, this.y, this.w, this.h); // rect() methode that draws square. it contains parameter of position x, position y, height and width
        context.strokeStyle='#222'; // methode strokeStyle() defines color of stroke
        context.stroke(); // methode stroke() draws outline of square
        context.closePath(); // closing path of that drawing
    }

    alive(context) { // methode changing status of cell to "alive". it also draws this cell with filled green rectangle
        this.state = 'alive' // change status to "alive"
        context.fillStyle='green'; // set fill style to green
        context.fillRect(this.x, this.y, this.w, this.h); //fill rectangle with previousli choosed color
    }

    dead(context) { // methode changing status of cell to "dead". it also draws this cell with filled grey rectangle
        this.state = 'dead' // change status to "dead"
        context.fillStyle='#333'; // set fill style to grey
        context.fillRect(this.x, this.y, this.w, this.h); // fill rectangle with previousli choosed color
    }

    update(context) { // update method called each time cell needs to be drawn or it changes status
        if (this.state === "alive") { // if statment checks if targeted cell has status "alive"
            this.alive(context) // if status of targeted cell is "alive" then set this cell parameters to "alive" and change fill color
        } else {
            this.dead(context) // else status can be only dead, if that happends set cell parameters to "dead" and change fill color 
        }
        this.draw(context)  //  call draw() methode that drawws cell on canvas
    }
}