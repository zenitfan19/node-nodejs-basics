import { createReadStream } from "node:fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { pipeline } from "stream";

const readPipeline = promisify(pipeline);

const read = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToRead.txt"
  );
  const readableStream = createReadStream(filePath, { encoding: "utf8" });

  readableStream.on("open", () => {
    console.log("Stream opened successfully.");
  });

  readableStream.on("end", () => {
    console.log("\nStream closed successfully.");
  });

  try {
    await readPipeline(readableStream, process.stdout);
  } catch (err) {
    console.error(err);
  }
};

await read();
