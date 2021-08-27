(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
// browserify index.js > browser.js
const { starter } = require("../method/starter")

var root = document.querySelector('#root')

var VALUE = JSON.parse(document.body.getAttribute('VALUE'))
var STATE = JSON.parse(document.body.getAttribute('STATE'))

VALUE.body = document.body
VALUE.window = window
VALUE.root.element = root

starter({ VALUE, STATE, id: 'root' })
},{"../method/starter":60}],5:[function(require,module,exports){
const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Button = (component) => {
    
    component.icon = component.icon || {}
    component = toComponent(component)
    var { style, tooltip, icon, controls } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search.query) {
        component.state = component.search.state
        component.query = toString(component.search)
        component.searchable = true
    }
    
    return {
        ...component,
        class: 'flex-box button',
        type: 'View',
        id,
        tooltip,
        style: {
            border: '1px solid #e0e0e0',
            borderRadius: '.75rem',
            padding: '0.75rem 1rem',
            margin: '0 0.4rem',
            cursor: 'pointer',
            transition: 'border 0.1s',
            ...style,
            after: {
                border: '1px solid #0d6efd',
                ...style.after
            }
        },
        children: [{
            icon,
            type: `Icon?icon.name=${icon.name};icon.code=${icon.code};id=${id}-icon`,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                display: 'flex',
                alignItems: 'center',
                ...(icon.style || {}),
                after: {
                    color: '#0d6efd',
                    ...(icon.style && icon.style.after || {})
                }
            }
        }, {
            type: `Text?text=${component.text};id=${id}-text`,
            style: {
                color: style.color || '#444',
                fontSize: style.fontSize || '1.4rem',
                margin: '0 0.4rem',
                transition: 'color 0.1s',
                after: {
                    color: style.after.color || '#0d6efd'
                }
            }
        }],
        controls: [...controls, {
            actions: `createControls?controls.type=droplist?droplist`
        }, /*{
            event: 'click',
            actions: 'ripple'
        }, */{
            event: 'mouseenter',
            actions: `mountAfterStyles???${id};${id}-text;${id}-icon`
        }, {
            event: 'mouseleave',
            actions: `resetStyles???${id};${id}-text;${id}-icon`
        }]
    }
}

module.exports = {Button}
},{"../method/generate":45,"../method/toComponent":65,"../method/toString":68}],6:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Checkbox = (component) => {
    
    component = toComponent(component)
    var { model, controls } = component

    var id = component.id || generate()
    
    if (model === 'featured')
        return {}

    if (model === 'classic')
        return {
            ...component,
            type: 'Label?class=checkbox',
            controls: {},
            children: [{
                type: `Input?id=${id}-input;input.type=checkbox`,
                controls,
                templated: true,
            }, {
                html: `<svg viewBox="0 0 21 18">
                            <symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
                            </symbol>
                            <defs>
                                <mask id="tick">
                                    <use class="tick mask" href="#tick-path" />
                                </mask>
                            </defs>
                            <use class="tick" href="#tick-path" stroke="currentColor" />
                            <path fill="white" mask="url(#tick)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
                        </svg>
                        <svg class="lines" viewBox="0 0 11 11">
                            <path d="M5.88086 5.89441L9.53504 4.26746" />
                            <path d="M5.5274 8.78838L9.45391 9.55161" />
                            <path d="M3.49371 4.22065L5.55387 0.79198" />
                        </svg>`
            }]
        }
}

module.exports = { Checkbox }
},{"../method/generate":45,"../method/toComponent":65}],7:[function(require,module,exports){
const { generate } = require("../method/generate")
const { toComponent } = require("../method/toComponent")

const Header = (component) => {

    if (component.templated) return component

    component = toComponent(component)
    var { text, style, sort, path, model } = component
    var id = component.id || generate()

    if (model === 'classic') return component

    else if (model === 'featured')
    return {
        ...component,
        type: 'Header',
        id,
        style: {
            display: 'flex',
            ...style,
        },
        children: [{
            type: 'View?class=flex-box;style.position=relative;style.flexDirection=column',
            children: [{
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    width: 'fit-content',
                    fontSize: style.fontSize || '1.4rem',
                    cursor: 'pointer',
                },
                controls: [{
                    event: 'click',
                    actions: [
                        // hide previous visible carrets
                        `setStyle?style.display=none?state.${sort.state}-sort!=${id}-caret?state.${sort.state}-sort`,
                        // show carrets
                        `setStyle?style.display=flex??${id}-caret`,
                        // sort
                        `sort;setState?data=state.${sort.state};id=${sort.id};path=${path};state.${sort.state}-sort=${id}-caret?const.${path}`,
                        // caret-up
                        `setStyle?style.display=flex?value.sort=ascending?${id}-caret-up`,
                        `setStyle?style.display=none?value.sort=descending?${id}-caret-up`,
                        // caret-down
                        `setStyle?style.display=none?value.sort=ascending?${id}-caret-down`,
                        `setStyle?style.display=flex?value.sort=descending?${id}-caret-down`,
                    ]
                }]
            }, {
                type: `View?id=${id}-caret;style.display=none;style.cursor=pointer?const.${path}`,
                children: [{
                    type: `Icon?id=${id}-caret-up;style.position=absolute;style.top=-1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=bi-caret-up-fill`,
                }, {
                    type: `Icon?id=${id}-caret-down;style.position=absolute;style.bottom=-1.1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=bi-caret-down-fill`
                }]
            }]
        }]
    }
}

module.exports = {Header}
},{"../method/generate":45,"../method/toComponent":65}],8:[function(require,module,exports){
const { toString } = require('../method/toString')
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Input = (component) => {

    if (component.templated) return component

    // icon
    component.icon = component.icon || {}

    // input
    component.input = component.input || { type: 'text'}
    component.input.type = component.input.type || 'text'
    component.input.value = component.input.value || ''

    component = toComponent(component)
    var { input, model, droplist, lang, readonly, style, controls, icon, placeholder } = component
    var id = component.id || generate()

    // for search inputs
    if (component.search && component.search.query) {
        component.search.query = toString(component.search)
        component.searchable = true
    }

    component.clearable = component.clearable !== undefined ? component.clearable : true
    component.removable = component.removable !== undefined ? component.removable : true
    component.duplicatable = component.duplicatable !== undefined ? component.duplicatable : true
    
    if (model === 'classic') {
        return {
            ...component,
            style: {
                width: '100%',
                border: '0',
                padding: '0.5rem',
                color: '#444',
                backgroundColor: '#fff',
                height: '4rem',
                borderRadius: '0.25rem',
                fontSize: '1.4rem',

                ...style,
            },
            controls: [...controls,
            {
                event: 'mouseenter??overflow',
                actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
            }, {
                event: 'mouseleave',
                actions: 'hideTooltip',
            }]
        }
    }
    
    if (model === 'featured') {

        return {
            ...component,
            class: 'flex-box',
            type: 'View',
            id,
            controls: { actions: `focus>>50::${id}-input??value.length;value.index=value.length--1` },
            style: {
                display: 'inline-flex',
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                backgroundColor: '#fff',
                height: '4rem',
                borderRadius: '0.25rem',
                border: '0',
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                ...style,
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    color: '#444',
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...(icon.style || {})
                }
            }, {
                type: `Input?id=${id}-input;${(component.currency || component.unit) ? `;path=amount;data=${component.data}` : (component.lang || component.google) ? `;path=name;data=${component.data}` : ''};filterable=${component.filterable}`,
                input,
                readonly,
                droplist,
                placeholder,
                'placeholder-ar': component['placeholer-ar'],
                templated: true,
                style: {
                    width: '100%',
                    height: '100%',
                    borderRadius: style.borderRadius || '0.25rem',
                    backgroundColor: style.backgroundColor || '#fff',
                    fontSize: style.fontSize || '1.4rem',
                    minWidth: style.minWidth || 'initial',
                    border: '0',
                    padding: '0.5rem',
                    color: '#444',
                    transition: 'width 0.2s',
                    outline: 'none',
                },
                controls: [...controls, {
                    actions: 'resizeInput'
                }, {
                    event: `keyup??value.data;e.key=Enter;${component.duplicatable};${component.removable}`,
                    actions: `duplicate::${id}`
                }, {
                    event: `input??value.data!=free`,
                    actions: [
                        `filter::droplist?${component.filterable};droplist`,
                        `setData::${id}-language?data=ar?isArabic`,
                        `search?state=${component.search.state};${component.search.query};id=${component.search.id}?${component.searchable}`
                    ]
                }, {
                    event: `input??value.data=free`,
                    actions: `setValue?value.element.value=''`
                }, {
                    event: 'mouseenter??overflow',
                    actions: 'showTooltip?tooltip=value.data;placement=top?value.data',
                }, {
                    event: 'mouseleave',
                    actions: 'hideTooltip',
                }]
            }, {
                type: `View?class=flex-box ${lang === 'ar' ? 'arabic' : ''}`,
                children: [{
                    type: `Text?path=currency;id=${id}-currency;droplist.items=[asset.currency.options.name];auto-style?const.${component.currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.currency}?!value.data`
                }, {
                    type: `Text?path=unit;id=${id}-unit;droplist.items=[asset.unit.options.name];auto-style?const.${component.unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.unit}?!value.data`
                }, {
                    type: `Text?path=lang;id=${id}-language;droplist.items=[asset.language.options.name];auto-style?const.${component.lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.5rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data=${component.lang}?!value.data`,
                }, {
                    type: `Checkbox?class=align-center;path=google;id=${id}-google;style.cursor=pointer;style.height=1.5rem;style.width=1.5rem;style.margin=0 .75rem?const.${component.google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;auto-style?${component.clearable}||${component.removable}`,
                    style: {
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            `remove::${id}??${component.removable}${component.clearable ? `;value.length::${id}>1;!value.data::${id}-input` : ''}`,
                            `removeData::${id}-input;focus>>50::${id}-input??${component.clearable}`,
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}
},{"../method/generate":45,"../method/toComponent":65,"../method/toString":68}],9:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Item = (component) => {

    component.icon = component.icon || {}
    component.chevron = component.chevron || {}
    component = toComponent(component)
    var { model, state, style, icon, text, tooltip, chevron, controls } = component

    component.borderMarker = component.borderMarker !== undefined ? component.borderMarker : true
    component.readonly = component.readonly !== undefined ? component.readonly : false

    var id = component.id || generate()

    if (model === 'featured')
        return {
            ...component,
            class: 'flex-box item',
            type: 'View',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                height: '4rem',
                cursor: 'pointer',
                pointerEvents: 'fill',
                marginRight: '1px',
                marginLeft: '1px',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                ...style,
                after: {
                    border: '1px solid #ee384e',
                    marginRight: '0',
                    marginLeft: '0',
                    marginBottom: '1px',
                    ...style.after,
                },
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    width: '4rem',
                    color: style.color || '#444',
                    fontSize: '1.8rem',
                    ...(icon.style || {}),
                    after: {
                        color: style.after.color || '#ee384e',
                        ...(icon.style && icon.style.after || {})
                    },
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: style.color || '#444',
                    userSelect: 'none',
                    after: {
                        color: style.after.color || '#ee384e',
                        fontSize: style.after.fontSize || style.fontSize || '1.4rem',
                    }
                },
            }, {
                type: `Icon?icon.name=chevron-right;icon.code=fas;id=${id}-chevron`,
                style: {
                    display: 'flex',
                    position: 'absolute',
                    right: '1.2rem',
                    fontSize: style.fontSize || '1.3rem',
                    color: style.color || '#666',
                    transition: '0.2s',
                    ...(chevron.style || {}),
                    after: {
                        right: '0.8rem',
                        color: '#ee384e',
                        ...(chevron.style && chevron.style.after || {})
                    }
                }
            }],
            controls: [...controls,
            {
                actions: [
                    `mountAfterStyles??mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`,
                    `setState?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountOnLoad`,
                ]
            }, {
                event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
                actions: `createActions?type=item;id=${id};state=${state}`
            }, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text;${id}-chevron`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text;${id}-chevron`
            }]
        }

    if (model === 'classic')
        return {
            ...component,
            class: 'flex-box item',
            type: 'View',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '3.3rem',
                cursor: !component.readonly ? 'pointer' : 'initial',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                padding: '0.9rem',
                borderBottom: !component.readonly ? 'initial' : '1px solid #eee',
                pointerEvents: 'fill',
                ...style,
                after: component.readonly ? {} : {
                    backgroundColor: '#eee',
                    ...style.after,
                },
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    display: icon ? 'flex' : 'none',
                    color: !component.readonly ? style.color || '#444' : '#333',
                    fontSize: !component.readonly ? style.fontSize || '1.4rem' : '1.6rem',
                    fontWeight: !component.readonly ? 'initial' : 'bolder',
                    marginRight: '1rem',
                    ...(icon.style || {}),
                    after: {
                        color: '#444',
                        ...(icon.style && icon.style.after || {}),
                    }
                }
            }, {
                type: `Text?text=${text};id=${id}-text`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: !component.readonly ? style.color || '#444' : '#333',
                    fontWeight: !component.readonly ? 'initial' : 'bolder',
                    userSelect: 'none',
                    textAlign: 'left',
                    after: {
                        color: style.after.color || style.color || '#444'
                    }
                },
            }],
            controls: [...controls, {
                event: 'mouseenter',
                actions: `mountAfterStyles???${id};${id}-icon;${id}-text`
            }, {
                event: 'mouseleave',
                actions: `resetStyles??!mountOnLoad?${id};${id}-icon;${id}-text`
            }, {
                // on item click
                event: `click??!readonly`,
                actions: `setData;setState?data=${text};state.${state}=${id}?!duplicates`,
            }]
        }
}

