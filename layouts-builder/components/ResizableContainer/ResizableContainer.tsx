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
  type?: any;
  currentWidth?: number | string;
  onResize?: (currentSize: number) => void;
  onResizeEnd?: (currentSize: number) => void;
}
export const ResizableContainer: FC<ResizableContainerProps> = ({
  isRow,
  type,
  resizable,
  styles,
  children,
  currentWidth,
  onResize,
}) => {
  const [width, setWidth] = useState<number>();
  const [init, setInit] = useState({
    width: 0,
    clientX: 0,
  });
  const columnRef = useRef<HTMLDivElement>(null);

  const onResizeStart = (e: DragEvent<HTMLDivElement>) => {
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
    onResizeStart(e);

    if (init.clientX && init.width) {
      const diff = init.clientX - e.clientX;
      const add = isRow ? diff * 2 : diff;
      const addition = left ? add : -add;
      const currentWidth = init.width + addition;
      setWidth(currentWidth);
      onResize && onResize(currentWidth);
    }
  };

  const handleResizeEnd = (
    e: DragEvent<HTMLDivElement>,
    left: boolean,
  ) => {
    if (init.clientX && init.width) {
      const diff = init.clientX - e.clientX;
      const add = isRow ? diff * 2 : diff;
      const addition = left ? add : -add;

      const finalWidth = init.width + addition;
      setWidth(finalWidth);
      setInit((prev) => ({
        width: prev.width,
        clientX: 0,
      }));
      onResize && onResize(finalWidth);
    }
  };

  console.log(type, currentWidth, resizable);

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
      data-width={currentWidth}
    >
      {resizable ? (
        <div
          className="rlb-resize-handler left"
          draggable
          onDrag={(e) => handleResize(e, true)}
          onDragEnd={(e) => {
            handleResizeEnd(e, true);
          }}
          data-resizable-type={type}
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
            handleResizeEnd(e, false);
          }}
          // onDragStart={onDragStart}
          data-resizable-type={type}
        ></div>
      ) : null}
    </div>
  );
};
