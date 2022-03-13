import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';
import countNgrams from './countNgrams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const filePath = getFixturePath('sample.txt');
const input = readFileSync(filePath, 'utf-8').toLowerCase();

const letterStats = countNgrams(input, 1).map(({ ngram, count }) => `${ngram}: ${count}`).join('\n');
const bigramStats = countNgrams(input, 2).map(({ ngram, count }) => `${ngram}: ${count}`).join('\n');
const trigramStats = countNgrams(input, 3).map(({ ngram, count }) => `${ngram}: ${count}`).join('\n');

writeFileSync('./results/letter-result.txt', letterStats);
writeFileSync('./results/bigram-result.txt', bigramStats);
writeFileSync('./results/trigram-result.txt', trigramStats);
