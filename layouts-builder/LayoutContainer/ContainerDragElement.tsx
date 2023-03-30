import React from "react";
import { useDrag } from "react-dnd";

interface ContainerDragElementProps {
  type: string;
  data: any;
  children: any;
}
export function ContainerDragElement(props: ContainerDragElementProps) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: props.type,
    item: { data: props.data },
  }));
  return (collected as any).isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...(collected as any)} className={`draggable-container lb-dg-${props.type}`}>
      {props.children}
    </div>
  );
}
