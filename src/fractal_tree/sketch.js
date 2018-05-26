// Todo:
// Save scene
// Import saved scene

let WIDTH;
let HEIGHT;
const BG_COLOR = [202, 8, 19];
const RULERS_X_NB = 4
const RULERS_Y_NB = 4
const DARK_MODE_COLOR = 255;
const LIGHT_MODE_COLOR = 0;

const TREE_X = WIDTH / 2;
const TREE_Y = HEIGHT;
const TREE_DEPTH = 1;
const TREE_COLOR_MODE = Tree.RGB;
const TRUNK_ANGLE = 180;
const TRUNK_LENGTH = 150;
const TRUNK_THICKNESS = 3;
const BRANCHES_COEF = 0.75;
const BRANCHES_NB = 2;
const BRANCHES_ANGLE = 60;


let helpLines = [
    'UP / DOWN    : Branches angle',
    'LEFT / RIGHT : Branches length',
    '[ / ] : Tree depth',
    '- / + : Nb. of branches',
    'A / D : Trunk angle',
    'Q / E : Trunk thickness',
    '9 / 0 : Trunk length',
    'SPACE : Change color mode',
    'R : Reset all trees',
    'M : Change mode',
    'N : Select next tree',
    'X : Delete active tree',
    'C : Duplicate active tree',
    'J : Hide HUD',
    'P : Take a screenshot',
    'B : Disable background',
    'G : Disable canvas clean before refresh',
    'F : Show / hide rulers',
    'Click (MOVING) : Move active tree root',
    'Click (CREATING) : Create tree at mouse pos'
];

let forest;

let moveMode = true;
let help = false;
let hud = true;
let disableBackground = false;
let disableClear = false;
let rulers = false;

function setup() {
    WIDTH = WIDTH || windowWidth;
    HEIGHT = HEIGHT || windowHeight;

    createCanvas(WIDTH, HEIGHT);
    forest = new Forest(TREE_X, TREE_Y, TREE_COLOR_MODE, TREE_DEPTH, TRUNK_ANGLE, TRUNK_LENGTH, TRUNK_THICKNESS, BRANCHES_COEF, BRANCHES_NB, BRANCHES_ANGLE);
    forest.addTree();
}


function showInfos() {
    let tree = forest.getCurrentTree();

    push();
    if (disableBackground) {
        fill(LIGHT_MODE_COLOR);
    } else {
        fill(DARK_MODE_COLOR);
    }
    textSize(15);
    text(`MODE: ${moveMode ? 'MOVING' : 'CREATING'}`, 5, 15);
    text(`Active tree: #${forest.currentTreeIndex}`, 5, 30);

    if (tree) {
        text(`Tree depth: ${tree.depth}`, 5, 45);
        text(`Trunk ang.: ${tree.trunkAngle}`, 5, 60);
        text(`Trunk length: ${floor(tree.trunkLength)}`, 5, 75);
        text(`Trunk thickness: ${tree.trunkThickness}`, 5, 90);
        text(`Branches coef.: ${tree.branchesCoef.toFixed(2)}`, 5, 105);
        text(`Nb. branches: ${tree.branchesNb}`, 5, 120);
        text(`Branches ang.: ${tree.branchesAngle}`, 5, 135);
    }

    if (help) {
        for (let i = 0; i < helpLines.length; i += 1) {
            text(helpLines[i], 5, 175 + (15 * i));
        }
    } else {
        text('H : Show / Hide help', 5, 175);
    }
    pop();
}

function showRulers() {
    push();
    if (disableBackground) {
        stroke(LIGHT_MODE_COLOR);
    } else {
        stroke(DARK_MODE_COLOR);
    }

    let xStep = ceil(HEIGHT / RULERS_X_NB);
    let yStep = ceil(WIDTH / RULERS_Y_NB);

    for (let i = 1; i <= RULERS_X_NB; i += 1) {
        line(0, xStep * i, WIDTH, xStep * i);
    }
    for (let i = 1; i <= RULERS_Y_NB; i += 1) {
        line(yStep * i, 0, yStep * i, HEIGHT);
    }
    pop();
}

function draw() {
    if (!disableClear) {
        if (disableBackground) {
            clear();
        } else {
            background(...BG_COLOR);
        }
    }

    if (rulers) {
        showRulers();
    }

    forest.show();

    if (hud) {
        showInfos();
    }
}

function keyPressed() {
    console.log(keyCode);
    forest.keyboardEventHandler(keyCode);

    switch (keyCode) {
        // B
        case 66:
            disableBackground = !disableBackground;
            break;
        // G
        case 71:
            disableClear = !disableClear;
            break;
        // P
        case 80:
            saveFrames('fractal-tree', 'png', 1, 1);
            break;
        // H
        case 72:
            help = !help;
            break;
        // J
        case 74:
            hud = !hud;
            break;
        // M
        case 77:
            moveMode = !moveMode;
            break;
        // F
        case 70:
            rulers = !rulers;
            break;
        default:
            break;
    }

    return false;
}

function mouseClicked() {
    if (moveMode) {
        forest.updateTree(forest.currentTreeIndex, mouseX, mouseY);
    } else {
        forest.addTree(mouseX, mouseY);
    }
}
