import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import { alphabet } from './model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const filePath = getFixturePath('analysis.json');

const areValidSymbols = (symbols) => symbols.split('').filter((el) => alphabet.includes(el)).length === symbols.length;

const countNgramStats = (text, ngramSize) => {
  // activate if percentages are needed
  // let totalNgramCount = 0;
  const ngramCounts = {};
  const limit = text.length - (ngramSize - 1);
  for (let i = 0; i < limit; i += 1) {
    const currentNgram = text.substring(i, i + ngramSize);
    if (areValidSymbols(currentNgram)) {
      ngramCounts[currentNgram] = ngramCounts[currentNgram] ? ngramCounts[currentNgram] + 1 : 1;
      // activate if percentages are needed
      // totalNgramCount += 1;
    }
  }
  const allNgrams = Object.keys(ngramCounts);
  const unsortedResult = allNgrams.reduce((acc, el) => {
    const value = ngramCounts[el];
    return [
      ...acc,
      { ngram: el, count: value },
    ];
  }, []);

  const compare = (a, b) => b.count - a.count;
  // sort and limit to first 1000 ngrams
  const rawResult = unsortedResult.sort(compare).slice(0, 1000);
  writeFileSync(filePath, JSON.stringify(rawResult));
  return rawResult;
};
export default countNgramStats;
