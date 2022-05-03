import { FC, CSSProperties } from 'react';
interface ResizableContainerProps {
    isRow?: boolean;
    resizable?: boolean;
    styles?: CSSProperties;
    type?: any;
    noPadding?: boolean;
    currentWidth?: number;
    maxWidth?: number;
    onResize?: (currentSize: number) => void;
    onResizeEnd?: (currentSize: number) => void;
    onResizeColEnd?: (initSize: number, finalWidth: number) => void;
    onClick?: () => void;
}
export declare const ResizableContainer: FC<ResizableContainerProps>;
export {};
