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

interface DraggableProps {
  sections: IRenderableLayout;
  index: number;
  children: ReactNode;
  dndTargetKey?: string;
  disableDrag: boolean;
  disableChange?: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
  onChangeSectionStyles?: (
    key: string,
    value: string | number,
  ) => void;
}
export const DroppableSection: FC<DraggableProps> = ({
  children,
  index,
  dndTargetKey,
  disableDrag,
  sections,
  disableChange,
  onDropItem,
  onDragStart,
  onChangeSectionStyles,
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
    const targetDom = targetEl.getAttribute(
      'target-droppable-section',
    );
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

  const handleClickSetting = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpenSetting(!openSetting);
  };

  const handleSectionStyles = (
    key: string,
    value: string | number,
  ) => {
    onChangeSectionStyles && onChangeSectionStyles(key, value);
  };

  return (
    <div className="relative">
      {index === 0 && !disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `${dndTargetKey}-top`,
          )}`}
          target-droppable-section={`${dndTargetKey}-top`}
          onDragOver={handleDragOver}
          onDrop={(e) => {
            onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
            setDroppableTarget('');
          }}
          onDragLeave={handleDragOverLeave}
        >
          {droppableTarget === `${dndTargetKey}-top`
            ? `Drop here as a section...`
            : null}
        </div>
      ) : null}
      <div
        className={classNames(
          'rlb-section',
          !disableChange ? 'rlb-section-hover' : '',
        )}
        draggable={!disableChange}
        onDragStart={onDragStart}
        style={{
          background: sections.backgroundColor,
          paddingBlock: (sections.spacing || 0) * 8,
        }}
      >
        {!disableChange ? (
          <div
            className="rlb-section-settings"
            onClick={handleClickSetting}
          >
            <span>Settings</span>
            <SettingIcon />
          </div>
        ) : null}

        <div
          className="section-content"
          style={{ maxWidth: sections.width, margin: 'auto' }}
        >
          {children}
        </div>
      </div>
      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassName(
            droppableTarget === `${dndTargetKey}-bottom`,
          )}`}
          target-droppable-section={`${dndTargetKey}-bottom`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={(e) => {
            onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
            setDroppableTarget('');
          }}
        >
          {droppableTarget === `${dndTargetKey}-bottom`
            ? 'Drop here as a section...'
            : null}
        </div>
      ) : null}
      {openSetting && !disableChange ? (
        <div className="rlb-section-setting-modal" ref={popoverRef}>
          <div className="p-2 bg-gray-200">
            <h5>Section settings</h5>
          </div>
          <div className="p-4" style={{ padding: 20 }}>
            {/* <div>
              <div className="p-2">
                <ColorPicker
                  label="Background color "
                  defaultColor={hexToRGBA('#fff') as Rgba}
                />
              </div>
            </div> */}
            <div className="p-2">
              <div>
                <h5>Content width :</h5>
                <div className="p-2 rlb-range-input">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sections.contentWidth || 100}
                    onChange={(e) => {
                      handleSectionStyles(
                        'contentWidth',
                        parseFloat(e.target.value),
                      );
                    }}
                  />
                  <span className="range-value">
                    <input
                      min={0}
                      max={100}
                      className="rlb-range-input-nb"
                      type="number"
                      value={sections.contentWidth || 100}
                      onChange={(e) => {
                        handleSectionStyles(
                          'contentWidth',
                          parseFloat(e.target.value),
                        );
                      }}
                    />
                    (%)
                  </span>
                </div>
              </div>
              <div>
                <h5>Max. Content width : </h5>
                <div className="p-2 rlb-range-input">
                  <input
                    type="range"
                    min={320}
                    max={1920}
                    value={sections.width || 1080}
                    onChange={(e) => {
                      handleSectionStyles(
                        'width',
                        parseFloat(e.target.value),
                      );
                    }}
                  />
                  <span className="range-value">
                    <input
                      min={320}
                      max={1920}
                      className="rlb-range-input-nb"
                      type="number"
                      value={sections.width || 1080}
                      onChange={(e) => {
                        handleSectionStyles(
                          'width',
                          parseFloat(e.target.value),
                        );
                      }}
                    />
                    (px)
                  </span>
                </div>
              </div>
              <div>
                <h5>Section spacing : </h5>
                <div className="p-2 rlb-range-input">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={sections.spacing}
                    onChange={(e) => {
                      handleSectionStyles(
                        'spacing',
                        parseFloat(e.target.value),
                      );
                    }}
                  />
                  <span className="range-value">
                    <input
                      className="rlb-range-input-nb"
                      type="number"
                      min={0}
                      max={10}
                      value={sections.spacing}
                      onChange={(e) => {
                        handleSectionStyles(
                          'spacing',
                          parseFloat(e.target.value),
                        );
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
