/* ---- GLOBAL VARIABLES ---- */
const canvasId = "inputCanvas"

const inputCanvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement

const sendButton = document.getElementById("send")!
const getButton = document.getElementById("get")!
const resetButton = document.getElementById("reset")!

// Config object for backend
let Config = {
  Frame: {
    borderWidth: 2,
  },
  Background: {
    stripeDistance: 16,
    stripeOffset: 3
  }
}

// option object to hold user preferences
let Options = {
  // Drawing context
  Drawing: {
    width: 2,
    color: "black",
    blur: false,
    blurWidth: 1,
  },
};

/* ---- FUNCTIONS ---- */
function getDrawCanvas() {
  return document.getElementById(canvasId);
}


function applyUserOptions(context: CanvasRenderingContext2D) {
  // basic options
  context.fillStyle = Options.Drawing.color;
  context.lineWidth = Options.Drawing.width;
  // optional
  if (Options.Drawing.blur) {
    context.shadowColor = Options.Drawing.color;
    context.shadowBlur = Options.Drawing.blurWidth;
  }
}

function strokeLine(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
  ctx.beginPath()
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function strokeRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
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

function fillRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
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
  let ctx = inputCanvas.getContext("2d")!,
    distance = Config.Background.stripeDistance,
    offset = Config.Background.stripeOffset,
    lineCount = Math.floor(inputCanvas.height / distance);

  ctx.strokeStyle = Options.Drawing.color
  ctx.lineWidth = 0.25

  // Draw background stripes
  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index + offset;
    strokeLine(ctx, 0, offsetY, inputCanvas.width, offsetY)
  }

  // Frame Border
  ctx.lineWidth = 2 * Config.Frame.borderWidth

  strokeRoundedRect(ctx, 0, 0, inputCanvas.width, inputCanvas.height, 5)
}

/* ----- EVENT HANDLER ----- */
function mouseMoveHandler(event: MouseEvent) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    let ctx = inputCanvas.getContext('2d')!,
      toX = event.offsetX,
      toY = event.offsetY,
      fromX = toX - event.movementX,
      fromY = toY - event.movementY;

    strokeLine(ctx, fromX, fromY, toX, toY);
  }
}

function resetCanvas() {
  let ctx = inputCanvas.getContext("2d")!

  ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
  generateBackground()
}

function initCanvas() {
  console.log("Canvas Init")
  inputCanvas.width = 244
  inputCanvas.height = 84
  resetCanvas()
}

// Init
initCanvas()

// Register Listeners
inputCanvas.addEventListener("mousemove", mouseMoveHandler);
resetButton.addEventListener("click", resetCanvas)