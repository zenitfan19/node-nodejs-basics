import { writeFile, access } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fresh.txt"
  );
  const fileContent = "I am fresh and young";
  const fileExistsError = "FS operation failed";

  try {
    await access(filePath);
    throw new Error(fileExistsError);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
    await writeFile(filePath, fileContent);
  }
};

await create();
