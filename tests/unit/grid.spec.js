import Grid from '../../src/utilities/grid';

describe("grid.js", () => {
    it("Can populate a cell", () => {
        const grid = new Grid(6, 6);
        grid.fillCell(1, 2, 2);
        const cell = grid.getCell(1, 2);
        expect(cell.value).toBe(2);
    });

    it("Cells move to the left", () => {
        const grid = new Grid(6, 6);
        grid.fillCell(1, 2, 2);
        grid.moveLeft();
        const cell = grid.getCell(1, 1);
        expect(cell.value).toBe(2);
    });
});
