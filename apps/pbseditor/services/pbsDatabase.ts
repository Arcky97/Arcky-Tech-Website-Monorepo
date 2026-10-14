const DB_NAME = "PBS-Editor";
const DB_VERSION = 1;

export function openPBSDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("config")) {
        db.createObjectStore("config");
      }

      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects");
      }

      if (!db.objectStoreNames.contains("workspace")) {
        db.createObjectStore("workspace");
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      db.onversionchange = () => db.close();

      resolve(db);
    };

    request.onerror = () => {
      reject(
        request.error ??
          new Error("Failed to open PBS Editor database.")
      );
    };

    request.onblocked = () => {
      console.warn(
        "Database upgrade blocked. Close other PBS Editor tabs."
      );
    };
  });
}