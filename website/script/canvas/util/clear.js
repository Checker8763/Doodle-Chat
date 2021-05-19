export function clearCanvas (ctx) {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0,0,screenWidth,screenHeight);
}