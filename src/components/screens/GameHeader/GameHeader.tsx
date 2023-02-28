import React, { type FC } from "react";

import styles from "./GameHeader.module.css";

import { Emoji } from "../../../types";

interface IGameHeaderProps {
  emoji: string;
  time: number;
  onEmojiClick: () => void;
  bombCounter: number;
}

export const GameHeader: FC<IGameHeaderProps> = ({
  emoji,
  time,
  onEmojiClick,
  bombCounter,
}): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.counter}>
        {bombCounter.toString().padStart(3, "0")}
      </div>
      <button onClick={onEmojiClick} className={styles.emoji}>
        {emoji}
      </button>
      <div className={styles.counter}>{time.toString().padStart(3, "0")}</div>
    </header>
  );
};
