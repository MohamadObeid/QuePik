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
// browserify browser.js > index.js
const { starter } = require("../method/starter")

var VALUE = JSON.parse(document.getElementById('VALUE').textContent)
var STATE = JSON.parse(document.getElementById('STATE').textContent)

VALUE.body.element = document.body
VALUE.window = { element: window }
VALUE.root.element = root

starter({ VALUE, STATE, id: 'root' })

},{"../method/starter":75}],5:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')

const Button = (component) => {
    
    component.icon = component.icon || {}
    component = toComponent(component)
    var { style, icon, controls, text, id } = component
    
    return {
        ...component,
        type: 'View?class=flex-box;touchableOpacity',
        id,
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
            type: `Icon?id=${id}-icon`,
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
            type: `Text?id=${id}-text`,
            text,
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
            event: 'mouseenter',
            actions: `mountAfterStyles???${id};${id}-text;${id}-icon`
        }, {
            event: 'mouseleave',
            actions: `resetStyles???${id};${id}-text;${id}-icon`
        }]
    }
}

module.exports = {Button}
},{"../method/toComponent":83}],6:[function(require,module,exports){
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
},{"../method/generate":51,"../method/toComponent":83}],7:[function(require,module,exports){
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
},{"../method/generate":51,"../method/toComponent":83}],8:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')

