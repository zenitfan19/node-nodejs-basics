import { mkdir, copyFile, readdir } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const sourceDirectory = join(dirname(fileURLToPath(import.meta.url)), "files");
const destinationDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "files_copy"
);

const createDestinationFolder = async () => {
  try {
    await mkdir(destinationDirectory);
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

const copy = async () => {
  await createDestinationFolder();

  try {
    const files = await readdir(sourceDirectory, { withFileTypes: true });
    for (const file of files) {
      copyFile(
        join(sourceDirectory, file.name),
        join(destinationDirectory, file.name)
      );
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

await copy();
