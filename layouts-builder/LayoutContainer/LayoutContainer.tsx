import React, {
  DragEvent,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  DraggableItem,
  DroppableColumnItem,
  DroppableSection,
  DroppableColumnContainer,
} from '../components';
// import { changeColumnWidth } from '../helpers/changeColumnWidth';
import { createLayout } from '../helpers/createLayout';
import { createRenderableLayout } from '../helpers/createRendrableLayout';
// import { reorderLayoutItem } from '../helpers/reorderLayout';
import { ILayoutContainer, ILayoutSection } from '../interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  ILayoutTargetEnum,
  SourceType,
} from '../interface/internalType';
import {
  IRenderableColumn,
  IRenderableLayout,
} from '../interface/renderableInterface';
import '../index.css';
// import { changeSectionStyles } from 'layouts-builder/helpers/changeSectionStyles';
import { ResizableContainer } from 'layouts-builder/components/ResizableContainer/ResizableContainer';
import { DroppableRow } from 'layouts-builder/components/DroppableRow';
import { reorderLayout } from 'layouts-builder/helpers/reorderLayout';
import { changeRowWidth } from 'layouts-builder/helpers/changeRowWidth';
import { gridValue } from 'layouts-builder/helpers/gridValue';
import { changeSectionStyles } from 'layouts-builder/helpers/changeSectionStyles';

export const LayoutContainer: FC<ILayoutContainer> = ({
  data,
  renderComponent,
  onLayoutChange,
  stableDataKey: stableKey,
  layouts,
  loading,
  disableChange,
  onClickSection,
}) => {
  const containeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [disableDrag, setDisableDrag] = useState<boolean>(false);
  const [actualLayout, setActualLayout] = useState<ILayoutSection[]>(
    [],
  );
  const [isSectionDragged, setIsSectionDragged] =
    useState<boolean>(false);
  const [renderableLayout, setRenderableLayout] = useState<
    IRenderableLayout[]
  >([]);
  const [initialSize, setInitialSize] = useState<{
    widthPx: number;
    currentPercentWidth: number;
    onePixel: number;
    initialPosPx: number;
    colId: string;
  }>();
  const [currentColWidth, setCurentColWidth] = useState<number>();
  const [resizedSectionId, setResizedSectionId] = useState<string>();

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
  }, [actualLayout, data, stableKey]);

  useEffect(() => {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    columnId: string,
    rowId: any,
    itemkey: any,
  ) => {
    e.stopPropagation();

    const itemKeyType = typeof itemkey;
    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);
    setIsSectionDragged(false);
  };

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

  const handleResize = (
    e: DragEvent<HTMLDivElement>,
    colmunId: string,
    sectionId: string,
    isInvert?: boolean,
  ) => {
    if (!initialSize) return;
    setResizedSectionId(sectionId);
    const containerWidth = containeRef.current?.offsetWidth || 0;
    const onPercentInPixel = containerWidth / 100;

    const offset2 = e.clientX - initialSize.initialPosPx;
    const offsetPercent = offset2 / onPercentInPixel;
    const initialWidth = initialSize.currentPercentWidth;
    const newWidth = isInvert
      ? initialWidth - offsetPercent
      : initialWidth + offsetPercent;
    setIsDragging(true);
    if (e.clientX === 0) {
      setDisableDrag(false);
      return;
    }

    setDisableDrag(true);
    setCurentColWidth(Math.round(newWidth));
  };
  const handleResizeStart = (
    colId: string,
    widthPx: number,
    currentPercentWidth: number,
    onePixel: number,
    initialPosPx: number,
  ) => {
    setIsDragging(true);
    setInitialSize({
      widthPx,
      currentPercentWidth,
      onePixel,
      initialPosPx,
      colId,
    });
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
    <div className="m-auto py-4">
      <div className="min-h-[100px] " ref={containeRef}>
        {renderableLayout.map((section, index) => {
          return (
            <DroppableSection
              index={index}
              key={section.id}
              section={section}
              resizable={!disableChange}
              onDragStart={(e) => {
                handleDragSectionStart(e, section.id);
              }}
              onClickSection={() => {
                const layout = actualLayout.find(
                  (layout) => layout.id === section.id,
                );
                if (layout && onClickSection) {
                  onClickSection(layout);
                }
              }}
              onResize={(width) =>
                handleResizeSection(width, section.id)
              }
            >
              {/* <ResizableContainer
                resizable
                styles={{ width: sectionData.contentWidth }}
              > */}
              {section.rows.map((row, rowIndex) => {
                return (
                  <DroppableRow
                    disableChange={disableChange}
                    index={rowIndex}
                    key={row.id}
                    section={section}
                    maxWidth={section.width as any}
                    width={row.width}
                    dndTargetKey={row.id}
                    disableDrag={isDragging}
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
                    onDragStart={(e) => {
                      handleDragSectionStart(e, section.id);
                    }}
                    onResize={(width) =>
                      handleResizeRow(width, section.id, row.id)
                    }
                  >
                    {row.columns.map((column) => {
                      const width = 100 / row.columns.length;

                      return (
                        <ResizableContainer
                          key={column.id}
                          // resizable={row.columns.length > 1}
                          styles={{ width: `${Math.round(width)}%` }}
                          type="column"
                          currentWidth={Math.round(width)}
                        >
                          <DroppableColumnContainer
                            key={column.id}
                            disableChange={disableChange}
                            initialSize={initialSize}
                            disableDrag={isDragging}
                            isSection={isSectionDragged}
                            styles={column.styles}
                            className={column.className}
                            dndTargetKey={column.id}
                            width={column.width}
                            currentColumLength={
                              1
                              // sectionData.columns.length || 1
                            }
                            onDropItem={(e, target) =>
                              handleDropItem(
                                e,
                                target,
                                section.id,
                                column.id,
                                row.id,
                                undefined,
                                ILayoutTargetEnum.COL,
                              )
                            }
                          >
                            <div
                              key={column.id}
                              className={`rlb-col-inner  ${''}`}
                            >
                              {column.items.map((items, index) => {
                                if (!items) return null;

                                return (
                                  <DroppableColumnItem
                                    disableChange={disableChange}
                                    isSection={isSectionDragged}
                                    key={index}
                                    dndTargetKey={items[stableKey]}
                                    onDropItem={(e, target) =>
                                      handleDropItem(
                                        e,
                                        target,
                                        section.id,
                                        column.id,
                                        row.id,
                                        items[stableKey],
                                        ILayoutTargetEnum.ITEM,
                                      )
                                    }
                                  >
                                    <DraggableItem
                                      disableChange={disableChange}
                                      dndTargetKey={items[stableKey]}
                                      onDragStart={(e) => {
                                        handleDragStart(
                                          e,
                                          section.id,
                                          column.id,
                                          row.id,
                                          items[stableKey],
                                        );
                                      }}
                                    >
                                      {renderComponent(items)}
                                    </DraggableItem>
                                  </DroppableColumnItem>
                                );
                              })}
                            </div>
                          </DroppableColumnContainer>
                        </ResizableContainer>
                      );
                    })}
                  </DroppableRow>
                );
              })}
              {/* </ResizableContainer> */}
            </DroppableSection>
          );
        })}
      </div>
    </div>
  );
};
