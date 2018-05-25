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
    'Click (MOVING) : Move active tree root',
    'Click (CREATING) : Create tree at mouse pos'
];

let moveMode = true;
let trees = [];
let currentTree;
let help = false;

function setup() {
    createCanvas(DEF_WIDTH, DEF_HEIGHT);
    newTree();
}

function updateTrees(x, y) {
    if (x && y) {
        trees[currentTree].startingVector = createVector(x, y);
    }
    trees[currentTree].update();
}

function newTree(x, y) {
    let tree = new Tree();
    trees.push(tree);
    nextTree(trees.length - 1);

    let startingVector;
    if (x && y) {
        startingVector = createVector(x, y);
    }
    resetTree(currentTree, startingVector);
}

function nextTree(n) {
    if (n !== undefined) {
        currentTree = n;
    } else {
        currentTree = (currentTree + 1) % trees.length || 0;
    }
    console.log(`CURRENT TREE #${currentTree}`);
}

function resetTree(i, vector) {
    let tree = trees[i];
    let startingVector = vector || createVector(DEF_TREE_START_X, DEF_TREE_START_Y);

    tree.colorMode = DEF_TREE_COLOR_MODE;
    tree.depth = DEF_TREE_DEPTH;
    tree.trunkLength = DEF_TRUNK_LENGTH;
    tree.trunkThickness = DEF_TRUNK_THICKNESS;
    tree.branchesCoef = DEF_BRANCHES_COEF;
    tree.branchesNb = DEF_BRANCHES_NB;
    tree.branchesAngle = DEF_BRANCHES_ANGLE;
    tree.startingAngle = DEF_TREE_START_ANGLE;
    tree.startingVector = startingVector;

    tree.update();
}

function removeTree(i) {
    trees.splice(i, 1);
    nextTree();
}

function keepOneTree() {
    trees.splice(1);
}

function showInfos() {
    fill(255);
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
    background(...DEF_BG_COLOR);

    for (let tree of trees) {
        tree.show();
    }

    showInfos();
}

function keyPressed() {
    console.log(keyCode);
    switch (keyCode) {
        // UP
        case 38:
            trees[currentTree].branchesAngle *= 1.05;
            updateTrees();
            break;
        // DOWN
        case 40:
            trees[currentTree].branchesAngle *= 0.95;
            updateTrees();
            break;
        // LEFT
        case 37:
            trees[currentTree].branchesCoef *= 0.95;
            updateTrees();
            break;
        // RIGHT
        case 39:
            trees[currentTree].branchesCoef *= 1.05;
            updateTrees();
            break;
        // +
        case 187:
            trees[currentTree].branchesNb += 1;
            updateTrees();
            break;
        // -
        case 189:
            trees[currentTree].branchesNb -= 1;
            updateTrees();
            break;
        // [
        case 219:
            trees[currentTree].depth -= 1;
            updateTrees();
            break;
        // ]
        case 221:
            trees[currentTree].depth += 1;
            updateTrees();
            break;
        // 9
        case 57:
            trees[currentTree].trunkLength *= 0.95;
            updateTrees();
            break;
        // 0
        case 48:
            trees[currentTree].trunkLength *= 1.05;
            updateTrees();
            break;
        // SPACE
        case 32:
            trees[currentTree].colorMode = trees[currentTree].colorMode === Tree.RGB ? Tree.BW : Tree.RGB;
            updateTrees();
            break;
        // A
        case 65:
            trees[currentTree].startingAngle -= 1;
            updateTrees();
            break;
        // D
        case 68:
            trees[currentTree].startingAngle += 1;
            updateTrees();
            break;
        // Q
        case 81:
            trees[currentTree].trunkThickness -= 1;
            updateTrees();
            break;
        // E
        case 69:
            trees[currentTree].trunkThickness += 1;
            updateTrees();
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
        default:
            break;
    }

    return false;
}

function mouseClicked() {
    if (moveMode) {
        updateTrees(mouseX, mouseY);
    } else {
        newTree(mouseX, mouseY);
    }
}
