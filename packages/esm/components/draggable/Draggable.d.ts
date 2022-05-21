import { FC, ReactNode, DragEvent } from 'react';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    disableChange?: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>, element?: HTMLElement) => void;
    isImage?: boolean;
    sizes?: {
        width?: number;
        height?: number;
    };
    oneCol?: boolean;
    onImageResizeFinished?: (sizes: {
        width?: number;
        height?: number;
    }) => void;
}
export declare const DraggableItem: FC<DraggableProps>;
export {};
