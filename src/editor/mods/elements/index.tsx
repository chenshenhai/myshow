import * as React from 'react';
import { List } from 'antd';
import { EditorContext } from '../../context';
import { Item } from './item';

const { useContext } = React;

type TypeProps = {
  maxHeight?: number
}

export const Elements = (props: TypeProps) => {

  const context = useContext(EditorContext);
  const { data } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight !== undefined && props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }


  return (
    <div className="myshow-editor-mod-element" style={style}>
      <List
        size="small"
        dataSource={data.elements}
        renderItem={(item) => {
          return (
            <List.Item>
              <Item element={item} />
            </List.Item>
          )
        }}
      />
    </div>
  )
}
 