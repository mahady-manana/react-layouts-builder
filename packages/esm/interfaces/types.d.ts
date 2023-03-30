import { ReactNode } from "react";
export declare type OptionsDrop = {
    item: LayoutType;
    type?: EnumBlockType;
    targetItemId: string;
    position?: EnumPosition;
    targetType?: EnumBlockType;
};
export declare type LayoutType = {
    id: string;
    properties?: Record<string, any>;
    type: EnumBlockType;
    children?: LayoutType[];
    block?: Record<string, any>;
};
export declare type LayoutBuilderProps = {
    layouts: LayoutType[];
    onLayoutChange: (layouts: LayoutType[]) => void;
    loading?: ReactNode;
};
export declare enum EnumBlockType {
    CONTAINER = "container",
    CHILDREN = "row",
    BLOCK = "block"
}
export declare enum EnumPosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
