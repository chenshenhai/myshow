import layout from './data/layout.js';
import data from './data/data.js';

const { MyShow } = window.MyShow;
const mount = document.querySelector('#app');
const myshow = new MyShow(mount, {
  layout,
  devicePixelRatio: 2,
});
myshow.setData(data);
myshow.start();