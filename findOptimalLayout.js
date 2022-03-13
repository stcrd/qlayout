import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

import generateNewLayout from './generateNewLayout.js';
import calcLayoutEffort from './calcLayoutEffort.js';
import { optParams } from './model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const allEfforts = [];

const findOptimalLayout = (startingLayout, trigramStats) => {
  let bestLayout = startingLayout;
  let bestEffort = calcLayoutEffort(bestLayout, trigramStats);
  allEfforts.push(bestEffort);
  let prevEffort = bestEffort;
  let prevLayout = startingLayout;
  const {
    p0, t, k, N, swappedPairs,
  } = optParams;
  let t0 = t;
  for (let i = 0; i < N; i += 1) {
    const newLayout = generateNewLayout(prevLayout, swappedPairs);
    const newEffort = calcLayoutEffort(newLayout, trigramStats);
    allEfforts.push(newEffort);
    const dE = newEffort - prevEffort;
    const ti = t0 * Math.exp((-i * k) / N);
    const pi = p0 * Math.exp(-dE / ti);
    t0 = ti;

    const r = Math.random();
    if (r < pi) {
      if (newEffort < bestEffort) {
        bestLayout = newLayout;
        bestEffort = newEffort;
      }
      prevLayout = newLayout;
      prevEffort = newEffort;
    }
  }
  bestEffort = Math.round(bestEffort * 1000) / 1000;
  writeFileSync(getFixturePath('efforts.txt'), allEfforts.join('\n'));
  return { bestLayout, bestEffort };
};
export default findOptimalLayout;
