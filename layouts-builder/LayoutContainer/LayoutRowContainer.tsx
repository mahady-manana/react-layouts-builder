import React, {
  CSSProperties,
  Dispatch,
  DragEvent,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DraggableItem } from '../components';
import { ILayoutSection } from '../interface';
import {
  DestinationType,
  TargetPlaceEnum,
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
import { LayoutDropContainer } from './LayoutDropContainer';

interface LayoutRowContainerProps {
  stableKey: string;
  disabled?: boolean;
  columns: IRenderableColumn[];
  layouts: ILayoutSection[];
  sectionId: string;
  rowId: string;
  isLastSection?: boolean;
  isFirstSection?: boolean;
  dragActive?: boolean;
  needRowTarget?: { top: boolean; bottom: boolean };
  imageSizeFnLoader?: (
    items: any,
  ) => { width?: number; height?: number } | undefined;
  setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
  setDragActive: Dispatch<SetStateAction<boolean>>;
  renderComponent: (item: any, source: SourceType) => ReactNode;
  onFocusItem?: (source: SourceType) => void;
  onLayoutChange: (layouts: ILayoutSection[]) => void;
  imageCheckerFn?: (items: boolean) => boolean;
  onImageResizeFinished?: (items: any, width: number) => void;
}

export const LayoutRowContainer: FC<LayoutRowContainerProps> = ({
  disabled,
  isFirstSection,
  stableKey,
  columns,
  layouts,
  sectionId,
  rowId,
  isLastSection,
  needRowTarget,
  dragActive,
  setDragActive,
  imageSizeFnLoader,
  setActualLayout,
  renderComponent,
  imageCheckerFn,
  onLayoutChange,
  onImageResizeFinished,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>();
  const [resizeBegin, setResizeBegin] = useState<boolean>(false);
  const [widths, setWidths] = useState<number[]>([]);
  const [indexCol, setIndexCol] = useState<number>(0);
  const [initClientX, setInitClientX] = useState<number>();
  const [initWidth, setInitWidth] = useState<number>();
  const [newWidth, setNewWidth] = useState<number>();
  const [nextWidth, setNextWidth] = useState<number>();
  const [waitBeforeUpdate, setWaitBeforeUpdate] =
    useState<number>(500);

  // TARGET DROP STATE
  const [targetDROP, setTargetDROP] = useState<TargetPlaceEnum>();

  // TARGET DESTINATION STATE
  const [destination, setDestination] = useState<DestinationType>({
    columnId: '',
    itemKey: '',
    sectionId: '',
    targetPlace: '' as any,
    rowId: '',
  });

  const resetDrag = () => {
    setDestination({
      columnId: '',
      itemKey: '',
      sectionId: '',
      targetPlace: '' as any,
      rowId: '',
    });
    setTargetDROP(undefined);
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    sectionId: string,
    columnId: string,
    rowId: any,
    itemkey: any,
    el?: HTMLElement,
  ) => {
    e.stopPropagation();

    const itemKeyType = typeof itemkey;
    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);

    const timer = setTimeout(() => {
      setDragActive(true);
    }, 500);
    clearTimeout(timer);
  };

  //   // Drop item to create new column or setion or add item to column
  const handleDropItem = (
    e: DragEvent<HTMLDivElement>,
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

    if (!destination.itemKey && !sourceItemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }
    setDragActive(false);
    const newLayout = reorderLayout(
      layouts,
      source,
      destination,
      destination.targetPlace,
      layoutTarget,
    );

    if (newLayout) {
      setActualLayout(newLayout);
      onLayoutChange(newLayout);
    }
    setTargetDROP(undefined);
    setDestination({
      columnId: '',
      itemKey: '',
      sectionId: '',
      targetPlace: '' as any,
      rowId: '',
    });
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

  // DRAG EVENT
  const handleDragOverItem = (destination: DestinationType) => {
    setDragActive(true);
    setDestination((prev) => ({
      ...prev,
      ...destination,
    }));
  };

  const styleSide = (
    colId: string,
    place: TargetPlaceEnum,
  ): CSSProperties => {
    const conditions =
      destination.columnId === colId &&
      destination.targetPlace === place;
    return {
      visibility: conditions ? 'visible' : 'hidden',
    };
  };

  const needTop = isFirstSection
    ? needRowTarget?.top
    : needRowTarget?.top && columns.length > 1;

  const columnsComonent = React.useMemo(
    () =>
      columns.map((column, index) => {
        return (
          <ResizableContainer
            width={`calc(${widths[index]}% - ${
              columns.length > 1 ? 20 / columns.length : 0
            }px)`}
            key={column.id}
            isLast={columns.length === index + 1}
            isNextTo={index === indexCol + 1}
            resizable={!disabled}
            colNumber={columns.length}
            onMouseDown={(clientX, width) => {
              setIndexCol(index);
              setCurrentColumn(column.id);
              onMouseDown(clientX, width);
            }}
            type="column"
          >
            <div className="rlb-flex">
              {!disabled ? (
                <div
                  className="rbl-side-drop-indicator"
                  style={styleSide(column.id, TargetPlaceEnum.LEFT)}
                ></div>
              ) : null}
              <div key={column.id} className={`rlb-col-inner`}>
                {column.items.map((items, index) => {
                  if (!items) return null;
                  const isImage = imageCheckerFn
                    ? imageCheckerFn(items)
                    : false;
                  return (
                    <LayoutDropContainer
                      targetDROP={
                        destination.itemKey === items[stableKey]
                          ? targetDROP
                          : undefined
                      }
                      setTargetDROP={setTargetDROP}
                      onDragOver={(target) =>
                        handleDragOverItem({
                          columnId: column.id,
                          itemKey: items[stableKey],
                          sectionId: sectionId,
                          targetPlace: target as any,
                          rowId,
                        })
                      }
                      onDrop={(e) => {
                        handleDropItem(e, ILayoutTargetEnum.ITEM);
                      }}
                      onDragLeave={resetDrag}
                      disableChange={disabled}
                      key={index}
                    >
                      <DraggableItem
                        isImage={isImage}
                        disableChange={
                          disabled || items['id'] === 'EMPTY_SECTION'
                        }
                        sizes={
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
                        onDragStart={(e, el) => {
                          if (disabled) {
                            return;
                          }
                          handleDragStart(
                            e,
                            sectionId,
                            column.id,
                            rowId,
                            items[stableKey],
                            el,
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
                    </LayoutDropContainer>
                  );
                })}
              </div>
              {!disabled ? (
                <div
                  className="rbl-side-drop-indicator"
                  style={styleSide(column.id, TargetPlaceEnum.RIGHT)}
                ></div>
              ) : null}
            </div>
          </ResizableContainer>
        );
      }),
    [columns, targetDROP, widths, renderComponent],
  );
  return (
    <>
      <div>
        {needTop && dragActive ? (
          <div
            className="rbl-drop-row-container"
            onDragOver={(e) => {
              e.preventDefault();
              setTargetDROP(TargetPlaceEnum.ROW_TOP);
              handleDragOverItem({
                columnId: '',
                itemKey: undefined,
                sectionId: sectionId,
                targetPlace: TargetPlaceEnum.ROW_TOP,
                rowId,
              });
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setTargetDROP(undefined);
            }}
            onDrop={(e) => {
              handleDropItem(e, ILayoutTargetEnum.ROW);
            }}
          >
            <div
              className="rbl-drop-row-indicator"
              style={{
                visibility:
                  targetDROP === TargetPlaceEnum.ROW_TOP
                    ? 'visible'
                    : 'hidden',
              }}
            ></div>
          </div>
        ) : null}

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
          {columnsComonent}
        </div>
        {isLastSection && needRowTarget?.bottom && dragActive ? (
          <div
            className="rbl-drop-row-container"
            onDragOver={(e) => {
              e.preventDefault();
              setTargetDROP(TargetPlaceEnum.ROW_BOTTOM);
              handleDragOverItem({
                columnId: '',
                itemKey: undefined,
                sectionId: sectionId,
                targetPlace: TargetPlaceEnum.ROW_BOTTOM,
                rowId,
              });
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setTargetDROP(undefined);
            }}
            onDrop={(e) => {
              handleDropItem(e, ILayoutTargetEnum.ROW);
            }}
          >
            <div
              className="rbl-drop-row-indicator"
              style={{
                visibility:
                  targetDROP === TargetPlaceEnum.ROW_BOTTOM
                    ? 'visible'
                    : 'hidden',
              }}
            ></div>
          </div>
        ) : null}
      </div>
    </>
  );
};

// export const LayoutRowContainer = React.memo(
//   LayoutRowContainerComponent,
// );
