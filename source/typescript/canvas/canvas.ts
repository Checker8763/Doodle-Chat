/* ---- GLOBAL VARIABLES ---- */
const canvasId = "inputCanvas"

const inputCanvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
const inputCanvasCtx = inputCanvas.getContext('2d')!

const sendButton = document.getElementById("send")!
const getButton = document.getElementById("get")!
const resetButton = document.getElementById("reset")!

// Config object for backend
let Config = {
  height: 84,
  width: 244,
  Frame: {
    borderWidth: 2,
  },
  Background: {
    stripeDistance: 16,
    stripeOffset: 3
  }
}

// Options object to hold user preferences
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
function clearCanvas(ctx: CanvasRenderingContext2D) {
  if (ctx.canvas == null) throw Error("[function clearCanvas] canvas is null")

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function getCanvasDataUrl(canvas: HTMLCanvasElement) {
  return canvas.toDataURL('image/png')
}

function drawImageFromDataUrl(ctx: CanvasRenderingContext2D, data: string) {
  let img = new Image();
  img.src = data;
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }
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
  ctx.closePath();
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
  ctx.closePath();
  ctx.fill();
}

function generateBackground(ctx: CanvasRenderingContext2D) {
  if (ctx.canvas == null) throw Error("[function generateBackground] canvas is null")

  let distance = Config.Background.stripeDistance,
    offset = Config.Background.stripeOffset,
    lineCount = Math.floor(ctx.canvas.height / distance);

  clearCanvas(ctx)

  ctx.strokeStyle = "lightGrey"
  ctx.lineWidth = 1

  // Draw background stripes
  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index + offset;
    strokeLine(ctx, 0, offsetY, ctx.canvas.width, offsetY)
  }

  // Frame Border
  ctx.strokeStyle = Options.Drawing.color
  ctx.lineWidth = 2 * Config.Frame.borderWidth

  strokeRoundedRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height, 5)
}

/* ----- EVENT HANDLER ----- */
function mouseMoveHandler(event: MouseEvent) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    let toX = event.offsetX,
      toY = event.offsetY,
      fromX = toX - event.movementX,
      fromY = toY - event.movementY;

    strokeLine(inputCanvasCtx, fromX, fromY, toX, toY);
  }
}

function debugSend(data: string) {
  let canvas1 = document.getElementById('picture1') as HTMLCanvasElement,
    ctx1 = canvas1.getContext('2d')!
    clearCanvas(ctx1)

  drawImageFromDataUrl(ctx1, data)
}

function sendButtonHandler() {
  // get image data from canvas
  let data = getCanvasDataUrl(inputCanvas)
  // sendData
  debugSend(data)
}

function resetButtonHandler() {
  clearCanvas(inputCanvasCtx);
  generateBackground(inputCanvasCtx)
}

function getButtonHandler() {
  //get selected Canvas
  let canvas1 = document.getElementById('picture1') as HTMLCanvasElement,
  // get its png data
  data = canvas1.toDataURL()
  // draw it over the inputCanvas
  drawImageFromDataUrl(inputCanvasCtx, data)
}

// Init
function configureCanvas(ctx: CanvasRenderingContext2D) {
  ctx.canvas.width = Config.width
  ctx.canvas.height = Config.height
  ctx.imageSmoothingEnabled = false
}

function initCanvas(ctx: CanvasRenderingContext2D) {
  configureCanvas(ctx)
  generateBackground(ctx)
}

initCanvas(inputCanvasCtx)

let canvas1 = document.getElementById('picture1') as HTMLCanvasElement,
ctx1 = canvas1.getContext('2d')!
initCanvas(ctx1)

// Register Listeners
inputCanvas.addEventListener("mousemove", mouseMoveHandler);

resetButton.addEventListener("click", resetButtonHandler)
sendButton.addEventListener('click', sendButtonHandler)
getButton.addEventListener('click', getButtonHandler)