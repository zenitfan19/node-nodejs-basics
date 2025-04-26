import { promisify } from "util";
import { pipeline, Transform } from "stream";

const transformPipeline = promisify(pipeline);

class ReverseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const reversedChunk =
      chunk.toString().split("").reverse().join("") + "\n\n";
    this.push(reversedChunk);
    callback();
  }
}

class PrefixTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push("\nReversed result: " + chunk);
    callback();
  }
}

const transform = async () => {
  const reverseTransform = new ReverseTransform();
  const resultPrefixTransform = new PrefixTransform();

  try {
    await transformPipeline(
      process.stdin,
      reverseTransform,
      resultPrefixTransform,
      process.stdout
    );
  } catch (err) {
    console.error(err);
  }
};

await transform();
