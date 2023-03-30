import { LayoutType, OptionsDrop } from "../interfaces/types";
import { moveBlock, moveChildren, moveContainer } from "./moveContainer";

export const handleDropItem = (layout: LayoutType[], options: OptionsDrop) => {
  switch (options.item.type) {
    case "container":
      return moveContainer(layout, options);
    case "row":
      return moveChildren(layout, options);
    case "block":
      return moveBlock(layout, options);
    default:
      return layout;
  }
};
