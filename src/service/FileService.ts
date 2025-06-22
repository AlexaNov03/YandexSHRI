import { LocalStorageApi } from "../api/LocalStorageApi";
import type { NormalizedGenData } from "../models/GenData/GenData";

export const FileService = {
  decoder: new TextDecoder(),
  checkFileFormat: (file: File) => {
    return file.name.endsWith(".csv") || file.type === "text/csv";
  },

  processFileBatch: function (batch: Uint8Array<ArrayBufferLike>) {
    return JSON.parse(this.decoder.decode(batch, { stream: true }));
  },

  addProcessData({
    data,
    fileName,
    error = false,
  }: {
    data: NormalizedGenData;
    fileName: string;
    error?: boolean;
  }) {
    LocalStorageApi.addData({
      ...data,
      fileName,
      error,
      date: new Date().toLocaleDateString("ru-RU"),
      id: crypto.randomUUID(),
    });
  },
};
