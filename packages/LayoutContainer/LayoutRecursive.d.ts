import { FC, ReactNode } from 'react';
import { EnumBlockType, LayoutType, OptionsDrop } from '../interfaces/types';
interface LayoutBuilderProps {
    type?: EnumBlockType;
    data: LayoutType[];
    isRow?: boolean;
    onDrop: (options: OptionsDrop) => void;
    renderBlock: (block: any) => ReactNode | JSX.Element;
}
export declare const LayoutRecursive: FC<LayoutBuilderProps>;
export {};
