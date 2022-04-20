import { FC, ReactNode, DragEvent } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
interface DraggableProps {
    sections: IRenderableLayout;
    index: number;
    children: ReactNode;
    dndTargetKey?: string;
    disableDrag: boolean;
    disableChange?: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
    onChangeSectionStyles?: (key: string, value: string | number) => void;
}
export declare const DroppableSection: FC<DraggableProps>;
export {};
