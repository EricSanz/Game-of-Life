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
}

