import { FC, CSSProperties } from 'react';
interface ResizableContainerProps {
    isRow?: boolean;
    resizable?: boolean;
    styles?: CSSProperties;
    type?: any;
    currentWidth?: number | string;
    onResize?: (currentSize: number) => void;
    onResizeEnd?: (currentSize: number) => void;
}
export declare const ResizableContainer: FC<ResizableContainerProps>;
export {};
