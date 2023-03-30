import { FC } from "react";
import { EnumBlockType, LayoutType, OptionsDrop } from "../interfaces/types";
interface ContaierDropElementProps {
    data: LayoutType;
    type: EnumBlockType;
    onDrop: (options: OptionsDrop) => void;
    children: any;
}
export declare const ContaierDropElement: FC<ContaierDropElementProps>;
export {};
