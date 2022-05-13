var TargetPlaceEnum;

(function (TargetPlaceEnum) {
  TargetPlaceEnum["LEFT"] = "LEFT";
  TargetPlaceEnum["RIGHT"] = "RIGHT";
  TargetPlaceEnum["TOP"] = "TOP";
  TargetPlaceEnum["BOTTOM"] = "BOTTOM";
  TargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  TargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
})(TargetPlaceEnum || (TargetPlaceEnum = {}));

var ILayoutTargetEnum;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(ILayoutTargetEnum || (ILayoutTargetEnum = {}));

export { ILayoutTargetEnum, TargetPlaceEnum };
