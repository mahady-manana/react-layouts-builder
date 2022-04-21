import { FC, ReactNode, DragEvent } from 'react';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
interface DraggableProps {
    section: IRenderableLayout;
    index: number;
    children: ReactNode;
    dndTargetKey?: string;
    disableDrag: boolean;
    disableChange?: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
}
export declare const DroppableSection: FC<DraggableProps>;
export {};
