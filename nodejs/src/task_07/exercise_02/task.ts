import { exec } from "child-process-promise";

const runCmd = (cmd: string, values: string[]) => {
  values.forEach((value) =>
    exec(`${cmd} ${value}`)
      .then((res) => console.log(res.stdout))
      .catch((err) => console.log(err))
  );
};

runCmd("node fac.js", ["1", "2", "3", "4", "5"]);
