import React, { type FC } from "react";
import styles from "./Numbers.module.css";
import type { INumbersProps } from "./Numbers.props";

export const Numbers: FC<INumbersProps> = ({ value }): JSX.Element => {
  return (
    <div className={styles.number}>{value.toString().padStart(3, "0")}</div>
  );
};
