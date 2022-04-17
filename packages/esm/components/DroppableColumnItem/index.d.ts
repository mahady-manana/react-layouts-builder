import { FC, ReactNode, DragEvent } from "react";
import { DropTargetPlaceEnum } from "../../interface/internalType";
interface DraggableProps {
    children: ReactNode | JSX.Element;
    dndTargetKey?: string;
    disableDrag: boolean;
    isSection?: boolean;
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
    currentColumLength: number;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
}
export declare const DroppableColumnItem: FC<DraggableProps>;
export {};
