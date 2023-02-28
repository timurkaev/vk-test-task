import type { CellState, CellValue } from "../../../types";
import { MouseEventHandler } from "react";

export interface ICellProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  onClick(rowParam: number, colParam: number): (...args: unknown[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  red?: boolean;
}
