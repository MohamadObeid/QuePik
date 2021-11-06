const {clearValues} = require("./clearValues")
const {clone} = require("./clone")
const {derive} = require("./derive")
const {duplicate, duplicates} = require("./duplicate")
const {getParam} = require("./getParam")
const {isArabic} = require("./isArabic")
const {isEqual} = require("./isEqual")
const {merge} = require("./merge")
const {overflow} = require("./overflow")
const {toApproval} = require("./toApproval")
const {toComponent} = require("./toComponent")
const {toId} = require("./toId")
const {toParam} = require("./toParam")
const {toString} = require("./toString")
const {update, removeIds} = require("./update")
const {createDocument} = require("./createDocument")
const {toControls} = require("./toControls")
const {toArray} = require("./toArray")
const {generate} = require("./generate")
const {createElement} = require("./createElement")
const {addEventListener} = require("./event")
const {execute} = require("./execute")
const {controls} = require("./controls")
const {setContent} = require("./setContent")
const {starter} = require("./starter")
const {setState} = require("./state")
const {setPosition} = require("./setPosition")
const {droplist} = require("./droplist")
const {createView} = require("./createView")
const {filter} = require("./filter")
const {remove} = require("./remove")
const {focus} = require("./focus")
const {sort} = require("./sort")
const {log} = require("./log")
const {search} = require("./search")
const {flicker} = require("./flicker")
const {textarea} = require("./textarea")
const {save} = require("./save")
const {erase} = require("./erase")
const {toValue} = require("./toValue")
const {toPath} = require("./toPath")
const {reducer} = require("./reducer")
const {toStyle} = require("./toStyle")
const {preventDefault} = require("./preventDefault")
const {createComponent} = require("./createComponent")
const {getJsonFiles} = require("./getJsonFiles")
const {toTag} = require("./toTag")
const {setData} = require("./setData")
const {defaultInputHandler} = require("./defaultInputHandler")
const {createActions} = require("./createActions")
const {blur} = require("./blur")
const {fill} = require("./fill")
const {toAwait} = require("./toAwait")
const {close} = require("./close")
const {pause} = require("./pause")
const {play} = require("./play")
const {note} = require("./note")
const {toCode} = require("./toCode")
const {isPath} = require("./isPath")
const {toNumber} = require("./toNumber")
const {capitalize} = require("./capitalize")
const {setElement} = require("./setElement")
const {toFirebaseOperator} = require("./toFirebaseOperator")
const {popup} = require("./popup")
const {keys} = require("./keys")
const {values} = require("./values")
const {toggleView} = require("./toggleView")
const {upload} = require("./upload")
const {compare} = require("./compare")
const {toCSV} = require("./toCSV")
const {decode} = require("./decode")
const firebase = require("./firebase")
const {getDateTime} = require("./getDateTime")
const {getDaysInMonth} = require("./getDaysInMonth")
const {
  setStyle,
  resetStyles,
  toggleStyles,
  mountAfterStyles,
} = require("./style")
const {resize, dimensions} = require("./resize")
const {createData, clearData} = require("./data")

module.exports = {
  getDaysInMonth,
  decode,
  firebase,
  toCSV,
  compare,
  setElement,
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
  getDateTime,
  keys,
  values,
  toFirebaseOperator,
  upload,
  toggleView
}
