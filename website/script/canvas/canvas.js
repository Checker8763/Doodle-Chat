/* ---- GLOBAL VARIABLES ---- */
const canvasId = "inputCanvas"

const inputCanvas = document.getElementById(canvasId);

const sendButton = document.getElementById("send")
const getButton = document.getElementById("get")
const resetButton = document.getElementById("reset")

let Options = {
  drawWidth: 2,
  color: "black",
  blur: false,
  blurWidth: 1,
};

/* ---- FUNCTIONS ---- */
function getDrawCanvas() {
  return document.getElementById(canvasId);
}


function setContextOptions(context, options) {
  context.fillStyle = options.color;
  context.lineWidth = options.drawWidth;
  if (options.blur) {
    context.shadowColor = options.color;
    context.shadowBlur = options.blurWidth;
  }
}

function drawLine(fromX, fromY, toX, toY) {
  ctx = inputCanvas.getContext("2d");

  setContextOptions(ctx, Options);

  ctx.beginPath()
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function generateBackground() {
  let distance = 10,
    lineCount = Math.ceil(inputCanvas.height / distance),
    ctx = inputCanvas.getContext("2d");

  setContextOptions(
    ctx,
    {
      "color": "black",
      "drawWidth": 0.25
    }
  )

  // Draw background stripes
  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index;
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(inputCanvas.width, offsetY);
    ctx.stroke();
  }

  // Frame Border
  let maxY = inputCanvas.height,
    maxX = inputCanvas.width;

  drawLine(1, 0, 1, maxY)
  drawLine(1, 1, maxX, 1)
  drawLine(maxX - 1, maxY - 1, maxX - 1, 1)
  drawLine(maxX, maxY - 1, 1, maxY - 1)
  // Frame Border Roundings
}

/* ----- EVENT HANDLER ----- */
function mouseMoveHandler(event) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    let toX = event.offsetX,
      toY = event.offsetY,
      fromX = toX - event.movementX,
      fromY = toY - event.movementY;

    drawLine(fromX, fromY, toX, toY);
  }
}

function resetCanvas() {
  let ctx = inputCanvas.getContext("2d")
  ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
  generateBackground()
}

/* ---- INIT ---- */
// Assign height and width to canvas
inputCanvas.width = 256
inputCanvas.height = 96

generateBackground()

// Register Listeners
inputCanvas.addEventListener("mousemove", mouseMoveHandler);

resetButton.addEventListener("click", resetCanvas)