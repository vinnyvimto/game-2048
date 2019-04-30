import Cell from "./cell";

export default class Grid {
  constructor(rowLength, colLength, state = []) {
    this.rowLength = rowLength;
    this.colLength = colLength;
    this.cellMatrix = [];
    this.hasWon = false;
    this.hasLost = false;
    this.score = 0;
    this.latestCell = null;

    this.init(state);
  }

  init(state = []) {
    this.cellMatrix = [];
    // TODO: need to load in value data without clearing cells
    for (let row = 0; row < this.rowLength; ++row) {
      this.cellMatrix.push([]);

      for (let col = 0; col < this.colLength; ++col) {
        const value = state.length ? state[row][col] : 0;

        this.cellMatrix[row][col] = new Cell(row, col, value);
      }
    }
  }

  fillCell(row, col, value) {
    const cell = this.cellMatrix[row][col];
    if (!cell.isEmpty) {
      return;
    }
    cell.value = value;
  }

  getCell(row, col) {
    return this.cellMatrix[row][col];
  }

  initRandomCell(value) {
    const emptyCells = this.getEmptyCells();
    const randIndex = ~~(Math.random() * emptyCells.length);
    const luckyCell = emptyCells[randIndex];
    luckyCell.value = value;
    luckyCell.oldRow = -1;
    luckyCell.oldColumn = -1;
    this.latestCell = luckyCell || null;
  }

  getEmptyCells() {
    const emptyCells = [];
    for (const row of this.cellMatrix) {
      for (const cell of row) {
        if (cell.value === 0) {
          emptyCells.push(cell);
        }
      }
    }
    return emptyCells;
  }

  slide(direction, newValue = true) {
    // left: 0, up: 1, right: 2, down: 3
    for (let i = 0; i < direction; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    const wasMoved = this.slideLeft();
    for (let i = direction; i < 4; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    this.syncPositions();

    if (newValue && wasMoved && !this.hasWon) {
      this.initRandomCell(1);
    }

    // TODO: Could just check if we can place a new cell?
    this.checkHasLost();
  }

  rotateLeft(cellMatrix) {
    const rotatedMatrix = [];
    for (var row = 0; row < this.rowLength; ++row) {
      rotatedMatrix.push([]);
      for (var col = 0; col < this.colLength; ++col) {
        rotatedMatrix[row][col] = cellMatrix[col][this.colLength - row - 1];
      }
    }
    return rotatedMatrix;
  }

  slideLeft() {
    let wasMoved = false;

    for (let row = 0; row < this.rowLength; ++row) {
      // get every cell that isn't empty
      const rowFullCells = this.cellMatrix[row].filter(cell => !cell.isEmpty());

      if (!rowFullCells.length) {
        // Row is completely empty so just move on to the next
        continue;
      }

      let prevIndex = 0;
      let nextIndex = 1;

      for (let col = 0; col < this.colLength; ++col) {
        if (this.cellMatrix[row][col].value === 0) {
          // We've confirmed there are values in this row so any blank space before will cause a move
          wasMoved = true;
        }

        if (!rowFullCells[nextIndex]) {
          // Only one cell in the row so no merge possible
          break;
        }

        const prevFullCell = rowFullCells[prevIndex];
        const nextFullCell = rowFullCells[nextIndex];

        if (prevFullCell.value === nextFullCell.value) {
          // remove two consecutive cells starting from the previous cells index and replace with the next fill cell
          nextFullCell.value += nextFullCell.value;
          this.score += nextFullCell.value;
          delete prevFullCell.mergedWith;
          nextFullCell.mergedWith = prevFullCell;
          rowFullCells.splice(prevIndex, 2, nextFullCell);

          wasMoved = true;

          // has the player won?
          if (nextFullCell.value === 2048) {
            this.hasWon = true;
          }
          break;
        }

        prevIndex++;
        nextIndex++;
      }

      const padSize = this.rowLength - rowFullCells.length;
      for (let i = 0; i < padSize; i++) {
        rowFullCells.push(new Cell(row, i + rowFullCells.length, 0));
      }

      this.cellMatrix[row] = rowFullCells;
    }

    return wasMoved;
  }

  syncPositions() {
    this.cellMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        cell.oldRow = cell.row;
        cell.oldColumn = cell.column;
        cell.row = rowIndex;
        cell.column = colIndex;
      });
    });
  }

  checkHasWon() {
    return this.hasWon;
  }

  canMoveUp(cell) {
    const cellAbove =
      cell.row > 0 ? this.cellMatrix[cell.row - 1][cell.column] : false;
    return (
      cellAbove && (cellAbove.value === 0 || cellAbove.value === cell.value)
    );
  }

  canMoveDown(cell) {
    const cellBelow =
      cell.row < this.rowLength - 1
        ? this.cellMatrix[cell.row + 1][cell.column]
        : false;
    return (
      cellBelow && (cellBelow.value === 0 || cellBelow.value === cell.value)
    );
  }

  canMoveLeft(cell) {
    const cellLeft =
      cell.column > 0 ? this.cellMatrix[cell.row][cell.column - 1] : false;
    return cellLeft && (cellLeft.value === 0 || cellLeft.value === cell.value);
  }

  canMoveRight(cell) {
    const cellRight =
      cell.column < this.colLength - 1
        ? this.cellMatrix[cell.row][cell.column + 1]
        : false;
    return (
      cellRight && (cellRight.value === 0 || cellRight.value === cell.value)
    );
  }

  canMove() {
    return this.cellMatrix.some(row => {
      const rowFullCells = row.filter(cell => !cell.isEmpty());
      return rowFullCells.some(fullCell => {
        return (
          this.canMoveUp(fullCell) ||
          this.canMoveDown(fullCell) ||
          this.canMoveLeft(fullCell) ||
          this.canMoveRight(fullCell)
        );
      });
    });
  }

  checkHasLost() {
    return !this.canMove();
  }

  getValueMatrix() {
    return this.cellMatrix.map(row => row.map(cell => cell.value));
  }
}
