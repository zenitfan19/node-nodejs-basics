import { rename as renameFile, access } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const filePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "files",
  "wrongFilename.txt"
);
const filePathToRename = join(
  dirname(fileURLToPath(import.meta.url)),
  "files",
  "properFilename.md"
);

const checkIfDestinationFileExists = async () => {
  try {
    await access(filePathToRename);
    throw new Error(FS_OPERATION_FAILED_ERROR);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

const rename = async () => {
  await checkIfDestinationFileExists();

  try {
    await renameFile(filePath, filePathToRename);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

await rename();