const Input = (component) => {

    if (component.templated) return component

    // icon
    component.icon = component.icon || {}

    // input
    component.input = component.input || { type: 'text'}
    component.input.type = component.input.type || 'text'
    component.input.value = component.input.value || ''
    component.input.style = component.input.style || {}

    component = toComponent(component)
    var { id, input, model, droplist, readonly, style, controls, icon, duplicated,
        placeholder, textarea, filterable, clearable, removable, msg,
        duplicatable, lang, unit, currency, google, key, note, edit } = component

    duplicatable = duplicatable !== undefined ? (duplicatable === false ? false : true) : false
    clearable = clearable !== undefined ? (clearable === false ? false : true) : false
    removable = removable !== undefined ? (removable === false ? false : true) : false
    if (duplicatable) removable = true

    // upload input styles
    var uploadInputStyle = input.type === 'file'
    ? {
        position: 'absolute',
        left: '0',
        top: '0',
        opacity: '0',
        cursor: 'pointer',
    } : {}
    
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
                ...input.style,
                ...style,
            },
            controls,
        }
    }
    
    if (model === 'featured') {

        return {
            ...component,
            id,
            type: 'View',
            class: 'flex-box',
            // remove from comp
            controls: {},
            droplist: undefined,
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '100%',
                minHeight: style.minHeight || '4rem',
                position: 'relative',
                backgroundColor: '#fff',
                height: 'fit-content',
                minHeight: '4rem',
                borderRadius: '0.25rem',
                transition: '0.2s',
                overflow: 'hidden',
                border: input.type === 'file' ? '1px dashed #ccc' : '0',
                ...style,
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    fontSize: '1.6rem',
                    marginLeft: '1rem',
                    marginRight: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    ...(icon.style || {})
                }
            }, {
                type: `Text?id=${id}-msg;msg=${msg};text=${msg}?const.${msg}`,
                style: {
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '1.3rem',
                    //position: 'absolute',
                    maxWidth: '95%',
                }
            }, {
                type: `Input?id=${id}-input;${unit ? `path=amount` :  currency ? `path=${currency}` : lang ? `path=${lang}` : google ? `path=name` : key ? `path=${key}` : ''}`,
                input,
                textarea,
                readonly,
                droplist,
                filterable,
                placeholder,
                duplicated,
                templated: true,
                'placeholder-ar': component['placeholer-ar'],
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
                    ...uploadInputStyle,
                    ...input.style
                },
                controls: [...controls, {
                    actions: 'resize'
                }, {
                    event: `keyup??value.data();e.key=Enter;${duplicatable}`,
                    actions: `duplicate::${id}`
                }, {
                    event: `input?value.element.value=''?value.data()=free`,
                }]
            }, {
                type: `View?class=flex-box;style.alignSelf=flex-start;style.minWidth=fit-content;style.height=${style.height || '4rem'}`,
                children: [{
                    type: `Icon?icon.name=bi-caret-down-fill;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem?droplist::${id}-input`
                }, {
                    type: `Text?text=${note};style.color=#666;style.fontSize=1.3rem;style.padding=.5rem?const.${note}`
                }, {
                    type: `Text?id=${id}-key;key=${key};text=${key};droplist.items=[Enter a special key:>>readonly,${key}>>input];hoverable;duplicated=${duplicated}?const.${key}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?id=${id}-currency;currency=${currency};text=${currency};droplist.items=[Currencies>>readonly,state.asset.currency.options.map().name.en].flat();hoverable;duplicated=${duplicated}?const.${currency}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                }, {
                    type: `Text?path=unit;id=${id}-unit;droplist.items=[Units>>readonly,state.asset.unit.options.map().name.en].flat();hoverable?const.${unit}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    },
                    actions: `setData?data.value=${unit}?!value.data()`
                }, {
                    type: `Text?id=${id}-language;lang=${lang};text=${lang};droplist.items=[Languages>>readonly,state.asset.language.options.map().name.en].flat();droplist.lang;hoverable;duplicated=${duplicated}?const.${lang}`,
                    style: {
                        fontSize: '1.3rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '.25rem',
                        borderRadius: '.25rem',
                        transition: 'color .2s',
                        after: { color: '#0d6efd' }
                    }
                }, {
                    type: `Checkbox?id=${id}-google;class=align-center;path=google;style.cursor=pointer;style.margin=0 .25rem?const.${google}`,
                    controls: [{
                        event: `change;load?value.element.style.display::${id}-more=none<<!e.target.checked;value.element.style.display::${id}-more=flex<<e.target.checked`
                    }]
                }, {
                    type: `Icon?id=${id}-more;icon.name=more_vert;google;outlined;path=type;style.width=1.5rem;style.display=none;style.color=#666;style.cursor=pointer;style.fontSize=2rem;state.google-items=[Icon type>>readonly,outlined,rounded,sharp,twoTone];droplist.items=[Enter google icon type>>readonly,state.google-items];hoverable?const.${google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;hoverable?${clearable}||${removable}`,
                    style: {
                        fontSize: '2rem',
                        color: '#444',
                        cursor: 'pointer',
                        after: { color: 'red' }
                    },
                    controls: [{
                        event: 'click',
                        actions: [
                            // remove element
                            `remove::${id}??${removable};${clearable ? `value.length::${id}>1;!value.data()::${id}-input` : ''}`,
                            // clear data
                            `removeData;focus>>50??${clearable}?${id}-input`,
                            // for key
                            `focus::${id}-input?value.element.value::${id}-input='';value.element.innerHTML::${edit}-key=value.key::${edit}-key;value.path::${edit}-input=value.key::${edit}-key;value.derivations::${edit}-input=[value.derivations::${edit},value.key::${edit}-key];state[value.Data][value.derivations::${edit}-input]=value.element.value::${edit}-input?const.${edit}`
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}
},{"../method/toComponent":83}],9:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Item = (component) => {

    component.icon = component.icon || {}
    component.chevron = component.chevron || {}
    component = toComponent(component)

    var { model, state, style, icon, text, tooltip, chevron, controls, readonly, borderMarker } = component

    borderMarker = borderMarker !== undefined ? borderMarker : true
    readonly = readonly !== undefined ? readonly : false

    var id = component.id || generate()

    if (model === 'featured')
        return {
            ...component,
            class: 'flex-box item',
            component: 'Item',
            type: 'View?touchableOpacity',
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
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                icon,
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
                actions: `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountOnLoad?state.${state}`
            }, {
                event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
                actions: [
                    `setData?data.value=value.text`,
                    `resetStyles?value.mountOnLoad::state.${state}.0=false??state.${state}`,
                    `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron];value.mountOnLoad::state.${state}.0??state.${state}`,
                ]
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
            component: 'Item',
            type: 'View?touchableOpacity',
            tooltip,
            style: {
                position: 'relative',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '3.3rem',
                cursor: !readonly ? 'pointer' : 'initial',
                marginBottom: '1px',
                borderRadius: '0.5rem',
                padding: '0.9rem',
                borderBottom: !readonly ? 'initial' : '1px solid #eee',
                pointerEvents: 'fill',
                ...style,
                after: readonly ? {} : {
                    backgroundColor: '#eee',
                    ...style.after,
                },
            },
            children: [{
                icon,
                type: `Icon?id=${id}-icon?const.${icon.name}`,
                style: {
                    display: icon ? 'flex' : 'none',
                    color: !readonly ? style.color || '#444' : '#333',
                    fontSize: !readonly ? style.fontSize || '1.4rem' : '1.6rem',
                    fontWeight: !readonly ? 'initial' : 'bolder',
                    marginRight: '1rem',
                    ...(icon.style || {}),
                    after: {
                        color: '#444',
                        ...(icon.style && icon.style.after || {}),
                    }
                }
            }, {
                type: `Text?text=${text};id=${id}-text;`,
                style: {
                    fontSize: style.fontSize || '1.4rem',
                    color: !readonly ? style.color || '#444' : '#333',
                    fontWeight: !readonly ? 'initial' : 'bolder',
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
            }]
        }
}

module.exports = {Item}
},{"../method/generate":51,"../method/toComponent":83}],10:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const List = (component) => {

    component = toComponent(component)
    var { id, model, style, children, controls, passToChildren } = component

    component.placement = component.placement || ''
    component.distance = component.distance || '15'
    
    if (model === 'classic')
        return {
            ...component,
            passToChildren: '',
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
                passToChildren,
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
},{"../method/toComponent":83}],11:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')
const { generate } = require('../method/generate')

const Rate = (component) => {
    
    component = toComponent(component)
    var { model, controls } = component

    var id = component.id || generate()
    var id00 = generate()
    var id05 = generate()
    var id10 = generate()
    var id15 = generate()
    var id20 = generate()
    var id25 = generate()
    var id30 = generate()
    var id35 = generate()
    var id40 = generate()
    var id45 = generate()
    var id50 = generate()
    
    if (model === 'classic')
        return {
            ...component,
            type: 'View?class=half-stars',
            children: [{
                type: 'View?class=rating-group',
                children: [{
                    type: `Input?id=${id00};class=rating__input rating__input-none;input.defaultValue=0;input.type=radio;checked;input.name=rating`
                }, 
                // 0.5 star
                {
                    type: `Label?aria-label=0.5 stars;class=rating__label rating__label-half;for=${id05}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id05};class=rating__input;input.defaultValue=0.5;input.type=radio;input.name=rating`
                }, 
                // 1 star
                {
                    type: `Label?aria-label=1 stars;class=rating__label;for=${id10}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id10};class=rating__input;input.defaultValue=1;input.type=radio;input.name=rating`
                }, 
                // 1.5 star
                {
                    type: `Label?aria-label=1.5 stars;class=rating__label rating__label-half;for=${id15}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id15};class=rating__input;input.defaultValue=1.5;input.type=radio;input.name=rating`
                }, 
                // 2 star
                {
                    type: `Label?aria-label=2 stars;class=rating__label;for=${id20}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id20};class=rating__input;input.defaultValue=2;input.type=radio;input.name=rating`
                }, 
                // 2.5 star
                {
                    type: `Label?aria-label=2.5 stars;class=rating__label rating__label-half;for=${id25}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id25};class=rating__input;input.defaultValue=2.5;input.type=radio;input.name=rating`
                }, 
                // 3 star
                {
                    type: `Label?aria-label=3 stars;class=rating__label;for=${id30}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id30};class=rating__input;input.defaultValue=3;input.type=radio;input.name=rating`
                }, 
                // 3.5 star
                {
                    type: `Label?aria-label=3.5 stars;class=rating__label rating__label-half;for=${id35}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id35};class=rating__input;input.defaultValue=3.5;input.type=radio;input.name=rating`
                }, 
                // 4 star
                {
                    type: `Label?aria-label=4 stars;class=rating__label;for=${id40}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id40};class=rating__input;input.defaultValue=4;input.type=radio;input.name=rating`
                }, 
                // 4.5 star
                {
                    type: `Label?aria-label=4.5 stars;class=rating__label rating__label-half;for=${id45}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id45};class=rating__input;input.defaultValue=4.5;input.type=radio;input.name=rating`
                }, 
                // 5 star
                {
                    type: `Label?aria-label=5 stars;class=rating__label;for=${id50}`,
                    children: [{
                        type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`
                    }]
                }, {
                    type: `Input?id=${id50};class=rating__input;input.defaultValue=5;input.type=radio;input.name=rating`
                }]
            }]
        }
}

module.exports = { Rate }
},{"../method/generate":51,"../method/toComponent":83}],12:[function(require,module,exports){
const { toComponent } = require("../method/toComponent")

const SearchBox = (component) => {

    component = toComponent(component)
    var { placeholder } = component

    return {
        ...component,
        type: 'View?style.flex=1;style.margin=0 1rem;style.height=4.5rem',
        children: [{
            type: 'View?class=overlay;id=search-mini-page-overlay;style.zIndex=-1;style.transition=.2s;style.display=none;style.after.opacity=1>>50;style.after.display=flex;style.after.zIndex=1',
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
                    zIndex: '2'
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
                    }]
                }]
            }, {
                type: 'View?id=search-mini-page-results',
                style: {
                    width: '100%',
                    padding: '0 1rem',
                    transition: '.2s',
                    height: '0',
                    opacity: '0',
                    after: {
                        opacity: '1',
                        height: '15rem>>25',
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
},{"../method/toComponent":83}],13:[function(require,module,exports){
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
                type: 'Text?span'
            }
        }]
    }
}

module.exports = {Switch}
},{"../method/generate":51,"../method/toComponent":83}],14:[function(require,module,exports){
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
},{"../method/toComponent":83}],15:[function(require,module,exports){
const {Button} = require('./Button')
const {Input} = require('./Input')
const {Item} = require('./Item')
const {List} = require('./List')
const {Upload} = require('./Upload')
const {Header} = require('./Header')
const {Switch} = require('./Switch')
const {SearchBox} = require('./SearchBox')
const {Checkbox} = require('./Checkbox')
const {Rate} = require('./Rate')

module.exports = { Input, Button, Item, List, Upload, Header, Switch, SearchBox, Checkbox, Rate }
},{"./Button":5,"./Checkbox":6,"./Header":7,"./Input":8,"./Item":9,"./List":10,"./Rate":11,"./SearchBox":12,"./Switch":13,"./Upload":14}],16:[function(require,module,exports){
const { generate } = require("../method/generate")

module.exports = ({ params = {}, id }) => {
    var controls = params.controls
    var state = generate()

    return [{
        event: `click`,
        actions: [
            `setState?state.actionlist-mouseenter;state.${state}=value.data();value.Data::actionlist=${state};value.data::actionlist=value.data()`,
            `setPosition?position.id=actionlist;position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `mountAfterStyles;update???actionlist`,
        ]
    }, {
        event: 'mouseleave',
        actions: [
            `setState?state.actionlist-mouseenter=false`,
            `resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter`
        ]
    }]
}
},{"../method/generate":51}],17:[function(require,module,exports){
module.exports = {
    "item": require('./item'),
    "list": require('./list'),
    "droplist": require('./droplist'),
    "actionlist": require('./actionlist'),
    "hoverable": require('./hoverable'),
    "miniWindow": require('./miniWindow'),
    "viewToggler": require('./viewToggler'),
    "touchableOpacity": require('./touchableOpacity'),
}
},{"./actionlist":16,"./droplist":18,"./hoverable":19,"./item":20,"./list":21,"./miniWindow":22,"./touchableOpacity":23,"./viewToggler":24}],18:[function(require,module,exports){
const { generate } = require("../method/generate")

module.exports = ({ STATE, params, id }) => {
    var controls = params.controls
    var state = generate()
    STATE[state] = controls.style
    
    return [{
        event: `click?state.droplist=${controls.id || id}`,
        actions: [
            `resetStyles?break?value.element.style.opacity::droplist=1;global.droplist.positioner=${id}?droplist`,
            `resetStyles::droplist;droplist::${controls.id || id}?${controls.path ? `;path=${controls.path}` : ''}`,
            `setPosition;mountAfterStyles::droplist?position.id=droplist;position.positioner=${controls.positioner || `${id}`};position.placement=${controls.placement || 'bottom'};position.distance=${controls.distance}`,
            `setStyle?style=state.${state}?${params.style}?droplist`,
        ]
    }]
}
},{"../method/generate":51}],19:[function(require,module,exports){
const { toArray } = require("../method/toArray");

module.exports = ({ VALUE, id, params = {} }) => {
    
    var controls = typeof params.controls === 'object' ? params.controls : {}
    controls.id = toArray(controls.id || id)
    
    return [{
        event: 'mouseenter',
        actions: `mountAfterStyles???${controls.id.join(';')}`
    }, {
        event: 'mouseleave',
        actions: `resetStyles???${controls.id.join(';')}`
    }]
}
},{"../method/toArray":80}],20:[function(require,module,exports){
module.exports = ({ params }) => ([
    `setData?data.value=value.text`,
    `resetStyles?value.mountOnLoad::state.${params.state}.0=false??state.${params.state}`,
    `setState?state.${params.state}=[${params.id || 'value.id'},${params.id || 'value.id'}++-icon,${params.id || 'value.id'}++-text,${params.id || 'value.id'}++-chevron]`,
    `mountAfterStyles?value.mountOnLoad::state.${params.state}.0??state.${params.state}`,
])
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
const { generate } = require("../method/generate")

module.exports = ({ VALUE, params, id }) => {
    var controls = params.controls
    var state = generate()
    
    return [{
        event: 'click',
        actions: [
            `createView?state.${state}=value.data();value.Data.delete()::mini-window-view<<!value.data();value.Data::mini-window-view=${state}<<value.data();view=${controls.view}??mini-window-view`,
            `setStyle?style.display=flex;style.opacity=1>>25??miniWindow`
        ]
    }]
}
},{"../method/generate":51}],23:[function(require,module,exports){
module.exports = ({ VALUE, id, params = {} }) => {

    if (VALUE[id].element.style.transition)
    VALUE[id].element.style.transition += ', opacity .2s'
    else VALUE[id].element.style.transition = 'opacity .2s'

    return [{
        event: 'mousedown?global.body.element.addClass().unselectable',
        actions: `setStyle?style.opacity=.5`
    }, {
        event: 'mouseup?global.body.element.removeClass().unselectable',
        actions: `setStyle?style.opacity=1`
    }, {
        event: 'mouseleave',
        actions: `setStyle?style.opacity=1`
    }, {
        event: 'mouseenter',
        actions: `setStyle?style.opacity=1?value.mousedown`
    }]
}
},{}],24:[function(require,module,exports){
module.exports = ({ VALUE, params, id }) => {
    var controls = params.controls
    
    return [{
        event: `click??global.${controls.id}.view!=${controls.view}`,
        actions: [
            `resetStyles;mountAfterStyles>>400???global.${controls.id}.parent().id`,
            `createView>>250?value.Data::${controls.id}=value.data();view=${controls.view}??${controls.id}`,
        ]
    }]
}
},{}],25:[function(require,module,exports){
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
const {toPath} = require('./toPath')
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
const {fill} = require('./fill')
const {toAwait} = require('./toAwait')
const {close} = require('./close')
const {pause} = require('./pause')
const {play} = require('./play')
const {note} = require('./note')
const {toCode} = require('./toCode')
const {isPath} = require('./isPath')
const {capitalize} = require('./capitalize')
const {setStyle, resetStyles, toggleStyles, mountAfterStyles} = require('./style')
const {resize, dimensions} = require('./resize')
const {createData, clearData, removeData} = require('./data')

const _method = {
    clearValues, clone, derive, duplicate, duplicates, getJsonFiles, search,
    getParam, isArabic, isEqual, merge, overflow, addEventListener, setState,
    toApproval, toComponent, toId, toParam, toString, update, execute, removeIds,
    createDocument, toArray, generate, createElement, controls, route, textarea,
    setStyle, resetStyles, toggleStyles, mountAfterStyles, resize, dimensions,
    createData, setData, clearData, removeData, setContent, starter, createComponent,
    setPosition, droplist, filter, createView, createActions, flicker, blur, toAwait,
    createControls, remove, defaultInputHandler, focus, sort, log, save, erase, toCode,
    toPath, toValue, reducer, preventDefault, toStyle, toTag, capitalize, fill, note,
    pause, play, close, isPath
}

module.exports = _method
},{"./blur":26,"./capitalize":27,"./clearValues":28,"./clone":29,"./close":30,"./controls":31,"./createActions":32,"./createComponent":33,"./createControls":34,"./createDocument":35,"./createElement":36,"./createView":38,"./data":39,"./defaultInputHandler":40,"./derive":41,"./droplist":42,"./duplicate":43,"./erase":44,"./event":45,"./execute":46,"./fill":47,"./filter":48,"./flicker":49,"./focus":50,"./generate":51,"./getJsonFiles":52,"./getParam":53,"./isArabic":54,"./isEqual":55,"./isPath":56,"./log":57,"./merge":58,"./note":59,"./overflow":60,"./pause":61,"./play":62,"./preventDefault":63,"./reducer":64,"./remove":65,"./resize":67,"./route":68,"./save":69,"./search":70,"./setContent":71,"./setData":72,"./setPosition":73,"./sort":74,"./starter":75,"./state":76,"./style":77,"./textarea":78,"./toApproval":79,"./toArray":80,"./toAwait":81,"./toCode":82,"./toComponent":83,"./toId":84,"./toParam":85,"./toPath":86,"./toString":87,"./toStyle":88,"./toTag":89,"./toValue":90,"./update":91}],26:[function(require,module,exports){
const blur = ({ VALUE, id }) => {
    
    var local = VALUE[id]
    if (!local) return

    var isInput = local.type === 'Input' || local.type === 'Textarea'
    if (isInput) local.element.blur()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length === 0) childElements = local.element.getElementsByTagName("TEXTAREA")
            if (childElements.length > 0) {
                childElements[0].blur()
            }
        }
    }
}

module.exports = {blur}
},{}],27:[function(require,module,exports){
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { capitalize }
},{}],28:[function(require,module,exports){
const { clone } = require("./clone")

const clearValues = (obj) => {
    var newObj = clone(obj)

    if (typeof obj === 'undefined') return ''

    if (typeof obj === 'string') return ''

    if (Array.isArray(obj)) {
        newObj = []
        if (obj.length > 0) obj.map((element, index) => {

            if (typeof element === 'object') {
                newObj[index] = clearValues(element)
            } else newObj[index] = ''

        })

        return newObj
    }

    Object.entries(obj).map(([key, value]) => {
        
        if (Array.isArray(value)) {
            newObj[key] = []
            if (value.length > 0) value.map((element, index) => {

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
},{"./clone":29}],29:[function(require,module,exports){
const clone = (obj) => {
    
    var copy 
    if (typeof obj !== 'object') copy = obj
    else if (Array.isArray(obj)) copy = obj.map(obj => clone(obj))
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
},{}],30:[function(require,module,exports){
const close = ({ VALUE, id }) => {
    var local = VALUE[id]
    clearTimeout(local['note-timer'])
    local.element.style.transform = 'translateY(-200%)'
}

module.exports = {close}
},{}],31:[function(require,module,exports){
const { toArray } = require("./toArray")

const controls = ({ VALUE, STATE, controls, id }) => {
    
    const { addEventListener } = require("./event")
    const { execute } = require("./execute")
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

const setControls = ({ VALUE, id, params }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    local.controls = toArray(local.controls)
    local.controls.push(...toArray(params.controls))
}

module.exports = {controls, setControls}
},{"./event":45,"./execute":46,"./toArray":80,"./watch":92}],32:[function(require,module,exports){
const control = require('../control/control')

const createActions = ({ VALUE, STATE, params, id }) => {
    
    const { execute } = require('./execute')
    
    if (!params.type) return
    var actions = control[params.type]({ VALUE, STATE, params, id })

    execute({ VALUE, STATE, actions, id })
}

module.exports = {createActions}
},{"../control/control":17,"./execute":46}],33:[function(require,module,exports){
const { clone } = require("./clone")
const { generate } = require("./generate")
const { toApproval } = require("./toApproval")
const { toParam } = require("./toParam")

const _component = require("../component/_component")

module.exports = {
    createComponent: ({ VALUE, STATE, id }) => {

        var local = VALUE[id]
        
        if (!_component[local.type]) return [local, id]
        local = _component[local.type](local)

        // destructure type, params, & conditions from type
        var type = local.type.split('?')[0]
        var params = local.type.split('?')[1] 
        var conditions = local.type.split('?')[2]

        // type
        local.type = type
        
        // approval
        var approved = toApproval({ VALUE, STATE, string: conditions, id })
        if (!approved) return
        
        // push destructured params from type to local
        if (params) {
            params = toParam({ VALUE, STATE, string: params, id })
            Object.entries(params).map(([k, v]) => local[k] = v )
            if (params.id) {

                delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
                id = params.id

            } else if (params.data) {

                var state = local.Data
                if (!state) state = local.Data = generate()
                STATE[state] = local.data || {}
                STATE[`${state}-options`] = { backup: clone(STATE[state]) }

            }
        }
        
        VALUE[id] = local
    }
}
},{"../component/_component":15,"./clone":29,"./generate":51,"./toApproval":79,"./toParam":85}],34:[function(require,module,exports){
const { controls } = require("./controls")
const control = require('../control/control')

const createControls = ({ VALUE, STATE, params, id }) => {
    
    var local = VALUE[id]
    if (!local) return
    
    var exists = Object.entries(control).find(([key]) => key === params.controls.type)
    if (!exists) return
    
    controls({ VALUE, STATE, id, controls: control[params.controls.type]({ VALUE, STATE, params, id }) })
}

module.exports = {createControls}
},{"../control/control":17,"./controls":31}],35:[function(require,module,exports){
const { createElement } = require("./createElement")
const { getJsonFiles } = require("./getJsonFiles")

const createDocument = (page) => {
    var innerHTML = '', STATE = {}, VALUE = {}
    
    // get assets & views
    STATE = {
        asset: getJsonFiles('asset'),
        view: getJsonFiles('view'),
        page: getJsonFiles('page'),
        codes: {}
    }

    // body
    var id = 'body'
    VALUE[id] = {}
    VALUE[id].id = id

    // root
    var id = 'root'
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = 'View'
    VALUE[id].children = []
    VALUE[id].parent = 'body'

    //
    if (!STATE.page[page]) return 'Hello'
    
    // push page views to root
    STATE.page[page].views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))

    // push public views to root
    STATE.page.public.views.map(view => STATE.view[view] && VALUE[id].children.push(STATE.view[view]))
    
    // create html
    innerHTML = createElement({ STATE, VALUE, id })
    
    return `<!DOCTYPE html>
    <html lang="en" class="html">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QuePik</title>
        <link rel="stylesheet" href="index.css" />
        <link rel="stylesheet" href="rate.css" />
        <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    </head>
    <body>
        ${innerHTML}
        <script id="STATE" type="application/json">${JSON.stringify(STATE)}</script>
        <script id="VALUE" type="application/json">${JSON.stringify(VALUE)}</script>
        <script src="index.js"></script>
    </body>
    </html>`
}

module.exports = {createDocument}
},{"./createElement":36,"./getJsonFiles":52}],36:[function(require,module,exports){
const { generate } = require("./generate")
const { toParam } = require("./toParam")
const { toApproval } = require("./toApproval")
const { override } = require("./merge")
const { clone } = require("./clone")
const { derive } = require("./derive")
const { createTags } = require("./createTags")
const { reducer } = require("./reducer")

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

    // [type]
    if (type.slice(0, 1) === '[' && type.slice(-1) === ']') {
        type = type.slice(1).slice(0, -1)
        local.mapType = true
    }
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
    local.data = parent.data
    
    // derivations
    local.derivations = local.derivations || [...(parent.derivations || [])]

    // status
    local.status = 'loading'

    // first mount of local
    VALUE[id] = local

    /////////////////// approval & params /////////////////////
    
    // approval
    var approved = toApproval({ VALUE, STATE, string: conditions, id })
    if (!approved) return
    
    // push destructured params from type to local
    if (params) {

        params = toParam({ VALUE, STATE, string: params, id })
        Object.entries(params).map(([k, v]) => local[k] = v )
        
        if (params.id) {

            delete Object.assign(VALUE, { [params.id]: VALUE[id] })[id]
            id = params.id

        }
        
        if (params.data && (!local.Data || params.Data)) {
            
            local.Data = local.Data || generate()
            var state = local.Data
            STATE[state] = clone(local.data || STATE[state])
            STATE[`${state}-options`] = STATE[`${state}-options`] || {}

        }

    } else params = {}

    // pass values To Children
    if (parent.passToChildren) local = override(local, parent.passToChildren)

    // duplicated element
    if (local.duplicatedElement) {

        delete local.path
        delete local.data
    }
    
    // path
    var path = typeof local.path === 'string' && local.path !== '' ? local.path.split('.') : []
    if (path.length > 0) {

        if (!local.Data) {

            var state = local.Data = generate()
            STATE[state] = local.data || {}
            STATE[`${state}-options`] = { backup: clone(STATE[state]) }
            
        }

        // convert string numbers to num
        path = path.map(k => { 
            if (!isNaN(k)) k = parseFloat(k) 
            return k
        })

        // push 0 to derivations for array data
        if (isNaN(path[0])) {
            var data = derive(STATE[local.Data], parent.derivations)[0]
            if (Array.isArray(data)) local.derivations.push(0)
        }

        local.derivations.push(...path)
    }
    
    
    // data
    var data, derivations = clone(local.derivations)
    if (parent.unDeriveData || local.unDeriveData) { data = local.data || ''; local.unDeriveData = true }                                // params cz local.data is inherited from parent which is not default
    else [data, derivations] = derive(STATE[local.Data], local.derivations, clone(params.data), true)

    VALUE[id] = { ...local, data, derivations }
    return createTags({ VALUE, STATE, id })
}

module.exports = {createElement}
},{"./clone":29,"./createTags":37,"./derive":41,"./generate":51,"./merge":58,"./reducer":64,"./toApproval":79,"./toParam":85}],37:[function(require,module,exports){
const { clone } = require("./clone")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { createComponent } = require("./createComponent")
const { toTag } = require("./toTag")
const { isEqual } = require("./isEqual")

const autoActions = ['flicker']

const createTags = ({ VALUE, STATE, id }) => {

    var local = VALUE[id]
    if (!local) return

    local.length = 1

    if (local.mapType && Array.isArray(local.data) && local.data.length > 0) {

        local.length = local.data.length || 1
        var $ = clone(local)
        delete VALUE[id]

        if (local.unmount !== undefined && local.data > 0) {
            var toUnmount = []
            toArray(local.unmount).map(i => {
                toUnmount.push(local.data[i])
            })
            toUnmount.map(unmount => {
                var index = local.data.findIndex(el => isEqual(el, unmount))
                if (index !== -1) local.data.splice(index, 1)
            })
        }
        
        return $.data.map((data, index) => {

            var id = generate()
            var local = clone($)

            local.derivations = [...local.derivations, index]
            local.data = data
            local.id = id

            VALUE[id] = local

            return createTag({ VALUE, STATE, id })

        }).join('')
    }

    if (local.originalKeys) {
        
        var keys = Object.keys(clone(local.data || {})).filter(key => !local.originalKeys.includes(key))
        
        if (keys.length > 0) {
            
            local.length = keys.length
            var $ = clone(local)
            delete VALUE[id]
            
            return keys.map(key => {

                var id = generate()
                var local = clone($)

                local.id = id
                local.key = key
                VALUE[id] = local

                return createTag({ VALUE, STATE, id })

            }).join('')
        }
    }

    if (local.lang && !local.templated && !local.duplicated) {
        var langs = Object.keys(clone(local.data || {}))

        if (langs.length > 0) {
            
            local.length = langs.length
            var $ = clone(local)
            delete VALUE[id]
            
            return langs.map(lang => {

                var id = generate()
                var local = clone($)

                local.id = id
                local.lang = lang

                VALUE[id] = local

                return createTag({ VALUE, STATE, id })

            }).join('')
        }
    }

    if (local.currency && !local.templated && !local.duplicated) {
        var currencies = Object.keys(clone(local.data || {}))

        if (currencies.length > 0) {
            
            local.length = currencies.length
            var $ = clone(local)
            delete VALUE[id]
            
            return currencies.map(currency => {

                var id = generate()
                var local = clone($)

                local.id = id
                local.currency = currency

                VALUE[id] = local

                return createTag({ VALUE, STATE, id })

            }).join('')
        }
    }

    return createTag({ VALUE, STATE, id })
}

const createTag = ({ VALUE, STATE, id }) => {
    
    const { execute } = require("./execute")
                
    // components
    componentModifier({ VALUE, STATE, id })
    createComponent({ VALUE, STATE, id })
    
    var local = VALUE[id]
    
    // execute onload actions
    autoActions.map(action => {
        if (local[action]) {
            local.actions = toArray(local.actions)
            local.actions.push(action)
        }
    })
    
    if (local.actions) execute({ VALUE, STATE, actions: local.actions, id })
    return toTag({ STATE, VALUE, id })
}

const componentModifier = ({ VALUE, id }) => {
    var local = VALUE[id]
    
    // icon
    if (local.type === 'Icon') {
        local.icon = local.icon || {}
        local.icon.name = local.icon.name || ''
        if (local.icon.google) local.google = true

        if (local.icon.outlined || local.icon.type === 'outlined') local.outlined = true
        else if (local.icon.rounded || local.icon.type === 'rounded') local.rounded = true
        else if (local.icon.sharp || local.icon.type === 'sharp') local.sharp = true
        else if (local.icon.twoTone || local.icon.type === 'twoTone') local.twoTone = true
    }

    // textarea
    else if (local.textarea && !local.templated) {
        local.style = local.style || {}
        local.input = local.input || {}
        local.input.style = local.input.style || {}
        local.input.style.height = 'fit-content'
    }

    // input
    else if (local.type === 'Input') {
        local.input = local.input || {}
        if (local.checked !== undefined) local.input.checked = local.checked
        if (local.max !== undefined) local.input.max = local.max
        if (local.min !== undefined) local.input.min = local.min
        if (local.name !== undefined) local.input.name = local.name 
        if (local.defaultValue !== undefined) local.input.defaultValue = local.defaultValue
    }

    else if (local.type === 'Item') {
        var parent = VALUE[local.parent]

        if (local.index === 0) {

            local.state = generate()
            parent.state = local.state

        } else local.state = parent.state
    }
}

module.exports = {createTags}
},{"./clone":29,"./createComponent":33,"./execute":46,"./generate":51,"./isEqual":55,"./toArray":80,"./toTag":89}],38:[function(require,module,exports){
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
},{"./clone":29,"./generate":51,"./toArray":80,"./update":91}],39:[function(require,module,exports){
const { setContent } = require("./setContent")
const { setData } = require("./setData")

const createData = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]
    var data = params.data

    local.derivations.reduce((o, k, i) => {
        if (i === local.derivations.length - 1) return o[k] = data
        return o[k]
    }, STATE[local.Data])
}



const clearData = ({ VALUE, STATE, id }) => {
    setData({ VALUE, STATE, id })
}

const removeData = ({ STATE, VALUE, id, params = {} }) => {
    
    var local = VALUE[id];
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
    console.log('data removed', STATE[local.Data]);
}

module.exports = {createData, setData, clearData, removeData}
},{"./setContent":71,"./setData":72}],40:[function(require,module,exports){
const { setData } = require("./data")
const { resize } = require("./resize")
const { isArabic } = require("./isArabic")
const { generate } = require("./generate")

const defaultInputHandler = ({ STATE, VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (local.type !== 'Input') return

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
                var data = { value }
                setData({ STATE, VALUE, params: { data }, id })
            }
        }

        return local.element.addEventListener('change', myFn)
    }
    
    if (local.input && local.input.type === 'number')
        local.element.addEventListener("mousewheel", (e) => e.target.blur())

    //if (local.input && local.input.value && !local.data)
    //    setData({ STATE, VALUE, params: { data: { value: local.input.value } }, id })

    if (local.readonly) return

    var myFn = async (e) => {
        e.preventDefault()

        // VAR[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener('input', myFn)

        var value = e.target.value

        // for number inputs, strings are rejecteds
        if (local.input && local.input.type === 'number') {

            value = parseFloat(value)
            if (isNaN(value) || local.data === 'free') return
            if (local.input.min > value) value = local.input.min
            else if (local.input.max < value) value = local.input.max
            local.input.value = value
        }

        // for uploads
        if (local.input.type === 'file') {

            value = e.target.files
            
            // add files to state for saving
            const readFile = (file) => {
                return new Promise ((res, rej) => {
                    let myReader = new FileReader()
                    myReader.onloadend = (e) => res(myReader.result)
                    myReader.readAsDataURL(file)
                })
            }

            var file = await readFile(value[0])
            var fileName = `${Date.now()}-${generate()}`
            
            return STATE.file = { file, "file-name": fileName }

        } else local.element.value = value
        
        // rating input 
        if (local.class.includes('rating__input')) {
            value = local.element.getAttribute('defaultValue')
        }

        if (local.Data && local.derivations[0] != '') {

            // reset Data
            setData({ STATE, VALUE, params: { data: { value } }, id })
        }

        // resize
        resize({ VALUE, id })

        // arabic values
        isArabic({ VALUE, params: { value }, id })

        console.log(value, STATE[local.Data])
    }

    local.element.addEventListener('input', myFn)
    local.element.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && !e.shiftKey) e.preventDefault()
    })
    
    // resize
    resize({ VALUE, id })
}

