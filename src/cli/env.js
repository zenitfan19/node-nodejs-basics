const parseEnv = () => {
  const prefix = "RSS_";
  const envVariables = process.env;

  const filteredVariables = Object.keys(envVariables)
    .filter((key) => key.startsWith(prefix))
    .map((key) => `${key}=${envVariables[key]}`);

  console.log(filteredVariables.join("; "));
};

parseEnv();
