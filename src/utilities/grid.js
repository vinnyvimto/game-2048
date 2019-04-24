// import _ from 'lodash';
import Cell from "./cell";

export default class Grid {
  constructor(rowLength, colLength) {
    this.rowLength = rowLength;
    this.colLength = colLength;
    this.cellMatrix = [];

    this.initGrid();
  }

  gameOver() {
    return false;
  }

  initGrid() {
    for (let i = 0; i < this.rowLength; ++i) {
      const rowId = i + 1;
      this.cellMatrix.push([]);

      for (let j = 0; j < this.colLength; ++j) {
        const colId = j + 1;
        this.cellMatrix[i][j] = new Cell(rowId, colId, 0);
      }
    }
  }

  fillCell(row, col, value) {
    const cell = this.cellMatrix[row - 1][col - 1];
    if (!cell.isEmpty) {
      return;
    }
    cell.value = value;
  }

  getCell(row, col) {
    return this.cellMatrix[row - 1][col - 1];
  }

  initRandomCell(value) {
    const emptyCells = this.getEmptyCount();
    const randIndex = ~~(Math.random() * emptyCells.length);
    const luckyCell = emptyCells[randIndex];
    luckyCell.value = value;
  }

  getEmptyCount() {
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
    // console.log(direction);
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    // this.clearOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cellMatrix = this.rotateLeft(this.cellMatrix);
    }
    // if (hasChanged) {
    //   this.addRandomTile();
    // }
    // this.setPositions();
    // return this;

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
    let hasChanged = false;
    // for each row
    for (let row = 0; row < this.rowLength; ++row) {
      // console.log(`Row: ${row}`);
      // get every cell that isn't empty
      const rowFullCells = this.cellMatrix[row].filter(cell => !cell.isEmpty());
      // console.log('This Rows Full cells');
      // console.log(rowFullCells);
      const resultRow = [];
      // for each of the new row
      for (let col = 0; col < this.colLength; ++col) {
        // console.log(`Col: ${col}`);
        // target is left most cell
        let prevFullCell = rowFullCells.length ? rowFullCells.shift() : null;
        // cell to check against is the next
        const nextFullCell = rowFullCells.length ? rowFullCells[0].value : null;
        // if the first
        // console.log('Previous Full Cell');
        // console.log(prevFullCell);
        // console.log('Next Full Cell');
        // console.log(nextFullCell);
        if (prevFullCell && prevFullCell.value === nextFullCell) {
          // console.log("No merge needed");
          // const tile1 = prevFullCell;
          // prevFullCell = this.addTile(prevFullCell.value);
          // tile1.mergedInto = prevFullCell;
          // const tile2 = rowFullCells.shift();
          // tile2.mergedInto = prevFullCell;
          // add cell values together
          prevFullCell.value += nextFullCell.value;
        }
        // Set the row to the result
        resultRow[col] = prevFullCell;
        if (prevFullCell) {
          // console.log(`Set row: ${row}, col: ${col} to ${prevFullCell.value}`);
        }
        // has the player won?
        // this.won |= (prevFullCell.value == 2048);
        // log if there was a change
        // hasChanged |= (prevFullCell.value != this.cellMatrix[row][col].value);
      }
      this.cellMatrix[row] = resultRow;
    }
    return hasChanged;
  }
}
