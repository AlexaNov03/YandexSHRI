import type React from "react";
import styles from "./Text.module.css";
import classNames from "classnames";

export type TextProps = {
  tag?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "span";
  fontWeight?: number;
  fontSize: string;
  color?: "primary" | "secondary" | "danger" | "accent" | "disabled";
  children: string;
  className?: string;
};

export const Text: React.FC<TextProps> = ({
  tag = "div",
  fontWeight = 500,
  fontSize,
  color = "primary",
  children,
  className,
}) => {
  const Tag = tag;
  return (
    <Tag
      className={classNames(styles[`color-${color}`], className)}
      style={{ fontWeight, fontSize }}
    >
      {children}
    </Tag>
  );
};
