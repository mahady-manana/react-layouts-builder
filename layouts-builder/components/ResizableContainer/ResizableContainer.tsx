import classNames from 'classnames';
import { gridValue } from 'layouts-builder/helpers/gridValue';
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

interface ResizableContainerProps {
  isRow?: boolean;
  resizable?: boolean;
  styles?: CSSProperties;
}
export const ResizableContainer: FC<ResizableContainerProps> = ({
  isRow,
  resizable,
  styles,
  children,
}) => {
  const [width, setWidth] = useState<number>();
  const [init, setInit] = useState({
    width: 0,
    clientX: 0,
  });
  const [droppableTarget, setDroppableTarget] = useState<string>();
  const columnRef = useRef<HTMLDivElement>(null);
  //   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     const targetEl = e.currentTarget;
  //     const targetDom = targetEl.getAttribute('target-droppable-item');

  //     if (targetDom && !isSection) {
  //       setDroppableTarget(targetDom);
  //     }
  //   };

  //   const isHoveredTargetClassNameSide = (conditions: boolean) => {
  //     return conditions
  //       ? 'rlb-droppable-side-hover'
  //       : 'rlb-droppable-side';
  //   };
  //   const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     setDroppableTarget('');
  //   };
  //   const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.LEFT);
  //     setDroppableTarget('');
  //   };
  //   const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.RIGHT);
  //     setDroppableTarget('');
  //   };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (init.clientX && init.width) return;
    const columnWidth = columnRef.current?.clientWidth;

    setWidth(columnWidth);
    setInit({ width: width || columnWidth || 0, clientX: e.clientX });
  };

  const handleResize = (
    e: DragEvent<HTMLDivElement>,
    left: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);

    if (init.clientX && init.width) {
      const diff = init.clientX - e.clientX;
      const add = diff * 2;
      const addition = left ? add : -add;
      setWidth(init.width + addition);
    }
  };

  const handleDragEnd = (
    e: DragEvent<HTMLDivElement>,
    left: boolean,
  ) => {
    if (init.clientX && init.width) {
      const diff = init.clientX - e.clientX;
      const add = diff * 2;
      const addition = left ? add : -add;

      const finalWidth = init.width + addition;
      setWidth(finalWidth);
      setInit((prev) => ({
        width: prev.width,
        clientX: 0,
      }));
    }
  };

  return (
    <div
      className={classNames(
        'rlb-resizable-container',
        resizable ? 'resizable' : '',
        isRow ? 'flex' : '',
      )}
      ref={columnRef}
      style={{
        width: gridValue(50, width) || styles?.width,
      }}
    >
      {/* {!disableChange ? (
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
        ) : null} */}

      {resizable ? (
        <div
          className="rlb-resize-handler left"
          draggable
          onDrag={(e) => handleResize(e, true)}
          onDragEnd={(e) => {
            handleDragEnd(e, true);
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null}

      {children}
      {resizable ? (
        <div
          className="rlb-resize-handler right"
          draggable
          onDrag={(e) => handleResize(e, false)}
          onDragEnd={(e) => {
            handleDragEnd(e, false);
          }}
          // onDragStart={onDragStart}
        ></div>
      ) : null}

      {/* {!disableChange ? (
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
        ) : null} */}
    </div>
  );
};
