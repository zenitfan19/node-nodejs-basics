import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const spawnChildProcess = async (args = []) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const childProcessPath = join(__dirname, "files", "script.js");

  const childProcess = spawn("node", [childProcessPath, ...args]);

  childProcess.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  process.stdin.on("data", (data) => {
    childProcess.stdin.write(data);
  });

  return new Promise((resolve) => {
    childProcess.on("close", (code) => {
      process.stdin.pause();
      resolve(code);
    });
  });
};

// Put your arguments in function call to test this functionality
const childProcessExitCode = await spawnChildProcess([
  "someArgument1",
  "someArgument2",
]);
console.log(`Child process exited with code: ${childProcessExitCode}`);
