import { FC, ReactNode } from 'react';
interface DraggableProps {
    children: ReactNode;
    dndTargetKey: string;
    disableChange?: boolean;
    isImage?: boolean;
    isButton?: boolean;
    sizes?: {
        width?: number;
        height?: number;
    };
    oneCol?: boolean;
    isCenter?: boolean;
    onImageResizeFinished?: (sizes: {
        width?: number;
        height?: number;
    }) => void;
}
export declare const DraggableItem: FC<DraggableProps>;
export {};
