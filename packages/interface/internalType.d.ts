export declare enum DropTargetPlaceEnum {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    ROW_TOP = "ROW_TOP",
    ROW_BOTTOM = "ROW_BOTTOM"
}
export declare enum ILayoutTargetEnum {
    ROW = "ROW",
    COL = "COL",
    ITEM = "ITEM"
}
export interface SourceType {
    sectionId: string;
    columnId: string;
    rowId: any;
    itemKey: any;
    isSection?: boolean;
}
export interface DestinationType {
    sectionId: string;
    columnId: string;
    rowId: any;
    itemKey?: any;
    targetPlace: DropTargetPlaceEnum;
}
export interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
}
