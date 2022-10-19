import React, { useEffect, useState } from 'react';

import { mockData } from '../data/data';
import {
  LayoutContainer,
  ILayoutSection,
  createLayout,
  LayoutProvider,
  ContainerSource,
  useContainerStyles,
} from '../../packages';
import { storage } from '../localSorage';
import '../../packages/index.css';
import { TestComponent } from './TestComponent';
import './style.css';

export const Layouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [nodata, setnodata] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [focused, setFocused] = useState<any>();
  const [focusItem, setFocusItem] = useState<any>();
  const [sourceContainer, setSourceContainer] =
    useState<ContainerSource>();
  const {
    changeSectionContainerStyles,
    changeColumnContainerStyles,
  } = useContainerStyles();
  const handleLayoutChange = (layouts: ILayoutSection[]) => {
    setLayoutTest(layouts);
    storage.set(layouts);
  };
  useEffect(() => {
    const l = storage.get();

    setTimeout(() => {
      if (l?.length > 0) {
        setLayoutTest(l);
      } else {
        setnodata(true);
      }
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading && nodata && data) {
      const c = createLayout(data, 'id', undefined, { width: 800 });
      setLayoutTest(c);
    }
  }, [loading, data, nodata]);

  useEffect(() => {
    setData(mockData);
  }, []);

  const onFocus = (items: any) => {
    setFocusItem(items);
  };

  const imageCheckerFn = (items: any) => {
    return items.img ? true : false;
  };

  const changeStyle = (color: string) => {
    if (sourceContainer) {
      if (sourceContainer.colId) {
        const layouts = changeColumnContainerStyles(
          layoutTest,
          sourceContainer,
          { background: color },
        );

        setLayoutTest(layouts);
        storage.set(layouts);
        return;
      }
      const layouts = changeSectionContainerStyles(
        layoutTest,
        sourceContainer,
        { background: color },
      );

      setLayoutTest(layouts);
      storage.set(layouts);
    }
  };
  const handleDelete = (id: number) => {};
  return (
    <div
      // style={{ height: '100vh', width: 800 }}
      className="containersb"
    >
      <script
        id="DragDropTouch"
        src="https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js"
      ></script>

      <div
        id="container_layout_scroll"
        style={{
          height: '95vh',
          overflowY: 'scroll',
          // width: 800,
          marginInline: 'auto',
        }}
      >
        {loading ? (
          <div>loading...</div>
        ) : (
          <LayoutProvider>
            <LayoutContainer
              isMobile={false}
              data={data}
              disableChange={false}
              stableDataKey="id"
              layouts={layoutTest}
              staticComponent={false}
              onLayoutChange={handleLayoutChange}
              onClickSection={(section) => {
                setSourceContainer(section);
              }}
              onClickColumn={(section) => {
                setSourceContainer(section);
              }}
              onFocusItem={onFocus}
              imageCheckerFn={imageCheckerFn}
              imageSizeFnLoader={(item) => item.size}
              onImageResizeFinished={(item, w) =>
                console.log(item, w)
              }
              renderComponent={(data) => {
                return (
                  <TestComponent
                    data={data}
                    onClick={(d) => setFocused(d.id)}
                    focused={data.id === focused}
                    onDelete={handleDelete}
                  />
                );
              }}
            />
          </LayoutProvider>
        )}
      </div>
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          minWidth: 200,
          minHeight: 500,
          background: '#ffff',
        }}
      >
        <p>Container bg: </p>
        <input
          type="color"
          onChange={(e) => changeStyle(e.target.value)}
        />
      </div>
    </div>
  );
};
