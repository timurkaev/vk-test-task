import type { MouseEvent } from "react";
import React, { type FC } from "react";

import styles from "./GameHeader.module.css";

import { Numbers } from "../../ui/Numbers/Numbers";

interface IGameHeaderProps {
  emoji: string;
  time: number;
  onEmojiClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onEmojiMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
  bombCounter: number;
}

export const GameHeader: FC<IGameHeaderProps> = ({
  emoji,
  time,
  onEmojiClick,
  bombCounter,
  onEmojiMouseUp,
}): JSX.Element => {
  return (
    <header className={styles.header}>
      <Numbers value={bombCounter} />
      <button
        onMouseDown={onEmojiClick}
        onMouseUp={onEmojiMouseUp}
        className={styles.emoji}
      >
        <span>{emoji}</span>
      </button>
      <Numbers value={time} />
    </header>
  );
};
