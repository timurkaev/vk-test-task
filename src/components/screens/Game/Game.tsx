import type { MouseEvent } from "react";
import React, { type FC, useEffect, useState } from "react";

import styles from "./Game.module.css";
import { GameHeader } from "../GameHeader/GameHeader";
import { GameContent } from "../GameContent/GameContent";
import type { ICells } from "../../../types";
import { CellState, CellValue, Emoji } from "../../../types";
import { generateCells, openMultipleCells } from "../../../utils/generateCells";
import { MAX_COLS, MAX_ROWS } from "../../../constants";

export const Game: FC = (): JSX.Element => {
  const [emoji, setEmoji] = useState<Emoji>(Emoji.smile);
  const [time, setTime] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [cells, setCells] = useState(generateCells());
  const [bombCounter, setBombCounter] = useState<number>(40);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    const currenCell = cells[rowParam][colParam];
    let newCells = cells.slice();
    if (!isLive) {
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells();
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }

      setIsLive(true);
    }
    const currentCell = newCells[rowParam][colParam];
    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }
    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
      setCells(newCells);
    }

    // Check to see if you have won
    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }
    if (!safeOpenCellsExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }
    setCells(newCells);
  };

  useEffect(() => {
    const handleMouseDown = (): void => {
      setEmoji(Emoji.click);
    };
    const handleMouseUp = () => {
      setEmoji(Emoji.smile);
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (isLive && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, isLive]);

  useEffect(() => {
    if (hasLost) {
      setIsLive(false);
      setEmoji(Emoji.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setIsLive(false);
      setEmoji(Emoji.won);
    }
  }, [hasWon]);

  const onEmojiClick = () => {
    setIsLive(false);
    setTime(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
  };

  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      e.preventDefault();

      if (!isLive) {
        return;
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];
      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.open) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setBombCounter((prev) => prev - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.open;
        setCells(currentCells);
        setBombCounter((prev) => prev + 1);
      }
    };

  const showAllBombs = (): ICells[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }
        return cell;
      })
    );
  };

  return (
    <div className={styles.game}>
      <GameHeader
        bombCounter={bombCounter}
        onEmojiClick={onEmojiClick}
        time={time}
        emoji={emoji}
      />
      <GameContent
        onContext={handleCellContext}
        cells={cells}
        handleCellClick={handleCellClick}
      />
    </div>
  );
};
