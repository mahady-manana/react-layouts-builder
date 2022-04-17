import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useRef,
  CSSProperties,
} from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode | JSX.Element;
  dndTargetKey: string;
  currentColumLength: number;
  width: number;
  disableDrag: boolean;
  initialSize: any;
  isSection?: boolean;
  className?: string;
  styles?: CSSProperties;
  resizingWidth?: number;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
  onResizeStart: (
    colId: string,
    widthPx: number,
    currentPercentWidth: number,
    onePixel: number,
    initialPos: number,
  ) => void;
  onResize: (
    e: DragEvent<HTMLDivElement>,
    isInvert?: boolean,
  ) => void;
  onResizeEnd: () => void;
}
export const DroppableColumnContainer: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  width,
  isSection,
  currentColumLength,
  initialSize,
  resizingWidth,
  disableDrag,
  className,
  styles,
  onDropItem,
  onResize,
  onResizeStart,
  onResizeEnd,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();
  const columnRef = useRef<HTMLDivElement>(null);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  const isHoveredTargetClassNameSide = (conditions: boolean) => {
    return conditions
      ? 'border-2 rounded-sm border-dashed flex items-center justify-center border-gray-500 w-[50%] mx-2'
      : 'w-4';
  };
  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDroppableTarget('');
  };
  const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };
  const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (initialSize) return;
    const columnWidth = columnRef.current?.clientWidth || 1;
    const containerWidth = columnWidth * currentColumLength;
    const onePercentInPx = containerWidth / 100;
    const onePixelInPercent = 1 / onePercentInPx;
    onResizeStart(
      dndTargetKey,
      columnWidth,
      width,
      Math.round(onePixelInPercent * 100) / 100,
      e.clientX,
    );
  };

  const handleResize = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e);
  };
  const handleResizeLeft = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e, true);
  };
  const handleDragEnd = () => {
    onResizeEnd();
  };

  return (
    <div
      className={classNames(
        'column flex relative',
        // `w-[${widthNumber}%]`,
        className,
      )}
      ref={columnRef}
      style={{
        ...styles,
        width: resizingWidth ? `${resizingWidth}%` : `${width}%`,
      }}
    >
      {!droppableTarget ? (
        <div
          className="w-2 relative left-4 bottom-0 cursor-col-resize	opacity-0 hover:opacity-1 focus:bg-gray-800"
          draggable
          onDrag={handleResizeLeft}
          onDragEnd={() => {
            handleDragEnd();
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null}
      <div
        className={`${isHoveredTargetClassNameSide(
          droppableTarget === `item-${dndTargetKey}-left`,
        )}`}
        target-droppable-item={`item-${dndTargetKey}-left`}
        onDragOver={disableDrag ? undefined : handleDragOver}
        onDragLeave={handleDragOverLeave}
        onDrop={handleDropToLeft}
      >
        {droppableTarget === `item-${dndTargetKey}-left`
          ? 'Drop new column...'
          : null}
      </div>

      {children}

      <div
        className={`${isHoveredTargetClassNameSide(
          droppableTarget === `item-${dndTargetKey}-right`,
        )}`}
        target-droppable-item={`item-${dndTargetKey}-right`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragOverLeave}
        onDrop={handleDropToRigth}
      >
        {droppableTarget === `item-${dndTargetKey}-right`
          ? 'Drop new column...'
          : null}
      </div>

      {!droppableTarget ? (
        <div
          className="w-2 relative right-4 bottom-0 cursor-col-resize	opacity-0 hover:opacity-1 focus:bg-gray-800"
          draggable
          onDrag={handleResize}
          onDragEnd={() => {
            handleDragEnd();
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null}
    </div>
  );
};
