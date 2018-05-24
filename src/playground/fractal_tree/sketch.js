const DEF_WIDTH = window.innerWidth - 10;
const DEF_HEIGHT = window.innerHeight - 10;
const DEF_BG_COLOR = 51;
const DEF_TREE_START_X = DEF_WIDTH / 2;
const DEF_TREE_START_Y = DEF_HEIGHT;
const DEF_TREE_START_ANGLE = 180;
const DEF_TREE_DEPTH = 1;
const DEF_TREE_COLOR_MODE = Tree.RGB;
const DEF_TRUNK_LENGTH = 150;
const DEF_TRUNK_THICKNESS = 3;
const DEF_BRANCHES_COEF = 0.75;
const DEF_BRANCHES_NB = 2;
const DEF_BRANCHES_ANGLE = 60;

let width;
let height;
let bgColor;
let treeStartX;
let treeStartY;
let treeStartAngle;
let treeDepth;
let treeColorMode;
let trunkLength;
let trunkThickness;
let branchesCoef;
let branchesNb;
let branchesAngle;

let tree;

function setup() {
    createCanvas(DEF_WIDTH, DEF_HEIGHT);
    reset_settings();
    init()
}

function init() {
    let treeStartingPoint = createVector(treeStartX, treeStartY);
    tree = new Tree(treeColorMode, treeDepth, trunkLength, trunkThickness, branchesCoef, branchesNb, branchesAngle, treeStartAngle, treeStartingPoint);
}

function reset_settings() {
    width = DEF_WIDTH;
    height = DEF_HEIGHT;
    bgColor = DEF_BG_COLOR;
    treeStartX = DEF_WIDTH / 2;
    treeStartY = DEF_HEIGHT;
    treeStartAngle = DEF_TREE_START_ANGLE;
    treeDepth = DEF_TREE_DEPTH;
    treeColorMode = DEF_TREE_COLOR_MODE;
    trunkLength = DEF_TRUNK_LENGTH;
    trunkThickness = DEF_TRUNK_THICKNESS;
    branchesCoef = DEF_BRANCHES_COEF;
    branchesNb = DEF_BRANCHES_NB;
    branchesAngle = DEF_BRANCHES_ANGLE;
}

function draw() {
    background(DEF_BG_COLOR);

    tree.show();
}

function keyPressed() {
    console.log(keyCode);
    switch (keyCode) {
        // UP
        case 38:
            branchesAngle *= 1.05;
            init();
            break;
        // DOWN
        case 40:
            branchesAngle *= 0.95;
            init();
            break;
        // LEFT
        case 37:
            branchesCoef *= 0.95;
            init();
            break;
        // RIGHT
        case 39:
            branchesCoef *= 1.05;
            init();
            break;
        // +
        case 187:
            branchesNb += 1;
            init();
            break;
        // -
        case 189:
            branchesNb -= 1;
            init();
            break;
        // [
        case 219:
            treeDepth -= 1;
            init();
            break;
        // ]
        case 221:
            treeDepth += 1;
            init();
            break;
        // 9
        case 57:
            trunkLength *= 0.95;
            init();
            break;
        // 0
        case 48:
            trunkLength *= 1.05;
            init();
            break;
        // SPACE
        case 32:
            treeColorMode = treeColorMode === Tree.RGB ? Tree.BW : Tree.RGB;
            init();
            break;
        // A
        case 65:
            treeStartAngle -= 1;
            init();
            break;
        // D
        case 68:
            treeStartAngle += 1;
            init();
            break;
        // Q
        case 81:
            trunkThickness -= 1;
            init();
            break;
        // E
        case 69:
            trunkThickness += 1;
            init();
            break;
        // R
        case 82:
            reset_settings();
            init();
            break;
        default:
            break;
    }

    return false;
}
