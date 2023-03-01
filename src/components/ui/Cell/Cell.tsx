import React, { type FC, useMemo } from "react";
import type { ICellProps } from "./Cell.props";

import cn from "classnames";
import styles from "./Cell.module.css";
import { CellState, CellValue } from "../../../types";

export const Cell: FC<ICellProps> = ({
  row,
  col,
  onClick,
  state,
  onContext,
  value,
  red,
  onMouseDownEmoji,
  onMouseUpEmoji,
}): JSX.Element => {
  const renderContent = useMemo((): JSX.Element | null => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span>💣</span>;
      } else if (value === CellValue.none) {
        return null;
      }
      return <span>{value}</span>;
    } else if (state === CellState.flagged) {
      return <span>🚩</span>;
    } else if (state === CellState.question) {
      return <span>❔</span>;
    }
    return null;
  }, [state, value]);

  return (
    <button
      onMouseDown={onMouseDownEmoji}
      onMouseUp={onMouseUpEmoji}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
      className={cn(styles.cell, styles[`value${value}`], {
        [styles.visible]: CellState.visible === state,
        [styles.red]: red,
      })}
    >
      {renderContent}
    </button>
  );
};
