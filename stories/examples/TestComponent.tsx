import React from 'react';
import { ComponentTestts } from './ComponentTest';
import { DraggableItem } from '../../packages';

interface Props {
  data:
    | {
        id: number;
        text: string;
        group: string;
        bg: string;
        img: string;
        size: number;
      }
    | {
        id: number;
        text: string;
        group: string;
        bg: string;
        img?: undefined;
        size?: undefined;
      }
    | {
        id: number;
        text: string;
        group: string;
        bg: string;
        img: string;
        size?: undefined;
      };

  onClick: (data: any) => void;
  focused?: boolean;
  component?: any;
  onDelete: (id: number) => void;
}

export const TestComponent = React.memo((props: Props) => {
  return (
    <DraggableItem draggableId={`${props.data.id}`}>
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
            {props.data.img ? (
              <img src={props.data.img} width="100%" alt="" />
            ) : (props.data as any).linkType === 'link' ? (
              <button>{props.data.text}</button>
            ) : (
              <p>Data : {props.data.text}</p>
            )}
          </div>
        );
      }}
    </DraggableItem>
  );
});
