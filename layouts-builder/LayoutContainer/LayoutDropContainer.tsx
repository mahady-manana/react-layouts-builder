import { TargetPlaceEnum } from 'layouts-builder/interface/internalType';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

interface DraggableProps {
  children: ReactNode;
  disableChange?: boolean;
  targetDROP?: TargetPlaceEnum;
  setTargetDROP: Dispatch<
    SetStateAction<TargetPlaceEnum | undefined>
  >;
  onDragOver: (target: TargetPlaceEnum | undefined) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}
export const LayoutDropContainer: FC<DraggableProps> = ({
  children,
  disableChange,
  targetDROP,
  setTargetDROP,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkAnomalie, setCheckAnomalie] = useState(500);

  useEffect(() => {
    if (checkAnomalie > 10) {
      const timer = setTimeout(() => {
        setCheckAnomalie((prev) => prev - 10);
      }, 250);
      clearTimeout(timer);
    }
    if (checkAnomalie < 10) {
      setTargetDROP(undefined);
    }
  }, [checkAnomalie]);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCheckAnomalie(500);
    
    
    const nearest = findNearestTarget(e.clientX, e.clientY);
    if (nearest) {
      setTargetDROP(nearest);
      onDragOver(nearest);
    } else {
      onDragOver(nearest);
      setTargetDROP(undefined);
    }
  };

  const findNearestTarget = (
    clientX: number,
    clientY: number,
  ): TargetPlaceEnum | undefined => {
    //   console.log(clientY);
      
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
    const height = containerRef.current?.offsetHeight;
    const width = containerRef.current?.offsetWidth;
    const boundingClient =
      containerRef.current?.getBoundingClientRect();
    if (!height || !width || !boundingClient?.left) {
      return;
    }
    const demi = height / 2;
    const reference = clientY - boundingClient.top;

    const left = clientX - boundingClient.left;
    const shouldRight = width - left < 50 && width - left > 0;

    if (shouldRight) {
      return TargetPlaceEnum.RIGHT;
    }
    if (left < 50 && left > 0) {
      return TargetPlaceEnum.LEFT;
    }
    if (reference > demi) return TargetPlaceEnum.BOTTOM;
    if (reference < demi) return TargetPlaceEnum.TOP;
  };
  const onExit = (e: DragEvent<HTMLDivElement>) => {
    onDragLeave();
    setTargetDROP(undefined);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e);
    setTargetDROP(undefined);
  };
  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={onExit}
      onDrop={handleDrop}
    >
      {!disableChange ? (
        <div
          className="rbl-drop-item-indicator"
          style={{
            visibility:
              targetDROP === TargetPlaceEnum.TOP
                ? 'visible'
                : 'hidden',
          }}
        ></div>
      ) : null}

      {children}
      {!disableChange ? (
        <div
          className="rbl-drop-item-indicator"
          style={{
            visibility:
              targetDROP === TargetPlaceEnum.BOTTOM
                ? 'visible'
                : 'hidden',
          }}
        ></div>
      ) : null}
    </div>
  );
};
