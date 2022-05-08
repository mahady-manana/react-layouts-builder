import React, {
  Dispatch,
  DragEvent,
  FC,
  ReactNode,
  SetStateAction,
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
import { IRenderableColumn } from '../interface/renderableInterface';
import '../index.css';
import { ResizableContainer } from 'layouts-builder/components/ResizableContainer/ResizableContainer';
import { reorderLayout } from 'layouts-builder/helpers/reorderLayout';
import { changeColumnWidth } from 'layouts-builder/helpers/changeColumnWidth';
import { findWidthPercentByPx } from 'layouts-builder/helpers/findWidth';

interface LayoutRowContainerProps {
  stableKey: string;
  disabled?: boolean;
  columns: IRenderableColumn[];
  layouts: ILayoutSection[];
  sectionId: string;
  rowId: string;
  setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
  renderComponent: (item: any, source: SourceType) => ReactNode;
  onFocusItem?: (source: SourceType) => void;
}

export const LayoutRowContainer: FC<LayoutRowContainerProps> = ({
  disabled,
  stableKey,
  columns,
  layouts,
  sectionId,
  rowId,
  setActualLayout,
  renderComponent,
  onFocusItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>();
  const [addToWidth, setAddToWidth] = useState<number>(0);

  const [isSectionDragged, setIsSectionDragged] =
    useState<boolean>(false);

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

  //   // Drop item to create new column or setion or add item to column
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
      layouts,
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

  const onResize = (w: number) => {
    const containerWidth = containerRef.current?.clientWidth;
    console.log('Width', w, containerWidth);
  };

  return (
    <div
      className="section-content flex"
      style={{ width: '100%', margin: 'auto' }}
      ref={containerRef}
    >
      {columns.map((column) => {
        return (
          <ResizableContainer
            isCol
            key={column.id}
            resizable={true}
            colNumber={columns.length}
            styles={{
              width:
                addToWidth && currentColumn !== column.id
                  ? `${Math.round(column.width + addToWidth)}%`
                  : `${Math.round(column.width)}%`,
            }}
            type="column"
            currentWidth={Math.round(column.width)}
            onResize={(w, init) => {
              setCurrentColumn(column.id);
              onResize(w);
              const width = findWidthPercentByPx(
                init,
                column.width,
                w,
              );
              const rest = column.width - width;
              const add = rest / (columns.length - 1);

              setAddToWidth((prev) =>
                Math.abs((prev || 0) - add) > 5 ? prev : add,
              );
            }}
            onResizeColEnd={(init, final) => {
              setCurrentColumn(undefined);
              const w = findWidthPercentByPx(
                init,
                column.width,
                final,
              );
              const newLayouts = changeColumnWidth(
                layouts,
                {
                  sectionId: sectionId,
                  rowId: rowId,
                },
                { width: w, colId: column.id, init: column.width },
              );
              setAddToWidth(0);
              setActualLayout(newLayouts);
              // handleFinishResize(w, column.id);
            }}
          >
            <DroppableColumnContainer
              key={column.id}
              disableChange={disabled}
              //   isSection={isSectionDragged} TO DO
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
                  sectionId,
                  column.id,
                  rowId,
                  undefined,
                  ILayoutTargetEnum.COL,
                )
              }
            >
              <div key={column.id} className={`rlb-col-inner`}>
                {column.items.map((items, index) => {
                  if (!items) return null;

                  return (
                    <DroppableColumnItem
                      disableChange={disabled}
                      isSection={isSectionDragged}
                      key={index}
                      dndTargetKey={items[stableKey]}
                      onDropItem={(e, target) =>
                        handleDropItem(
                          e,
                          target,
                          sectionId,
                          column.id,
                          rowId,
                          items[stableKey],
                          ILayoutTargetEnum.ITEM,
                        )
                      }
                    >
                      <DraggableItem
                        disableChange={
                          disabled || items['id'] === 'EMPTY_SECTION'
                        }
                        dndTargetKey={items[stableKey]}
                        onDragStart={(e) => {
                          handleDragStart(
                            e,
                            sectionId,
                            column.id,
                            rowId,
                            items[stableKey],
                          );
                        }}
                        onClick={() => {
                          onFocusItem &&
                            onFocusItem({
                              sectionId: sectionId,
                              columnId: column.id,
                              itemKey: items[stableKey],
                              rowId: rowId,
                              isSection: false,
                            });
                        }}
                      >
                        {items['id'] === 'EMPTY_SECTION' &&
                        !disabled ? (
                          <div>
                            <p>Drop or add block here...</p>
                          </div>
                        ) : null}
                        {items['id'] !== 'EMPTY_SECTION'
                          ? renderComponent(items, {
                              columnId: column.id,
                              itemKey: items[stableKey],
                              rowId: rowId,
                              sectionId: sectionId,
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
    </div>
  );
};
