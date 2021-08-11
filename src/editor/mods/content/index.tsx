import * as React from 'react';
import { useEffect, useRef, useContext, useCallback } from 'react';
import IDraw from 'idraw';
// import { TypeData, TypeScreenPosition } from '@idraw/types';
import { Layout } from 'antd'; 
import eventHub from '../../util/event-hub';
// import ScrollBox from './scroll-box';
import { StudioContext } from '../../context';
import { onDragOver } from '../global';

const { Content } = Layout;

type TypeProps = {
  height: number;
  width: number;
  contextWidth: number;
  contextHeight: number;
}

function StudioContent(props: TypeProps) {
  const context = useContext(StudioContext);
  const { data } = context;
  const { width, height } = props;
  const mount = useRef(null); 
  
  useEffect(() => {
    // @ts-ignore
    const mountDiv = mount.current as HTMLDivElement;
    const idraw = new IDraw(mountDiv, {
      width: width,
      height: height,
      contextWidth: props.contextWidth,
      contextHeight: props.contextHeight,
      devicePixelRatio: 4,
    }, {
      scrollWrapper: {
        use: true,
        color: '#bbbbbb',
        lineWidth: 10,
      }
    });
    // setIDraw(idraw);

    idraw.on('changeData', (data) => {
      eventHub.trigger('editorChangeData', data);
    });

    idraw.on('screenSelectElement', (e) => {
      const elem = e.element
      if (elem !== null) {
        idraw.selectElement(elem.uuid, {
          useMode: true,
        });
        eventHub.trigger('editorSelectElement', {
          uuid: elem.uuid,
          useMode: true,
        })
      }
    });
    
    // editor event
    eventHub.on('editorScaleScreen', (num) => {
      idraw.scale(num);
    });
    eventHub.on('editorSelectElement', (data) => {
      idraw.selectElement(data.uuid, { useMode: data.useMode });
    });
    eventHub.on('editorUpdateElement', (elem) => {
      idraw.updateElement(elem);
    });
    eventHub.on('editorDeleteElement', (uuid: string) => {
      idraw.deleteElement(uuid);
    });
    eventHub.on('editorIDrawResetWidth', (width: number) => {
      idraw.resetSize({ width })
    });
    eventHub.on('editorDragNewElement', (params) => {
      const { clientX, clientY, element } = params;
      // @ts-ignore
      const mountDOM = mount.current as HTMLDivElement;
      const mountRect = mountDOM.getBoundingClientRect();
      const dragX = clientX - mountRect.x;
      const dragY = clientY - mountRect.y;

      const ctxPoint = idraw.pointScreenToContext({ x: dragX, y: dragY })
      element.x = ctxPoint.x;
      element.y = ctxPoint.y;

      idraw.addElement(element);
    });

    eventHub.on('editorUndo', () => {
      const { data, doRecordCount } = idraw.undo();
      if (data) {
        eventHub.trigger('editorChangeData', data);
      }
      return doRecordCount;
    });
    eventHub.on('editorRedo', () => {
      const { data, undoRecordCount } = idraw.redo();
      if (data) {
        eventHub.trigger('editorChangeData', data);
      }
      return undoRecordCount;
    })

    if (data) {
      idraw.setData(data, { 
        triggerChangeEvent: true
      });
    }
    idraw.scale(1);
  }, []);

  const onDragFeekback = useCallback(() => {
    // e.preventDefault();
  }, [])

  return (
    <Content className="myshow-editor-content">
      <div style={{
          width: props.width,
          height: props.height,
        }} ref={mount}
        onDrop={onDragFeekback}
        onDragOver={onDragOver}
      ></div>
    </Content>
  )
}


export default StudioContent