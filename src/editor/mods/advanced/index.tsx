import * as React from 'react';
import { FileImageOutlined } from '@ant-design/icons';
// import { IconSVG } from '../icon';

const advancedElements: {
  name: string,
  icon: React.ReactElement,
}[] = [
  {
    name: 'Image',
    icon: <FileImageOutlined />
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />
  },
];

export const Advanced = () => {
  return (
    <div className="myshow-editor-mod-advanced">
      <div className="editor-advanced-element-list">
        {advancedElements.map((elem, i) => {

          const { icon } = elem;

          return (
            <div className="editor-advanced-element-item" key={i}>
              {icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}
