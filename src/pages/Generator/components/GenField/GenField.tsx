import { UploadButton } from "../../../../components/UploadButton/UploadButton";
import { Text } from "../../../../components/Text/Text";

import styles from "./GenField.module.css";
import { useCallback, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { ExtFileApi } from "../../../../api/ExtFileApi";

export const GenField = () => {
  const [needUploadButton, setNeedUploadButton] = useState(false);
  const [needSubmitButton, setNeedSubmitButton] = useState(true);
  const [UploadButtonType, setUploadButtonType] = useState<
    "active" | "process" | "error" | "done" | "parsing"
  >("active");
  const [UploadButtonChild, setUploadButtonChild] = useState("");

  const changeState = useCallback((type: string) => {
    switch (type) {
      case "pending":
        setNeedUploadButton(false);
        setNeedSubmitButton(true);
        break;
      case "error":
        setNeedUploadButton(true);
        setNeedSubmitButton(false);
        setUploadButtonType("error");
        setUploadButtonChild("Ошибка");
        break;
      case "proceed":
        setNeedUploadButton(true);
        setNeedSubmitButton(false);
        setUploadButtonType("parsing");
        break;
      case "done":
        setNeedUploadButton(true);
        setNeedSubmitButton(false);
        setUploadButtonType("done");
        setUploadButtonChild("Done!");
    }
  }, []);

  const triggerFileClose = useCallback(() => {
    changeState("pending");
  }, [changeState]);

  const handleSubmit = () => {
    changeState("proceed");
    const generateReport = async () => {
      try {
        const response = await ExtFileApi.generateFile();

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `new_report_${(Math.random() * 10_000).toFixed(0)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        changeState("done");
      } catch {
        changeState("error");
      }
    };
    generateReport();
  };

  return (
    <div className={styles.gen__container}>
      <div className={styles.gen__title}>
        <Text fontSize="1rem">
          Сгенерируйте готовый csv файл нажатием одной кнопки
        </Text>
      </div>
      <div className={styles.gen__logic}>
        {needSubmitButton && (
          <Button onClick={handleSubmit} borderRadius="10px" color="success">
            <Text fontSize="1rem" color="primary">
              Начать генерацию
            </Text>
          </Button>
        )}
        {needUploadButton && (
          <UploadButton
            text={{
              active: "или перетащите сюда",
              process: "файл сгенерирован!",
              parsing: "идет процесс генерации",
              done: "готово!",
              error: "упс, не то!",
            }}
            onClickClose={triggerFileClose}
            type={UploadButtonType}
          >
            {UploadButtonChild}
          </UploadButton>
        )}
      </div>
      ;
    </div>
  );
};
