import React from 'react';
interface ResizableContainerProps {
    resizable?: boolean;
    colNumber: number;
    type?: any;
    width: number | string;
    isLast?: boolean;
    isNextTo?: boolean;
    resizing?: boolean;
    children?: any;
    onMouseDown?: (clienX: number, width: number) => void;
}
export declare const ResizableContainer: React.NamedExoticComponent<ResizableContainerProps>;
export {};
