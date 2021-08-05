import bg from './bg.js';
import earth from './slides/earth.js';
import sun from './slides/sun.js';

export default {
  width: 800,
  height: 600,
  contextWidth: 2000,
  contextHeight: 1500,
  background: bg,
  slides: [
    sun,
    earth,
  ]
}