    const COLS = 15;
    const ROWS = 15;
    const CELL_SIZE = 30;
    const WALLS_COLOR = 'black';
    const WALL_THICKNESS = 3;
    const TEXT_COLOR = 'black';
    const HL_VISITED = 'grey';
    const HL_CURRENT = 'red';
    const HL_NEXT = 'pink';
    const HL_EXIT = 'limegreen';
    const BG_COLOR = 51;

    let grid;
    let currentCell;

    function setup() {
        createCanvas(COLS*CELL_SIZE + ceil(WALL_THICKNESS/2), ROWS*CELL_SIZE + ceil(WALL_THICKNESS/2));
        grid = new Grid(COLS, ROWS, CELL_SIZE, WALLS_COLOR, WALL_THICKNESS, TEXT_COLOR);
        grid.makeExits();

        currentCell = grid.getCellAt(0, 0);
        grid.addToVisitedCells(currentCell);
    }

    function draw() {
        background(BG_COLOR);

        grid.show();

        if (!currentCell) {
            return false;
        }

        currentCell.highlight(HL_CURRENT);
        currentCell.toggleVisited();

        let nextCell = currentCell.getRandomNeighbor();
        if (nextCell) {
            grid.breakWallsBetween(currentCell, nextCell);
            nextCell.highlight(HL_NEXT);
            nextCell.toggleVisited();
            grid.addToVisitedCells(nextCell);

            currentCell = nextCell;
        } else {
            currentCell = grid.removeFromVisitedCells();
        }
    }
