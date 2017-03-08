import $ from 'jquery';
import createHistory from 'history/createBrowserHistory';
import ColorBlock from './ColorBlock';
import { defaultPalette } from './constants';

const history = createHistory();

let brailleRGBs = history.location.hash ? decodeURIComponent(history.location.hash).substring(1).split(',') : [];

const validBrailleColor = str => /^[\u2800-\u283f]{3}$/.test(str);

// unicode characters: '⠶⠱⠰,⠷⠞⠪,⠑⠴⠭,⠂⠴⠌,⠗⠄⠛,⠲⠲⠲'
// const defaultPalette = '\u2836\u2831\u2830\x2c\u2837\u281e\u282a\x2c\u2811\u2834\u282d\x2c\u2802\u2834\u280c\x2c\u2817\u2804\u281b\x2c\u2832\u2832\u2832'.split(',');

for (let i = 0; i < 6; i++) {
  if (brailleRGBs.length < (i + 1)) brailleRGBs.push(defaultPalette[i]);
  else if (!validBrailleColor(brailleRGBs[i])) brailleRGBs[i] = defaultPalette[i];
}

const onUpdate = () => {
  const hash = blocks.map(block => block.getUnicode()).join(',');
  history.replace({ pathname: '/', hash: hash });
};

const blocks = [];

for (let i = 0; i < 6; i++) {
  const block = new ColorBlock({ braille: brailleRGBs[i], update: onUpdate });
  block.getElement().appendTo('.palette');
  blocks.push(block);
}

setTimeout(() => {
  $('.footer').addClass('footer--active');
  $('.palette').addClass('palette--footer');
}, 18*1000);