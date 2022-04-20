import { __spreadArray } from '../../node_modules/tslib/tslib.es6.js';
import { DropTargetPlaceEnum } from '../interface/internalType.js';

var addToNewRow = function addToNewRow(layouts, source, dest, place) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) {
      return section;
    }

    var id = new Date().getTime();
    var newCol = [{
      childIds: [source.itemKey],
      id: id.toString(),
      order: 0,
      width: 100,
      className: ''
    }];
    var cols = place === DropTargetPlaceEnum.SECTION_TOP ? __spreadArray([newCol], section.columns || [], true) : __spreadArray(__spreadArray([], section.columns || [], true), [newCol], false);
    var newSection = {
      className: '',
      id: id.toString(),
      order: 0,
      columns: cols
    };
    return newSection;
  }, []);
  return finalLayouts;
};

export { addToNewRow };
