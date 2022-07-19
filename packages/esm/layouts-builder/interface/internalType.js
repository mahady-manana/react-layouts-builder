var TargetPlaceEnum;

(function (TargetPlaceEnum) {
  TargetPlaceEnum["LEFT"] = "LEFT";
  TargetPlaceEnum["RIGHT"] = "RIGHT";
  TargetPlaceEnum["TOP"] = "TOP";
  TargetPlaceEnum["BOTTOM"] = "BOTTOM";
  TargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  TargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
  TargetPlaceEnum["SECTION_TOP"] = "SECTION_TOP";
  TargetPlaceEnum["SECTION_BOTTOM"] = "SECTION_BOTTOM";
})(TargetPlaceEnum || (TargetPlaceEnum = {}));

var ILayoutTargetEnum;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["SECTION"] = "SECTION";
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(ILayoutTargetEnum || (ILayoutTargetEnum = {}));

export { ILayoutTargetEnum, TargetPlaceEnum };
