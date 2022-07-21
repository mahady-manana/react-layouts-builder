import { access } from 'fs';
import {
  ILayoutColumn,
  ILayoutRow,
  ILayoutSection,
} from 'layouts-builder/interface';
import {
  DestinationType,
  TargetPlaceEnum,
  SourceType,
} from 'layouts-builder/interface/internalType';
import { createNewSection } from './createNewSection';
import { removeItemFromSource } from './removeItemFromSource';

export const addToNewSection = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: TargetPlaceEnum,
) => {
  const newLayouts = layouts.reduce((section, next) => {
    if (next.id === dest.sectionId) {
      const newSection = createNewSection(
        [source.itemKey],
        false,
        layouts[0]?.defaultWidth,
      );
      if (place === TargetPlaceEnum.ROW_TOP) {
        return [...section, newSection, next];
      }
      return [...section, next, newSection];
    }

    return [...section, next];
  }, [] as ILayoutSection[]);

  const clean = removeItemFromSource(newLayouts, source);
  return clean;
};
