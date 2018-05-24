class Box {
    constructor(x, y, z, size) {
        this.pos = createVector(x, y, z);
        this.size = size;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        box(this.size);
        pop();
    }

    generate() {
        let boxes = [];

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                    let sum = abs(i) + abs(j) + abs(k);
                    if (sum > 1) {
                        let newSize = this.size / 3;
                        let gap = (newSize / 100) * GAP_PERCENTAGE;
                        let b = new Box(this.pos.x + (i * newSize), this.pos.y + (j * newSize), this.pos.z + (k * newSize), newSize - gap);
                        boxes.push(b);
                    }
                }
            }
        }

        return boxes;
    }
}
