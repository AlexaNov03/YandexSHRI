import type { ProcessData } from "../models/ProcessData/ProcessData";

const FILE_STORAGE_KEY = "fileStorageKey";

export const LocalStorageApi = {
  getAllData(): ProcessData[] {
    const data = localStorage.getItem(FILE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  clearAllData(): void {
    localStorage.removeItem(FILE_STORAGE_KEY);
  },
  addData(data: ProcessData): void {
    const records = this.getAllData();
    records.push({
      ...data,
    });
    localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(records));
  },
};
