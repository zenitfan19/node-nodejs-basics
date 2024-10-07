import { unlink } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { pipeline } from "stream";
import { createGunzip } from 'zlib';

const decompressPipeline = promisify(pipeline);

const decompress = async () => {
    const filePath = join(
        dirname(fileURLToPath(import.meta.url)),
        "files",
        "archive.gz"
      );
      const decompressedFilePath = join(
        dirname(fileURLToPath(import.meta.url)),
        "files",
        "fileToCompress.txt"
      );
    
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(decompressedFilePath);

      const gunzip = createGunzip();
    
      try {
        await decompressPipeline(readStream, gunzip, writeStream);
        await unlink(filePath);
      } catch (err) {
        console.error(err);
      }
};

await decompress();