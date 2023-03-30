import React, { useMemo } from 'react';
import { ComponentTestts } from './ComponentTest';
import { DraggableWrapper } from '../../packages';

interface Props {
  data: any;
  onClick: (data: any) => void;
  focused?: boolean;
  component?: any;
}

export const TestComponent = React.memo((props: Props) => {
  return (
    <DraggableWrapper draggableId={`${props.data.id}`}>
      {({ draggableProps, styles }) => {
        return (
          <div
            key={props.data.id}
            className="min-h-[50px] h-full relative"
            style={{
              border: props.focused ? '1px solid #000' : '',
              marginBottom: 5,
              ...styles,
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onClick(props.data);
            }}
          >
            <div
              style={{
                border: '1px solid #000',
                width: 20,
                height: 20,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              {...draggableProps}
            >
              ...
            </div>
            {props.data.type === 'text' ? (
              <div className='txt'>
                <p>{props.data.textContent}</p>
              </div>
            ) : null}
            {props.data.type === 'LINK' ? (
              <div>
                <button className="btn bg-primary text-white">
                  {props.data.buttonText}
                </button>
              </div>
            ) : null}
          </div>
        );
      }}
    </DraggableWrapper>
  );
});
