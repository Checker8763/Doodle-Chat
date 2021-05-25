/* ---- GLOBAL VARIABLES ---- */
const canvasId = "inputCanvas"

const inputCanvas = document.getElementById(canvasId);

const sendButton = document.getElementById("send")
const getButton = document.getElementById("get")
const resetButton = document.getElementById("reset")

let Config = {
  borderWidth: 2,
}

let Options = {
  width: 2,
  color: "black",
  blur: false,
  blurWidth: 1,
};

/* ---- FUNCTIONS ---- */
function getDrawCanvas() {
  return document.getElementById(canvasId);
}


function setContextOptions(context: any, options: any) {
  // basic options
  context.fillStyle = options.color;
  context.lineWidth = options.width;
  // optional
  if (options.blur) {
    context.shadowColor = options.color;
    context.shadowBlur = options.blurWidth;
  }
}

function drawLine(fromX: number, fromY: number, toX: number, toY: number, ctx: any) {
  ctx.beginPath()
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function strokeRoundedRect(ctx: any, x: number, y: number, width: number, height:number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

function fillRoundedRect(ctx: any, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

function generateBackground() {
  let distance = 10;
  // @ts-ignore
  let lineCount = Math.ceil(inputCanvas!.height / distance);
  // @ts-ignore
  let ctx = inputCanvas!.getContext("2d");

  ctx.fillStyle = Options.color
  ctx.lineWidth = 0.25

  // Draw background stripes
  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index;
    // @ts-ignore
    drawLine(0, offsetY, inputCanvas!.width, offsetY, ctx)
  }

  // Frame Border
  // Set Style
  ctx.fillStyle = Options.color
  ctx.lineWidth = 2 * Config.borderWidth

  // @ts-ignore
  strokeRoundedRect(ctx, 0, 0, inputCanvas!.width, inputCanvas!.height, 5)
}

/* ----- EVENT HANDLER ----- */
// @ts-ignore
function mouseMoveHandler(event: any) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    let toX = event.offsetX,
      toY = event.offsetY,
      fromX = toX - event.movementX,
      fromY = toY - event.movementY;

    drawLine(fromX, fromY, toX, toY, event);
  }
}

function resetCanvas() {
  // @ts-ignore
  let ctx = inputCanvas!.getContext("2d")
  // @ts-ignore
  ctx.clearRect(0, 0, inputCanvas!.width, inputCanvas!.height);
  generateBackground()
}

function initCanvas() {
  console.log("Canvas Init")
  // @ts-ignore
  inputCanvas!.width = 244
  // @ts-ignore
  inputCanvas!.height = 84
  resetCanvas()
}

// @ts-ignore
function mouseMoveHandler(event: any) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    // @ts-ignore
    let ctx = inputCanvas!.getContext('2d'),
      toX = event.offsetX,
      toY = event.offsetY,
      fromX = toX - event.movementX,
      fromY = toY - event.movementY;
      setContextOptions(ctx, Options)
    drawLine(fromX, fromY, toX, toY, ctx);
  }
}

// Init
initCanvas()

// Register Listeners
inputCanvas!.addEventListener("mousemove", mouseMoveHandler);

resetButton!.addEventListener("click", resetCanvas)