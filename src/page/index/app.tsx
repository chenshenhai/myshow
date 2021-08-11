import React, { useRef, useEffect } from 'react';
import MyShow from './../../myshow/index';
import layout from './data/layout';
import data from './data/data';

console.log('MyShow =====', MyShow);

function App() {
  const ref = useRef(null);

  useEffect(() => {
    const mount = ref.current;
    const myshow = new MyShow(mount, {
      layout,
      devicePixelRatio: 4,
    });
    myshow.setData(data);
    myshow.start();
  }, []);

  return (<div className="app" ref={ref}></div>)
}

export default App;