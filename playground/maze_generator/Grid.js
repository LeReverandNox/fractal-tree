class Grid {
    constructor(cols, rows, cellSize, wallsColor, wallsThickness, textColor) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.wallsColor = wallsColor;
        this.wallsThickness = wallsThickness;
        this.textColor = textColor;

        this.visitedCells = [];
        this.grid = [];

        this._initGrid();
    }

    _initGrid() {
        for (let y = 0; y < this.cols; y += 1) {
            this.grid[y] = [];
            for (let x = 0; x < this.cols; x += 1) {
                this.grid[y][x] = new Cell(this, x, y, this.cellSize, this.wallsColor, this.wallsThickness, this.textColor);
            }
        }
    }

    show() {
        for (let y = 0; y < this.cols; y += 1) {
            for (let x = 0; x < this.cols; x += 1) {
                let cell = this.grid[y][x];
                if (cell.isVisited) {
                    cell.highlight(HL_VISITED);
                }
                if (cell.isExit) {
                    cell.highlight(HL_EXIT);
                }
                cell.show();
            }
        }
    }

    getCellAt(x, y) {
        if (x < 0 || x > this.cols - 1 || y < 0 || y > this.rows - 1) {
            return undefined;
        }
        return this.grid[y][x];
    }

    breakWallsBetween(cellA, cellB) {
        if (cellA.x < cellB.x) {
            cellA.breakWall(Cell.RIGHT_WALL);
            cellB.breakWall(Cell.LEFT_WALL);
        }
        if (cellA.x > cellB.x) {
            cellA.breakWall(Cell.LEFT_WALL);
            cellB.breakWall(Cell.RIGHT_WALL);
        }
        if (cellA.y < cellB.y) {
            cellA.breakWall(Cell.DOWN_WALL);
            cellB.breakWall(Cell.UP_WALL);
        }
        if (cellA.y > cellB.y) {
            cellA.breakWall(Cell.UP_WALL);
            cellB.breakWall(Cell.DOWN_WALL);
        }
    }

    addToVisitedCells(cell) {
        this.visitedCells.push(cell);
    }

    removeFromVisitedCells() {
        return this.visitedCells.pop();
    }

    _getRandomEdgeCell() {
        let x = floor(random(this.cols));
        let y = floor(random(this.rows));
        if (x > y) {
            x = random() > 0.5 ? 0 : this.cols - 1;
        } else {
            y = random() > 0.5 ? 0 : this.rows - 1;
        }

        return this.getCellAt(x, y);
    }

    makeExits(n = 2) {
        for (let i = 0; i < n; i += 1) {
            this._getRandomEdgeCell().toggleExit();
        }
    }
}
