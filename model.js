// const currentOfficialLayout = {
//   'а': 'f', 'ә': '2', 'б': ',', 'в': 'd', 'г': 'u', 'ғ': '5',
//   'д': 'l', 'е': 't', 'ё': '1', 'ж': ';', 'з': 'p', 'и': 'b',
//   'й': 'q', 'к': 'r', 'қ': '0', 'л': 'k', 'м': 'v', 'н': 'y',
//   'ң': '4', 'о': 'j', 'ө': '-', 'п': 'g', 'р': 'h', 'с': 'c',
//   'т': 'n', 'у': 'e', 'ұ': '9', 'ү': '8', 'ф': 'a', 'х': '[',
//   'һ': '=', 'ц': 'w', 'ч': 'x', 'ш': 'i', 'щ': 'o', 'ъ': ']',
//   'ы': 's', 'і': '3', 'ь': 'm', 'э': "'", 'ю': '.', 'я': 'z',
// };

const alphabet = 'аәбвгғдеёжзийкқлмнңоөпрстуұүфхһцчшщъыіьэюя';
const alphabetSortedByFreq = 'аеынітрдлсқбкмопйжғңзшуұгөүәиявхьфцчюһэщъё';
const validPositions = "12345890-=qwertyuiop[]asdfghjkl;'zxcvbnm,.";