module.exports = {Item}
},{"../method/generate":45,"../method/toComponent":65}],10:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const List = (component) => {

    component = toComponent(component)
    var { id, model, style, children, controls, toChildren } = component

    component.placement = component.placement || ''
    component.distance = component.distance || '15'
    
    if (model === 'classic')
        return {
            ...component,
            toChildren: '',
            class: `box-shadow list flex-box`,
            type: 'View',
            style: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                position: 'fixed',
                opacity: '0',
                transform: 'translateY(-100%)',
                transition: 'transform 0.2s, opacity 0.1s, top 0.1s',
                minWidth: '18rem',
                pointerEvents: 'none',
                zIndex: '-1',
                ...style,
                after: {
                    opacity: '1',
                    pointerEvents: 'auto',
                    transform: 'translateY(0)',
                    zIndex: '999'
                }
            },
            children: [{
                type: 'View',
                class: 'list-wrap',
                style: {
                    height: '100%',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                    zIndex: '1'
                },
                toChildren,
                children,
            }, {
                class: 'box-shadow list-fin',
                type: 'Text',
                style: {
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: '1rem',
                    height: '1rem',
                    transform: 'rotate(45deg)',
                    borderRadius: '0 0 0 0.4rem',
                    transition: 'top 0.1s',
                    zIndex: '0'
                }
            }],
            controls: [...controls,
            {
                event: 'mouseleave',
                actions: `resetStyles>>200??!mouseenter;!state.${id}-mouseenter`
            }]
        }
}

module.exports = {List}
},{"../method/toComponent":65}],11:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const SearchBox = (component) => {

    component = toComponent(component)
    var { placeholder } = component

    return {
        ...component,
        type: 'View',
        style: {
            flex: '1',
            margin: '0 1rem',
            height: '4.5rem',
        },
        children: [{
            type: 'View?class=overlay;id=search-mini-page-overlay',
            style: {
                zIndex: '-1',
                transition: '0.2s',
                display: 'none',
                after: {
                    opacity: '1>>50',
                    display: 'flex'
                }
            },
            controls: [{
                event: 'click',
                actions: [
                    'resetStyles???search-mini-page;search-mini-page-results',
                    'setStyle?style.opacity=0;style.display=none>>250'
                ],
            }]
        }, {
            type: 'View?id=search-mini-page',
            style: {
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f0f0',
                borderRadius: '.75rem',
                flex: '1',
                top: '1rem',
                position: 'initial>>210',
                width: '60rem',
                after: {
                    backgroundColor: '#fff',
                    boxShadow: '0 0 6px rgba(33, 33, 33, 0.431)',
                    position: 'absolute',
                    width: '60rem',
                }
            },
            children: [{
                type: 'View?class=flex-box',
                style: {
                    flex: '1',
                    borderRadius: '.75rem',
                    height: '4.5rem',
                    justifyContent: 'flex-start',
                },
                children: [{
                    type: 'Icon?icon.name=bi-search',
                    style: {
                        margin: '0 1rem',
                        color: '#888',
                        fontSize: '1.8rem',
                    }
                }, {
                    type: `Input?placeholder=${placeholder};input.type=text`,
                    templated: true,
                    style: {
                        flex: '1',
                        height: '4.5rem',
                        backgroundColor: 'inherit',
                        border: '0',
                        color: '#444',
                        fontSize: '1.4rem',
                        outline: 'none',
                    },
                    controls: [{
                        event: 'focusin',
                        actions: 'mountAfterStyles???search-mini-page-overlay;search-mini-page;search-mini-page-results'
                    }, {
                        event: 'input',
                        actions: 'search?query.collection=all;query.name=input||query.nameEn=input;state=search-input?value.input'
                    }]
                }]
            }, {
                type: 'View?id=search-mini-page-results',
                style: {
                    width: '100%',
                    padding: '0 1rem',
                    transition: '.2s',
                    height: '0',
                    after: {
                        height: '15rem',
                    }
                },
                children: [{
                    type: 'Text?class=divider;style.margin=0'
                }]
            }]
        }]
    }
}

module.exports = {SearchBox}
},{"../method/toComponent":65}],12:[function(require,module,exports){
const { generate } = require('../method/generate')
const {toComponent} = require('../method/toComponent')

const Switch = (component) => {

    component = toComponent(component)
    
    return {
        ...component,
        type: 'View',
        class: 'button-13',
        id: generate(),
        controls: {},
        children: [{
            type: `Input?input.type=checkbox;class=switch-checkbox;id=${component.id}`,
            controls: [...component.controls]
        }, {
            type: 'View?class=knobs',
            children: {
                type: 'Span'
            }
        }]
    }
}

module.exports = {Switch}
},{"../method/generate":45,"../method/toComponent":65}],13:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const Upload = (component) => {

    component = toComponent(component)
    var { upload } = component

    upload.multiple = upload.multiple !== undefined ? upload.multiple : true

    return {
        ...component,
        type: 'View',
        class: `file-drop-area ${component.class || ''}`,
        children: [{
            type: `Icon?icon.name=${upload.type === 'image' ? 'bi-images' : upload.type === 'video' ? 'bi-camera-video' : ''}`,
            style: {
                fontSize: '2.5rem',
                color: '#444',
                marginRight: '1rem'
            }
        }, {
            type: `Text?class=file-msg;text=or drag and drop ${upload.type}s here`
        }, {
            type: `Input?class=file-input;upload.type=${upload.type};upload.multiple=${upload.multiple};upload.accept=${upload.accept};style.height=100%`
        }]
    }
}

module.exports = {Upload}
},{"../method/toComponent":65}],14:[function(require,module,exports){
const {Button} = require('./Button')
const {Input} = require('./Input')
const {Item} = require('./Item')
const {List} = require('./List')
const {Upload} = require('./Upload')
const {Header} = require('./Header')
const {Switch} = require('./Switch')
const {SearchBox} = require('./SearchBox')
const {Checkbox} = require('./Checkbox')

module.exports = { Input, Button, Item, List, Upload, Header, Switch, SearchBox, Checkbox }
},{"./Button":5,"./Checkbox":6,"./Header":7,"./Input":8,"./Item":9,"./List":10,"./SearchBox":11,"./Switch":12,"./Upload":13}],15:[function(require,module,exports){
module.exports = {
    "item": require('./item'),
    "list": require('./list'),
    "droplist": require('./droplist'),
    "actionlist": require('./actionlist'),
    "auto-style": require('./auto-style'),
    "mini-window": require('./mini-window'),
    "toggle-style": require('./toggle-style'),
    "toggle-view": require('./toggle-view'),
}
},{"./actionlist":16,"./auto-style":17,"./droplist":18,"./item":19,"./list":20,"./mini-window":21,"./toggle-style":22,"./toggle-view":23}],16:[function(require,module,exports){
module.exports = ({ params = {}, id }) => {
    var controls = params.controls

    return [{
        event: `click`,
        actions: [
            `setState?state.actionlist-mouseenter;state.actionlist=${controls.id || id}`,
            `setPosition?position.id=actionlist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `actionlist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `mountAfterStyles::actionlist`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `setState?state.actionlist-mouseenter=false`,
            `resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter`
        ]
    }]
}
},{}],17:[function(require,module,exports){
const { toArray } = require("../method/toArray");

module.exports = ({ VALUE, id, params = {} }) => {
    
    var controls = params.controls
    controls.id = toArray(controls.id || id)
    
    return [{
        event: 'mouseenter',
        actions: `mountAfterStyles???${controls.id.join(';')}`
    }, {
        event: 'mouseleave',
        actions: `resetStyles???${controls.id.join(';')}`
    }]
}
},{"../method/toArray":63}],18:[function(require,module,exports){
module.exports = ({ params, id }) => {
    var controls = params.controls

    return [{
        event: `click`,
        actions: [
            `setPosition?state.droplist-mouseenter;state.droplist=${controls.id || id};position.id=droplist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `mountAfterStyles::droplist`,
            `droplist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
        ]
    }, {
        event: 'Input',
        actions: 'setState?state.droplist-filter=value.input;state.droplist-element=value.element'
    }, {
        event: 'mouseleave',
        actions: `setState?state.droplist-mouseenter=false`
    }]
}
},{}],19:[function(require,module,exports){
module.exports = ({params}) => ([
    `setData?data=value.text`,
    `setValue;resetStyles?value.mountOnLoad::state.${params.state}=false??state.${params.state}`,
    `setState?state.${params.state}=[${params.id || 'value.id'},${params.id || 'value.id'}++-icon,${params.id || 'value.id'}++-text,${params.id || 'value.id'}++-chevron]`,
    `setValue;mountAfterStyles?value.mountOnLoad::state.${params.state}??state.${params.state}`,
])
},{}],20:[function(require,module,exports){
module.exports = ({ VALUE, STATE, params, id }) => {
    var controls = params.controls
    
    return [{
        event: `click`,
        actions: [
            `setState?state.${controls.id}-mouseenter`,
            `mountAfterStyles::${controls.id}`,
            `setPosition?position.placement=${controls.placement || 'right'};position.distance=${controls.distance || '15'};position.id=${controls.id}`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `resetStyles>>200::${controls.id}??!mouseenter;!mouseenter::${controls.id};!state.${controls.id}-mouseenter`,
            `setState?state.${controls.id}-mouseenter=false`
        ]
    }]
}
},{}],21:[function(require,module,exports){
const { generate } = require("../method/generate")

module.exports = ({params}) => {
    var controls = params.controls
    var state = generate()
    
    return [{
        event: 'click',
        actions: [
            `createView?state.${state}=value.data;value.Data::mini-window-view=${state};view=${controls.view}??mini-window-view`,
            `setStyle?style.display=flex;style.opacity=1>>25??mini-window`
        ]
    }]
}
},{"../method/generate":45}],22:[function(require,module,exports){
module.exports = ({params}) => {
    var controls = params.controls
    return [{
        event: 'click',
        actions: `toggleStyles::${controls.id || 'value.id'}`
    }]
}
},{}],23:[function(require,module,exports){
module.exports = ({ VALUE, params, id }) => {
    var controls = params.controls
    
    return [{
        event: `click??global.${controls.id}.view!=${controls.view}`,
        actions: [
            `resetStyles;mountAfterStyles>>400???global.${controls.id}.parent.id`,
            `createView>>250?value.Data::${controls.id}=value.data;view=${controls.view}??${controls.id}`,
        ]
    }]
}
},{}],24:[function(require,module,exports){
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
const {actionlist} = require('./actionlist')
const {createView} = require('./createView')
const {filter} = require('./filter')
const {setValue} = require('./setValue')
const {remove} = require('./remove')
const {focus} = require('./focus')
const {sort} = require('./sort')
const {log} = require('./log')
const {deleteDb, saveDb} = require('./db')
const {defaultInputHandler} = require('./defaultInputHandler')
const {createActions} = require('./createActions')
const {setStyle, resetStyles, toggleStyles, mountAfterStyles} = require('./style')
const {resizeInput, dimensions} = require('./resize')
const {createData, setData, pushData, clearData, removeData} = require('./data')

const _method = {
    clearValues, clone, derive, duplicate, duplicates, actionlist,
    getParam, isArabic, isEqual, merge, overflow, addEventListener, setState,
    toBoolean, toComponent, toId, toObject, toString, update, execute, removeIds,
    createDocument, toArray, generate, createElement, controls, route,
    setStyle, resetStyles, toggleStyles, mountAfterStyles, resizeInput, dimensions,
    createData, setData, pushData, clearData, removeData, setContent, starter,
    setPosition, droplist, filter, setValue, createView, createActions,
    createControls, remove, defaultInputHandler, focus, sort, log, saveDb, deleteDb
}

module.exports = _method
},{"./actionlist":25,"./clearValues":26,"./clone":27,"./controls":28,"./createActions":29,"./createControls":30,"./createDocument":31,"./createElement":32,"./createView":34,"./data":35,"./db":36,"./defaultInputHandler":37,"./derive":38,"./droplist":39,"./duplicate":40,"./event":41,"./execute":42,"./filter":43,"./focus":44,"./generate":45,"./getParam":46,"./isArabic":47,"./isEqual":48,"./log":49,"./merge":50,"./overflow":51,"./remove":52,"./resize":54,"./route":55,"./setContent":56,"./setPosition":57,"./setValue":58,"./sort":59,"./starter":60,"./state":61,"./style":62,"./toArray":63,"./toBoolean":64,"./toComponent":65,"./toId":66,"./toObject":67,"./toString":68,"./update":69}],25:[function(require,module,exports){
const actionlist = ({ VALUE, STATE, id, params = {} }) => {
    
    var local = VALUE[id]
    if(!local) return

    var actionList = VALUE['actionlist']
    var deleteBtn = VALUE['action-list-delete']
    var editBtn = VALUE['action-list-edit']
    var hideBtn = VALUE['action-list-hide']
    var archiveBtn = VALUE['action-list-archive']
    var dulicateBtn = VALUE['action-list-duplicate']

    actionList.Data = deleteBtn.Data = editBtn.Data = hideBtn.Data = archiveBtn.Data = dulicateBtn.Data = STATE[local.Data]
}

module.exports = {actionlist}
},{}],26:[function(require,module,exports){
const { clone } = require("./clone")

const clearValues = (obj) => {
    var newObj = clone(obj)

    if (typeof obj === 'undefined') return ''

    if (typeof obj === 'string') return ''

    if (Array.isArray(obj)) {
        newObj = []
        obj.map((element, index) => {

            if (typeof element === 'object') {
                newObj[index] = clearValues(element)
            } else newObj[index] = ''

        })

        return newObj
    }

    Object.entries(obj).map(([key, value]) => {
        
        if (Array.isArray(value)) {
            newObj[key] = []
            value.map((element, index) => {

                if (typeof element === 'object') {
                    newObj[key][index] = clearValues(element)
                } else newObj[key][index] = ''

            })
        }
        else if (typeof value === 'object') newObj[key] = clearValues(value)
        else newObj[key] = ''
    })

    return newObj
}

module.exports = {clearValues}
},{"./clone":27}],27:[function(require,module,exports){
const clone = (obj) => {
    
    // if (isElement(obj)) return obj

    /*if (Array.isArray(obj)) {

        copy = []
        obj.map((value, index) => {

            if (typeof value === "object") copy[index] = clone(value)
            else copy[index] = value
        })

    } else {

        copy = obj.constructor()
        Object.entries(obj).map(([key, value]) => {
            copy[key] = value
        })

    }*/

    var copy 
    if (typeof obj !== 'object') copy = obj
    else if (Array.isArray(obj)) copy = [...obj]
    else {
      var element
      if (obj.element) element = obj.element
      copy = JSON.parse(JSON.stringify(obj))
      if (element) copy.element = element
    }

    return copy
     
}

const isElement = (obj) => {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrome)
      return obj instanceof HTMLElement;
    }
    catch(e){
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have (works on IE7)
      return (typeof obj==="object") &&
        (obj.nodeType===1) && (typeof obj.style === "object") &&
        (typeof obj.ownerDocument ==="object");
    }
  }

