export const getEnv = (name) => {
  let val = process.env["REACT_APP_" + name];
  if (!val) {
    console.error(`${name} env var not set`);
    process.exit(1);
  }
  return val;
};
