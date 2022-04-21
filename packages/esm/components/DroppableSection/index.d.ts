import { FC, ReactNode, DragEvent } from 'react';
import { IRenderableLayout } from 'layouts-builder/interface/renderableInterface';
interface DraggableProps {
    section: IRenderableLayout;
    index: number;
    children: ReactNode;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onClickSection: () => void;
    onResize?: (currentSize: number) => void;
}
export declare const DroppableSection: FC<DraggableProps>;
export {};
