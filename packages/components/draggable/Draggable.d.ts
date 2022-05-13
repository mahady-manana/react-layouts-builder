import { FC, ReactNode, DragEvent } from 'react';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    disableChange?: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    isImage?: boolean;
    imageWidth?: number;
    oneCol?: boolean;
    onImageResizeFinished?: (width: number) => void;
}
export declare const DraggableItem: FC<DraggableProps>;
export {};
