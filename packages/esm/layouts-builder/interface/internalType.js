var DropTargetPlaceEnum;

(function (DropTargetPlaceEnum) {
  DropTargetPlaceEnum["LEFT"] = "LEFT";
  DropTargetPlaceEnum["RIGHT"] = "RIGHT";
  DropTargetPlaceEnum["TOP"] = "TOP";
  DropTargetPlaceEnum["BOTTOM"] = "BOTTOM";
  DropTargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  DropTargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
})(DropTargetPlaceEnum || (DropTargetPlaceEnum = {}));

var ILayoutTargetEnum;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(ILayoutTargetEnum || (ILayoutTargetEnum = {}));

export { DropTargetPlaceEnum, ILayoutTargetEnum };
