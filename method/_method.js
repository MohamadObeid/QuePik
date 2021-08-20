const {clearIntervals} = require('./clearIntervals')
const {clearValues} = require('./clearValues')
const {clone} = require('./clone')
const {derive} = require('./derive')
const {duplicate, duplicates} = require('./duplicate')
const {getParam} = require('./getParam')
const {isArabic} = require('./isArabic')
const {isEqual} = require('./isEqual')
const {merge} = require('./merge')
const {overflow} = require('./overflow')
const {toBoolean} = require('./toBoolean')
const {toComponent} = require('./toComponent')
const {toId} = require('./toId')
const {toObject} = require('./toObject')
const {toString} = require('./toString')
const {update} = require('./update')
const {createDocument} = require('./createDocument')
const {createControls} = require('./createControls')
const {toArray} = require('./toArray')
const {generate} = require('./generate')
const {createElement} = require('./createElement')
const {addEventListener} = require('./event')
const {execute} = require('./execute')
const {controls} = require('./controls')
const {setContent} = require('./setContent')
const {route} = require('./route')
const {starter} = require('./starter')
const {setState} = require('./state')
const {setPosition} = require('./setPosition')
const {droplist} = require('./droplist')
const {actionlist} = require('./actionlist')
const {createView} = require('./createView')
const {filter} = require('./filter')
const {setValue} = require('./setValue')
const {remove} = require('./remove')
const {focus} = require('./focus')
const {sort} = require('./sort')
const {log} = require('./log')
const {save} = require('./save')
const {deleteDb} = require('./db')
const {defaultInputHandler} = require('./defaultInputHandler')
const {createActions} = require('./createActions')
const {setStyle, resetStyles, toggleStyles, mountAfterStyles} = require('./style')
const {resizeInput, dimensions} = require('./resize')
const {createData, setData, pushData, clearData, removeData} = require('./data')

const _method = {
    clearIntervals, clearValues, clone, derive, duplicate, duplicates, actionlist,
    getParam, isArabic, isEqual, merge, overflow, addEventListener, setState,
    toBoolean, toComponent, toId, toObject, toString, update, execute,
    createDocument, toArray, generate, createElement, controls, route,
    setStyle, resetStyles, toggleStyles, mountAfterStyles, resizeInput, dimensions,
    createData, setData, pushData, clearData, removeData, setContent, starter,
    setPosition, droplist, filter, setValue, createView, createActions,
    createControls, remove, defaultInputHandler, focus, sort, log, save, deleteDb
}

module.exports = _method