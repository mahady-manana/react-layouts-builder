import { FC, CSSProperties } from 'react';
interface ResizableContainerProps {
    isRow?: boolean;
    isCol?: boolean;
    isSection?: boolean;
    resizable?: boolean;
    styles?: CSSProperties;
    colNumber?: number;
    colIndex?: number;
    type?: any;
    noPadding?: boolean;
    currentWidth?: number;
    maxWidth?: number;
    onResize?: (currentSize: number, init: number, end?: boolean) => void;
    onResizeEnd?: (currentSize: number) => void;
    onResizeColEnd?: (initSize: number, finalWidth: number) => void;
    onClick?: () => void;
}
export declare const ResizableContainer: FC<ResizableContainerProps>;
export {};
