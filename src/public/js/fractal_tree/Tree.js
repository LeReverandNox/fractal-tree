class Tree {
    static get RGB() {
        return 'RGB';
    }

    static get BW() {
        return 'Black & White';
    }

    constructor(colorMode, colorCoef, colorAlphaCoef, depth, trunkColor, trunkAngle, trunkLength, trunkThickness,branchesCoef, branchesNb, branchesAngle, x, y) {
        this.colorMode = colorMode;
        this.colorCoef = colorCoef;
        this.colorAlphaCoef = colorAlphaCoef;
        this.depth = depth;
        this.trunkColor = trunkColor;
        this.trunkAngle = trunkAngle;
        this.trunkLength = trunkLength;
        this.trunkThickness = trunkThickness;
        this.branchesCoef = branchesCoef;
        this.branchesNb = branchesNb;
        this.branchesAngle = branchesAngle;
        this.x = x;
        this.y = y;
    }

    get colorMode() {
        return this._colorMode;
    }
    set colorMode(colorMode) {
        this._colorMode = colorMode;
        return this.colorMode;
    }

    get colorCoef() {
        return this._colorCoef;
    }
    set colorCoef(colorCoef) {
        if (colorCoef > 0) {
            this._colorCoef = colorCoef;
        }
        return this.colorCoef;
    }

    get colorAlphaCoef() {
        return this._colorAlphaCoef;
    }
    set colorAlphaCoef(colorAlphaCoef) {
        if (colorAlphaCoef > 0) {
            this._colorAlphaCoef = colorAlphaCoef;
        }
        return this.colorAlphaCoef;
    }

    get depth() {
        return this._depth;
    }
    set depth(depth) {
        if (depth > 0) {
            this._depth = depth;
        }
        return this.depth;
    }

    get trunkColor() {
        return this._trunkColor;
    }
    set trunkColor(trunkColor) {
        if (trunkColor >= 0) {
            this._trunkColor = trunkColor;
        }
        return this.trunkColor;
    }

    get trunkAngle() {
        return this._trunkAngle;
    }
    set trunkAngle(trunkAngle) {
        this._trunkAngle = trunkAngle;
        return this.trunkAngle;
    }

    get trunkLength() {
        return this._trunkLength;
    }
    set trunkLength(trunkLength) {
        if (trunkLength >= 0) {
            this._trunkLength = trunkLength;
        }
        return this.trunkLength;
    }

    get trunkThickness() {
        return this._trunkThickness;
    }
    set trunkThickness(trunkThickness) {
        if (trunkThickness > 0) {
            this._trunkThickness = trunkThickness;
        }
        return this.trunkThickness;
    }

    get branchesCoef() {
        return this._branchesCoef;
    }
    set branchesCoef(branchesCoef) {
        if (branchesCoef > 0) {
            this._branchesCoef = branchesCoef;
        }
        return this.branchesCoef;
    }

    get branchesNb() {
        return this._branchesNb;
    }
    set branchesNb(branchesNb) {
        if (branchesNb > 0) {
            this._branchesNb = branchesNb;
        }
        return this.branchesNb;
    }

    get branchesAngle() {
        return this._branchesAngle;
    }
    set branchesAngle(branchesAngle) {
        this._branchesAngle = branchesAngle;
        return this.branchesAngle;
    }

    update() {
        this.branches = [];
        this.currDepth = 0;
        this.newBranches = 0;

        this.startingVector = createVector(this.x, this.y);

        let alpha = 100 * this.colorAlphaCoef;
        if (this.colorMode === Tree.RGB) {
            this.color = [this.trunkColor, 97, 100, alpha];
        } else if (this.colorMode === Tree.BW) {
            this.color = [0, 0, this.trunkColor, alpha];
        }

        this.generate();
    }

    generate() {
        // First recursion
        if (this.currDepth === 0) {
            let branch = new Branch(this.startingVector, this.trunkAngle, this.trunkLength, this.color, this.trunkThickness);
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
        let color = [];
        if (this.colorMode === Tree.RGB) {
            color[0] = (this.color[0] + ((this.colorCoef * this.currDepth) * 360)) % 360;
            color[1] = this.color[1];
            color[2] = this.color[2];
            color[3] = this.color[3];
        } else if (this.colorMode === Tree.BW) {
            color[0] = this.color[0];
            color[1] = this.color[1];
            color[2] = this.color[2] - ((this.colorCoef * this.currDepth) * 100);
            color[3] = this.color[3];
        }

        for (let i = 1; i <= this.newBranches; i += 1) {
            let lastGenBranch = this.branches[this.branches.length - i];
            let startingVector = lastGenBranch.endVector;

            let length = lastGenBranch.length * this.branchesCoef;
            let thickness = (lastGenBranch.thickness * this.branchesCoef);


            let offset = floor(this.branchesNb / 2);
            for (let i = -offset; i < this.branchesNb - offset; i += 1) {
                let angle = lastGenBranch.angle + (this.branchesAngle * i);

                if (this.branchesNb % 2 === 0) {
                    angle += this.branchesAngle / 2;
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
