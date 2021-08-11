import * as React from 'react';
import { Input } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import {
  EditOutlined, LockOutlined, LockFilled, CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import eventHub from '../../util/event-hub';
import { EditorContext } from '../../context';

const { useContext, useState, useCallback } = React;

type TypeProps = {
  maxHeight?: number,
  element: TypeElement<keyof TypeElemDesc>
}

export const Item = (props: TypeProps) => {
  const { element } = props;
  const context = useContext(EditorContext);
  const { selectedElementUUID } = context;
  const style: React.HTMLAttributes<HTMLDivElement>['style'] = {};
  if (props.maxHeight > 0) {
    style.maxHeight = props.maxHeight;
    style.height = props.maxHeight;
  }

  const [isEdit, setIsEdit] = useState(false);
  const [elemName, setElemName] = useState(element.name);

  const onClickEdit = useCallback(() => {
    setIsEdit(true)
  }, []);

  const onChangeInput = useCallback((e) => {
    setElemName(e.target.value || '');
  }, []);

  const onConfirmElemName = useCallback(() => {
    element.name = elemName;
    eventHub.trigger('editorUpdateElement', element);
    setIsEdit(false);
  }, [elemName, element]);

  const onClickSwitchLock = useCallback(() => {
    element.lock = !element.lock;
    eventHub.trigger('editorUpdateElement', element);
    setIsEdit(false);
  }, [element]);

  const onClickDelete = useCallback(() => {
    eventHub.trigger('editorDeleteElement', element.uuid);
  }, [element]);

  return (
    <div
      className={classnames({
        'myshow-editor-element-item': true,
        'element-item-active': (element.uuid && selectedElementUUID && element.uuid === selectedElementUUID)
      })}
      onClick={() => {
        eventHub.trigger('editorSelectElement', { uuid: element.uuid });
      }}
    >
      {isEdit === true ? (
        <Input 
          size="small" value={elemName} style={{width: 140}}
          onChange={onChangeInput}
        />
      ) : (
        <span className="editor-element-item-name">
          {element.name || 'Unnamed'}
        </span>
      )}

      <span className="editor-element-item-action">
        {isEdit === true ? (
          <CheckCircleOutlined
            className="myshow-editor-element-icon"
            onClick={onConfirmElemName}
          />
        ) : (
          <EditOutlined
            className="myshow-editor-element-icon"
            onClick={onClickEdit}
          />
        )}

        {element.lock === true ? (
          <LockFilled
            className="myshow-editor-element-icon icon-active"
            onClick={onClickSwitchLock} />
        ) : (
          <LockOutlined
            className="myshow-editor-element-icon"
            onClick={onClickSwitchLock} />
        )}
        <DeleteOutlined
          className="myshow-editor-element-icon"
          onClick={onClickDelete}
        />         
      </span>
      
    </div>
  )
}
 