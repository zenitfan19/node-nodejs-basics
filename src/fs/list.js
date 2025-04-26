import { readdir } from "node:fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { FS_OPERATION_FAILED_ERROR } from "./constants.js";

const directory = join(dirname(fileURLToPath(import.meta.url)), "files");

const list = async () => {
  try {
    const files = await readdir(directory, { withFileTypes: true });
    const fileNames = files.map(({ name }) => name);
    console.log(fileNames);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(FS_OPERATION_FAILED_ERROR);
    }
  }
};

await list();
