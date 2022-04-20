import { FC, ReactNode, DragEvent } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey?: string;
    isSection?: boolean;
    disableChange?: boolean;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
}
export declare const DroppableColumnItem: FC<DraggableProps>;
export {};
