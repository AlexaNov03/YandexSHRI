import type React from "react";
import styles from "./Loader.module.css";

export type LoaderProps = {
  width: number;
  height: number;
};

export const Loader: React.FC<LoaderProps> = ({ width, height }) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={styles.loader}
    ></div>
  );
};
