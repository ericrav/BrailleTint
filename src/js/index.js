import $ from 'jquery';
import BrailleCell from './BrailleCell';


// get WCAG luminosity value
const getLuminance = (color) => {
  let r = sRGBvalue(color.r / 63);
  let g = sRGBvalue(color.g / 63);
  let b = sRGBvalue(color.b / 63);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const sRGBvalue = (c) => {
  if (c <= 0.03928) c = c / 12.92;
  else c = Math.pow(((c + 0.055) / 1.055), 2.4);
  return c;
};

const updater = (part) => {
  return ((value) => {
    currentColor[part] = value;
    setBG(currentColor);
  });
};

const setBG = (color) => {
  const L = getLuminance(color);
  console.log(L);
  rCell.setBGLuminance(L);
  gCell.setBGLuminance(L);
  bCell.setBGLuminance(L);
  const r = Math.floor((color.r / 63) * 255);
  const g = Math.floor((color.g / 63) * 255);
  const b = Math.floor((color.b / 63) * 255);
  $('body').css('background-color', `rgb(${r}, ${g}, ${b})`);
};

const currentColor = { r: 63, g: 63, b: 63 };

const rCell = new BrailleCell({ updater: updater('r'), value: currentColor.r });
rCell.getElement().appendTo('body');

const gCell = new BrailleCell({ updater: updater('g'), value: currentColor.g });
gCell.getElement().appendTo('body');

const bCell = new BrailleCell({ updater: updater('b'), value: currentColor.b });
bCell.getElement().appendTo('body');

setBG(currentColor);