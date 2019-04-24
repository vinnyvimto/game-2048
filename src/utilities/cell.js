export default class Cell {
  constructor(rowId, columnId, value) {
    this.rowId = rowId || -1;
    this.columnId = columnId || -1;
    this.value = value || 0;
    this.id = `${rowId}x${columnId}`;
  }

  isEmpty() {
    return !this.value;
  }
}
