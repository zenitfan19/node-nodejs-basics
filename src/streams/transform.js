import { promisify } from "util";
import { pipeline, Transform } from "stream";

const transformPipeline = promisify(pipeline);

class ReverseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().split("").reverse().join("");
    this.push(reversedChunk);
    callback();
  }
}

const transform = async () => {
  const reverseTransform = new ReverseTransform();

  try {
    await transformPipeline(process.stdin, reverseTransform, process.stdout);
  } catch (err) {
    console.error(err);
  }
};

await transform();
