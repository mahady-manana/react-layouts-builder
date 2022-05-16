import React, { FC, useRef } from 'react';

interface ResizableContainerProps {
  resizable?: boolean;
  colNumber?: number;
  type?: any;
  width: number | string;
  onMouseDown?: (clienX: number, width: number) => void;
  isLast?: boolean;
  isNextTo?: boolean;
  resizing?: boolean;
}
export const ResizableContainer: FC<ResizableContainerProps> = ({
  type,
  resizable,
  children,
  resizing,
  width,
  isLast,
  isNextTo,
  onMouseDown,
}) => {
  const columnRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="rlb-content-container"
        ref={columnRef}
        style={{ width: width, flexGrow: isNextTo ? 1 : undefined }}
        data-resizable-type={type}
      >
        {children}
      </div>

      {!isLast ? (
        <div
          className="rlb-resize-handler"
          style={{ opacity: resizing ? 1 : undefined }}
          data-resizable-type={type}
        >
          <div
            className={resizable ? 'resize-hand' : 'rbl-no-action'}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMouseDown &&
                onMouseDown(
                  e.clientX,
                  columnRef.current?.clientWidth || 0,
                );
            }}
          />
        </div>
      ) : null}
    </>
  );
};
