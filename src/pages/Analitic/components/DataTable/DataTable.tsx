import type React from "react";
import { Text } from "../../../../components/Text/Text";
import styles from "./DataTable.module.css";

export type TableProps = {
  totalSpentGalactic: number;
  rowsAffected: number;
  lessSpentAt: number;
  bigSpentAt: number;
  lessSpentValue: number;
  bigSpentValue: number;
  averageSpentGalactic: number;
  bigSpentCiv: string;
  lessSpentCiv: string;
};

type CellProps = {
  value: number | string;
  children: string;
};

export const DataTableCell: React.FC<CellProps> = ({ value, children }) => {
  return (
    <div className={styles.table__cell}>
      <div className={styles.table__cellRow}>
        <Text fontSize="1rem">{String(value)}</Text>
      </div>
      <div className={styles.table__cellRow}>
        <Text fontSize="0.7rem">{children}</Text>
      </div>
    </div>
  );
};

export const DataTable: React.FC<TableProps> = (props) => {
  return (
    <div className={styles.table__container}>
      <DataTableCell value={props.totalSpentGalactic}>
        общие расходы в галактических кредитах
      </DataTableCell>
      <DataTableCell value={props.lessSpentCiv}>
        цивилизация с минимальными расходами
      </DataTableCell>
      <DataTableCell value={props.rowsAffected}>
        количество обработанных записей
      </DataTableCell>
      <DataTableCell value={props.lessSpentAt}>
        день года с минимальными расходами
      </DataTableCell>
      <DataTableCell value={props.bigSpentAt}>
        день года с максимальными расходами
      </DataTableCell>
      <DataTableCell value={props.bigSpentValue}>
        максимальная сумма расходов за день
      </DataTableCell>
      <DataTableCell value={props.bigSpentCiv}>
        цивилизация с максимальными расходами
      </DataTableCell>
      <DataTableCell value={props.averageSpentGalactic}>
        средние расходы в галактических кредитах
      </DataTableCell>
    </div>
  );
};
