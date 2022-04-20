import { ILayoutSection } from '../interface';
import { DestinationType, DropTargetPlaceEnum, SourceType } from '../interface/internalType';
export declare const reorderLayoutItem: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: DropTargetPlaceEnum) => ILayoutSection[];
