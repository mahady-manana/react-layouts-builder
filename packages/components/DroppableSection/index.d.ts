import { FC, ReactNode, DragEvent } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    index: number;
    children: ReactNode | JSX.Element;
    dndTargetKey?: string;
    disableDrag: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
}
export declare const DroppableSection: FC<DraggableProps>;
export {};
