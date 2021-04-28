const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = 1300;
const height = 600;
const size = width + height;
const scale = 6;
const resolution = Math.round(size / scale);

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