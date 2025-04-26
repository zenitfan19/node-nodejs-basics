import { cpus } from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Worker } from "worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numberOfCPUs = cpus().length;
  const workerPath = join(__dirname, "worker.js");
  const workerPromises = [];

  console.log(`Number of CPUs: ${numberOfCPUs}`);

  for (let i = 0; i < numberOfCPUs; i++) {
    workerPromises.push(
      new Promise((resolve) => {
        const worker = new Worker(workerPath);
        const dataToSend = 10 + i;

        worker.on("message", (result) => {
          worker.terminate();

          if (result.error) {
            resolve({
              status: "error",
              data: null,
            });
          } else {
            resolve({
              status: "resolved",
              data: result,
            });
          }
        });

        worker.postMessage(dataToSend);
      })
    );
  }

  const resultsArray = await Promise.all(workerPromises);

  console.log(resultsArray);
};

await performCalculations();
