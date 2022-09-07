import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';
interface IAttributes {
    draggableProps: HTMLAttributes<HTMLDivElement>;
    handleProps: HTMLAttributes<HTMLDivElement>;
    styles?: CSSProperties;
}
interface DraggableItemProps {
    draggableId: string;
    children: (props: IAttributes) => ReactNode;
}
export declare const DraggableItem: FC<DraggableItemProps>;
export {};
