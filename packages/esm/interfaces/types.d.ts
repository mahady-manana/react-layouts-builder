import { ReactNode } from 'react';
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
    loading?: ReactNode;
    renderComponent: (block: any) => ReactNode | JSX.Element;
    onLayoutChange: (layouts: LayoutType[]) => void;
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
export declare type CreateBlockOptions = {
    layouts: LayoutType[];
    block: any;
    targetedBlockId?: string;
};
export declare type CreateBlock = (options: CreateBlockOptions) => LayoutType[];
export declare type CreateContainerOptions = {
    layouts: LayoutType[];
    block: any;
    targetedContainerId?: string;
};
export declare type CreateContainer = (options: CreateContainerOptions) => LayoutType[];
