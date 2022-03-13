import { alphabet } from './model.js';

const generateInitialRandomLayout = () => {
  let keys = "12345890-=qwertyuiop[]asdfghjkl;'zxcvbnm,.";
  let lng = keys.length;
  const getNextKey = () => {
    const index = Math.floor(Math.random() * lng);
    const key = keys[index];
    keys = keys.replace(key, '');
    lng = keys.length;
    return key;
  };

  return alphabet
    .split('').reduce((acc, letter) => ({ ...acc, [letter]: getNextKey() }), {});
};
export default generateInitialRandomLayout;
