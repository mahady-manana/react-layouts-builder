import React, { FC, ReactNode, DragEvent, useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
import classNames from 'classnames';

interface DraggableProps {
  index: number;
  children: ReactNode;
  dndTargetKey?: string;
  disableChange?: boolean;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
}
export const DroppableRow: FC<DraggableProps> = ({
  children,
  index,
  dndTargetKey,
  disableChange,
  onDropItem,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-row');
    if (targetDom && !disableChange) {
      setDroppableTarget(targetDom);
    }
  };
  const isHoveredTargetClassName = (conditions: boolean) => {
    return conditions
      ? 'rlb-droppable-section hover'
      : 'rlb-droppable-section';
  };
  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    setDroppableTarget('');
  };

  return (
    <div className="relative">
      {index === 0 && !disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `${dndTargetKey}-top`,
          )} top`}
          target-droppable-row={`${dndTargetKey}-top`}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            onDropItem(e, DropTargetPlaceEnum.ROW_TOP);
            setDroppableTarget('');
          }}
          onDragLeave={handleDragOverLeave}
        ></div>
      ) : null}

      <div
        className={classNames('rlb-section')}
      >
        {children}
      </div>

      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `${dndTargetKey}-bottom`,
          )} bottom`}
          target-droppable-row={`${dndTargetKey}-bottom`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={(e) => {
            onDropItem(e, DropTargetPlaceEnum.ROW_BOTTOM);
            setDroppableTarget('');
          }}
        ></div>
      ) : null}
    </div>
  );
};
