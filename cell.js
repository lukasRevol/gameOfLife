export default class Cell {
    constructor(x, y, h, w, state) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.state = state
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.strokeStyle='#222';
        context.stroke();
        context.closePath();
    }

    alive(context) {
        this.state = 'alive'
        context.fillStyle='green';
        context.fillRect(this.x, this.y, this.w, this.h);
        this.draw(context)
    }

    dead(context) {
        this.state = 'dead'
        context.fillStyle='#333';
        context.fillRect(this.x, this.y, this.w, this.h);
        this.draw(context)
    }

    update(context) {
        if (this.state === "alive") {
            this.alive(context)
        } else {
            this.dead(context)
        }
        this.draw(context) 
    }
}