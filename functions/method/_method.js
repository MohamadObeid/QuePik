const {clearValues} = require("./clearValues");
const {clone} = require("./clone");
const {derive} = require("./derive");
const {duplicate, duplicates} = require("./duplicate");
const {getParam} = require("./getParam");
const {isArabic} = require("./isArabic");
const {isEqual} = require("./isEqual");
const {merge} = require("./merge");
const {overflow} = require("./overflow");
const {toApproval} = require("./toApproval");
const {toComponent} = require("./toComponent");
const {toId} = require("./toId");
const {toParam} = require("./toParam");
const {toString} = require("./toString");
const {update, removeIds} = require("./update");
const {createDocument} = require("./createDocument");
const {toControls} = require("./toControls");
const {toArray} = require("./toArray");
const {generate} = require("./generate");
const {createElement} = require("./createElement");
const {addEventListener} = require("./event");
const {execute} = require("./execute");
const {controls} = require("./controls");
const {setContent} = require("./setContent");
const {route} = require("./route");
const {starter} = require("./starter");
const {setState} = require("./state");
const {setPosition} = require("./setPosition");
const {droplist} = require("./droplist");
const {createView} = require("./createView");
const {filter} = require("./filter");
const {remove} = require("./remove");
const {focus} = require("./focus");
const {sort} = require("./sort");
const {log} = require("./log");
const {search} = require("./search");
const {flicker} = require("./flicker");
const {textarea} = require("./textarea");
const {save} = require("./save");
const {erase} = require("./erase");
const {toValue} = require("./toValue");
const {toPath} = require("./toPath");
const {reducer} = require("./reducer");
const {toStyle} = require("./toStyle");
const {preventDefault} = require("./preventDefault");
const {createComponent} = require("./createComponent");
const {getJsonFiles} = require("./getJsonFiles");
const {toTag} = require("./toTag");
const {setData} = require("./setData");
const {defaultInputHandler} = require("./defaultInputHandler");
const {createActions} = require("./createActions");
const {blur} = require("./blur");
const {fill} = require("./fill");
const {toAwait} = require("./toAwait");
const {close} = require("./close");
const {pause} = require("./pause");
const {play} = require("./play");
const {note} = require("./note");
const {toCode} = require("./toCode");
const {isPath} = require("./isPath");
const {toNumber} = require("./toNumber");
const {capitalize} = require("./capitalize");
const {popup} = require("./popup");
const {
  setStyle,
  resetStyles,
  toggleStyles,
  mountAfterStyles,
} = require("./style");
const {resize, dimensions} = require("./resize");
const {createData, clearData, removeData} = require("./data");

const _method = {
  clearValues,
  clone,
  derive,
  duplicate,
  duplicates,
  getJsonFiles,
  search,
  getParam,
  isArabic,
  isEqual,
  merge,
  overflow,
  addEventListener,
  setState,
  toApproval,
  toComponent,
  toId,
  toParam,
  toString,
  update,
  execute,
  removeIds,
  createDocument,
  toArray,
  generate,
  createElement,
  controls,
  route,
  textarea,
  setStyle,
  resetStyles,
  toggleStyles,
  mountAfterStyles,
  resize,
  dimensions,
  createData,
  setData,
  clearData,
  removeData,
  setContent,
  starter,
  createComponent,
  setPosition,
  droplist,
  filter,
  createView,
  createActions,
  flicker,
  blur,
  toAwait,
  toControls,
  remove,
  defaultInputHandler,
  focus,
  sort,
  log,
  save,
  erase,
  toCode,
  toPath,
  toValue,
  reducer,
  preventDefault,
  toStyle,
  toTag,
  capitalize,
  fill,
  note,
  pause,
  play,
  close,
  isPath,
  toNumber,
  popup,
};

module.exports = _method;