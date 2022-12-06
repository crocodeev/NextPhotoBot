import CyrillicToTranslit from 'cyrillic-to-translit-js';
const cyrillicToTranslit = new CyrillicToTranslit();

const str = cyrillicToTranslit.transform('start русский', '_').toLowerCase();

console.log(str);