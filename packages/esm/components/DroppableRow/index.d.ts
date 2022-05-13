import { FC, ReactNode, DragEvent } from 'react';
import { TargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    index: number;
    children: ReactNode;
    dndTargetKey?: string;
    disableChange?: boolean;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: TargetPlaceEnum) => void;
}
export declare const DroppableRow: FC<DraggableProps>;
export {};
