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
import { ResizableContainer } from 'layouts-builder/components/ResizableContainer/ResizableContainer';
import { DroppableRow } from 'layouts-builder/components/DroppableRow';
import { reorderLayout } from 'layouts-builder/helpers/reorderLayout';
import { changeRowWidth } from 'layouts-builder/helpers/changeRowWidth';
import { changeSectionStyles } from 'layouts-builder/helpers/changeSectionStyles';
import { changeColumnWidth } from 'layouts-builder/helpers/changeColumnWidth';
import { findWidthPercentByPx } from 'layouts-builder/helpers/findWidth';

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
  const handleResizeColumn = (
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
  return (
    <div className="m-auto">
      <div className="min-h-[100px] " ref={containeRef}>
        {renderableLayout.map((section, index) => {
          const isPublic = disableChange ? false : section.container;
          return (
            <DroppableSection
              index={index}
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
              {/* <ResizableContainer
                resizable
                styles={{ width: sectionData.contentWidth }}
              > */}
              {section.rows.map((row, rowIndex) => {
                return (
                  <DroppableRow
                    disableChange={row.isContainer || disableChange}
                    index={rowIndex}
                    key={row.id}
                    section={section}
                    maxWidth={section.width as any}
                    width={row.width as any}
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
                    onDragStart={(e) => {
                      handleDragSectionStart(e, section.id);
                    }}
                    onResize={(width) =>
                      handleResizeRow(width, section.id, row.id)
                    }
                  >
                    {row.columns.map((column) => {
                      return (
                        <ResizableContainer
                          key={column.id}
                          resizable={true}
                          styles={{
                            width: `${Math.round(column.width)}%`,
                          }}
                          type="column"
                          currentWidth={Math.round(column.width)}
                          onResizeColEnd={(init, final) => {
                            console.log(init, final, column.width);
                            const w = findWidthPercentByPx(
                              init,
                              column.width,
                              final,
                            );
                            const newLayouts = changeColumnWidth(
                              actualLayout,
                              {
                                sectionId: section.id,
                                rowId: row.id,
                              },
                              { width: w, colId: column.id },
                            );
                            setActualLayout(newLayouts);
                          }}
                        >
                          <DroppableColumnContainer
                            key={column.id}
                            disableChange={disableChange}
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
                                      disableChange={
                                        disableChange ||
                                        items['id'] ===
                                          'EMPTY_SECTION'
                                      }
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
                                      onClick={() => {
                                        onFocusItem &&
                                          onFocusItem({
                                            sectionId: section.id,
                                            columnId: column.id,
                                            itemKey: items[stableKey],
                                            rowId: row.id,
                                            isSection: false,
                                          });
                                      }}
                                    >
                                      {items['id'] ===
                                        'EMPTY_SECTION' &&
                                      !disableChange ? (
                                        <div>
                                          <p>
                                            Drop or add block here...
                                          </p>
                                        </div>
                                      ) : null}
                                      {items['id'] !== 'EMPTY_SECTION'
                                        ? renderComponent(items, {
                                            columnId: column.id,
                                            itemKey: items[stableKey],
                                            rowId: row.id,
                                            sectionId: section.id,
                                          })
                                        : null}
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
