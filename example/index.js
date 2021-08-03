import data from './data.js';

const { MyShow } = window.MyShow;
const mount = document.querySelector('#app');
const myshow = new MyShow(data, mount);
myshow.start();