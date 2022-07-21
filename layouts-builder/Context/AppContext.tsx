import { ILayoutSection } from 'layouts-builder/interface';
import {
  DestinationType,
  SourceType,
} from 'layouts-builder/interface/internalType';
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

interface IAppContext {
  source?: SourceType;
  destination?: DestinationType;
  point: { init: number[]; current: number[] };
  isDragStart: boolean;
  currentLayouts: ILayoutSection[];
  setCurrentLayouts: React.Dispatch<
    React.SetStateAction<ILayoutSection[]>
  >;
  setPoint: Dispatch<
    SetStateAction<{ init: number[]; current: number[] }>
  >;
  setIsDragStart: Dispatch<SetStateAction<boolean>>;
  setSource: Dispatch<SetStateAction<SourceType | undefined>>;
  setDestination: Dispatch<
    SetStateAction<DestinationType | undefined>
  >;
  onDragStart: (draggableId: string) => void;
  onDragEnd: () => void;
}
export const AppContext = createContext<IAppContext>(
  {} as IAppContext,
);

export const LayoutProvider: FC = ({ children }) => {
  const [source, setSource] = useState<SourceType>();
  const [currentLayouts, setCurrentLayouts] = useState<
    ILayoutSection[]
  >([]);
  const [destination, setDestination] = useState<DestinationType>();
  const [isDragStart, setIsDragStart] = useState<boolean>(false);
  const [point, setPoint] = useState<{
    init: number[];
    current: number[];
  }>({
    init: [],
    current: [],
  });
  const onDragStart = (id: string) => {
    // setSourceId(id);
  };
  const onDragEnd = () => {
    // setSourceId(undefined);
  };
  const context = useMemo<IAppContext>(
    () => ({
      source,
      destination,
      point,
      isDragStart,
      currentLayouts,
      setCurrentLayouts,
      setIsDragStart,
      setPoint,
      setSource,
      setDestination,
      onDragStart,
      onDragEnd,
    }),
    [
      source,
      destination,
      point,
      isDragStart,
      currentLayouts,
    ],
  );

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};
