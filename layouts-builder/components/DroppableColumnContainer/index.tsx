import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useRef,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  currentColumLength: number;
  width: number;
  disableDrag: boolean;
  initialSize: any;
  disableChange?: boolean;
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
  onResize?: (
    e: DragEvent<HTMLDivElement>,
    isInvert?: boolean,
  ) => void;
  // onResizeEnd: () => void;
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
  disableChange,
  onDropItem,
  onResize,
  onResizeStart,
  // onResizeEnd,
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
      ? 'rlb-droppable-side-hover'
      : 'rlb-droppable-side';
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
    onResize && onResize(e);
  };
  const handleResizeLeft = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize && onResize(e, true);
  };
  const handleDragEnd = () => {
    // onResizeEnd();
  };

  return (
    <div
      className={classNames(
        'rlb-col',
        // `w-[${widthNumber}%]`,
        className,
      )}
      ref={columnRef}
    >
      {!disableChange ? (
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
      ) : null}

      {/* {!droppableTarget && !disableChange ? (
        <div
          className="rlb-resize-handler left"
          draggable
          onDrag={handleResizeLeft}
          onDragEnd={() => {
            handleDragEnd();
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null} */}

      {children}
      {/* {!droppableTarget && !disableChange ? (
        <div
          className="rlb-resize-handler right"
          draggable
          onDrag={handleResize}
          onDragEnd={() => {
            handleDragEnd();
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null} */}

      {!disableChange ? (
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
      ) : null}
    </div>
  );
};
