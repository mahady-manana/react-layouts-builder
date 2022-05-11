import React, {
  DragEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DroppableSection } from '../components';
import { createRenderableLayout } from '../helpers/createRendrableLayout';
import { ILayoutContainer, ILayoutSection } from '../interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  ILayoutTargetEnum,
  SourceType,
} from '../interface/internalType';
import { IRenderableLayout } from '../interface/renderableInterface';
import '../index.css';
import { DroppableRow } from 'layouts-builder/components/DroppableRow';
import { reorderLayout } from 'layouts-builder/helpers/reorderLayout';
import { changeRowWidth } from 'layouts-builder/helpers/changeRowWidth';
import { changeSectionStyles } from 'layouts-builder/helpers/changeSectionStyles';
import { LayoutRowContainer } from './LayoutRowContainer';

export const LayoutContainer: FC<ILayoutContainer> = ({
  data,
  renderComponent,
  onLayoutChange,
  stableDataKey: stableKey,
  layouts,
  disableChange,
  onClickSection,
  onFocusItem,
}) => {
  const containeRef = useRef<HTMLDivElement>(null);
  const [actualLayout, setActualLayout] = useState<ILayoutSection[]>(
    [],
  );
  const [isSectionDragged, setIsSectionDragged] =
    useState<boolean>(false);
  const [renderableLayout, setRenderableLayout] = useState<
    IRenderableLayout[]
  >([]);

  useEffect(() => {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);

  useEffect(() => {
    if (actualLayout.length > 0) {
      const renderable = createRenderableLayout(
        data,
        actualLayout,
        stableKey,
      );

      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]);

  useEffect(() => {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout]);

  // Drop item to create new column or setion or add item to column
  const handleDropItem = (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
    sectionId: string,
    columnId: string,
    rowId: any,
    itemKey: any,
    layoutTarget: ILayoutTargetEnum,
  ) => {
    const sourceItemKey = e.dataTransfer.getData('itemKey');
    const isSection = e.dataTransfer.getData('isSection');
    const sourceSectionId = e.dataTransfer.getData('sectionId');
    const sourceColumnKey = e.dataTransfer.getData('colmunId');
    const sourceRowId = e.dataTransfer.getData('rowId');
    const itemKeyType = e.dataTransfer.getData('itemKeyType');

    const source: SourceType = {
      columnId: sourceColumnKey,
      itemKey:
        itemKeyType === 'number'
          ? parseFloat(sourceItemKey)
          : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
      rowId: sourceRowId,
    };
    const destination: DestinationType = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
      rowId,
    };
    if (!itemKey && !sourceItemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    const newLayout = reorderLayout(
      actualLayout,
      source,
      destination,
      target,
      layoutTarget,
    );

    setIsSectionDragged(false);
    if (newLayout) {
      setActualLayout(newLayout);
    }
  };

  const handleDragSectionStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
  ) => {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
    setIsSectionDragged(true);
  };

  // Resize row

  const handleResizeRow = (
    currentWidth: number,
    sectionId: any,
    rowId: any,
  ) => {
    const newLayouts = changeRowWidth(actualLayout, {
      rowId,
      sectionId,
      width: currentWidth,
    });
    setActualLayout(newLayouts);
  };

  const handleResizeSection = (
    currentWidth: number,
    sectionId: any,
  ) => {
    const newLayouts = changeSectionStyles(actualLayout, sectionId, {
      width: currentWidth,
    });
    setActualLayout(newLayouts);
  };

  return (
    <div className="m-auto">
      <div className="min-h-[100px] " ref={containeRef}>
        {renderableLayout.map((section, index) => {
          const isPublic = disableChange ? false : section.container;
          return (
            <DroppableSection
              key={section.id}
              section={section}
              width={section.width as number}
              resizable={isPublic}
              onDragStart={(e) => {
                handleDragSectionStart(e, section.id);
              }}
              onClickSection={() => {
                const layout = actualLayout.find(
                  (layout) => layout.id === section.id,
                );
                if (layout && onClickSection && !disableChange) {
                  onClickSection(layout);
                }
              }}
              onResize={(width) =>
                handleResizeSection(width, section.id)
              }
            >
              {section.rows.map((row, rowIndex) => {
                return (
                  <DroppableRow
                    disableChange={row.isContainer || disableChange}
                    index={rowIndex}
                    key={row.id}
                    dndTargetKey={row.id}
                    onDropItem={(e, target) =>
                      handleDropItem(
                        e,
                        target,
                        section.id,
                        '',
                        row.id,
                        undefined,
                        ILayoutTargetEnum.ROW,
                      )
                    }
                  >
                    <LayoutRowContainer
                      stableKey={stableKey}
                      layouts={actualLayout}
                      columns={row.columns}
                      sectionId={section.id}
                      rowId={row.id}
                      disabled={disableChange}
                      renderComponent={renderComponent}
                      setActualLayout={setActualLayout}
                    />
                  </DroppableRow>
                );
              })}
            </DroppableSection>
          );
        })}
      </div>
    </div>
  );
};
