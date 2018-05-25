class Branch {
    constructor(startingVector, angle, length, color, thickness) {
        this.startingVector = startingVector;
        this.angle = angle;
        this.length = length;
        this.color = color;
        this.thickness = thickness;
        this.endVector;

        colorMode(HSB, 360, 100, 100);

        angleMode(DEGREES);
        let destVector = createVector(0, length);
        destVector.rotate(this.angle);
        this.endVector = p5.Vector.add(this.startingVector, destVector);
    }

    show() {
        push();
        stroke(...this.color);
        strokeWeight(this.thickness);

        line(this.startingVector.x, this.startingVector.y, this.endVector.x, this.endVector.y);
        pop();
    }
}
