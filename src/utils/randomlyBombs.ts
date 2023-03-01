import { BOMBS, MAX_COLS, MAX_ROWS } from "../constants";
import type { ICells } from "../types";
import { CellValue } from "../types";

// randomly 40 bombs
export const randomlyBombs = (cells: ICells[][]) => {
  let bombsPlaced = 0;
  while (bombsPlaced < BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        })
      );
      bombsPlaced++;
    }
  }
};
