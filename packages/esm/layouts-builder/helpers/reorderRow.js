import { DropTargetPlaceEnum } from '../interface/internalType.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var reorderRow = function reorderRow(layouts, source, dest, place) {
  if (!source.isSection) return layouts;
  var findSection = layouts.find(function (section) {
    return section.id === source.sectionId;
  });
  if (!findSection) return layouts;
  var finalLayouts = layouts.filter(function (sect) {
    return sect.id !== source.sectionId;
  }).reduce(function (acc, section) {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }

    return acc.concat(place === DropTargetPlaceEnum.SECTION_TOP ? [findSection, section] : [section, findSection]);
  }, []);
  return removeEmptyLayout(finalLayouts);
};

export { reorderRow };
