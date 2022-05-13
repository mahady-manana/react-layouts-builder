import React, {
  Dispatch,
  DragEvent,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  DraggableItem,
  DroppableColumnItem,
  DroppableColumnContainer,
} from '../components';
import { ILayoutSection } from '../interface';
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
import classNames from 'classnames';
import { gridValue } from 'layouts-builder/helpers/gridValue';

interface LayoutRowContainerProps {
  stableKey: string;
  disabled?: boolean;
  columns: IRenderableColumn[];
  layouts: ILayoutSection[];
  sectionId: string;
  rowId: string;
  imageSizeFnLoader?: (items: any) => number | undefined;
  setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
  renderComponent: (item: any, source: SourceType) => ReactNode;
  onFocusItem?: (source: SourceType) => void;
  onLayoutChange: (layouts: ILayoutSection[]) => void;
  imageCheckerFn?: (items: boolean) => boolean;
  onImageResizeFinished?: (items: any, width: number) => void;
}

export const LayoutRowContainer: FC<LayoutRowContainerProps> = ({
  disabled,
  stableKey,
  columns,
  layouts,
  sectionId,
  rowId,
  imageSizeFnLoader,
  setActualLayout,
  renderComponent,
  imageCheckerFn,
  onLayoutChange,
  onImageResizeFinished,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<boolean>(false);
  const [currentColumn, setCurrentColumn] = useState<string>();
  const [addToWidth, setAddToWidth] = useState<number>(0);
  const [resizeBegin, setResizeBegin] = useState<boolean>(false);
  const [widths, setWidths] = useState<number[]>([]);
  const [indexCol, setIndexCol] = useState<number>(0);
  const [initClientX, setInitClientX] = useState<number>();
  const [initWidth, setInitWidth] = useState<number>();
  const [newWidth, setNewWidth] = useState<number>();
  const [nextWidth, setNextWidth] = useState<number>();
  const [waitBeforeUpdate, setWaitBeforeUpdate] =
    useState<number>(500);

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
    setDragStart(true);
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
    setDragStart(false);
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
      onLayoutChange(newLayout);
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (resizeBegin) {
      if (e.clientX === 0 || !initClientX || !initWidth) return;

      const diff = initClientX - e.clientX;
      const needX2 = columns.length === 1;

      const add = needX2 ? diff * 2 : diff * 1;
      // const addition = left ? add : -add;
      const cWidth = initWidth - add;

      const w = findWidthPercentByPx(
        initWidth,
        columns[indexCol].width,
        cWidth,
        true,
      );

      const old = columns[indexCol].width;
      const oldNext = columns[indexCol + 1].width;

      const rest = oldNext + (old - w);
      const newWidths = widths.map((wd, index) => {
        if (index === indexCol) return w;
        if (index === indexCol + 1) {
          setNextWidth(rest);

          return rest;
        }
        return wd;
      });
      setWaitBeforeUpdate(500);
      setNewWidth(w);
      setTimeout(() => {
        setWidths(newWidths);
      }, 250);
    }
  };
  const onMouseDown = (clientX: number, width: number) => {
    // console.log("DOWN", clientX, width);
    setInitClientX(clientX);
    setInitWidth(width);
    setResizeBegin(true);
  };

  useEffect(() => {
    if (waitBeforeUpdate > 10) {
      const timer = setTimeout(() => {
        setWaitBeforeUpdate((prev) => prev - 10);
      }, 250);
      clearTimeout(timer);
    }
    if (waitBeforeUpdate < 10) {
      runIt();
    }
  }, [waitBeforeUpdate]);

  const runIt = () => {
    if (nextWidth && newWidth) {
      const newLayouts = changeColumnWidth(
        layouts,
        {
          rowId: rowId,
          sectionId: sectionId,
        },
        {
          colId: currentColumn,
          next: nextWidth,
          width: newWidth,
        },
      );

      setActualLayout(newLayouts);
      onLayoutChange(newLayouts);
      setNextWidth(0);
      setNewWidth(0);
    }
  };

  const onMouseUp = (e: MouseEvent<HTMLElement>) => {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };
  const onMousLeave = (e: MouseEvent<HTMLElement>) => {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };

  useEffect(() => {
    if (columns.length) {
      setWidths(columns.map((col) => col.width));
    }
  }, [columns]);

  return (
    <div
      className={classNames(
        'section-content flex',
        resizeBegin ? 'rbl-resizing' : '',
      )}
      style={{ width: '100%', margin: 'auto' }}
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMousLeave}
    >
      {columns.map((column, index) => {
        return (
          <ResizableContainer
            width={`calc(${widths[index]}% - ${
              40 / columns.length
            }px)`}
            key={column.id}
            isLast={columns.length === index + 1}
            isNextTo={index === indexCol + 1}
            resizable={true}
            colNumber={columns.length}
            onMouseDown={(clientX, width) => {
              setIndexCol(index);
              setCurrentColumn(column.id);
              onMouseDown(clientX, width);
            }}
            type="column"
          >
            <DroppableColumnContainer
              key={column.id}
              disableChange={resizeBegin ? true : disabled}
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
                  const isImage = imageCheckerFn
                    ? imageCheckerFn(items)
                    : false;
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
                        isImage={isImage}
                        disableChange={
                          disabled || items['id'] === 'EMPTY_SECTION'
                        }
                        imageWidth={
                          imageSizeFnLoader
                            ? imageSizeFnLoader(items)
                            : undefined
                        }
                        oneCol={columns.length === 1}
                        dndTargetKey={items[stableKey]}
                        onImageResizeFinished={(w) =>
                          onImageResizeFinished
                            ? onImageResizeFinished(items, w)
                            : undefined
                        }
                        onDragStart={(e) => {
                          handleDragStart(
                            e,
                            sectionId,
                            column.id,
                            rowId,
                            items[stableKey],
                          );
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
