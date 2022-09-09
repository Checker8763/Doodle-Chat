/* ---- GLOBAL VARIABLES ---- */
const inputs = {
  canvas: {
    element: document.querySelector("canvas.input"),
    //@ts-ignore
    context: document.querySelector("canvas.input").getContext('2d')
  },
  btn: {
    send: document.getElementById("send"),
    get: document.getElementById("get"),
    reset: document.getElementById("reset")
  }
};

var posts = {
  all: document.querySelectorAll("#history canvas"),
  last: {
    element: document.getElementById("lastPost"),
    //@ts-ignore
    context: document.getElementById("lastPost").getContext('2d')
  }
};

// Config object for backend
const Config = {
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

    strokeLine(inputs.canvas.context, fromX, fromY, toX, toY);
  }
}

function debugSend(data: string) {
    clearCanvas(posts.last.context)

  drawImageFromDataUrl(posts.last.context, data)
}

function sendButtonHandler() {
  // get image data from canvas
  //@ts-ignore
  let data = getCanvasDataUrl(inputs.canvas.element)
  // sendData
  debugSend(data)
}

function resetButtonHandler() {
  clearCanvas(inputs.canvas.context);
  generateBackground(inputs.canvas.context)
}

function getButtonHandler() {
  // get its png data
      //@ts-ignore
  const data = posts.last.element!.toDataURL()
  // draw it over the inputCanvas
  drawImageFromDataUrl(inputs.canvas.context, data)
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

initCanvas(inputs.canvas.context);
for (let i = 0; i < posts.all.length; i++) {
  //@ts-ignore
  initCanvas(posts.all[i].getContext('2d'));
}
// @ts-ignore
inputs.canvas.element.addEventListener("mousemove", mouseMoveHandler);
inputs.btn.reset!.addEventListener("click", resetButtonHandler);
inputs.btn.send!.addEventListener('click', sendButtonHandler);
inputs.btn.get!.addEventListener('click', getButtonHandler);