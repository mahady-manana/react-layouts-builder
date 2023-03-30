import { LayoutType } from "../interfaces/types";
export declare const removeContainer: (data: LayoutType[], containerId: string) => LayoutType[];
export declare const removeItemFirstChildren: (data: LayoutType[], itemId: string) => LayoutType[];
export declare const removeBlockLayout: (data: LayoutType[], blockId: string) => {
    children: {
        children: LayoutType[] | undefined;
        id: string;
        properties?: Record<string, any> | undefined;
        type: import("../interfaces/types").EnumBlockType;
        block?: Record<string, any> | undefined;
    }[] | undefined;
    id: string;
    properties?: Record<string, any> | undefined;
    type: import("../interfaces/types").EnumBlockType;
    block?: Record<string, any> | undefined;
}[];
