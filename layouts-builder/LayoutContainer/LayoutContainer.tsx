import React, {
  DragEvent,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createRenderableLayout } from '../helpers/createRendrableLayout';
import {
  ContainerSource,
  ILayoutContainer,
  ILayoutSection,
} from '../interface';
import { IRenderableLayout } from '../interface/renderableInterface';
import '../index.css';
import { LayoutRowContainer } from './LayoutRowContainer';
import { needRowTarget } from 'layouts-builder/helpers/shouldShowRowTarget';
import { AppContext } from 'layouts-builder/Context/AppContext';
import useSimpleDebounce from 'layouts-builder/hooks/useDebounce';
import classNames from 'classnames';
import { useContainerIdentifier } from 'layouts-builder/hooks/useContainerIdentifier';
import { checkNotFoundData } from 'layouts-builder/helpers/checkNotFoundData';
import("./polyfill.js")

export const LayoutContainer: FC<ILayoutContainer> = ({
  data,
  stableDataKey: stableKey,
  layouts,
  disableChange,
  staticComponent,
  colResize = true,
  maxColumns,
  isMobile,
  maxWidth,
  renderComponent,
  onLayoutChange,
  imageSizeFnLoader,
  imageCheckerFn,
  onImageResizeFinished,
  onClickColumn,
  onClickSection,
}) => {
  const containeRef = useRef<HTMLDivElement>(null);
  const [runChange, setRunChange] = useState<boolean>(false);
  const [actualLayout, setActualLayout] = useState<ILayoutSection[]>(
    [],
  );
  const { isSectionContainer } = useContainerIdentifier();
  const [dragActive, setDragActive] = useState(false);
  const { setCurrentLayouts } = useContext(AppContext);
  const [renderableLayout, setRenderableLayout] = useState<
    IRenderableLayout[]
  >([]);
  const [position, setPosition] =
    useState<{
      x: number;
      y: number;
    }>();

  const debounced = useSimpleDebounce(position, 500);


  useEffect(() => {
    const checkScroll = async () => {
      const winH = window.innerHeight;
      const container = document.getElementById(
        'container_layout_scroll',
      );
      if (debounced) {
        if (debounced.y < 150 && container) {
          container.scroll({
            behavior: 'smooth',
            top: debounced.y - winH / 2,
            left: debounced.x,
          });
        }
        if (debounced.y > winH - 150 && container) {
          container.scroll({
            behavior: 'smooth',
            top: debounced.y + winH / 2,
            left: debounced.x,
          });
        }
      }
    };
    setTimeout(() => {
      checkScroll();
    }, 200);
  }, [debounced]);
  useEffect(() => {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);

  useEffect(() => {
    if (actualLayout.length > 0) {
      const cleanLayout = checkNotFoundData(
        actualLayout,
        data,
        stableKey,
      );

      const renderable = createRenderableLayout(
        data,
        cleanLayout.layouts,
        stableKey,
      );

      setCurrentLayouts(cleanLayout.layouts);
      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]);

  // run layout update
  useEffect(() => {
    if (runChange) {
      onLayoutChange(actualLayout);
      setRunChange(false);
    }
  }, [runChange]);

  if (staticComponent) {
    return (
      <div
        className="rlb-static-container"
        style={{ maxWidth: maxWidth }}
      >
        {data.map((item, index) => {
          return renderComponent(item, {} as any, index);
        })}
      </div>
    );
  }

  const handleDragOverContainer = (e: DragEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleClickSection = (section: IRenderableLayout) => {
    if (onClickSection) {
      onClickSection({ sectionId: section.id });
    }
  };
  const handleClickColumn = (source: ContainerSource) => {
    if (onClickColumn) {
      onClickColumn(source);
    }
  };
  return (
    <div
      className="rlb-main-container m-auto"
      style={{ maxWidth: maxWidth }}
    >
      <div
        className="min-h-[100px]"
        ref={containeRef}
        onDragOver={handleDragOverContainer}
        id="layout_container"
      >
        {renderableLayout.map((section, sectionIndex) => {
          return (
            <div
              key={section.id}
              className="rlb-section rlb-section-container"
            >
              <div
                className="rlb-section-content"
                style={{
                  width: section.width,
                  maxWidth: '100%',
                  margin: 'auto',
                  ...(section.styles || {}),
                }}
              >
                <div
                  className={classNames(
                    isSectionContainer(section) ? 'p-2' : '',
                    section.className,
                  )}
                  onClick={(e) => handleClickSection(section)}
                >
                  {section.rows.map((row, rowIndex) => {
                    return (
                      <LayoutRowContainer
                        isMobile={isMobile}
                        key={row.id}
                        stableKey={stableKey}
                        dragActive={dragActive}
                        layouts={actualLayout}
                        columns={row.columns}
                        sectionId={section.id}
                        rowId={row.id}
                        disabled={disableChange}
                        maxColumns={maxColumns}
                        isLastSection={
                          renderableLayout.length === sectionIndex + 1
                        }
                        isFirstSection={sectionIndex === 0}
                        needRowTarget={needRowTarget(
                          renderableLayout,
                          row,
                          {
                            rows: section.rows,
                            sectionIndex,
                            rowIndex,
                          },
                        )}
                        colResize={colResize}
                        renderComponent={renderComponent}
                        setActualLayout={setActualLayout}
                        onLayoutChange={onLayoutChange}
                        imageCheckerFn={imageCheckerFn}
                        imageSizeFnLoader={imageSizeFnLoader}
                        onImageResizeFinished={onImageResizeFinished}
                        setDragActive={setDragActive}
                        onClickCol={(src) =>
                          handleClickColumn({
                            ...src,
                            rowId: row.id,
                            sectionId: section.id,
                          })
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
