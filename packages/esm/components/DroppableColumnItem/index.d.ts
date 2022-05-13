import { FC, ReactNode, DragEvent } from 'react';
import { TargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey?: string;
    isSection?: boolean;
    disableChange?: boolean;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: TargetPlaceEnum) => void;
}
export declare const DroppableColumnItem: FC<DraggableProps>;
export {};
