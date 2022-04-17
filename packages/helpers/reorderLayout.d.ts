import { ISection, IColumn } from "../interface";
import { DestinationType, DropTargetPlaceEnum, SourceType } from "../interface/internalType";
export declare const removeItemFromLayout: (layouts: ISection[], source: SourceType) => {
    columns: IColumn[];
    id: any;
    order: number;
    className: string;
}[];
export declare const removeSectionFromLayout: (layouts: ISection[], source: SourceType) => ISection[];
export declare const addNewSectionFromDrag: (layouts: ISection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ISection[];
export declare const reorderSection: (layouts: ISection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ISection[];
export declare const reorderLayoutItem: (layouts: ISection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ISection[];
