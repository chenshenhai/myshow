import data from './data/index.js';

const { MyShow } = window.MyShow;
const mount = document.querySelector('#app');
const myshow = new MyShow(data, mount);
myshow.start();