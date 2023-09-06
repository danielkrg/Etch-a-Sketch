const grid = document.querySelector('#grid')
var drawing = false;
var gridToggle = true;
var currentSize = 16;
var currR = 0;
var currG = 0;
var currB = 0;

const btnResize = document.querySelector('#resize')
const btnDraw = document.querySelector("#draw")
const btnClear = document.querySelector("#clear")
const btnGrid = document.querySelector("#toggle-grid")
const colorInput = document.querySelector("input");

function drawGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.setAttribute('id', 'row')
        for (let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.setAttribute('id', 'square')
            if (gridToggle === true) {
                square.classList.add('square-grid')
            }
            square.addEventListener("mouseover", colour)
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}

function clearGrid() {
    eraseGrid();
    drawGrid(currentSize);
}

function eraseGrid() {
    document.querySelectorAll('#row').forEach(e => e.remove());
    document.querySelectorAll('#square').forEach(e => e.remove());
}

function resizeGrid() {
    let newSize = parseInt(prompt("Enter new size (max 100)"));
    console.log(newSize)
    while (isNaN(newSize)) {
        newSize = parseInt(prompt("Input must be a whole number"));
    }
    if (newSize > 100) {
        newSize = 100;
    }
    eraseGrid()
    drawGrid(newSize);
    currentSize = newSize;
}

function toggleGrid() {
    gridToggle = !gridToggle;
    document.querySelectorAll('#square').forEach((square) => square.classList.toggle('square-grid'))
}

function toggleDraw() {
    drawing = !drawing;
    if (drawing) {
        btnDraw.setAttribute('style', 'background-color: #B8B5A7;')
    }
    else {
        btnDraw.setAttribute('style', 'background-color: #F4F1DE;')
    }
}


function colour() {
    if (drawing) {
        var bgCol = getComputedStyle(this).getPropertyValue("background-color");
        var alpha = parseFloat(bgCol.split(',')[3]);
        if (alpha + .3 === 1.2) {
            
        }
        else {
            alpha += .3
        }
        this.setAttribute('style', `background-color: rgba(${currR}, ${currG}, ${currB}, ${alpha});`)
    }
}

function keyPress(e) {
    if (e.code === 'KeyD') {
        toggleDraw();
    }
    else if (e.code === 'KeyC') {
        clearGrid();
    }
    else if (e.code === 'KeyR') {
        resizeGrid();
    }
    else if (e.code === 'KeyG') {
        toggleGrid();
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function changeColor(event) {
    let hex = event.target.value;
    currR = hexToRgb(hex).r
    currG = hexToRgb(hex).g
    currB = hexToRgb(hex).b
}

colorInput.addEventListener("change", changeColor, false);

drawGrid(currentSize);

btnResize.addEventListener('click', resizeGrid)
btnDraw.addEventListener('click', toggleDraw)
btnClear.addEventListener('click', clearGrid);
btnGrid.addEventListener('click', toggleGrid);

document.addEventListener('keypress', keyPress)
var squares = document.querySelectorAll('#square')