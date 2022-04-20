import { FC, ReactNode, DragEvent, CSSProperties } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    currentColumLength: number;
    width: number;
    disableDrag: boolean;
    initialSize: any;
    disableChange?: boolean;
    isSection?: boolean;
    className?: string;
    styles?: CSSProperties;
    resizingWidth?: number;
    onDropItem: (e: DragEvent<HTMLDivElement>, target: DropTargetPlaceEnum) => void;
    onResizeStart: (colId: string, widthPx: number, currentPercentWidth: number, onePixel: number, initialPos: number) => void;
    onResize: (e: DragEvent<HTMLDivElement>, isInvert?: boolean) => void;
    onResizeEnd: () => void;
}
export declare const DroppableColumnContainer: FC<DraggableProps>;
export {};
