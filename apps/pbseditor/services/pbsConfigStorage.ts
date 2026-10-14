import type { PBSConfig } from "@/types/pbsConfig";
import { openPBSDatabase } from "./pbsDatabase";

async function writeConfigToDB(config: PBSConfig ): Promise<void> {
  const db = await openPBSDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("config", "readwrite");
    const store = transaction.objectStore("config");

    store.put(structuredClone(config), "main");

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Config save failed"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Config save aborted"));
  });
}

let writeQueue: Promise<void> = Promise.resolve();

export function savePBSConfig(config: PBSConfig): Promise<void> {
  const snapshot = structuredClone(config);

  const write = writeQueue.then(() => writeConfigToDB(snapshot));

  writeQueue = write.catch(() => undefined);

  return write;
}

export async function loadPBSConfig(): Promise<PBSConfig | null> {
  const db = await openPBSDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("config", "readonly");
    const request = transaction.objectStore("config").get("main");

    request.onsuccess = () => {
      resolve(request.result ?? null);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Config load failed."));
    };
  });
}