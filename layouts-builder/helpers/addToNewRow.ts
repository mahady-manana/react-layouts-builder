import {
  ILayoutColumn,
  ILayoutSection,
} from 'layouts-builder/interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  SourceType,
} from 'layouts-builder/interface/internalType';

export const addToNewRow = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  const finalLayouts = layouts.map((section) => {
    if (section.id !== dest.sectionId) {
      return section;
    }

    const id = new Date().getTime();

    const newCol: ILayoutColumn[] = [
      {
        childIds: [source.itemKey],
        id: id.toString(),
        order: 0,
        width: 100,
        className: '',
      },
    ];
    const cols =
      place === DropTargetPlaceEnum.SECTION_TOP
        ? [newCol, ...(section.columns || [])]
        : [...(section.columns || []), newCol];
    const newSection: ILayoutSection = {
      className: '',
      id: id.toString(),
      order: 0,
      columns: cols,
    };

    return newSection;
  }, [] as ILayoutSection[]);

  return finalLayouts;
};
