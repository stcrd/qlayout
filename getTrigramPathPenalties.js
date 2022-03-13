import { baseFactors } from './model.js';

// hand factors
// 0: both used, not alternating
// 1: alternating
// 2: same
const calcHandFactor = (h1, h2, h3) => {
  const change = Math.abs(h2 - h1) + Math.abs(h3 - h2);
  if (change === 0) {
    return 2;
  }
  if (change === 1) {
    return 0;
  }
  return 1;
};

// the bigger the row jumps, the bigger the row factor
const calcRowFactor = (r1, r2, r3) => Math.abs(r2 - r1) + Math.abs(r3 - r2);

const calcFingerFactor = (fingers, keys) => {
  const [f1, f2, f3] = fingers;
  const [key1, key2, key3] = keys;
  const allFingersSame = f3 - f2 - f1 === 0;
  const allFingersDifferent = f1 !== f2 && f2 !== f3 && f1 !== f3;
  const monotonicProgression = (f1 <= f2 && f2 <= f3) || (f1 >= f2 && f2 >= f3);
  const allKeysDifferent = key1 !== key2 && key2 !== key3 && key1 !== key3;

  if (allFingersSame) {
    if (allKeysDifferent) {
      return 7;
    }
    return 5;
  }
  if (allFingersDifferent) {
    if (monotonicProgression) {
      return 0;
    }
    return 3;
  }
  if (allKeysDifferent) {
    if (monotonicProgression) {
      return 6;
    }
    return 4;
  }
  if (monotonicProgression) {
    return 1;
  }
  return 2;
};
const fh = 1;
const fr = 0.3;
const ff = 0.3;

const getTigramPathPenalties = (trigram, layout) => {
  const currentKeys = trigram.split('').map((letter) => layout[letter]);
  const baseFactorsOfKey = currentKeys.map((key) => baseFactors[key]);
  const hands = baseFactorsOfKey.map((el) => el.hand);
  const rows = baseFactorsOfKey.map((el) => el.row);
  const fingers = baseFactorsOfKey.map((el) => el.finger);
  const pr = calcRowFactor(...rows);
  const ph = calcHandFactor(...hands);
  const pf = calcFingerFactor(fingers, currentKeys);
  const strokePathPenalty = pr * fr + ph * fh + pf * ff;
  return strokePathPenalty;
};
export default getTigramPathPenalties;
