import { RefObject } from "react";
import { EnumPosition } from "../interfaces/types";
export declare const getCurrentHovered: (clientX: number, clientY: number, containerRef: RefObject<HTMLDivElement>, side?: EnumPosition[]) => EnumPosition | undefined;
