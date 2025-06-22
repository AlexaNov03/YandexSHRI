import type React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type ButtonProps = {
  color:
    | "primary"
    | "secondary"
    | "download"
    | "success"
    | "danger"
    | "disabled"
    | "accent"
    | "done";
  children: React.ReactElement;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export const Button: React.FC<ButtonProps> = ({
  color,
  children,
  borderRadius = "0px",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ borderRadius }}
      className={classNames(styles.button__container, styles[`color-${color}`])}
    >
      {children}
    </button>
  );
};
