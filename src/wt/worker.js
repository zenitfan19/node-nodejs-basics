import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
  parentPort.postMessage(result);
};

parentPort.on("message", (n) => {
  try {
    const result = nthFibonacci(n);
    sendResult(result);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
});
