export function clearCanvas (ctx: CanvasRenderingContext2D): void {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0,0,screenWidth,screenHeight);
}