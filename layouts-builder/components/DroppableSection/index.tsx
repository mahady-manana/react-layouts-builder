import { useClickAway } from 'react-use';
// import { RgbaColorPicker } from 'react-colorful';
import { SettingIcon } from 'layouts-builder/icons';
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
  dndTargetKey?: string;
  disableDrag: boolean;
  disableChange?: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  // onDropItem: (
  //   e: DragEvent<HTMLDivElement>,
  //   target: DropTargetPlaceEnum,
  // ) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  index,
  dndTargetKey,
  disableDrag,
  section,
  disableChange,
  // onDropItem,
  onDragStart,
}) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [droppableTarget, setDroppableTarget] = useState<string>();
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAway(popoverRef, () => {
    setOpenSetting(false);
  });
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-row');
    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };
  const isHoveredTargetClassName = (conditions: boolean) => {
    return conditions
      ? 'rlb-droppable-section-hover'
      : 'rlb-droppable-section';
  };
  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    setDroppableTarget('');
  };

  return (
    <div className="relative">
      <ResizableContainer resizable>
        {/* {index === 0 && !disableChange ? (
          <div
            className={`${isHoveredTargetClassName(
              droppableTarget === `${dndTargetKey}-top`,
            )}`}
            target-droppable-row={`${dndTargetKey}-top`}
            onDragOver={handleDragOver}
            onDrop={(e) => {
              onDropItem(e, DropTargetPlaceEnum.ROW_TOP);
              setDroppableTarget('');
            }}
            onDragLeave={handleDragOverLeave}
          >
            {droppableTarget === `${dndTargetKey}-top` ? `...` : null}
          </div>
        ) : null} */}
        <div
          className={classNames('rlb-section')}
          draggable={false}
          onDragStart={onDragStart}
          style={{
            background: section.backgroundColor,
            paddingBlock: (section.spacing || 0) * 8,
          }}
        >
          <div
            className="section-content"
            style={{ width: section.width, margin: 'auto' }}
          >
            {children}
          </div>
        </div>
        {/* {!disableChange ? (
          <div
            className={`${isHoveredTargetClassName(
              droppableTarget === `${dndTargetKey}-bottom`,
            )}`}
            target-droppable-row={`${dndTargetKey}-bottom`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragOverLeave}
            onDrop={(e) => {
              onDropItem(e, DropTargetPlaceEnum.ROW_BOTTOM);
              setDroppableTarget('');
            }}
          >
            {droppableTarget === `${dndTargetKey}-bottom`
              ? '...'
              : null}
          </div>
        ) : null} */}
      </ResizableContainer>
    </div>
  );
};
