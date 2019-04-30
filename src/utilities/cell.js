export default class Cell {
  constructor(row, column, value) {
    this.row = row;
    this.column = column;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.value = value || 0;
    const uuid = Math.random()
      .toString(36)
      .substr(2, 5);
    this.id = `${row}x${column}-${uuid}`;
    this.mergedWith = null;
  }

  isEmpty() {
    return !this.value;
  }

  getCoordinates() {
    return [this.row, this.column];
  }

  isNew() {
    return this.oldRow === -1;
  }

  hasMoved() {
    return this.oldRow !== this.row || this.oldColumn !== this.column;
  }
}
