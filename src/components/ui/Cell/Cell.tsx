import React, { type FC } from "react";
import type { ICellProps } from "./Cell.props";

import cn from "classnames";
import styles from "./Cell.module.css";
import { CellState, CellValue, Emoji } from "../../../types";

export const Cell: FC<ICellProps> = ({
  row,
  col,
  onClick,
  state,
  onContext,
  value,
  red,
}): JSX.Element => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span>💣</span>;
      } else if (value === CellValue.none) {
        return null;
      }
      return <span>{value}</span>;
    } else if (state === CellState.flagged) {
      return <span>🚩</span>;
    }
    return null;
  };
  console.log(styles[`value${value}`]);
  return (
    <button
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
      className={cn(styles.cell, styles[`value${value}`], {
        [styles.visible]: CellState.visible === state,
        [styles.red]: red,
      })}
    >
      {renderContent()}
    </button>
  );
};
