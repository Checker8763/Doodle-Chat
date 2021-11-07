export class color {
    private r: number;
    private g: number;
    private b: number;
    private a: number;
    constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
        if (r <= 255) {
            this.r = r;
        } else {
            this.r = 255;
        }
        if (g <= 255) {
            this.g = g;
        } else {
            this.g = 255;
        }
        if (b <= 255) {
            this.b = b;
        } else {
            this.b = 255;
        }
        if (a <= 255) {
            this.a = a;
        } else {
            this.a = 255;
        }
    }
    setColor(r: number, g: number, b: number, a: number) {
        if (r <= 255) {
            this.r = r;
        } else {
            this.r = 255;
        }
        if (g <= 255) {
            this.g = g;
        } else {
            this.g = 255;
        }
        if (b <= 255) {
            this.b = b;
        } else {
            this.b = 255;
        }
        if (a <= 255) {
            this.a = a;
        } else {
            this.a = 255;
        }
    }
    get colorValues() {
        return [this.r, this.g, this.b, this.a];
    }
    get RGB() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }
    get RGBA() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    }
}