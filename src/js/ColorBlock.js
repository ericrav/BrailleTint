import $ from 'jquery';
import BrailleCell from './BrailleCell';

export default class ColorBlock {

  constructor(props) {
    const self = this;
    this.element = $('<div class="color-block"><div class="color-block__braille"></div></div>');
    this.color = props.color ? this.rgb24to16(props.color) : { r: 0, g: 0, b: 0 };

    const getCellUpdater = (rgbPart) => {
      return ((value) => {
        self.color[rgbPart] = value;
        self.setBG(self.color);
      });
    };

    // create 3 braille cells for RGB
    this.rCell = new BrailleCell({ updater: getCellUpdater('r'), value: this.color.r });
    this.gCell = new BrailleCell({ updater: getCellUpdater('g'), value: this.color.g });
    this.bCell = new BrailleCell({ updater: getCellUpdater('b'), value: this.color.b });

    // add cells to element
    const brailleContainer = this.element.find('.color-block__braille');
    this.rCell.getElement().appendTo(brailleContainer);
    this.gCell.getElement().appendTo(brailleContainer);
    this.bCell.getElement().appendTo(brailleContainer);

    // set background to initial color
    this.setBG(this.color);
  }

  rgb24to16(rgb24) {
    return {
      r: Math.floor((rgb24.r / 255) * 63),
      g: Math.floor((rgb24.g / 255) * 63),
      b: Math.floor((rgb24.b / 255) * 63)
    };
  }

  setBG(color) {
    const L = getLuminance(color);
    this.rCell.setBGLuminance(L);
    this.gCell.setBGLuminance(L);
    this.bCell.setBGLuminance(L);
    const r = Math.floor((color.r / 63) * 255);
    const g = Math.floor((color.g / 63) * 255);
    const b = Math.floor((color.b / 63) * 255);
    this.element.css('background-color', `rgb(${r}, ${g}, ${b})`);
  }

  getElement() {
    return this.element;
  }
}
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