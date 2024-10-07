import { readdir } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const directory = join(dirname(fileURLToPath(import.meta.url)), "files");
const errorMessage = "FS operation failed";

const list = async () => {
  try {
    const files = await readdir(directory, { withFileTypes: true });
    const fileNames = files.map(({ name }) => name);
    console.log(fileNames);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(errorMessage);
    }
  }
};

await list();
