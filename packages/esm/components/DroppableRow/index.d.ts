import { FC, ReactNode, DragEvent } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
interface DraggableProps {
    section: IRenderableLayout;
    index: number;
    children: ReactNode;
    dndTargetKey?: string;
    disableChange?: boolean;
    width?: number;
    maxWidth: number;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
    onResize?: (width: number) => void;
}
export declare const DroppableRow: FC<DraggableProps>;
export {};
