import * as React from 'react';
import { Layout, Collapse } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Selector } from '../selector';
import { Advanced } from '../advanced';
import eventHub from '../../util/event-hub';
import { generalDataList } from './data';

const { Panel } = Collapse;
const { Sider } = Layout;

type TypeProps = {
  width: number
}

export function SiderLeft(props: TypeProps) {

  return (
    <Sider width={props.width} className="myshow-editor-siderleft">
      <div className="myshow-editor-siderleft-header">
        <DoubleLeftOutlined
          className="editor-siderleft-header-icon  siderleft-close-btn"
          onClick={() => {
            eventHub.trigger('editorCloseLeftSider', true);
          }}
        />
      </div>
      <Collapse
        bordered={false} 
        defaultActiveKey={['general', 'advanced']}
        expandIconPosition={'right'}
        className="myshow-editor-siderleft-collapse"
      >
        <Panel header="General" key="general" className="myshow-editor-siderleft-panel">
          <Selector dataList={generalDataList} />
        </Panel>
        <Panel header="Advanced" key="advanced" className="myshow-editor-siderleft-panel" >
          <Advanced />
        </Panel>
      </Collapse>
    </Sider>
  )
}


export function SiderLeftBtn(props: { style?: React.HTMLAttributes<HTMLDivElement>['style'] }) {
  return (
    <div
      style={props.style}
      className="myshow-editor-siderleft-open-btn"
      onClick={() => {
        eventHub.trigger('editorCloseLeftSider', false);
      }}
    >
      <DoubleRightOutlined
        className="siderleft-open-btn-icon"
      />
    </div>
  )
}
 