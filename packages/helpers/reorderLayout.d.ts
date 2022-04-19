import { ILayoutSection, ILayoutColumn } from '../interface';
import { DestinationType, DropTargetPlaceEnum, SourceType } from '../interface/internalType';
export declare const removeItemFromLayout: (layouts: ILayoutSection[], source: SourceType) => {
    columns: ILayoutColumn[];
    id: any;
    order: number;
    className: string;
    width?: string | number | undefined;
    contentWidth?: string | number | undefined;
    backgroundColor?: string | undefined;
    spacing?: number | undefined;
}[];
export declare const removeSectionFromLayout: (layouts: ILayoutSection[], source: SourceType) => ILayoutSection[];
export declare const addNewSectionFromDrag: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ILayoutSection[];
export declare const reorderSection: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ILayoutSection[];
export declare const reorderLayoutItem: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ILayoutSection[];