module.exports = {clone}
},{}],28:[function(require,module,exports){
const controls = ({ VALUE, STATE, controls, id }) => {
    
    const { addEventListener } = require("./event")
    const { execute } = require("./execute")
    const { toArray } = require("./toArray")
    const { watch } = require("./watch")

    var local = VALUE[id]

    // controls coming from createControls action
    controls = controls || local.controls

    controls && toArray(controls).map(controls => {
        
        // watch
        if (controls.watch) watch({ VALUE, STATE, controls, id })

        // event
        else if (controls.event) addEventListener({ VALUE, STATE, controls, id })

        // execute onload
        else execute({ VALUE, STATE, controls, id })
    })
}

module.exports = {controls}
},{"./event":41,"./execute":42,"./toArray":63,"./watch":70}],29:[function(require,module,exports){
const _controls = require('../controls/_controls')

const createActions = ({ VALUE, STATE, params, id }) => {
    
    const { execute } = require('./execute')
    
    if (!params.type) return
    var actions = _controls[params.type]({ VALUE, STATE, params, id })

    execute({ VALUE, STATE, actions, id })
}

module.exports = {createActions}
},{"../controls/_controls":15,"./execute":42}],30:[function(require,module,exports){
const {controls} = require("./controls")
const _controls = require('../controls/_controls')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var exists = Object.entries(_controls).find(([key]) => key === params.controls.type)
    if (!exists) return
    
    // if (local[controls]) params = local[controls] || {}
    
    controls({ VALUE, STATE, id, controls: _controls[params.controls.type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}
},{"../controls/_controls":15,"./controls":28}],31:[function(require,module,exports){
(function (process){(function (){
const { createElement } = require("./createElement")
const _page = require('../page/_page')
const path = require('path')
const fs = require('fs')

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}
    
    // get assets
    STATE.asset = getAssets()

    // get views
    STATE.view = getViews()

    // body
    var id = 'body'
    VALUE[id] = {}
    VALUE[id].id = id
    //VALUE[id].childrenSiblings = []

    // root
    var id = 'root'
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = 'View'
    VALUE[id].children = []
    VALUE[id].parent = 'body'
    
    // push page views to root
    page.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))

    // push public views to root
    _page.public.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))
    
    // create html
    innerHTML = createElement({ STATE, VALUE, id })
    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>digiTrip</title>
        <link rel="stylesheet" href="index.css"/>
        <link href='https://css.gg/trash.css' rel='stylesheet'>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </head>
    <body VALUE='${JSON.stringify(VALUE)}' STATE='${JSON.stringify(STATE)}'>
        ${innerHTML}
        <script src="browser.js"></script>
    </body>
    </html>`
}


// assets
const getAssets = () => {

    var assets = {}
    var assetsFolderPath = path.join(process.cwd(), 'asset')
    
    fs.readdirSync(assetsFolderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(assetsFolderPath, fileName))
        fileName = fileName.split('.json')[0]
        assets[fileName] = JSON.parse(file)
    })
    
    return assets
}

// views
const getViews = () => {

    var views = {}
    var viewsFolderPath = path.join(process.cwd(), 'view')
    
    fs.readdirSync(viewsFolderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(viewsFolderPath, fileName))
        fileName = fileName.split('.json')[0]
        views[fileName] = JSON.parse(file)
    })

    return views
}

module.exports = {createDocument}
}).call(this)}).call(this,require('_process'))
},{"../page/_page":71,"./createElement":32,"_process":3,"fs":1,"path":2}],32:[function(require,module,exports){
const { generate } = require("./generate")
const { toObject } = require("./toObject")
const { toBoolean } = require("./toBoolean")
const { override } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const { createTags } = require("./createTags")

const createElement = ({ STATE, VALUE, id }) => {

    var innerHTML = ''
    var local = VALUE[id]
    var parent = VALUE[local.parent]

    // html
    if (local.html) return local.html

    // view value
    if (local.view && STATE.view[local.view]) local = clone(STATE.view[local.view])

    // no value
    if (!local.type) return

    // destructure type, params, & conditions from type
    var type = local.type.split('?')[0]
    var params = local.type.split('?')[1] 
    var conditions = local.type.split('?')[2]

    // type
    local.type = type

    // parent
    local.parent = parent.id

    // id 
    local.id = local.id || generate()
    id = local.id

    // class
    local.class = local.class || ''

    // Data
    local.Data = parent.Data

    // derivations
    local.derivations = local.derivations || [...(parent.derivations || [])]

    // first mount of local
    VALUE[id] = local

    /////////////////// approval & params /////////////////////
    
    // approval
    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
    if (!approved) return
    
    // push destructured params from type to local
    if (params) {
        params = toObject({ VALUE, STATE, string: params, id })
        Object.entries(params).map(([k, v]) => local[k] = v )
        if (params.id) {

            delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
            id = params.id

        } else if (params.data) {

            var state = local.Data = generate()
            STATE[state] = params.data
            
        }
    }
    if (local.tt) console.log(local, STATE[local.Data]);
    // pass to children
    if (parent.toChildren) {

        if (typeof parent.toChildren === 'string')
        parent.toChildren = toObject({ VALUE, STATE, string: parent.toChildren, id })
        local = override(local, parent.toChildren)
    }
    
    // icon
    if (local.type === 'Icon') {
        local.icon.name = local.icon.name || ''
        if (local.icon.google) local.google = true

        if (local.icon.outlined || local.icon.type === 'outlined') local.outlined = true
        else if (local.icon.rounded || local.icon.type === 'rounded') local.rounded = true
        else if (local.icon.sharp || local.icon.type === 'sharp') local.sharp = true
        else if (local.icon.twoTone || local.icon.type === 'twoTone') local.twoTone = true
    }

    if (local.duplicating) {

        delete local.path
        delete local.data
    }

    // path
    var path = typeof local.path === 'string' && local.path !== '' ? local.path.split('.') : []
    if (path.length > 0) {

        if (!local.Data) {

            var state = local.Data = generate()
            STATE[state] = local.data || {}
        }

        // convert string numbers paths to num
        path = path.map(k => { 
            if (!isNaN(k)) k = parseFloat(k) 
            return k
        })

        // push path to a data array and derivations last element is not an index
        if (isNaN(path[0])) {
            var data = derive(STATE[parent.Data], parent.derivations)[0]
            if (Array.isArray(data)) local.derivations.push(0)
        }

        local.derivations.push(...path)
    }
    
    // data (turnoff is do not mount data)
    var data, isArray
    if (parent.turnOff) { data = ''; local.turnOff = true }                     //def value
    else { [data, derivations, isArray] = derive(STATE[local.Data], local.derivations, false, local.data, true) }
    
    if (isArray) {
        
        innerHTML = data.map((data, index) => {

            var keys = clone(derivations)
            keys.push(index, ...path)
            
            // data
            var [data, derivations] = derive(STATE[local.Data], keys, false, local.data, true)
            VALUE[id] = { ...local, id, data, derivations }

            return createTags({ VALUE, STATE, id })

        }).join('')

    } else {

        VALUE[id] = { ...local, data, derivations }
        innerHTML = createTags({ VALUE, STATE, id })
    }
        
    return innerHTML
}

module.exports = {createElement}
},{"./clone":27,"./createTags":33,"./derive":38,"./generate":45,"./merge":50,"./toBoolean":64,"./toObject":67}],33:[function(require,module,exports){
const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toBoolean } = require("./toBoolean")
const { toObject } = require("./toObject")

const _component = require("../component/_component")

const createTags = ({ VALUE, STATE, id }) => {
    
    const { execute } = require("./execute")

    var local = VALUE[id]
    if (!local) return

    if (Array.isArray(local.data) && local.data.length > 0) {

        local.length = local.data.length
        var $ = clone(local)
        delete VALUE[id]

        return $.data.map((data, index) => {

            var id = generate()
            var local = clone($)

            local.derivations = [...local.derivations, index]
            local.data = data
            local.id = id

            // components
            if (_component[local.type]) {
                
                local = _component[local.type](local)
    
                // destructure type, params, & conditions from type
                var type = local.type.split('?')[0]
                var params = local.type.split('?')[1] 
                var conditions = local.type.split('?')[2]
        
                // type
                local.type = type
                
                // approval
                var approved = toBoolean({ VALUE, STATE, string: conditions, id })
                if (!approved) return
                
                // push destructured params from type to local
                if (params) {
                    params = toObject({ VALUE, STATE, string: params, id })
                    Object.entries(params).map(([k, v]) => local[k] = v )
                    if (params.id) {

                        delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                        id = params.id

                    } else if (params.data) {

                        var state = local.Data = generate()
                        STATE[state] = params.data
            
                    }
                }
            }
            
            VALUE[id] = local
            
            // execute onload actions
            if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })

            return oneTag({ STATE, VALUE, id })

        }).join('')
    }


    // components
    if (_component[local.type]) {

        local = _component[local.type](local)

        // destructure type, params, & conditions from type
        var type = local.type.split('?')[0]
        var params = local.type.split('?')[1] 
        var conditions = local.type.split('?')[2]

        // type
        local.type = type
        
        // approval
        var approved = toBoolean({ VALUE, STATE, string: conditions, id })
        if (!approved) return
        
        // push destructured params from type to local
        if (params) {
            params = toObject({ VALUE, STATE, string: params, id })
            Object.entries(params).map(([k, v]) => local[k] = v )
            if (params.id) {

                delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                id = params.id

            } else if (params.data) {

                var state = local.Data = generate()
                STATE[state] = params.data

            }
        }
    }
    
    VALUE[id] = local
    //VALUE[local.parent].childrenSiblings.push(id)
    
    // execute onload actions
    if (local.actions) execute({ VALUE, STATE, id, actions: local.actions, instantly: true })

    return oneTag({ STATE, VALUE, id })
}



const oneTag = ({ STATE, VALUE, id }) => {

    const { createElement } = require("./createElement")
    var tag, local = VALUE[id], style = ''
    
    if (local.style) 
    Object.entries(local.style).map(([k, v]) => {
        if (k === 'after' || k.includes('>>')) return
        else if (k === 'borderBottom') k = 'border-bottom'
        else if (k === 'borderLeft') k = 'border-left'
        else if (k === 'borderRight') k = 'border-right'
        else if (k === 'borderTop') k = 'border-top'
        else if (k === 'marginBottom') k = 'margin-bottom'
        else if (k === 'marginLeft') k = 'margin-left'
        else if (k === 'marginRight') k = 'margin-right'
        else if (k === 'marginTop') k = 'margin-top'
        else if (k === 'fontSize') k = 'font-size'
        else if (k === 'fontWeight') k = 'font-weight'
        else if (k === 'lineHeight') k = 'line-weight'
        else if (k === 'textOverflow') k = 'text-overflow'
        else if (k === 'whiteSpace') k = 'white-space'
        else if (k === 'backgroundColor') k = 'background-color'
        else if (k === 'zIndex') k = 'z-index'
        else if (k === 'boxShadow') k = 'box-shadow'
        else if (k === 'borderRadius') k = 'border-radius'
        else if (k === 'zIndex') k = 'z-index'
        else if (k === 'alignItems') k = 'align-items'
        else if (k === 'justifyContent') k = 'justify-content'
        else if (k === 'userSelect') k = 'user-select'
        else if (k === 'textAlign') k = 'text-align'
        else if (k === 'pointerEvents') k = 'pointer-events'
        else if (k === 'flexDirection') k = 'flex-direction'
        else if (k === 'maxWidth') k = 'max-width'
        else if (k === 'minWidth') k = 'min-width'
        else if (k === 'maxHeight') k = 'max-height'
        else if (k === 'minHeight') k = 'min-height'
        else if (k === 'gridTemplateColumns') k = 'grid-template-columns'
        else if (k === 'gridTemplateRows') k = 'grid-template-rows'
        style += `${k}:${v}; `
    })

    // innerHTML
    var text = (typeof local.data !== 'object' && local.data) || local.text || ''
    var innerHTML = text
    
    if (local.children) {
        
        innerHTML = toArray(clone(local.children)).map((child, index) => {
        
            var id = child.id || generate()
            VALUE[id] = clone(child)
            VALUE[id].id = id
            VALUE[id].index = index
            VALUE[id].parent = local.id
            
            return createElement({ STATE, VALUE, id })
    
        }).join('')
    }
    
    if (local.type === 'View')
    tag = `<div class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</div>`

    else if (local.type === 'Table')
    tag = `<table class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</table>`

    else if (local.type === 'Row')
    tag = `<tr class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</tr>`

    else if (local.type === 'Header')
    tag = `<th class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</th>`

    else if (local.type === 'Cell')
    tag = `<td class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</td>`

    else if (local.type === 'Label')
    tag = `<label class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</label>`

    else if (local.type === 'Span')
    tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`

    else if (local.type === 'Text')
    tag = `<p class='${local.class}' id='${local.id}' style='${style}'>${text}</p>`

    else if (local.type === 'Icon') 
    tag = `<i class='material-icons${local.outlined ? '-outlined' : local.rounded ? '-round' : local.sharp ? '-sharp' : local.twoTone ? '-two-tone' : ''} ${local.class || ''} ${local.icon.name}' id='${local.id}' style='${style}'>${local.google ? local.icon.name : ''}</i>`
    
    else if (local.type === 'Input')
    tag = `<input class='${local.class}' id='${local.id}' style='${style}' ${local.upload ? `type=file accept='${local.upload.type}/*' ${local.upload.multiple ? 'multiple': ''}` : ''} type='${local.input.type || 'text'}' placeholder='${local.placeholder || ''}' value='${local.data || local.input.value || ''}' ${local.readonly ? 'readonly' : ''} />`
    
    else if (local.type === 'Paragraph')
    tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}'>${text}</textarea>`

    // linkable
    if (local.link) {

        tag = `<a href=${local.link}>${tag}</a>`
        local.controls = toArray(local.controls) || []
        local.controls.push({
            event: 'click',
            actions: `route?route=${local.link}`
        })
    }
    
    return tag
}

module.exports = {createTags}
},{"../component/_component":14,"./clone":27,"./createElement":32,"./execute":42,"./generate":45,"./toArray":63,"./toBoolean":64,"./toObject":67}],34:[function(require,module,exports){
const { update } = require("./update")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { removeIds } = require("./update")
const { clone } = require("./clone")

const createView = ({ STATE, VALUE, params ={}, id }) => {

    var local

    // append view to root
    if (id === 'root') {

        id = generate()
        var element = document.createElement("div")
        element.id = id

        element.style.height = '100%'
        element.style.width = '100%'

        VALUE[id] = {element, id, derivations: []}
        local = VALUE[id]

        VALUE.root.element.appendChild(element)

    } else local = VALUE[id]

    if (!local) return

    // delete prev elements and ids
    var children = [...local.element.children]
    
    children.map(child => {
        var id = child.id

        removeIds({ VALUE, id })
        
        VALUE[id].element.remove()
        delete VALUE[id]
    })

    var view = params.view

    if (!view) return
    // if (local.view === view) return
    
    // local.view = view
    if (!STATE.view[view]) return

    local.children = toArray(clone(STATE.view[view]))
    
    // update
    update({ VALUE, STATE, id })
}

module.exports = {createView}
},{"./clone":27,"./generate":45,"./toArray":63,"./update":69}],35:[function(require,module,exports){
const { clone } = require("./clone")
const { setContent } = require("./setContent")

const createData = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, STATE[local.Data])
}

