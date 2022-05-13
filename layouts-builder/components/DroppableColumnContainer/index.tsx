import classnames from 'classnames';
import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useRef,
  CSSProperties,
} from 'react';
import { TargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  currentColumLength: number;
  width: number | string;
  disableChange?: boolean;
  isSection?: boolean;
  isDragging?: boolean
  className?: string;
  styles?: CSSProperties;
  resizingWidth?: number;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: TargetPlaceEnum,
  ) => void;
}
export const DroppableColumnContainer: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  isSection,
  className,
  disableChange,
  isDragging,
  onDropItem,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();
  const [hasDragOVer, setHasDragOVer] = useState(false)
  const columnRef = useRef<HTMLDivElement>(null);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setHasDragOVer(true)
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDroppableTarget('');
  };
  const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, TargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };
  const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, TargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  return (
    <div
      className={classNames(
        'rlb-col',
        // `w-[${widthNumber}%]`,
        className,
      )}
      ref={columnRef}
      onDragOver={() => setHasDragOVer(true)}
      onMouseOver={() => setHasDragOVer(false)}
      
    >
      {!disableChange ? (
        <div
          className={classnames(
            droppableTarget === `${dndTargetKey}-left`
              ? 'rlb-droppable-side-hover'
              : '',
            'ds-left rlb-droppable-side',
          )}
          target-droppable-item={`${dndTargetKey}-left`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToLeft}
          // style={hasDragOVer ? {display: "block", zIndex : 1999}: {}}
        ></div>
      ) : null}

      {children}

      {!disableChange ? (
        <div
          className={classnames(
            droppableTarget === `${dndTargetKey}-right`
              ? 'rlb-droppable-side-hover'
              : '',
            'ds-right rlb-droppable-side',
          )}
          target-droppable-item={`${dndTargetKey}-right`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToRigth}

          // style={hasDragOVer ? {display: "block", zIndex : 1999}: {}}
        ></div>
      ) : null}
    </div>
  );
};
