import { useClickAway } from 'react-use';
// import { RgbaColorPicker } from 'react-colorful';
import { DefaultDragIcon } from 'layouts-builder/icons';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  SyntheticEvent,
  useRef,
} from 'react';
import {
  DropTargetPlaceEnum,
  // Rgba,
} from '../../interface/internalType';
// import ColorPicker from '../colorPicker';
// import { hexToRGBA } from 'layouts-builder/helpers/colorHelper';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
import classNames from 'classnames';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer';

interface DraggableProps {
  section: IRenderableLayout;
  index: number;
  children: ReactNode;
  resizable?: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onClickSection: () => void;
  onResize?: (currentSize: number) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  section,
  resizable,
  onDragStart,
  onClickSection,
  onResize,
}) => {
  console.log(section.backgroundImage);

  return (
    <ResizableContainer
      resizable={resizable}
      noPadding
      onClick={onClickSection}
      type="container"
      onResize={onResize}
    >
      <div
        className={classNames('rlb-section rlb-section-container ')}
        draggable={false}
        onDragStart={onDragStart}
        style={{
          background: section.backgroundImage
            ? `url(${section.backgroundImage}) no-repeat center`
            : section.backgroundColor,
          backgroundSize: 'cover',
          paddingBlock: (section.spacing || 0) * 8,
        }}
      >
        <div
          className="rlb-section-content"
          style={{ width: section.width, margin: 'auto' }}
        >
          {children}
        </div>
      </div>
    </ResizableContainer>
  );
};
