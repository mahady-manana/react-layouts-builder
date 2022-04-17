import { CSSProperties } from "react";
import { ISection } from "../interface";
export declare const addClassnameToColumn: (layouts: ISection[], columnId: string, cssProps: {
    className: string;
    styles?: CSSProperties;
}, siblingCSSProps?: {
    className?: string | undefined;
    styles?: CSSProperties | undefined;
} | undefined) => ISection[];
