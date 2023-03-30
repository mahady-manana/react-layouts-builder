import { RefObject } from "react";
import { EnumPosition } from "../interfaces/types";

export const getCurrentHovered = (
  clientX: number,
  clientY: number,
  containerRef: RefObject<HTMLDivElement>,
  side?: EnumPosition[]
): EnumPosition | undefined => {
  const height = containerRef.current?.offsetHeight;
  const width = containerRef.current?.offsetWidth;
  const boundingClient = containerRef.current?.getBoundingClientRect();

  if (!height || !width || !boundingClient) {
    return;
  }
  const demi = height / 2;
  const reference = clientY - boundingClient.top;

  const left = clientX - boundingClient.left;
  const spacing = width / 3;

  const shouldRight = width - left < spacing && width - left > 0;

  if (shouldRight && side?.includes(EnumPosition.RIGHT)) {
    return EnumPosition.RIGHT;
  }
  if (side?.includes(EnumPosition.LEFT) && left < spacing && left > 0) {
    return EnumPosition.LEFT;
  }
  if (side?.includes(EnumPosition.BOTTOM) && reference > demi)
    return EnumPosition.BOTTOM;
  if (side?.includes(EnumPosition.TOP) && reference < demi)
    return EnumPosition.TOP;
};
