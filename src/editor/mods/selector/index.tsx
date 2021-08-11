import * as React from 'react';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import { VirtualDrag } from '../virtual-drag';
import eventHub from '../../util/event-hub';


export const Selector = (props: {
  dataList?: {
    name: string,
    icon: React.ReactElement,
    defaultElement: TypeElement<keyof TypeElemDesc>
  }[]
}) => {
  const { dataList = [] } = props;
  const onActionEnd = React.useCallback((e, element: TypeElement<keyof TypeElemDesc>) => {
    eventHub.trigger('editorDragNewElement', {
      clientX: e.clientX,
      clientY: e.clientY,
      element: element,
    })
  }, []);

  return (
    <div className="myshow-editor-mod-selector">
      <div className="editor-selector-element-list">
        {dataList.map((elem, i) => {
          const { icon, defaultElement } = elem;
          return (
            <div className="editor-selector-element-item" key={i}>
              <VirtualDrag onActionEnd={(e) => {
                onActionEnd(e, defaultElement);
              }}>
                {icon}
              </VirtualDrag>
            </div>
          )
        })}
      </div>
    </div>
  )
}
