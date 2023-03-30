var EnumBlockType;

(function (EnumBlockType) {
  EnumBlockType["CONTAINER"] = "container";
  EnumBlockType["CHILDREN"] = "row";
  EnumBlockType["BLOCK"] = "block";
})(EnumBlockType || (EnumBlockType = {}));

var EnumPosition;

(function (EnumPosition) {
  EnumPosition["TOP"] = "top";
  EnumPosition["BOTTOM"] = "bottom";
  EnumPosition["LEFT"] = "left";
  EnumPosition["RIGHT"] = "right";
})(EnumPosition || (EnumPosition = {}));

export { EnumBlockType, EnumPosition };
