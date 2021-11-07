import { color } from "../website/canvas/classes/color";

test("A new color without values is always black and completely visible", () => {
    let c: color = new color();
    expect(c.RGB).toBe("rgb(0, 0, 0)");
    expect(c.RGBA).toBe("rgba(0, 0, 0, 255)");
    expect(c.colorValues).toEqual([0,0,0,255]);
});

test("The maximum of a color value is 255", () => {
    let c: color = new color(256,256,256,256);
    expect(c.colorValues).toEqual([255,255,255,255]);
});