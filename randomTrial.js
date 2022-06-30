import { writeFileSync } from 'fs';
import _ from 'lodash';
import findOptimalLayout from './findOptimalLayout.js';
import genInitRandomLayout from './generateInitialRandomLayout.js';
import getNgramStats from './getNgramStats.js';
import drawKeyboard from './drawKeyboard.js';
import { alphabet, alphabetSortedByFreq, validPositions } from './model.js';
import calcLayoutEffort from './calcLayoutEffort.js';

const trigramStats = getNgramStats();
const numOfTrials = 10;
const results = {};

for (let i = 1; i <= numOfTrials; i += 1) {
  results[i] = findOptimalLayout(genInitRandomLayout(), trigramStats);
}

const findMostFrequentLayout = (allResults) => {
  const found = {};
  const keys = Object.keys(allResults);
  const { length } = keys;
  for (let j = 1; j < length; j += 1) {
    const current = allResults[j.toString()];
    let count = 1;
    for (let k = j + 1; k < length; k += 1) {
      if (_.isEqual(allResults[k.toString()], current)) {
        count += 1;
      }
    }
    if (count > 1) {
      found[j.toString()] = count;
    }
  }
  console.log(allResults);
  return found;
};

findMostFrequentLayout(results);
// writeFileSync('./__fixtures__/results.json', JSON.stringify(results));
// const compare = (a, b) => a.bestEffort - b.bestEffort;
// sort and limit to first 1000 ngrams
// const rawResult = Object.values(results).sort(compare).slice(0, 1);
// const [{ bestLayout, bestEffort }] = rawResult;
// console.log(bestLayout);
// drawKeyboard(bestLayout, bestEffort);
// const convergentLayout = findConvergentLayout(results);
// const convergentEffort = calcLayoutEffort(convergentLayout, trigramStats);
// drawKeyboard(convergentLayout, convergentEffort);
