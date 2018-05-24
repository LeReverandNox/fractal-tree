const GAP_PERCENTAGE = 5;

let SPEED = 0;
let sponge = []

function setup() {
    createCanvas(600, 600, WEBGL);

    b = new Box(0, 0, 0, 200);
    sponge.push(b);
}

function draw() {
    background(51)

    rotateX(SPEED)
    rotateY(SPEED)
    SPEED += 0.01

    sponge.map((b) => {
        b.show();
    })
}

function mousePressed() {
    let newSponge = [];
    sponge.map((b) => {
        boxes = b.generate();
        newSponge.push(...boxes);
    });
    sponge = newSponge;
}
