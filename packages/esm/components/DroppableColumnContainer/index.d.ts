import { FC, ReactNode, DragEvent, CSSProperties } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    currentColumLength: number;
    width: number | string;
    disableDrag: boolean;
    initialSize: any;
    disableChange?: boolean;
    isSection?: boolean;
    className?: string;
    styles?: CSSProperties;
    resizingWidth?: number;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
}
export declare const DroppableColumnContainer: FC<DraggableProps>;
export {};
