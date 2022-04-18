import React, { FC, ReactNode, DragEvent } from 'react';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  disableDrag: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  // onResize: ()
}
export const DraggableItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  onDragStart,
}) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex-grow"
      target-dnd-droppable={`${dndTargetKey}`}
    >
      {children}
    </div>
  );
};
