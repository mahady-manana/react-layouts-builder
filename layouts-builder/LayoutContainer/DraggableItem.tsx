import { AppContext } from 'layouts-builder/Context/AppContext';
import { findSourceLayout } from 'layouts-builder/helpers/findSource';
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
  const { currentLayouts, onDragStart, setSource, setIsDragStart } =
    useContext(AppContext);

  const draggableAttributes: HTMLAttributes<HTMLDivElement> | any = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: (e: DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onDragStart(draggableId);
      setIsDragStart(true);
      const source = findSourceLayout(currentLayouts, draggableId);
      if (source) {
        setSource(source);
      }
      const div = document.querySelector(
        `div[data-draggable-id="${draggableId}"]`,
      );

      const cloned = div?.cloneNode(true) as HTMLElement | null;
      cloned?.setAttribute('id', 'clonedElement');

      document.body.appendChild(cloned as any);

      e.dataTransfer.setDragImage(cloned as any, 0, 0);
    },
    onDragEnd: (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragStart(false);
      const el = document.getElementById('clonedElement');
      el?.remove();
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
