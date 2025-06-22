import React from "react";
import styles from "./HeaderButton.module.css";

export type HeaderButtonProps = {
  leftIcon?: React.ReactElement;
  children: React.ReactElement;
};

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  leftIcon,
  children,
}) => {
  return (
    <div className={styles.button__container}>
      <div className={styles.button__leftIcon}>{leftIcon}</div>
      <div className={styles.button__text}>{children}</div>
    </div>
  );
};
