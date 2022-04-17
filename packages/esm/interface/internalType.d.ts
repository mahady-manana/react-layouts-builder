export declare enum DropTargetPlaceEnum {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    SECTION_TOP = "SECTION_TOP",
    SECTION_BOTTOM = "SECTION_BOTTOM"
}
export interface SourceType {
    sectionId: string;
    columnId: string;
    itemKey: any;
    isSection?: boolean;
}
export interface DestinationType {
    sectionId: string;
    columnId: string;
    itemKey: any;
    targetPlace: DropTargetPlaceEnum;
}
