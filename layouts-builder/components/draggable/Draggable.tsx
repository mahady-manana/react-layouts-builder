import classNames from 'classnames';
import { DefaultDragIcon } from 'layouts-builder/icons';
import React, { FC, ReactNode, DragEvent } from 'react';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  disableChange?: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  // onResize: ()
}
export const DraggableItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  disableChange,
  onDragStart,
}) => {
  return (
    <div
      draggable={!disableChange}
      onDragStart={onDragStart}
      className={classNames(
        'rlb-draggable-container flex-grow',
        !disableChange ? 'draggable' : '',
      )}
      data-draggable={dndTargetKey}
      target-dnd-droppable={`${dndTargetKey}`}
    >
      <span className="rlb-drag-icon">
        <DefaultDragIcon />
      </span>
      {children}
    </div>
  );
};
