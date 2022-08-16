import React from 'react';
interface ResizableContainerProps {
    resizable?: boolean;
    colNumber: number;
    type?: any;
    width: number | string;
    onMouseDown?: (clienX: number, width: number) => void;
    isLast?: boolean;
    isNextTo?: boolean;
    resizing?: boolean;
    children?: any;
}
export declare const ResizableContainer: React.NamedExoticComponent<ResizableContainerProps>;
export {};
