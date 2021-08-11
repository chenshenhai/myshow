import * as React from 'react';
import { TypeElemDesc, TypeElement } from '@idraw/types';
import { EditorContext } from '../../context';
import { getElement } from '../../util/data';
import eventHub from '../../util/event-hub';
import { RectDescForm } from './rect';
import { TextDescForm } from './text';
import { ImageDescForm } from './image';
import { SVGDescForm } from './svg';

const { useContext, useCallback } = React;

const supportElemList = ['rect', 'text', 'image', 'svg']; // TODO 

type TypeProps = {
  maxHeight?: number,
}

export const Description = (props: TypeProps) => {
  const context = useContext(EditorContext);
  const { data, selectedElementUUID } = context;
  const elem: TypeElement<keyof TypeElemDesc> = getElement(data, selectedElementUUID);
  
  const onChangeElementDesc = useCallback((desc: TypeElemDesc[keyof TypeElemDesc]) => {
    if (elem) {
      elem.desc = { ...elem.desc, ...desc };
      eventHub.trigger('editorUpdateElement', elem);
    }
  }, [selectedElementUUID, elem]);

  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  return (
    <div className="myshow-editor-mod-desc" style={style}>
      {supportElemList.includes(elem?.type) ? (
        <>
          {elem?.type === 'rect' && (
            <RectDescForm
              elem={elem as TypeElement<'rect'>}
              onChange={onChangeElementDesc}
            />
          )}
          {elem?.type === 'text' && (
            <TextDescForm
              elem={elem as TypeElement<'text'>}
              onChange={onChangeElementDesc}
            />
          )}
          {elem?.type === 'image' && (
            <ImageDescForm
              elem={elem as TypeElement<'image'>}
              onChange={onChangeElementDesc}
            />
          )}
          {elem?.type === 'svg' && (
            <SVGDescForm
              elem={elem as TypeElement<'svg'>}
              onChange={onChangeElementDesc}
            />
          )}
        </>
      ) : (
        <div className="no-select-data">No Description</div>
      )}
    </div>
  )
}

