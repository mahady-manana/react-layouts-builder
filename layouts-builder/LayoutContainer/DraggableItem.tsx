import { AppContext } from 'layouts-builder/Context/AppContext';
import { findSourceLayout } from 'layouts-builder/helpers/findSource';
import React, {
  CSSProperties,
  DragEvent,
  FC,
  HTMLAttributes,
  ReactNode,
  TouchEvent,
  useContext,
  useState,
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
  const [touchStart, setTouchStart] = useState<boolean>(false);
  const [postion, setPostion] = useState({
    x: 0,
    y: 0,
  });
  const draggableAttributes: HTMLAttributes<HTMLDivElement> | any = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: (e: DragEvent<HTMLDivElement>) => {
      if (e.cancelable) {
        e.preventDefault();
      }
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
    // onTouchStart: (e: TouchEvent<HTMLDivElement>) => {
    //   const pos = e.changedTouches[0];
    //   setPostion({
    //     x: pos.clientX,
    //     y: pos.clientY,
    //   });
    //   setTouchStart(true);
    //   const el = document.getElementById('clonedElement');
    //   el?.remove();
    // },
    // onTouchMove: (e) => {
    //   const pos = e.changedTouches[0];
    //   setPostion({
    //     x: pos.clientX,
    //     y: pos.clientY,
    //   });
    //   // const el = document.getElementById('clonedElement');
    //   // el?.remove();
    // },
    // onTouchEnd: (e) => {
    //   setTouchStart(false);
    //   console.log(e);
    //   const el = document.getElementById('clonedElement');
    //   el?.remove();
    // },
    // onTouchCancel: (e) => {
    //   setTouchStart(false);
    //   console.log(e);
    // },
  };
  return (
    <>
      {children({
        draggableProps: draggableAttributes,
        handleProps: {},
        styles: touchStart
          ? {
              position: 'fixed',
              top: postion.y,
              left: postion.x,
              zIndex: 9999,
            }
          : {},
      })}
      {touchStart ? (
        <div className="target-it" style={{ padding: 25 }}>
          <p>Place here</p>
        </div>
      ) : null}
    </>
  );
};
