import React, { FC, ReactNode, DragEvent, useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  index: number;
  children: ReactNode;
  dndTargetKey?: string;
  disableDrag: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  index,
  dndTargetKey,
  disableDrag,
  onDropItem,
  onDragStart,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute(
      'target-droppable-section',
    );
    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };
  const isHoveredTargetClassName = (conditions: boolean) => {
    return conditions
      ? 'rlb-droppable-setion-hover'
      : 'rlb-droppable-setion';
  };
  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    setDroppableTarget('');
  };

  return (
    <div className="rlb-section" draggable onDragStart={onDragStart}>
      {index === 0 ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `${dndTargetKey}-top`,
          )}`}
          target-droppable-section={`${dndTargetKey}-top`}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
            setDroppableTarget('');
          }}
          onDragLeave={handleDragOverLeave}
        >
          {droppableTarget === `${dndTargetKey}-top`
            ? `Drop here as a section...`
            : null}
        </div>
      ) : null}
      <div className="section-content">{children}</div>

      <div
        className={`${isHoveredTargetClassName(
          droppableTarget === `${dndTargetKey}-bottom`,
        )}`}
        target-droppable-section={`${dndTargetKey}-bottom`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOverLeave}
        onDrop={(e) => {
          onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
          setDroppableTarget('');
        }}
      >
        {droppableTarget === `${dndTargetKey}-bottom`
          ? 'Drop here as a section...'
          : null}
      </div>
    </div>
  );
};
