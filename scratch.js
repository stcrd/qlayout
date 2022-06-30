const findConvergentLayout = (optInputs) => {
  const remPositions = validPositions.split('');
  const initialAcc = alphabet.split('').reduce((acc, el) => ({ ...acc, [el]: {} }), {});
  const convergentLayout = Object.values(optInputs)
    .reduce((acc, input) => {
      const { bestLayout } = input;
      Object.keys(bestLayout).forEach((letter) => {
        const position = bestLayout[letter];
        const currentCount = acc[letter][position];
        acc[letter][position] = currentCount ? currentCount + 1 : 1;
      });
      return acc;
    }, initialAcc);
  const finalConvergentLayout = Object.entries(convergentLayout)
    .reduce((acc, el) => {
      const [letter, positions] = el;
      const sortedPositions = Object.entries(positions)
        .sort((a, b) => b[1] - a[1])
        .map((innerEl) => innerEl[0]);
      return { ...acc, [letter]: sortedPositions };
    }, {});
  const finalLayout = alphabetSortedByFreq.split('').reduce((acc, letter) => {
    const correctPosition = finalConvergentLayout[letter].find((el) => remPositions.includes(el))
    || remPositions[0];
    const index = remPositions.indexOf(correctPosition);
    remPositions.splice(index, 1);
    return { ...acc, [letter]: correctPosition };
  }, {});
  return finalLayout;
};
