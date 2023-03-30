import { FC } from 'react';
import { EnumBlockType, LayoutType, OptionsDrop } from '../interfaces/types';
interface LayoutBuilderProps {
    type?: EnumBlockType;
    data: LayoutType[];
    isRow?: boolean;
    onDrop: (options: OptionsDrop) => void;
}
export declare const LayoutRecursive: FC<LayoutBuilderProps>;
export {};