const pushData = ({ STATE, VALUE, params }) => {
    var value = params.data
    setData({ STATE, VALUE, value })
}

const setData = ({ STATE, VALUE, params = {}, id }) => {
    var local = VALUE[id]
    if (!STATE[local.Data]) return

    var path = params.path
    if (path) path = path.split('.')
    else path = []

    
    // convert string numbers paths to num
    path = path.map(k => { 
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    var value = (params.value !== undefined && params.value) || params.data

    var derivations = clone(local.derivations)
    if (params.derivations) derivations = params.derivations.split('.')

    if (value === undefined) value = ''
    local.data = value

    setContent({ VALUE, params: { value }, id })

    var keys = [...derivations, ...path]
    
    keys.reduce((o, k, i) => {
        if (!o) return o
        
        if (i === keys.length - 1) {

            if (Array.isArray(o[k]) && typeof value !== 'object') {

                if (isNaN(k) && o[k].length === 0) {

                    local.derivations.push(0)
                    o[k][0] = value
                    
                } else o[k].push(value)


            } else o[k] = value

        } else {
            if (!o[k]) return o[k] = {}

            if (i === keys.length - 2 && !value) {
                /*if (Array.isArray(o[k]) && o[k].length === 1) {
                    delete o[k]
                    local.derivations.pop()
                    update({ VALUE, STATE, id: local.parent })
                }*/
            }
        }

        return o[k]
    }, STATE[local.Data])
}

const clearData = ({ VALUE, STATE, id }) => {
    setData({ VALUE, STATE, id })
}

const removeData = ({ STATE, VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!STATE[local.Data]) return

    var path = params.path
    path = path ? path.split('.') : []

    // convert string numbers paths to num
    path = path.map(k => { 
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })
    
    path = [...local.derivations, ...path]
    
    path.reduce((o, k, i) => {
        if (i === path.length - 1) {
            if (Array.isArray(o)) return o.splice(k, 1)
            else return delete o[k]
        }
        return o[k]
    }, STATE[local.Data])

    setContent({ VALUE, id })
    console.log(STATE[local.Data]);
}

module.exports = {createData, setData, pushData, clearData, removeData}
},{"./clone":27,"./setContent":56}],36:[function(require,module,exports){
const deleteDb = async ({ VALUE, STATE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    if (!params.delete['file-name']) return
    var { data: { data, message, success } } = await axios.delete('/api/asset', { data: params.delete })
    
    console.log(message, success);
}

const saveDb = async ({ VALUE, STATE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    if (!params.save['file-name']) return
    var { data: { data, message, success } } = await axios.post('/api/asset', params.save)
    
    console.log(message, success);
}

module.exports = {deleteDb, saveDb}
},{}],37:[function(require,module,exports){
const { setData } = require("./data")
const { resizeInput } = require("./resize")
const { isArabic } = require("./isArabic")
const { removeData } = require("./data")

const defaultInputHandler = ({ STATE, VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (local.element.tagName !== 'INPUT' && local.element.tagName !== 'TEXTAREA') return

    // checkbox input
    if (local.input && local.input.type === 'checkbox') {
        if (local.data === true) local.element.checked = true

        var myFn = (e) => {

            // local doesnot exist
            if (!VALUE[id]) return e.target.removeEventListener('change', myFn)

            var value = e.target.checked
            local.data = value

            if (STATE[local.Data] && local.derivations[0] != '') {

                // reset Data
                setData({ STATE, VALUE, params: { value }, id })
            }
        }

        return local.element.addEventListener('change', myFn)
    }

    // input
    local.value = local.element.value
    
    if (local.input && local.input.type === 'number')
        local.element.addEventListener("mousewheel", (e) => e.target.blur())

    if (local.input && local.input.value && !local.data)
        setData({ STATE, VALUE, params: { value: local.input.value }, id })

    if (local.readonly) return

    var myFn = (e) => {

        // VAR[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener('input', myFn)

        var value = e.target.value

        // for number inputs, strings are rejecteds
        if (local.input && local.input.type === 'number') {
            if (isNaN(value) || local.data === 'free') return
            value = parseFloat(value)
        }

        // for uploads
        if (local.upload) {

            value = e.target.files
            var length = Object.entries(value).length

            if (length === 0) return
            else if (length === 1) value = value[0].name
            else if (length > 1) {
                value = []
                Object.entries(e.target.files).map(([key, val]) => {
                    value.push(val.name)
                })
            }

        }

        local.element.value = value
        local.value = value
        local.data = value

        if (STATE[local.Data] && local.derivations[0] != '') {

            // reset Data
            setData({ STATE, VALUE, params: { value }, id })
            
            // remove value from data
            if (value === '') return removeData({ VALUE, STATE, id })
        }

        // resize
        resizeInput({ VALUE, id })

        // arabic values
        isArabic({ VALUE, params: { value }, id })

        console.log(local.data, STATE[local.Data])
    }

    local.element.addEventListener('input', myFn)
}

module.exports = {defaultInputHandler}
},{"./data":35,"./isArabic":47,"./resize":54}],38:[function(require,module,exports){
const { merge } = require("./merge")

const derive = (data, keys, fullDerivation, defaultData, writable) => {
    
    var derivedData = data
    var isArray = false

    if (!Array.isArray(keys)) keys = keys.split('.')

    derivedData = keys.reduce((o, k, i) => {
        if (isArray) return o

        if (k === 'merge') return merge(o)

        // path doesnot exist => create path
        if (writable && typeof o[k] !== 'object') {

            if (i < keys.length - 1) {
                if (!isNaN(keys[i + 1])) o[k] = []
                else o[k] = {}
            }

            else if (i === keys.length - 1) {

                if (defaultData || defaultData === 0) {
                    if (!o[k]) o[k] = defaultData
                } else if (Array.isArray(o) && isNaN(k)) {
                    if (o.length === 0) {
                        o.push({})
                        keys.splice(i, 0, 0)
                    }
                }
            }
        }

        if (o === undefined) return undefined

        if (Array.isArray(o) && isNaN(k)) {

            if (fullDerivation) o = o.map(o => derive(o, keys.slice(i), true)[0])
            else keys = keys.slice(0, i) || []

            isArray = true
            return o
        }

        return o[k]
    }, data)
    
        // do not touch isArray...
    return [derivedData, keys, isArray]
}


module.exports = {derive}
},{"./merge":50}],39:[function(require,module,exports){
const { generate } = require('./generate')
const { update } = require('./update')
const { filter } = require('./filter')
const { toObject } = require('./toObject')
const { clone } = require('./clone')

const droplist = ({ VALUE, STATE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    var dropList = VALUE['droplist'] // droplist

    // items
    var items = clone(local.droplist.items) || []
    dropList.derivations = clone(local.derivations)
    dropList.Data = local.Data

    // path
    if (params.path) dropList.derivations = params.path.split('.')

    // input components => focus
    var inputid
    if (local.lang || local.unit || local.currency)
        inputid = VALUE[local.parent].element.previousSibling.id

    // data related items
    var index = items.findIndex(item => item && item.split('.')[0] === 'Data' || item.split('.')[0] === 'data')
    if (index !== -1) {
        var k = generate()
        var editedItem = toObject({ VALUE, STATE, string: `${k}=${items[index]}`, id })[k]
        items.splice(index, 1)
        items.push(...editedItem)
    }
    
    items = items.filter(item => item)
    if (items.length > 0) dropList.children = items.map(item => {

        var readonly = false
        item = item.split('>>')
        if (item[1]) readonly = item[1].split(';').find(param => param === 'readonly')

        return {
            type: `Item?text=${item[0]};readonly=${readonly};data=${item[0]}`,
            controls: [{
                event: `click??!readonly;state.droplist=${id}`,
                actions: [
                    `setContent::${id};focus::${inputid}?content=${item[0]}`,
                    `setData::${inputid}?data=free?const.${item[0]}=free`,
                    `setData::${inputid}?data=''?const.${item[0]}!=free;value.data=free`
                ]
            }]
        }
    })
    
    dropList.turnOff = true
    update({ VALUE, STATE, id: 'droplist' })
    
    if (dropList.filterable) {
        // get input value for filter
        var value = local.element.value

        if (!value) {
            value = local.getElementsByTagName('INPUT')[0]
            if (value) value = value.value
        }

        if (value) filter({ VALUE, STATE, params: { value }, id: 'droplist' })
    }
}

module.exports = {droplist}
},{"./clone":27,"./filter":43,"./generate":45,"./toObject":67,"./update":69}],40:[function(require,module,exports){
const { clearValues } = require('./clearValues')
const { clone } = require('./clone')
const { toArray } = require('./toArray')
const { derive } = require('./derive')
const { isEqual } = require('./isEqual')
const { removeDuplicates } = require('./removeDuplicates')
const { generate } = require('./generate')

const duplicate = ({ VALUE, STATE, params = {}, id }) => {

    const { createElement } = require('./createElement')
    const { starter } = require('./starter')

    var local = VALUE[id]
    if (!local) return

    if (STATE[local.Data]) {

        var keys = clone(local.derivations)
        var index = params.index || 0
        var path = params.path ? params.path('.') : []
        
        // convert string numbers paths to num
        if (path.length > 0)
            path = path.map(k => { 
                if (!isNaN(k)) k = parseFloat(k) 
                return k
            })

        if (params.path) keys.push(...path)

        // last index refers to data index => must be poped
        if (!isNaN(keys[keys.length - 1])) {
            index = keys[keys.length - 1]
            keys.pop()
        }

        keys.reduce((o, k, i) => {

            if (i === keys.length - 1) {

                o[k] = toArray(o[k])
                i = o[k].length - 1

                if (i === 0) local.derivations.push(0)
                o[k].push(clone(local.pushData || o[k][i] || ''))

                if (!params.keepValues) {
                    var i = o[k].length - 1
                    o[k][i] = removeDuplicates(clearValues(o[k][i]))
                }
            }

            return o[k]

        }, STATE[local.Data])

    } else {

        var index = params.index || (local.children.length - 1)
        local.children.push(local.children[index])

    }

    var length = local.length || 1
    var id = generate()
    
    VALUE[id] = clone(VALUE[local.parent].children[local.index])
    VALUE[id].id = id
    VALUE[id].parent = local.parent
    VALUE[id].duplicating = true
    VALUE[id].index = local.index
    VALUE[id].derivations = [...local.derivations]

    var local = VALUE[id]
    
    local.derivations[local.derivations.length - 1] = length
    
    // create element => append child
    var newcontent = document.createElement('div')
    newcontent.innerHTML = createElement({ STATE, VALUE, id })

    while (newcontent.firstChild) {
        VALUE[local.parent].element.appendChild(newcontent.firstChild)
    }

    // update length
    var children = [...VALUE[local.parent].element.children]
    children.map(child => {
        var id = child.id
        VALUE[id].length = length + 1
    })

    // starter
    starter({ STATE, VALUE, id })
}

const duplicates = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]

    var [data] = derive(STATE[local.Data], local.derivations), exists
    if (!params.data) return false

    data = toArray(data)
    if (params.data) exists = data.find(data => isEqual(data, params.data))
    else {
        data.map(data0 => {
            if (!exists) exists = data.find(data1 => isEqual(data0, data1))
        })
    }

    return exists
}

module.exports = {duplicate, duplicates}
},{"./clearValues":26,"./clone":27,"./createElement":32,"./derive":38,"./generate":45,"./isEqual":48,"./removeDuplicates":53,"./starter":60,"./toArray":63}],41:[function(require,module,exports){

const { toBoolean } = require('./toBoolean')
const { toObject } = require('./toObject')
const { toId } = require('./toId')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    if (!controls.actions) return
    var local = VALUE[id]

    var events = controls.event.split('?')
    var params = toObject({ VALUE, STATE, string: events[1] })
    var conditions = events[2]
    var idList = events[3]
    var once = params.once !== undefined ? true : false

    idList = toId({ VALUE, STATE, id, string: idList })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0

        // action::id
        var eventid = event.split('::')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        event = event.split('::')[0]

        // action>>timer
        timer = event.split('>>')[1] || 0
        event = event.split('>>')[0]

        if (!event) return

        // add event listener
        idList.map(id => {

            var body = id === 'body'
            var myFn = (e) => {
                
                if (body) id = local.id
                
                // VALUE[id] doesnot exist
                if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                
                var approved = toBoolean({ VALUE, STATE, string: conditions, e, id })
                if (!approved) return

                local[`${controls.actions}-timer`] = setTimeout(
                    () => execute({ VALUE, STATE, controls, e, id }),
                    timer);

            }

            // body || window
            if (id === 'body' || id === 'window') return document.body.addEventListener(event, myFn, { once })

            // elements
            return VALUE[id].element.addEventListener(event, myFn, { once })
        })
    })
}

const defaultEventHandler = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.touchstart = false
    local.mouseenter = false
    local.mousedown = false
    
    events.map(event => {

        const setEventType = (e) => {

            var local = VALUE[id]
            if (!local) return e.target.removeEventListener(event, setEventType)

            if (event === 'mouseenter') local.mouseenter = true
            else if (event === 'mouseleave') local.mouseenter = false
            else if (event === 'mousedown') local.mousedown = true
            else if (event === 'mouseup') local.mousedown = false
            else if (event === 'touchstart') local.touchstart = true
            else if (event === 'touchend') local.touchstart = false
        }

        local.element.addEventListener(event, setEventType)
    })
}

