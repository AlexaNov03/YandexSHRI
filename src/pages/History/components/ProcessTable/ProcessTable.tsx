import useProcessStore from "../../../../store/ProcessStore";
import { useEffect } from "react";
import styles from "./ProcessTable.module.css";
import { Text } from "../../../../components/Text/Text";
export const ProcessTable = () => {
  const {
    processes,

    getInitialData,
  } = useProcessStore();

  useEffect(() => getInitialData(), [getInitialData]);

  return (
    <div>
      {processes.map((elem) => (
        <div className={styles.table__cell} key={elem.id}>
          <div>{elem.fileName}</div>
          <div>{elem.date}</div>
          <Text fontSize="1rem">Обработан успешно</Text>
          <Text fontSize="1rem">Не удалось обработать</Text>
        </div>
      ))}
    </div>
  );
};
