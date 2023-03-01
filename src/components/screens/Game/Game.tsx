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
  const [cells, setCells] = useState<ICells[][]>(generateCells());
  const [bombCounter, setBombCounter] = useState<number>(40);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();
    if (!isLive) {
      // Remove the first click on the mine
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
    if (
      [CellState.flagged, CellState.visible].includes(currentCell.state) ||
      [CellState.question, CellState.visible].includes(currentCell.state)
    ) {
      // Disable button click when flag or question state
      return;
    }

    // If the cell is mine
    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      // If the cell is empty, then open it
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      // Else show cell
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

  // Right counter
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

  // If you lost
  useEffect(() => {
    if (hasLost) {
      setIsLive(false);
      setEmoji(Emoji.lost);
    }
  }, [hasLost]);

  // If you won
  useEffect(() => {
    if (hasWon) {
      setIsLive(false);
      setEmoji(Emoji.won);
    }
  }, [hasWon]);

  const onEmojiClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.button === 0) {
      // Click on the emoji with the left mouse button
      setEmoji(Emoji.click);
      setIsLive(false);
      setTime(0);
      setCells(generateCells());
      setHasLost(false);
      setHasWon(false);
      setBombCounter(40);
    }
  };

  const handleEmojiUp = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.button === 0) {
      setEmoji(Emoji.smile);
    }
  };

  const handleEmojiDown = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.button === 0) {
      setEmoji(Emoji.click);
    }
  };

  // Click on cell with right mouse button
  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      e.preventDefault();

      if (!isLive) {
        // If we have not started the game, then we can not put a flag
        return;
      }

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];
      if (currentCell.state === CellState.visible) {
        // If you clicked on an visible cell
        return;
      } else if (currentCell.state === CellState.open) {
        // If you clicked on an default state cell
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setBombCounter((prev) => prev - 1);
      } else if (currentCell.state === CellState.flagged) {
        // If you clicked on an flagged state cell
        currentCells[rowParam][colParam].state = CellState.question;
        setCells(currentCells);
        setBombCounter((prev) => prev + 1);
      } else if (currentCell.state === CellState.question) {
        // If you clicked on an question state cell
        currentCells[rowParam][colParam].state = CellState.open;
        setCells(currentCells);
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
        onEmojiMouseUp={handleEmojiUp}
        bombCounter={bombCounter}
        onEmojiClick={onEmojiClick}
        time={time}
        emoji={emoji}
      />
      <GameContent
        onMouseDownEmoji={handleEmojiDown}
        onMouseUpEmoji={handleEmojiUp}
        hasWon={hasWon}
        hasLost={hasLost}
        onContext={handleCellContext}
        cells={cells}
        handleCellClick={handleCellClick}
      />
    </div>
  );
};
