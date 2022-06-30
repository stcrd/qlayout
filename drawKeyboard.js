import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import Canvas from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, 'images', filename);
const sourceImg = getFixturePath('ansi.svg');

const canvas = Canvas.createCanvas(1056, 395, 'svg');
const ctx = canvas.getContext('2d');

ctx.font = 'bold 24pt Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';

const coordinates = {
  '`': [60, 110],
  '1': [115, 110],
  '2': [170, 110],
  '3': [225, 110],
  '4': [280, 110],
  '5': [335, 110],
  '6': [390, 110],
  '7': [445, 110],
  '8': [500, 110],
  '9': [555, 110],
  '0': [610, 110],
  '-': [665, 110],
  '=': [720, 110],
  'q': [140, 165],
  'w': [195, 165],
  'e': [250, 165],
  'r': [305, 165],
  't': [360, 165],
  'y': [415, 165],
  'u': [470, 165],
  'i': [525, 165],
  'o': [580, 165],
  'p': [635, 165],
  '[': [690, 165],
  ']': [745, 165],
  '|': [820, 165],
  'a': [165, 220],
  's': [220, 220],
  'd': [275, 220],
  'f': [330, 220],
  'g': [385, 220],
  'h': [440, 220],
  'j': [495, 220],
  'k': [550, 220],
  'l': [605, 220],
  ';': [660, 220],
  "'": [715, 220],
  'z': [180, 275],
  'x': [235, 275],
  'c': [290, 275],
  'v': [345, 275],
  'b': [400, 275],
  'n': [455, 275],
  'm': [510, 275],
  ',': [565, 275],
  '.': [620, 275],
  '/': [675, 275],
};
const drawKeyboard = (input, effort) => {
  const letters = Object.keys(input);
  Canvas.loadImage(sourceImg)
    .then((image) => {
      const date = new Date().toString().substring(4, 21);
      const targetImg = getFixturePath(`optimized-${date}.svg`);
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = '#000';
      letters.map((el) => ctx.fillText(el, ...coordinates[input[el]]));
      ctx.font = 'italic 18pt Arial';
      ctx.fillText(`effort: ${effort}`, 400, 330);
      writeFileSync(targetImg, canvas.toBuffer());
    });
};
export default drawKeyboard;
