import $ from 'jquery';

export default class BrailleCell {

  // call constructor with function that receives cell value whenever updated
  constructor(props) {
    const self = this;
    this.element = $(element);
    this.updater = props.updater;
    this.value = props.value || 0;
    // add click listener to each dot in cell to toggle it on/off
    this.element.children('.braille__dot').click(function(e) {
      self.toggleDot($(e.target));
    });
    this.updateAllDots();
  }

  // update all dot elements to match current value
  updateAllDots() {
    // get bitstring from braille cell's current value
    let bitstring = this.value.toString(2);
    // pad with 0s so bitstring is length 6
    bitstring = Array(6 - bitstring.length + 1).join('0') + bitstring;
    // iterate over bits
    const bits = bitstring.split('');
    for (let i = 1; i <= bits.length; i++) {
      // go from bitstring index to braille dot number
      const bitNumber = i <= 3 ? (4 - i) : (10 - i);
      if (bits[i - 1] === '1') this.element.children('.braille__dot--' + bitNumber).addClass('braille__dot--active');
      else this.element.children('.braille__dot--' + bitNumber).removeClass('braille__dot--active');
    }
  }

  // turn dot on or off and update cell value
  toggleDot(dot) {
    $(dot).toggleClass('braille__dot--active');
    if ($(dot).hasClass('braille__dot--active')) {
      this.value += parseInt($(dot).data('place'), 8);
    } else {
      this.value -= parseInt($(dot).data('place'), 8);
    }

    this.update();
  }

  setBGLuminance(luminance) {
    if (luminance < 0.23) this.element.addClass('braille--light');
    else this.element.removeClass('braille--light');
  }

  update() {
    this.updater(this.value);
  }

  // get current numerical value represented by dots in NUMBRL system
  getValue() {
    return this.value;
  }

  getElement() {
    return this.element;
  }
}

// starting html string of braille cell element
const element = `<div class='braille'>
  <div data-place='10' class='braille__dot braille__dot--1'></div>
  <div data-place='20' class='braille__dot braille__dot--2'></div>
  <div data-place='40' class='braille__dot braille__dot--3'></div>
  <div data-place='1' class='braille__dot braille__dot--4'></div>
  <div data-place='2' class='braille__dot braille__dot--5'></div>
  <div data-place='4' class='braille__dot braille__dot--6'></div>
</div>`;