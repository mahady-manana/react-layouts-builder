import { ILayoutSection } from 'layouts-builder/interface';
import {
  SourceType,
  DestinationType,
  DropTargetPlaceEnum,
} from 'layouts-builder/interface/internalType';
import { removeEmptyLayout } from './removeEmptylayout';

export const reorderSection = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  if (!source.isSection) return layouts;
  const findSection = layouts.find(
    (section) => section.id === source.sectionId,
  );
  if (!findSection) return layouts;
  const finalLayouts = layouts
    .filter((sect) => sect.id !== source.sectionId)
    .reduce((acc, section) => {
      if (section.id !== dest.sectionId) {
        return acc.concat(section);
      }

      return acc.concat(
        place === DropTargetPlaceEnum.SECTION_TOP
          ? [findSection, section]
          : [section, findSection],
      );
    }, [] as ILayoutSection[]);
  return removeEmptyLayout(finalLayouts);
};
