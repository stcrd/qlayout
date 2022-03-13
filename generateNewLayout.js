import { alphabet } from './model.js';

// takes previous mapping of { Kz: En, ... } letters and swaps two keys a number of times
const generateNewLayout = (prevLayout, numberOfSwappedPairs) => {
  const lng = alphabet.length;
  let newLayout = { ...prevLayout };
  let swapped = [];
  for (let i = 0; i < numberOfSwappedPairs; i += 1) {
    const index1 = Math.floor(Math.random() * lng);
    const index2 = Math.floor(Math.random() * lng);
    if (!swapped.includes(index1) && !swapped.includes(index2)) {
      swapped = [...swapped, index1, index2];
      const key1 = alphabet[index1];
      const key2 = alphabet[index2];
      newLayout = { ...newLayout, [key1]: prevLayout[key2], [key2]: prevLayout[key1] };
    }
  }
  return newLayout;
};
export default generateNewLayout;
