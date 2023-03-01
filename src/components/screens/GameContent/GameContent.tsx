import type { MouseEvent } from "react";
import React, { type FC, type ReactNode } from "react";

import styles from "./GameContent.module.css";
import { Cell } from "../../ui/Cell/Cell";

import type { ICells } from "../../../types";
import cn from "classnames";

interface IGameContentProps {
  handleCellClick(
    rowParam: number,
    colParam: number
  ): (...args: unknown[]) => void;
  cells: ICells[][];
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  hasLost: boolean;
  hasWon: boolean;
  onMouseDownEmoji: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseUpEmoji: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const GameContent: FC<IGameContentProps> = ({
  handleCellClick,
  cells,
  onContext,
  hasLost,
  hasWon,
  onMouseDownEmoji,
  onMouseUpEmoji,
}): JSX.Element => {
  const renderCells = (): ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          onContext={onContext}
          onClick={handleCellClick}
          onMouseDownEmoji={onMouseDownEmoji}
          onMouseUpEmoji={onMouseUpEmoji}
          key={`${rowIndex}_${colIndex}`}
          value={cell.value}
          state={cell.state}
          row={rowIndex}
          col={colIndex}
          red={cell.red}
        />
      ))
    );
  };

  return (
    <div
      className={cn(styles.content, {
        [styles.lost]: hasLost,
        [styles.won]: hasWon,
      })}
    >
      {renderCells()}
    </div>
  );
};
