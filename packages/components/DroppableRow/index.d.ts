import { FC, ReactNode, DragEvent } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    index: number;
    children: ReactNode;
    dndTargetKey?: string;
    disableChange?: boolean;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
}
export declare const DroppableRow: FC<DraggableProps>;
export {};
