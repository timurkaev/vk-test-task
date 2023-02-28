export interface ICells {
  value: CellValue;
  state: CellState;
  red?: boolean;
}

export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  open,
  visible,
  flagged,
}

export enum Emoji {
  smile = "🙂",
  click = "😮",
  lost = "😵",
  won = "😎",
}