module.exports = {defaultInputHandler}
},{"./data":39,"./generate":51,"./isArabic":54,"./resize":67}],41:[function(require,module,exports){
const derive = (data, keys, defaultData, editable) => {

    if (!Array.isArray(keys)) keys = keys.split('.')
    
    data = keys.reduce((o, k, i) => {

        // path doesnot exist => create path
        if (editable && typeof o[k] !== 'object') {

            if (i < keys.length - 1) {
                if (!isNaN(keys[i + 1])) o[k] = []
                else o[k] = {}
            }

            else if (i === keys.length - 1) {

                if (defaultData !== undefined) o[k] = defaultData

                else if (Array.isArray(o) && isNaN(k)) {

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

            return o
        }

        return o[k]
    }, data)
    
    return [data, keys]
}


module.exports = {derive}
},{}],42:[function(require,module,exports){
const { update } = require('./update')
const { clone } = require('./clone')
const { derive } = require('./derive')
const { toValue } = require('./toValue')
const { isPath } = require('./isPath')

const droplist = ({ VALUE, STATE, id, e }) => {

    var local = VALUE[id]
    if (!local) return
    
    var dropList = VALUE['droplist']
    var isInput = local.type === 'Input' || local.type === 'Textarea'

    // items
    var items = clone(local.droplist.items) || []
    dropList.derivations = clone(local.derivations)
    dropList.Data = local.Data
    
    // path
    if (local.droplist.path) dropList.derivations.push(...local.droplist.path.split('.'))

    // input id
    var input_id
    if (local.lang || local.unit || local.currency || local.key) 
    input_id = VALUE[local.parent].element.previousSibling.id
    
    // dynamic items
    if (typeof items === 'string') items = items.split(',')
    items = items.map(item => {

        if (typeof item === 'string' && isPath({ params: { path: item } })) 
            return toValue({ VALUE, STATE, id, params: { value: item }, e })

        return item
    })

    // filter undefinds
    items = items.filter(item => item)

    // flat
    if (local.droplist['flat()']) items = items.flat()

    var parent = VALUE[local.parent].parent
    
    if (items.length > 0) dropList.children = clone(items).map(item => {
        
        var readonly = false, input = false, droplist, itemList = []
        if (typeof item === 'string') {

            item = item.split('>>')
            readonly = item[1] === 'readonly'
            input = item[1] === 'input'
            item = item[0]

        } else if (Array.isArray(item)) {
            
            itemList = clone(item)
            item = itemList.find(item => !item.includes('readonly'))
            input = true
            droplist = true
        }
        
        if (input && !readonly) {
            return {
                type: `Input?featured;clearable;style.backgroundColor=#f0f0f0;${local.key ? `input.value=value.path::${input_id};edit=${parent};` : `input.value=${item};`}${droplist ? `readonly;droplist.items=[${itemList}];droplist.positioner=${dropList.positioner};data=${derive(STATE[local.Data], local.derivations)[0]};` : ''}`,
                controls: [{
                    event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};state[value.Data][value.derivations::${input_id}].delete();value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(',')},e.target.value||${local.key}];state[value.Data][value.derivations::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?!${droplist};value.key::${id};value.path::${input_id}!=e.target.value`
                }]
            }
        }

        return {
            type: `Item?text=${item};readonly=${readonly}`,
            controls: [{
                event: `click?value.element.${isInput ? 'value' : 'innerHTML'}::${id}=${item};value.data::${id}=${item};state[value.Data][value.derivations]<<!const.${local.lang}=${item};action.resize::${id}?!readonly;state.droplist=${id}`,
                actions: [

                    // for lang & currency droplists
                    `setData;focus::${input_id}?data.path=${item};data.value=value.data()::${input_id};state[value.Data][value.derivations::${input_id}].delete();value.derivations::${input_id}=[${input_id && VALUE[input_id].derivations.slice(0, -1).join(',')},${item}];value.path::${input_id}=${item}?const.${input_id};value.lang::${id}||value.currency::${id};value.path::${input_id}!=${item}`,

                    // data = free
                    `setData::${input_id}?data.value=free?${input_id};const.${item}=free`,
                    `setData::${input_id}?data.value=''?${input_id};const.${item}!=free;value.data=free`,
                    
                    `focus::${input_id}`,
                ]
            }]
        }
    })

    dropList.positioner = id
    dropList.unDeriveData = true
    
    update({ VALUE, STATE, id: 'droplist' })
}

module.exports = {droplist}
},{"./clone":29,"./derive":41,"./isPath":56,"./toValue":90,"./update":91}],43:[function(require,module,exports){
const { clearValues } = require('./clearValues')
const { clone } = require('./clone')
const { toArray } = require('./toArray')
const { derive } = require('./derive')
const { isEqual } = require('./isEqual')
const { removeDuplicates } = require('./removeDuplicates')
const { generate } = require('./generate')
const { focus } = require('./focus')

const duplicate = ({ VALUE, STATE, params = {}, id }) => {

    const { createElement } = require('./createElement')
    const { starter } = require('./starter')

    var localID = id
    var local = VALUE[id]
    
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

        var language, currency

        keys.reduce((o, k, i) => {

            if (i === keys.length - 1) {

                if (local.currency) {

                    var currencies = []
                    Object.entries(o[k]).map(([k, v]) => {
                        currencies.push(k)
                    })

                    var random = []
                    STATE.asset.currency.options.map(currency => {
                        if (!currencies.includes(currency.name.en)) random.push(currency.name.en)
                    })

                    currency = random[0]
                    o[k][currency] = ''

                } else if (local.lang) {

                    var langs = []
                    Object.entries(o[k]).map(([k, v]) => {
                        langs.push(k)
                    })

                    var random = []
                    STATE.asset.language.options.map(lang => {
                        if (!langs.includes(lang.name.en)) random.push(lang.name.en)
                    })

                    language = random[0]
                    o[k][language] = ''

                } else if (local.key) {

                    o[k][local.key] = ''

                } else {

                    o[k] = toArray(o[k])
                    i = o[k].length - 1

                    if (isNaN(local.derivations[local.derivations.length - 1])) local.derivations.push(0)
                    o[k].push(clone(local.pushData || o[k][i] || ''))

                    if (!params.keepValues) {
                        var i = o[k].length - 1
                        o[k][i] = removeDuplicates(clearValues(o[k][i]))
                    }
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
    VALUE[id].duplicatedElement = true
    VALUE[id].index = local.index
    VALUE[id].derivations = [...local.derivations]

    var local = VALUE[id]
    local.duplicated = true

    if (VALUE[localID].currency) {

        var type = local.type.split('currency=')[0]
        type += local.type.split('currency=')[1].slice(2)
        type += `;currency=${currency}`
        local.type = type

    } else if (VALUE[localID].lang) {

        var type = local.type.split('lang=')[0]
        type += local.type.split('lang=')[1].slice(2)
        type += `;lang=${language}`
        local.type = type

    } else if (VALUE[localID].originalKeys || local.type.includes('originalKeys=')) {

        // remove originalKeys=[]
        var type = local.type.split('originalKeys=')[0]
        if (local.type.split('originalKeys=')[1]) type += local.type.split('originalKeys=')[1].split(';').slice(1).join(';')
        local.type = type
        
    } else if (VALUE[localID].key) {
    
        // local.key

    } else local.derivations[local.derivations.length - 1] = length

    // create element => append child
    var newcontent = document.createElement('div')
    newcontent.innerHTML = createElement({ STATE, VALUE, id })
    
    while (newcontent.firstChild) {

        id = newcontent.firstChild.id
        VALUE[local.parent].element.appendChild(newcontent.firstChild)
    
        // starter
        starter({ STATE, VALUE, id })
    }

    // update length
    [...VALUE[local.parent].element.children].map(child => {
        var id = child.id
        VALUE[id].length = length + 1
    })

    // focus
    focus({ VALUE, STATE, id })
}

const duplicates = ({ STATE, VALUE, params, id }) => {
    var local = VALUE[id]

    var data = derive(STATE[local.Data], local.derivations)[0], exists
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
},{"./clearValues":28,"./clone":29,"./createElement":36,"./derive":41,"./focus":50,"./generate":51,"./isEqual":55,"./removeDuplicates":66,"./starter":75,"./toArray":80}],44:[function(require,module,exports){
const axios = require('axios')
const { update } = require('./update')

const erase = async ({ VALUE, STATE, id, params = {} }) => {

    var local = VALUE[id]
    if (!local) return

    var erase = params.erase
    if (!erase.data['file-name']) return

    var { data: { data, message, success } } = await axios.delete(`/api/${erase.path}`, { data: erase.data })

    delete STATE[erase.path][data['file-name']]
    
    if (erase.state) STATE[erase.state] = STATE[erase.state].filter(file => file['file-name'] !== data['file-name'])
    if (erase.update) update({ VALUE, STATE, id: erase.update })
    
    console.log(data, message, success)
}

module.exports = { erase }
},{"./update":91,"axios":93}],45:[function(require,module,exports){
const { toApproval } = require('./toApproval')
const { toId } = require('./toId')
const { getParam } = require('./getParam')
const { toParam } = require('./toParam')
const { clone } = require('./clone')
const { generate } = require('./generate')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    var local = VALUE[id]
    var mainID = local.id

    var events = controls.event.split('?')
    var once = getParam(controls.event, 'once', false)
    var _idList = toId({ VALUE, STATE, id, string: events[3] })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0
        var code = generate()

        // action::id
        var eventid = event.split('::')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        else idList = clone(_idList)

        // event
        event = event.split('::')[0]

        // action>>timer
        timer = event.split('>>')[1] || 0
        event = event.split('>>')[0]

        if (!event) return

        clearTimeout(local[`${code}${event}-timer`])

        // add event listener
        idList.map(id => {

            var myFn = (e) => {

                local[`${code}${event}-timer`] = setTimeout(() => {

                    var events = controls.event.split('?')
                    if (events[0] === 'load') console.log(controls.event);
                    // VALUE[id] doesnot exist
                    if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                    
                    // approval
                    var approved = toApproval({ VALUE, STATE, string: events[2], e, id })
                    if (!approved) return

                    // params
                    params = toParam({ VALUE, STATE, string: events[1], e, id })
                    
                    if (controls.actions) execute({ VALUE, STATE, controls, e, id: mainID })
                
                }, timer)
            }

            // onload event
            if (event === 'load') myFn({ target: VALUE[id].element })
            
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
},{"./clone":29,"./execute":46,"./generate":51,"./getParam":53,"./toApproval":79,"./toId":84,"./toParam":85}],46:[function(require,module,exports){

const { toApproval } = require("./toApproval")
const { toArray } = require("./toArray")
const { toParam } = require("./toParam")
const { getParam } = require("./getParam")
const { toId } = require("./toId")
const { generate } = require("./generate")
const { toValue } = require("./toValue")
const { toAwait } = require("./toAwait")
const _method = require("./_method")

const execute = ({ VALUE, STATE, controls, actions, e, id, params }) => {

    var local = VALUE[id], awaiter = [], _params = params, localId = id
    // if (!local) return

    if (controls) actions = controls.actions
    if (local) local.break = false

    // execute actions
    toArray(actions).map(_action => {
        
        // stop after actions
        if (local && local.break) return

        var approved = true
        var actions = _action.split('?')
        var params = _params || actions[1]
        var conditions = actions[2]
        var idList = actions[3]

        actions = actions[0].split(';')

        // action does not exist
        actions.map(action => {

            var name = action.split('::')[0]

            // action>>timer
            var timer = parseFloat(name.split('>>')[1] || 0)
            name = name.split('>>')[0]

            // approval => note: essential for break::do not remove
            approved = toApproval({ VALUE, STATE, string: conditions, params, id, e })
            if (!approved) return

            // reset
            var reset = getParam(_action, 'reset', false)
            if (local) local.break = getParam(_action, 'break', false)
            if (reset) clearTimeout(local[`${name}-timer`])
            
            const myFn = () => {
                
                // approval
                approved = toApproval({ VALUE, STATE, string: conditions, params, id, e })
                if (!approved) return
                
                // params
                params = toParam({ VALUE, STATE, string: params, e, id })
                
                // id's
                idList = toId({ VALUE, STATE, id, string: idList, e })

                // action::id
                var actionid = action.split('::')[1]
                if (actionid) actionid = toValue({ VALUE, STATE, params: { value: actionid, params }, id, e })
                
                // action
                var keys = name.split('.')
                if (keys.length > 1) keys.map((k, i) => {

                    if (i === keys.length - 1) return name = k
                    if (k === 'async') {

                        params.asyncer = true
                        
                    } else if (k === 'await') {
                        
                        params.awaiter = true
                        awaiter.push(action.split('await.')[1])
                    }
                })
                
                
                if (_method[name] && (!params.awaiter || params.asyncer)) 
                
                (actionid ? toArray(actionid) : idList).map(async id => {

                    if (typeof id !== 'string') return

                    // id = value.path
                    if (id.indexOf('.') > -1) {
                        
                        var k = generate()
                        id = toParam({ VALUE, STATE, string: `${k}=${id}`, e, id: localId })[k]
                    }

                    // component does not exist
                    if (!id || !VALUE[id]) return

                    if (params.asyncer) params.awaiter = awaiter
                    await _method[name]({ VALUE, STATE, controls, params, e, id })
                    
                    // asyncer
                    //if (_method[name].constructor.name !== 'AsyncFunction') 
                    toAwait({ VALUE, STATE, id, e, params })
                })

            }
            
            if (timer) {
                if (local) local[`${name}-timer`] = setTimeout(myFn, timer)
                else setTimeout(myFn, timer)
            } else myFn()
        })
    })
    
}

module.exports = {execute}
},{"./_method":25,"./generate":51,"./getParam":53,"./toApproval":79,"./toArray":80,"./toAwait":81,"./toId":84,"./toParam":85,"./toValue":90}],47:[function(require,module,exports){
module.exports = {
    fill: ({ VALUE, STATE, id }) => {
        var local = VALUE[id], ratio

        if (local.element) {

            if (local.type !== 'Image') {

                var imageEls = [...local.element.getElementsByTagName('IMG')]
                if (imageEls.length === 0) return

            } else imageEls = [local.element]
            
            setTimeout(() => {
                imageEls.map(el => {

                    var local = VALUE[el.id]
                    if (!local.element.src.split('/')[4]) return 

                    var parentWidth = VALUE[local.parent].element.clientWidth
                    var parentHeight = VALUE[local.parent].element.clientHeight

                    var width = local.element.offsetWidth
                    var height = local.element.offsetHeight
                    
                    if (( width/parentWidth <=1 && width/parentWidth > 0.99 && height > parentHeight) 
                        || ( height/parentHeight <=1 && height/parentHeight > 0.99 && width > parentWidth)) return

                    local.element.style.maxWidth = '100%'
                    local.element.style.maxHeight = '100%'

                    var width = local.element.offsetWidth
                    var height = local.element.offsetHeight

                    if (width/parentWidth < 0.99) {

                        local.element.style.width = parentWidth + 'px'
                        if (width) ratio = (parentWidth - width) / width
                        local.element.style.maxHeight = 'initial'
                        local.element.style.height = height + ratio * height + 'px'

                    } else if (height/parentHeight < 0.99) {

                        local.element.style.height = parentHeight + 'px'
                        if (height) ratio = (parentHeight - height) / height
                        local.element.style.maxWidth = 'initial'
                        local.element.style.width = width + ratio * width + 'px'

                    }
                })
            } , 500)

        }
    }
}
},{}],48:[function(require,module,exports){
const {update} = require('./update')

const filter = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    if (!local) return
    
    var filter = params.filter || {}
    var Data = filter.Data || local.Data
    var options = STATE[`${Data}-options`]
    var backup = filter.backup
    var path = (filter.path || '').split('.')
    var value = filter.value
    
    if (options.filter === value) return
    options.filter = value
    
    // no value
    if (value === '' || value === undefined) STATE[Data] = backup
    else STATE[Data] = backup.filter(data => 
        path.reduce((o, k, i) => o[k], data).toString().toLowerCase().includes(value.toLowerCase())
    )

    if (filter.update) update({ VALUE, STATE, id: filter.update })
}

module.exports = {filter}
},{"./update":91}],49:[function(require,module,exports){
const { setControls } = require("./controls")
const { setStyle } = require("./style")

module.exports = { 
    flicker: ({ VALUE, id }) => {

        var local = VALUE[id]

        var transition = VALUE[id].style.transition
        if (transition) transition += 'opacity .2s'
        transition = 'opacity .2s'

        setStyle({ VALUE, STATE, id, params: { style: { transition, opacity: '0' } } })

        var controls = { "actions": "setStyle?style.opacity=1" }

        setControls({ VALUE, STATE, id, params: { controls }})
    }
}
},{"./controls":31,"./style":77}],50:[function(require,module,exports){
const focus = ({ VALUE, id }) => {
    
    var local = VALUE[id]
    if (!local) return

    var isInput = local.type === 'Input' || local.type === 'Textarea'
    if (isInput) local.element.focus()
    else {
        if (local.element) {
            var childElements = local.element.getElementsByTagName("INPUT")
            if (childElements.length === 0) childElements = local.element.getElementsByTagName("TEXTAREA")
            if (childElements.length > 0) {
                childElements[0].focus()
            }
        }
    }

    // focus to the end of input
    var value = local.element.value
    local.element.value = ''
    local.element.value = value
}

module.exports = {focus}
},{}],51:[function(require,module,exports){
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
},{}],52:[function(require,module,exports){
(function (process){(function (){
const path = require('path')
const fs = require('fs')

const getJsonFiles = (folder, fileName) => {

    var files = {}
    var folderPath = path.join(process.cwd(), folder)
    
    if (fileName) return JSON.parse(fs.readFileSync(path.join(folderPath, fileName)))
    
    fs.readdirSync(folderPath).forEach(fileName => {
    
        var file = fs.readFileSync(path.join(folderPath, fileName))
        fileName = fileName.split('.json')[0]
        files[fileName] = JSON.parse(file)
    })
    
    return files
}

module.exports = { getJsonFiles }
}).call(this)}).call(this,require('_process'))
},{"_process":3,"fs":1,"path":2}],53:[function(require,module,exports){
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
},{}],54:[function(require,module,exports){
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
},{}],55:[function(require,module,exports){
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
},{}],56:[function(require,module,exports){
module.exports = {
    isPath: ({ VALUE, STATE, id, e, params: { path } }) => {
        path = path.split('.')

        if (path.length === 1 || path.length === 0) return false
        else if (/\d/.test(path[0]) 
            || /\s/.test(path[0]) 
            || path[1] && (path[1].includes('rem') || path[1].includes('px'))
        ) return false
        return true
    }
}
},{}],57:[function(require,module,exports){
const log = ({params}) => {
    console.log(params.log);
}

module.exports = {log}
},{}],58:[function(require,module,exports){

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
},{"./clone":29,"./toArray":80}],59:[function(require,module,exports){
const note = ({ VALUE, params }) => {

    var note = VALUE['action-note']
    var noteText = VALUE['action-note-text']

    if (!params.note) return

    clearTimeout(note['note-timer'])
    
    note.element.style.transition = 'initial'
    note.element.style.transform = 'translateY(-200%)'

    noteText.element.innerHTML = params.note

    note.element.style.left = 'center'
    note.element.style.transition = 'transform .2s'
    note.element.style.transform = 'translateY(0)'

    const myFn = () => { 
        note.element.style.transform = 'translateY(-200%)'
    }

    note['note-timer'] = setTimeout(myFn, 5000)
}

module.exports = {note}
},{}],60:[function(require,module,exports){
const overflow = ({ VALUE, params, id }) => {
    var local = VALUE[id]

    var width = local.element.clientWidth
    var height = local.element.clientHeight
    var text

    if (local.type === 'Input' || local.type === 'Textarea') text = local.element.value
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
},{}],61:[function(require,module,exports){
const pause = ({ VALUE, id }) => {
    var local = VALUE[id]
    clearTimeout(local['note-timer'])
}

module.exports = {pause}
},{}],62:[function(require,module,exports){
const play = ({ VALUE, id }) => {
    var local = VALUE[id]
    const myFn = () => { 
        local.element.style.transform = 'translateY(-200%)'
    }

    local['note-timer'] = setTimeout(myFn, 5000)
}

module.exports = {play}
},{}],63:[function(require,module,exports){
const preventDefault = ({e}) => {
    e.preventDefault()
}

module.exports = {preventDefault}
},{}],64:[function(require,module,exports){
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")
const { isEqual } = require("./isEqual")
const { capitalize } = require("./capitalize")

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, e }) => {

    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (path[0] === 'global') {
        local = VALUE[path[1]]
        id = path[1]
        path = path.slice(1)
        path[0] = 'value'
    }
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === 'params' ? params
        : false
        
        if (!object && path[0]) {
            
            if (path[0].includes('coded')) 
            object = toValue({ VALUE, STATE, id, params: { value: STATE.codes[path[0]], params }, e })

            else if (path.join('.').includes(','))
            return object = toValue({ VALUE, STATE, id, params: { value: `[${path.join('.')}]`, params }, e })

            else if (path[0] === 'action')
            return execute({ VALUE, STATE, id, actions: path[1], params, e })
        }

        if (object) path = path.slice(1)
        else return path.join('.')
    }
    
    var lastIndex = path.length - 1
    
    var answer = path.reduce((o, k, i) => {
        if (!isNaN(k)) k = k + ''
                    
        // break method
        if (breakRequest === true || breakRequest === i) return o

        if (!o) return o
        
        // set Value

        if (k.includes('coded()')) {

            var _id = generate()
            VALUE[_id] = o
            answer = toValue({ VALUE, STATE, id: _id, e, params: { value: STATE.codes[k], params } })
            delete VALUE[_id]

        } else if (k === 'data()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i + 1)], object: STATE[local.Data], params } })
            if (i === lastIndex) {
                local.data = answer
                delete local['data()']
            }

        } else if (k === 'Data()') {

            answer = STATE[local.Data]
            
        } else if (k === 'derive()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i + 1)], object: o, params } })

        } else if (k === 'parent()') {

            var parent = o.parent
            if (o.templated) parent = VALUE[parent].parent
            answer = VALUE[parent]

        } else if (k === 'next()' || k === 'nextSibling()') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var nextSibling = element.nextSibling
            var _id = nextSibling.id
            answer = VALUE[_id]

        } else if (k === 'prev()' || k === 'prevSibling()') {

            var element = o.templated ? VALUE[o.parent].element : o.element
            var previousSibling = element.previousSibling
            var _id = previousSibling.id
            answer = VALUE[_id]

        } else if (k === '1stChild()') {
            
            var _id = o.element.children[0].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]
            
        } else if (k === '2ndChild()') {
            
            var _id = (o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '3rdChild()') {

            var _id = (o.element.children[2] || o.element.children[1] || o.element.children[0]).id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'lastChild()') {

            var _id = o.element.children[o.element.children.length - 1].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === 'children()') {

            answer = [...o.element.children].map(el => {
                
                var id = el.id
                if (VALUE[id].component === 'Input') {

                    var _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
                    return VALUE[_id]

                } else return VALUE[id]
            })
            
        } else if (k === 'keys()') {
            
            answer = Object.keys(o)

        } else if (k === 'values()') {
            
            answer = Object.values(o)

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'generate()') {
            
            answer = generate()

        } else if (k === 'includes()') {
            
            answer = o.includes(value)
            
        } else if (k === 'capitalize()') {
            
            answer = capitalize(o)
            
        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o
            
        } else if (k === 'map()') {
            
            breakRequest = true
            answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), object: o, value, key, params }, e }) )

        } else if (k === '1stIndex()' || k === 'firstIndex()') {
            
            if (value !== undefined && key) o[0] = value
            answer = o[0]

        } else if (k === '2ndIndex()' || k === 'secondIndex()') {
            
            if (value !== undefined && key) o[1] = value
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()') {
            
            if (value !== undefined && key) o[2] = value
            answer = o[2]

        } else if (k === 'lastIndex()') {

            if (value !== undefined && key) o[o.length - 1] = value
            answer = o[o.length - 1]
            
        } else if (k === 'parseFloat()') {
            
            answer = parseFloat(o)

        } else if (k === 'parseInt()') {
            
            answer = parseInt(o)

        } else if (k === 'stringify()') {
            
            answer = JSON.stringify(o)

        } else if (k === 'parse()') {
            
            answer = JSON.parse(o)

        } else if (k === 'preventDefault()') {
            
            answer = e.preventDefault()

        } else if (k === 'value()') {

            answer = VALUE[o]

        } else if (k === 'isChildOf()') {
            
            breakRequest = true
            var el = reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), value, key, params }, e })
            answer = isEqual(el, o)

        } else if (k === 'isChildOfId()') {
            
            breakRequest = true
            var id = reducer({ VALUE, STATE, id, params: { path: path.slice(i + 1), value, key, params }, e })
            var ids = Object.keys(getDeepChildren({ VALUE, id }))
            answer = ids.find(_id => _id === o)

        } else if (k === 'allChildren()') { // all values of local element and children elements in object formula
            
            answer = getDeepChildren({ VALUE, id })

        } else if (k === 'addClass()') {
            
            breakRequest = true
            answer = o.classList.add(path.slice(i + 1).join('.'))

        } else if (k === 'removeClass()') {
            
            breakRequest = true
            answer = o.classList.remove(path.slice(i + 1).join('.'))

        } else if (k === 'element' && local.status === 'loading') {

            breakRequest = true
            local.controls = toArray(local.controls) || []
            if (value !== undefined) return local.controls.push({
                event: `load?${key}=${value}`
            })
            
        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (i === lastIndex - 1 && path[lastIndex] === 'delete()') {
            
            breakRequest = true
            return delete o[k]

        } else if (key && i === lastIndex) {
            
            return o[k] = value

        } else if (!o[k] && key) {
            
            if (!isNaN(path[i + 1])) o[k] = []
            else o[k] = {}

        } else answer = o[k]
        
        return answer

    }, object)
    
    return answer
}

const getDeepChildren = ({ VALUE, id }) => {
    var all = { [id]: VALUE[id] }
    if (!VALUE[id]) return {}
    
    if ([...VALUE[id].element.children].length > 0) 
        ([...VALUE[id].element.children]).map(el => {

            if ([...VALUE[el.id].element.children].length > 0) 
                all = { ...all, ...getDeepChildren({ VALUE, id }) }

            else all[el.id] = VALUE[el.id]
        })
    return all
}

module.exports = { reducer }
},{"./capitalize":27,"./execute":46,"./generate":51,"./isEqual":55,"./toArray":80,"./toCode":82,"./toValue":90}],65:[function(require,module,exports){
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

    if (keys.length === 0) {
        
        // local.parent.children.splice([keys[keys.length - 1]], 1)

    } else keys.reduce((o, k, i) => {

        if (i === keys.length - 1) {

            if (Array.isArray(o)) {

                o.splice(k, 1)

            // name: { en: val1, ar: val2, ... }
            } else if (local.component === 'Input') {

                var key = VALUE[`${id}-input`].path
                return delete o[k][key]

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
},{"./clone":29,"./update":91}],66:[function(require,module,exports){
const removeDuplicates = (object) => {

    if (typeof object === 'string' || typeof object === 'number' || !object) return object

    if (Array.isArray(object)) {
        if (object.length === 0) return []
        return object = [removeDuplicates(object[0])]
    }

    if (typeof object === 'object') {

        Object.entries(object).map(([key, value]) => {
            object[key] = removeDuplicates(value)
        })
        
        return object
    }
}

module.exports = {removeDuplicates}
},{}],67:[function(require,module,exports){
const resize = ({ VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    if (local.type !== 'Input') return

    var results = dimensions({ VALUE, id })
    
    // for width
    var width = local.style.width
    if (width === 'fit-content') {

        if (local.element) {

            if (!local.style || (local.style && !local.style.minWidth)) 
                local.element.style.width = results.width + 'px'

            else if (converter(local.style.minWidth) > results.width) {
                local.element.style.width = local.style.minWidth
            } else local.element.style.width = results.width + 'px'

            // templated
            if (local.templated) {
                var local = VALUE[VALUE[id].parent]

                if (!local.style || (local.style && !local.style.minWidth))
                    local.element.style.width = results.width + 'px'
                    
                else if (converter(local.style.minWidth) > results.width) {
                    local.element.style.width = local.style.minWidth
                } else local.element.style.width = results.width + 'px'
            }

        } else results.width + 'px'

    } else local.style.width

    // for height
    var height = local.style.height
    if (height === 'fit-content') {

        if (local.element) {
            
            if (!local.style || (local.style && !local.style.minHeight))
                local.element.style.height = results.height + 'px'

            else if (converter(local.style.minHeight) > results.height) {
                local.element.style.height = local.style.minHeight
            } else local.element.style.height = results.height + 'px'

            // templated
            if (local.templated) {
                var local = VALUE[VALUE[id].parent]
                
                if (!local.style || (local.style && !local.style.minHeight))
                    local.element.style.height = results.height + 'px'

                else if (converter(local.style.minHeight) > results.height) {
                    local.element.style.height = local.style.minHeight
                } else local.element.style.height = results.height + 'px'
            }

        } else results.height + 'px'

    } else local.style.height
}

const dimensions = ({ VALUE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    var lDiv = document.createElement('div')
    document.body.appendChild(lDiv)

    var pStyle = local.style
    var pText = params.text || local.data || (local.input && local.input.value) || local.text || 'A'
    var pFontSize = pStyle.fontSize
    
    if (pStyle != null) lDiv.style = pStyle

    lDiv.style.fontSize = pFontSize
    lDiv.style.position = "absolute"
    lDiv.style.left = -1000
    lDiv.style.top = -1000
    lDiv.style.padding = pStyle.padding
    lDiv.style.maxWidth = pStyle.maxWidth 
    lDiv.style.maxHeight = pStyle.maxHeight
    lDiv.style.transform = pStyle.transform
    lDiv.style.display = 'flex'
    lDiv.style.flexWrap = 'wrap'


    if (pStyle.width === '100%') lDiv.style.width = local.element.clientWidth + 'px'
    lDiv.style.width = (lDiv.clientWidth) + 'px'

    lDiv.innerHTML = pText

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    }

    document.body.removeChild(lDiv)
    lDiv = null
    
    return lResult
}

const converter = (dimension) => {
    if (!dimension) return 0
    if (dimension.includes('rem')) return parseFloat(dimension) * 10
    if (dimension.includes('px')) return parseFloat(dimension)
}

module.exports = {resize, dimensions}
},{}],68:[function(require,module,exports){

const { starter } = require('./starter')
//const { search } = require("./search")
//const { setState } = require("./state")

/*const toRoute = ({ VAR, STATE }) => {

    var pathname = window.location.pathname.split('/')
    pathname.slice(2)
    var queries = pathname.filter(path => path.includes('search?') ; path.includes('search?').split('search?')[1])
    pathname = pathname.filter(path => !path.includes('search?'))

    queries.map(query => {
        query = toParam({ VAR, STATE, string: query })
        search({ VAR, STATE, params: query })
    })

    var stateList = toParam({ VAR, STATE, string: pathname.join(';') || '' })
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
    var states = toParam({ string: route.join(';') })
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
},{"./starter":75}],69:[function(require,module,exports){
const axios = require('axios')
const { toAwait } = require('./toAwait')

const save = async ({ VALUE, STATE, params = {}, id, e }) => {

    var local = VALUE[id]
    if (!local) return

    var save = params.save
    if (!save.data['file-name']) return

    var { data: { data, message, success } } = await axios.post(`/api/${save.path}`, save.data)

    local.save = { data, message, success }

    STATE[save.path] = STATE[save.path] || {}
    STATE[save.path][data['file-name']] = data

    console.log(data, message, success)
}

module.exports = { save }
},{"./toAwait":81,"axios":93}],70:[function(require,module,exports){
const axios = require('axios')

module.exports = {
    search: async ({ VALUE, STATE, id, params }) => {

        var local = VALUE[id]
        if (!local) return

        var search = params.search
        
        var { data: { data, message, success } } = await axios.get(`/api/${search.path}`)

        local.search = { data, message, success }

        STATE[search.path] = STATE[search.path] || {}
        STATE[search.path][data['file-name']] = data

        console.log(data, message, success)
    }
}
},{"axios":93}],71:[function(require,module,exports){
const { isArabic } = require("./isArabic")

const setContent = ({ VALUE, STATE, params = {}, id }) => {
    var local = VALUE[id]
    
    var content = params.content || {}
    var value = content.value || ''

    if (typeof value !== 'string' && typeof value !== 'number') return
    
    // not loaded yet
    if (!local.element) return
    if (local.input && local.input.type === 'radio') if (value) local.element.checked = 'checked'
    if (local.type === 'Input' || local.type === 'Textarea') local.element.value = value || ''
    else if (local.type === 'Text' || local.type === 'Label' || local.type === 'Header') local.element.innerHTML = value || ''
    else if (local.type === 'UploadInput') local.element.value = value || null

    isArabic({ VALUE, params: { value }, id })
}

module.exports = {setContent}
},{"./isArabic":54}],72:[function(require,module,exports){
const { clone } = require("./clone")
const { derive } = require("./derive")
const { setContent } = require("./setContent")

const setData = ({ STATE, VALUE, params = {}, id }) => {
    
    var local = VALUE[id]
    if (!STATE[local.Data]) return
    
    var data = params.data
    var path = data.path

    // defualt value
    var defValue = data.value
    if (defValue === undefined) defValue = ''

    // path
    if (path) path = path.split('.')
    else path = []
    
    // convert string numbers paths to num
    path = path.map(k => {
        if (!isNaN(k)) k = parseFloat(k) 
        return k
    })

    // keys
    var derivations = clone(local.derivations)
    var keys = [...derivations, ...path]
    
    // set value
    var value = derive(STATE[local.Data], keys, defValue, true)[0]
    local.data = value
    
    if (local.input && local.input.type === 'file') return

    // setContent
    var content = data.content || value
    
    setContent({ VALUE, params: { content: { value: content } }, id })
}

module.exports = {setData}
},{"./clone":29,"./derive":41,"./setContent":71}],73:[function(require,module,exports){
const setPosition = ({ VALUE, params, id }) => {
    var {position} = params

    var element = (position.positioner && VALUE[position.positioner].element) || VALUE[id].element
    
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
},{}],74:[function(require,module,exports){
const { reducer } = require('./reducer')
const { update } = require('./update')

const sort = ({ VALUE, STATE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    var sort = params.sort || {}
    var Data = sort.Data || local.Data
    var options = STATE[`${Data}-options`]
    var data = STATE[Data]
    
    options.sort = options.sort === 'ascending' ? 'descending' : 'ascending'
    var path = (sort.path || '').split('.')
    
    data.sort((a, b) => {

        a = reducer({ VALUE, STATE, id, params: { path, object: a } })
        if (a !== undefined) a = a.toString()

        b = reducer({ VALUE, STATE, id, params: { path, object: b } })
        if (b !== undefined) b = b.toString()
        
        if (options.sort === 'ascending') {

            if (!isNaN(a)) return b - a

            if (a < b) return -1
            return a > b ? 1 : 0

        } else {

            if (!isNaN(a)) return a - b

            if (b < a) return -1
            return b > a ? 1 : 0
        }
    })

    if (sort.update) update({ VALUE, STATE, id: sort.update })
}

module.exports = {sort}
},{"./reducer":64,"./update":91}],75:[function(require,module,exports){
const autoActions = ['fill']

const starter = ({ STATE, VALUE, id }) => {
    
    const { defaultEventHandler } = require("./event")
    const { setStyle } = require("./style")
    const { controls } = require('./controls')
    const { defaultInputHandler } = require("./defaultInputHandler")
    const { isArabic } = require("./isArabic")

    var local = VALUE[id]
    if (!local) return
    
    local.element = document.getElementById(id)
    if (!local.element) return delete VALUE[id]

    // status
    local.status = 'mounting'
    
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

    // auto actions
    autoActions.map(action => local[action] && require("./_method")[action]({ VALUE, STATE, id }))
    
    // execute controls
    if (local.controls) controls({ VALUE, STATE, id })
    
    // run starter for children
    var children = [...local.element.children]
    
    children.map(child => {

        var id = child.id
        if (!id) return
        starter({ STATE, VALUE, id })
        
    })
}

module.exports = {starter}
},{"./_method":25,"./controls":31,"./defaultInputHandler":40,"./event":45,"./isArabic":54,"./style":77}],76:[function(require,module,exports){
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
},{}],77:[function(require,module,exports){
const {resize} = require('./resize')

const setStyle = ({ VALUE, params = {}, id }) => {

    var local = VALUE[id]
    if (!local) return

    if (!local.style) local.style = {}
    if (!params.style) params.style = {}
    
    Object.entries(params.style).map(([key, value]) => {

        if (key === 'after') return
        var timer = 0
        if (value || value === 0) value = value + ''

        if (value && value.includes('>>')) {
            timer = value.split('>>')[1]
            value = value.split('>>')[0]
        }

        var style = () => {

            // value = width || height
            if (value) {
                if (value === 'width' || value.includes('width/')) {

                    var divide = value.split('/')[1]
                    value = local.element.clientWidth
                    if (divide) value = value / parseFloat(divide)

                    value += 'px'

                } else if (value === 'height' || value.includes('height/')) {

                    var divide = value.split('/')[1]
                    value = local.element.clientHeight
                    if (divide) value = value / parseFloat(divide)

                    value += 'px'

                } else if (key === 'left' && value === 'center') {

                    var width = local.element.offsetWidth
                    var parentWidth = VALUE[local.parent].element.clientWidth

                    value = parentWidth/2 - width/2 + 'px'
                }
            }

            if (local.element) local.element.style[key] = value
            else local.style[key] = value

        }

        if (timer) local[key + '-timer'] = setTimeout(style, timer); else style()
        if (key === 'width') resize({ VALUE, id })
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
},{"./resize":67}],78:[function(require,module,exports){
const textarea = ({ VALUE, id }) => {
    var local = VALUE[id]
    if (!local) return

    /*if (!local.textarea || local.type !== 'Input') return

    var parent = local.templated && VALUE[local.parent]
    local.element.setAttribute("style", "height:" + (local.element.scrollHeight) + "px;overflow-y:hidden;")
    if (parent) parent.element.setAttribute("style", "height:" + (local.element.scrollHeight) + "px")

    const OnInput = (e) => {

        var element = local.element
        var parent = local.templated && VALUE[local.parent]
        
        element.style.height = "auto"
        element.style.height = (element.scrollHeight) + "px"

        parent.element.style.height = "auto"
        parent.element.style.height = (parent.element.scrollHeight) + "px"
    }
    
    local.element.addEventListener("input", OnInput, false)*/
}

module.exports = { textarea }
},{}],79:[function(require,module,exports){
const { isArabic } = require("./isArabic")
const { isEqual } = require("./isEqual")
const { generate } = require("./generate")
const { duplicates } = require("./duplicate")
const { overflow } = require("./overflow")
const { getParam } = require("./getParam")
const { toValue } = require("./toValue")
const { reducer } = require("./reducer")
const { toPath } = require("./toPath")

const toApproval = ({ STATE, VALUE, e, string, params, id }) => {
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
                        approval = toApproval({ VALUE, STATE, e, string: `${condition[0]}=${condition[1][0]}`, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = condition[1][1]
                        value = condition.slice(2).join('=')
                        string = `${key}=${value}`
                        return approval = toApproval({ VALUE, STATE, e, string, id})
                    }

                    // ex: key=value1=value2=value3
                    else {
                        condition[2] = condition.slice(2, condition.length).join('=')
                        
                        // key!=value1!=value2!=value3
                        if (key.slice(-1) === '!') 
                        if (condition[2].slice(-1) === '!') 
                        condition[2] = condition[2].slice(0, -1)
                        
                        approval = toApproval({ VALUE, STATE, e, string: `${key}=${condition[2]}`, id })
                        if (!approval) return

                        // approval is true till now => keep going
                        if (key.slice(-1) === '!') 
                        if (value.slice(-1) === '!') 
                        value = value.slice(0, -1)
                    }
                }


                else if (value) {
                    value = value.split('||')

                    if (value.length === 1) value = value[0]

                    else if (value[1]) {

                        // ex: key1=value1||key2=value2...
                        if (value[1].includes('=')) {
                            
                            var string = `${key}=${value[0]}`
                            approval = toApproval({ VALUE, STATE, e, string, id })
                            if (approval) return

                            string = value.slice(1).join('||')
                            return approval = toApproval({ VALUE, STATE, e, string, id })
                        }

                        // ex: key=value1||value2||value3
                        value[1] = value.slice(1, value.length).join('||')
                        var string = `${key}=${value[1]}`
                        approval = toApproval({ VALUE, STATE, e, string, id })
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
                        approval = toApproval({ VALUE, STATE, e, string, id })
                        if (approval) return

                        // approval isn't true yet => keep trying
                        key = key[0]
                    }
                }

                // operator has !
                if (key.includes('!')) {

                    if (key.split('!')[0]) {

                        key = key.split('!')[0]
                        if (value) notEqual = true

                    } else {
                        // !key => study key without value
                        value = undefined
                        key = key.split('!')[1]
                        notEqual = true
                    }
                    
                }

                ///////////////////// value /////////////////////
                
                if (value) value = toValue({ VALUE, STATE, id: mainId, params: { value }, e })

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    var newId = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toValue({ VALUE, STATE, id, params: { value: newId }, e })
                }

                var keygen = generate()
                var local = VALUE[id]
                if (!local) return approval = false

                // to path
                key = toPath({ VALUE, STATE, id, string: key, e })
                var path = typeof key === 'string' ? key.split('.') : []

                // const
                if (path[0] === 'const') {
                        
                    if (path[1] === 'false' || path[1] === 'undefined' || path[1] === '') local[keygen] = false
                    else local[keygen] = path.slice(1).join('.')
                    
                } else if (key === 'false' || key === 'undefined') local[keygen] = false
                else if (key === 'true') local[keygen] = true
                else if (path[1]) {

                    local[keygen] = reducer({ VALUE, STATE, id, params: { path, value }, e })

                } else if (key === 'isArabic') {

                    var isInput = local.type === 'Input' || local.type === 'Textarea'
                    var result = isArabic(isInput ? local.value : (local.type === 'Text' && local.text))
                    local[keygen] = result

                } else if (key === 'duplicates') {

                    var data = getParam(`?${params}`, 'data=', false)
                    local[keygen] = duplicates({ STATE, VALUE, params: { data }, id })

                } else if (key === 'overflow') {

                    local[keygen] = overflow({ VALUE, id })[0]
                    
                } else local[keygen] = local[key]

                if (plus) value = value + plus
                if (minus) value = value - minus
                if (times) value = value * times
                if (division) value = value / division
                
                if (!local) return approval = false
                
                if (value === undefined) approval = notEqual ? !local[keygen] : local[keygen]
                else {
                    if (value === 'undefined') value = undefined
                    if (value === 'false') value = false
                    if (value === 'true') value = true
                    approval = notEqual ? !isEqual(local[keygen], value) : isEqual(local[keygen], value)
                }

                delete local[keygen]

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

                ///////////////////// value /////////////////////
                
                value = toValue({ VALUE, STATE, id: mainId, params: { value }, e })

                ///////////////////// key /////////////////////

                // id
                if (key.includes('::')) {

                    var newId = key.split('::')[1]
                    key = key.split('::')[0]

                    // id
                    id = toValue({ VALUE, STATE, id, params: { value: newId }, e })
                }

                var local = VALUE[id]
                if (!local) return approval = false

                // to path
                key = toPath({ VALUE, STATE, id, string: key, e })
                var path = typeof key === 'string' ? key.split('.') : []

                if (path[1]) {

                    local[keygen] = reducer({ VALUE, STATE, id, params: { path, value }, e })
                }

                approval = local[keygen] > value
                delete local[keygen]
            }
        } else return approval
    })

    return approval
}

module.exports = {toApproval}
},{"./duplicate":43,"./generate":51,"./getParam":53,"./isArabic":54,"./isEqual":55,"./overflow":60,"./reducer":64,"./toPath":86,"./toValue":90}],80:[function(require,module,exports){
const toArray = (data) => {
    return data !== undefined ? (Array.isArray(data) ? data : [data]) : []
}

module.exports = {toArray}
},{}],81:[function(require,module,exports){
const { clone } = require("./clone")

module.exports = {
    toAwait: ({ VALUE, STATE, id, e, params = {} }) => {
        if (!params.asyncer)  return

        var awaiter = clone(params.awaiter)
        var await = clone(params.await)

        delete params.asyncer
        delete params.awaiter
        delete params.await
        
        const { execute } = require("./execute")
        const { toParam } = require("./toParam")

        if (await && await.length > 0)
        toParam({ VALUE, STATE, id, e, string: await.join(';') })
        
        if (awaiter) execute({ VALUE, STATE, id, e, actions: awaiter, params })
    }
}
},{"./clone":29,"./execute":46,"./toParam":85}],82:[function(require,module,exports){
const { generate } = require("./generate")

const toCode = ({ VALUE, STATE, string, e, id }) => {

    var open = '[', close = ']'
    var keys = string.split(open)

    if (keys.length === 1) return string

    if (keys[1]) {

        var key = `coded()${generate()}`
        var subKey = keys[1].split(close)

        // ex. [ [ [] [] ] ]
        while (subKey[0] === keys[1] && keys[2] !== undefined) {

            keys[1] += `${open}${keys[2]}`
            if (keys[2]) keys[1] = toCode({ VALUE, STATE, string: keys[1], e, id })
            keys.splice(2, 1)
            subKey = keys[1].split(close)
            
        }

        STATE.codes[key] = subKey[0]
        var value = key

        var before = keys[0]
        subKey = subKey.slice(1)
        keys = keys.slice(2)
        var after = keys.join(open) ? `${open}${keys.join(open)}` : ''
        
        string = `${before}${value}${subKey.join(close)}${after}`
    }
    
    if (string.split(open)[1]) string = toCode({ VALUE, STATE, string, e, id })

    // encode round brackets
    // string = toCode({ VALUE, STATE, string, e, id, roundBrackets: true })

    return string
}

module.exports = { toCode }
},{"./generate":51}],83:[function(require,module,exports){
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

    return obj
}

module.exports = {toComponent}
},{"./generate":51,"./toArray":80}],84:[function(require,module,exports){
const { clone } = require("./clone");
const { toValue } = require("./toValue");

const toId = ({ VALUE, STATE, id, string, e }) => {
    if (typeof string === 'object') return string
    
    if (string) string = string.split(';').map(newId => toValue({ VALUE, STATE, id, params: { value: newId }, e })).flat()
    else string = [id]
    
    if (string) string = clone(string)
    return string
}

module.exports = {toId}
},{"./clone":29,"./toValue":90}],85:[function(require,module,exports){
const { toPath } = require("./toPath")
const { toValue } = require("./toValue")
const { reducer } = require("./reducer")
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const controls = require('../control/control')

const toParam = ({ VALUE, STATE, string, e, id }) => {

    const { toApproval } = require("./toApproval")

    var localId = id
    
    if (typeof string !== 'string' || !string) return string || {}
    var params = { await: [] }

    string.split(';').map(param => {

        var key, value, id = localId, local = VALUE[localId]

        if (param.includes('=')) {

            var keys = param.split('=')
            key = keys[0]
            value = param.substring(key.length + 1)
            
        } else {

            key = param

            // !key;
            if (key.includes('!')) {

                if (key.split('!')[0]) key = key.split('!')[0]
                else key = key.split('!')[1]
                value = false
            }
        }

        // await
        if (key.includes('await.')) {
            var awaiter = param.split('await.')[1]
            return params.await.push(awaiter)
        }

        value = toValue({ VALUE, STATE, id, e, params: { value, params } })
        
        // condition not approved
        if (value === '*return*') return
        
        id = localId
        
        var keys = typeof key === 'string' ? key.split('.') : []

        // keys from brackets to dots
        key = toPath({ VALUE, STATE, string: key, e, id })

        // id
        if (key && key.includes('::')) {

            var newId = key.split('::')[1]
            key = key.split('::')[0]

            // id
            id = toValue({ VALUE, STATE, id, params: { value: newId, params }, e })
        }
        
        // conditions
        if (key && key.includes('<<')) {

            var condition = key.split('<<')[1]
            var approved = toApproval({ STATE, VALUE, id, e, string: condition })
            if (!approved) return
            key = key.split('<<')[0]
            
        }

        var path = typeof key === 'string' ? key.split('.') : []
        
        // object structure
        if (path && path.length > 1) {

            // mount state & value
            if (path[0] === 'state' || path[0] === 'value' || path[0] === 'params' || path[0] === 'e' || path[0] === 'action' || path[0] === 'global')
            reducer({ VALUE, STATE, id, params: { path, value, key, params } })

            else path.reduce((obj, key, index) => {

                if (obj[key] !== undefined) {

                    if (index === path.length - 1) {
                        
                        // if key=value exists => mount the existing to local, then mount the new value to params
                        path.reduce((o, k, i) => {
                            if (i === path.length  - 1) return o[k] = value
                            return o[k] || {}
                        }, VALUE[id])

                        return obj[key] = value

                    }

                } else {

                    if (index === path.length - 1) return obj[key] = value
                    else obj[key] = {}

                }

                return obj[key]
            }, params)

            key = path[0]

        } else params[key] = value

            
        // lunch auto controls
        if (controls[key]) {
            
            if (local.status === 'loading') {

                var k = generate()
                STATE[k] = params[key]
                return local.controls = toArray(local.controls).push({
                    event: `load?${key}=state.${k}`
                })
            }
            
            return controls[key]({ VALUE, STATE, id, params: { controls: params[key] }, e })
        }
    })
    
    return params
}

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {toParam}
},{"../control/control":17,"./generate":51,"./reducer":64,"./toApproval":79,"./toArray":80,"./toPath":86,"./toValue":90}],86:[function(require,module,exports){
const toPath = ({ VALUE, STATE, string, e, id }) => {

    const { toValue } = require("./toValue")
    var keys = [], _keys = string.split('[')

    // is array
    if (!_keys[0] || _keys.length === 1) return string

    // key1.[key2].
    _keys.map((k, i) => {
        if (i === 0) keys.push(k)
        else if (keys[i - 1].slice(-1) === '.') {
            keys[i - 1] += `[${k}`
        } else keys.push(k)
    })

    // is array
    if (!keys[0] || keys.length === 1) return string
    
    if (keys[1]) {

        var subKey = keys[1].split(']')

        // ex. [ [ [] [] ] ]
        while (subKey[0] === keys[1] && keys[2] !== undefined) {

            keys[1] += `[${keys[2]}`
            if (keys[2]) keys[1] = toPath({ VALUE, STATE, string: keys[1], e, id })
            keys.splice(2, 1)
            subKey = keys[1].split(']')
            
        }
        
        var value = toValue({ VALUE, STATE, params: { value: subKey[0] }, e, id })

        var before = keys[0]
        subKey = subKey.slice(1)
        keys = keys.slice(2)
        var after = keys.join('[') ? `[${keys.join('[')}` : ''
        
        string = `${before}.${value}${subKey.join(']')}${after}`
        
        // a1,a2,a3 => a1.a2.a3
        string = string.split(',').join('.')
        if (string.includes('..')) string.replace('..', '.')
        if (string.slice(-1) === '.') string = string.slice(0, -1)
    }
    
    if (string.split('[')[1]) string = toPath({ VALUE, STATE, string, e, id })
    
    return string
}

module.exports = { toPath }
},{"./toValue":90}],87:[function(require,module,exports){
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
},{}],88:[function(require,module,exports){
module.exports = {
    toStyle: ({ VALUE, STATE, id }) => {
        var local = VALUE[id]
        var style = ''
        
        if (local.style) {
            Object.entries(local.style).map(([k, v]) => {
                if (k === 'after' || k.includes('>>')) return
                else if (k === 'verticalAlign') k = 'vertical-align'
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
                else if (k === 'alignSelf') k = 'align-self'
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
        }

        return style
    }
}
},{}],89:[function(require,module,exports){
const { toStyle } = require("./toStyle")
const { toArray } = require("./toArray")
const { generate } = require("./generate")
const { clone } = require("./clone")

module.exports = {
    toTag: ({ STATE, VALUE, id }) => {

        const { createElement } = require("./createElement")
        const path = require("path")
        
        var tag, local = VALUE[id]
        var style = toStyle({ STATE, VALUE, id })
        
        // innerHTML
        var text = (typeof local.data !== 'object' && local.data) || local.text || ''
        var innerHTML = text
        var checked = local.input && local.input.type === 'radio' && parseFloat(local.data) === parseFloat(local.input.defaultValue)
        
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

        var value = local.data || (local.input && local.input.value) || ''
        if (local.type === 'Image') local.src = local.src || local.data || ''
        
        if (local.type === 'View')
        tag = `<div class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</div>`
    
        else if (local.type === 'Image')
        tag = `<img class='${local.class}' src='${path.resolve(local.src)}' alt='${local.src}' id='${local.id}' style='${style}'>`
    
        else if (local.type === 'Table')
        tag = `<table class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</table>`
    
        else if (local.type === 'Row')
        tag = `<tr class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</tr>`
    
        else if (local.type === 'Header')
        tag = `<th class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</th>`
    
        else if (local.type === 'Cell')
        tag = `<td class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</td>`
    
        else if (local.type === 'Label')
        tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${local['aria-label'] ? `aria-label="${local['aria-label']}"` : '' } ${local.for ? `for="${local.for}"` : ''}>${innerHTML}</label>`
    
        else if (local.type === 'Span')
        tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`
    
        else if (local.type === 'Text') {
        if (local.label) tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${local['aria-label'] ? `aria-label="${local['aria-label']}"` : '' } ${local.for ? `for="${local.for}"` : ''}>${innerHTML}</label>`
        else if (local.h1) tag = `<h1 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h1>`
        else if (local.h2) tag = `<h2 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h2>`
        else if (local.h3) tag = `<h3 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h3>`
        else if (local.h4) tag = `<h4 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h4>`
        else if (local.h5) tag = `<h5 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h5>`
        else if (local.h6) tag = `<h6 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h6>`
        else if (local.span) tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`
        else tag = `<p class='${local.class}' id='${local.id}' style='${style}'>${text}</p>`
        }

        else if (local.type === 'Icon') 
        tag = `<i class='material-icons${local.outlined ? '-outlined' : local.rounded ? '-round' : local.sharp ? '-sharp' : local.twoTone ? '-two-tone' : ''} ${local.class || ''} ${local.icon.name}' id='${local.id}' style='${style}'>${local.google ? local.icon.name : ''}</i>`
        
        else if (local.type === 'Textarea') 
        tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}' ${local.readonly ? 'readonly' : ''} ${local.maxlength || ''}>${local.data || local.input.value || ''}</textarea>`
        
        else if (local.type === 'Input') {
        if (local.textarea) tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}' ${local.readonly ? 'readonly' : ''} ${local.maxlength || ''}>${local.data || local.input.value || ''}</textarea>`
        else tag = `<input class='${local.class}' id='${local.id}' style='${style}' ${local.input.name ? `name="${local.input.name}"` : ''} ${local.input.accept ? `accept="${local.input.accept}/*"` : ''} type='${local.input.type || 'text'}' ${local.placeholder ? `placeholder="${local.placeholder}"` : ''} ${value ? `value="${value}"` : ''} ${local.readonly ? 'readonly' : ''} ${local.input.min ? `min="${local.input.min}"` : ''} ${local.input.max ? `max="${local.input.max}"` : ''} ${local.input.defaultValue ? `defaultValue="${local.input.defaultValue}"` : ''} ${checked ? "checked" : ''}/>`
        }
        
        else if (local.type === 'Paragraph')
        tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ''}'>${text}</textarea>`
    
        // linkable
        if (local.link) {
            
            var id = generate()
            tag = `<a id=${id} href=${local.link}>${tag}</a>`
            toArray(local.controls).push({
                event: 'click',
                actions: `route?route=${local.link}`
            })
            VALUE[id] = {}
        }
        
        return tag
    }
}
},{"./clone":29,"./createElement":36,"./generate":51,"./toArray":80,"./toStyle":88,"path":2}],90:[function(require,module,exports){
const { toPath } = require("./toPath")
const { generate } = require("./generate")
const { reducer } = require("./reducer")

const toValue = ({ VALUE, STATE, params: { value, params }, id, e }) => {
    
    const { toApproval } = require("./toApproval")

    var local = VALUE[id], minus = [], plus = [], times = [], division = []
    
    // return const value
    if (value && value.split('const.')[1] && !value.split('const.')[0] ) return value.split('const.')[1]
        
    // destructure []
    if (value) value = toPath({ VALUE, STATE, string: value, e, id })
    
    // auto space
    if (value === '&nbsp') value = '&nbsp;'
    
    if (value && value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {

        value = value.slice(1, value.length - 1)
        value = value.split(',').map(value => toValue({ VALUE, STATE, id, e, params: { value, params } }))
        value = value.filter(value => value)
        
    } else {

        // id
        if (value && value.includes('::')) {

            var newId = value.split('::')[1]
            id = toValue({ VALUE, STATE, id, params: { value: newId, params }, e })
            value = value.split('::')[0]

        }

        var local = VALUE[id]
        // if (!local) return value
        
        // value1 || value2 || value3
        if (value && value.includes('||')) {

            var values = value.split('||')
            value = undefined
            
            values.map(val => {
                if (value === undefined || value === '' || value === NaN || value === '*return*') 
                value = toValue({ VALUE, STATE, id, e, params: { value: val, params } })
            })
            
            return value
        }

        // conditions
        if (value && value.includes('<<')) {

            var condition = value.split('<<')[1]
            var approved = toApproval({ STATE, VALUE, id, e, string: condition })
            if (!approved) return '*return*'
            value = value.split('<<')[0]
            
        }

        if (value) {

            minus = value.split('--')
            plus = value.split('++')
            times = value.split('**')
            division = value.split('÷÷') // hold Alt + 0247

            if (plus.length > 1) {

                value = plus[0]
                plus.shift()
                minus.shift()
                times.shift()
                division.shift()
                plus = plus.map(value => toValue({ VALUE, STATE, id, params: { params, value }, e }))
                
            } else if (minus.length > 1) {
                
                value = minus[0]
                plus.shift()
                minus.shift()
                times.shift()
                division.shift()
                minus = minus.map(value => toValue({ VALUE, STATE, id, params: { params, value }, e }))
                
            } else if (times.length > 1) {

                value = times[0]
                plus.shift()
                minus.shift()
                times.shift()
                division.shift()
                times = times.map(value => toValue({ VALUE, STATE, id, params: { params, value }, e }))

            } else if (division.length > 1) {

                value = division[0]
                plus.shift()
                minus.shift()
                times.shift()
                division.shift()
                division = division.map(value => toValue({ VALUE, STATE, id, params: { params, value }, e }))
            
            } else {
                
                plus.shift()
                minus.shift()
                times.shift()
                division.shift()
            }
            
        }
        
        var path = typeof value === 'string' ? value.split('.') : []
        
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
        else if (value === '[{}]') value = [{}]
        else if (value === '[string]') value = ['']
        else if (value.includes('%20')) value = value.split('%20').join(' ')
        else if (value.includes('JSON.parse')) value = JSON.parse(value.split('JSON.parse(')[1].slice(0, -1))
        else if (value.includes('JSON.stringify')) value = JSON.stringify(value.split('JSON.stringify(')[1].slice(0, -1))
        else if (path[1]) value = reducer({ VALUE, STATE, id, params: { path, value, params }, e })

        if (plus.length > 0) {
            plus.map(plus => value += plus)
            
        } else if (minus.length > 0) {
            minus.map(minus => value -= minus)

        } else if (times.length > 0) {
            times.map(times => value *= times)

        } else if (division.length > 0) {
            division.map(division => division /= plus)
        }

    }
    
    return value
}

module.exports = { toValue }
},{"./generate":51,"./reducer":64,"./toApproval":79,"./toPath":86}],91:[function(require,module,exports){
const { generate } = require("./generate")
const { starter } = require("./starter")
const { toArray } = require("./toArray")
const { createElement } = require("./createElement")
const { clone } = require("./clone")

const update = ({ STATE, VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return
    if (!local.element) return
    
    //VALUE.body.element.style.pointerEvents = 'none'

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

        //VALUE.body.element.style.pointerEvents = 'auto'
        
    }, 25)
}

const removeIds = ({ VALUE, id }) => {

    var local = VALUE[id]
    if (!local.element) return
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
},{"./clone":29,"./createElement":36,"./generate":51,"./starter":75,"./toArray":80}],92:[function(require,module,exports){
const { generate } = require("./generate")
const { toApproval } = require("./toApproval")
const { isEqual } = require("./isEqual")
const { clone } = require("./clone")
const { toParam } = require("./toParam")
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
    var approved = toApproval({ VALUE, STATE, string: conditions, id })
    if (!approved) return

    names.map(name => {

        // params
        var params = watch.split('?')[1]
        if (params) params = toParam({ VALUE, STATE, string: params, id })
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

                value = toParam({ VALUE, STATE, string: `${key}=${name}`, id })[key]

                if (value !== undefined && !isEqual(value, local[`${name}-watch`])) {

                    if (value.nodeType === Node.ELEMENT_NODE) local[`${name}-watch`] = value
                    else local[`${name}-watch`] = clone(value)

                    if (name.split('.')[1] === 'data') setData({ VALUE, STATE, params: { data: { value } }, id })
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
},{"./clone":29,"./data":39,"./execute":46,"./generate":51,"./isEqual":55,"./toApproval":79,"./toParam":85}],93:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":95}],94:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/buildFullPath":101,"../core/createError":102,"./../core/settle":106,"./../helpers/buildURL":110,"./../helpers/cookies":112,"./../helpers/isURLSameOrigin":115,"./../helpers/parseHeaders":117,"./../utils":119}],95:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":96,"./cancel/CancelToken":97,"./cancel/isCancel":98,"./core/Axios":99,"./core/mergeConfig":105,"./defaults":108,"./helpers/bind":109,"./helpers/isAxiosError":114,"./helpers/spread":118,"./utils":119}],96:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],97:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":96}],98:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],99:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":110,"./../utils":119,"./InterceptorManager":100,"./dispatchRequest":103,"./mergeConfig":105}],100:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":119}],101:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":111,"../helpers/isAbsoluteURL":113}],102:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":104}],103:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":98,"../defaults":108,"./../utils":119,"./transformData":107}],104:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],105:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":119}],106:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":102}],107:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":119}],108:[function(require,module,exports){
(function (process){(function (){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this)}).call(this,require('_process'))
},{"./adapters/http":94,"./adapters/xhr":94,"./helpers/normalizeHeaderName":116,"./utils":119,"_process":3}],109:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],110:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":119}],111:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],112:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":119}],113:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],114:[function(require,module,exports){
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],115:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":119}],116:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":119}],117:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":119}],118:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],119:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":109}]},{},[4]);
