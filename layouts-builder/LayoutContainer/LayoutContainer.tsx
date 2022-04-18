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
import { changeColumnWidth } from '../helpers/changeColumnWidth';
import { createLayout } from '../helpers/createLayout';
import { createRenderableLayout } from '../helpers/createRendrableLayout';
import { reorderLayoutItem } from '../helpers/reorderLayout';
import { ILayoutContainer, ILayoutSection } from '../interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  SourceType,
} from '../interface/internalType';
import {
  IRenderableColumn,
  IRenderableLayout,
} from '../interface/renderableInterface';
import '../index.css';

export const LayoutContainer: FC<ILayoutContainer> = ({
  data,
  renderComponent,
  onLayoutChange,
  stableDataKey: stableKey,
  layouts,
  loading,
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
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts]);

  useEffect(() => {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts, loading]);

  useEffect(() => {
    const renderable = createRenderableLayout(
      data,
      actualLayout,
      stableKey,
    );
    setRenderableLayout(renderable);
  }, [actualLayout, data, stableKey]);

  // create new layout if new data is added
  // Do not incldes 'stableKey and layouts and hooks-deps'
  useEffect(() => {
    const newLayouts = createLayout(data, stableKey, layouts);
    setActualLayout(newLayouts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    columnId: string,
    itemkey: any,
  ) => {
    e.stopPropagation();
    const itemKeyType = typeof itemkey;
    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    setIsSectionDragged(false);
  };

  // Drop item to create new column or setion or add item to column
  const handleDropItem = (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
    sectionId: string,
    columnId: string,
    itemKey: any,
  ) => {
    const sourceItemKey = e.dataTransfer.getData('itemKey');
    const isSection = e.dataTransfer.getData('isSection');
    const sourceSectionId = e.dataTransfer.getData('sectionId');
    const sourceColumnKey = e.dataTransfer.getData('colmunId');
    const itemKeyType = e.dataTransfer.getData('itemKeyType');
    const source: SourceType = {
      columnId: sourceColumnKey,
      itemKey:
        itemKeyType === 'number'
          ? parseFloat(sourceItemKey)
          : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
    };
    const destination: DestinationType = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
    };
    const newLayout = reorderLayoutItem(
      actualLayout,
      source,
      destination,
      target,
    );

    setIsSectionDragged(false);
    setActualLayout(newLayout);
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
  const handleResizeEnd = (
    cols: IRenderableColumn[],
    colId: string,
    initialWidth: number,
    colCount: number,
  ) => {
    setIsDragging(false);
    const restWidth = cols.reduce((acc, next) => {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    const diff = 100 - ((currentColWidth || 0) + restWidth);
    const shouldAdd = diff / (colCount - 1);
    const siblingsCols = cols
      .map((colm) => ({
        colId: colm.id,
        width: colm.width + shouldAdd,
      }))
      .filter((col) => col.colId !== colId);

    const newsLayoutModified = changeColumnWidth(
      actualLayout,
      colId,
      currentColWidth || initialWidth,
      siblingsCols,
    );
    setActualLayout(newsLayoutModified);
    // const layouts = addClassnameToColumn(
    //   actualLayout,
    //   colId,
    //   {
    //     className: `w-[${currentColWidth}%]`,
    //     styles: { width: `${currentColWidth}%` }
    //   },
    //   {
    //     className: `w-[${Math.round(restCol)}%]`,
    //     styles: { width: `${Math.round(restCol)}%` }
    //   }
    // )

    setInitialSize(undefined);
    // setActualLayout(layouts)
    setCurentColWidth(undefined);
    setResizedSectionId('');
  };
  const generateNewColumnWidth = (
    cols: IRenderableColumn[],
    colId: string,
    currentWidth: number,
    colCount: number,
  ) => {
    const restWidth = cols.reduce((acc, next) => {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    const diff = 100 - (currentWidth + restWidth);
    const shouldAdd = diff / (colCount - 1);
    const colsWidth = cols.map((colm) => ({
      colId: colm.id,
      width:
        colm.id === colId ? currentWidth : colm.width + shouldAdd,
    }));
    return colsWidth;
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

  return (
    <div className="max-w-[1080px] m-auto py-4">
      <div className="min-h-[100px] " ref={containeRef}>
        {renderableLayout.map((sectionData, index) => {
          return (
            <DroppableSection
              index={index}
              key={sectionData.id}
              dndTargetKey={sectionData.id}
              disableDrag={isDragging}
              onDropItem={(e, target) =>
                handleDropItem(
                  e,
                  target,
                  sectionData.id,
                  '',
                  undefined,
                )
              }
              onDragStart={(e) =>
                handleDragSectionStart(e, sectionData.id)
              }
            >
              <div className="rlb-row">
                {sectionData.columns.map((columnData) => {
                  return (
                    <DroppableColumnContainer
                      initialSize={initialSize}
                      disableDrag={isDragging}
                      key={columnData.id}
                      isSection={isSectionDragged}
                      styles={columnData.styles}
                      className={columnData.className}
                      dndTargetKey={columnData.id}
                      resizingWidth={
                        resizedSectionId === sectionData.id
                          ? generateNewColumnWidth(
                              sectionData.columns,
                              initialSize?.colId as string,
                              currentColWidth || columnData.width,
                              sectionData.columns.length,
                            ).find((co) => co.colId === columnData.id)
                              ?.width
                          : undefined
                      }
                      width={columnData.width}
                      currentColumLength={
                        sectionData.columns.length || 1
                      }
                      onDropItem={(e, target) =>
                        handleDropItem(
                          e,
                          target,
                          sectionData.id,
                          columnData.id,
                          undefined,
                        )
                      }
                      onResizeStart={handleResizeStart}
                      onResize={(e, isInvert) => {
                        setResizedSectionId(sectionData.id);
                        handleResize(
                          e,
                          columnData.id,
                          sectionData.id,
                          isInvert,
                        );
                      }}
                      onResizeEnd={() =>
                        handleResizeEnd(
                          sectionData.columns,
                          columnData.id,
                          columnData.width,
                          sectionData.columns.length || 1,
                        )
                      }
                    >
                      <div
                        key={columnData.id}
                        className={`rlb-col-inner  ${''}`}
                      >
                        {columnData.items.map((items) => {
                          return (
                            <DroppableColumnItem
                              disableDrag={disableDrag}
                              isSection={isSectionDragged}
                              key={items[stableKey]}
                              dndTargetKey={items[stableKey]}
                              currentColumLength={
                                columnData.items.length || 1
                              }
                              onDropItem={(e, target) =>
                                handleDropItem(
                                  e,
                                  target,
                                  sectionData.id,
                                  columnData.id,
                                  items[stableKey],
                                )
                              }
                            >
                              <DraggableItem
                                disableDrag={disableDrag}
                                dndTargetKey={items[stableKey]}
                                onDragStart={(e) => {
                                  handleDragStart(
                                    e,
                                    sectionData.id,
                                    columnData.id,
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
                  );
                })}
              </div>
            </DroppableSection>
          );
        })}
      </div>
    </div>
  );
};
