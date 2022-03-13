import { baseFactors, effortFactors, weightFactors } from './model.js';
import getTigramPathPenalties from './getTrigramPathPenalties.js';

// b = base
// p = penalty
// s = stroke path effort
// TE = typing effort

const {
  k1,
  k2,
  k3,
  kb,
  kp,
  ks,
} = effortFactors;
const {
  wr,
  wf,
} = weightFactors;

const calcTrigramTypingEffort = (trigram, layout) => {
  // get base efforts for each letter in a trigram
  const [b1, b2, b3] = trigram.split('').map((letter) => baseFactors[layout[letter]].bke);
  // get penalties for each letter in a trigram
  const [p1, p2, p3] = trigram.split('').map((letter) => {
    const { pr, pf } = baseFactors[layout[letter]];
    const penalty = wr * pr + wf * pf;
    return penalty;
  });

  const base = k1 * b1 * (1 + k2 * b2 * (1 + k3 * b3));
  const penalty = k1 * p1 * (1 + k2 * p2 * (1 + k3 * p3));

  // stroke path calculation: f - factors, p - penalties
  const strokePath = getTigramPathPenalties(trigram, layout);
  const result = kb * base + kp * penalty + ks + strokePath;
  return result;
};

const calcLayoutEffort = (layout, trigramStats) => {
  let result = 0;
  let totalNumberOfTrigrams = 0;
  const lng = trigramStats.length;
  for (let i = 0; i < lng; i += 1) {
    const { ngram: trigram, count: n } = trigramStats[i];
    totalNumberOfTrigrams += n;
    const trigramTE = calcTrigramTypingEffort(trigram, layout);
    result += trigramTE * n;
  }
  return result / totalNumberOfTrigrams;
};
export default calcLayoutEffort;
