import { create } from "zustand";
import type { ProcessData } from "../models/ProcessData/ProcessData";
import { LocalStorageApi } from "../api/LocalStorageApi";

interface ProcessStore {
  processes: ProcessData[];
  addProcess: (data: ProcessData) => void;
  removeProcess: (id: string) => void;
  clearAll: () => void;
  getProcessById: (id: string) => ProcessData | undefined;
  getInitialData: () => void;
}

const useProcessStore = create<ProcessStore>((set, get) => ({
  processes: [],

  getInitialData: function () {
    set({ processes: LocalStorageApi.getAllData() });
  },
  addProcess: (data) =>
    set((state) => ({
      processes: [
        ...state.processes,
        {
          ...data,
        },
      ],
    })),

  removeProcess: (id) =>
    set((state) => ({
      processes: state.processes.filter((process) => process.id !== id),
    })),

  clearAll: () => set({ processes: [] }),

  getProcessById: (id) => get().processes.find((p) => p.id === id),
}));

export default useProcessStore;
