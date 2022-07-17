import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { createRenderableLayout } from '../helpers/createRendrableLayout';
import { ILayoutContainer, ILayoutSection } from '../interface';
import { IRenderableLayout } from '../interface/renderableInterface';
import '../index.css';
import { LayoutRowContainer } from './LayoutRowContainer';
import { needRowTarget } from 'layouts-builder/helpers/shouldShowRowTarget';
import { AppContext } from 'layouts-builder/Context/AppContext';

export const LayoutContainer: FC<ILayoutContainer> = ({
  data,
  stableDataKey: stableKey,
  layouts,
  disableChange,
  staticComponent,
  colResize = true,
  maxColumns,
  maxWidth,
  renderComponent,
  onLayoutChange,
  imageSizeFnLoader,
  imageCheckerFn,
  onImageResizeFinished,
}) => {
  const containeRef = useRef<HTMLDivElement>(null);
  const [runChange, setRunChange] = useState<boolean>(false);
  const [actualLayout, setActualLayout] = useState<ILayoutSection[]>(
    [],
  );
  const [dragActive, setDragActive] = useState(false);
const {setCurrentLayouts} = useContext(AppContext)
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
      setCurrentLayouts(actualLayout)
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
      <div className="rlb-static-container" style={{ maxWidth: maxWidth }}>
        {data.map((item, index) => {
          return renderComponent(item, {} as any, index);
        })}
      </div>
    );
  }

  return (
    <div className="rlb-main-container m-auto" style={{ maxWidth: maxWidth }}>
      <div
        className="min-h-[100px]"
        ref={containeRef}
        // onDragOver={(e) => {
        //   const cloned = document.getElementById(
        //     'draggedDiv',
        //   ) as HTMLDivElement;

        //   if (cloned) {
        //     cloned.style.pointerEvents = 'none';
        //     cloned.style.position = 'fixed';
        //     cloned.style.top = `${e.clientY}px`;
        //     cloned.style.left = `${e.clientX}px`;
        //   }
        // }}
      >
        {renderableLayout.map((section, sectionIndex) => {
          return (
            <div
              key={section.id}
              className="rlb-section rlb-section-container"
              style={{
                background: section.backgroundImage
                  ? `url(${section.backgroundImage})`
                  : section.backgroundColor,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div
                className="rlb-section-content"
                style={{ width: section.width, margin: 'auto' }}
              >
                {section.rows.map((row, rowIndex) => {
                  return (
                    <LayoutRowContainer
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
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
