import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var changeSectionStyles = function changeSectionStyles(section, sectionId, key, value) {
  var newSection = section.map(function (sect) {
    var _a;

    if (sect.id === sectionId) {
      return __assign(__assign({}, sect), (_a = {}, _a[key] = value, _a));
    }

    return sect;
  });
  return newSection;
};

export { changeSectionStyles };
