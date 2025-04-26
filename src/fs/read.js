import { readFile } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const read = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToRead.txt"
  );

  try {
    const file = await readFile(filePath, "utf-8");
    console.log(file);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

await read();
