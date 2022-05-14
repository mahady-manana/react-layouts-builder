# REACT LAYOUTS BUILDER

This project use TailwindCSS.

## Installation

```js

npm install react-layouts-builder

// or

yarn add react-layouts-builder

```

## React Layouts dnd interface

```js

type ISectionStylesProps = {
  className?: string;
  width?: string | number;
  backgroundColor?: string;
  backgroundImage?: string;
};
 interface ILayoutColumn {
  id: any;
  order: number;
  childIds: (string | number)[];
  className?: string;
  width: number;
}
 interface ILayoutRow {
  id: any;
  width: number | string;
  order: number;
  columns: ILayoutColumn[];
  className?: string;
  isContainer?: boolean;
}
 interface ILayoutSection {
  id: any;
  order: number;
  rows: ILayoutRow[];
  className?: string;
  width?: string | number;
  contentWidth?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  container?: boolean;
}

interface ILayoutContainer {
  data: any[];
  stableDataKey: string;
  staticComponent?: boolean;
  renderComponent: (
    data: any,
    layout: SourceType,
    index?: number,
  ) => ReactNode | any;
  onLayoutChange: (data: ILayoutSection[]) => void;
  layouts?: ILayoutSection[];
  loading?: boolean;
  disableChange?: boolean;
  imageSizeFnLoader?: (items: any) => number | undefined
  onClickSection?: (section: ILayoutSection) => void;
  onFocusItem?: (section: SourceType) => void;
  imageCheckerFn?: (item:any) => boolean
  onImageResizeFinished?: (items: any, width: number) => void
}



```

## LayoutContainer Props

The `LayoutContainer` is used to create the layouts using a drop and drop interface. It accepts the following props.

| Property       | Type                                  | Required | Description                   |
| -------------- | ------------------------------------- | :------: | ----------------------------- |
| layouts        | ILayoutSection[]                      |  false   | Represents the current layout |
| onLayoutChange | `(layouts:ILayoutSection[] ) => void` |  false   | layouts handler               |
