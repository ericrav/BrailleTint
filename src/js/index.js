import ColorBlock from './ColorBlock';

const block1 = new ColorBlock({ color: { r: 219, g: 58, b: 27 } });
block1.getElement().appendTo('.palette');

const block2 = new ColorBlock({ color: { r: 254, g: 190, b: 18 } });
block2.getElement().appendTo('.palette');

const block3 = new ColorBlock({ color: { r: 68, g: 154, b: 136 } });
block3.getElement().appendTo('.palette');

const block4 = new ColorBlock({ color: { r: 44, g: 154, b: 183 } });
block4.getElement().appendTo('.palette');

const block5 = new ColorBlock({ color: { r: 238, g: 131, b: 110 } });
block5.getElement().appendTo('.palette');

const block6 = new ColorBlock({ color: { r: 93, g: 92, b: 93 } });
block6.getElement().appendTo('.palette');


// { r: 80, g: 81, b: 79 } });
// { r: 242, g: 95, b: 92 } });
// { r: 255, g: 224, b: 102 } });
// { r: 36, g: 123, b: 160 } });
// { r: 112, g: 193, b: 179 } });