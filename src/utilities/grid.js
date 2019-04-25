// import _ from 'lodash';
import Cell from "./cell";

export default class Grid {
  constructor(rowLength, colLength) {
    this.rowLength = rowLength;
    this.colLength = colLength;
    this.cellMatrix = [];
    this.hasWon = false;
    this.hasLost = false;

    this.initGrid();
  }

  initGrid() {
    for (let i = 0; i < this.rowLength; ++i) {
      this.cellMatrix.push([]);

      for (let j = 0; j < this.colLength; ++j) {
        this.cellMatrix[i][j] = new Cell(i, j, 0);
      }
    }
  }

  checkHasLost() {
    let canMove = false;

    for (let row = 0; row < this.rowLength; ++row) {
      const rowFullCells = this.cellMatrix[row].filter(cell => !cell.isEmpty());

      for (const fullCell of rowFullCells) {

        console.log(fullCell);

        // check can move up
        if (fullCell.row > 0) {
          const cellAbove = this.cellMatrix[fullCell.row - 1][fullCell.column];
          if (cellAbove && (cellAbove.value === 0 || cellAbove.value === fullCell.value)) {
            canMove = true;
          }
        } else {
          console.log("can't move up");
        }

        // can move down
        if (fullCell.row < this.rowLength - 1) {
          const cellBelow = this.cellMatrix[fullCell.row + 1][fullCell.column];
          if (cellBelow && (cellBelow.value === 0 || cellBelow.value === fullCell.value)) {
            canMove = true;
          }
        } else {
          console.log("can't move down");
        }

        // can move left
        if (fullCell.col > 0) {
          const cellLeft = this.cellMatrix[fullCell.row][fullCell.column - 1];
          if (cellLeft && (cellLeft.value === 0 || cellLeft.value === fullCell.value)) {
            canMove = true;
          }
        } else {
          console.log("can't move left");
        }

        // can move right
        if (fullCell.col < this.colLength - 1) {
          const cellRight = this.cellMatrix[fullCell.row][fullCell.column + 1];
          if (cellRight && (cellRight.value === 0 || cellRight.value === fullCell.value)) {
            canMove = true;
          }
        } else {
          console.log("can't move right");
        }

      }

    }

    this.hasLost = !canMove;
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

  slide(direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    // this.clearOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    const wasMoved = this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    this.syncPositions();
    this.checkHasLost();
    if (wasMoved && !this.hasWon && !this.hasLost) {
      this.initRandomCell(1);
    }
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

  moveLeft() {
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

  getValueMatrix() {
    return this.cellMatrix.map(row => row.map(cell => cell.value));
  }
}
