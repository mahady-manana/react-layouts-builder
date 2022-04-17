import React, { FC, ReactNode, DragEvent, useRef } from "react"

interface DraggableProps {
  children: ReactNode | JSX.Element
  dndTargetKey: string
  disableDrag: boolean
  onDragStart: (e: DragEvent<HTMLDivElement>) => void
  // onResize: ()
}
export const DraggableItem: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  disableDrag,
  onDragStart
}) => {
  const element = useRef<HTMLDivElement>(null)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex-grow"
      target-dnd-droppable={`${dndTargetKey}`}
      ref={element}
    >
      {children}
    </div>
  )
}
