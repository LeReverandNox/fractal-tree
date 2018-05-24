class Cell {
    static get UP_WALL() {
        return 0;
    }
    static get DOWN_WALL() {
        return 1;
    }
    static get LEFT_WALL() {
        return 2;
    }
    static get RIGHT_WALL() {
        return 3;
    }

    constructor(grid, x, y, cellSize, wallsColor, wallsThickness, textColor) {
        this.grid = grid;

        this.x = x;
        this.y = y;
        this.visualX = x * cellSize;
        this.visualY = y * cellSize;
        this.cellSize = cellSize;
        this.wallsColor = wallsColor;
        this.wallsThickness = wallsThickness;
        this.textColor = textColor;

        this.isVisited = false;
        this.isExit = false;
        this.text = '';
        this.walls = [
            {
                name: 'UP',
                isDestroyed: false,
                formula: {
                    fromX: this.visualX,
                    fromY: this.visualY + floor(this.wallsThickness / 2),
                    toX: this.visualX + this.cellSize,
                    toY: this.visualY + floor(this.wallsThickness / 2)
                }
            },
            {
                name: 'DOWN',
                isDestroyed: false,
                formula: {
                    fromX: this.visualX,
                    fromY: this.visualY + this.cellSize,
                    toX: this.visualX + this.cellSize,
                    toY: this.visualY + this.cellSize
                }
            },
            {
                name: 'LEFT',
                isDestroyed: false,
                formula: {
                    fromX: this.visualX + floor(this.wallsThickness / 2),
                    fromY: this.visualY,
                    toX: this.visualX + floor(this.wallsThickness / 2),
                    toY: this.visualY + this.cellSize
                }
            },
            {
                name: 'RIGHT',
                isDestroyed: false,
                formula: {
                    fromX: this.visualX + this.cellSize,
                    fromY: this.visualY,
                    toX: this.visualX + this.cellSize,
                    toY: this.visualY + this.cellSize
                }
            }
        ];
    }

    show() {
        push();
        noFill();
        stroke(this.wallsColor);
        strokeWeight(this.wallsThickness);
        strokeCap(PROJECT);

        this.walls.forEach((wall) => {
            if (!wall.isDestroyed) {
                let form = wall.formula;
                line(form.fromX, form.fromY, form.toX, form.toY);
            }
        });
        pop();

        if (this.text) {
            fill(this.textColor);
            textAlign(CENTER, CENTER);
            let x = this.visualX + (this.wallsThickness / 2);
            let y = this.visualY + (this.wallsThickness / 2);
            text(this.text, x, y, this.cellSize, this.cellSize);
        }
    }

    highlight(color) {
        noStroke();
        fill(color);
        let x = this.visualX + (this.wallsThickness / 2);
        let y = this.visualY + (this.wallsThickness / 2);
        let size = this.cellSize - (this.wallsThickness / 2);
        rect(x, y, size, size);
    }

    getRandomNeighbor() {
        let neighbors = this._getNeighbors();

        if (neighbors.length < 1) {
            return undefined;
        }
        return neighbors[floor(random(neighbors.length))];
    }

    _getNeighbors() {
        let neighbors = [];

        let upCell = this.grid.getCellAt(this.x, this.y - 1);
        if (upCell && !upCell.isVisited) {
            neighbors.push(upCell);
        }
        let downCell = this.grid.getCellAt(this.x, this.y + 1);
        if (downCell && !downCell.isVisited) {
            neighbors.push(downCell);
        }
        let leftCell = this.grid.getCellAt(this.x - 1, this.y);
        if (leftCell && !leftCell.isVisited) {
            neighbors.push(leftCell);
        }
        let rightCell = this.grid.getCellAt(this.x + 1, this.y);
        if (rightCell && !rightCell.isVisited) {
            neighbors.push(rightCell);
        }

        return neighbors;
    }

    breakWall(index) {
        this.walls[index].isDestroyed = true;
        return this.walls[index];
    }

    toggleVisited() {
        this.isVisited = true;
    }

    toggleExit() {
        this.isExit = true;

        let possibilities = [];
        if (this.x === 0) {
            possibilities.push(Cell.LEFT_WALL);
        }
        if (this.x === this.grid.cols - 1) {
            possibilities.push(Cell.RIGHT_WALL);
        }
        if (this.y === 0) {
            possibilities.push(Cell.UP_WALL);
        }
        if (this.y === this.grid.rows - 1) {
            possibilities.push(Cell.DOWN_WALL);
        }
        let wallToDestroy = possibilities[floor(random(possibilities.length))];
        let destroyedWall = this.breakWall(wallToDestroy);

        let text;
        if (destroyedWall.name === 'UP') { text = '▲'; }
        if (destroyedWall.name === 'DOWN') { text = '▼'; }
        if (destroyedWall.name === 'LEFT') { text = '◀'; }
        if (destroyedWall.name === 'RIGHT') { text = '▶'; }
        this.text = text;
    }

    wallDestroyed(wall) {
        return this.walls[wall].isDestroyed;
    }
}
