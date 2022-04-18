import React, { FC, ReactNode, DragEvent, useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode | JSX.Element;
  dndTargetKey?: string;
  disableDrag: boolean;
  isSection?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
  currentColumLength: number;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
}
export const DroppableColumnItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  isSection,
  onDropItem,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };
  const isHoveredTargetClassName = (conditions: boolean) => {
    return conditions
      ? 'border-2 rounded-sm border-dashed bg-gray-200 border-gray-500 text-center p-2 my-1'
      : 'h-2';
  };

  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    setDroppableTarget('');
  };

  const handleDropToTop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.TOP);
    setDroppableTarget('');
  };
  const handleDropToBottom = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget('');
  };
  return (
    <>
      <div
        className={`${isHoveredTargetClassName(
          droppableTarget === `item-${dndTargetKey}-top`,
        )}`}
        target-droppable-item={`item-${dndTargetKey}-top`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOverLeave}
        onDrop={handleDropToTop}
      >
        {droppableTarget === `item-${dndTargetKey}-top`
          ? 'Add item to column...'
          : null}
      </div>

      {children}
      <div
        className={`${isHoveredTargetClassName(
          droppableTarget === `item-${dndTargetKey}-bottom`,
        )}`}
        target-droppable-item={`item-${dndTargetKey}-bottom`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOverLeave}
        onDrop={handleDropToBottom}
      >
        {droppableTarget === `item-${dndTargetKey}-bottom`
          ? 'Add item to column...'
          : null}
      </div>
    </>
  );
};
