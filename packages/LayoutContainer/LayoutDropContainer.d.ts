import { TargetPlaceEnum } from 'layouts-builder/interface/internalType';
import { FC, ReactNode, DragEvent, Dispatch, SetStateAction } from 'react';
interface DraggableProps {
    children: ReactNode;
    isLast?: boolean;
    disableChange?: boolean;
    targetDROP?: TargetPlaceEnum;
    setTargetDROP: Dispatch<SetStateAction<TargetPlaceEnum | undefined>>;
    onDragOver: (target: TargetPlaceEnum | undefined) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: () => void;
}
export declare const LayoutDropContainer: FC<DraggableProps>;
export {};
