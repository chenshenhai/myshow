import * as React from 'react';
import { useState, useCallback } from 'react';
import { Layout, Select } from 'antd';
import classnames from 'classnames';
import {
  ZoomInOutlined, ZoomOutOutlined, UndoOutlined, RedoOutlined,
} from '@ant-design/icons';
import eventHub from '../../util/event-hub';

const { Header, } = Layout;

type TypeProps = {
  height: number;
}

const zoomData = [
  {label: '25%', value: 0.25},
  {label: '50%', value: 0.5},
  {label: '75%', value: 0.75},
  {label: '100%', value: 1},
  {label: '125%', value: 1.25},
  {label: '150%', value: 1.5},
  {label: '200%', value: 2},
  {label: '300%', value: 3},
  {label: '400%', value: 4},
]

function getZoomInValue(value: any): number | null {
  let val: number | null = null;
  for (let i = 0; i < zoomData.length; i++) {
    const item = zoomData[i];
    if (item.value === value) {
      if (zoomData[i + 1]) {
        val = zoomData[i + 1].value
      }
      break;
    }
  }
  return val;
}

function getZoomOutValue(value: any): number | null {
  let val: number | null = null;
  for (let i = 0; i < zoomData.length; i++) {
    const item = zoomData[i];
    if (item.value === value) {
      if (zoomData[i - 1]) {
        val = zoomData[i - 1].value
      }
      break;
    }
  }
  return val;
}

export function StudioHeader(props: TypeProps) {

  const [scale, setScale] = useState<number>(1);
  const [ableUndo, setAbleUndo] = useState<boolean>(true);
  const [ableRedo, setAbleRedo] = useState<boolean>(true);

  const onChangeScale = useCallback((num) => {
    setScale(num);
    eventHub.trigger('editorScaleScreen', num);
  }, [scale]);

  const onClickZoomIn = useCallback(() => {
    const num = getZoomInValue(scale);
    if (num !== null && num > 0) {
      setScale(num);
      eventHub.trigger('editorScaleScreen', num);
    }
  }, [scale]);

  const onClickZoomOut = useCallback(() => {
    const num = getZoomOutValue(scale);
    if (num !== null && num > 0) {
      setScale(num);
      eventHub.trigger('editorScaleScreen', num);
    }
  }, [scale]);

  const onClickUndo = useCallback(() => {
    eventHub.trigger('editorUndo', undefined);
  }, []);

  const onClickRedo = useCallback(() => {
    eventHub.trigger('editorRedo', undefined);
  }, []);

  return (
    <Header className="myshow-editor-header"
      style={{height: props.height}}
    >
      <Box>
        <Select size="small"
          style={{width: 100}}
          value={scale}
          onChange={onChangeScale}
          options={zoomData}/>
      </Box>
      <Box noBoarder={true}>
        <ZoomInOutlined
          onClick={onClickZoomIn}
          className={classnames({
            'myshow-editor-header-icon': true,
            'icon-disable': getZoomInValue(scale) === null,
          })} 
        />
      </Box>
      <Box>
        <ZoomOutOutlined
          onClick={onClickZoomOut}
          className={classnames({
            'myshow-editor-header-icon': true,
            'icon-disable': getZoomOutValue(scale) === null,
          })} 
        />
      </Box>
      <Box noBoarder={true}>
        <UndoOutlined
          onClick={onClickUndo}
          className="myshow-editor-header-icon"/>
      </Box>
      <Box>
        <RedoOutlined
          onClick={onClickRedo}
          className="myshow-editor-header-icon"/>
      </Box>
    </Header>
  )
}

const Box: React.FC<{
  noBoarder?: boolean,
  style?: React.HTMLAttributes<HTMLDivElement>['style'],
}> = (props) => {
  return (
    <div
      className={classnames({
        'myshow-editor-header-box': true,
        'no-border': props.noBoarder === true,
      })}
      style={props.style || {}}
    >
      {props.children}
    </div>
  )
}
 