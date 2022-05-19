import { loadPartialConfig } from '@babel/core';
import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useEffect,
  useRef,
  MouseEvent,
} from 'react';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  disableChange?: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  isImage?: boolean;
  imageWidth?: number;
  oneCol?: boolean;
  onImageResizeFinished?: (width: number) => void;
}
export const DraggableItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  disableChange,
  imageWidth,
  isImage,
  oneCol,
  onDragStart,
  onImageResizeFinished,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [finalWidth, setFinalWidth] = useState<number>(0);
  const [initWidth, setInitWidth] = useState<number>();
  const [initClientX, setInitClientX] = useState<number>();
  const [direction, setDirection] = useState<'left' | 'right'>();
  const [percentPX, setPercentPX] = useState<number>();
  const [startResize, setStartResize] = useState<boolean>(false);
  const [waitBeforeUpdate, setWaitBeforeUpdate] = useState(500);

  useEffect(() => {
    if (imageWidth) {
      setWidth(imageWidth);
    }
  }, [imageWidth]);

  const onMouseDown = (e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current?.offsetWidth) return;
    setInitWidth(imageWidth || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    const p1px = containerRef.current?.offsetWidth / 100;
    setPercentPX(p1px);
  };
  const onMouseMouve = (e: MouseEvent<HTMLElement>) => {
    const newCX = e.clientX;

    if (
      initClientX &&
      initWidth &&
      startResize &&
      percentPX &&
      direction
    ) {
      const diff = initClientX - newCX;

      const w = diff / percentPX;
      const dir = direction === 'left' ? w : -w;
      const isOneCol = oneCol ? dir * 2 : dir;

      const final = initWidth + isOneCol;

      if (final > 100) {
        setWidth(100);
        setFinalWidth(100);
      } else if (final < 15) {
        setWidth(15);
        setFinalWidth(15);
      } else {
        setWidth(final);
        setFinalWidth(final);
      }
    }
  };
  const onMouseLeaveOrUp = (e: MouseEvent<HTMLDivElement>) => {
    runIt();
  };

  const runIt = () => {
    if (onImageResizeFinished && width && finalWidth) {
      onImageResizeFinished(width);
      setFinalWidth(0);
    }
    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
  };

  useEffect(() => {
    if (waitBeforeUpdate > 10) {
      const timer = setTimeout(() => {
        setWaitBeforeUpdate((prev) => prev - 10);
      }, 250);
      clearTimeout(timer);
    }
    if (waitBeforeUpdate < 10) {
      runIt();
    }
  }, [waitBeforeUpdate]);

  return (
    <div
      draggable={startResize ? false : !disableChange}
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={classNames(
        'rlb-draggable-container flex-grow',
        !disableChange ? 'draggable' : '',
        startResize ? 'resize-img' : '',
      )}
      data-draggable={dndTargetKey}
      target-dnd-droppable={`${dndTargetKey}`}
      ref={containerRef}
      onMouseMove={onMouseMouve}
      onMouseUp={onMouseLeaveOrUp}
      onMouseLeave={onMouseLeaveOrUp}
    >
      {isImage ? (
        <div
          className="image_rlb"
          style={{
            width: `${width || 100}%`,
            margin: oneCol ? 'auto' : undefined,
          }}
        >
          {!disableChange && oneCol ? (
            <div
              className="image-resize imr-left"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: startResize ? 999 : undefined }}
            >
              <div
                className="hand-image"
                onMouseDown={(e) => {
                  setDirection('left');
                  onMouseDown(e);
                }}
              ></div>
            </div>
          ) : null}
          {children}
          {!disableChange ? (
            <div
              className="image-resize imr-right"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: startResize ? 999 : undefined }}
            >
              <div
                className="hand-image"
                onMouseDown={(e) => {
                  setDirection('right');
                  onMouseDown(e);
                }}
              ></div>
            </div>
          ) : null}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
