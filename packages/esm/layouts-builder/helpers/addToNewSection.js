import { __spreadArray } from '../../node_modules/tslib/tslib.es6.js';
import { TargetPlaceEnum } from '../interface/internalType.js';
import { createNewSection } from './createNewSection.js';
import { removeItemFromSource } from './removeItemFromSource.js';

var addToNewSection = function addToNewSection(layouts, source, dest, place) {
  var newLayouts = layouts.reduce(function (section, next) {
    if (next.id === dest.sectionId) {
      var newSection = createNewSection([source.itemKey], false);

      if (place === TargetPlaceEnum.ROW_TOP) {
        return __spreadArray(__spreadArray([], section, true), [newSection, next], false);
      }

      return __spreadArray(__spreadArray([], section, true), [next, newSection], false);
    }

    return __spreadArray(__spreadArray([], section, true), [next], false);
  }, []);
  var clean = removeItemFromSource(newLayouts, source);
  return clean;
};

export { addToNewSection };
