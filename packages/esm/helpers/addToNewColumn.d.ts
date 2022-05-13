import { ILayoutColumn, ILayoutSection } from 'layouts-builder/interface';
import { SourceType, DestinationType, TargetPlaceEnum } from 'layouts-builder/interface/internalType';
export declare const addItemToColumn: (column: ILayoutColumn[], source: SourceType, dest: DestinationType, place: TargetPlaceEnum) => ILayoutColumn[] | undefined;
export declare const addToColumn: (layouts: ILayoutSection[], source: SourceType, dest: DestinationType, place: TargetPlaceEnum) => ILayoutSection[];
