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
        let tree = this.trees[i];
        if (tree) {
            if (x && y) {
                tree.x = x;
                tree.y = y;
            }
            tree.update();
        }
    }

    resetTree(i, x, y) {
        let tree = this.trees[i];

        if (tree) {
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
    }

    duplicateTree(i) {
        let sourceTree = this.trees[i];
        if (sourceTree) {
            let tree = new Tree();

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
    }

    keepOneTree(i) {
        this.trees.splice(1);
        this.selectNextTree();
        this.resetTree(this.currentTreeIndex);
    }

    selectNextTree(i) {
        if (i !== undefined) {
            this.currentTreeIndex = i;
        } else {
            if (!this.trees.length) {
                this.currentTreeIndex = -1;
            } else {
                this.currentTreeIndex = this.currentTreeIndex >= this.trees.length - 1 ? 0 : this.currentTreeIndex + 1;
            }
        }
    }

    getCurrentTree() {
        return this.trees[this.currentTreeIndex];
    }

    keyboardEventHandler(keyCode) {
        switch (keyCode) {
            // +
            case 187:
                this.getCurrentTree().branchesNb += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // -
            case 189:
                this.getCurrentTree().branchesNb -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // [
            case 219:
                this.getCurrentTree().depth -= 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // ]
            case 221:
                this.getCurrentTree().depth += 1;
                this.updateTree(this.currentTreeIndex);
                break;
            // SPACE
            case 32:
                this.getCurrentTree().colorMode = this.getCurrentTree().colorMode === Tree.RGB ? Tree.BW : Tree.RGB;
                this.updateTree(this.currentTreeIndex);
                break;
            // R
            case 82:
                this.keepOneTree();
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
        frameRate(10);

        // A
        if (keyIsDown(65)) {
            this.getCurrentTree().trunkAngle -= 1;
            this.updateTree(this.currentTreeIndex);
        // D
        } else if (keyIsDown(68)) {
            this.getCurrentTree().trunkAngle += 1;
            this.updateTree(this.currentTreeIndex);
        }

        // Q
        if (keyIsDown(81)) {
            this.getCurrentTree().trunkThickness -= 1;
            this.updateTree(this.currentTreeIndex);
        // E
        } else if (keyIsDown(69)) {
            this.getCurrentTree().trunkThickness += 1;
            this.updateTree(this.currentTreeIndex);
        }

        // 9
        if (keyIsDown(57)) {
            this.getCurrentTree().trunkLength *= 0.95;
            this.updateTree(this.currentTreeIndex);
        // 0
        } else if (keyIsDown(48)) {
            this.getCurrentTree().trunkLength *= 1.05;
            this.updateTree(this.currentTreeIndex);
        }

        // UP ARROW
        if (keyIsDown(UP_ARROW)) {
            this.getCurrentTree().branchesAngle += 1;
            this.updateTree(this.currentTreeIndex);
        // DOWN ARROW
        } else if (keyIsDown(DOWN_ARROW)) {
            this.getCurrentTree().branchesAngle -= 1;
            this.updateTree(this.currentTreeIndex);
        }

        // LEFT ARROW
        if (keyIsDown(LEFT_ARROW)) {
            this.getCurrentTree().branchesCoef *= 0.95;
            this.updateTree(this.currentTreeIndex);
        // RIGHT ARROW
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.getCurrentTree().branchesCoef *= 1.05;
            this.updateTree(this.currentTreeIndex);
        }

        for (let tree of this.trees) {
            tree.show();
        }
    }
}