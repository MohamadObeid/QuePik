const {clearValues} = require('./clearValues')
const {clone} = require('./clone')
const {derive} = require('./derive')
const {duplicate, duplicates} = require('./duplicate')
const {getParam} = require('./getParam')
const {isArabic} = require('./isArabic')
const {isEqual} = require('./isEqual')
const {merge} = require('./merge')
const {overflow} = require('./overflow')
const {toApproval} = require('./toApproval')
const {toComponent} = require('./toComponent')
const {toId} = require('./toId')
const {toParam} = require('./toParam')
const {toString} = require('./toString')
const {update, removeIds} = require('./update')
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
const {createView} = require('./createView')
const {filter} = require('./filter')
const {remove} = require('./remove')
const {focus} = require('./focus')
const {sort} = require('./sort')
const {log} = require('./log')
const {search} = require('./search')
const {flicker} = require('./flicker')
const {textarea} = require('./textarea')
const {save} = require('./save')
const {erase} = require('./erase')
const {toValue} = require('./toValue')
const {toPath} = require('./toKey')
const {reducer} = require('./reducer')
const {toStyle} = require('./toStyle')
const {preventDefault} = require('./preventDefault')
const {createComponent} = require('./createComponent')
const {getJsonFiles} = require("./getJsonFiles")
const {toTag} = require("./toTag")
const {setData} = require("./setData")
const {defaultInputHandler} = require('./defaultInputHandler')
const {createActions} = require('./createActions')
const {blur} = require('./blur')
const {capitalize} = require('./capitalize')
const {setStyle, resetStyles, toggleStyles, mountAfterStyles} = require('./style')
const {resizeInput, dimensions} = require('./resize')
const {createData, clearData, removeData} = require('./data')

const _method = {
    clearValues, clone, derive, duplicate, duplicates, getJsonFiles, search,
    getParam, isArabic, isEqual, merge, overflow, addEventListener, setState,
    toApproval, toComponent, toId, toParam, toString, update, execute, removeIds,
    createDocument, toArray, generate, createElement, controls, route, textarea,
    setStyle, resetStyles, toggleStyles, mountAfterStyles, resizeInput, dimensions,
    createData, setData, clearData, removeData, setContent, starter, createComponent,
    setPosition, droplist, filter, createView, createActions, flicker, blur,
    createControls, remove, defaultInputHandler, focus, sort, log, save, erase, 
    toPath, toValue, reducer, preventDefault, toStyle, toTag, capitalize
}

module.exports = _method