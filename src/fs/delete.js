import { unlink } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToremove.txt"
  );
  const fileNotExistsError = "FS operation failed";

  try {
    await unlink(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(fileNotExistsError);
    }
  }
};

await remove();
