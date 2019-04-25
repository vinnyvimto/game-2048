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

  moveTo(row, column) {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  }

  isNew() {
    return this.oldRow == -1 && !this.mergedWith;
  }

  hasMoved() {
    return (
      (this.fromRow() != -1 &&
        (this.fromRow() != this.toRow() ||
          this.fromColumn() != this.toColumn())) ||
      this.mergedWith
    );
  }

  fromRow() {
    return this.mergedWith ? this.row : this.oldRow;
  }

  fromColumn() {
    return this.mergedWith ? this.column : this.oldColumn;
  }

  toRow() {
    return this.mergedWith ? this.mergedWith.row : this.row;
  }

  toColumn() {
    return this.mergedWith ? this.mergedWith.column : this.column;
  }
}
