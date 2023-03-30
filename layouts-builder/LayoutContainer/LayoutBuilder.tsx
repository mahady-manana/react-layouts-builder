import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import React, { FC, useEffect, useState } from 'react';
import {
  LayoutBuilderProps,
  LayoutType,
  OptionsDrop,
} from '../interfaces/types';
import { handleDropItem } from '../helpers/handleDraAndDrop';
import { LayoutRecursive } from './LayoutRecursive';

export const LayoutBuilder: FC<LayoutBuilderProps> = ({
  layouts,
  onLayoutChange,
}) => {
  const [internalLayouts, setInternalLayouts] = useState<
    LayoutType[]
  >([]);

  const handleDrop = (options: OptionsDrop) => {
    if (options.item.id === options.targetItemId) return;
    setInternalLayouts((prev) => {
      const newLayouts = handleDropItem(prev, options);
      if (newLayouts) {
        onLayoutChange(newLayouts);
        return newLayouts;
      }
      return prev;
    });
  };
  useEffect(() => {
    setInternalLayouts(layouts);
  }, [layouts]);

  return (
    <DndProvider backend={HTML5Backend}>
      {internalLayouts.length ? (
        <LayoutRecursive data={internalLayouts} onDrop={handleDrop} />
      ) : (
        <p>Loading...</p>
      )}
    </DndProvider>
  );
};
