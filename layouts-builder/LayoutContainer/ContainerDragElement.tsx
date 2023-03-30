import React from "react";
import { useDrag } from "react-dnd";

interface ContainerDragElementProps {
  data: any;
  children: any;
}
export function ContainerDragElement(props: ContainerDragElementProps) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: props.data.type,
    item: { data: props.data },
  }));
  return (collected as any).isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...(collected as any)} className={`draggable-container lb-dg-${props.data.type}`}>
      {props.children}
    </div>
  );
}
