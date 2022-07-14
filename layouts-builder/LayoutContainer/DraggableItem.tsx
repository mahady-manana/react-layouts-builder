import { AppContext } from 'layouts-builder/Context/AppContext';
import { findSourceLayout } from 'layouts-builder/helpers/findSource';
import { useStyles } from 'layouts-builder/hooks/useStyles';
import React, {
  DragEvent,
  FC,
  HTMLAttributes,
  ReactNode,
  useContext,
} from 'react';

interface IAttributes {
  draggableProps: HTMLAttributes<HTMLDivElement>;
  handleProps: HTMLAttributes<HTMLDivElement>;
}
interface DraggableItemProps {
  draggableId: string;
  children: (props: IAttributes) => ReactNode;
}

export const DraggableItem: FC<DraggableItemProps> = ({
  draggableId,
  children,
}) => {
  const { sourceId, point, currentLayouts, onDragStart, setSource } =
    useContext(AppContext);

  const draggableAttributes: HTMLAttributes<HTMLDivElement> | any = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: (e: DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onDragStart(draggableId);
      const source = findSourceLayout(currentLayouts, draggableId);
      if (source) {
        setSource(source);
      }
      const div = e.target;
      e.dataTransfer.setDragImage(div as any, 5000, 5000);
      const el = document.querySelector(
        `div[data-draggable-id='${draggableId}']`,
      );
      if (el) {
        el.setAttribute('id', 'draggedDiv');
      }
    },
    onDragEnd: (e) => {
      e.preventDefault();
      e.stopPropagation();
      const el = document.getElementById('draggedDiv');

      if (el) {
        el.style.position = '';
        el.style.pointerEvents = '';
        el.style.position = '';
        el.style.top = ``;
        el.style.left = ``;
        el.style.width = ``;
        el.style.height = ``;
        el.style.maxWidth = ``;
        el.style.maxHeight = ``;
        el.style.overflow = ``;
        el.removeAttribute('id');
      }
    },
  };
  return (
    <>
      {children({
        draggableProps: draggableAttributes,
        handleProps: {},
      })}
    </>
  );
};
