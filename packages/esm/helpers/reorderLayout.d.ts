import { ILayoutSection } from 'layouts-builder/interface';
import { SourceType, DestinationType, TargetPlaceEnum, ILayoutTargetEnum } from 'layouts-builder/interface/internalType';
export declare const reorderLayout: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: TargetPlaceEnum, target: ILayoutTargetEnum) => ILayoutSection[];
