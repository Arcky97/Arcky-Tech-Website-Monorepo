import { openPBSDatabase } from "./pbsDatabase";
import { DetectedPBSPlugins, validatePBSProjectFolder } from "./pbsProjectValidation";

const PROJECT_STORE = "projects";
const PROJECT_KEY = "activeProjectDirectory";

export interface SelectedPBSProject {
  handle: FileSystemDirectoryHandle;
  plugins: DetectedPBSPlugins;
}

export async function selectProjectFolder(): Promise<SelectedPBSProject> {
  if (!window.isSecureContext) {
    throw new Error(
      "Folder access requires a secure context (HTTPS or localhost)."
    );
  }

  if (!("showDirectoryPicker" in window)) {
    throw new Error(
      "Folder access is not supported in this browser."
    );
  }

  const handle = await window.showDirectoryPicker({
    mode: "readwrite",
  });

  const hasPermission = await requestFolderPermission(handle);

  if (!hasPermission) {
    throw new Error(
      "Read and write permission is required to access this project."
    );
  }

  const PBSProject = await validatePBSProjectFolder(handle);

  await saveDirectoryHandle(handle);

  return { handle, plugins: PBSProject.plugins };
}

async function saveDirectoryHandle(
  handle: FileSystemDirectoryHandle
): Promise<void> {
  const db = await openPBSDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(PROJECT_STORE, "readwrite");

    transaction.objectStore(PROJECT_STORE).put(
      handle,
      PROJECT_KEY
    );

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => 
      reject(transaction.error ?? new Error("Failed to save folder."));
    transaction.onabort = () => 
      reject(transaction.error ?? new Error("Folder save aborted."));
  });
}

export async function getProjectFolder(): Promise<FileSystemDirectoryHandle | null> {
  const db = await openPBSDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PROJECT_STORE, "readonly");
    const request = transaction
      .objectStore(PROJECT_STORE)
      .get(PROJECT_KEY);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to load folder."));
  });
}

export async function requestFolderPermission(
  handle: FileSystemDirectoryHandle
): Promise<boolean> {
  const options = { mode: "readwrite" as const };

  if (await handle.queryPermission(options) === "granted") {
    return true;
  }

  return (
    await handle.requestPermission(options)
  ) === "granted";
}