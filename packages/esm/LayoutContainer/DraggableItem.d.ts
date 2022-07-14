import { FC, HTMLAttributes, ReactNode } from 'react';
interface IAttributes {
    draggableProps: HTMLAttributes<HTMLDivElement>;
    handleProps: HTMLAttributes<HTMLDivElement>;
}
interface DraggableItemProps {
    draggableId: string;
    children: (props: IAttributes) => ReactNode;
}
export declare const DraggableItem: FC<DraggableItemProps>;
export {};
