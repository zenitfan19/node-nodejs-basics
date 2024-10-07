const parseArgs = () => {
  const prefix = "--";
  const cliArguments = process.argv
    .slice(2)
    .map((argument) => argument.replace(prefix, ""));
  const argumentPairs = [];

  for (let i = 0; i < cliArguments.length; i += 2) {
    argumentPairs.push(cliArguments.slice(i, i + 2));
  }

  const result = argumentPairs.map((pair) => `${pair[0]} is ${pair[1]}`);

  console.log(result.join(", "));
};

parseArgs();
