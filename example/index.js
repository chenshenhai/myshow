import layout from './data/layout.js';
import data from './data/data.js';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, time)
  })
}

async function main() {
  const { MyShow } = window.MyShow;
  const mount = document.querySelector('#app');
  const myshow = new MyShow(mount, {
    layout,
    devicePixelRatio: 4,
  });
  myshow.setData(data);
  myshow.start();
  
  // await myshow.playToSlide(1);
  // await delay(800);
  // await myshow.playToStart();
  // await myshow.play();
}

main();