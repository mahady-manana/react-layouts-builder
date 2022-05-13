import { FC } from 'react';
interface ResizableContainerProps {
    resizable?: boolean;
    colNumber?: number;
    type?: any;
    width: number | string;
    onMouseDown?: (clienX: number, width: number) => void;
    isLast?: boolean;
    isNextTo?: boolean;
    resizing?: boolean;
}
export declare const ResizableContainer: FC<ResizableContainerProps>;
export {};
