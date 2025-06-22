export type GenData = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
};

export type NormalizedGenData = {
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

export const normalizeGenData = (data: GenData): NormalizedGenData => {
  return {
    totalSpentGalactic: data.total_spend_galactic,
    rowsAffected: data.rows_affected,
    lessSpentAt: data.less_spent_at,
    bigSpentAt: data.big_spent_at,
    lessSpentValue: data.less_spent_value,
    bigSpentValue: data.big_spent_value,
    averageSpentGalactic: data.average_spend_galactic,
    bigSpentCiv: data.big_spent_civ,
    lessSpentCiv: data.less_spent_civ,
  };
};
