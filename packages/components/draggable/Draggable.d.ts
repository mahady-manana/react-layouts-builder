import { FC, ReactNode, DragEvent } from 'react';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    disableChange?: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onClick?: () => void;
}
export declare const DraggableItem: FC<DraggableProps>;
export {};
