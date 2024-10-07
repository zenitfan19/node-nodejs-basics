import { createWriteStream } from "node:fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { pipeline } from "stream";

const writePipeline = promisify(pipeline);

const write = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToWrite.txt"
  );
  const writeableStream = createWriteStream(filePath, { encoding: "utf8" });

  try {
    await writePipeline(process.stdin, writeableStream);
  } catch (err) {
    console.error(err);
  }
};

await write();
