import React, { type FC } from "react";
import type { ICellProps } from "./Cell.props";

import cn from "classnames";
import styles from "./Cell.module.css";
import { CellState } from "../../../types";
import { renderContent } from "./utlis/renderContent";

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
      {renderContent(state, value)}
    </button>
  );
};
