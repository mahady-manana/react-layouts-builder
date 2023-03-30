import { moveBlock, moveChildren, moveContainer } from './moveContainer.js';

var handleDropItem = function handleDropItem(layout, options) {
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

export { handleDropItem };
