class Forest {
    constructor(treeX, treeY, treeColorMode, treeDepth, trunkAngle, trunkLength, trunkThickness, branchesCoef, branchesNb, branchesAngle) {
        this.treeX = treeX;
        this.treeY = treeY;
        this.treeColorMode = treeColorMode;
        this.treeDepth = treeDepth;
        this.trunkAngle = trunkAngle;
        this.trunkLength = trunkLength;
        this.trunkThickness = trunkThickness;
        this.branchesCoef = branchesCoef;
        this.branchesNb = branchesNb;
        this.branchesAngle = branchesAngle;

        this.trees = [];
        this.currentTreeIndex;
    }

    addTree(x, y) {
        let tree = new Tree();
        this.trees.push(tree);
        this.selectNextTree(this.trees.length - 1);

        this.resetTree(this.currentTreeIndex, x, y);
    }

    removeTree(i) {
        this.trees.splice(i, 1);
        this.selectNextTree();
    }

    updateTree(i, x, y) {
        if (x && y) {
            this.trees[i].x = x;
            this.trees[i].y = y;
        }
        this.trees[i].update();
    }

    resetTree(i, x, y) {
        let tree = this.trees[i];

        tree.colorMode = this.treeColorMode;
        tree.depth = this.treeDepth;
        tree.trunkLength = this.trunkLength;
        tree.trunkThickness = this.trunkThickness;
        tree.branchesCoef = this.branchesCoef;
        tree.branchesNb = this.branchesNb;
        tree.branchesAngle = this.branchesAngle;
        tree.trunkAngle = this.trunkAngle;;
        tree.x = x || this.treeX;
        tree.y = y || this.treeY;

        tree.update();
    }

    duplicateTree(i) {
        let tree = new Tree();
        let sourceTree = this.trees[i];

        tree.colorMode = sourceTree.colorMode;
        tree.depth = sourceTree.depth;
        tree.trunkAngle = sourceTree.trunkAngle;
        tree.trunkLength = sourceTree.trunkLength;
        tree.trunkThickness = sourceTree.trunkThickness;
        tree.branchesCoef = sourceTree.branchesCoef;
        tree.branchesNb = sourceTree.branchesNb;
        tree.branchesAngle = sourceTree.branchesAngle;
        tree.x = sourceTree.x;
        tree.y = sourceTree.y

        tree.update();
        this.trees.push(tree);
        this.selectNextTree(this.trees.length - 1);
    }

    keepOneTree(i) {
        this.trees.splice(1);
    }

    selectNextTree(i) {
        if (i !== undefined) {
            this.currentTreeIndex = i;
        } else {
            this.currentTreeIndex = (this.currentTreeIndex + 1) % this.trees.length || 0;
        }
    }

    keyboardEventHandler(keyCode) {
        switch (keyCode) {
            // UP
            case 38:
                this.trees[this.currentTreeIndex].branchesAngle += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // DOWN
            case 40:
                this.trees[this.currentTreeIndex].branchesAngle -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // LEFT
            case 37:
                this.trees[this.currentTreeIndex].branchesCoef *= 0.95;
                this.updateTree(this.currentTreeIndex);
                break;
            // RIGHT
            case 39:
                this.trees[this.currentTreeIndex].branchesCoef *= 1.05;
                this.updateTree(this.currentTreeIndex);
                break;
            // +
            case 187:
                this.trees[this.currentTreeIndex].branchesNb += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // -
            case 189:
                this.trees[this.currentTreeIndex].branchesNb -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // [
            case 219:
                this.trees[this.currentTreeIndex].depth -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // ]
            case 221:
                this.trees[this.currentTreeIndex].depth += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // 9
            case 57:
                this.trees[this.currentTreeIndex].trunkLength *= 0.95;
                this.updateTree(this.currentTreeIndex);
                break;
            // 0
            case 48:
                this.trees[this.currentTreeIndex].trunkLength *= 1.05;
                this.updateTree(this.currentTreeIndex);
                break;
            // SPACE
            case 32:
                this.trees[this.currentTreeIndex].colorMode = this.trees[this.currentTreeIndex].colorMode === Tree.RGB ? Tree.BW : Tree.RGB;
                this.updateTree(this.currentTreeIndex);
                break;
            // A
            case 65:
                this.trees[this.currentTreeIndex].trunkAngle -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // D
            case 68:
                this.trees[this.currentTreeIndex].trunkAngle += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // Q
            case 81:
                this.trees[this.currentTreeIndex].trunkThickness -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // E
            case 69:
                this.trees[this.currentTreeIndex].trunkThickness += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // R
            case 82:
                this.keepOneTree();
                this.selectNextTree(0);
                this.resetTree(this.currentTreeIndex);
                break;
            // N
            case 78:
                this.selectNextTree();
                break;
            // X
            case 88:
                this.removeTree(this.currentTreeIndex);
                break;
            // C
            case 67:
                this.duplicateTree(this.currentTreeIndex);
                break;
            default:
                break;
        }
    }

    show() {
        for (let tree of this.trees) {
            tree.show();
        }
    }
}
