import React, { FC, ReactNode, DragEvent, useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
import classNames from 'classnames';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer';

interface DraggableProps {
  section: IRenderableLayout;
  index: number;
  children: ReactNode;
  dndTargetKey?: string;
  disableChange?: boolean;
  width?: number | string;
  maxWidth: number;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
  onResize?: (width: number) => void;
}
export const DroppableRow: FC<DraggableProps> = ({
  children,
  index,
  dndTargetKey,
  section,
  disableChange,
  width,
  maxWidth,
  onResize,
  onDropItem,
  onDragStart,
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
      <ResizableContainer
        isRow
        resizable={false}
        styles={{ width: width }}
        onResize={onResize}
        currentWidth={width}
        maxWidth={maxWidth}
      >
        <div
          className={classNames('rlb-section')}
          draggable={!disableChange}
          onDragStart={onDragStart}
          style={{
            paddingBlock: (section.spacing || 0) * 8,
          }}
        >
          <div
            className="section-content flex"
            style={{ width: '100%', margin: 'auto' }}
          >
            {children}
          </div>
        </div>
      </ResizableContainer>
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
