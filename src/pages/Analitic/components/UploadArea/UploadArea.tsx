import type React from "react";
import styles from "./UploadArea.module.css";
import classNames from "classnames";

export type UploadAreaProps = {
  type: "done" | "default" | "pending" | "error";
  children: React.ReactElement;
};

export const UploadArea: React.FC<UploadAreaProps> = ({ type, children }) => {
  return (
    <div className={classNames(styles.area__container, styles[`area-${type}`])}>
      {children}
    </div>
  );
};
