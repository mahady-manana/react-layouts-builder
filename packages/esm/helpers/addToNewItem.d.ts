import { ILayoutSection } from 'layouts-builder/interface';
import { DestinationType } from 'layouts-builder/interface/internalType';
export declare const addToItem: (layouts: ILayoutSection[], itemKey: any, dest: Omit<DestinationType, 'place'>, bottom?: boolean | undefined) => ILayoutSection[];