module.exports = {addEventListener, defaultEventHandler}
},{"./execute":42,"./toBoolean":64,"./toId":66,"./toObject":67}],42:[function(require,module,exports){

const { toBoolean } = require("./toBoolean")
const { toArray } = require("./toArray")
const { toObject } = require("./toObject")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { generate } = require("./generate")
const _method = require("./_method")

const execute = ({ VALUE, STATE, controls, actions, e, id, instantly }) => {

    var local = VALUE[id]
    if (!local) return
    if (controls) actions = controls.actions

    // execute actions
    toArray(actions).map(action => {
        
        var approved = true
        var actions = action.split('?')
        var params = actions[1]
        var conditions = actions[2]
        var idList = actions[3]

        actions = actions[0].split(';')

        // action does not exist
        actions.map(action => {

            var name = action.split('::')[0]

            // action>timer
            var timer = name.split('>>')[1] || 0
            name = name.split('>>')[0]

            // reset
            var reset = getParam(action, 'reset', false)
            if (reset) clearTimeout(local[`${name}-timer`])

            const myFn = () => {

                // approval
                approved = toBoolean({ VALUE, STATE, string: conditions, params, id })
                if (!approved) return

                // params
                params = toObject({ VALUE, STATE, string: params, e, id })

                // id's
                idList = toId({ VALUE, STATE, id, string: idList, e })

                // action::id
                var actionid = action.split('::')[1];

                (actionid ? [actionid] : idList).map(id => {

                    // id = value.path
                    if (id.includes('.')) {

                        var k = generate()
                        id = toObject({ VALUE, STATE, string: `${k}=${id}`, e, id: local.id })[k]
                    }

                    // component doesnot exist
                    if (!id || !VALUE[id]) return
                    

                    if (!_method[name]) return
                    _method[name]({ VALUE, STATE, controls, params, e, id })
                })

            }

            if (instantly) return myFn()
            local[`${name}-timer`] = setTimeout(myFn, timer)
        })
    })
    
}

module.exports = {execute}
},{"./_method":24,"./generate":45,"./getParam":46,"./toArray":63,"./toBoolean":64,"./toId":66,"./toObject":67}],43:[function(require,module,exports){
const filter = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var element = params.element || local.element
    var value = params.value || local.element.value

    if (!value) return
    value = value.toLowerCase()
    var textEl = [...element.getElementsByClassName('text')]

    textEl.map(el => {
        if (el.innerHTML.toLowerCase().includes(value)) el.parentElement.style.display = 'flex'
        else el.parentElement.style.display = 'none'
    })
}

module.exports = {filter}
},{}],44:[function(require,module,exports){
const focus = ({ VALUE, id }) => {
    var local = VALUE[id]

    if (local.type === 'Input' || local.type === 'TextInput') local.element.focus()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length > 0) {
                childElements[0].focus()
            }
        }
    }

    var value = local.element.value
    local.element.value = ''
    local.element.value = value
}

module.exports = {focus}
},{}],45:[function(require,module,exports){
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generate = (length) => {
    var result = '';
    if (!length) length = 5
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

module.exports = {generate}
},{}],46:[function(require,module,exports){
const getParam = (string, param, defValue) => {
    if (!string) return defValue
    if (!string.includes('?')) return defValue

    string = string.split('?')[1]
    if (!string) return defValue

    string = string.split(';')
    string = string.find(el => el.includes(param))
    if (!string) return defValue

    var value = string.split(param)[1]
    if (!value) value = true

    return value
}

module.exports = {getParam}
},{}],47:[function(require,module,exports){
var arabic = /[\u0600-\u06FF\u0750-\u077F]/

const isArabic = (value) => {
    if (typeof value === 'string' || typeof value === 'number') return arabic.test(value)

    if (!value) return
    var { VALUE, params = {}, id } = value
    var local = VALUE[id]
    if (local.type !== 'Text' && local.type !== 'Input') return

    var text = params.value || local.element.value || local.element.innerHTML
    if (!text) return 
    var result = arabic.test(text)

    if (result) {
        local.element.classList.add('arabic')
        local.element.style.textAlign = 'right'
        if (local['placeholder-ar']) local.element.placeholder = local['placeholder-ar']
    } else {
        if (local.element.className.includes('arabic')) local.element.style.textAlign = 'left'
        local.element.classList.remove('arabic')
        if (local['placeholder']) local.element.placeholder = local['placeholder']
    }
    return true
}

module.exports = {isArabic}
},{}],48:[function(require,module,exports){
const isEqual = function (value, other) {
    //if (value === undefined || other === undefined) return false

    // string || boolean || number
    if (typeof value !== 'object' && typeof other !== 'object') return value == other

    // html elements
    if (value && other)
        if (value.nodeType === Node.ELEMENT_NODE && other.nodeType === Node.ELEMENT_NODE) {
            return value.isSameNode(other) || value.contains(other) || other.contains(value)
        } else if ((value.nodeType !== Node.ELEMENT_NODE && other.nodeType === Node.ELEMENT_NODE)
            || (value.nodeType === Node.ELEMENT_NODE && other.nodeType !== Node.ELEMENT_NODE))
            return false

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

        // Get the object type
        var itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() != item2.toString()) return false;
            } else {
                if (item1 != item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};

module.exports = {isEqual}
},{}],49:[function(require,module,exports){
const log = ({params}) => {
    console.log(params.log);
}

module.exports = {log}
},{}],50:[function(require,module,exports){

const { toArray } = require("./toArray")
const { clone } = require("./clone")

const merge = (objects) => {

    objects = clone(objects)
    if (typeof objects !== 'object') return objects

    var merged = toArray(objects[0]).flat()

    objects.shift()

    objects.map(obj => {

        merged.push(...toArray(obj).flat())

        if (!Array.isArray(obj) && typeof obj === 'object')

            Object.entries(obj).map(([key, value]) => {
                if (merged[key]) {

                    if (typeof value === 'string' || typeof value === 'number') {

                        merged[key] = toArray(merged[key])
                        merged[key].push(value)

                    } else if (Array.isArray(value)) {
                        merged[key].push(...value)

                    } else if (typeof value === 'object')
                        merged[key] = merge([value, merged[key]])

                } else merged[key] = value
            })

    })

    return merged
}

const override = (obj1, obj2) => {
    obj1 = obj1 || {}

    Object.entries(obj2).map(([key, value]) => {
        if (obj1[key]) {

            if (!Array.isArray(value) && typeof value === 'object')
                obj1[key] = override(obj1[key], value)

            else obj1[key] = value

        } else obj1[key] = value
    })

    return obj1
}

module.exports = {merge, override}
},{"./clone":27,"./toArray":63}],51:[function(require,module,exports){
const overflow = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var width = local.element.clientWidth
    var height = local.element.clientHeight
    var text

    if (local.type === 'Input' || local.type === 'TextInput') text = local.element.value
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') text = local.element.innerHTML
    else if (local.type === 'UploadInput') text = local.element.value


    // create a test div
    var lDiv = document.createElement('div')

    document.body.appendChild(lDiv)

    var pStyle = local.element.style
    var pText = local.data || local.input.value || ''
    var pFontSize = pStyle.fontSize

    if (pStyle != null) {
        lDiv.style = pStyle;
    }

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;
    lDiv.style.padding = pStyle.padding;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    var overflowX, overflowY
    if (width < lResult.width) overflowX = true
    if (height < lResult.height) overflowY = true

    return [overflowX, overflowY]
}

module.exports = {overflow}
},{}],52:[function(require,module,exports){
const { removeIds } = require("./update")
const { clone } = require("./clone")

const remove = ({ STATE, VALUE, params, id }) => {

    var local = VALUE[id]
    if (!params) params = {}
    
    if (!STATE[local.Data]) return

    var keys = clone(local.derivations)
    var path = params.path ? params.path('.') : []
    
    // convert string numbers paths to num
    if (path.length > 0) 
    path = path.map(k => {
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    if (params.path) keys.push(...path)

    if (keys.length === 0) local.parent.children.splice([keys[keys.length - 1]], 1)
    else keys.reduce((o, k, i) => {

        if (i === keys.length - 1) {

            if (Array.isArray(o)) {
                o.splice(k, 1)
            } else return delete o[k]

        }
        return o[k]

    }, STATE[local.Data])

    removeIds({ VALUE, id })
    
    // reset length and derivations
    var nextSibling = false
    var children = [...VALUE[local.parent].element.children]
    var index = local.derivations.length - 1
    
    children.map(child => {

        var id = child.id
        VALUE[id].length -= 1
        
        // derivation in array of next siblings must decrease by 1
        if (nextSibling) resetDerivations({ VALUE, id, index })

        if (id === local.id) {
            
            nextSibling = true
            local.element.remove()
            delete VALUE[id]
        }
    })
}

const resetDerivations = ({ VALUE, id, index }) => {
    
    if (!VALUE[id]) return
    VALUE[id].derivations[index] -= 1
    
    var children = [...VALUE[id].element.children]
    children.map(child => {
        var id = child.id
        resetDerivations({ VALUE, id, index })
    })
}

module.exports = {remove}
},{"./clone":27,"./update":69}],53:[function(require,module,exports){
const removeDuplicates = (object) => {

    if (typeof object === 'string' || typeof object === 'number' || !object) return object

    if (Array.isArray(object)) return object = [removeDuplicates(object[0])]

    if (typeof object === 'object') {

        Object.entries(object).map(([key, value]) => {
            object[key] = removeDuplicates(value)
        })
        
        return object
    }
}

module.exports = {removeDuplicates}
},{}],54:[function(require,module,exports){
const resizeInput = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

    var width = local.style.width
    if (width === 'fit-content') {

        var results = dimensions({ VALUE, id })

        if (local.element) local.element.style.width = results.width + 'px'
        else return results.width + 'px'

    } else return local.style.width
}

const dimensions = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    var lDiv = document.createElement('div')
    document.body.appendChild(lDiv)

    var pStyle = local.style
    var pText = params.text || local.data || (local.input && local.input.value) || local.text || ''
    var pFontSize = pStyle.fontSize

    if (pStyle != null) lDiv.style = pStyle

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute"
    lDiv.style.left = -1000
    lDiv.style.top = -1000
    lDiv.style.padding = pStyle.padding
    lDiv.style.maxWidth = pStyle.maxWidth
    lDiv.style.transform = pStyle.transform

    lDiv.innerHTML = pText

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    }

    document.body.removeChild(lDiv)
    lDiv = null

    return lResult
}

module.exports = {resizeInput, dimensions}
},{}],55:[function(require,module,exports){

const { starter } = require('./starter')
//const { search } = require("./search")
//const { setState } = require("./state")

/*const toRoute = ({ VAR, STATE }) => {

    var pathname = window.location.pathname.split('/')
    pathname.slice(2)
    var queries = pathname.filter(path => path.includes('search?') ; path.includes('search?').split('search?')[1])
    pathname = pathname.filter(path => !path.includes('search?'))

    queries.map(query => {
        query = toObject({ VAR, STATE, string: query })
        search({ VAR, STATE, params: query })
    })

    var stateList = toObject({ VAR, STATE, string: pathname.join(';') || '' })
    setState({ VAR, STATE, params: stateList })

}*/

const route = async ({ VALUE, STATE, params, id }) => {

    var {data} = await axios.get(`/route${params.route}`)
    document.body.innerHTML = data

    starter()
        
    window.history.replaceState({}, '', params.route)
}



/*const replaceRoute = ({ params }) => {

    var route = '/' + window.location.pathname.split('/')[1]
    var pathname = `/search?state=${params.state};${params.query}`

    window.history.replaceState(null, "New Page Title", route + pathname)

}



export const pushRoute = ({ params }) => {

    var route = window.location.pathname.split('/')

    // page name
    var pathname = `/${route[1]}`
    route = route.slice(2)

    // search queries
    var queries = route.filter(route => route.includes('search?'))
    route = route.filter(route => !route.includes('search?'))
    queries.map(query => {
        pathname += `/${query}`
    })

    // states
    var states = toObject({ string: route.join(';') })
    states = states.state || {}
    states = { ...states, ...params.state }

    pathname += '/'

    states = Object.entries(states)
    states.map(([key, value], index) => {
        pathname += `state.${key}=${value}`
        if (index < states.length - 1) pathname += ';'
    })

    window.history.replaceState(null, "New Page Title", pathname)

}*/

module.exports = {route}
},{"./starter":60}],56:[function(require,module,exports){
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")

const setContent = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]

    var value = ''
    if (params) value = params.value || params.content || params.data || ''

    // for specific case: VAR.data was equal to [], then updated to ['value'] =>
    if (Array.isArray(value))
        if (value.length === 1 && isNaN(local.derivations.slice(-1)[0])) {
            value = value[0]
            local.derivations.push(0)
        }

    if (typeof value !== 'string' && typeof value !== 'number') return

    // not loaded yet
    if (!local.element) return

    if (local.type === 'Input' || local.type === 'TextInput') local.element.value = value || ''
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') local.element.innerHTML = value || ''
    else if (local.type === 'UploadInput') local.element.value = value || null

    // set parent data the same as child data
    if (isEqual(local.parent.derivations, local.derivations) && isEqual(local.data, local.parent.data)) {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value

        local.parent.data = local.data
        local.parent.Data = STATE[local.Data]
        local.parent.derivations = local.derivations

    } else {

        // set derivations
        if (Array.isArray(local.data))
            if (isNaN(local.derivations.slice(-1)[0]))
                local.derivations.push(0)

        // set data
        local.data = value
    }

    isArabic({ VALUE, params: { value }, id })
}

