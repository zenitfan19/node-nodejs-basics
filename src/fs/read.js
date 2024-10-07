import { readFile } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToRead.txt"
  );
  const fileNotExistsError = "FS operation failed";

  try {
    const file = await readFile(filePath, "utf-8");
    console.log(file);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(fileNotExistsError);
    }
  }
};

await read();
