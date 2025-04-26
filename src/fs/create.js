import { writeFile, access } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const create = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fresh.txt"
  );
  const fileContent = "I am fresh and young";

  try {
    await access(filePath);
    throw new Error(FS_OPERATION_FAILED_ERROR);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
    await writeFile(filePath, fileContent);
  }
};

await create();
