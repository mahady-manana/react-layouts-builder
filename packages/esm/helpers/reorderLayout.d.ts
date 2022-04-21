import { ILayoutSection } from 'layouts-builder/interface';
import { SourceType, DestinationType, DropTargetPlaceEnum, ILayoutTargetEnum } from 'layouts-builder/interface/internalType';
export declare const reorderLayout: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum, target: ILayoutTargetEnum) => ILayoutSection[];