// bke = baseline key effort
// pr = row penalty
// pf = finger penalty
// hands: 1 = left; 2 = right
// rows: 1 = number row; 2 = top row; 3 = home row; 4 = bottom row
// fingers: 0 = left pinky; 1 = left ring; 2 = left middle; 3 = left first;
// fingers: 6 = left first; 7 = left middle; 8 = left ring; 9 = left pinky;
const baseFactors = {
  '`': {
    pr: 1.5, pf: 1.0, bke: 5.0, row: 1, hand: 1, finger: 0,
  },
  '1': {
    pr: 1.5, pf: 0.5, bke: 5.0, row: 1, hand: 1, finger: 1,
  },
  '2': {
    pr: 1.5, pf: 0.5, bke: 4.0, row: 1, hand: 1, finger: 1,
  },
  '3': {
    pr: 1.5, pf: 0.0, bke: 4.0, row: 1, hand: 1, finger: 2,
  },
  '4': {
    pr: 1.5, pf: 0.0, bke: 4.0, row: 1, hand: 1, finger: 3,
  },
  '5': {
    pr: 1.5, pf: 0.0, bke: 3.5, row: 1, hand: 1, finger: 3,
  },
  '6': {
    pr: 1.5, pf: 0.0, bke: 4.5, row: 1, hand: 1, finger: 3,
  },
  '7': {
    pr: 1.5, pf: 0.0, bke: 4.0, row: 1, hand: 2, finger: 6,
  },
  '8': {
    pr: 1.5, pf: 0.0, bke: 4.0, row: 1, hand: 2, finger: 7,
  },
  '9': {
    pr: 1.5, pf: 0.0, bke: 4.0, row: 1, hand: 2, finger: 7,
  },
  '0': {
    pr: 1.5, pf: 0.5, bke: 4.0, row: 1, hand: 2, finger: 8,
  },
  '-': {
    pr: 1.5, pf: 1.0, bke: 4.0, row: 1, hand: 2, finger: 9,
  },
  '=': {
    pr: 1.5, pf: 1.0, bke: 4.5, row: 1, hand: 2, finger: 9,
  },
  'q': {
    pr: 0.5, pf: 1.0, bke: 2.0, row: 2, hand: 1, finger: 0,
  },
  'w': {
    pr: 0.5, pf: 0.5, bke: 2.0, row: 2, hand: 1, finger: 1,
  },
  'e': {
    pr: 0.5, pf: 0.0, bke: 2.0, row: 2, hand: 1, finger: 2,
  },
  'r': {
    pr: 0.5, pf: 0.0, bke: 2.0, row: 2, hand: 1, finger: 3,
  },
  't': {
    pr: 0.5, pf: 0.0, bke: 2.5, row: 2, hand: 1, finger: 3,
  },
  'y': {
    pr: 0.5, pf: 0.0, bke: 3.0, row: 2, hand: 2, finger: 6,
  },
  'u': {
    pr: 0.5, pf: 0.0, bke: 2.0, row: 2, hand: 2, finger: 6,
  },
  'i': {
    pr: 0.5, pf: 0.0, bke: 2.0, row: 2, hand: 2, finger: 7,
  },
  'o': {
    pr: 0.5, pf: 0.5, bke: 2.0, row: 2, hand: 2, finger: 8,
  },
  'p': {
    pr: 0.5, pf: 1.0, bke: 2.0, row: 2, hand: 2, finger: 9,
  },
  '[': {
    pr: 0.5, pf: 1.0, bke: 2.5, row: 2, hand: 2, finger: 9,
  },
  ']': {
    pr: 0.5, pf: 1.0, bke: 4.0, row: 2, hand: 2, finger: 9,
  },
  '|': {
    pr: 0.5, pf: 1.0, bke: 6.0, row: 2, hand: 2, finger: 9,
  },
  'a': {
    pr: 0.0, pf: 1.0, bke: 0.0, row: 3, hand: 1, finger: 0,
  },
  's': {
    pr: 0.0, pf: 0.5, bke: 0.0, row: 3, hand: 1, finger: 1,
  },
  'd': {
    pr: 0.0, pf: 0.0, bke: 0.0, row: 3, hand: 1, finger: 2,
  },
  'f': {
    pr: 0.0, pf: 0.0, bke: 0.0, row: 3, hand: 1, finger: 3,
  },
  'g': {
    pr: 0.0, pf: 0.0, bke: 2.0, row: 3, hand: 1, finger: 3,
  },
  'h': {
    pr: 0.0, pf: 0.0, bke: 2.0, row: 3, hand: 2, finger: 6,
  },
  'j': {
    pr: 0.0, pf: 0.0, bke: 0.0, row: 3, hand: 2, finger: 6,
  },
  'k': {
    pr: 0.0, pf: 0.0, bke: 0.0, row: 3, hand: 2, finger: 7,
  },
  'l': {
    pr: 0.0, pf: 0.5, bke: 0.0, row: 3, hand: 2, finger: 8,
  },
  ';': {
    pr: 0.0, pf: 1.0, bke: 0.0, row: 3, hand: 2, finger: 9,
  },
  "'": {
    pr: 0.0, pf: 1.0, bke: 2.0, row: 3, hand: 2, finger: 9,
  },
  'z': {
    pr: 1.0, pf: 1.0, bke: 2.0, row: 4, hand: 1, finger: 0,
  },
  'x': {
    pr: 1.0, pf: 0.5, bke: 2.0, row: 4, hand: 1, finger: 1,
  },
  'c': {
    pr: 1.0, pf: 0.0, bke: 2.0, row: 4, hand: 1, finger: 2,
  },
  'v': {
    pr: 1.0, pf: 0.0, bke: 2.0, row: 4, hand: 1, finger: 3,
  },
  'b': {
    pr: 1.0, pf: 0.0, bke: 3.5, row: 4, hand: 1, finger: 3,
  },
  'n': {
    pr: 1.0, pf: 0.0, bke: 2.0, row: 4, hand: 2, finger: 6,
  },
  'm': {
    pr: 1.0, pf: 0.0, bke: 2.0, row: 4, hand: 2, finger: 6,
  },
  ',': {
    pr: 1.0, pf: 0.0, bke: 2.0, row: 4, hand: 2, finger: 7,
  },
  '.': {
    pr: 1.0, pf: 0.5, bke: 2.0, row: 4, hand: 2, finger: 8,
  },
  '/': {
    pr: 1.0, pf: 1.0, bke: 2.0, row: 4, hand: 2, finger: 9,
  },
};

// p0: initial probability
// t: initial 'temperature'
// k: cooling factor
// N: total number of steps
const optParams = {
  p0: 1, t: 10, k: 10, N: 10000, swappedPairs: 1,
};

// factors from model 01 (http://mkweb.bcgsc.ca/carpalx/?model_parameters)
const effortFactors = {
  k1: 1,
  k2: 0.367,
  k3: 0.235,
  kb: 0.3555,
  kp: 0.6423,
  ks: 0.4268,
};

// h = hand
// r = row
// f = finger
// w = weight
// w0 = baseline penalty
// p = penalty

// no baseline penalty
// const wh = 1;
// weights from model 01 (http://mkweb.bcgsc.ca/carpalx/?model_parameters)

// no hand penalty
// general formula: penalty = w0 + wh * ph + wr * pr + wf * pf
// since w0 = 0 and ph = 0, the formula can be shortened as below
// penalty = wr * pr + wf * pf;
const weightFactors = { wr: 1.3088, wf: 2.5948 };

export {
  alphabet,
  alphabetSortedByFreq,
  baseFactors,
  optParams,
  effortFactors,
  weightFactors,
  validPositions,
};
