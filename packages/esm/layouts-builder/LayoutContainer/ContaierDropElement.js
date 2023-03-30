import React, { useState, useRef } from 'react';
import { droppablePosition, isAcceptedPostion } from '../helpers/droppableInfo.js';
import { getCurrentHovered } from '../helpers/getCurrentHovered.js';
import { useDragDropManager } from '../../node_modules/react-dnd/dist/hooks/useDragDropManager.js';
import { useDrop } from '../../node_modules/react-dnd/dist/hooks/useDrop/useDrop.js';

var ContaierDropElement = function ContaierDropElement(props) {
  var _a = useState(false),
      hovered = _a[0],
      setHovered = _a[1];

  var _b = useState(""),
      position = _b[0],
      setPosition = _b[1];

  var containerRef = useRef(null);
  var manager = useDragDropManager();

  var removeExistingIndice = function removeExistingIndice(all) {
    var elements = document.querySelectorAll(".lb-indice");
    elements === null || elements === void 0 ? void 0 : elements.forEach(function (element) {
      if (all) {
        element.classList.remove("lb-indice");
        return;
      }

      if (element.id !== "".concat(props.data.id)) {
        element.classList.remove("lb-indice");
      }
    });
  }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var _c = useDrop(function () {
    return {
      accept: ["block", "container", "row"],
      drop: function drop(item, monitor) {
        var clientOffset = monitor.getClientOffset();
        setHovered(false);
        setPosition("");

        if (!clientOffset) {
          return;
        }

        var x = clientOffset.x,
            y = clientOffset.y;
        var posit = getCurrentHovered(x, y, containerRef, droppablePosition(item.data.type, props.type));

        if (props.onDrop && isAcceptedPostion(item.data.type, props.type)) {
          // item.data, props.data.id, props.type, posit
          props.onDrop({
            item: item.data,
            targetItemId: props.data.id,
            targetType: props.type,
            position: posit
          });
          removeExistingIndice(true);
        }
      },
      hover: function hover(item, monitor) {
        var clientOffset = monitor.getClientOffset();
        setHovered(true);

        if (!clientOffset) {
          return;
        }

        var x = clientOffset.x,
            y = clientOffset.y;
        var posit = getCurrentHovered(x, y, containerRef, droppablePosition(item.data.type, props.type));
        console.log({
          posit: posit
        });

        if (posit && isAcceptedPostion(item.data.type, props.type)) {
          setPosition(posit);
          removeExistingIndice();
        }
      },
      canDrop: function canDrop(item, monitor) {
        return isAcceptedPostion(item.data.type, props.type);
      },
      options: {}
    };
  }),
      drop = _c[1];

  var exitDropTarget = function exitDropTarget() {
    setHovered(false);
    setPosition("");
    removeExistingIndice();
  };

  var isDragging = manager.getMonitor().isDragging();
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "lb-dp-".concat(props.type)
  }, /*#__PURE__*/React.createElement("div", {
    ref: drop,
    id: props.data.id,
    className: "droppable-container ".concat(position && hovered && isDragging ? "lb-indice drop-".concat(position) : ""),
    onDragLeave: function onDragLeave() {
      return exitDropTarget();
    },
    onDragEnter: function onDragEnter() {
      return setHovered(true);
    }
  }, props.children));
};

export { ContaierDropElement };
