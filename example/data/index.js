import bg from './bg.js';

import sun from './slides/sun.js';
import mercury from './slides/mercury.js';
import venus from './slides/venus.js';
import earth from './slides/earth.js';
import mars from './slides/mars.js';
import asteroidsMeteorids from './slides/asteroids-meteorids.js';
import jupiter from './slides/jupiter.js';
import saturn from './slides/saturn.js';
import uranus from './slides/uranus.js';
import neptune from './slides/neptune.js';
import pluto from './slides/pluto.js';

export default {
  width: 800,
  height: 600,
  contextWidth: 1600,
  contextHeight: 1200,
  devicePixelRatio: 1,
  background: bg,
  slides: [
    sun,
    mercury,
    venus,
    earth,
    mars,
    asteroidsMeteorids,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
  ]
}