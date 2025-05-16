export class tank {
    x: number;
    y: number;
    angle: number;
    drawQueue: any;
    isClient: boolean;

    constructor(x: number, y: number, drawQueue: any, isClient: boolean) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.drawQueue = drawQueue;
        this.isClient = isClient;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.angle);
        p.fill(255);
        p.rect(-25, -25, 50, 50);
        p.pop();
    }
}

export class bullet {
    x: number;
    y: number;
    size: number;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(p: p5) {
        p.fill(255);
        p.ellipse(this.x, this.y, this.size);
    }
}