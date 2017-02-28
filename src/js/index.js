import createHistory from 'history/createBrowserHistory';
import ColorBlock from './ColorBlock';

const history = createHistory();

let brailleRGBs = decodeURIComponent(history.location.hash).substring(1).split(',') || [];

const validBrailleColor = str => /^[\u2800-\u283f]{3}$/.test(str);

const defaultPalette = '⠶⠱⠰,⠷⠞⠪,⠑⠴⠭,⠂⠴⠌,⠗⠄⠛,⠲⠲⠲'.split(',');

for (let i = 0; i < 6; i++) {
  if (brailleRGBs.length < (i + 1)) brailleRGBs.push(defaultPalette[i]);
  else if (!validBrailleColor(brailleRGBs[i])) brailleRGBs[i] = defaultPalette[i];
}

const onUpdate = () => {
  let hash = '';
  hash += block1.getUnicode() + ',';
  hash += block2.getUnicode() + ',';
  hash += block3.getUnicode() + ',';
  hash += block4.getUnicode() + ',';
  hash += block5.getUnicode() + ',';
  hash += block6.getUnicode();
  history.replace({ pathname: '/', hash: hash });
};

const block1 = new ColorBlock({ braille: brailleRGBs[0], update: onUpdate });
block1.getElement().appendTo('.palette');

const block2 = new ColorBlock({ braille: brailleRGBs[1], update: onUpdate });
block2.getElement().appendTo('.palette');

const block3 = new ColorBlock({ braille: brailleRGBs[2], update: onUpdate });
block3.getElement().appendTo('.palette');

const block4 = new ColorBlock({ braille: brailleRGBs[3], update: onUpdate });
block4.getElement().appendTo('.palette');

const block5 = new ColorBlock({ braille: brailleRGBs[4], update: onUpdate });
block5.getElement().appendTo('.palette');

const block6 = new ColorBlock({ braille: brailleRGBs[5], update: onUpdate });
block6.getElement().appendTo('.palette');