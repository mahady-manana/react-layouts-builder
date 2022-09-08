import { AppContext } from 'layouts-builder/Context/AppContext';
import useSimpleDebounce from 'layouts-builder/hooks/useDebounce';
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
  useContext,
} from 'react';

interface DraggableProps {
  children: ReactNode;
  isLast?: boolean;
  disableChange?: boolean;
  disableSide?: boolean;
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
  disableSide,
  setTargetDROP,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDropRef = useRef<HTMLDivElement>(null);
  const [initY, setInitY] = useState<number>(0);
  const [checkAnomalie, setCheckAnomalie] = useState(500);
  const {setIsDragStart} = useContext(AppContext)


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
    if (disableChange) {
      return;
    }

    if (!initY) {
      setInitY(e.clientY);
    }
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
    if (shouldRight && !disableSide) {
      return TargetPlaceEnum.RIGHT;
    }
    if (left < 50 && left > 0 && !disableSide) {
      return TargetPlaceEnum.LEFT;
    }
    if (reference > demi) return TargetPlaceEnum.BOTTOM;
    if (reference < demi) return TargetPlaceEnum.TOP;
  };
  const onExit = (e: DragEvent<HTMLDivElement>) => {
    if (disableChange) {
      return;
    }
    onDragLeave();
    setTargetDROP(undefined);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disableChange) {
      return;
    }
    onDrop(e);
    setIsDragStart(false)
    setTargetDROP(undefined);
    const el = document.getElementById('clonedElement');
    el?.remove();
  };
  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={onExit}
      onDrop={handleDrop}
      className={disableChange ? 'rbl-vert-spacing' : 'rbl-relative'}
    >
      {!disableChange ? (
        <div
          className="rbl-drop-item-indicator top"
          style={{
            visibility:
              targetDROP === TargetPlaceEnum.TOP
                ? 'visible'
                : 'hidden',
          }}
          ref={
            targetDROP === TargetPlaceEnum.TOP ? activeDropRef : null
          }
        ></div>
      ) : null}

      {children}
      {!disableChange ? (
        <div
          className="rbl-drop-item-indicator bottom"
          style={{
            visibility:
              targetDROP === TargetPlaceEnum.BOTTOM
                ? 'visible'
                : 'hidden',
          }}
          ref={
            targetDROP === TargetPlaceEnum.BOTTOM
              ? activeDropRef
              : null
          }
        ></div>
      ) : null}
    </div>
  );
};
