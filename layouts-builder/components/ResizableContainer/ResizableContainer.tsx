import React, { FC, useRef } from 'react';

interface ResizableContainerProps {
  resizable?: boolean;
  colNumber: number;
  type?: any;
  width: number | string;
  isLast?: boolean;
  isNextTo?: boolean;
  resizing?: boolean;
  children?: any;
  onMouseDown?: (clienX: number, width: number) => void;
}
const ResizableContainerComponent: FC<ResizableContainerProps> = ({
  type,
  resizable,
  children,
  resizing,
  width,
  isLast,
  isNextTo,
  colNumber,
  onMouseDown,
}) => {
  const columnRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="rlb-content-container"
        ref={columnRef}
        style={{
          width: colNumber > 1 ? width : '100%',
          flexGrow: isNextTo ? 1 : undefined,
        }}
        data-resizable-type={type}
      >
        {children}
      </div>

      {!isLast ? (
        <div
          className="rlb-resize-handler"
          style={{ opacity: resizing ? 1 : undefined }}
          data-resizable-type={type}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
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

export const ResizableContainer = React.memo(
  ResizableContainerComponent,
);
