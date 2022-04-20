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
      className="flex-grow"
      target-dnd-droppable={`${dndTargetKey}`}
    >
      {children}
    </div>
  );
};
