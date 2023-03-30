import React, { FC, useRef, useState } from 'react';
import { useDrop, useDragDropManager } from 'react-dnd';
import {
  droppablePosition,
  isAcceptedPostion,
} from '../helpers/droppableInfo';
import { getCurrentHovered } from '../helpers/getCurrentHovered';
import {
  EnumBlockType,
  LayoutType,
  OptionsDrop,
} from '../interfaces/types';

interface ContaierDropElementProps {
  data: LayoutType;
  onDrop: (options: OptionsDrop) => void;
  children: any;
}
export const ContaierDropElement: FC<ContaierDropElementProps> = (
  props,
) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const manager = useDragDropManager();
  const removeExistingIndice = (all?: boolean) => {
    const elements = document.querySelectorAll('.lb-indice');
    elements?.forEach((element) => {
      if (all) {
        element.classList.remove('lb-indice');
        return;
      }
      if (element.id !== `${props.data.id}`) {
        element.classList.remove('lb-indice');
      }
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collectedProps, drop] = useDrop(() => ({
    accept: ['block', 'container', 'row'],
    drop(item: any, monitor) {
      const clientOffset = monitor.getClientOffset();
      setHovered(false);
      setPosition('');
      if (!clientOffset) {
        return;
      }
      const { x, y } = clientOffset;

      const posit = getCurrentHovered(
        x,
        y,
        containerRef,
        droppablePosition(
          item.data.type,
          props.data.type as EnumBlockType,
        ),
      );
      if (
        props.onDrop &&
        isAcceptedPostion(item.data.type, props.data.type)
      ) {
        // item.data, props.data.id, props.data.type, posit
        props.onDrop({
          item: item.data,
          targetItemId: props.data.id,
          targetType: props.data.type as EnumBlockType,
          position: posit,
        });
        removeExistingIndice(true);
      }
    },
    hover(item, monitor) {
      const clientOffset = monitor.getClientOffset();
      setHovered(true);
      if (!clientOffset) {
        return;
      }
      const { x, y } = clientOffset;

      const posit = getCurrentHovered(
        x,
        y,
        containerRef,
        droppablePosition(
          item.data.type,
          props.data.type as EnumBlockType,
        ),
      );
      console.log({ posit });

      if (
        posit &&
        isAcceptedPostion(item.data.type, props.data.type as EnumBlockType)
      ) {
        setPosition(posit);
        removeExistingIndice();
      }
    },
    canDrop(item: any, monitor) {
      return isAcceptedPostion(
        item.data.type,
        props.data.type as EnumBlockType,
      );
    },
    options: {},
  }));

  const exitDropTarget = () => {
    setHovered(false);
    setPosition('');
    removeExistingIndice();
  };

  const isDragging = manager.getMonitor().isDragging();

  return (
    <div ref={containerRef} className={`lb-dp-${props.data.type}`}>
      <div
        ref={drop}
        id={props.data.id}
        className={`droppable-container ${
          position && hovered && isDragging
            ? `lb-indice drop-${position}`
            : ''
        }`}
        onDragLeave={() => exitDropTarget()}
        onDragEnter={() => setHovered(true)}
      >
        {props.children}
      </div>
    </div>
  );
};
