const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const playButton = document.getElementById('play-button');
const speed = document.getElementById('speed-input');
const generations = document.getElementById('generations-count');
const width = 1300;
const height = 600;
const size = width + height;
const scale = 6;
const resolution = Math.round(size / scale);
let speedInterval;
let simulationRunning = false;

function settingUp() {
    canvas.width = width;
    canvas.height = height;
    context.scale(scale, scale);
    cells = createCells();
    cellsAlive();
    printCells();
};

function createCells() {
    let rows = new Array(resolution);
    for (let x = 0; x < resolution; x++) {
        let cols = new Array(resolution);
        for (let y = 0; y < resolution; y++) {
            cols[y] = false;
        };
        rows[x] = cols;
    };

    generations.innerText++;
    return rows;
};

function cellsAlive() {
    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            Math.random() > 0.5 ? cells[x][y] = true : cells[x][y] = false;
        }
    }
};

function printCells() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, resolution, resolution);

    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            if (cells[x][y]) {
                context.fillRect(x, y, 0.7, 0.7);
                context.fillStyle = 'olive';
            }
        }
    }
};

function getNeighbours(x, y) {
    let aliveNeighbours = 0;
    for (let i = - 1; i < 2; i++) {
        for (let j = - 1; j < 2; j++) {
            if (j === 0 && i === 0) continue;
            if (x + i < 0 || x + i > resolution - 1) continue;
            if (y + j < 0 || y + j > resolution - 1) continue;
            if (cells[x + i][y + j]) aliveNeighbours++;
        }
    };

    return aliveNeighbours;
};

function nextGeneration() {
    let newCells = createCells();
    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            let neighbours = getNeighbours(x, y);
            if (cells[x][y] && (neighbours === 2 || neighbours === 3)) {
                newCells[x][y] = true;
            } else if (!cells[x][y] && neighbours === 3) {
                newCells[x][y] = true;
            }
        }
    };

    return cells = newCells;
};

function setSpeed() {
    speed.value ? speed.value : speed.value = 150;

    speedInterval = setInterval(() => {
       if (simulationRunning) {
           nextGeneration();
           printCells();
       } 
    }, speed.value);
};

function stopInterval() {
    clearInterval(speedInterval);
};

function resetGame() {
    simulationRunning ? simulationRunning = !simulationRunning : !simulationRunning;
    generations.innerText = 0;
    context.fillStyle = 'white';
    context.fillRect(0, 0, resolution, resolution);
    stopInterval();
};

function playGame() {
    if (simulationRunning === false) {
        simulationRunning = true;
        generations.innerText = 0;
        settingUp();
        setSpeed();
    }
};