module.exports = {setContent}
},{"./isArabic":47,"./isEqual":48}],57:[function(require,module,exports){
const setPosition = ({ VALUE, params, id }) => {
    var element = VALUE[id].element
    var {position} = params
    
    if (!VALUE[position.id]) return
    var list = VALUE[position.id].element
    var fin = list.getElementsByClassName('list-fin')[0]

    var top, left, bottom, distance, placement
    var height = list.offsetHeight
    var width = list.offsetWidth

    placement = list.placement || position.placement || 'right'
    distance = parseFloat(list.distance || position.distance || 10)

    if (placement === 'right') {

        left = element.getBoundingClientRect().right + distance
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = '-0.5rem'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0 0 0.4rem'
        }

    }

    else if (placement === 'left') {

        left = element.getBoundingClientRect().left - distance - width
        top = element.getBoundingClientRect().top + element.clientHeight / 2 - height / 2

        if (fin) {
            fin.style.right = '-0.5rem'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    else if (placement === 'top') {

        top = element.getBoundingClientRect().top - height - distance
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = 'unset'
            fin.style.bottom = '-0.5rem'
            fin.style.borderRadius = '0 0 0.4rem 0'
        }
    }

    else if (placement === 'bottom') {

        top = element.getBoundingClientRect().top + element.clientHeight + 10
        left = element.getBoundingClientRect().left + (element.clientWidth / 2) - (width / 2)

        if (fin) {
            fin.style.right = 'unset'
            fin.style.left = 'unset'
            fin.style.top = '-0.5rem'
            fin.style.bottom = 'unset'
            fin.style.borderRadius = '0 0.4rem 0 0'
        }
    }

    bottom = top + height

    if (top - 10 < 0) {

        if (fin) fin.style.top = height / 2 - 5 - 10 + top + 'px'
        top = 10

    } else if (bottom + 10 > window.innerHeight) {

        if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + 'px'
        top = window.innerHeight - 10 - height

    } else {
        if (fin) fin.style.top = 'unset'
    }

    list.style.top = top + 'px'
    list.style.left = left + 'px'
}

module.exports = {setPosition}
},{}],58:[function(require,module,exports){
const { setData } = require("./data")
const { setStyle } = require("./style")
const { toString } = require("./toString")

const setValue = ({ VALUE, params, id }) => {
    
    if (!params.value) return
    var local = VALUE[id]

    Object.entries(params.value).map(([key, value]) => {
        /*if (key === 'data') setData({ VALUE, params: { value }, id })

        else if (key === 'Data') {
            local[key] = value
            local.data = value
        }

        else if (key === 'element') {

            value = toString(value)
            var keys = value.split('=')[0].split('.')
            value = value.split('=')[1]

            keys.reduce((o, k, i) => {
                if (i === keys.length - 1) return o[k] = value
                return o[k]
            }, local.element)

        }

        else if (key === 'style') {
            setStyle({ VALUE, params: { style: value }, id })
        }

        else local[key] = value */
    })
}

module.exports = {setValue}
},{"./data":35,"./style":62,"./toString":68}],59:[function(require,module,exports){
const { update } = require("./update")

const sort = ({ VALUE, STATE, params, id }) => {
    var local = VALUE[id]
    if (!local) return

    local.sort = local.sort === 'ascending' ? 'descending' : 'ascending'
    var path = params.path.split('.')
    var data = params.data || local.data || []

    data.sort((a, b) => {

        a = path.reduce((o, k) => o[k], a)
        if (a !== undefined) a = a.toString()

        b = path.reduce((o, k) => o[k], b)
        if (b !== undefined) b = b.toString()

        if (local.sort === 'ascending') {

            if (!isNaN(a)) return b - a

            if (a < b) return -1
            return a > b ? 1 : 0

        } else {

            if (!isNaN(a)) return a - b

            if (b < a) return -1
            return b > a ? 1 : 0
        }
    })

    if (params.id) {
        var id = params.id
        VALUE[id].Data = data
        update({ VALUE, STATE, id })
    }

}

module.exports = {sort}
},{"./update":69}],60:[function(require,module,exports){
const autoControls = ['auto-style', 'toggle-style', 'droplist', 'actionlist']

const starter = ({ STATE, VALUE, id }) => {
    
    const { defaultEventHandler } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { createControls } = require("./createControls")
    const { defaultInputHandler } = require("./defaultInputHandler")
    const { isArabic } = require("./isArabic")

    var local = VALUE[id]
    if (!local) return
    
    local.element = document.getElementById(id)
    if (!local.element) return delete VALUE[id]
    
    /* Defaults must start before controls */

    // arabic text
    isArabic({ VALUE, id })

    // input handlers
    defaultInputHandler({ VALUE, STATE, id })

    // mouseenter, click, mouseover...
    defaultEventHandler({ VALUE, id })

    // prevent a tag from refreshing browser
    if (local.link) local.element.addEventListener('click', (e) => e.preventDefault())

    /* End of default handlers */

    // setStyles
    if (local.style) setStyle({ VALUE, STATE, id, params: {style: local.style} })

    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })

    // lunch auto controls
    autoControls.map(type => {
        if (!local[type]) return
        var params = { controls: { type, ...local[type] } }
        createControls({ VALUE, STATE, id, params }) 
    })
    
    // run starter for children
    var children = [...local.element.children]
    
    children.map(child => {
        var id = child.id
        if (!id) return
        starter({ STATE, VALUE, id })
        
    })
}

