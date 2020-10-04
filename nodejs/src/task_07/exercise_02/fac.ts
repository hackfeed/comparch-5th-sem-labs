const getFactorial = (n: number): void => {
  let prod = 1;

  for (let i = 2; i <= n; ++i) {
    prod *= i;
  }
  console.log(prod);
};

getFactorial(+process.argv[2]);
