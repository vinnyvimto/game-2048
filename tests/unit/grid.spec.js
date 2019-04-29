import Grid from "../../src/utilities/grid";

describe("grid.js", () => {
  it("can change a cells value", () => {
    const grid = new Grid(6, 6);
    grid.fillCell(0, 1, 2);
    const cell = grid.getCell(0, 1);
    expect(cell.value).toBe(2);
  });

  it("can move cells to the left", () => {
    const grid = new Grid(6, 6);
    grid.fillCell(0, 1, 2);
    grid.slideLeft();
    const cell = grid.getCell(0, 0);
    expect(cell.value).toBe(2);
  });

  it("stacks non-equal cells to the left", () => {
    const grid = new Grid(6, 6);
    const row = 2;
    grid.fillCell(row, 2, 2);
    grid.fillCell(row, 5, 4);
    grid.slideLeft();
    const leftMostCell = grid.getCell(row, 0);
    const rightMostCell = grid.getCell(row, 1);
    expect(leftMostCell.value).toBe(2);
    expect(rightMostCell.value).toBe(4);
  });

  it("combines equal cells into their sum", () => {
    const grid = new Grid(6, 6);
    const row = 3;
    grid.fillCell(row, 2, 2);
    grid.fillCell(row, 5, 2);
    grid.slideLeft();
    const leftMostCell = grid.getCell(row, 0);
    const rightMostCell = grid.getCell(row, 1);
    expect(leftMostCell.value).toBe(4);
    expect(rightMostCell.value).toBe(0);
  });

  it("prioritises combining equal values nearest the wall", () => {
    const grid = new Grid(6, 6);
    const row = 4;
    grid.fillCell(row, 2, 2);
    grid.fillCell(row, 4, 2);
    grid.fillCell(row, 5, 2);
    grid.slideLeft();
    const leftMostCell = grid.getCell(row, 0);
    const middleCell = grid.getCell(row, 1);
    const rightMostCell = grid.getCell(row, 2);
    expect(leftMostCell.value).toBe(4);
    expect(middleCell.value).toBe(2);
    expect(rightMostCell.value).toBe(0);
  });

  it("registers the play as having won if a value of 2048 is achieved", () => {
    const grid = new Grid(6, 6);
    const row = 0;
    grid.fillCell(row, 1, 1024);
    grid.fillCell(row, 2, 1024);
    expect(grid.hasWon).toBe(false);
    grid.slideLeft();
    expect(grid.hasWon).toBe(true);
  });
});
