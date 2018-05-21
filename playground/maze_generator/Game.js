class Game {
    constructor() {
        this.grid;
        this.player;
        this.currentCell;

        this.resetGame();
    }

    resetGame() {
        this.grid = new Grid(COLS, ROWS, CELL_SIZE, WALLS_COLOR, WALL_THICKNESS, TEXT_COLOR);
        this.grid.makeExits(NB_EXITS);

        this.player = new Player(this.grid, P_SIZE, 'P1', P_NAME_COLOR, P_COLOR);

        this.currentCell = this.grid.getCellAt(0, 0);
        this.grid.addToVisitedCells(this.currentCell);
    }

    loop() {
        this.grid.show();
        this.player.show();

        if (!this.currentCell) {
            return false;
        }

        this.currentCell.highlight(HL_CURRENT);
        this.currentCell.toggleVisited();

        let nextCell = this.currentCell.getRandomNeighbor();
        if (nextCell) {
            this.grid.breakWallsBetween(this.currentCell, nextCell);
            nextCell.highlight(HL_NEXT);
            nextCell.toggleVisited();
            this.grid.addToVisitedCells(nextCell);

            this.currentCell = nextCell;
        } else {
            this.currentCell = this.grid.removeFromVisitedCells();
        }
    }
}
