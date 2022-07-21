import { ILayoutSection } from 'layouts-builder/interface';
import { DestinationType, SourceType } from 'layouts-builder/interface/internalType';
import React, { Dispatch, FC, SetStateAction } from 'react';
interface IAppContext {
    source?: SourceType;
    destination?: DestinationType;
    point: {
        init: number[];
        current: number[];
    };
    isDragStart: boolean;
    currentLayouts: ILayoutSection[];
    setCurrentLayouts: React.Dispatch<React.SetStateAction<ILayoutSection[]>>;
    setPoint: Dispatch<SetStateAction<{
        init: number[];
        current: number[];
    }>>;
    setIsDragStart: Dispatch<SetStateAction<boolean>>;
    setSource: Dispatch<SetStateAction<SourceType | undefined>>;
    setDestination: Dispatch<SetStateAction<DestinationType | undefined>>;
    onDragStart: (draggableId: string) => void;
    onDragEnd: () => void;
}
export declare const AppContext: React.Context<IAppContext>;
export declare const LayoutProvider: FC;
export {};
