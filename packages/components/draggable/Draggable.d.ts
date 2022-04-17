import { FC, ReactNode, DragEvent } from "react";
interface DraggableProps {
    children: ReactNode | JSX.Element;
    dndTargetKey: string;
    disableDrag: boolean;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
}
export declare const DraggableItem: FC<DraggableProps>;
export {};