module.exports = {starter}
},{"./controls":28,"./createControls":30,"./defaultInputHandler":37,"./event":41,"./isArabic":47,"./style":62}],61:[function(require,module,exports){
const setState = ({ STATE, params,  }) => {

    // push states to route
    /*if (params.route) pushRoute({ params })

    console.log(STATE.asset, params);
    params.state &&
        Object.entries(params.state).map(([key, value]) => {
            STATE[key] = value
        })*/


}

module.exports = {setState}
},{}],62:[function(require,module,exports){
const {resizeInput} = require('./resize')

const setStyle = ({ VALUE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    if (!local.style) local.style = {}

    Object.entries(params.style).map(([key, value]) => {

        var timer = 0

        if ((value + '').includes('>>')) {
            value = value + ''
            timer = value.split('>>')[1]
            value = value.split('>>')[0]
        }

        local[key + '-timer'] = setTimeout(() => {

            //VAR.style[key] = value
            if (local.element) local.element.style[key] = value
            else local.style[key] = value

        }, timer)
        if (key === 'width') resizeInput({ VALUE, id })
    })
}

const resetStyles = ({ VALUE, params, id }) => {
    
    var local = VALUE[id]
    if (!local.style || !local.style.after) return

    local.afterStylesMounted = false

    params = { style: {} }

    Object.entries(local.style.after).map(([key]) => {

        if (local.style[key]) params.style[key] = local.style[key]
        else params.style[key] = null
    })

    setStyle({ VALUE, params, id })
    
}

const toggleStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    if (local.afterStylesMounted) resetStyles({ VALUE, params, id })
    else mountAfterStyles({ VALUE, params, id })
};

const mountAfterStyles = ({ VALUE, params, id }) => {
    var local = VALUE[id]
    if (!local.style || !local.style.after) return

    local.afterStylesMounted = true
    
    Object.entries(local.style.after).map(([key, value]) => {
        var timer = 0
        value = value + ''
        if (value.includes('>>')) {
            timer = value.split('>>')[1]
            value = value.split('>>')[0]
        }
        local[key + '-timer'] = setTimeout(
            () => local.element.style[key] = value, timer
        )
    })
}

module.exports = {setStyle, resetStyles, toggleStyles, mountAfterStyles}
},{"./resize":54}],63:[function(require,module,exports){
const toArray = (data) => {
    return data !== undefined ? (Array.isArray(data) ? data : [data]) : []
}

module.exports = {toArray}
},{}],64:[function(require,module,exports){
const { derive } = require("./derive")
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")
const { generate } = require("./generate")
const { duplicates } = require("./duplicate")
const { clone } = require("./clone")
const { overflow } = require("./overflow")
const { getParam } = require("./getParam")
const { toId } = require("./toId")

const toBoolean = ({ STATE, VALUE, e, string, params, id }) => {
    var mainId = id

    if (!string || typeof string !== 'string') return true
    var approval = true

    string.split(';').map(condition => {
        if (approval) {

            var local = VALUE[mainId]
            id = mainId

            // no condition
            if (condition === '') return

            var eq = condition.includes('=')
            var gt = condition.includes('>')
            if (gt) {
                var test = condition.split('::')
                gt = test.find(exp => exp.includes('>'))
            }
            var gte = condition.includes('>=')
            var lt = condition.includes('<')
            var lte = condition.includes('<=')
            var noOperator = false

            if (!eq && !gt && !gte && !lt && !lte) noOperator = true

            if ((eq && !gte && !lte) || (!eq && !gt && !gte && !lt && !lte) || noOperator) {

                var minus, plus, times, division, notEqual

                condition = condition.split('=')
                var key = condition[0]
                var value = condition[1]

                // ex: key1=string1=string2=string3
                if (condition[2]) {
                    condition[1] = condition[1].split('||')

                    // ex: key1=value1||key2=value2||key3=value3
                    if (condition[1].length > 1) {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        approval = toBoolean({ VALUE, STATE, e, string: `${condition[0]}=${condition[1][0]}`, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = condition[1][1]
                        value = condition.slice(2).join('=')
                        string = `${key}=${value}`
                        return approval = toBoolean({ VALUE, STATE, e, string, id})
                    }

                    // ex: key=value1=value2=value3
                    else {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        approval = toBoolean({ VALUE, STATE, e, string: `${key}=${condition[2]}`, id })
                        if (!approval) return

                        // approval is true till now => keep going
                        value = condition[1]
                    }
                }


                else if (value) {
                    value = value.split('||')

                    if (value.length === 1) value = value[0]

                    else if (value[1]) {

                        // ex: key1=value1||key2=value2...
                        if (value[1].includes('=')) {
                            
                            var string = `${key}=${value[0]}`
                            approval = toBoolean({ VALUE, STATE, e, string, id })
                            if (approval) return

                            string = value.slice(1).join('||')
                            return approval = toBoolean({ VALUE, STATE, e, string, id })
                        }

                        // ex: key=value1||value2||value3
                        value[1] = value.slice(1, value.length).join('||')
                        var string = `${key}=${value[1]}`
                        approval = toBoolean({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        value = value[0]
                    }
                }


                if (key) {
                    key = key.split('||')

                    if (key.length === 1) key = key[0]

                    // ex. key1||key2||key3=value
                    else if (key[1]) {

                        key[1] = key.slice(1, key.length).join('||')
                        var string = `${key[1]}${value ? `=${value}` : ''}`
                        approval = toBoolean({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = key[0]
                    }
                }

                // operator has !
                if (key.includes('!')) {

                    if (key.split('!')[0]) key = key.split('!')[0]
                    else {
                        // !key => study key without value
                        value = undefined
                        key = key.split('!')[1]
                    }
                    notEqual = true
                }

                // id
                if (value && value.includes('::')) {

                    id = value.split('::')[1]
                    value = value.split('::')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]

                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (value) {
                    minus = value.split('--')[1]
                    plus = value.split('++')[1]
                    times = value.split('**')[1]
                    division = value.split('÷÷')[1] // hold Alt + 0247
                }

                if (plus) value = value.split('++')[0]
                if (minus) value = value.split('--')[0]
                if (times) value = value.split('**')[0]
                if (division) value = value.split('÷÷')[0]

                if (value && value.includes('.')) {

                    var value0 = value.split('.')[0]
                    var value1 = value.split(`${value0}.`)[1]

                    if (value0 === 'state') value = STATE[value1]
                    else if (value0 === 'value') value = value1.split('.').reduce((o, k) => o[k], local)
                    else if (value0 === 'className') value = document.getElementsByClassName(value1)[0]
                    else if (value0 === 'parent') value = local.parent[value1]
                    else if (value0 === 'window') {
                        if (value1 === 'element') value = STATE.window
                        else value = STATE.window[value1]
                    }

                }

                if (value === 'false') value = false
                else if (value === 'true') value = true
                else if (value === 'element') value = local.element
                else if (value === 'nextSibling') value = local.element.nextSibling
                else if (value === '[]') value = []
                else if (value === '[{}]') value = [{}]
                else if (value === 'string') value = ''
                else if (value === '{}') value = {}

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    id = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'false' || key === 'undefined') {

                    key = generate()
                    local[key] = false

                } else if (key === 'true') {

                    key = generate()
                    local[key] = true
                }

                else if (key.includes('.')) {

                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1 !== undefined) key1 = key1.split('.')

                    if (key0 === 'global') {
                        key0 = 'value'
                        local = VALUE[key1[0]]
                        key1 = key1.slice(1)
                    }

                    key = generate()

                    if (key0 === 'state') {
                        
                        var val = STATE[key1[0]]
                        key1 = key1.slice(1)
                        key1 = key1.map(k => { 
                            if (!isNaN(k)) k = parseFloat(k)
                            return k
                        })
                        if (key1.length > 0) key1.reduce((o, k, i) => {
                            
                            if (i === key1.length - 1) return local[key] = o[k]
                            return o[k]

                        }, clone(val))

                        else local[key] = val
                    }

                    else if (key0 === 'value') {
                        
                        if (key1[0] === 'data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(STATE[local.Data], [...local.derivations, ...key1])[0]
                            local[key] = data

                            if (length) {
                                if (data) local[key] = data.length
                                else local[key] = false
                            }

                        }
                        else if (key1[0] === 'Data') {

                            key1 = key1.slice(1)
                            var data = derive(STATE[local.Data], key1)[0]
                            local[key] = data

                        }
                        else {
                            
                            local[key] = key1.reduce((o, k, i) => {

                                if (k === 'parent') {
                                    
                                    var parent = o.parent
                                    if (o.type === 'Input') parent = VALUE[parent].parent
                                    return VALUE[parent]

                                } else if (k === 'next' || k === 'nextSibling') {

                                    var nextSibling = o.element.nextSibling
                                    var id = nextSibling.id

                                    return VALUE[id]

                                } else if (k === 'prev' || k === 'prevSibling') {

                                    var previousSibling = o.element.previousSibling
                                    var id = previousSibling.id

                                    return VALUE[id]

                                } else if (k === 'firstChild') {

                                    var firstChild = o.element.children[0]
                                    return VALUE[firstChild.id]
                                    
                                } else if (k === 'secondChild') {

                                    var secondChild = o.element.children[1] ? o.element.children[1] : o.element.children[0]
                                    return VALUE[secondChild.id]

                                } else if (k === 'lastChild') {

                                    var lastChild = o.element.children[o.element.children.length - 1]
                                    return VALUE[lastChild.id]

                                } else if (k === 'INPUT') {

                                    var inputComps = [...o.element.getElementsByTagName(k)]
                                    inputComps = inputComps.map(comp => VALUE[comp.id])
                                    if (inputComps.length === 0) return inputComps[0]
                                    else return inputComps

                                } else if (k === 'findIdByData') {

                                    var id = o.find(id => local.data === VALUE[id].text)
                                    if (id) return id
                                    else return id
                                }

                                return o[k]

                            }, clone(local))
                        }
                    }

                    else if (key0 === 'e') local[key] = e[key1]
                    else if (key0 === 'input') {

                        if (key1[0] === 'length') {

                            var length = 0
                            if (local.input.value) length = local.input.value.length
                            local[key] = length

                        }
                    }
                    else if (key0 === 'data') {

                        var data = derive(STATE[local.Data], [...local.derivations, ...key1])[0]
                        local[key] = data
                    }
                    else if (key0 === 'Data') {
                        var data = derive(STATE[local.Data], key1)[0]
                        local[key] = data
                    }
                    else if (key0 === 'style') {
                        var style = local.style[key1]
                        local[key] = style
                    }
                    else if (key0 === 'const') {
                        
                        if (key1[0] === 'false' || key1[0] === 'undefined' || key1[0] === '') local[key] = false
                        else local[key] = key1.join('')
                        
                    }
                    else if (key0 === 'parent') {

                        if (key1[0] === 'length') {
                            local[key] = local.parent.element.children.length
                        } else local[key] = local.parent[key]
                    }
                    else if (key0 === 'className') {
                        local[key] = document.getElementsByClassName(key1)[0]
                    }

                } else if (key === 'nextSibling') {
                    local[key] = local.element.nextSibling

                } else if (key === 'isArabic') {

                    key = generate()
                    var result = isArabic(local.type === 'Input' ? local.value : (local.type === 'Text' && local.text))
                    local[key] = result

                } else if (key === 'data') {

                    key = generate()
                    local[key] = derive(STATE[local.Data], local.derivations)[0]

                } else if (key === 'duplicates') {

                    var data = getParam(`?${params}`, 'data=', false)
                    local[key] = duplicates({ STATE, VALUE, params: { data }, id })

                } else if (key === 'overflow') {

                    local[key] = overflow({ VALUE, id })[0]
                }

                if (plus) value = value + plus
                if (minus) value = value - minus
                if (times) value = value * times
                if (division) value = value / division
                
                if (!local) return approval = false
                if (value === undefined) approval = notEqual ? !local[key] : local[key]
                else {
                    if (value === 'undefined') value = undefined
                    if (value === 'false') value = false
                    if (value === 'true') value = true
                    approval = notEqual ? !isEqual(local[key], value) : isEqual(local[key], value)
                }

            } else if (gt && !gte) {

                var local = VALUE[id]
                var key = '', value = '', test = condition.split('::')

                if (test[1]) {

                    test.map(exp => {
                        if (exp.includes('>')) {

                            exp = exp.split('>')
                            key += exp[0]
                            value += exp[1]

                        }
                        else if (!value) key += exp + '::'
                        else value += '::' + exp
                    })

                } else {
                    key = condition.split('>')[0]
                    value = condition.split('>')[1]
                }

                // id
                if (key.includes('::')) {

                    id = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toId({ VALUE, STATE, string: id, id: local.id })[0]
                }

                var local = VALUE[id]
                if (!local) return approval = false

                if (key === 'length') {

                    if (!local.element.parentElement) return approval = false
                    return approval = local.element.parentElement.children.length > value

                } else if (key.includes('.')) {

                    var key0 = key.split('.')[0]
                    var key1 = key.split(`${key0}.`)[1]
                    if (key1) key1 = key1.split('.')
                    key = generate()

                    if (key0 === 'state') {
                        local[key] = STATE[key1]
                    }

                    else if (key0 === 'value') {

                        if (key1[0] === 'data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(STATE[local.Data], [...local.derivations, ...key1])[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'Data') {

                            key1 = key1.slice(1)
                            var length
                            if (key1.slice(-1)[0] === 'length') {
                                key1 = key1.slice(0, -1)
                                length = true
                            }
                            var data = derive(STATE[local.Data], key1)[0]
                            local[key] = data
                            if (length) local[key] = data.length

                        }
                        else if (key1[0] === 'length') {
                            local[key] = local.length
                        }
                        else {

                            local[key] = key1.reduce((o, k, i) => {

                                if (k === 'parent') {
                                    
                                    var parent = o.parent
                                    if (o.type === 'Input') parent = VALUE[parent].parent
                                    return VALUE[parent]

                                } else if (k === 'next' || k === 'nextSibling') {

                                    var nextSibling = o.element.nextSibling
                                    var id = nextSibling.id

                                    return VALUE[id]

                                } else if (k === 'prev' || k === 'prevSibling') {

                                    var previousSibling = o.element.previousSibling
                                    var id = previousSibling.id

                                    return VALUE[id]

                                } else if (k === 'firstChild') {

                                    var firstChild = o.element.children[0]
                                    return VALUE[firstChild.id]
                                    
                                } else if (k === 'secondChild') {

                                    var secondChild = o.element.children[1] ? o.element.children[1] : o.element.children[0]
                                    return VALUE[secondChild.id]

                                } else if (k === 'lastChild') {

                                    var lastChild = o.element.children[o.element.children.length - 1]
                                    return VALUE[lastChild.id]

                                } else if (k === 'INPUT') {

                                    var inputComps = [...o.element.getElementsByTagName(k)]
                                    inputComps = inputComps.map(comp => VALUE[comp.id])
                                    if (inputComps.length === 0) return inputComps[0]
                                    else return inputComps

                                } else if (k === 'findIdByData') {

                                    var id = o.find(id => local.data === VALUE[id].text)
                                    if (id) return id
                                    else return id
                                }

                                return o[k]

                            }, clone(local))

                        }
                    }
                }

                approval = local[key] > value
            }
        } else return approval
    })

    return approval
}

module.exports = {toBoolean}
},{"./clone":27,"./derive":38,"./duplicate":40,"./generate":45,"./getParam":46,"./isArabic":47,"./isEqual":48,"./overflow":51,"./toId":66}],65:[function(require,module,exports){
const { generate } = require('./generate')
const { toArray } = require('./toArray')

const toComponent = (obj) => {

    // class
    obj.class = obj.class || ''

    // id
    obj.id = obj.id || generate()

    // style
    obj.style = obj.style || {}
    obj.style.after = obj.style.after || {}

    // text
    obj.text = obj.text || ''

    // controls
    obj.controls = toArray(obj.controls)

    // children
    obj.children = obj.children || []

    // model
    obj.featured = obj.featured && 'featured'
    obj.model = obj.model || obj.featured || 'classic'

    // search
    obj.search = obj.search || {}

    // sort
    obj.sort = obj.sort || {}

    return obj
}

module.exports = {toComponent}
},{"./generate":45,"./toArray":63}],66:[function(require,module,exports){
const { generate } = require("./generate");
const { toArray } = require("./toArray")
const { toObject } = require("./toObject");

const toId = ({ VALUE, STATE, id, string }) => {
    var idList = [], local = VALUE[id]

    if (typeof string === 'object') return string;
    
    (string || id).split(';').map(id => {

        // id=id:index
        if (id.includes(':index')) {

            var index = local.index
            var parent = local.parent

            // search parent for index
            while (index === undefined) {
                index = VALUE[parent].index
                parent = VALUE[parent].parent
            }

            id = id.split(':index')[0] + ':' + index
        }

        // id=this
        if (id === 'this') idList.push(local.id)

        // id=siblings
        else if (id === 'siblings') {
            
            var children = [...local.element.children]
            var siblings = []
    
            children.map(child => siblings.push(child.id))

            // remove current id from siblings
            siblings = siblings.filter(id => id !== id)

            // insert siblings
            idList.push(...siblings)
        }

        // id=value.path
        else if (id.includes('.')) {

            var k = generate()
            id = toObject({ VALUE, STATE, string: `${k}=${id}`, id: local.id })[k]
            idList.push(...toArray(id))
        }

        else idList.push(id)
    })

    return idList
}

module.exports = {toId}
},{"./generate":45,"./toArray":63,"./toObject":67}],67:[function(require,module,exports){
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { merge } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")

const toObject = ({ VALUE, STATE, string, e, id }) => {

    const { toBoolean } = require("./toBoolean")
    const { toId } = require("./toId")

    var localId = id

    if (typeof string !== 'string' || !string) return string || {}
    var params = {}

    string.split(';').map(param => {

        var key, value, minus, plus, times, division

        if (param.includes('=')) {

            key = param.split('=')[0]
            value = param.split(`${key}=`)[1]

        } else key = param

        // operator has !
        if (key.includes('!')) {

            if (key.split('!')[0]) key = key.split('!')[0]
            else key = key.split('!')[1]
            if (!value) value = false
        }

        // id
        if (value && value.includes('::')) {

            var newId = value.split('::')[1]
            id = toId({ VALUE, STATE, id, string: newId, e })[0]
            value = value.split('::')[0]

        }
        
        // condition
        if (value && value.includes('<<')) {

            var condition = value.split('<<')[1]
            var approved = toBoolean({ STATE, VALUE, id, e, string: condition })
            if (!approved) return
            value = value.split('<<')[0]
        }

        var local = VALUE[id]
        if (!local) return
        
        if (value) value = bracketsToDots({ VALUE, STATE, string: value, e, id })

        var path = typeof value === 'string' ? value.split('.') : []
        var keys = typeof key === 'string' ? key.split('.') : []

        if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

            var k = generate()
            value = value.slice(1, value.length - 1).split(',')

            value = merge(
                value.map(
                    val => toObject({ VALUE, STATE, string: `${k}=${val}`, id })[k]
                )
            )

            value = value.filter(value => value)

        } else {

            if (value) {
                minus = value.split('--')[1]
                plus = value.split('++')[1]
                times = value.split('**')[1]
                division = value.split('÷÷')[1] // hold Alt + 0247
            }

            if (plus) {
                value = value.split('++')[0]
                if (!isNaN(plus)) plus = parseFloat(plus)
            } else if (minus) {
                value = value.split('--')[0]
                if (!isNaN(minus)) minus = parseFloat(minus)
            } else if (times) {
                value = value.split('**')[0]
                if (!isNaN(times)) times = parseFloat(times)
            } else if (division) {
                value = value.split('÷÷')[0]
                if (!isNaN(division)) division = parseFloat(division)
            }

            /* value */
            if (typeof value === 'boolean') { }
            else if (!isNaN(value)) value = parseFloat(value)
            else if (value === undefined || value === 'generate') value = generate()
            else if (value === 'undefined') value = false
            else if (value === 'input') value = local && local.element.value
            else if (value === 'false') value = false
            else if (value === 'true') value = true
            else if (value === 'string' || value === `''`) value = ''
            else if (value === 'object' || value === '{}') value = {}
            else if (value === 'array' || value === '[]') value = []
            else if (value === '[string]') value = ['']
            else if (value.includes('%20')) value = value.split('%20').join(' ')
            else if (path.length > 1) {

                if (path[0] === 'global') {
                    
                    local = VALUE[path[1]]
                    path = path.slice(2)
                    path.unshift('value')
                }

                if (path[0] === 'e') {

                    path = path.slice(1)
                    value = path.reduce((o, k) => o[k], e)

                } else if (path[0] === 'state') {

                    value = STATE[path[1]]

                    path = path.slice(2)
                    if (path.length > 0) {
                        if (value) value = merge(
                            value.map(
                                val => derive(val, path)[0] || (local.droplist ? `${derive(val, 'title')[0]}:readonly` : '')
                            )
                        )
                    }

                } else if (path[0] === 'value') {

                    if (path[1] === 'data') {
                        
                        var path = path.slice(2)
                        value = derive(STATE[local.Data], [...local.derivations, ...path])[0]

                    } else {

                        path = path.slice(1)
                        value = path.reduce((o, k, i) => {

                            if (k === 'parent') {

                                var parent = o.parent
                                if (o.templated) parent = VALUE[parent].parent
                                return VALUE[parent]

                            } else if (k === 'next' || k === 'nextSibling') {

                                var element = o.templated ? VALUE[o.parent].element : o.element
                                var nextSibling = element.nextSibling
                                var id = nextSibling.id
                                return VALUE[id]

                            } else if (k === 'prev' || k === 'prevSibling') {

                                var element = o.templated ? VALUE[o.parent].element : o.element
                                var previousSibling = element.previousSibling
                                var id = previousSibling.id
                                return VALUE[id]

                            } else if (k === '1stChild') {

                                var id = o.element.children[0].id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]
                                
                            } else if (k === '2ndChild') {
                                
                                var id = (o.element.children[1] || o.element.children[0]).id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === '3rdChild') {

                                var id = (o.element.children[2] || o.element.children[1] || o.element.children[0]).id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === 'lastChild') {

                                var id = o.element.children[o.element.children.length - 1].id
                                if (VALUE[id].component === 'Input') {
                                    id = VALUE[id].element.getElementsByTagName('INPUT')[0].id
                                }
                                
                                return VALUE[id]

                            } else if (k === 'INPUT') {

                                var inputComps = [...o.element.getElementsByTagName(k)]
                                inputComps = inputComps.map(comp => VALUE[comp.id])
                                if (inputComps.length === 0) return inputComps[0]
                                else return inputComps

                            } else if (k === 'findIdByData') {

                                var id = o.find(id => local.data === VALUE[id].text)
                                if (id) return id
                                else return id
                            }

                            return o[k]

                        }, clone(local))
                        
                    }

                } else if (path[0] === 'Data') {

                    value = value.split('.')
                    value.shift()
                    value = merge(toArray(derive(STATE[local.Data], value, true)[0]))

                } else if (path[0] === 'const') {
                    value = value.split('const.')[1]

                } else if (path[0] === 'asset') {
                    var asset = STATE.asset

                    if (path[1] === 'entries') {
 
                        value = Object.entries(asset).map(([key, value]) => {
                            if (path[2] === 'key') return key
                            if (path[2] === 'value') return value
                        })

                    } else {
                        
                        path = path.slice(1)
                        var isArray
                        value = path.reduce((o, k, i) => {
                            if (isArray) return o
    
                            if (Array.isArray(o)) {
                                path = path.slice(i)
                                value = o.map(o => path.reduce((o, k) => o[k], o))
                                isArray = true
                                return value
                            }

                            return o[k]
                        }, asset)
                    }

                } else if (path[0] === 'encoded') {
                    value = STATE.encoded[path[1]]

                } else if (path[0] === 'date') {
                    if (path[1] === 'today') {
                        value = new Date()
                        if (path[2]) {
                            value = addDays(new Date(), parseInt(path[2]))
                        }
                        value = value.toJSON().slice(0, -8)
                    }

                } else if (path[0] === 'generate') {
                    if (path[1] === 'capitalize') value = generate().toUpperCase()
                    else value = generate()
                }

                else if (path[0] === 'element') {
                    if (path[1] === 'className') {

                        value = document.getElementsByClassName(path[1])[0]
                        path = path.slice(2)
                        value = path.reduce((o, k) => o[k], value)

                    } else value = path.reduce((o, k) => o[k], local)

                }

                else if (path[path.length - 1] === 'parent') {
                    var element = VALUE[path[0]]
                    if (!element) value = path[0]
                    else value = element.parent
                }

            }


            if (plus) value = value + plus
            else if (minus) value = value - minus
            else if (times) value = value * times
            else if (division) value = value / division

        }

        id = localId

        // id
        if (key && key.includes('::')) {

            var newId = key.split('::')[1]
            id = toId({ VALUE, STATE, id, string: newId, e })[0]
            key = key.split('::')[0]
        }

        var local = VALUE[id]
        if (!local) return

        // keys from brackets to dots
        key = bracketsToDots({ VALUE, STATE, string: key, e, id })
        keys = key.split('.')

        // object structure
        if (keys && keys.length > 1) {
            
            // mount state & value without using setState & setValue
            if (keys[0] === 'state' || keys[0] === 'value') {
                
                var object = keys[0] === 'state' ? STATE : (keys[0] === 'value' && local)
                var keys = keys.slice(1)
                var deleteRequest
                var length = keys.length - 1
                
                keys.reduce((o, k, i) => {
                    
                    if (deleteRequest) return
                    if (i === keys.length - 1) {

                        return o[k] = value

                    } if ( i === length - 1 && keys[length] === 'delete') { // last key = delete

                        deleteRequest = true
                        return delete o[k]
                    }
                    return o[k]
                    
                }, object)
                
                if (deleteRequest) return
            }

            else keys.reduce((obj, key, index) => {

                if (obj[key] !== undefined) {

                    if (index === keys.length - 1) {

                        obj[key] = toArray(obj[key])
                        return obj[key].push(value)

                    }

                } else {

                    if (index === keys.length - 1) return obj[key] = value
                    else obj[key] = {}

                }

                return obj[key]
            }, params)

        } else {

            if (params[key]) {

                params[key] = toArray(params[key])
                params[key].push(value)

            } else params[key] = value
        }
    })
    
    return params
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

function bracketsToDots({ VALUE, STATE, string, e, id }) {

    var keys = []
    keys = string.split('[')
    if (!keys[0]) return string

    if (keys[1]) {

        var bracketKey = keys[1].split(']')
        var k = generate()
        var value = toObject({ VALUE, STATE, string: `${k}=${bracketKey[0]}`, e, id })[k]
        var before = keys[0]
        keys = keys.slice(2)
        string = `${before}.${value}${bracketKey[1]}${keys.join('[') ? `[${keys.join('[')}` : ''}`
        
    }

    if (keys[2]) string = bracketsToDots({ VALUE, STATE, string, e, id })

    return string
}

module.exports = {toObject}
},{"./clone":27,"./derive":38,"./generate":45,"./merge":50,"./toArray":63,"./toBoolean":64,"./toId":66}],68:[function(require,module,exports){
const toString = (object) => {
    if (!object) return ''

    var string = ''
    var length = Object.entries(object).length

    Object.entries(object).map(([key, value], index) => {

        if (Array.isArray(value)) {
            string += `${key}=[${value.join(',')}]`
        }

        else if (typeof value === 'object') {
            var path = toString(value).split(';')
            string = path.map(path => path = `${key}.${path}`).join(';')
        }

        else string += `${key}=${value}`

        if (index < length - 1) string += ';'
    })

    return string || ''
}

module.exports = {toString}
},{}],69:[function(require,module,exports){
const { generate } = require("./generate")
const { starter } = require("./starter")
const { toArray } = require("./toArray")
const { createElement } = require("./createElement")
const { clone } = require("./clone")

const update = ({ STATE, VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return

    // remove id from VALUE
    removeIds({ VALUE, id })
    
    local.element.style.opacity = '0'

    local.element.innerHTML = toArray(local.children).map((child, index) => {
        
        var id = child.id || generate()
        VALUE[id] = clone(child)
        VALUE[id].id = id
        VALUE[id].index = index
        VALUE[id].parent = local.id
        
        return createElement({ STATE, VALUE, id })

    }).join('')

    setTimeout(() => {

        local.element.style.opacity = '1'

        var children = [...local.element.children]
        children.map(child => {
            var id = child.id
            starter({ STATE, VALUE, id })
        })
        
    }, 25)
}

const removeIds = ({ VALUE, id }) => {

    var local = VALUE[id]
    var children = [...local.element.children]
    
    children.map(child => {

        var id = child.id
        if (!VALUE[id]) return

        // clear time out
        Object.entries(VALUE[id]).map(([key, value]) => {
            if (key.includes('-timer')) setTimeout(() => clearTimeout(value), 1000)
        })

        removeIds({ VALUE, id })
        delete VALUE[id]
    })
}

module.exports = {update, removeIds}
},{"./clone":27,"./createElement":32,"./generate":45,"./starter":60,"./toArray":63}],70:[function(require,module,exports){
const { generate } = require("./generate")
const { toBoolean } = require("./toBoolean")
const { isEqual } = require("./isEqual")
const { clone } = require("./clone")
const { toObject } = require("./toObject")
const { setData } = require("./data")

const watch = ({ VALUE, STATE, controls, id }) => {

    const { execute } = require("./execute")

    var local = VALUE[id]
    if (!local) return

    var key = generate()
    var watch = controls.watch.toString()
    var names = watch.split('?')[0].split(';')

    // approval
    var conditions = watch.split('?')[2] || true
    var approved = toBoolean({ VALUE, STATE, string: conditions, id })
    if (!approved) return

    names.map(name => {

        // params
        var params = watch.split('?')[1]
        if (params) params = toObject({ VALUE, STATE, string: params, id })
        else params = {}

        var timer = 50
        if (name.includes('>>')) {
            timer = name.split('>>')[1]
            name = name.split('>>')[0]
        }

        // value
        var value = name.split('.')[0] === 'value'

        // state
        var state = name.split('.')[0] === 'state'
        if (state) state = name.split('.')[1]
        else state = name
        if (state === 'true') state = false

        const myFn = () => {

            if (value) {

                value = toObject({ VALUE, STATE, string: `${key}=${name}`, id })[key]

                if (value !== undefined && !isEqual(value, local[`${name}-watch`])) {

                    if (value.nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = value
                    else local[`${name}-watch`] = clone(value)

                    if (name.split('.')[1] === 'data') setData({ VALUE, STATE, params: { value }, id })
                    if (params.once) clearInterval(local[`${watch}-timer`])

                    execute({ VALUE, STATE, controls, id })
                }

                // rewatch
                value = true

            } else if (state) {

                if (STATE[state] !== undefined && !isEqual(STATE[state], local[`${name}-watch`])) {

                    if (STATE[state].nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = STATE[state]
                    else local[`${name}-watch`] = clone(STATE[state])

                    if (params.once) STATE[state] = undefined
                    execute({ VALUE, STATE, controls, id })
                }

            } else execute({ VALUE, STATE, controls, id })

        }

        if (local[`${watch}-timer`]) clearInterval(local[`${watch}-timer`])
        local[`${watch}-timer`] = setInterval(myFn, timer)

    })
}

module.exports = {watch}
},{"./clone":27,"./data":35,"./execute":42,"./generate":45,"./isEqual":48,"./toBoolean":64,"./toObject":67}],71:[function(require,module,exports){
const {admin} = require('./admin')
const {home} = require('./home')
const {public} = require('./public')

module.exports = {
    admin, home, public
}
},{"./admin":72,"./home":73,"./public":74}],72:[function(require,module,exports){
const admin = {
    views: ['admin-navbar', 'admin']
}

module.exports = {admin}
},{}],73:[function(require,module,exports){
const home = {
    views: ['navbar']
}

module.exports = {home}
},{}],74:[function(require,module,exports){
const public = {
    views: ['droplist', 'mini-window', 'actionlist']
}

module.exports = {public}
},{}]},{},[4]);
