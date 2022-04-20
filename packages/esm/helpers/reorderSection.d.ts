import { ILayoutSection } from 'layouts-builder/interface';
import { SourceType, DestinationType, DropTargetPlaceEnum } from 'layouts-builder/interface/internalType';
export declare const reorderSection: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ILayoutSection[];
