# REACT LAYOUTS DND

## React Layouts dnd props

```

{

    // Interface of the Layout container
    ILayoutContainer {
        data: any[];
        stableDataKey: string;
        renderComponent: (data: any) => ReactNode | JSX.Element;
        onLayoutChange: (data: ILayoutSection[]) => void;
        layouts?: ILayoutSection[];
        loading?: boolean;
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


}

```
