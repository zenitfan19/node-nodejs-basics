import { unlink } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { pipeline } from "stream";
import { createGzip } from 'zlib';

const compressPipeline = promisify(pipeline);

const compress = async () => {
    const filePath = join(
        dirname(fileURLToPath(import.meta.url)),
        "files",
        "fileToCompress.txt"
      );
      const compressedFilePath = join(
        dirname(fileURLToPath(import.meta.url)),
        "files",
        "archive.gz"
      );
    
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(compressedFilePath);

      const gzip = createGzip();
    
      try {
        await compressPipeline(readStream, gzip, writeStream);
        await unlink(filePath);
      } catch (err) {
        console.error(err);
      }
};

await compress();