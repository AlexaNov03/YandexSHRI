import type React from "react";
import { Button } from "../Button/Button";
import { CloseIcon } from "./components/CloseIcon/CloseIcon";
import { Text } from "../Text/Text";
import styles from "./UploadButton.module.css";
import { Loader } from "./components/Loader/Loader";

export type UploadButtonText = {
  active: string;
  process: string;
  parsing: string;
  done: string;
  error: string;
};

export type UploadButtonProps = {
  type: "active" | "process" | "parsing" | "done" | "error";
  text: UploadButtonText;
  children?: string;
  onClick?: (e: React.MouseEvent) => void;
  onClickClose?: (e: React.MouseEvent) => void;
};

export const UploadButton: React.FC<UploadButtonProps> = ({
  type,
  children = "",
  onClick,
  onClickClose,
  text,
}) => {
  let buttonColor: "accent" | "done" | "secondary" | "danger";
  let signColor: "primary" | "danger" = "primary";
  let needCloseButton = false;
  let signContent;
  let buttonContent = (
    <Text color="primary" fontSize="1rem">
      {children}
    </Text>
  );
  switch (type) {
    case "active":
      buttonColor = "secondary";
      buttonContent = <Text fontSize="1rem">Загрузить файл</Text>;
      signContent = text.active;
      break;
    case "process":
      buttonColor = "accent";
      signContent = text.process;
      needCloseButton = true;
      break;
    case "parsing":
      buttonColor = "accent";
      buttonContent = <Loader width={30} height={30} />;
      signContent = text.parsing;
      break;
    case "done":
      buttonColor = "done";
      signContent = text.done;
      needCloseButton = true;
      break;
    case "error":
      buttonColor = "danger";
      buttonContent = (
        <Text color="secondary" fontSize="1rem">
          {children}
        </Text>
      );
      signColor = "danger";
      needCloseButton = true;
      signContent = text.error;
  }
  return (
    <div className={styles.uploadButton__container}>
      <div className={styles.uploadButton__content}>
        <Button onClick={onClick} borderRadius="10px" color={buttonColor}>
          {buttonContent}
        </Button>
        {needCloseButton && (
          <Button onClick={onClickClose} borderRadius="10px" color="primary">
            <CloseIcon width={24} height={24} />
          </Button>
        )}
      </div>
      <Text
        className={styles.uploadButton__sign}
        fontSize="1rem"
        color={signColor}
      >
        {signContent}
      </Text>
    </div>
  );
};
