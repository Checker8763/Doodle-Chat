// GLOBAL VARIABLES
canvaseId = "inputCanvas"

let drawCanvas = document.getElementById(canvaseId);

let Options = {
  drawWidth: 1,
  color: "black",
  blur: false,
  blurWidth: 1,
};


// FUNCTIONS
function getDrawCanvas() {
  return document.getElementById(canvaseId);
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
    lineCount = Math.floor(drawCanvas.height / distance),
    ctx = drawCanvas.getContext("2d");

  setContextOptions(context)

  for (let index = 1; index < lineCount; index++) {
    let offsetY = distance * index;
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(drawCanvas.width, offsetY));
    ctx.stroke();
  }
}


function drawLineOnCanvas(event) {
  let x = event.offsetX,
    y = event.offsetY,
    ctx = drawCanvas.getContext("2d");

  setContextOptions(ctx, Options);

  ctx.beginPath()
  // Draw line from last coord...
  ctx.moveTo(x - event.movementX, y - event.movementY);
  // ... to new coord
  ctx.lineTo(x, y);

  ctx.stroke();
}


function mouseMoveHandler(event) {
  // Checks if left mouse button is pressed
  if (event.buttons === 1) {
    drawLineOnCanvas(event);
  }
}

// Register Listners
drawCanvas.addEventListener("mousemove", mouseMoveHandler);
