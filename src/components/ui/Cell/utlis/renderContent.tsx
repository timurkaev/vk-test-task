import { CellState, CellValue } from "../../../../types";
import React from "react";

export const renderContent = (
  state: CellState,
  value: CellValue
): JSX.Element | null => {
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
};
