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
  onDragStart: (
    e: DragEvent<HTMLDivElement>,
    element?: HTMLElement,
  ) => void;
  isImage?: boolean;
  sizes?: { width?: number; height?: number };
  oneCol?: boolean;
  onImageResizeFinished?: (sizes: {
    width?: number;
    height?: number;
  }) => void;
}
export const DraggableItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  disableChange,
  sizes,
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
  const [direction, setDirection] = useState<
    'left' | 'right' | 'vertical'
  >();
  const [height, setHeight] = useState<number>(0);
  const [finalHeight, setFinalHeight] = useState(0);
  const [initHeight, setInitHeight] = useState<number>();
  const [initClientY, setInitClientY] = useState<number>(0);
  const [percentPX, setPercentPX] = useState<number>();
  const [startResize, setStartResize] = useState<boolean>(false);
  const [waitBeforeUpdate, setWaitBeforeUpdate] = useState(500);

  useEffect(() => {
    if (sizes?.width) {
      setWidth(sizes.width);
    }
  }, [sizes?.width]);

  useEffect(() => {
    if (sizes?.height) {
      setHeight(sizes.height);
    }
  }, [sizes?.height]);

  const onMouseDown = (
    e: MouseEvent<HTMLElement>,
    isBottom?: boolean,
  ) => {
    containerRef.current?.removeAttribute('draggable');
    if (!containerRef.current?.offsetWidth) return;
    if (isBottom) {
      const h = containerRef.current.offsetHeight;
      setInitHeight(sizes?.height || h);
      setInitClientY(e.clientY);
      return;
    }
    setInitWidth(sizes?.width || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    const p1px = containerRef.current?.offsetWidth / 100;
    setPercentPX(p1px);
  };
  const onMouseMouve = (e: MouseEvent<HTMLElement>) => {
    const newCX = e.clientX;
    const newCY = e.clientY;

    if (direction === 'vertical' && initHeight) {
      const diff = initClientY - newCY;

      const final = initHeight - diff;

      if (final < 100) {
        setHeight(100);
        setFinalHeight(100);
      } else {
        setHeight(final);
        setFinalHeight(final);
      }

      return;
    }

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
    containerRef.current?.setAttribute('draggable', 'true');
    runIt();
  };

  const runIt = () => {
    if (onImageResizeFinished && width && finalWidth) {
      onImageResizeFinished({ width });
      setFinalWidth(0);
    }
    if (onImageResizeFinished && height && finalHeight) {
      onImageResizeFinished({ height });
      setFinalHeight(0);
    }
    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
    setInitClientY(0);
    setInitHeight(0);
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
  useEffect(() => {
    if (height) {
      const img = document.querySelector(
        `#rbl_image_${dndTargetKey} img`,
      );
      if (img) {
        (img as any).style?.setProperty('max-height', `${height}px`);
        (img as any).style?.setProperty('object-fit', `cover`);
      }
    }
  }, [height]);

  return (
    <div
      draggable={!disableChange}
      onDragStart={(e) => {
        onDragStart(e, containerRef.current as any);
        e.currentTarget.setAttribute('id', 'draggedDiv');
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const el = document.getElementById('draggedDiv');

        if (el) {
          el.style.position = '';
          el.style.pointerEvents = '';
          el.style.position = '';
          el.style.top = ``;
          el.style.left = ``;
          el.style.width = ``;
          el.style.height = ``;
          el.style.overflow = ``;
          el.removeAttribute('id');
        }
      }}
      //   // const cloned = e.currentTarget as HTMLDivElement;
      // onDrag={e => {
      //   // cloned.style.position = "fixed"
      //   // cloned.style.top = `${e.clientY}px`
      //   // cloned.style.left = `${e.clientX}px`
      // }}
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
          id={`rbl_image_${dndTargetKey}`}
          style={{
            width: `${width || 100}%`,
            maxHeight: height ? height : undefined || sizes?.height,
            margin: oneCol ? 'auto' : undefined,
          }}
        >
          {!disableChange && oneCol ? (
            <div
              className="image-resize imr-left"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{ zIndex: startResize ? 999 : undefined }}
            >
              <div
                className="hand-image"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDirection('left');
                  onMouseDown(e);
                }}
              ></div>
            </div>
          ) : null}
          {!disableChange ? (
            <div
              className="image-resize-bottom"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{ zIndex: startResize ? 999 : undefined }}
            >
              <div
                className="hand-image"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDirection('vertical');
                  onMouseDown(e, true);
                }}
              ></div>
            </div>
          ) : null}
          {children}
          {!disableChange ? (
            <div
              className="image-resize imr-right"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
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
