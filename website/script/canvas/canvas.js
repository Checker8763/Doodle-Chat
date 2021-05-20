/* ---- GLOBAL VARIABLES ---- */
const canvasId = "inputCanvas"

const inputCanvas = document.getElementById(canvasId);

const sendButton = document.getElementById("send")
const getButton = document.getElementById("get")
const resetButton = document.getElementById("reset")

let Options = {
  drawWidth: 1,
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


function generateBackground() {
  let distance = 10,
    lineCount = Math.floor(inputCanvas.height / distance),
    ctx = inputCanvas.getContext("2d");

  setContextOptions(context)

  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index;
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(inputCanvas.width, offsetY);
    ctx.stroke();
  }
}


function drawLineOnCanvas(event) {
  let x = event.offsetX,
    y = event.offsetY,
    ctx = inputCanvas.getContext("2d");

  setContextOptions(ctx, Options);

  ctx.beginPath()
  // Draw line from last cord...
  ctx.moveTo(x - event.movementX, y - event.movementY);
  // ... to new cord
  ctx.lineTo(x, y);

  ctx.stroke();
}

/* ----- EVENT HANDLER ----- */
function mouseMoveHandler(event) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    drawLineOnCanvas(event);
  }
}

function resetCanvas(){
  let ctx = inputCanvas.getContext("2d")
  ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
}

/* ---- INIT ---- */
// Assign height and width to canvas
inputCanvas.width = 384
inputCanvas.height = 288

// Register Listeners
inputCanvas.addEventListener("mousemove", mouseMoveHandler);

resetButton.addEventListener("click", resetCanvas)