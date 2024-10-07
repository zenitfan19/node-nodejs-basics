import { rename as renameFile, access } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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
const errorMessage = "FS operation failed";

const checkIfDestinationFileExists = async () => {
  try {
    await access(filePathToRename);
    throw new Error(errorMessage);
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
    console.log("err ", err);
    if (err.code === "ENOENT") {
      throw new Error(errorMessage);
    }
  }
};

await rename();
