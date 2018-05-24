class Tree {
    static get RGB() {
        return 1;
    }

    static get BW() {
        return 2;
    }

    constructor(colorMode, depth, trunkLength, trunkThickness,branchesCoef, branchesNb, branchesAngle, startingAngle, startingVector) {
        this.colorMode = colorMode;
        this.depth = depth;
        this.trunkLength = trunkLength;
        this.trunkThickness = trunkThickness;
        this.branchesCoef = branchesCoef;
        this.branchesNb = branchesNb;
        this.branchesAngle = branchesAngle;
        this.startingAngle = startingAngle;
        this.startingVector = startingVector;
        this.currDepth = 0;
        this.newBranches = 0;
        this.branches = [];

        if (this.colorMode === Tree.RGB) {
            let startColor = floor(random(360));
            this.color = [startColor, 97, 100];
        } else if (this.colorMode === Tree.BW) {
            this.color = [0, 0, 100];
        }
        this.colorCoef = (100/this.depth * 0.01);

        this.generate();
    }

    generate() {
        // First recursion
        if (this.currDepth === 0) {
            let branch = new Branch(this.startingVector, this.startingAngle, this.trunkLength, this.color, this.trunkThickness);
            this.branches.push(branch);
            this.currDepth += 1;
            this.newBranches = 1;
            this.generate();
        }

        // Exit
        if (this.currDepth === this.depth) {
            return false;
        }

        let newBranches = [];
        let length = (this.trunkLength * this.branchesCoef) / this.currDepth;
        let color = [];
        if (this.colorMode === Tree.RGB) {
            color[0] = (this.color[0] + ((this.colorCoef * this.currDepth) * 360)) % 360;
            color[1] = this.color[1];
            color[2] = this.color[2];
        } else if (this.colorMode === Tree.BW) {
            color[0] = this.color[0];
            color[1] = this.color[1];
            color[2] = this.color[2] - ((this.colorCoef * this.currDepth) * 100);
        }
        let thickness = (this.trunkThickness * this.branchesCoef) / this.currDepth;

        for (let i = 1; i <= this.newBranches; i += 1) {
            let lastGenBranch = this.branches[this.branches.length - i];
            let startingVector = lastGenBranch.endVector;

            let offset = floor(this.branchesNb /2);
            for (let i = -offset; i < this.branchesNb - offset; i += 1) {
                let angle = lastGenBranch.angle + (this.branchesAngle * i);

                if (this.branchesNb % 2 === 0) {
                    angle += (this.branchesAngle/2);
                }

                let branch = new Branch(startingVector, angle, length, color, thickness);
                newBranches.push(branch);
            }
        }
        this.branches.push(...newBranches);
        this.newBranches = newBranches.length;
        this.currDepth += 1;
        this.generate();
    }

    show() {
        for (let branche of this.branches) {
            branche.show();
        }
    }
}
