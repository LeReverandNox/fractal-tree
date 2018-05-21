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
    const P_SIZE = 30;
    const P_NAME_COLOR = 'black';
    const P_COLOR = 'lime';

    let grid;
    let currentCell;
    let player;

    function setup() {
        createCanvas(COLS*CELL_SIZE + (WALL_THICKNESS / 2), ROWS*CELL_SIZE + (WALL_THICKNESS / 2));
        grid = new Grid(COLS, ROWS, CELL_SIZE, WALLS_COLOR, WALL_THICKNESS, TEXT_COLOR);
        grid.makeExits();

        player = new Player(grid, P_SIZE, 'P', P_NAME_COLOR, P_COLOR);

        currentCell = grid.getCellAt(0, 0);
        grid.addToVisitedCells(currentCell);
        // noLoop();
    }

    function draw() {
        background(BG_COLOR);

        grid.show();
        player.show();

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

    // function mousePressed() {
    //     loop();
    // }

    function keyPressed() {
        switch (keyCode) {
            case 37:
                player.move(Player.LEFT);
                break;
            case 38:
                player.move(Player.UP);
                break;
            case 39:
                player.move(Player.RIGHT);
                break;
            case 40:
                player.move(Player.DOWN);
                break;
            default:
                break;
        }
        return false;
    }
