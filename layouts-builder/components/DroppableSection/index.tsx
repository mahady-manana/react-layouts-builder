import React, { FC, ReactNode, DragEvent } from 'react';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
import classNames from 'classnames';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer';

interface DraggableProps {
  section: IRenderableLayout;
  children: ReactNode;
  resizable?: boolean;
  width?: number;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onClickSection: () => void;
  onResize?: (currentSize: number) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  section,
  width,
  resizable,
  onDragStart,
  onClickSection,
  onResize,
}) => {
  return (
   
      <div
        className={classNames('rlb-section rlb-section-container ')}
        // draggable={false}
        // onDragStart={onDragStart}
        style={{
          background: section.backgroundImage
            ? `url(${section.backgroundImage})`
            : section.backgroundColor,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="rlb-section-content"
          style={{ width: section.width, margin: 'auto' }}
        >
          {children}
        </div>
      </div>
  );
};
