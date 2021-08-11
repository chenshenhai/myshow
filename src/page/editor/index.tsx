import React from 'react';
import ReactDOM from 'react-dom';
// import Editor from './../../editor/index'
import './index.less';

console.log('React =====', React);
console.log('ReactDOM =====', ReactDOM);

ReactDOM.render(
  // <Editor
  //   editorWidth={window.innerWidth}
  //   editorHeight={window.innerHeight}
  //   contextWidth={1600}
  //   contextHeight={1200}
  // />,
  (<div>Hello World</div>),
  document.querySelector('#page'),
)


console.log('page editor!');