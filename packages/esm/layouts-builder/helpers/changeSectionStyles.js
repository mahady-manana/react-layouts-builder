import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var changeSectionStyles = function changeSectionStyles(currentLayouts, sectionId, styles) {
  return currentLayouts.map(function (section) {
    if (section.id !== sectionId) return section;
    return __assign(__assign({}, section), styles);
  });
};

export { changeSectionStyles };
