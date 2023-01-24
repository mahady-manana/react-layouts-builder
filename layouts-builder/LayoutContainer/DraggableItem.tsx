import { AppContext } from 'layouts-builder/Context/AppContext';
import { findSourceLayout } from 'layouts-builder/helpers/findSource';
import React, {
  CSSProperties,
  DragEvent,
  FC,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';

interface IAttributes {
  draggableProps: HTMLAttributes<HTMLDivElement>;
  handleProps: HTMLAttributes<HTMLDivElement>;
  styles?: CSSProperties;
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
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
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

    event.dataTransfer.setDragImage(cloned as any, 0, 0);
  };
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('dragstart', handleDragStart as any);
    }
    return () => {
      if (node) {
        node.removeEventListener('dragstart', handleDragStart as any);
      }
    };
  }, [ref]);

  const handleEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragStart(false);
    const el = document.getElementById('clonedElement');
    el?.remove();
  };
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('dragend', handleEnd as any);
    }
    return () => {
      if (node) {
        node.removeEventListener('dragend', handleEnd as any);
      }
    };
  }, [ref]);

  const draggableAttributes: HTMLAttributes<HTMLDivElement> | any = {
    draggable: true,
    draggableid: draggableId,
    ref: ref,
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
