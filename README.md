# REACT LAYOUTS DND

This project use TailwindCSS.

## Installation

```js

npm install react-layouts-dnd

// or

yarn add react-layouts-dnd

```

## React Layouts dnd interface

```js



// Interface of the Layout container
ILayoutContainer {

    // data use for the layouts components
    // data must have a unique identifier like id or ...
    data: any[];

    // the unique identifer of the data
    stableDataKey: string;

    // component used to render the layouts items
    renderComponent: (data: any) => ReactNode | JSX.Element;

    // handler attached to the layouts
    // this fired when layouts change
    // It is used to save the current layouts in your server or localstorage or ...
    onLayoutChange: (data: ILayoutSection[]) => void;

    // the actual layouts make sure to update  each time onLayoutChange fired
    layouts?: ILayoutSection[];

}

// Interface of the Layout sections
ILayoutSection {
    id: any;
    order: number;
    columns: ILayoutColumn[];
    className: string;
}

// Interface of the Layout columns
ILayoutColumn {
    id: any;
    order: number;
    childIds: (string | number)[];
    className?: string;
    styles?: CSSProperties;
    width: number;
}




```

## LayoutContainer Props

The `LayoutContainer` is used to create the layouts using a drop and drop interface. It accepts the following props.

| Property       | Type                                  | Required | Description                   |
| -------------- | ------------------------------------- | :------: | ----------------------------- |
| layouts        | ILayoutSection[]                      |  false   | Represents the current layout |
| onLayoutChange | `(layouts:ILayoutSection[] ) => void` |  false   | layouts handler               |
