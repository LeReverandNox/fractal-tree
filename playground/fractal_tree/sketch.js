const WIDTH = 1000;
const HEIGHT = 900;
const BG_COLOR = 51;
const TREE_START_X = WIDTH / 2;
const TREE_START_Y = HEIGHT;
let TREE_START_ANGLE = 180;
let TREE_DEPTH = 10;
let TREE_COLOR_MODE = Tree.RGB;
let TRUNK_LENGTH = 150;
const TRUNK_THICKNESS = 3;
let BRANCHES_COEF = 0.95;
let BRANCHES_NB = 2;
let BRANCHES_ANGLE = 60;

let tree;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    init()
}

function init() {
    let treeStartingPoint = createVector(TREE_START_X, TREE_START_Y);
    tree = new Tree(TREE_COLOR_MODE, TREE_DEPTH, TRUNK_LENGTH, TRUNK_THICKNESS, BRANCHES_COEF, BRANCHES_NB, BRANCHES_ANGLE, TREE_START_ANGLE, treeStartingPoint);
}
function draw() {
    background(BG_COLOR);

    tree.show();
}

function keyPressed() {
    console.log(keyCode);
    switch (keyCode) {
        // UP
        case 38:
            BRANCHES_ANGLE *= 1.05;
            init();
            break;
        // DOWN
        case 40:
            BRANCHES_ANGLE *= 0.95;
            init();
            break;
        // LEFT
        case 37:
            BRANCHES_COEF *= 0.95;
            TRUNK_LENGTH *= 0.95;
            init();
            break;
        // RIGHT
        case 39:
            BRANCHES_COEF *= 1.05;
            TRUNK_LENGTH *= 1.05;
            init();
            break;
        // +
        case 187:
            BRANCHES_NB += 1;
            init();
            break;
        // -
        case 189:
            BRANCHES_NB -= 1;
            init();
            break;
        // [
        case 219:
            TREE_DEPTH -= 1;
            init();
            break;
        // ]
        case 221:
            TREE_DEPTH += 1;
            init();
            break;
        // SPACE
        case 32:
            TREE_COLOR_MODE = TREE_COLOR_MODE === Tree.RGB ? Tree.BW : Tree.RGB;
            init();
            break;
        // A
        case 65:
            TREE_START_ANGLE *= 0.95;
            init();
            break;
        // E
        case 68:
            TREE_START_ANGLE *= 1.05;
            init();
            break;
        default:
            break;
    }

    return false;
}
