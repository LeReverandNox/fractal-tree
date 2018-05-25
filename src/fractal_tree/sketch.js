// Todo:
// Save scene
// Import saved scene
// Disable/enable the screen clean at every frame
// Refacto with a big class to clean sketch.js

const DEF_WIDTH = window.innerWidth - 10;
const DEF_HEIGHT = window.innerHeight - 10;
const DEF_BG_COLOR = [202, 8, 19];
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
    'Click (MOVING) : Move active tree root',
    'Click (CREATING) : Create tree at mouse pos'
];

let moveMode = true;
let trees = [];
let currentTree;
let help = false;
let hud = true;
let disableBackground = false;

function setup() {
    createCanvas(DEF_WIDTH, DEF_HEIGHT);
    newTree();
}

function updateTree(x, y) {
    if (x && y) {
        trees[currentTree].x = x;
        trees[currentTree].y = y;
    }
    trees[currentTree].update();
}

function newTree(x, y) {
    let tree = new Tree();
    trees.push(tree);
    nextTree(trees.length - 1);

    resetTree(currentTree, x, y);
}

function nextTree(n) {
    if (n !== undefined) {
        currentTree = n;
    } else {
        currentTree = (currentTree + 1) % trees.length || 0;
    }
}

function resetTree(i, x, y) {
    let tree = trees[i];

    tree.colorMode = DEF_TREE_COLOR_MODE;
    tree.depth = DEF_TREE_DEPTH;
    tree.trunkLength = DEF_TRUNK_LENGTH;
    tree.trunkThickness = DEF_TRUNK_THICKNESS;
    tree.branchesCoef = DEF_BRANCHES_COEF;
    tree.branchesNb = DEF_BRANCHES_NB;
    tree.branchesAngle = DEF_BRANCHES_ANGLE;
    tree.startingAngle = DEF_TREE_START_ANGLE;
    tree.x = x || DEF_TREE_START_X;
    tree.y = y || DEF_TREE_START_Y;

    tree.update();
}

function removeTree(i) {
    trees.splice(i, 1);
    nextTree();
}

function keepOneTree() {
    trees.splice(1);
}

function duplicateTree(i) {
    let tree = new Tree();
    let sourceTree = trees[i];

    tree.colorMode = sourceTree.colorMode;
    tree.depth = sourceTree.depth;
    tree.trunkLength = sourceTree.trunkLength;
    tree.trunkThickness = sourceTree.trunkThickness;
    tree.branchesCoef = sourceTree.branchesCoef;
    tree.branchesNb = sourceTree.branchesNb;
    tree.branchesAngle = sourceTree.branchesAngle;
    tree.startingAngle = sourceTree.startingAngle;
    tree.x = sourceTree.x;
    tree.y = sourceTree.y

    tree.update();
    trees.push(tree);
    nextTree(trees.length - 1);
}

function showInfos() {
    if (disableBackground) {
        fill(0);
    } else {
        fill(255);
    }
    textSize(15);
    text(`MODE: ${moveMode ? 'MOVING' : 'CREATING'}`, 5, 15);
    text(`Active tree: #${currentTree}`, 5, 30);

    if (help) {
        for (let i = 0; i < helpLines.length; i += 1) {
            text(helpLines[i], 5, 75 + (15 * i));
        }
    } else {
        text('H : Show / Hide help', 5, 75);
    }
}

function draw() {
    if (disableBackground) {
        clear();
    } else {
        background(...DEF_BG_COLOR);
    }

    for (let tree of trees) {
        tree.show();
    }

    if (hud) {
        showInfos();
    }
}

function keyPressed() {
    console.log(keyCode);
    switch (keyCode) {
        // UP
        case 38:
            trees[currentTree].branchesAngle *= 1.05;
            updateTree();
            break;
        // DOWN
        case 40:
            trees[currentTree].branchesAngle *= 0.95;
            updateTree();
            break;
        // LEFT
        case 37:
            trees[currentTree].branchesCoef *= 0.95;
            updateTree();
            break;
        // RIGHT
        case 39:
            trees[currentTree].branchesCoef *= 1.05;
            updateTree();
            break;
        // +
        case 187:
            trees[currentTree].branchesNb += 1;
            updateTree();
            break;
        // -
        case 189:
            trees[currentTree].branchesNb -= 1;
            updateTree();
            break;
        // [
        case 219:
            trees[currentTree].depth -= 1;
            updateTree();
            break;
        // ]
        case 221:
            trees[currentTree].depth += 1;
            updateTree();
            break;
        // 9
        case 57:
            trees[currentTree].trunkLength *= 0.95;
            updateTree();
            break;
        // 0
        case 48:
            trees[currentTree].trunkLength *= 1.05;
            updateTree();
            break;
        // SPACE
        case 32:
            trees[currentTree].colorMode = trees[currentTree].colorMode === Tree.RGB ? Tree.BW : Tree.RGB;
            updateTree();
            break;
        // A
        case 65:
            trees[currentTree].startingAngle -= 1;
            updateTree();
            break;
        // D
        case 68:
            trees[currentTree].startingAngle += 1;
            updateTree();
            break;
        // Q
        case 81:
            trees[currentTree].trunkThickness -= 1;
            updateTree();
            break;
        // E
        case 69:
            trees[currentTree].trunkThickness += 1;
            updateTree();
            break;
        // R
        case 82:
            keepOneTree();
            nextTree(0);
            resetTree(currentTree);
            break;
        // M
        case 77:
            moveMode = !moveMode;
            if (moveMode) {
                console.log('MOVING');
            } else {
                console.log('CREATING');
            }
            break;
        // N
        case 78:
            nextTree();
            break;
        // X
        case 88:
            removeTree(currentTree);
            break;
        // H
        case 72:
            help = !help;
            break;
        // H
        case 74:
            hud = !hud;
            break;
        // C
        case 67:
            duplicateTree(currentTree);
            break;
        // P
        case 80:
            saveFrames('fractal-tree', 'png', 1, 1);
            break;
        // B
        case 66:
            disableBackground = !disableBackground;
            break;
        default:
            break;
    }

    return false;
}

function mouseClicked() {
    if (moveMode) {
        updateTree(mouseX, mouseY);
    } else {
        newTree(mouseX, mouseY);
    }
}
