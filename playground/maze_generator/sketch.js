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
    const P_COLOR = 'deeppink';
    const NB_EXITS = 1

    let game;

    function setup() {
        createCanvas(COLS*CELL_SIZE + (WALL_THICKNESS / 2), ROWS*CELL_SIZE + (WALL_THICKNESS / 2));
        game = new Game();
        noLoop();
    }

    function draw() {
        background(BG_COLOR);

        game.loop();
    }

    function mousePressed() {
        loop();
    }

    function keyPressed() {
        switch (keyCode) {
            case 37:
                game.player.move(Player.LEFT);
                return false;
                break;
            case 38:
                game.player.move(Player.UP);
                return false;
                break;
            case 39:
                game.player.move(Player.RIGHT);
                return false;
                break;
            case 40:
                game.player.move(Player.DOWN);
                return false;
                break;
            case 82:
                game.resetGame();
                break;
            default:
                break;
        }
    }
