class Player {
    static get UP() {
        return {x: 0, y: -1};
    }
    static get DOWN() {
        return {x: 0, y: 1};
    }
    static get LEFT() {
        return {x: -1, y: 0};
    }
    static get RIGHT() {
        return {x: 1, y: 0};
    }

    constructor(grid, size, name, nameColor, color, x, y) {
        this.grid = grid;

        this.size = size - (this.grid.wallsThickness * 1.5);
        this.name = name;
        this.nameColor = nameColor;
        this.color = color;
        this.x = x || this.grid.getMiddleCell('x');
        this.y = y || this.grid.getMiddleCell('y');
        this.visualX;
        this.visualY;

        this.score = 0;

        this._updateVisualCoords();
    }

    _updateVisualCoords() {
        this.visualX = this.x * this.grid.cellSize + (this.grid.wallsThickness);
        this.visualY = this.y * this.grid.cellSize + (this.grid.wallsThickness);
    }

    _canMoveTo(x, y) {
        if (this.x === x && this.y === y) {
            return false;
        }
        let currentCell = this.grid.getCellAt(this.x, this.y);
        let targetCell = this.grid.getCellAt(x, y);
        if (!targetCell) {
            let exit = this.grid.canExit(currentCell, x, y);
            if (exit) {
                console.log('YOU WIN');
            }
            return false;
        }
        let wallsState = this.grid.getWallsStateBetween(currentCell, targetCell);

        return wallsState;
    }

    move(dir) {
        let desiredX = this.x + dir.x;
        let desiredY = this.y + dir.y;
        if (this._canMoveTo(desiredX, desiredY)) {
            this.score += 1;
            console.log(`YOUR SCORE : ${this.score}`);

            this.x = desiredX;
            this.y = desiredY;

            this._updateVisualCoords();
        }
    }

    show() {
        noStroke();
        fill(this.color);
        rect(this.visualX, this.visualY, this.size, this.size);


        if (this.name) {
            fill(this.nameColor);
            textAlign(CENTER, CENTER);
            text(this.name, this.visualX, this.visualY, this.size, this.size);
        }
    }
}
