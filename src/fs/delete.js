import { unlink } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const remove = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToremove.txt"
  );

  try {
    await unlink(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

await remove();
