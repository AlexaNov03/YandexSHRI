import React, { useCallback, useRef, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Text } from "../../../../components/Text/Text";
import { UploadArea } from "../UploadArea/UploadArea";
import { UploadButton } from "../../../../components/UploadButton/UploadButton";
import styles from "./UploadField.module.css";
import { DataTable } from "../DataTable/DataTable";
import { normalizeGenData } from "../../../../models/GenData/GenData";
import useFileStore from "../../../../store/FileStore";
import { FileService } from "../../../../service/FileService";
import { ExtFileApi } from "../../../../api/ExtFileApi";

export const UploadField = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [UploadAreaType, setUploadAreaType] = useState<
    "pending" | "default" | "error"
  >("pending");
  const [UploadButtonType, setUploadButtonType] = useState<
    "active" | "process" | "error" | "done" | "parsing"
  >("active");
  const [SendButtonColor, setSendButtonColor] = useState<
    "disabled" | "success"
  >("disabled");
  const [SendButtonState, setSendButtonState] = useState<"disabled" | "active">(
    "disabled"
  );
  const [TableVisibility, setTableVisibility] = useState(false);

  const changeState = useCallback((type: string) => {
    switch (type) {
      case "pending":
        setUploadAreaType("pending");
        setUploadButtonType("active");
        setSendButtonState("disabled");
        setSendButtonColor("disabled");
        setTableVisibility(false);

        break;
      case "uploaded":
        setUploadAreaType("default");
        setUploadButtonType("process");
        setTableVisibility(false);
        setSendButtonColor("success");
        setSendButtonState("active");
        break;
      case "error":
        setUploadAreaType("error");
        setUploadButtonType("error");
        setTableVisibility(false);
        setSendButtonColor("disabled");
        setSendButtonState("disabled");
        break;
      case "proceed":
        setUploadAreaType("default");
        setUploadButtonType("parsing");
        setTableVisibility(true);
        setSendButtonColor("disabled");
        setSendButtonState("disabled");
        break;
      case "done":
        setUploadAreaType("default");
        setUploadButtonType("done");
        setTableVisibility(true);
        setSendButtonColor("disabled");
        setSendButtonState("disabled");
    }
  }, []);

  const { fileName, file, proceedInfo, setFileName, setFile, setProceedInfo } =
    useFileStore();

  const triggerFileChange = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const triggerFileClose = useCallback(() => {
    changeState("pending");
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = "";
  }, [changeState]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        if (FileService.checkFileFormat(file)) {
          changeState("uploaded");
          setFile(file);
        } else {
          changeState("error");
        }
      }
    },
    [changeState, setFile, setFileName]
  );

  const handleSubmit = () => {
    changeState("proceed");
    const handleFileSubmit = async () => {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await ExtFileApi.aggregateRows(formData);
        const reader = await response.body?.getReader();
        while (reader && true) {
          const { done, value } = await reader.read();
          if (done) {
            changeState("done");
            FileService.addProcessData({
              data: proceedInfo,
              fileName: file.name,
            });
            break;
          }

          setProceedInfo(normalizeGenData(FileService.processFileBatch(value)));
        }
      } catch {
        changeState("error");
        FileService.addProcessData({
          data: proceedInfo,
          fileName: file.name,
          error: true,
        });
      }
    };
    handleFileSubmit();
  };

  return (
    <div className={styles.upload__container}>
      <Text className={styles.upload__title} fontSize="1rem">
        Загрузите csv файл и получите полную информацию о нем за сверхнизкое
        время
      </Text>

      <UploadArea type={UploadAreaType}>
        <UploadButton
          text={{
            active: "или перетащите сюда",
            process: "файл загружен!",
            parsing: "идет парсинг файла",
            done: "готово!",
            error: "упс, не то!",
          }}
          onClick={triggerFileChange}
          onClickClose={triggerFileClose}
          type={UploadButtonType}
        >
          {fileName}
        </UploadButton>
      </UploadArea>

      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className={styles.upload__input}
      />

      <div className={styles.upload__submitButton}>
        <Button
          {...(SendButtonState === "active" ? { onClick: handleSubmit } : {})}
          borderRadius="1rem"
          color={SendButtonColor}
        >
          <Text color="disabled" fontSize="1rem">
            Отправить
          </Text>
        </Button>
      </div>

      {TableVisibility && <DataTable {...proceedInfo} />}
      {!TableVisibility && (
        <Text className={styles.upload__sign} fontSize="1.5rem" color="accent">
          Здесь появятся хайлайты
        </Text>
      )}
    </div>
  );
};
