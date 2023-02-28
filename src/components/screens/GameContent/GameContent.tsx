import React, { type FC, type ReactNode } from "react";

import styles from "./GameContent.module.css";
import { Cell } from "../../ui/Cell/Cell";

import type { ICells } from "../../../types";
import { CellState, CellValue } from "../../../types";

interface IGameContent {
  handleCellClick(
    rowParam: number,
    colParam: number
  ): (...args: unknown[]) => void;
  cells: ICells[][];
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

export const GameContent: FC<IGameContent> = ({
  handleCellClick,
  cells,
  onContext,
}): JSX.Element => {
  const renderCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          red={cell.red}
          onContext={onContext}
          onClick={handleCellClick}
          key={`${rowIndex}_${colIndex}`}
          value={cell.value}
          state={cell.state}
          row={rowIndex}
          col={colIndex}
        />
      ))
    );
  };

  return <div className={styles.content}>{renderCells()}</div>;
};
