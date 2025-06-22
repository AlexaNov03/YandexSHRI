import { create } from "zustand";
import type { NormalizedGenData } from "../models/GenData/GenData";

interface FileStore {
  fileName: string;
  file: File | null;
  proceedInfo: NormalizedGenData;
  setFileName: (fileName: string) => void;
  setFile: (file: File | null) => void;
  setProceedInfo: (proceedInfo: NormalizedGenData) => void;
  reset: () => void;
}

const useFileStore = create<FileStore>((set) => ({
  fileName: "",
  file: null,
  proceedInfo: {
    totalSpentGalactic: 0,
    rowsAffected: 0,
    lessSpentAt: 0,
    bigSpentAt: 0,
    lessSpentValue: 0,
    bigSpentValue: 0,
    averageSpentGalactic: 0,
    bigSpentCiv: "none",
    lessSpentCiv: "none",
  },
  setFileName: (fileName) => set({ fileName }),
  setFile: (file) => set({ file }),
  setProceedInfo: (proceedInfo) =>
    set((state) => ({
      proceedInfo: { ...state.proceedInfo, ...proceedInfo },
    })),
  reset: () =>
    set({
      fileName: "",
      file: null,
      proceedInfo: {
        totalSpentGalactic: 0,
        rowsAffected: 0,
        lessSpentAt: 0,
        bigSpentAt: 0,
        lessSpentValue: 0,
        bigSpentValue: 0,
        averageSpentGalactic: 0,
        bigSpentCiv: "none",
        lessSpentCiv: "none",
      },
    }),
}));

export default useFileStore;
