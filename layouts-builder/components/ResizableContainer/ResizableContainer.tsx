import classNames from 'classnames';
import { findWidthPercentByPx } from 'layouts-builder/helpers/findWidth';
import { gridValue } from 'layouts-builder/helpers/gridValue';
import React, {
  FC,
  DragEvent,
  useState,
  useRef,
  CSSProperties,
  SyntheticEvent,
} from 'react';

interface ResizableContainerProps {
  isRow?: boolean;
  isCol?: boolean;
  isSection?: boolean;
  resizable?: boolean;
  styles?: CSSProperties;
  colNumber?: number;
  colIndex?: number;
  type?: any;
  noPadding?: boolean;
  currentWidth?: number;
  maxWidth?: number;
  onResize?: (
    currentSize: number,
    init: number,
    end?: boolean,
  ) => void;
  onResizeEnd?: (currentSize: number) => void;
  onResizeColEnd?: (initSize: number, finalWidth: number) => void;
  onClick?: () => void;
}
export const ResizableContainer: FC<ResizableContainerProps> = ({
  isRow,
  type,
  isCol,
  colIndex,
  isSection,
  resizable,
  styles,
  children,
  currentWidth,
  noPadding,
  maxWidth,
  colNumber,
  onResize,
  onResizeColEnd,
  onResizeEnd,
  onClick,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [init, setInit] = useState({
    width: 0,
    clientX: 0,
  });
  const columnRef = useRef<HTMLDivElement>(null);

  const onResizeStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (init.clientX && init.width) return;
    const columnWidth = columnRef.current?.offsetWidth;
    if (!columnWidth) return;
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
      if (e.clientX === 0) return;
      const diff = init.clientX - e.clientX;

      const needX2 =
        colNumber === 1 ||
        (colNumber &&
          colNumber > 2 &&
          colIndex !== 0 &&
          colIndex !== colNumber - 1);

      console.log('needX2', needX2);

      const add = needX2 ? diff * 2 : diff * 1;
      const addition = left ? add : -add;
      const cWidth = init.width + addition;
      const widthNow = (styles?.width as string)?.includes('%')
        ? parseFloat((styles?.width as string)?.replace('%', ''))
        : styles?.width;

      const w = findWidthPercentByPx(
        init.width,
        widthNow as number,
        cWidth,
        (colNumber || 0) > 1,
      );

      setWidth(w);
      onResize && onResize(w, init.width);
    }
  };

  const handleResizeEnd = (
    e: DragEvent<HTMLDivElement>,
    left: boolean,
  ) => {
    if (init.clientX && init.width) {
      const grid = colNumber && colNumber % 2 !== 0 ? 3 : 10;
      onResizeColEnd &&
        onResizeColEnd(init.width, gridValue(grid, width) as number);
      onResize && onResize(width, init.width, true);
      onResizeEnd && onResizeEnd(width);
      setInit((prev) => ({
        width: prev.width,
        clientX: 0,
      }));

      setWidth(0);
    }
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={classNames(
        'rlb-resizable-container',
        resizable ? 'resizable' : '',
        noPadding ? 'no-padding' : '',
        isRow ? 'flex' : '',
      )}
      ref={columnRef}
      style={{
        width: width ? `${Math.round(width)}%` : styles?.width,
        maxWidth: maxWidth,
      }}
      data-width={currentWidth}
      onClick={handleClick}
    >
      <div
        className="rlb-resizable-inner"
        style={{ maxWidth: isSection ? styles?.width : '100%' }}
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
    </div>
  );
};
