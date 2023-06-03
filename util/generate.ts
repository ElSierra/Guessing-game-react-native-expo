export const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return;
  }
  return rndNum;
};
