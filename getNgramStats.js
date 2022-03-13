import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';
import countNgrams from './countNgrams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const corpusFilePath = getFixturePath('sample.txt');
const analysisFilePath = getFixturePath('analysis.json');

const input = readFileSync(corpusFilePath, 'utf-8').toLowerCase();
const getNgramStats = () => {
  if (existsSync(analysisFilePath)) {
    return JSON.parse(readFileSync(analysisFilePath));
  }
  return countNgrams(input, 3);
};

export default getNgramStats;
