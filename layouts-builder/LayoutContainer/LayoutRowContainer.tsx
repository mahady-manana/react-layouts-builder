import React, {
  CSSProperties,
  Dispatch,
  DragEvent,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DraggableItem } from '../components';
import { ContainerSource, ILayoutSection } from '../interface';
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
import { AppContext } from 'layouts-builder/Context/AppContext';
import { useContainerIdentifier } from 'layouts-builder/hooks/useContainerIdentifier';

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
  colResize: boolean;
  needRowTarget?: { top: boolean; bottom: boolean };
  maxColumns?: number;
  imageSizeFnLoader?: (
    items: any,
  ) => { width?: number; height?: number } | undefined;
  setActualLayout: Dispatch<SetStateAction<ILayoutSection[]>>;
  setDragActive: Dispatch<SetStateAction<boolean>>;
  renderComponent: (item: any, source: SourceType) => ReactNode;
  onFocusItem?: (source: SourceType) => void;
  onLayoutChange: (layouts: ILayoutSection[]) => void;
  imageCheckerFn?: (items: boolean) => boolean;
  onImageResizeFinished?: (
    items: any,
    sizes: { width?: number; height?: number },
  ) => void;
  onClickCol: (source: ContainerSource) => void;
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
  maxColumns,
  setDragActive,
  imageSizeFnLoader,
  setActualLayout,
  renderComponent,
  imageCheckerFn,
  onLayoutChange,
  onImageResizeFinished,
  onClickCol,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCountReach, setColumnCountReach] =
    useState<boolean>(false);
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

  const { isColumnContainer } = useContainerIdentifier();
  const { source, setSource, setIsDragStart } =
    useContext(AppContext);
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

  //   // Drop item to create new column or setion or add item to column
  const handleDropItem = (
    e: DragEvent<HTMLDivElement>,
    layoutTarget: ILayoutTargetEnum,
    colNb?: 'SINGLE' | 'MULTI',
  ) => {
    setIsDragStart(false);
    if (!source) return;

    if (
      layoutTarget !== ILayoutTargetEnum.ROW &&
      !destination.itemKey
    ) {
      // this is used to prevent drag resize to create new item
      return;
    }

    setDragActive(false);

    const destinationPlace = () => {
      if (
        colNb === 'SINGLE' &&
        destination.targetPlace !== TargetPlaceEnum.LEFT &&
        destination.targetPlace !== TargetPlaceEnum.RIGHT
      ) {
        if (destination.targetPlace === TargetPlaceEnum.BOTTOM) {
          return TargetPlaceEnum.ROW_BOTTOM;
        }
        return TargetPlaceEnum.ROW_TOP;
      }
      return destination.targetPlace;
    };
    const targetedLayout =
      colNb === 'SINGLE' &&
      destination.targetPlace !== TargetPlaceEnum.LEFT &&
      destination.targetPlace !== TargetPlaceEnum.RIGHT
        ? ILayoutTargetEnum.ROW
        : layoutTarget;

    const newLayout = reorderLayout(
      layouts,
      source,
      destination,
      destinationPlace(),
      targetedLayout,
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
    setSource(undefined);
  };

  useEffect(() => {
    const isReach = columns.length >= (maxColumns || 15);
    if (isReach) {
      setColumnCountReach(true);
    } else {
      setColumnCountReach(false);
    }
  }, [columns.length, maxColumns]);

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
  const handleclickCol = (e: MouseEvent, colId: string) => {
    e.preventDefault();
    e.stopPropagation();
    onClickCol({ sectionId: '', colId });
  };
  const isSingleColTarget = (isSingle: boolean) =>
    isSingle ? ILayoutTargetEnum.ROW : ILayoutTargetEnum.ITEM;
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
            <div
              className="rlb-flex rbl-relative rbl-col-container"
              style={column.styles}
              onClick={(e) => handleclickCol(e, column.id)}
            >
              {!disabled && !columnCountReach ? (
                <div
                  className="rbl-side-drop-indicator left"
                  style={styleSide(column.id, TargetPlaceEnum.LEFT)}
                ></div>
              ) : null}
              <div key={column.id} className={`rlb-col-inner`}>
                {column.items.map((items, index) => {
                  if (!items) return null;
                  const isImage = imageCheckerFn
                    ? imageCheckerFn(items)
                    : false;
                  const isButton = items.linkType === "link"
                  return (
                    <LayoutDropContainer
                      isLast={
                        index + 1 === column.items.length &&
                        columns.length > 1
                      }
                      targetDROP={
                        destination.itemKey === items[stableKey]
                          ? targetDROP
                          : undefined
                      }
                      disableSide={columnCountReach}
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
                        handleDropItem(
                          e,
                          ILayoutTargetEnum.ITEM,
                          columns.length === 1 &&
                            column.items.length === 1
                            ? 'SINGLE'
                            : 'MULTI',
                        );
                        document
                          .getElementById('clonedGhost')
                          ?.remove();
                      }}
                      onDragLeave={resetDrag}
                      disableChange={disabled}
                      key={index}
                    >
                      <DraggableItem
                        isImage={isImage}
                        isButton={isButton}
                        disableChange={disabled}
                        sizes={
                          imageSizeFnLoader
                            ? imageSizeFnLoader(items)
                            : undefined
                        }
                        oneCol={columns.length === 1}
                        dndTargetKey={items[stableKey]}
                        isCenter={isImage && items?.options?.center}
                        onImageResizeFinished={(w) =>
                          onImageResizeFinished
                            ? onImageResizeFinished(items, w)
                            : undefined
                        }
                      >
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
              {!disabled && !columnCountReach ? (
                <div
                  className="rbl-side-drop-indicator right"
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
