import * as React from 'react';
import { Layout } from 'antd';

const { Footer, } = Layout;

type TypeProps = {
  height: number;
}

export function EditorFooter(props: TypeProps) {

  return (
    <Footer className="myshow-editor-footer" style={{height: props.height}}>
      {/* footer */}
    </Footer>
  )
}

 