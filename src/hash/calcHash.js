import { createReadStream } from "node:fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { pipeline } from "stream";
import { createHash } from "crypto";

const hashPipeline = promisify(pipeline);

const calculateHash = async () => {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "files",
    "fileToCalculateHashFor.txt"
  );

  const fileStream = createReadStream(filePath);
  const hash = createHash("sha256");

  try {
    await hashPipeline(fileStream, hash);
    const hashDigest = hash.digest("hex");
    console.log(`SHA256 Hash: ${hashDigest}`);
  } catch (err) {
    console.error(err);
  }
};

await calculateHash();
