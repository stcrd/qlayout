import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import getNgramCount from '../countNgrams.js';
// import customSort from '../customSort.js';
// import calcTextTE from '../calcTextTypingEffort.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('book txt - 10 most frequent trigrams', () => {
  const expected = [
    { count: 15761, ngram: 'ған' },
    { count: 14026, ngram: 'бай' },
    { count: 11061, ngram: 'нда' },
    { count: 10084, ngram: 'мен' },
    { count: 9731, ngram: 'ген' },
    { count: 9329, ngram: 'бол' },
    { count: 9277, ngram: 'ара' },
    { count: 9192, ngram: 'ала' },
    { count: 8720, ngram: 'ына' },
    { count: 8701, ngram: 'аба' },
  ];
  const filePath = getFixturePath('sample.txt');
  const input = readFileSync(filePath, 'utf-8').toLowerCase();
  const result = getNgramCount(input, 3);
  // writeFileSync('./results/trigram-result.txt', result);
  expect(result).toEqual(expected);
});

// test('single trigram', () => {
//     const input = [
//         {'ngram': 'ған', 'count': 15761},
//         {'ngram': 'бай', 'count': 14026},
//         {'ngram': 'нда', 'count': 11061},
//         {'ngram': 'мен', 'count': 10084},
//         {'ngram': 'ген', 'count': 9731},
//         {'ngram': 'бол', 'count': 9329},
//         {'ngram': 'ара', 'count': 9277},
//         {'ngram': 'ала', 'count': 9192},
//         {'ngram': 'ына', 'count': 8720},
//         {'ngram': 'аба', 'count': 8701},
//     ]
//     const expected = 1;
//     expect(calcTextTE(input)).toEqual(expected);
// });
