(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],3:[function(require,module,exports){
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
},{"_process":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
// browserify browser.js > index.js
const {starter} = require("../method/starter")
const {setElement} = require("../method/setElement")

const VALUE = JSON.parse(document.getElementById("VALUE").textContent)
const STATE = JSON.parse(document.getElementById("STATE").textContent)
const _firebase = firebase.initializeApp(STATE.config)

VALUE.body.element = document.body
VALUE.window = {element: window}
VALUE.root.element = root

STATE.db = _firebase.firestore()
STATE.storage = _firebase.storage().ref()
var cookies = document.cookie.split("authentication=")
if (cookies[1]) STATE.admin = JSON.parse(cookies[1].split(";")[0])

if (!window.location.href.includes("localhost") && `/app${STATE.pathname}` !== window.location.pathname)
history.pushState(null, STATE.page[STATE.host].title, `/app${STATE.pathname}`)

setElement({ VALUE, STATE, id: "public" })
starter({ VALUE, STATE, id: "public" })

setElement({ VALUE, STATE, id: "root" })
starter({ VALUE, STATE, id: "root" })
},{"../method/setElement":79,"../method/starter":82}],6:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");

const Button = (component) => {
  component.icon = component.icon || {};
  component = toComponent(component);
  var { style, icon, controls, text, id } = component;

  return {
    ...component,
    type: "View?class=flex-box;touchableOpacity",
    style: {
      border: "1px solid #e0e0e0",
      borderRadius: ".75rem",
      padding: "0.75rem 1rem",
      margin: "0 0.4rem",
      cursor: "pointer",
      transition: "border 0.1s",
      ...style,
      after: {
        border: "1px solid #0d6efd",
        ...style.after,
      },
    },
    children: [
      {
        type: `Icon?id=${id}-icon?const.${icon}`,
        icon,
        style: {
          color: style.color || "#444",
          fontSize: style.fontSize || "1.4rem",
          margin: "0 0.4rem",
          transition: "color 0.1s",
          display: "flex",
          alignItems: "center",
          ...(icon.style || {}),
          after: {
            color: "#0d6efd",
            ...((icon.style && icon.style.after) || {}),
          },
        },
      },
      {
        type: `Text?id=${id}-text?const.${text}`,
        text,
        style: {
          color: style.color || "#444",
          fontSize: style.fontSize || "1.4rem",
          margin: "0 0.4rem",
          transition: "color 0.1s",
          after: {
            color: style.after.color || "#0d6efd",
          }
        }
      }
    ],
    controls: [
      ...controls,
      {
        event: "mouseenter",
        actions: `mountAfterStyles???${id};${id}-text;${id}-icon`,
      },
      {
        event: "mouseleave",
        actions: `resetStyles???${id};${id}-text;${id}-icon`,
      }
    ]
  }
}

module.exports = { Button };

},{"../method/toComponent":91}],7:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");
const { generate } = require("../method/generate");

const Checkbox = (component) => {
  component = toComponent(component);
  var { model, controls } = component;

  var id = component.id || generate();

  if (model === "featured") return {};

  if (model === "classic")
    return {
      ...component,
      type: "Label?class=checkbox",
      controls: {},
      children: [
        {
          type: `Input?id=${id}-input;input.type=checkbox`,
          controls,
          templated: true,
        },
        {
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
                        </svg>`,
        },
      ],
    };
};

module.exports = { Checkbox };

},{"../method/generate":55,"../method/toComponent":91}],8:[function(require,module,exports){
const { generate } = require("../method/generate");
const { toComponent } = require("../method/toComponent");

const Header = (component) => {
  if (component.templated) return component;

  component = toComponent(component);
  var { text, style, sort, path, model } = component;
  var id = component.id || generate();

  if (model === "classic") return component;
  else if (model === "featured")
    return {
      ...component,
      type: "Header",
      id,
      style: {
        display: "flex",
        ...style,
      },
      children: [
        {
          type: "View?class=flex-box;style.position=relative;style.flexDirection=column",
          children: [
            {
              type: `Text?text=${text};id=${id}-text`,
              style: {
                width: "fit-content",
                fontSize: style.fontSize || "1.4rem",
                cursor: "pointer",
              },
              controls: [
                {
                  event: "click",
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
                  ],
                },
              ],
            },
            {
              type: `View?id=${id}-caret;style.display=none;style.cursor=pointer?const.${path}`,
              children: [
                {
                  type: `Icon?id=${id}-caret-up;style.position=absolute;style.top=-1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=bi-caret-up-fill`,
                },
                {
                  type: `Icon?id=${id}-caret-down;style.position=absolute;style.bottom=-1.1rem;style.left=calc(50% - 1rem);style.width=2rem;icon.name=bi-caret-down-fill`,
                },
              ],
            },
          ],
        },
      ],
    };
};

module.exports = { Header };

},{"../method/generate":55,"../method/toComponent":91}],9:[function(require,module,exports){
const { toComponent } = require('../method/toComponent')

const Input = (component) => {

    if (component.templated) return component

    // icon
    component.icon = component.icon || {}
    
    // input
    component.input = component.input || { type: 'text'}
    component.input.type = component.input.type || 'text'
    component.input.style = component.input.style || {}
    
    component = toComponent(component)
    var { id, input, model, droplist, readonly, style, controls, icon, duplicated,
        placeholder, textarea, filterable, clearable, removable, msg, day, disabled,
        duplicatable, lang, unit, currency, google, key, note, edit, minlength 
    } = component

    if (duplicatable && typeof duplicatable !== "object") duplicatable = {}
    if (clearable && typeof clearable !== "object") clearable = {}
    readonly = readonly ? true : false
    removable = removable !== undefined ? (removable === false ? false : true) : false
    if (duplicatable) removable = true
    
    if (minlength === undefined) minlength = 1
    
    // upload input styles
    var uploadInputStyle = input.type === 'file'
    ? {
        position: 'absolute',
        left: '0',
        top: '0',
        opacity: '0',
        cursor: 'pointer',
    } : {}
    
    var path = `${unit ? `path=amount` :  currency ? `path=${currency}` : day ? `path=${day}` : lang ? `path=${lang}` : google ? `path=name` : key ? `path=${key}` : ''}`
    
    if (model === 'classic') {
        return {
            ...component,
            touchableOpacity: true,
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
            touchableOpacity: true,
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
                    maxWidth: '95%',
                }
            }, {
                type: `Input?id=${id}-input;${path}`,
                input,
                currency, 
                day,
                unit,
                key,
                lang,
                google,
                textarea,
                readonly,
                droplist,
                filterable,
                placeholder,
                duplicated,
                disabled,
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
                    event: `keyup??value.data();e.key=Enter;const.${duplicatable}`,
                    actions: `duplicate::${id}?${duplicatable && duplicatable.path ? `duplicate.path=${duplicatable.path}` : ''}`
                }, {
                    event: `input?value.element.value=''?value.data()=free`,
                }]
            }, {
                type: `View?class=flex-box;style.alignSelf=flex-start;style.minWidth=fit-content;style.height=${style.height || '4rem'}`,
                children: [{
                    type: `Icon?icon.name=bi-caret-down-fill;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem?droplist::${id}-input`
                }, {
                    type: `Icon?class=pointer;icon.name=filter_none;icon.google;icon.outlined;style.color=#444;style.fontSize=1.2rem;style.width=1rem;style.marginRight=.5rem;hoverable;style.after.color=#116dff?const.${duplicatable}`,
                    controls: {
                        event: `click??value.data()::${id}-input;const.${duplicatable}`,
                        actions: `duplicate::${id}?${duplicatable && duplicatable.path ? `duplicate.path=${duplicatable.path}` : "" }`
                    }
                }, {
                    type: `Text?text=${note};style.color=#666;style.fontSize=1.3rem;style.padding=.5rem?const.${note}`
                }, {
                    type: `Text?id=${id}-key;key=${key};text=${key};droplist.items<<!${readonly}=const.[any.Enter a special key:._param.readonly,any.${key}._param.input];hoverable;duplicated=${duplicated}?const.${key}`,
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
                    type: `Text?id=${id}-currency;currency=${currency};text=${currency};droplist.items<<!${readonly}=const.[any.Currencies._param.readonly,state.asset.findByName().Currency.options.map().name].flat();hoverable;duplicated=${duplicated}?const.${currency}`,
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
                    type: `Text?path=unit;id=${id}-unit;droplist.items<<!${readonly}=const.[any.Units._param.readonly,state.asset.findByName().Unit.options.map().name].flat();hoverable?const.${unit}`,
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
                    type: `Text?id=${id}-day;day=${day || 'day'};text=${day};droplist.items<<!${readonly}=const.[any.Days of Week._param.readonly,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday];droplist.day;hoverable;duplicated=${duplicated}?const.${day}`,
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
                    type: `Text?id=${id}-language;lang=${lang};text=${lang};droplist.items<<!${readonly}=const.[any.Languages._param.readonly,state.asset.findByName().Language.options.map().name].flat();droplist.lang;hoverable;duplicated=${duplicated}?const.${lang}`,
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
                        event: `change;loaded?value.element.style.display::${id}-more=none<<!e.target.checked;value.element.style.display::${id}-more=flex<<e.target.checked`
                    }]
                }, {
                    type: `Icon?id=${id}-more;icon.name=more_vert;google;outlined;path=type;style.width=1.5rem;style.display=none;style.color=#666;style.cursor=pointer;style.fontSize=2rem;state.google-items=[any.Icon type._param.readonly,outlined,rounded,sharp,twoTone];droplist.items=const.[any.Enter google icon type._param.readonly,state.google-items];hoverable?const.${google}`,
                }, {
                    type: `Icon?class=align-center;icon.name=bi-x;id=${id}-x;hoverable?const.${clearable}||${removable}`,
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
                            `remove::${id}??${removable};value.length::${id}>${minlength};${clearable ? `!value.data()::${id}-input` : ''}`,
                            // clear data
                            `clearData;focus;resize?${clearable && clearable.path ? `clear.path=${clearable.path}` : ''}?const.${clearable}?${id}-input`,
                            // for key
                            `focus::${id}-input?value.element.value::${id}-input='';value.element.innerHTML::${edit}-key=value.key::${edit}-key;value.path::${edit}-input=value.key::${edit}-key;value.derivations::${edit}-input=[value.derivations::${edit},value.key::${edit}-key];value.Data().[value.derivations::${edit}-input]=value.element.value::${edit}-input?const.${edit}`
                        ]
                    }]
                }]
            }]
        }
    }
}

module.exports = {Input}
},{"../method/toComponent":91}],10:[function(require,module,exports){
const { generate } = require("../method/generate")
const { toComponent } = require("../method/toComponent")

const Item = (component) => {

  component.icon = component.icon || {}
  component.icon.style = component.icon.style || {}
  component.icon.style.after = component.icon.style.after || {}

  component.title = component.title || {}
  component.text.style = component.text.style || {}
  component.text.style.after = component.text.style.after || {}

  component.chevron = component.chevron || {}
  component.chevron.style = component.chevron.style || {}
  component.chevron.style.after = component.chevron.style.after || {}
  component = toComponent(component)

  var {
    id,
    model,
    state,
    style,
    icon,
    text,
    tooltip,
    chevron,
    controls,
    readonly,
    borderMarker,
  } = component

  borderMarker = borderMarker !== undefined ? borderMarker : true
  readonly = readonly !== undefined ? readonly : false

  if (model === "featured")
    return {
      ...component,
      class: "flex-box item",
      component: "Item",
      type: `View?touchableOpacity;hoverable.id=[${id},${id}-icon,${id}-text,${id}-chevron];hoverable.mountonload`,
      tooltip,
      style: {
        position: "relative",
        justifyContent: "flex-start",
        width: "100%",
        height: "4rem",
        cursor: "pointer",
        pointerEvents: "fill",
        marginRight: "1px",
        marginLeft: "1px",
        marginBottom: "1px",
        borderRadius: "0.45rem",
        ...style,
        after: {
          border: "1px solid #ee384e",
          marginRight: "0",
          marginLeft: "0",
          marginBottom: "1px",
          ...style.after,
        }
      },
      children: [{
        type: `Icon?id=${id}-icon?const.${icon.name}`,
        icon,
        style: {
          width: "4rem",
          color: style.color || "#444",
          fontSize: "1.8rem",
          ...icon.style,
          after: {
            color: style.after.color || "#ee384e",
            ...icon.style.after,
          }
        }
      }, {
        type: `Text?text=const.${text.text};id=${id}-text`,
        text,
        style: {
          fontSize: style.fontSize || "1.4rem",
          color: style.color || "#444",
          userSelect: "none",
          ...text.style,
          after: {
            color: style.after.color || "#ee384e",
            ...text.style.after,
          }
        }
      }, {
        type: `Icon?icon.name=chevron-right;icon.code=fas;id=${id}-chevron`,
        style: {
          display: "flex",
          position: "absolute",
          right: "1.2rem",
          fontSize: style.fontSize || "1.3rem",
          color: style.color || "#666",
          transition: "0.2s",
          ...chevron.style,
          after: {
            right: "0.8rem",
            color: "#ee384e",
            ...chevron.style.after,
          }
        }
      }],
      controls: [
      ...controls,
      {
        event: `loaded?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron]?mountonload`,
        actions: `mountAfterStyles::state.${state}`,
      }, {
        event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
        actions: [
          `resetStyles?value.mountonload::state.${state}.0=false??state.${state}`,
          `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text,${id}-chevron];value.mountonload::state.${state}.0??state.${state}`,
        ]
      }]
    }

  if (model === "classic")
    return {
      ...component,
      class: "flex-box item",
      component: "Item",
      type: `View?touchableOpacity;hoverable.id=[${id},${id}-icon,${id}-text];hoverable.mountonload`,
      tooltip,
      style: {
        position: "relative",
        justifyContent: "flex-start",
        width: "100%",
        minHeight: "3.3rem",
        cursor: !readonly ? "pointer" : "initial",
        marginBottom: "1px",
        borderRadius: "0.5rem",
        padding: "0.9rem",
        borderBottom: !readonly ? "initial" : "1px solid #eee",
        pointerEvents: "fill",
        ...style,
        after: readonly
          ? {}
          : {
              backgroundColor: "#eee",
              ...style.after,
            }
      },
      children: [{
        icon,
        type: `Icon?id=${id}-icon?const.${icon.name}`,
        style: {
          display: icon ? "flex" : "none",
          color: !readonly ? style.color || "#444" : "#333",
          fontSize: !readonly ? style.fontSize || "1.4rem" : "1.6rem",
          fontWeight: !readonly ? "initial" : "bolder",
          marginRight: "1rem",
          ...icon.style,
          after: {
            color: "#444",
            ...icon.style.after,
          }
        }
      }, {
        type: `Text?text=const.${text.text};id=${id}-text;`,
        style: {
          fontSize: style.fontSize || "1.4rem",
          color: !readonly ? style.color || "#444" : "#333",
          fontWeight: !readonly ? "initial" : "bolder",
          userSelect: "none",
          textAlign: "left",
          ...text.style,
          after: {
            color: style.after.color || style.color || "#444",
            ...text.style.after
          }
        }
      }],
      controls: [
      ...controls,
      {
        event: `loaded?state.${state}=[${id},${id}-icon,${id}-text]?mountonload`,
        actions: `mountAfterStyles::state.${state}`,
      }, {
        event: `click??state.${state}=undefined||state.${state}.0!=${id}`,
        actions: [
          `resetStyles?value.mountonload::state.${state}.0=false??state.${state}`,
          `mountAfterStyles?state.${state}=[${id},${id}-icon,${id}-text];value.mountonload::state.${state}.0??state.${state}`,
        ]
      }]
    }
}

module.exports = { Item }

},{"../method/generate":55,"../method/toComponent":91}],11:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");

const List = (component) => {
  component = toComponent(component);
  var { id, model, style, children, controls, passToChildren } = component;

  component.placement = component.placement || "";
  component.distance = component.distance || "15";

  if (model === "classic")
    return {
      ...component,
      passToChildren: "",
      class: `box-shadow list flex-box`,
      type: "View",
      style: {
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
        position: "fixed",
        opacity: "0",
        transform: "translateY(-100%)",
        transition: "transform 0.2s, opacity 0.1s, top 0.1s",
        minWidth: "18rem",
        pointerEvents: "none",
        zIndex: "-1",
        ...style,
        after: {
          opacity: "1",
          pointerEvents: "auto",
          transform: "translateY(0)",
          zIndex: "999",
        },
      },
      children: [{
          type: "View",
          class: "list-wrap",
          style: {
            height: "100%",
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            zIndex: "1",
          },
          passToChildren,
          children,
        }, {
          class: "box-shadow fin",
          type: "Text",
          style: {
            position: "absolute",
            backgroundColor: "#fff",
            width: "1rem",
            height: "1rem",
            transform: "rotate(45deg)",
            borderRadius: "0 0 0 0.4rem",
            transition: "top 0.1s",
            zIndex: "0",
          },
        },
      ],
      controls: [
        ...controls,
        {
          event: "mouseleave",
          actions: `resetStyles>>200??!mouseenter;!state.${id}-mouseenter`,
        },
      ],
    };
};

module.exports = { List };

},{"../method/toComponent":91}],12:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");
const { generate } = require("../method/generate");

const Rate = (component) => {
  component = toComponent(component);
  var { model, controls } = component;

  var id = component.id || generate();
  var id00 = generate();
  var id05 = generate();
  var id10 = generate();
  var id15 = generate();
  var id20 = generate();
  var id25 = generate();
  var id30 = generate();
  var id35 = generate();
  var id40 = generate();
  var id45 = generate();
  var id50 = generate();

  if (model === "classic")
    return {
      ...component,
      type: "View?class=half-stars",
      children: [
        {
          type: "View?class=rating-group",
          children: [
            {
              type: `Input?id=${id00};class=rating__input rating__input-none;input.defaultValue=0;input.type=radio;checked;input.name=rating`,
            },
            // 0.5 star
            {
              type: `Label?aria-label=0.5 stars;class=rating__label rating__label-half;for=${id05}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id05};class=rating__input;input.defaultValue=0.5;input.type=radio;input.name=rating`,
            },
            // 1 star
            {
              type: `Label?aria-label=1 stars;class=rating__label;for=${id10}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id10};class=rating__input;input.defaultValue=1;input.type=radio;input.name=rating`,
            },
            // 1.5 star
            {
              type: `Label?aria-label=1.5 stars;class=rating__label rating__label-half;for=${id15}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id15};class=rating__input;input.defaultValue=1.5;input.type=radio;input.name=rating`,
            },
            // 2 star
            {
              type: `Label?aria-label=2 stars;class=rating__label;for=${id20}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id20};class=rating__input;input.defaultValue=2;input.type=radio;input.name=rating`,
            },
            // 2.5 star
            {
              type: `Label?aria-label=2.5 stars;class=rating__label rating__label-half;for=${id25}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id25};class=rating__input;input.defaultValue=2.5;input.type=radio;input.name=rating`,
            },
            // 3 star
            {
              type: `Label?aria-label=3 stars;class=rating__label;for=${id30}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id30};class=rating__input;input.defaultValue=3;input.type=radio;input.name=rating`,
            },
            // 3.5 star
            {
              type: `Label?aria-label=3.5 stars;class=rating__label rating__label-half;for=${id35}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id35};class=rating__input;input.defaultValue=3.5;input.type=radio;input.name=rating`,
            },
            // 4 star
            {
              type: `Label?aria-label=4 stars;class=rating__label;for=${id40}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id40};class=rating__input;input.defaultValue=4;input.type=radio;input.name=rating`,
            },
            // 4.5 star
            {
              type: `Label?aria-label=4.5 stars;class=rating__label rating__label-half;for=${id45}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star-half;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id45};class=rating__input;input.defaultValue=4.5;input.type=radio;input.name=rating`,
            },
            // 5 star
            {
              type: `Label?aria-label=5 stars;class=rating__label;for=${id50}`,
              children: [
                {
                  type: `Icon?class=rating__icon rating__icon-star;icon.name=fa fa-star;style.fontSize=2rem`,
                },
              ],
            },
            {
              type: `Input?id=${id50};class=rating__input;input.defaultValue=5;input.type=radio;input.name=rating`,
            },
          ],
        },
      ],
    };
};

module.exports = { Rate };

},{"../method/generate":55,"../method/toComponent":91}],13:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");

const SearchBox = (component) => {
  component = toComponent(component);
  var { placeholder } = component;

  return {
    ...component,
    "type": "View?style.flex=1;style.margin=0 1rem;style.height=4.5rem",
    "children": [{
        "type": "View?class=overlay;id=search-mini-page-overlay;style.zIndex=-1;style.transition=.2s;style.display=none;style.after.opacity=1>>50;style.after.display=flex;style.after.zIndex=1",
        "controls": {
            "event": "click",
            "actions": "resetStyles::search-mini-page;resetStyles::search-mini-page-results;setStyle?style.opacity=0;style.display=none>>250"
        }
    }, {
        "type": "View?id=search-mini-page;style.display=flex;style.flexDirection=column;style.backgroundColor=#f0f0f0;style.borderRadius=.75rem;style.flex=1;style.top=1rem;style.position=initial>>200;style.width=60rem;style.after.backgroundColor=#fff;style.after.boxShadow=0 0 6px rgba(33, 33, 33, 0.431);style.after.position=absolute;style.after.zIndex=2",
        "children": [{
            "type": "View?class=flex-start;style.flex=1;style.borderRadius=.75rem;style.height=4.5rem",
            "children": [{
                "type": "Icon?icon.name=bi-search;style.margin=0 1rem;style.color=#888;style.fontSize=1.8rem"
            }, {
                "type": "Input?placeholder=Search for booking, provider, service, category...;style.flex=1;style.height=4.5rem;style.backgroundColor=inherit;style.border=0;style.color=#444;style.fontSize=1.5rem;style.outline=none",
                "controls": [{
                    "event": "focusin",
                    "actions": "mountAfterStyles???search-mini-page-overlay;search-mini-page;search-mini-page-results"
                }, {
                    "event": "input",
                    "actions": "async.search?search.path=path;search."
                }]
            }]
        }, {
            "type": "View?id=search-mini-page-results;style.width=100%;style.padding=0 1rem;style.transition=.2s;style.height=0;style.opacity=0;style.after.opacity=1;style.after.height=15rem>>25",
            "children": {
                "type": "Text?class=divider;style.margin=0"
            }
        }]
    }]
  }
};

module.exports = { SearchBox };

},{"../method/toComponent":91}],14:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");

const Switch = (component) => {
  component = toComponent(component);

  return {
    ...component,
    type: "View",
    class: "button-13",
    controls: {},
    children: [
      {
        type: `Input?input.type=checkbox;class=switch-checkbox`,
        controls: [...component.controls],
      },
      {
        type: "View?class=knobs",
        children: {
          type: "Text?span",
        },
      },
    ],
  };
};

module.exports = { Switch };

},{"../method/toComponent":91}],15:[function(require,module,exports){
const { toComponent } = require("../method/toComponent");

const Upload = (component) => {
  component = toComponent(component);
  var { upload } = component;

  upload.multiple = upload.multiple !== undefined ? upload.multiple : true;

  return {
    ...component,
    type: "View",
    class: `file-drop-area ${component.class || ""}`,
    children: [
      {
        type: `Icon?icon.name=${
          upload.type === "image"
            ? "bi-images"
            : upload.type === "video"
            ? "bi-camera-video"
            : ""
        }`,
        style: {
          fontSize: "2.5rem",
          color: "#444",
          marginRight: "1rem",
        },
      },
      {
        type: `Text?class=file-msg;text=or drag and drop ${upload.type}s here`,
      },
      {
        type: `Input?class=file-input;upload.type=${upload.type};upload.multiple=${upload.multiple};upload.accept=${upload.accept};style.height=100%`,
      },
    ],
  };
};

module.exports = { Upload };

},{"../method/toComponent":91}],16:[function(require,module,exports){
const {Button} = require("./Button");
const {Input} = require("./Input");
const {Item} = require("./Item");
const {List} = require("./List");
const {Upload} = require("./Upload");
const {Header} = require("./Header");
const {Switch} = require("./Switch");
const {SearchBox} = require("./SearchBox");
const {Checkbox} = require("./Checkbox");
const {Rate} = require("./Rate");

module.exports = {
  Input,
  Button,
  Item,
  List,
  Upload,
  Header,
  Switch,
  SearchBox,
  Checkbox,
  Rate,
};

},{"./Button":6,"./Checkbox":7,"./Header":8,"./Input":9,"./Item":10,"./List":11,"./Rate":12,"./SearchBox":13,"./Switch":14,"./Upload":15}],17:[function(require,module,exports){
const {generate} = require("../method/generate");

module.exports = ({ params = {}, id }) => {
  const controls = params.controls
  const state = generate()

  return [{
    event: "click",
    actions: [
      `setState?state.actionlist-mouseenter;state.${state}=value.data();value.Data::actionlist=${state};value.data::actionlist=value.data()`,
      `setPosition::actionlist?position.positioner=${id};position.placement=${controls.placement || "bottom"};position.distance=${controls.distance}`,
      "mountAfterStyles;update???actionlist",
    ]
  }, {
    event: "mouseleave",
    actions: [
      "setState?state.actionlist-mouseenter=false",
      "resetStyles>>200::actionlist??!mouseenter;!mouseenter::actionlist;!state.actionlist-mouseenter",
    ]
  }]
}

},{"../method/generate":55}],18:[function(require,module,exports){
module.exports = {
  item: require("./item"),
  list: require("./list"),
  popup: require("./popup"),
  droplist: require("./droplist"),
  actionlist: require("./actionlist"),
  hoverable: require("./hoverable"),
  sorter: require("./sorter"),
  miniWindow: require("./miniWindow"),
  toggler: require("./toggler"),
  touchableOpacity: require("./touchableOpacity"),
  pricable: require("./pricable"),
};

},{"./actionlist":17,"./droplist":19,"./hoverable":20,"./item":21,"./list":22,"./miniWindow":23,"./popup":24,"./pricable":25,"./sorter":26,"./toggler":27,"./touchableOpacity":28}],19:[function(require,module,exports){
const {toString} = require("../method/toString")

module.exports = ({params, id}) => {
  var controls = params.controls
  var styles = toString({ style: { minWidth: '15rem', ...controls.style } })
  
  return [{
    event: `click?state.droplist=${controls.id || id}`,
    actions: [
      `resetStyles::droplist?break?value.element.style.opacity::droplist=1;positioner::droplist=${id}`,
      `resetStyles::droplist;droplist::${controls.id || id}?path=${controls.path || ""}`,
      `setStyle::droplist?${styles}`,
      `setPosition::droplist;mountAfterStyles::droplist?position.positioner=${controls.positioner || id};position.placement=${controls.placement || "bottom"};position.distance=${controls.distance}`
    ]
  }]
}

},{"../method/toString":99}],20:[function(require,module,exports){
const {toArray} = require("../method/toArray")

module.exports = ({VALUE, id, params = {}}) => {
  const controls = typeof params.controls === "object" ? params.controls : {}
  controls.id = toArray(controls.id || id)

  return [{
      event: "mouseenter",
      actions: `mountAfterStyles::[${controls.id}]`,
    }, {
      event: "mouseleave",
      actions: `resetStyles::[${controls.id}]??${
        controls.mountonload ? "!mountonload" : true
      }`,
    }]
}

},{"../method/toArray":87}],21:[function(require,module,exports){
module.exports = ({params}) => [
  "setData?data.value=value.text",
  `resetStyles?value.mountonload::state.${params.state}.0=false??state.${params.state}`,
  `setState?state.${params.state}=[${params.id || "value.id"},${
    params.id || "value.id"
  }++-icon,${params.id || "value.id"}++-text,${
    params.id || "value.id"
  }++-chevron]`,
  `mountAfterStyles?value.mountonload::state.${params.state}.0??state.${params.state}`,
];

},{}],22:[function(require,module,exports){
module.exports = ({ VALUE, STATE, params, id }) => {
  const controls = params.controls;

  return [{
    event: "click",
    actions: [
      `setState?state.${controls.id}-mouseenter`,
      `mountAfterStyles::${controls.id}`,
      `setPosition?position.positioner=${controls.id};position.placement=${controls.placement || "right"};position.distance=${controls.distance || "15"}`,
    ],
  }, {
    event: "mouseleave",
    actions: [
      `resetStyles>>200::${controls.id}??!mouseenter;!mouseenter::${controls.id};!state.${controls.id}-mouseenter`,
      `setState?state.${controls.id}-mouseenter=false`,
    ]
  }]
}

},{}],23:[function(require,module,exports){
const {generate} = require("../method/generate");

module.exports = ({ VALUE, STATE, params, id }) => {
  const controls = params.controls;
  const state = generate();

  return [
    {
      event: "click",
      actions: [
        `createView::mini-window-view?state.${state}=${controls.Data ? STATE[controls.Data] : 'value.data()'};value.Data.delete()::mini-window-view;value.Data::mini-window-view=${state}<<value.data();view=${controls.view}`,
        "setStyle::mini-window?style.display=flex;style.opacity=1>>25",
      ],
    },
  ];
};

},{"../method/generate":55}],24:[function(require,module,exports){
const {generate} = require("../method/generate");

module.exports = ({STATE, params, id}) => {
  const controls = params.controls;
  const state = generate();
  STATE[state] = controls.style;

  return [
    {
      event: `click?state.popup=${controls.id || id}`,
      actions: [
        `resetStyles::popup?break?value.element.style.opacity::popup=1;positioner::popup=${id}`,
        `resetStyles::popup;popup::${controls.id || id}?path=${controls.path || ""}`,
        `setPosition::popup;mountAfterStyles::popup?position.positioner=${controls.positioner || id};position.placement=${controls.placement || "left"};position.distance=${controls.distance}`,
        `setStyle::popup?style=state.${state}?${controls.style}`,
      ],
    },
  ];
};

},{"../method/generate":55}],25:[function(require,module,exports){
module.exports = ({ VALUE, id }) => {
    var input_id = VALUE[id].type === 'Input' ? id : `${id}-input`
    return [{
        "event": `input::${input_id}?value.data()::${input_id}=value.element.value.toPrice()::${input_id};value.element.value::${input_id}=value.data()::${input_id}`
    }]
}
},{}],26:[function(require,module,exports){
const {toArray} = require("../method/toArray");

module.exports = ({VALUE, id, params = {}}) => {
  var controls = typeof params.controls === "object" ? params.controls : {};
  controls.id = toArray(controls.id || id);

  return [
    {
      event: "click",
      actions: `await.update::${controls.id};async.sort?sort.path=${controls.path};sort.Data=${controls.Data}?state.${controls.Data}`
    },
  ];
};

},{"../method/toArray":87}],27:[function(require,module,exports){
module.exports = ({ VALUE, params = {}, id }) => {
  const controls = params.controls;

  return [{
    event: `click??value.view::${controls.id}!=${controls.view}`,
    actions: [
      `setStyle::${controls.id}?value.element.style.transition::${controls.id}=transform .2s, opacity .05s;style.transform=translateY(-150%);style.opacity=0`,
      `setStyle>>400::${controls.id}?style.transform=translateY(0);style.opacity=1`,
      `createView>>250::${controls.id}?value.element.innerHTML::${controls.id}='';value.Data::${controls.id}=value.data();view=${controls.view}`,
    ]
  }]
}

},{}],28:[function(require,module,exports){
module.exports = ({VALUE, id, params = {}}) => {

  if (VALUE[id].element.style.transition) {
    VALUE[id].element.style.transition += ", opacity .2s";
  } else VALUE[id].element.style.transition = "opacity .2s";

  return [
    {
      event: `mousedown?global.body.element.addClass().unselectable`,
      actions: "setStyle?style.opacity=.5",
    },
    {
      event: `mouseup?global.body.element.removeClass().unselectable`,
      actions: "setStyle?style.opacity=1",
    },
    {
      event: "mouseleave",
      actions: "setStyle?style.opacity=1",
    },
    {
      event: "mouseenter",
      actions: "setStyle?style.opacity=1?value.mousedown",
    },
  ];
};

},{}],29:[function(require,module,exports){
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
const {getDateTime} = require("./getDateTime")
const {
  setStyle,
  resetStyles,
  toggleStyles,
  mountAfterStyles,
} = require("./style")
const {resize, dimensions} = require("./resize")
const {createData, clearData} = require("./data")

const _method = {
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

module.exports = _method

},{"./blur":30,"./capitalize":31,"./clearValues":32,"./clone":33,"./close":34,"./compare":35,"./controls":36,"./createActions":37,"./createComponent":38,"./createDocument":39,"./createElement":40,"./createView":42,"./data":43,"./defaultInputHandler":44,"./derive":45,"./droplist":46,"./duplicate":47,"./erase":48,"./event":49,"./execute":50,"./fill":51,"./filter":52,"./flicker":53,"./focus":54,"./generate":55,"./getDateTime":56,"./getJsonFiles":57,"./getParam":58,"./isArabic":59,"./isEqual":60,"./isPath":61,"./keys":62,"./log":63,"./merge":64,"./note":65,"./overflow":66,"./pause":67,"./play":68,"./popup":69,"./preventDefault":70,"./reducer":71,"./remove":72,"./resize":74,"./save":75,"./search":76,"./setContent":77,"./setData":78,"./setElement":79,"./setPosition":80,"./sort":81,"./starter":82,"./state":83,"./style":84,"./textarea":85,"./toApproval":86,"./toArray":87,"./toAwait":88,"./toCSV":89,"./toCode":90,"./toComponent":91,"./toControls":92,"./toFirebaseOperator":93,"./toId":94,"./toNumber":95,"./toParam":96,"./toPath":97,"./toString":99,"./toStyle":100,"./toTag":101,"./toValue":102,"./toggleView":103,"./update":104,"./upload":105,"./values":106}],30:[function(require,module,exports){
const blur = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  const isInput = local.type === "Input" || local.type === "Textarea";
  if (isInput) local.element.blur();
  else {
    if (local.element) {
      let childElements = local.element.getElementsByTagName("INPUT");
      if (childElements.length === 0) {
        childElements = local.element.getElementsByTagName("TEXTAREA");
      }
      if (childElements.length > 0) {
        childElements[0].blur();
      }
    }
  }
};

module.exports = {blur};

},{}],31:[function(require,module,exports){
const capitalize = (string) => {
  return string
      .split(" ")
      .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
      .join(" ");
};

module.exports = {capitalize};

},{}],32:[function(require,module,exports){
const {clone} = require("./clone");

const clearValues = (obj) => {
  let newObj = clone(obj);

  if (typeof obj === "undefined") return "";

  if (typeof obj === "string") return "";

  if (Array.isArray(obj)) {
    newObj = [];
    if (obj.length > 0) {
      obj.map((element, index) => {
        if (typeof element === "object") {
          newObj[index] = clearValues(element);
        } else newObj[index] = "";
      });
    }

    return newObj;
  }

  Object.entries(obj).map(([key, value]) => {
    if (Array.isArray(value)) {
      newObj[key] = [];
      if (value.length > 0) {
        value.map((element, index) => {
          if (typeof element === "object") {
            newObj[key][index] = clearValues(element);
          } else newObj[key][index] = "";
        });
      }
    } else if (typeof value === "object") newObj[key] = clearValues(value);
    else newObj[key] = "";
  });

  return newObj;
};

module.exports = {clearValues};

},{"./clone":33}],33:[function(require,module,exports){
const clone = (obj) => {
  let copy;
  if (typeof obj !== "object") copy = obj;
  else if (Array.isArray(obj)) copy = obj.map((obj) => clone(obj));
  else {
    let element;

    if (obj.element) element = obj.element;

    copy = JSON.parse(JSON.stringify(obj));

    if (element) copy.element = element;
  }

  return copy;
};

const isElement = (obj) => {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have (works on IE7)
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
};

module.exports = {clone};

},{}],34:[function(require,module,exports){
const close = ({VALUE, id}) => {
  const local = VALUE[id];
  clearTimeout(local["note-timer"]);
  local.element.style.transform = "translateY(-200%)";
};

module.exports = {close};

},{}],35:[function(require,module,exports){
module.exports = {
    compare: (value1, operator, value2) => {
        if (operator === "==") return value1 === value2
        else if (operator === ">") return parseFloat(value1) > parseFloat(value2)
        else if (operator === "<") return parseFloat(value1) < parseFloat(value2)
        else if (operator === ">=") return parseFloat(value1) >= parseFloat(value2)
        else if (operator === "<=") return parseFloat(value1) <= parseFloat(value2)
        else if (operator === "in") return value1.includes(value2)
    }
}
},{}],36:[function(require,module,exports){
const {toArray} = require("./toArray");

const controls = ({VALUE, STATE, controls, id}) => {
  const {addEventListener} = require("./event");
  const {execute} = require("./execute");
  const {watch} = require("./watch");

  const local = VALUE[id];

  // controls coming from toControls action
  controls = controls || local.controls;

  controls &&
    toArray(controls).map((controls) => {
      // watch
      if (controls.watch) watch({VALUE, STATE, controls, id});
      // event
      else if (controls.event) addEventListener({VALUE, STATE, controls, id});
      // execute onload
      else execute({VALUE, STATE, controls, id});
    });
};

const setControls = ({VALUE, id, params}) => {
  const local = VALUE[id];
  if (!local) return;

  local.controls = toArray(local.controls);
  local.controls.push(...toArray(params.controls));
};

module.exports = {controls, setControls};

},{"./event":49,"./execute":50,"./toArray":87,"./watch":107}],37:[function(require,module,exports){
const control = require("../control/control");

const createActions = ({VALUE, STATE, params, id}) => {
  const {execute} = require("./execute");

  if (!params.type) return;
  const actions = control[params.type]({VALUE, STATE, params, id});

  execute({VALUE, STATE, actions, id});
};

module.exports = {createActions};

},{"../control/control":18,"./execute":50}],38:[function(require,module,exports){
const {clone} = require("./clone");
const {generate} = require("./generate");
const {toApproval} = require("./toApproval");
const {toParam} = require("./toParam");

const _component = require("../component/_component");

module.exports = {
  createComponent: ({VALUE, STATE, id}) => {
    let local = VALUE[id];

    if (!_component[local.type]) return [local, id];
    local = _component[local.type](local);

    // destructure type, params, & conditions from type
    local.type = local.type.split("/?").join("_question");
    const type = local.type.split("?")[0];
    let params = local.type.split("?")[1];
    const conditions = local.type.split("?")[2];

    // type
    local.type = type;

    // approval
    const approved = toApproval({VALUE, STATE, string: conditions, id});
    if (!approved) return;

    // push destructured params from type to local
    if (params) {
      params = toParam({VALUE, STATE, string: params, id});
      Object.entries(params).map(([k, v]) => (local[k] = v));
      if (params.id) {
        delete Object.assign(VALUE, {[params.id]: VALUE[id]})[id];
        id = params.id;
      } else if (params.data) {
        let state = local.Data;
        if (!state) state = local.Data = generate();
        STATE[state] = local.data || {};
        STATE[`${state}-options`] = {backup: clone(STATE[state])};
      }
    }

    VALUE[id] = local;
  },
};

},{"../component/_component":16,"./clone":33,"./generate":55,"./toApproval":86,"./toParam":96}],39:[function(require,module,exports){
(function (process){(function (){
const {createElement} = require("./createElement")
const {getJsonFiles} = require("./getJsonFiles")
//
require('dotenv').config()

const createDocument = (req, res) => {
    
    var host = req.url.split("/")[1]
    var config = JSON.parse(process.env.FIREBASE_CONFIG)
    var root = "", public = ""
    var STATE = {}
    var VALUE = {}
    
    // get assets & views
    STATE = {
        view: getJsonFiles("view"),
        page: getJsonFiles("page"),
        pathname: req.url,
        host,
        codes: {},
        config
    }

    // body
    var id = "body"
    VALUE[id] = {}
    VALUE[id].id = id

    // root
    var id = "root"
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = "View"
    VALUE[id].children = []
    VALUE[id].parent = "body"

    // public
    var id = "public"
    VALUE[id] = {}
    VALUE[id].id = id
    VALUE[id].type = "View"
    VALUE[id].children = []
    VALUE[id].parent = "body"

    //
    if (!STATE.page[host]) return "Hello"

    // get root children
    STATE.page[host].views.map(
        (view) => STATE.view[view] && VALUE["root"].children.push(STATE.view[view])
    )

    // get public children
    STATE.page.public.views.map(
        (view) => STATE.view[view] && VALUE["public"].children.push(STATE.view[view])
    )

    // create root html
    root = createElement({ STATE, VALUE, id: "root" })

    // create public html
    public = createElement({ STATE, VALUE, id: "public" })

    res.send(`<!DOCTYPE html>
        <html lang="en" class="html">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QuePik</title>
            <link rel="stylesheet" href="index.css" />
            <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
        </head>
        <body>
            ${public}${root}
            <script id="VALUE" type="application/json">${JSON.stringify(VALUE)}</script>
            <script id="STATE" type="application/json">${JSON.stringify(STATE)}</script>
            <script src="index.js"></script>
        </body>
        </html>`)
}

module.exports = {createDocument}

}).call(this)}).call(this,require('_process'))
},{"./createElement":40,"./getJsonFiles":57,"_process":4,"dotenv":108}],40:[function(require,module,exports){
const {generate} = require("./generate");
const {toParam} = require("./toParam");
const {toApproval} = require("./toApproval");
const {override} = require("./merge");
const {clone} = require("./clone");
const {createTags} = require("./createTags");
const {reducer} = require("./reducer");

const createElement = ({STATE, VALUE, id}) => {
  let local = VALUE[id];
  const parent = VALUE[local.parent];

  // html
  if (local.html) return local.html;

  // view value
  if (local.view && STATE.view[local.view]) {
    local = clone(STATE.view[local.view]);
  }

  // no value
  if (!local.type) return;

  // destructure type, params, & conditions from type
  local.type = local.type.split("/?").join("_question");
  let type = local.type.split("?")[0];
  let params = local.type.split("?")[1];
  const conditions = local.type.split("?")[2];

  // [type]
  if (type.slice(0, 1) === "[" && type.slice(-1) === "]") {
    type = type.slice(1).slice(0, -1);
    if (!local.duplicatedElement) local.mapType = true;
  }
  local.type = type;

  // parent
  local.parent = parent.id;

  // id
  local.id = local.id || generate();
  id = local.id;

  // class
  local.class = local.class || "";

  // Data
  local.Data = parent.Data;
  local.data = parent.data;

  // derivations
  local.derivations = local.derivations || [...(parent.derivations || [])];

  // status
  local.status = "loading";

  // first mount of local
  VALUE[id] = local;

  // ///////////////// approval & params /////////////////////

  // approval
  const approved = toApproval({VALUE, STATE, string: conditions, id});
  if (!approved) return;

  // push destructured params from type to local
  if (params) {
    params = toParam({VALUE, STATE, string: params, id});
    Object.entries(params).map(([k, v]) => (local[k] = v));

    if (params.id) {
      delete Object.assign(VALUE, {[params.id]: VALUE[id]})[id];
      id = params.id;
    }

    if (params.data && (!local.Data || params.Data)) {
      local.Data = local.Data || generate();
      var state = local.Data;
      STATE[state] = clone(local.data || STATE[state]);
      STATE[`${state}-options`] = STATE[`${state}-options`] || {};
    }

    if (params.Data) {
      STATE[`${params.Data}-options`] = STATE[`${params.Data}-options`] || {};
    }
  } else params = {};

  // pass values To Children
  if (parent.passToChildren) local = override(local, parent.passToChildren);

  // duplicated element
  if (local.duplicatedElement) {
    delete local.path;
    delete local.data;
  }

  // path
  let path =
    typeof local.path === "string" && local.path !== "" ?
      local.path.split(".") : []
      
  if (path.length > 0) {
    if (!local.Data) {
      var state = (local.Data = generate())
      STATE[state] = local.data || {}
      STATE[`${state}-options`] = {}
    }

    // convert string numbers to num
    path = path.map((k) => {
      if (!isNaN(k)) k = parseFloat(k)
      return k
    })

    local.derivations.push(...path)
  }

  // data
  if (parent.unDeriveData || local.unDeriveData) {
    local.data = local.data || ""
    local.unDeriveData = true
  } else {
    local.data = reducer({
      VALUE,
      STATE,
      id,
      params: {
        path: local.derivations,
        value: params.data,
        key: true,
        object: STATE[local.Data],
      },
    })
  }

  return createTags({VALUE, STATE, id})
}

module.exports = {createElement}

},{"./clone":33,"./createTags":41,"./generate":55,"./merge":64,"./reducer":71,"./toApproval":86,"./toParam":96}],41:[function(require,module,exports){
const {clone} = require("./clone")
const {generate} = require("./generate")
const {toArray} = require("./toArray")
const {createComponent} = require("./createComponent")
const {toTag} = require("./toTag")
const {isEqual} = require("./isEqual")

const autoActions = ["flicker"]

const createTags = ({VALUE, STATE, id}) => {
  const local = VALUE[id]
  if (!local) return

  local.length = 1

  if (local.mapType && Array.isArray(local.data) && local.data.length > 0) {
    local.length = local.data.length || 1

    var $ = clone(local)
    delete VALUE[id]

    if (local.unmount !== undefined && local.data > 0) {
      const toUnmount = []
      toArray(local.unmount).map((i) => {
        toUnmount.push(local.data[i])
      })
      toUnmount.map((unmount) => {
        const index = local.data.findIndex((el) => isEqual(el, unmount))
        if (index !== -1) local.data.splice(index, 1)
      })
    }

    return $.data
    .map((data, index) => {
      const id = generate()
      const local = clone($)

      local.derivations = [...local.derivations, index]
      local.mapIndex = index
      local.data = data
      local.id = id

      VALUE[id] = local
      return createTag({VALUE, STATE, id})
    })
    .join("")
  }

  if (local.originalKeys) {
    var keys = Object.keys(clone(local.data || {})).filter(
        (key) => !local.originalKeys.includes(key)
    )

    if (keys.length > 0) {

      local.length = keys.length
      var $ = clone(local)
      delete VALUE[id]

      return keys
      .map((key, index) => {

        var id = generate()
        var local = clone($)

        local.id = id
        local.key = key
        local.mapIndex = index
        VALUE[id] = local

        return createTag({VALUE, STATE, id})

      }).join("")
    }
  }

  if (local.lang && !local.templated && !local.duplicated) {
    var langs = Object.keys(clone(local.data || {}))

    if (langs.length > 0) {

      local.length = langs.length
      var $ = clone(local)
      delete VALUE[id]

      return langs
      .map((lang, index) => {

        var id = langs.length === 1 ? $.id : generate()
        var local = clone($)

        local.id = id
        local.lang = lang
        local.mapIndex = index

        VALUE[id] = local

        return createTag({VALUE, STATE, id})
        
      }).join("")
    }
  }

  if (local.currency && !local.templated && !local.duplicated) {
    var currencies = Object.keys(clone(local.data || {}))

    if (currencies.length > 0) {

      local.length = currencies.length
      var $ = clone(local)
      delete VALUE[id]

      return currencies
      .map((currency, index) => {

        var id = currencies.length === 1 ? $.id : generate()
        var local = clone($)

        local.id = id
        local.currency = currency
        local.mapIndex = index

        VALUE[id] = local

        return createTag({VALUE, STATE, id})

      }).join("")
    }
  }

  if (local.mapType) {
    local.mapIndex = 0
    local.derivations.push(0)
  }
  return createTag({VALUE, STATE, id})
}

const createTag = ({VALUE, STATE, id}) => {

  const {execute} = require("./execute")

  // components
  componentModifier({ VALUE, STATE, id })
  createComponent({ VALUE, STATE, id })

  const local = VALUE[id]

  // execute onload actions
  autoActions.map((action) => {
    if (local[action]) {
      local.actions = toArray(local.actions)
      local.actions.push(action)
    }
  })

  if (local.actions) execute({VALUE, STATE, actions: local.actions, id})
  return toTag({STATE, VALUE, id})
}

const componentModifier = ({ VALUE, STATE, id }) => {
  var local = VALUE[id]

  // icon
  if (local.type === "Icon") {

    local.icon = local.icon || {}
    local.icon.name = local.icon.name || ""
    if (local.icon.google) local.google = true

    if (local.icon.outlined || local.icon.type === "outlined") {
      local.outlined = true
    } else if (local.icon.rounded || local.icon.type === "rounded") {
      local.rounded = true
    } else if (local.icon.sharp || local.icon.type === "sharp") {
      local.sharp = true
    } else if (local.icon.twoTone || local.icon.type === "twoTone") {
      local.twoTone = true
    }
  }

  // textarea
  else if (local.textarea && !local.templated) {

    local.style = local.style || {}
    local.input = local.input || {}
    local.input.style = local.input.style || {}
    local.input.style.height = "fit-content"
  }

  // input
  else if (local.type === "Input") {
    local.input = local.input || {}

    if (local.checked !== undefined) local.input.checked = local.checked
    if (local.max !== undefined) local.input.max = local.max
    if (local.min !== undefined) local.input.min = local.min
    if (local.name !== undefined) local.input.name = local.name

    // update data acc. to input.value
    if (local.input && local.input.value !== undefined && local.type === "Input") {
      local.controls = toArray(local.controls)
      local.controls.push({
        "event": "loaded?value.data().equal().value.input.value"
      })
    }

  } else if (local.type === "Item") {

    const parent = VALUE[local.parent]

    if (local.index === 0) {

      local.state = generate()
      parent.state = local.state
      
    } else local.state = parent.state
  }
}

module.exports = {createTags}

},{"./clone":33,"./createComponent":38,"./execute":50,"./generate":55,"./isEqual":60,"./toArray":87,"./toTag":101}],42:[function(require,module,exports){
const {update} = require("./update");
const {generate} = require("./generate");
const {toArray} = require("./toArray");
const {removeIds} = require("./update");
const {clone} = require("./clone");

const createView = ({STATE, VALUE, params = {}, id}) => {
  let local;

  // append view to root
  if (id === "root") {
    id = generate();
    const element = document.createElement("div");
    element.id = id;

    element.style.height = "100%";
    element.style.width = "100%";

    VALUE[id] = {element, id, derivations: []};
    local = VALUE[id];

    VALUE.root.element.appendChild(element);
  } else local = VALUE[id];

  if (!local) return;

  // delete prev elements and ids
  const children = [...local.element.children];

  children.map((child) => {
    const id = child.id;

    removeIds({VALUE, id});

    VALUE[id].element.remove();
    delete VALUE[id];
  });

  const view = params.view;

  if (!view) return;

  // local.view = view
  if (!STATE.view[view]) return;

  local.children = toArray(clone(STATE.view[view]));

  // update
  update({VALUE, STATE, id});
};

module.exports = {createView};

},{"./clone":33,"./generate":55,"./toArray":87,"./update":104}],43:[function(require,module,exports){
const { clone } = require("./clone")
const { reducer } = require("./reducer")
const {setContent} = require("./setContent")
const {setData} = require("./setData")

const createData = ({STATE, VALUE, params, id}) => {
  const local = VALUE[id]
  const data = params.data

  local.derivations.reduce((o, k, i) => {
    if (i === local.derivations.length - 1) return o[k] = data
    return o[k]
  }, STATE[local.Data])
}

const clearData = ({ STATE, VALUE, id, e, params = {} }) => {

  var local = VALUE[id]
  if (!STATE[local.Data]) return
  
  var clear = params.clear || {}
  var path = clear.path
  path = path ? path.split(".") : clone(local.derivations)
  path.push('delete()')
  
  reducer({ VALUE, STATE, id, e, params: {path, object: STATE[local.Data]} })

  setContent({ VALUE, id })
  console.log("data removed", STATE[local.Data])
}

module.exports = {createData, setData, clearData}

},{"./clone":33,"./reducer":71,"./setContent":77,"./setData":78}],44:[function(require,module,exports){
const { setData } = require("./data");
const { resize } = require("./resize");
const { isArabic } = require("./isArabic");
const { generate } = require("./generate");

const defaultInputHandler = ({ STATE, VALUE, id }) => {
  var local = VALUE[id];
  if (!local) return;

  if (local.type !== "Input") return;

  // checkbox input
  if (local.input && local.input.type === "checkbox") {
    if (local.data === true) local.element.checked = true;

    var myFn = (e) => {
      // local doesnot exist
      if (!VALUE[id]) return e.target.removeEventListener("change", myFn);

      var value = e.target.checked;
      local.data = value;

      if (STATE[local.Data] && local.derivations[0] != "") {
        // reset Data
        var data = { value };
        setData({ STATE, VALUE, params: { data }, id });
      }
    };

    return local.element.addEventListener("change", myFn);
  }

  if (local.input && local.input.type === "number")
    local.element.addEventListener("mousewheel", (e) => e.target.blur());

  //if (local.input && local.input.value && !local.data)
  //    setData({ STATE, VALUE, params: { data: { value: local.input.value } }, id })

  if (local.readonly) return;

  var myFn = async (e) => {
    e.preventDefault();

    // VAR[id] doesnot exist
    if (!VALUE[id]) return e.target.removeEventListener("input", myFn);

    var value = e.target.value;

    // for number inputs, strings are rejected
    if (local.input && local.input.type === "number") {
      value = parseFloat(value);
      if (isNaN(value) || local.data === "free") return local.input.value = value.slice(0, -1)
      if (local.input.min > value) value = local.input.min;
      else if (local.input.max < value) value = local.input.max;
      local.input.value = value;
    }

    // for uploads
    if (local.input.type === "file") {
      value = e.target.files;
      if (value.length === 0) return;

      // add files to state for saving
      const readFile = (file) => {
        return new Promise((res, rej) => {
          let myReader = new FileReader();
          myReader.onloadend = (e) => res(myReader.result);
          myReader.readAsDataURL(file);
        });
      };

      var file = await readFile(value[0])
      var fileName = `${local.input.title || Date.now()}-${generate()}`
      var fileType = file.substring(file.indexOf("/") + 1, file.indexOf(";base64"))

      return STATE.file = local.file = { file, fileName, src: value[0], fileType }
    } else local.element.value = value;

    // rating input
    if (local.class.includes("rating__input")) {
      value = local.element.getAttribute("defaultValue");
    }

    if (local.Data) setData({ STATE, VALUE, params: { data: { value } }, id });

    // resize
    resize({ VALUE, id });

    // arabic values
    isArabic({ VALUE, params: { value }, id });

    console.log(value, STATE[local.Data]);
  };

  local.element.addEventListener("input", myFn);
  local.element.addEventListener("keydown", (e) => {
    if (e.keyCode == 13 && !e.shiftKey) e.preventDefault();
  });

  // resize
  resize({ VALUE, id });
};

module.exports = { defaultInputHandler };

},{"./data":43,"./generate":55,"./isArabic":59,"./resize":74}],45:[function(require,module,exports){
const derive = (data, keys, defaultData, editable) => {
  if (!Array.isArray(keys)) keys = keys.split(".");

  data = keys.reduce((o, k, i) => {
    // path doesnot exist => create path
    if (editable && typeof o[k] !== "object") {
      if (i < keys.length - 1) {
        if (!isNaN(keys[i + 1])) o[k] = [];
        else o[k] = {};
      } else if (i === keys.length - 1) {
        if (defaultData !== undefined) o[k] = defaultData;
        else if (Array.isArray(o) && isNaN(k)) {
          if (o.length === 0) {
            o.push({});
            keys.splice(i, 0, 0);
          }
        }
      }
    }

    if (o === undefined) return undefined;

    return o[k];
  }, data);

  return [data, keys];
};

module.exports = {derive};

},{}],46:[function(require,module,exports){
const {update} = require("./update");
const {clone} = require("./clone");
const {toValue} = require("./toValue");

const droplist = ({VALUE, STATE, id, e}) => {
  const local = VALUE[id]
  if (!local) return

  const dropList = VALUE["droplist"]
  const isInput = local.type === "Input" || local.type === "Textarea"
  const parent = VALUE[local.parent].parent

  // items
  var items = clone(local.droplist.items) || []
  dropList.derivations = clone(local.derivations)
  dropList.Data = local.Data

  // path & derivations
  if (local.droplist.path)
  dropList.derivations.push(...local.droplist.path.split("."))

  // input id
  var input_id
  if (local.lang || local.unit || local.currency || local.key || local.day)
  input_id = VALUE[local.parent].element.previousSibling.id
  
  // items
  if (typeof items === "string")
  items = toValue({ VALUE, STATE, id, e, params: {value: items} })
  items = items.filter((item) => item !== undefined && item !== '')
  
  // children
  if (items.length > 0) {
    dropList.children = clone(items).map(item => {
      var readonly = false, input = false, droplist, itemList = []

      if (typeof item === "string" || typeof item === "boolean") {

        item = item.toString()
        item = item.split(">>")
        readonly = item[1] === "readonly"
        input = item[1] === "input"
        item = item[0]

      } else if (Array.isArray(item)) {
        
        itemList = clone(item)
        item = itemList.find((item) => !item.includes("readonly"))
        input = true
        droplist = true
      }

      if (input && !readonly) {
        return {
          type: `Input?featured;clearable;style.backgroundColor=#f0f0f0;${local.key ? `input.value=value.path::${input_id};edit=${parent};` : `input.value=${item || ''};`}${droplist ? `readonly;droplist.items=[${itemList}];droplist.positioner=${dropList.positioner};data=value.data()::${id}` : ""}`,
          controls: {
            event: `keyup?value.element.innerHTML::${id}=e.target.value||${local.key};value.Data().[value.derivations.join()._dot::${input_id}].delete();value.derivations::${input_id}=[value.derivations.!lastIndex().join()::${input_id},e.target.value||${local.key}];value.Data().[value.derivations.join()._dot::${input_id}]=value.element.value::${input_id};value.path::${input_id}=e.target.value||${local.key}?!${droplist};value.key::${id};value.path::${input_id}!=e.target.value`,
          },
        }
      }

      return {
        type: `Item?text.text=const.${item};readonly=${readonly}`,
        controls: [{
          event: `click?value.element.${isInput ? "value" : "innerHTML"}::${id}=${item}<<!${local.droplist.disabled};action.resize::${id}?!readonly;state.droplist=${id}`,
          actions: [
            `?value.data()=${item}?!value.lang::${id};!value.currency::${id};!value.day::${id}`,
            // for lang & currency droplists
            `?value.data().${item}=value.data()::${input_id};value.data().delete()::${input_id};value.derivations::${input_id}=value.derivations.pull().[value.derivations.length().subs().1].push().${item}::${input_id}?const.${input_id};value.lang::${id}||value.currency::${id}||value.day::${id};value.derivations.lastIndex()::${input_id}!=${item}`,
            `focus::${input_id}`,
          ]
        }]
      }
    })
  }

  dropList.positioner = id
  dropList.unDeriveData = true

  update({ VALUE, STATE, id: "droplist" })
}

module.exports = {droplist}

},{"./clone":33,"./toValue":102,"./update":104}],47:[function(require,module,exports){
var {clearValues} = require("./clearValues");
var {clone} = require("./clone");
var {toArray} = require("./toArray");
var {derive} = require("./derive");
var {isEqual} = require("./isEqual");
var {removeDuplicates} = require("./removeDuplicates");
var {generate} = require("./generate");
var {focus} = require("./focus");

var duplicate = ({ VALUE, STATE, params = {}, id }) => {
  
  var {createElement} = require("./createElement");
  var {starter} = require("./starter");
  var {setElement} = require("./setElement");

  let localID = id, path = []
  var local = VALUE[id];

  if (STATE[local.Data]) {
    
    var keys = clone(local.derivations);
    var duplicate = params.duplicate || {}
    var index = duplicate.index || 0;

    if (!Array.isArray(path))
    keys = duplicate.path ? duplicate.path.split(".") : keys

    // last index refers to data index => must be poped
    if (!isNaN(keys[keys.length - 1])) {
      index = keys[keys.length - 1];
      keys.pop();
    }

    var language; var currency;

    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        if (local.currency) {
          var currencies = [];
          Object.entries(o[k]).map(([k, v]) => {
            currencies.push(k);
          });

          var random = [];
          STATE.asset.currency.options.map((currency) => {
            if (!currencies.includes(currency.name.en)) {
              random.push(currency.name.en);
            }
          });

          currency = random[0];
          o[k][currency] = "";
        } else if (local.lang) {
          var langs = [];
          Object.entries(o[k]).map(([k, v]) => {
            langs.push(k);
          });

          var random = [];
          STATE.asset.language.options.map((lang) => {
            if (!langs.includes(lang.name.en)) random.push(lang.name.en);
          });

          language = random[0];
          o[k][language] = "";
        } else if (local.key) {
          o[k][local.key] = "";
        } else {
          o[k] = toArray(o[k]);
          i = o[k].length - 1;

          if (isNaN(local.derivations[local.derivations.length - 1])) {
            if (path.length > 0) path.push(0)
            else local.derivations.push(0);
            var index = local.derivations.length - 1;
            var children = [...local.element.children];

            // update length
            children.map((child) =>
              VALUE[child.id].derivations.splice(index, 0, 0)
            );
          }

          o[k].push(clone(local.pushData || o[k][i] || ""));
          var index = o[k].length - 1;
          o[k][index] = removeDuplicates(clearValues(o[k][index]));
        }
      }

      return o[k];
    }, STATE[local.Data]);
  } else {
    var index = duplicate.index || local.children.length - 1;
    local.children.push(local.children[index]);
  }

  var length = local.length !== undefined ? local.length : 1;
  var id = generate();

  VALUE[local.parent].children = toArray(VALUE[local.parent].children);
  VALUE[id] = clone(VALUE[local.parent].children[local.index]);
  VALUE[id].id = id;
  VALUE[id].parent = local.parent;
  VALUE[id].duplicatedElement = true;
  VALUE[id].index = local.index;
  VALUE[id].derivations = (duplicate.path) ? duplicate.path.split('.') : [...local.derivations];

  var local = VALUE[id];
  local.duplicated = true;

  if (VALUE[localID].currency) {
    var type = local.type.split("currency=")[0];
    type += local.type.split("currency=")[1].slice(2);
    type += `;currency=${currency}`;
    local.type = type;
  } else if (VALUE[localID].lang) {
    var type = local.type.split("lang=")[0];
    type += local.type.split("lang=")[1].slice(2);
    type += `;lang=${language}`;
    local.type = type;
  } else if (
    VALUE[localID].originalKeys ||
    local.type.includes("originalKeys=")
  ) {
    // remove originalKeys=[]
    var type = local.type.split("originalKeys=")[0];
    if (local.type.split("originalKeys=")[1]) {
      type += local.type
          .split("originalKeys=")[1]
          .split(";")
          .slice(1)
          .join(";");
    }
    local.type = type;
  } else if (VALUE[localID].key) {
    // local.key
  } else {
    var lastIndex = local.derivations.length - 1
    if (!isNaN(local.derivations[lastIndex])) local.derivations[lastIndex] = length;
    else local.derivations.push(length)
  }

  // [type]
  if (local.type.slice(0, 1) === "[") {
    local.type = local.type.slice(1);
    var type = local.type.split("]");
    local.type = type[0] + local.type.split("]").slice(1).join(']');
  }

  // path
  if (local.type.includes("path=")) {
    var type = local.type.split("path=");
    local.type = type[0];
    type = type[1].split(";").slice(1);
    local.type += type.join(";");
  }
  
  // create element => append child
  var newcontent = document.createElement("div");
  newcontent.innerHTML = createElement({ STATE, VALUE, id });

  while (newcontent.firstChild) {
    id = newcontent.firstChild.id;
    VALUE[local.parent].element.appendChild(newcontent.firstChild);

    // starter
    setElement({STATE, VALUE, id});
    starter({STATE, VALUE, id});
  }

  // update length
  [...VALUE[local.parent].element.children].map((child) => {
    var id = child.id;
    VALUE[id].length = length + 1;
  });

  // focus
  focus({VALUE, STATE, id});
};

var duplicates = ({STATE, VALUE, params, id}) => {
  var local = VALUE[id];

  var data = derive(STATE[local.Data], local.derivations)[0];
  var exists;
  if (!params.data) return false;

  data = toArray(data);
  if (params.data) exists = data.find((data) => isEqual(data, params.data));
  else {
    data.map((data0) => {
      if (!exists) exists = data.find((data1) => isEqual(data0, data1));
    });
  }

  return exists;
};

module.exports = {duplicate, duplicates};

},{"./clearValues":32,"./clone":33,"./createElement":40,"./derive":45,"./focus":54,"./generate":55,"./isEqual":60,"./removeDuplicates":73,"./setElement":79,"./starter":82,"./toArray":87}],48:[function(require,module,exports){
/*const axios = require("axios");

const erase = async ({ VALUE, STATE, id, e, params = {} }) => {
  var local = VALUE[id];
  if (!local) return;
  
  var erase = params.erase
  var { data: { data, message, success } } = await axios.delete(`/api/${erase.path}${erase.id ? `/id=${erase.id}` : ''}`)
  
  local.erase = { data, message, success };

  console.log(data, message, success);

  // await params
  toAwait({ VALUE, STATE, id, e, params });
};

module.exports = { erase };*/
const { toAwait } = require("./toAwait");

module.exports = {
  erase: async ({ VALUE, STATE, params = {}, id, e }) => {
        
    var local = VALUE[id]
    var erase = params.erase
    var collection = erase.path
    var ref = STATE.db.collection(collection)
    
    ref.doc(erase.id).delete().then(async () => {

      local.erase = {
        success: true,
        message: `Data erased successfuly!`,
      }
      
      if (erase.type === 'file') await STATE.storage.child(`images/${erase.id}`).delete()
            
      console.log(local.erase)
                  
      // await params
      toAwait({ VALUE, STATE, id, e, params })

    }).catch(error => {

      local.erase = {
          success: false,
          message: error,
      }
      
      console.log(local.erase)
    })
  }
}

},{"./toAwait":88}],49:[function(require,module,exports){
const { toApproval } = require("./toApproval")
const { toId } = require("./toId")
const { toParam } = require("./toParam")
const { clone } = require("./clone")

const events = [
  "click",
  "mouseenter",
  "mouseleave",
  "mousedown",
  "mouseup",
  "touchstart",
  "touchend",
]

const addEventListener = ({ VALUE, STATE, controls, id }) => {
  const { execute } = require("./execute")

  var local = VALUE[id]
  var mainID = local.id

  var events = controls.event.split("/?").join("_question").split("?")
  var _idList = toId({ VALUE, STATE, id, string: events[3] })

  events[0].split(";").map((event) => {
    var timer = 0, idList

    // action::id
    var eventid = event.split("::")[1]
    if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
    else idList = clone(_idList)

    // event
    event = event.split("::")[0]

    // action>>timer
    timer = event.split(">>")[1] || 0
    event = event.split(">>")[0]

    if (!event) return

    clearTimeout(local[`${event}-timer`])

    // add event listener
    idList.map(id => {

      var myFn = (e) => {
        local[`${event}-timer`] = setTimeout(async () => {

          if (local.once) return e.target.removeEventListener(event, myFn)
          
          // VALUE[id] doesnot exist
          if (!VALUE[id]) return e.target.removeEventListener(event, myFn)

          // approval
          var approved = toApproval({ VALUE, STATE, string: events[2], e, id: mainID })
          if (!approved) return

          // params
          params = toParam({ VALUE, STATE, string: events[1], e, id: mainID })
          
          if (controls.actions)
          await execute({ VALUE, STATE, controls, e, id: mainID })

          // await params
          if (params.await && params.await.length > 0)
            toParam({ VALUE, STATE, id, e, string: params.await.join(";") })
        }, timer)
      }

      // onload event
      if (event === "loaded") myFn({ target: VALUE[id].element })

      // elements
      VALUE[id].element.addEventListener(event, myFn)
    })
  })
}

const defaultEventHandler = ({ VALUE, id }) => {
  var local = VALUE[id]

  local.touchstart = false
  local.mouseenter = false
  local.mousedown = false

  events.map((event) => {
    const setEventType = (e) => {
      var local = VALUE[id]
      if (!local) return e.target.removeEventListener(event, setEventType)

      if (event === "mouseenter") local.mouseenter = true
      else if (event === "mouseleave") local.mouseenter = false
      else if (event === "mousedown") local.mousedown = true
      else if (event === "mouseup") local.mousedown = false
      else if (event === "touchstart") local.touchstart = true
      else if (event === "touchend") local.touchstart = false
    }

    local.element.addEventListener(event, setEventType)
  })
}

module.exports = { addEventListener, defaultEventHandler }

},{"./clone":33,"./execute":50,"./toApproval":86,"./toId":94,"./toParam":96}],50:[function(require,module,exports){
const { toApproval } = require("./toApproval");
const { toArray } = require("./toArray");
const { toParam } = require("./toParam");
const { getParam } = require("./getParam");
const { toId } = require("./toId");
const { toValue } = require("./toValue");
const _method = require("./_method");

const execute = ({ VALUE, STATE, controls, actions, e, id, params }) => {
  var local = VALUE[id], _params = params, localId = id

  if (controls) actions = controls.actions;
  if (local) local.break = false;

  // execute actions
  toArray(actions).map((_action) => {
    var awaiter = []

    // stop after actions
    if (local && local.break) return;

    _action = _action.split("/?").join("_question");

    var approved = true
    var actions = _action.split("?")
    var params = actions[1]
    var conditions = actions[2]
    var idList = actions[3]

    actions = actions[0].split(";")

    // approval
    if (conditions) approved = toApproval({ VALUE, STATE, string: conditions, params, id: localId, e })
    if (!approved) return

    // params
    params = toParam({ VALUE, STATE, string: params, e, id: localId })
    if (_params) params = {..._params, ...params}

    // action does not exist
    actions.map(action => {

      var name = action.split("::")[0]

      // action>>timer<<condition
      var caseCondition = name.split('<<')[1]
      name = name.split('<<')[0]
      var timer = parseFloat(name.split(">>")[1] || 0)
      name = name.split(">>")[0]

      // break
      if (local) local.break = getParam(_action, "break", false)
      
      const myFn = () => {
        var approved = true

        // asyncer & awaiter
        var keys = name.split("."), isAwaiter, isAsyncer
        if (keys.length > 1) keys.map(k => {
  
          if (k === "async") isAsyncer = true
          else if (k === "await") {
            isAwaiter = true
            awaiter.push(action.split("await.")[1])
          }
        })

        if (isAwaiter || isAsyncer) name = name.split(".")[1]
        if (isAwaiter) return

        // case condition approval
        if (caseCondition) approved = toApproval({ VALUE, STATE, string: caseCondition, params, id: localId, e })
        if (!approved) return

        // id list
        idList = toId({ VALUE, STATE, id, string: idList, e })

        // action::id
        var actionid = action.split("::")[1]
        if (actionid) actionid = toValue({ VALUE, STATE, params: { value: actionid, params }, id: localId, e })

        if (_method[name]) (actionid ? toArray(actionid) : idList).map(async id => {

          if (typeof id !== "string") return

          // id = value.path
          if (id.indexOf(".") > -1) 
          id = toValue({ VALUE, STATE, params: { value: id }, e, id: localId })

          // component does not exist
          if (!id || !VALUE[id]) return

          if (isAsyncer) {
            params.awaiter = awaiter
            params.asyncer = isAsyncer
          }
          await _method[name]({ VALUE, STATE, controls, params, e, id })
        })
      }

      if (timer) {
        if (local) local[`${name.split('.')[1] || name.split('.')[0]}-timer`] = setTimeout(myFn, timer)
        else setTimeout(myFn, timer)
      } else myFn()
    })
  })
}

module.exports = { execute }

},{"./_method":29,"./getParam":58,"./toApproval":86,"./toArray":87,"./toId":94,"./toParam":96,"./toValue":102}],51:[function(require,module,exports){
module.exports = {
  fill: ({ VALUE, id }) => {
    
  }
}

},{}],52:[function(require,module,exports){
const { isEqual } = require("./isEqual")
const { toArray } = require("./toArray")
const { toAwait } = require("./toAwait")
const { compare } = require("./compare")
const { toFirebaseOperator } = require("./toFirebaseOperator")
const { clone } = require("./clone")

const filter = ({VALUE, STATE, params = {}, id, e}) => {

  var local = VALUE[id]
  if (!local) return

  var filter = params.filter || {}
  var Data = filter.Data || local.Data
  var options = STATE[`${Data}-options`]

  var path = toArray(filter.path)
  path = path.map(path => path.split("."))

  var backup = filter.backup
  var value = filter.value

  if (!value || isEqual(options.filter, value)) {

    options.filter = clone(value)
    data = backup

  } else {

    // reset backup filter options
    options.filter = clone(value)
    
      // remove spaces
    Object.entries(value).map(([k, v]) => value[k] = v.toString().split(" ").join("").toLowerCase())
    
    var data = []
    data.push(
      ...backup.filter(data => {
        return !Object.entries(value).map(([o, v]) => 
        compare(path
        .map(path => (path
        .reduce((o, k) => o[k], data) || '')
        .toString()
        .toLowerCase()
        .split(" ")
        .join("")
        )
        .join(""),
        toFirebaseOperator(o), v))
        .join("")
        .includes("false")
      })
    )
  }
  
  STATE[Data] = data

  // await params
  toAwait({VALUE, STATE, id, e, params})
}

module.exports = {filter}

},{"./clone":33,"./compare":35,"./isEqual":60,"./toArray":87,"./toAwait":88,"./toFirebaseOperator":93}],53:[function(require,module,exports){
const {setControls} = require("./controls");
const {setStyle} = require("./style");

module.exports = {
  flicker: ({VALUE, id}) => {

    let transition = VALUE[id].style.transition;
    if (transition) transition += "opacity .3s";
    transition = "opacity .3s";

    setStyle({
      VALUE,
      STATE,
      id,
      params: {style: {transition, opacity: "0"}},
    });

    const controls = {actions: "setStyle?style.opacity=1"};

    setControls({VALUE, STATE, id, params: {controls}});
  },
};

},{"./controls":36,"./style":84}],54:[function(require,module,exports){
const focus = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  const isInput = local.type === "Input" || local.type === "Textarea";
  if (isInput) local.element.focus();
  else {
    if (local.element) {
      let childElements = local.element.getElementsByTagName("INPUT");
      if (childElements.length === 0) {
        childElements = local.element.getElementsByTagName("TEXTAREA");
      }
      if (childElements.length > 0) {
        childElements[0].focus();
      }
    }
  }

  // focus to the end of input
  const value = local.element.value;
  local.element.value = "";
  local.element.value = value;
};

module.exports = {focus};

},{}],55:[function(require,module,exports){
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generate = (length) => {
  let result = "";
  if (!length) length = 5;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {generate};

},{}],56:[function(require,module,exports){
module.exports = {
    getDateTime: ({ params: {time} }) => {
        
        var sec = parseInt(time.getSeconds())
        var min = parseInt(time.getMinutes())
        var hrs = parseInt(time.getHours())
        var day = parseInt(time.getDate())
        var month = parseInt(time.getMonth()) + 1
        var year = parseInt(time.getFullYear())
        
        if (sec < 10) sec = "0" + sec
        if (min < 10) min = "0" + min
        if (hrs < 10) hrs = "0" + hrs
        if (day < 10) day = "0" + day
        if (month < 10) month = "0" + month
        if (year < 10) year = "0" + year
        
        return `${year}-${month}-${day}T${hrs}:${min}:${sec}`
    }
}
},{}],57:[function(require,module,exports){
(function (process){(function (){
const path = require("path");
const fs = require("fs");

const getJsonFiles = (folder, fileName, params = {}) => {
  let data = {};
  const folderPath = path.join(process.cwd(), folder);

  if (fileName) {
    data = JSON.parse(fs.readFileSync(path.join(folderPath, fileName)));
  } else {
    fs.readdirSync(folderPath).forEach((fileName) => {
      const file = fs.readFileSync(path.join(folderPath, fileName));
      fileName = fileName.split(".json")[0];
      data[fileName] = JSON.parse(file);
    });
  }

  if (params.id) {
    data = data.filter((data) => params.id.find((id) => id === data.id));
  }

  return data;
};

module.exports = {getJsonFiles};

}).call(this)}).call(this,require('_process'))
},{"_process":4,"fs":1,"path":3}],58:[function(require,module,exports){
const { toParam } = require("./toParam");

const getParam = (string, param, defValue) => {

  if (!string) return defValue;
  if (!string.includes("?")) return defValue;

  string = string.split("/?").join("_question");
  string = string.split("?")[1];
  if (!string) return defValue;

  string = string.split(";");
  string = string.find((el) => el.includes(param));
  if (!string) return defValue;

  let params = toParam({ string });
  if (params[param]) value = params[param];

  return value;
};

module.exports = {getParam};

},{"./toParam":96}],59:[function(require,module,exports){
const arabic = /[\u0600-\u06FF\u0750-\u077F]/;

const isArabic = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return arabic.test(value);
  }

  if (!value) return;
  const {VALUE, params = {}, id} = value;
  const local = VALUE[id];
  if (local.type !== "Text" && local.type !== "Input") return;

  const text = params.value || local.element.value || local.element.innerHTML;
  if (!text) return;
  const result = arabic.test(text);

  if (result) {
    local.element.classList.add("arabic");
    local.element.style.textAlign = "right";
    if (local["placeholder-ar"]) {
      local.element.placeholder = local["placeholder-ar"];
    }
  } else {
    if (local.element.className.includes("arabic")) {
      local.element.style.textAlign = "left";
    }
    local.element.classList.remove("arabic");
    if (local["placeholder"]) local.element.placeholder = local["placeholder"];
  }
  return true;
};

module.exports = {isArabic};

},{}],60:[function(require,module,exports){
const isEqual = function(value, other) {
  // if (value === undefined || other === undefined) return false

  // string || boolean || number
  if (typeof value !== "object" && typeof other !== "object") {
    return value == other;
  }

  // html elements
  if (value && other) {
    if (
      value.nodeType === Node.ELEMENT_NODE &&
      other.nodeType === Node.ELEMENT_NODE
    ) {
      return (
        value.isSameNode(other) ||
        value.contains(other) ||
        other.contains(value)
      );
    } else if (
      (value.nodeType !== Node.ELEMENT_NODE &&
        other.nodeType === Node.ELEMENT_NODE) ||
      (value.nodeType === Node.ELEMENT_NODE &&
        other.nodeType !== Node.ELEMENT_NODE)
    ) {
      return false;
    }
  }

  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  const valueLen =
    type === "[object Array]" ? value.length : Object.keys(value).length;
  const otherLen =
    type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  const compare = function(item1, item2) {
    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() != item2.toString()) return false;
      } else {
        if (item1 != item2) return false;
      }
    }
  };

  // Compare properties
  if (type === "[object Array]") {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
};

module.exports = {isEqual};

},{}],61:[function(require,module,exports){
module.exports = {
  isPath: ({VALUE, STATE, id, e, params: {path}}) => {
    path = path.split(".");

    if (path.length === 1 || path.length === 0) return false;
    else if (
      /\d/.test(path[0]) ||
      /\s/.test(path[0]) ||
      (path[1] && (path[1].includes("rem") || path[1].includes("px")))
    ) {
      return false;
    }
    return true;
  },
};

},{}],62:[function(require,module,exports){
module.exports = {
    keys: (object) => {
        return Object.keys(object)
    }
}
},{}],63:[function(require,module,exports){
const log = ({params}) => {
  console.log(params.log || 'here');
};

module.exports = {log};

},{}],64:[function(require,module,exports){
const {toArray} = require("./toArray");
const {clone} = require("./clone");

const merge = (objects) => {
  objects = clone(objects);
  if (typeof objects !== "object") return objects;

  const merged = toArray(objects[0]).flat();

  objects.shift();

  objects.map((obj) => {
    merged.push(...toArray(obj).flat());

    if (!Array.isArray(obj) && typeof obj === "object") {
      Object.entries(obj).map(([key, value]) => {
        if (merged[key]) {
          if (typeof value === "string" || typeof value === "number") {
            merged[key] = toArray(merged[key]);
            merged[key].push(value);
          } else if (Array.isArray(value)) {
            merged[key].push(...value);
          } else if (typeof value === "object") {
            merged[key] = merge([value, merged[key]]);
          }
        } else merged[key] = value;
      });
    }
  });

  return merged;
};

const override = (obj1, obj2) => {
  obj1 = obj1 || {};

  Object.entries(obj2).map(([key, value]) => {
    if (obj1[key]) {
      if (!Array.isArray(value) && typeof value === "object") {
        obj1[key] = override(obj1[key], value);
      } else obj1[key] = value;
    } else obj1[key] = value;
  });

  return obj1;
};

module.exports = {merge, override};

},{"./clone":33,"./toArray":87}],65:[function(require,module,exports){
const note = ({VALUE, params}) => {
  const note = VALUE["action-note"]
  const noteText = VALUE["action-note-text"]
  
  if (!params.note) return

  clearTimeout(note["note-timer"])

  note.element.style.transition = "initial"
  note.element.style.transform = "translateY(-200%)"

  noteText.element.innerHTML = params.note

  note.element.style.left = "center"
  note.element.style.transition = "transform .2s"
  note.element.style.transform = "translateY(0)"

  const myFn = () => note.element.style.transform = "translateY(-200%)"

  note["note-timer"] = setTimeout(myFn, 5000)
}

module.exports = {note}

},{}],66:[function(require,module,exports){
const overflow = ({VALUE, params, id}) => {
  const local = VALUE[id];

  const width = local.element.clientWidth;
  const height = local.element.clientHeight;
  let text;

  if (local.type === "Input" || local.type === "Textarea") {
    text = local.element.value;
  } else if (
    local.type === "Text" ||
    local.type === "Label" ||
    local.type === "Header"
  ) {
    text = local.element.innerHTML;
  } else if (local.type === "UploadInput") text = local.element.value;

  // create a test div
  let lDiv = document.createElement("div");

  document.body.appendChild(lDiv);

  const pStyle = local.element.style;
  const pText = local.data || local.input.value || "";
  const pFontSize = pStyle.fontSize;

  if (pStyle != null) {
    lDiv.style = pStyle;
  }

  lDiv.style.fontSize = pFontSize;
  lDiv.style.position = "absolute";
  lDiv.style.left = -1000;
  lDiv.style.top = -1000;
  lDiv.style.padding = pStyle.padding;

  lDiv.innerHTML = pText;

  const lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  };

  document.body.removeChild(lDiv);
  lDiv = null;

  let overflowX; let overflowY;
  if (width < lResult.width) overflowX = true;
  if (height < lResult.height) overflowY = true;

  return [overflowX, overflowY];
};

module.exports = {overflow};

},{}],67:[function(require,module,exports){
const pause = ({VALUE, id}) => {
  const local = VALUE[id];
  clearTimeout(local["note-timer"]);
};

module.exports = {pause};

},{}],68:[function(require,module,exports){
const play = ({VALUE, id}) => {
  const local = VALUE[id];
  const myFn = () => {
    local.element.style.transform = "translateY(-200%)";
  };

  local["note-timer"] = setTimeout(myFn, 5000);
};

module.exports = {play};

},{}],69:[function(require,module,exports){
const {controls} = require("./controls");
const {update} = require("./update");

const popup = ({VALUE, STATE, id, params}) => {
  var local = VALUE[id];

  var popup = VALUE["popup"];
  var popUp = local.popup;

  popup.Data = local.Data;
  popup.derivations = local.derivations;

  popup.positioner = id;
  popup.unDeriveData = true;

  update({VALUE, STATE, id: "popup"});
  
  // eraser
  if (popUp.type === "eraser") {
    var _controls = {
      event: "click",
      actions: `resetStyles::popup;await.note;await.setStyle::mini-window;await.remove>>220::global.mini-window-view.element.children.0.id${popUp.update ? `;await.update::${popUp.update}` : ""};async.erase?note=${popUp.note || "Data removed successfully"};style.display=none>>200;style.opacity=0;erase.path=${popUp.path};erase.id=${popUp.id || "value.data().id"};await.state.[value.Data]=value.Data()._filterById().[${popUp.id ? `any.${popUp.id}` : "value.data().id"}.isNot().[_.id]]`,
    };
    setTimeout(() => {
      if (popUp.text) VALUE["popup-text"].element.innerHTML = popUp.text;
      controls({VALUE, STATE, controls: _controls, id: "popup-confirm"});
    }, 50);
  }
};

module.exports = {popup};

},{"./controls":36,"./update":104}],70:[function(require,module,exports){
const preventDefault = ({e}) => {
  e.preventDefault();
};

module.exports = {preventDefault};

},{}],71:[function(require,module,exports){
const { generate } = require("./generate")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")
const { isEqual } = require("./isEqual")
const { capitalize } = require("./capitalize")
const { clone } = require("./clone")
const { toNumber } = require("./toNumber")
const { toPrice } = require("./toPrice")
const { getDateTime } = require('./getDateTime')

const reducer = ({ VALUE, STATE, id, params: { path, value, key, params, object }, _, e }) => {

    const { toValue } = require("./toValue")
    const { execute } = require("./execute")

    var local = VALUE[id], breakRequest

    // []
    if (path[0] === '[]') {
        object = []
        path = path.slice(1)
    }

    if (path[1]) path = toCode({ VALUE, STATE, id, string: path.join('.'), e }).split('.')
    
    if (path[0] === 'global') {

        local = VALUE[path[1]]
        id = toValue({ VALUE, STATE, id, e, params: {value: path[1], params}, _ })
        path = path.slice(1)
        path[0] = 'value'
    }
    
    if (!object) {
        
        object = path[0] === 'value' ? VALUE[id]
        : path[0] === 'state' ? STATE 
        : path[0] === 'e' ? e
        : path[0] === '_' ? _
        : path[0] === 'params' ? params
        : path[0] === 'any' ? toValue({ VALUE, STATE, id, params: { value: path[1], params }, _, e })
        : path[0] === 'document' ? document
        : path[0] === 'window' ? window
        : path[0] === 'history' ? history
        : false
        
        if (!object && path[0]) {
            
            if (path[0].includes('coded()'))
            object = toValue({ VALUE, STATE, id, params: { value: STATE.codes[path[0]], params }, _, e })

            else if (path.join('.').includes(','))
            return object = toValue({ VALUE, STATE, id, params: { value: `[${path.join('.')}]`, params }, _, e })

            else if (path[0] === 'action') {
                var actions = toValue({ VALUE, STATE, id, params: { value: path[1], params }, _, e })
                return execute({ VALUE, STATE, id, actions, params, e })
            }

            else if (path[0] === '[]') object = []

            else if (path[0] === '{}') object = {}

            else if (path[0] === '[{}]') object = [{}]

            else if (path[0].includes('()')) object = VALUE
        }

        if (path[0] === 'any') path = path.slice(1)
        if (object) path = path.slice(1)
        else if (path[0] && path[0].includes('coded()')) return
        else return path.join('.')
    }
    
    var lastIndex = path.length - 1
    
    var answer = path.reduce((o, k, i) => {
        
        if (!isNaN(k)) k = k + ''
                    
        // break
        if (breakRequest === true || breakRequest >= i) return o
        
        if (k === 'else()') {
            
            breakRequest = i + 1
            var answer1 = o
            var answer2 = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            if (!answer1) answer = answer2
            else answer = answer1
            console.log(answer, local);
            return answer
        }

        // equals
        if (path[i + 1] && (path[i + 1].includes('equal()') || path[i + 1].includes('equals()'))) {

            key = breakRequest = true
            value = toValue({ VALUE, STATE, id, e, _, params: { value: path.slice(i + 2).join('.'), params } })
            path = path.slice(0, i)
            i = lastIndex
        }

        if (o === undefined) return o

        if (k === "if()") {
            
            breakRequest = i + 1
            var approved = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            if (!approved) answer = false
            else answer = o
            
        } else if (k === "_") {

            answer = _

        } else if (k.includes('coded()')) {
            
            breakRequest = true
            var newValue = toValue({ VALUE, STATE, id, e, params: { value: STATE.codes[k], params }, _ })
            newValue = [ ...newValue.toString().split('.'), ...path.slice(i + 1)]
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: newValue, object: o, params }, _ })

        } else if (k === 'data()') {

            breakRequest = true
            answer = reducer({ VALUE, STATE, id, e, params: { value, key, path: [...local.derivations, ...path.slice(i+1)], object: STATE[local.Data], params }, _ })
            delete local['data()']

        } else if (k === 'Data()') {

            answer = STATE[local.Data]

        } else if (k === "removeAttribute()") {

            breakRequest = i + 1
            var removed = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params }, _ })
            answer = o.removeAttribute(removed)

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

        } else if (k === '3rdlastChild()') {

            var _id = o.element.children[o.element.children.length - 3].id
            if (VALUE[_id].component === 'Input') {
                _id = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
            }
            
            answer = VALUE[_id]

        } else if (k === '2ndlastChild()') {

            var _id = o.element.children[o.element.children.length - 2].id
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
                
                var _id = el.id
                if (VALUE[_id].component === 'Input') {

                    var _id0 = VALUE[_id].element.getElementsByTagName('INPUT')[0].id
                    return VALUE[_id0]

                } else return VALUE[_id]
            })
            
        } else if (k === '!') {

            opposite = true
            answer = o

        } else if (k === 'toInteger()') {

            answer = Math.round(toNumber(o))

        } else if (k === 'child()') {

            breakRequest = i + 1
            var child = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.child(child)
            
        } else if (k === 'clearTimeout()') {
            
            answer = clearTimeout(o)
            
        } else if (k === 'setTimeout()') {
            
            breakRequest = i + 2
            var timer = parseInt(path[i + 2])
            var myFn = () => toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = setTimeout(myFn, timer)

        } else if (k === 'delete()') {
            
            answer = o.delete()
            
        } else if (k === 'shift()') {

            answer = o.shift()

        } else if (k === 'slice()') {

            breakRequest = i + 1
            var sliced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.slice(sliced)

        } else if (k === 'replaceState()') {

            breakRequest = i + 1
            var replaced = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.replaceState(null, STATE.page[STATE.host].title, replaced)

        } else if (k === 'pushState()') {

            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, e, params: { value: path[i + 1], params }, _ })
            answer = o.pushState(null, STATE.page[STATE.host].title, pushed)

        } else if (k === '_param') {
            
            breakRequest = i + 1
            var param = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = o + '>>' + param

        } else if (k === '_array' || k === '[]') {
            
            answer = []

        } else if (k === '_string' || k === "''") {
            
            answer = ''

        } else if (k === '_object' || k === '{}') {
            
            answer = {}

        } else if (k === '_semi') {
            
            if (path[i + 1] === 'add()') answer = o + ";"
            else {
            breakRequest = i + 1
            answer = o + ";" + toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } })
            if (!path[i + 1]) answer = o + ";"
            }

        } else if (k === '_quest') {
            
            if (path[i + 1] === 'add()') answer = o + "?"
            else {
            breakRequest = i + 1
            answer = o + "?" + toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } })
            if (!path[i + 1]) answer = o + "?"
            }

        } else if (k === '_dot') {

            if (path[i + 1] === 'add()') answer = o + "."
            else {
            breakRequest = i + 1
            answer = o + "." + toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } })
            if (!path[i + 1]) answer = o + "."
            }

        } else if (k === '_space') {

            if (path[i + 1] === 'add()') answer = o + " "
            else {
            breakRequest = i + 1
            var spaced = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            if (!path[i + 1]) spaced = ""
            answer = o + " " + spaced
            }
            
        } else if (k === '_equal') {

            if (path[i + 1] === 'add()') answer = o + "="
            else {
                breakRequest = i + 1
                var _equal = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
                if (!path[i + 1]) _equal = ""
                answer = o + "=" + _equal
            }

        } else if (k === 'and()' || k === '&&') {
            
            if (!o) {
                breakRequest = true
                answer = o
            } else {
                breakRequest = i + 1
                answer = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            }
            
        } else if (k === 'isEqual()' || k === 'is()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = isEqual(o, b)
            
        } else if (k === 'greater()' || k === 'isgreater()' || k === 'isgreaterthan()' || k === 'isGreaterThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = parseFloat(o) > parseFloat(b)

        } else if (k === 'less()' || k === 'isless()' || k === 'islessthan()' || k === 'isLessThan()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = parseFloat(o) < parseFloat(b)

        } else if (k === 'isNot()' || k === 'isNotEqual()' || k === 'not()') {
            
            breakRequest = i + 1
            var isNot = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            answer = !isEqual(o, isNot)
            
        } else if (k === 'abs()') {
            
            o = o.toString()

            var isPrice
            if (o.includes(',')) isPrice = true
            o = toNumber(o)

            answer = Math.abs(o)
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'dividedBy()' || k === 'divide()' || k === 'divided()' || k === 'divideBy()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()

            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true

            b = toNumber(b)
            o = toNumber(o)

            answer = o / b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'times()' || k === 'multiplyBy()' || k === 'multiply()' || k === 'mult()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)

            answer = o * b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'add()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, _, e })
            
            o = o.toString()
            b = b.toString()
            var space = o.slice(-1) === ' ' || b.slice(-1) === ' '
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)

            answer = space ? o + ' ' + b : o + b
            if (isPrice) answer = answer.toLocaleString()
            
        } else if (k === 'subs()') {
            
            breakRequest = i + 1
            var b = toValue({ VALUE, STATE, id, params: { value: path[i + 1], params }, e, _ })
            
            o = o.toString()
            b = b.toString()
            
            var isPrice
            if (o.includes(',') || b.includes(',')) isPrice = true
            
            b = toNumber(b)
            o = toNumber(o)
            
            if (!isNaN(o) && !isNaN(b)) answer = o - b
            else answer = o.split(b)[0] - o.split(b)[1]
            if (isPrice) answer = answer.toLocaleString()

        } else if (k === 'toArray()') {
            
            answer = toArray(o)

        } else if (k === 'json') {
            
            answer = o + '.json'

        } else if (k === 'exists()') {
            
            answer = o !== undefined ? true : false

        } else if (k === 'clone()') {
            
            answer = clone(o)

        } else if (k === 'array()' || k === '[]') {
            
            answer = []

        } else if (k === 'object()' || k === '{}') {
            
            answer = {}
            if (path[i + 1] === 'field()') {
                breakRequest = true
                var fields = path.slice(i + 1).join('.').split('field().').slice(1)
                fields.map(field => {
                    var f = toValue({ VALUE, STATE, id, params: { value: field.split('.')[0], params }, _, e })
                    var v = toValue({ VALUE, STATE, id, params: { value: field.split('.')[2], params }, _, e })
                    answer[f] = v
                })
            }
            
        } else if (k === 'push()') {
            
            breakRequest = i + 1
            var pushed = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params},_ ,e })
            o.push(pushed)
            answer = o

        } else if (k === 'pull()') {
            
            breakRequest = i + 1
            var pulled = toValue({ VALUE, STATE, id, params: {value: path[i + 1], params},_ ,e }) || o.length - 1
            o.splice(pulled,1)
            answer = o

        } else if (k === 'keys()') {
            
            answer = Object.keys(o)
            
        } else if (k === 'key()') {
            
            answer = Object.keys(o)[0]
            
        } else if (k === 'values()') {
            
            answer = Object.values(o)

        } else if (k === 'value()') {
            
            answer = Object.values(o)[0]
            
        } else if (k === 'entries()') {
            
            answer = Object.entries(o).map(([k, v]) => ({ [k]: v }))

        } else if (k === 'toLowerCase()') {
            
            answer = o.toLowerCase()

        } else if (k === 'generate()') {
            
            answer = generate()

        } else if (k === 'includes()') {
            
            breakRequest = i + 1
            var included = toValue({ VALUE, STATE, id, e, params: { value: path[i+1], params }, _ })
            answer = o.includes(included)
            
        } else if (k === 'capitalize()') {
            
            answer = capitalize(o)
            
        } else if (k === 'length()') {
            
            answer = o.length
            
        } else if (k === 'today()') {
            
            answer = new Date()

        } else if (k === 'date()' || k === 'toDate()') {

            if (!isNaN(o)) o = parseInt(o)
            answer = new Date(o)
            
        } else if (k === 'toUTCString()') {
            
            if (!isNaN(o)) o = new Date(parseFloat(o))
            answer = o.toUTCString()
            
        } else if (k === 'setBeginning()') {
            
            answer = o.setHours(0,0,0,0)
            
        } else if (k === 'setEnding()') {
            
            answer = o.setHours(23,59,59,999)
            
        } else if (k === 'setTime()') {
            
            answer = new Date().setTime(o)
            
        } else if (k === 'getTime()') {
            
            answer = o.getTime()
            
        } else if (k === 'getDateTime()') {
            
            answer = getDateTime({ VALUE, STATE, id, e, params: { time: o } })

        } else if (k === 'exist()' || k === 'exists()') {
            
            answer = o !== undefined ? true : false
            
        } else if (k === 'notexist()' || k === 'notExist()') {
            
            answer = !o ? true : false
            
        } else if (k === 'flat()') {
            
            answer = Array.isArray(o) ? o.flat() : o
            
        } else if (k === 'filter()') {
            
            breakRequest = i + 1
            var cond = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params}, _ })
            if (!cond) answer = o.filter(o => o !== undefined)
            else answer = o.filter(o => o === cond)
            
        } else if (k.includes('filterById()')) {

            breakRequest = i + 1
            if (k[0] === "_") answer = o.filter(_ => toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } }))
            else {
                var _id = toArray(toValue({ VALUE, STATE, id, e, _, params: {value: path[i + 1], params} }))
                answer = o.filter(_ => _id.includes(_.id))
            }

        } else if (k === 'find()') {

            breakRequest = i + 1
            var found = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} , _})
            answer = o.find(data => isEqual(found, data))

            // last index & value
            var index = o.findIndex(data => isEqual(found, data))
            if (index === -1) index = o.length
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findById()') {

            breakRequest = i + 1
            // get id
            var _id = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1], params} , _})
            answer = o.find(data => data.id === _id)

            /*if (!answer) {
                o.push({ id : _id })
                answer = o[o.length - 1]
            }*/

            // last index & value
            var index = o.findIndex(data => data.id === _id)
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findByName()') {

            breakRequest = i + 1
            // get id
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            
            answer = o.find(data => data.name === name)
            
            if (!answer) {
                o.push({ name })
                answer = o[o.length - 1]
            }

            var index = o.findIndex(data => data.name === name)
            // last index & value
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k === 'findByNameEn()') {

            breakRequest = i + 1
            // get id
            var name = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            
            answer = o.find(data => data.name.en === name)
            
            if (!answer) {
                o.push({ name: {en: name} })
                answer = o[o.length - 1]
            }

            var index = o.findIndex(data => data.name.en === name)
            // last index & value
            if (key && value && (i + 1 === lastIndex)) answer = o[index] = value
            
        } else if (k.includes('map()')) {
            
            breakRequest = i + 1
            if (k[0] === "_") answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _: o, e }) )
            else answer = o.map(o => reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], object: o, value, key, params }, _, e }) )

        } else if (k === 'index()') {
            
            var element = VALUE[o.parent].element
            if (!element) answer = o.mapIndex
            else { 
                var children = [...element.children]
                var index = children.findIndex(child => child.id === o.id)
                if (index > -1) answer = index
                else answer = 0
            }
            
        } else if (k === 'getDeepChildrenId()') {

            answer = getDeepChildrenId({ VALUE, id: o.id })
            
        } else if (k === 'action()') {
            
            answer = execute({ VALUE, STATE, id, actions: path[i - 1], params, e })
            
        } else if (k === 'toPrice()') {
            
            answer = o = toPrice(toNumber(o))
            
        } else if (k === 'toNumber()') {

            answer = toNumber(o)
            
        } else if (k === 'toString()') {
            
            answer = o + ""
            
        } else if (k === '1stIndex()' || k === 'firstIndex()') {
            
            if (value !== undefined && key) answer = o[0] = value
            answer = o[0]

        } else if (k === '2ndIndex()' || k === 'secondIndex()') {
            
            if (value !== undefined && key) answer = o[1] = value
            answer = o[1]

        } else if (k === '3rdIndex()' || k === 'thirdIndex()') {
            
            if (value !== undefined && key) answer = o[2] = value
            answer = o[2]

        } else if (k === '3rdLastIndex()' || k === '3rdlastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 3] = value
            answer = o[o.length - 3]
            
        } else if (k === '2ndLastIndex()' || k === '2ndlastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 2] = value
            answer = o[o.length - 2]
            
        } else if (k === 'lastIndex()') {

            if (value !== undefined && key) answer = o[o.length - 1] = value
            answer = o[o.length - 1]
            
        } else if (k === '!lastIndex()') {

            o = o.slice(0, -1)
            if (value !== undefined && key) o = value
            answer = o
            
        } else if (k === 'parseFloat()') {
            
            answer = parseFloat(o)

        } else if (k === 'parseInt()') {
            
            answer = parseInt(o)

        } else if (k === 'stringify()') {
            
            answer = JSON.stringify(o)

        } else if (k === 'parse()') {
            
            answer = JSON.parse(o)

        } else if (k === 'split()') {
            
            breakRequest = i + 1
            var splited = toValue({ VALUE, STATE, id, e, _, params: { value: path[i + 1], params } })
            answer = o.split(splited)

        } else if (k === 'type()') {
            
            if (typeof o === 'string') answer = 'string'
            else if (typeof o === 'boolean') answer = 'boolean'
            else if (typeof o === 'object' && Array.isArray(o)) answer = 'array'
            else if (typeof o === 'object') answer = 'object'
            else if (typeof o === 'undefined') answer = 'undefined'
            
        } else if (k === 'join()') {
            
            breakRequest = i + 1
            var joiner = toValue({ VALUE, STATE, id, e, params: {value: path[i + 1] || '', params} , _})
            answer = o.join(joiner)
            
        } else if (k === 'clean()') {
            
            answer = o.filter(o => o !== undefined && !Number.isNaN(o) && o !== '')
            
        } else if (k === 'preventDefault()') {
            
            answer = e.preventDefault()

        } else if (k === '()') {

            answer = VALUE[o]

        } else if (k === 'isChildOf()') {
            
            breakRequest = i + 1
            var el = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            answer = isEqual(el, o)

        } else if (k === 'isChildOfId()') {
            
            breakRequest = i + 1
            var _id = reducer({ VALUE, STATE, id, params: { path: [path[i + 1]], value, key, params }, _, e })
            var _ids = Object.keys(getDeepChildren({ VALUE, id: _id }))
            answer = _ids.find(_id => _id === o)

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
                event: `loaded?${key}=${value}`
            })
            
        } else if (k === 'length' && !local.length && i === 0) {
            
            answer = VALUE[local.parent].element.children.length

        } else if (i === lastIndex - 1 && path[lastIndex] === 'delete()') {
            
            breakRequest = i + 1
            if (Array.isArray(o)) {

                o.splice(k, 1)

            } else delete o[k]
            answer = o

        } else if (key && value !== undefined && i === lastIndex) {
            
            answer = o[k] = value

        } else if (key && o[k] === undefined && i !== lastIndex) {

            if (!isNaN(path[i + 1])) answer = o[k] = []
            else answer = o[k] = {}

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

const getDeepChildrenId = ({ VALUE, id }) => {
    var all = [id]
    if (!VALUE[id]) return []
    
    if ([...VALUE[id].element.children].length > 0) 
        ([...VALUE[id].element.children]).map(el => {

            if ([...VALUE[el.id].element.children].length > 0) 
                all.push(...getDeepChildren({ VALUE, id }))

            else all.push(el.id)
        })
    return all
}

module.exports = { reducer, getDeepChildren, getDeepChildrenId }
},{"./capitalize":31,"./clone":33,"./execute":50,"./generate":55,"./getDateTime":56,"./isEqual":60,"./toArray":87,"./toCode":90,"./toNumber":95,"./toPrice":98,"./toValue":102}],72:[function(require,module,exports){
const {removeIds} = require("./update");
const {clone} = require("./clone");
const {reducer} = require("./reducer");

const remove = ({STATE, VALUE, params, id}) => {
  const local = VALUE[id];
  if (!params) params = {};

  const keys = clone(local.derivations);
  let path = params.path ? params.path(".") : [];

  // convert string numbers paths to num
  if (path.length > 0) {
    path = path.map((k) => {
      if (!isNaN(k)) k = parseFloat(k);
      return k;
    });
  }
  
  if (params.path) keys.push(...path);
  if (keys.length > 0) {
    keys.push("delete()")

    // delete
    if (keys.length > 0) {
      reducer({
        VALUE,
        STATE,
        id,
        params: {path: keys, object: STATE[local.Data]},
      });
    }
  }

  removeIds({VALUE, id});

  // reset length and derivations
  let nextSibling = false;
  const children = [...VALUE[local.parent].element.children];
  const index = local.derivations.length - 1;

  children.map((child) => {
    const id = child.id;
    VALUE[id].length -= 1;

    // derivation in array of next siblings must decrease by 1
    if (nextSibling) resetDerivations({VALUE, id, index});

    if (id === local.id) {
      nextSibling = true;
      local.element.remove();
      delete VALUE[id];
    }
  });
};

const resetDerivations = ({VALUE, id, index}) => {
  if (!VALUE[id]) return;
  VALUE[id].derivations[index] -= 1;

  const children = [...VALUE[id].element.children];
  children.map((child) => {
    const id = child.id;
    resetDerivations({VALUE, id, index});
  });
};

module.exports = {remove};

},{"./clone":33,"./reducer":71,"./update":104}],73:[function(require,module,exports){
const removeDuplicates = (object) => {
  if (typeof object === "string" || typeof object === "number" || !object) {
    return object;
  }

  if (Array.isArray(object)) {
    if (object.length === 0) return [];
    return (object = [removeDuplicates(object[0])]);
  }

  if (typeof object === "object") {
    Object.entries(object).map(([key, value]) => {
      object[key] = removeDuplicates(value);
    });

    return object;
  }
};

module.exports = {removeDuplicates};

},{}],74:[function(require,module,exports){
const resize = ({VALUE, id}) => {
  var local = VALUE[id];
  if (!local) return;

  if (local.type !== "Input") return;

  const results = dimensions({VALUE, id});

  // for width
  const width = local.style.width;
  if (width === "fit-content") {
    if (local.element) {

      if (!local.style || (local.style && !local.style.minWidth)) {
        local.element.style.width = results.width + "px";
      } else if (converter(local.style.minWidth) > results.width) {
        local.element.style.width = local.style.minWidth;
      } else local.element.style.width = results.width + "px";

      // templated
      if (local.templated) {
        var local = VALUE[VALUE[id].parent];

        if (!local.style || (local.style && !local.style.minWidth)) {
          local.element.style.width = results.width + "px";
        } else if (converter(local.style.minWidth) > results.width) {
          local.element.style.width = local.style.minWidth;
        } else local.element.style.width = results.width + "px";
      }
    } else results.width + "px";
  } else local.style.width;

  // for height
  const height = local.style.height;
  if (height === "fit-content") {
    
    if (local.element) {

      if (!local.style || (local.style && !local.style.minHeight)) {
        local.element.style.height = results.height + "px";
      } else if (converter(local.style.minHeight) > results.height) {
        local.element.style.height = local.style.minHeight;
      } else local.element.style.height = results.height + "px";

      // templated
      if (local.templated) {
        var local = VALUE[VALUE[id].parent];

        if (!local.style || (local.style && !local.style.minHeight)) {
          local.element.style.height = results.height + "px";
        } else if (converter(local.style.minHeight) > results.height) {
          local.element.style.height = local.style.minHeight;
        } else local.element.style.height = results.height + "px";
      }
    } else results.height + "px";
  } else local.style.height;
};

const dimensions = ({VALUE, id, params = {}}) => {
  const local = VALUE[id]
  if (!local) return

  let lDiv = document.createElement("div")
  document.body.appendChild(lDiv)

  const pStyle = local.style
  const pText = params.text || (local.input && local.element.value) || "A"
  const pFontSize = pStyle.fontSize
  
  if (pStyle != null) lDiv.style = pStyle

  lDiv.style.fontSize = pFontSize
  lDiv.style.position = "absolute"
  lDiv.style.left = -1000
  lDiv.style.top = -1000
  lDiv.style.padding = pStyle.padding
  lDiv.style.maxWidth = pStyle.maxWidth
  lDiv.style.maxHeight = pStyle.maxHeight
  lDiv.style.transform = pStyle.transform
  lDiv.style.display = "flex"
  lDiv.style.flexWrap = "wrap"

  if (pStyle.width === "100%") {
    lDiv.style.width = local.element.clientWidth + "px"
  }
  lDiv.style.width = (lDiv.clientWidth + 2) + "px"

  lDiv.innerHTML = pText

  const lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  }

  document.body.removeChild(lDiv)
  lDiv = null

  return lResult
}

const converter = (dimension) => {
  if (!dimension) return 0
  if (dimension.includes("rem")) return parseFloat(dimension) * 10
  if (dimension.includes("px")) return parseFloat(dimension)
}

module.exports = {resize, dimensions}

},{}],75:[function(require,module,exports){
/*const axios = require("axios");

const save = async ({ VALUE, STATE, params = {}, id, e }) => {
  var local = VALUE[id];
  if (!local) return;

  var save = params.save;

  var { data: { data, message, success } } = await axios.post(`/api/${save.path}`, save.data)

  local.save = { data, message, success };

  console.log(data, message, success);

  // await params
  toAwait({ VALUE, STATE, id, e, params });
};

module.exports = { save };*/
const { capitalize } = require("./capitalize");
const { toAwait } = require("./toAwait");

module.exports = {
  save: async ({ VALUE, STATE, params = {}, id, e }) => {
        
    var local = VALUE[id]
    var save = params.save
    var collection = save.path
    var ref = STATE.db.collection(collection)
    
    ref.doc(save.data.id).set(save.data).then(() => {

      local.save = {
        data: save.data,
        success: true,
        message: `${capitalize(collection)} saved successfuly!`,
      }
            
      console.log(local.save)
                  
      // await params
      toAwait({ VALUE, STATE, id, e, params })
    })
    .catch(error => {

      local.save = {
          success: false,
          message: error,
      }
      
      console.log(local.save)
    })
  }
}
},{"./capitalize":31,"./toAwait":88}],76:[function(require,module,exports){
/*const axios = require('axios')
const { toString } = require('./toString')

module.exports = {
    search: async ({ VALUE, STATE, id, e, params }) => {

        var local = VALUE[id]
        if (!local) return
        
        var search = params.search
        var { data: { data, message, success } } = await axios.get(`/api/${search.path}${search.options ? `/${toString(search.options)}` : ''}`)

        local.search = { data, message, success }
        
        console.log(data, message, success)
                    
        // await params
        toAwait({ VALUE, STATE, id, e, params })
    }
}*/

const { capitalize } = require("./capitalize")
const { keys } = require("./keys")
const { toAwait } = require('./toAwait')
const { toFirebaseOperator } = require("./toFirebaseOperator")

module.exports = {
    search: async ({ VALUE, STATE, id, e, params }) => {
        
        var local = VALUE[id]
        var search = params.search
        var collection = search.path
        var ref = STATE.db.collection(collection)

        if (collection !== 'admin') {
            search.limit = !search.limit ? 25 : search.limit
            search.orderBy = !search.orderBy ? "creation-date" : search.orderBy
            if (search.orderBy === "creation-date") 
            search.startAfter = !search.startAfter ? "0" : search.startAfter
        }
        
        // search fields
        if (search.fields)
        Object.entries(search.fields).map(([key, value]) => {
    
            var operator = keys(value)[0]
            ref = ref.where(key, toFirebaseOperator(operator), value[operator])
        })
        
        if (search.orderBy) ref = ref.orderBy(search.orderBy)
        if (search.limit) ref = ref.limit(search.limit)
        if (search.offset) ref = ref.endAt(search.offset)
        if (search.limitToLast) ref = ref.limitToLast(search.limitToLast)
    
        if (search.startAt) ref = ref.startAt(search.startAt)
        if (search.startAfter) ref = ref.startAfter(search.startAfter)
    
        if (search.endAt) ref = ref.endAt(search.endAt)
        if (search.endBefore) ref = ref.endBefore(search.endBefore)

        // push options to STATE
        STATE[`${local.Data}-options`] = STATE[`${local.Data}-options`] || {}
        STATE[`${local.Data}-options`].search = search
    
        // retrieve data
        var data = []
        var snapshot = ref.get()
        
        snapshot.then(query => {
            
            query.forEach(doc => data.push(doc.data()))
        
            local.search = {
                data,
                success: true,
                message: `${capitalize(search.path)} mounted successfuly!`
            }
            
            console.log(local.search)
                        
            // await params
            toAwait({ VALUE, STATE, id, e, params })
        })
        .catch(error => {
    
            local.search = {
                success: false,
                message: error,
            }
            
            console.log(local.search)
        })
    }
}
},{"./capitalize":31,"./keys":62,"./toAwait":88,"./toFirebaseOperator":93}],77:[function(require,module,exports){
const {isArabic} = require("./isArabic");

const setContent = ({VALUE, STATE, params = {}, id}) => {
  const local = VALUE[id];

  const content = params.content || {};
  const value = content.value || "";

  if (typeof value !== "string" && typeof value !== "number") return;

  // not loaded yet
  if (!local.element) return;
  if (local.input && local.input.type === "radio") {
    if (value) local.element.checked = "checked";
  }
  if (local.type === "Input" || local.type === "Textarea") {
    local.element.value = value || "";
  } else if (
    local.type === "Text" ||
    local.type === "Label" ||
    local.type === "Header"
  ) {
    local.element.innerHTML = value || "";
  } else if (local.type === "UploadInput") local.element.value = value || null;

  isArabic({VALUE, params: {value}, id});
};

module.exports = {setContent};

},{"./isArabic":59}],78:[function(require,module,exports){
const {clone} = require("./clone");
const {reducer} = require("./reducer");
const {setContent} = require("./setContent");

const setData = ({STATE, VALUE, params = {}, id}) => {
  const local = VALUE[id];
  if (!STATE[local.Data]) return;

  const data = params.data;
  let path = data.path;

  // defualt value
  let defValue = data.value;
  if (defValue === undefined) defValue = "";

  // path
  if (path) path = path.split(".");
  else path = [];

  // convert string numbers paths to num
  path = path.map((k) => {
    if (!isNaN(k)) k = parseFloat(k);
    return k;
  });

  // keys
  const derivations = clone(local.derivations);
  const keys = [...derivations, ...path];

  // set value
  const value = reducer({
    VALUE,
    STATE,
    id,
    params: {
      object: STATE[local.Data],
      path: keys,
      value: defValue,
      key: true,
    },
  });
  local.data = value;

  if (local.input && local.input.type === "file") return;

  // setContent
  const content = data.content || value;

  setContent({VALUE, params: {content: {value: content}}, id});
};

module.exports = {setData};

},{"./clone":33,"./reducer":71,"./setContent":77}],79:[function(require,module,exports){
const setElement = ({ VALUE, id }) => {

    var local = VALUE[id]
    if (!local) return delete VALUE[id]

    // status
    local.status = "Mounting Element"
    
    local.element = document.getElementById(id)
    if (!local.element) return delete VALUE[id]

    // run starter for children
    var children = [...local.element.children]
    
    children.map(el => {
        const id = el.id
        if (!id) return
        setElement({ VALUE, id })
    })
}
    
module.exports = {setElement}
},{}],80:[function(require,module,exports){
const setPosition = ({ VALUE, params, id }) => {

  var position = params.position
  var element = VALUE[id].element
  var fin = element.getElementsByClassName("fin")[0]

  if (!VALUE[position.positioner]) return
  var positioner = VALUE[position.positioner].element
  
  // set height to fit content
  element.style.height = VALUE[element.id].style.height

  var top 
  var left 
  var bottom 
  var distance 
  var placement
  var height = element.offsetHeight
  var width = element.offsetWidth

  placement = element.placement || position.placement || "right"
  distance = parseFloat(element.distance || position.distance || 10)

  if (placement === "right") {
    left = positioner.getBoundingClientRect().right + distance
    top =
      positioner.getBoundingClientRect().top +
      positioner.clientHeight / 2 -
      height / 2
      
    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "-0.5rem"
      fin.style.top = "unset"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0 0 0.4rem"
    }

  } else if (placement === "left") {
    
    left = positioner.getBoundingClientRect().left - distance - width
    top =
      positioner.getBoundingClientRect().top +
      positioner.clientHeight / 2 -
      height / 2
      
    if (fin) {
      fin.style.right = "-0.5rem"
      fin.style.left = "unset"
      fin.style.top = "unset"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0.4rem 0 0"
    }
  } else if (placement === "top") {
    top = positioner.getBoundingClientRect().top - height - distance
    left =
      positioner.getBoundingClientRect().left +
      positioner.clientWidth / 2 -
      width / 2

    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "unset"
      fin.style.top = "unset"
      fin.style.bottom = "-0.5rem"
      fin.style.borderRadius = "0 0 0.4rem 0"
    }
  } else if (placement === "bottom") {
    top = positioner.getBoundingClientRect().top + positioner.clientHeight + 10
    left =
      positioner.getBoundingClientRect().left +
      positioner.clientWidth / 2 -
      width / 2

    if (fin) {
      fin.style.right = "unset"
      fin.style.left = "unset"
      fin.style.top = "-0.5rem"
      fin.style.bottom = "unset"
      fin.style.borderRadius = "0 0.4rem 0 0"
    }
  }

  bottom = top + height

  if (top - 10 < 0) {

    if (fin) fin.style.top = height / 2 - 5 - 10 + top + "px"

    element.style.top = 10 + 'px'
    element.style.bottom = (10 + height) + 'px'
    
    if (20 + height >= window.innerHeight) {
      element.style.height = 'initial'
      element.style.bottom = 10 + "px"
    }

  } else if (bottom + 10 > window.innerHeight) {

    if (fin) fin.style.top = height / 2 - (fin ? 5 : 0) + 10 + bottom - window.innerHeight + "px"
    
    element.style.bottom = 10 + 'px'
    element.style.top = (window.innerHeight - 10 - height) + 'px'
    
    if (window.innerHeight - 20 - height <= 0) {
      element.style.height = 'initial'
      element.style.top = 10 + "px"
    }

  } else {
    element.style.top = top + 'px'
    element.style.bottom = bottom
  }

  element.style.left = left + "px"
  if (fin) fin.style.top = "unset"
}

module.exports = {setPosition}

},{}],81:[function(require,module,exports){
const {reducer} = require("./reducer")
const {toAwait} = require("./toAwait")
const {toNumber} = require("./toNumber")

const sort = ({VALUE, STATE, params = {}, id, e}) => {
  var local = VALUE[id]
  if (!local) return

  var sort = params.sort || {}
  var Data = sort.Data || local.Data
  var options = STATE[`${Data}-options`]
  var data = sort.data || STATE[Data]

  options.sort = options.sort === "ascending" ? "descending" : "ascending"
  var path = (sort.path || "").split(".")
  let isDate = false

  data.sort((a, b) => {
    a = reducer({VALUE, STATE, id, params: {path, object: a}}) || "!"
    if (a !== undefined) {
      a = a.toString()

      // date
      if (a.split("-")[2] && !isNaN(a.split("-")[2].split("T")[0])) {
        var year = parseInt(a.split("-")[2].split("T")[0])
        var month = parseInt(a.split("-")[1])
        var day = parseInt(a.split("-")[0])
        a = {year, month, day}
        isDate = true
      }

      // number
      else a = toNumber(a)
    }

    b = reducer({VALUE, STATE, id, params: {path, object: b}}) || "!"
    if (b !== undefined) {
      b = b.toString()

      // date
      if (b.split("-")[2] && !isNaN(b.split("-")[2].split("T")[0])) {
        var year = parseInt(b.split("-")[2].split("T")[0])
        var month = parseInt(b.split("-")[1])
        var day = parseInt(b.split("-")[0])
        b = {year, month, day}
        isDate = true
      }

      // number
      else b = toNumber(b)
    }

    if ((!isNaN(a) && b === "!") || (!isNaN(b) && a === "!")) {
      if (a === "!") a = 0
      else if (b === "!") b = 0
    }

    if ((!isNaN(a) && isNaN(b)) || (!isNaN(b) && isNaN(a))) {
      a = a.toString()
      b = b.toString()
    }

    if (options.sort === "ascending") {
      if (isDate) {
        if (b.year === a.year) {
          if (b.month === a.month) {
            if (a.day === b.day) return 0
            else if (a.day > b.day) return 1
            else return -1
          } else {
            if (a.month > b.month) return 1
            else return -1
          }
        } else {
          if (a.year > b.year) return 1
          else return -1
        }
      }

      if (!isNaN(a) && !isNaN(b)) return b - a

      if (a < b) return -1
      return a > b ? 1 : 0
    } else {
      if (isDate) {
        if (b.year === a.year) {
          if (b.month === a.month) {
            if (a.day === b.day) return 0
            else if (a.day < b.day) return 1
            else return -1
          } else {
            if (a.month < b.month) return 1
            else return -1
          }
        } else {
          if (a.year < b.year) return 1
          else return -1
        }
      }

      if (!isNaN(a) && !isNaN(b)) return a - b

      if (b < a) return -1
      return b > a ? 1 : 0
    }
  })

  STATE[Data] = data

  // await params
  toAwait({VALUE, STATE, id, e, params})
}

module.exports = {sort}

},{"./reducer":71,"./toAwait":88,"./toNumber":95}],82:[function(require,module,exports){
const control = require("../control/control")
const {toArray} = require("./toArray")

const starter = ({ STATE, VALUE, id }) => {
  
  const {defaultEventHandler} = require("./event")
  const {setStyle} = require("./style")
  const {controls} = require("./controls")
  const {defaultInputHandler} = require("./defaultInputHandler")
  const {isArabic} = require("./isArabic")

  var local = VALUE[id]
  if (!local) return

  // status
  local.status = "mounting"

  /* Defaults must start before controls */

  // arabic text
  isArabic({VALUE, id})

  // input handlers
  defaultInputHandler({VALUE, STATE, id})

  // mouseenter, click, mouseover...
  defaultEventHandler({VALUE, id})
  
  // on loaded image
  if (local.type === 'Image') local.element.src = local.src

  // prevent a tag from refreshing browser
  if (local.link) local.element.addEventListener("click", (e) => e.preventDefault())

  /* End of default handlers */

  // setStyles
  if (local.style) setStyle({VALUE, STATE, id, params: { style: local.style }})

  // lunch auto controls
  Object.entries(control).map(([type, control]) => {
    if (local[type]) {
      local.controls = toArray(local.controls)
      local.controls.push(...control({ VALUE, STATE, id, params: {controls: local[type]} }))
    }
  })

  // execute controls
  if (local.controls) controls({VALUE, STATE, id})

  // run starter for children
  const children = [...local.element.children]

  children.map((child) => {
    const id = child.id
    if (!id) return
    starter({ STATE, VALUE, id })
  })
}

module.exports = {starter}

},{"../control/control":18,"./controls":36,"./defaultInputHandler":44,"./event":49,"./isArabic":59,"./style":84,"./toArray":87}],83:[function(require,module,exports){
const setState = ({STATE, params}) => {
  // push states to route
  /* if (params.route) pushRoute({ params })

    console.log(STATE.asset, params);
    params.state &&
        Object.entries(params.state).map(([key, value]) => {
            STATE[key] = value
        })*/
};

module.exports = {setState};

},{}],84:[function(require,module,exports){
const {resize} = require("./resize");
const {toArray} = require("./toArray");

const setStyle = ({VALUE, params = {}, id}) => {
  const local = VALUE[id];
  if (!local) return;

  if (!local.style) local.style = {};
  if (!params.style) params.style = {};

  Object.entries(params.style).map(([key, value]) => {
    if (key === "after") return;
    let timer = 0;
    if (value || value === 0) value = value + "";

    if (value && value.includes(">>")) {
      timer = value.split(">>")[1];
      value = value.split(">>")[0];
    }

    const style = () => {
      // value = width || height
      if (value) {
        if (value === "width" || value.includes("width/")) {
          var divide = value.split("/")[1];
          value = local.element.clientWidth;
          if (divide) value = value / parseFloat(divide);

          value += "px";
        } else if (value === "height" || value.includes("height/")) {
          var divide = value.split("/")[1];
          value = local.element.clientHeight;
          if (divide) value = value / parseFloat(divide);

          value += "px";
        } else if (key === "left" && value === "center") {
          const width = local.element.offsetWidth;
          const parentWidth = VALUE[local.parent].element.clientWidth;

          value = parentWidth / 2 - width / 2 + "px";
        }
      }

      if (local.element) local.element.style[key] = value;
      else local.style[key] = value;
    };

    if (timer) {
      local[`${key}-timer`] = setTimeout(style, timer);
    } else style();

    if (key === "width") resize({VALUE, id});
  });
};

const resetStyles = ({VALUE, params, id}) => {
  const local = VALUE[id];
  if (!local.style || !local.style.after) return;

  local.afterStylesMounted = false;

  params = {style: {}};

  Object.entries(local.style.after).map(([key]) => {
    if (local.style[key] !== undefined) params.style[key] = local.style[key];
    else params.style[key] = null;
  });

  setStyle({VALUE, params, id});
};

const toggleStyles = ({VALUE, params, id}) => {
  const local = VALUE[id];

  if (local.afterStylesMounted) resetStyles({VALUE, params, id});
  else mountAfterStyles({VALUE, params, id});
};

const mountAfterStyles = ({VALUE, params, id}) => {
  const local = VALUE[id];
  if (!local.style || !local.style.after) return;

  local.afterStylesMounted = true;

  Object.entries(local.style.after).map(([key, value]) => {
    let timer = 0;
    value = value + "";
    if (value.includes(">>")) {
      timer = value.split(">>")[1];
      value = value.split(">>")[0];
    }

    const myFn = () => (local.element.style[key] = value);

    if (timer) local[`${key}-timer`] = setTimeout(myFn, timer);
    else {
      if (local.element) myFn();
      else {
        local.controls = toArray(local.controls);
        local.controls.push({
          event: `loaded?value.element.style.${key}=${value}`,
        });
      }
    }
  });
};

module.exports = {setStyle, resetStyles, toggleStyles, mountAfterStyles};

},{"./resize":74,"./toArray":87}],85:[function(require,module,exports){
const textarea = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;

  /* if (!local.textarea || local.type !== 'Input') return

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
};

module.exports = {textarea};

},{}],86:[function(require,module,exports){
const {isArabic} = require("./isArabic");
const {isEqual} = require("./isEqual");
const {generate} = require("./generate");
const {duplicates} = require("./duplicate");
const {overflow} = require("./overflow");
const {getParam} = require("./getParam");
const {toValue} = require("./toValue");
const {reducer} = require("./reducer");
const {toCode} = require("./toCode");

const toApproval = ({STATE, VALUE, e, string, params, id, _}) => {
  const mainId = id;

  if (!string || typeof string !== "string") return true;
  let approval = true;

  string.split(";").map((condition) => {
    if (approval) {
      var local = VALUE[mainId];
      id = mainId;

      // no condition
      if (condition === "") return;

      const eq = condition.includes("=");
      let gt = condition.includes(">");
      if (gt) {
        var test = condition.split("::");
        gt = test.find((exp) => exp.includes(">"));
      }
      const gte = condition.includes(">=");
      const lt = condition.includes("<");
      const lte = condition.includes("<=");
      let noOperator = false;

      if (!eq && !gt && !gte && !lt && !lte) noOperator = true;

      if (
        (eq && !gte && !lte) ||
        (!eq && !gt && !gte && !lt && !lte) ||
        noOperator
      ) {
        let minus; let plus; let times; let division; let notEqual;

        condition = condition.split("=");
        var key = condition[0];
        var value = condition[1];

        if (key && key.includes('coded()') && key.length === 12) key = STATE.codes[key]

        // ex: key1=string1=string2=string3
        if (condition[2]) {
          condition[1] = condition[1].split("||");

          // ex: key1=value1||key2=value2||key3=value3
          if (condition[1].length > 1) {
            condition[2] = condition.slice(2, condition.length).join("=");
            approval = toApproval({ VALUE, STATE, e, string: `${condition[0]}=${condition[1][0]}`, id, _ });
            if (approval) return;

            // approval isn't true yet => keep trying
            key = condition[1][1];
            value = condition.slice(2).join("=");
            string = `${key}=${value}`;
            return (approval = toApproval({VALUE, STATE, e, string, id, _}));
          }

          // ex: key=value1=value2=value3
          else {
            condition[2] = condition.slice(2, condition.length).join("=");

            // key!=value1!=value2!=value3
            if (key.slice(-1) === "!") {
              if (condition[2].slice(-1) === "!") {
                condition[2] = condition[2].slice(0, -1);
              }
            }

            approval = toApproval({ VALUE, STATE, e, string: `${key}=${condition[2]}`, id, _});
            if (!approval) return;

            // approval is true till now => keep going
            if (key.slice(-1) === "!") {
              if (value.slice(-1) === "!") value = value.slice(0, -1);
            }
          }
        } else if (value) {
          value = value.split("||");

          if (value.length === 1) value = value[0];
          else if (value[1]) {
            // ex: key1=value1||key2=value2...
            if (value[1].includes("=")) {
              var string = `${key}=${value[0]}`;
              approval = toApproval({VALUE, STATE, e, string, id, _});
              if (approval) return;

              string = value.slice(1).join("||");
              return (approval = toApproval({VALUE, STATE, e, string, id, _}));
            }

            // ex: key=value1||value2||value3
            value[1] = value.slice(1, value.length).join("||");
            var string = `${key}=${value[1]}`;
            approval = toApproval({VALUE, STATE, e, string, id, _});
            if (approval) return;

            // approval isn't true yet => keep trying
            value = value[0];
          }
        }

        if (key) {
          key = key.split("||");

          if (key.length === 1) key = key[0];
          // ex. key1||key2||key3=value
          else if (key[1]) {
            key[1] = key.slice(1, key.length).join("||");
            var string = `${key[1]}${value ? `=${value}` : ""}`;
            approval = toApproval({VALUE, STATE, e, string, id});
            if (approval) return;

            // approval isn't true yet => keep trying
            key = key[0];
          }
        }

        // operator has !
        if (key.includes("!")) {
          if (key.split("!")[0]) {
            if (value) notEqual = true;
            if (notEqual) key = key.split("!")[0];
          } else {
            // !key => study key without value
            value = undefined;
            key = key.split("!")[1];
            notEqual = true;
          }
        }

        // /////////////////// value /////////////////////

        if (value && value !== "undefined" && value !== "false") {
          value = toValue({VALUE, STATE, id: mainId, params: {value}, e, _});
        }

        // /////////////////// key /////////////////////

        // id
        if (key.includes("::")) {
          var newId = key.split("::")[1];
          key = key.split("::")[0];

          // id
          id = toValue({VALUE, STATE, id, params: {value: newId}, e, _});
        }

        var keygen = generate();
        var local = VALUE[id];
        if (!local) return (approval = false);

        // to path
        key = toCode({VALUE, STATE, id, string: key, e});
        var path = typeof key === "string" ? key.split(".") : [];

        // const
        if (path[0] === "const") {
          if (path[1] === "false" || path[1] === "undefined" || path[1] === "") {
            local[keygen] = false;
          } else local[keygen] = path.slice(1).join(".");
        } else if (key === "false" || key === "undefined") {
          local[keygen] = false;
        } else if (key === "true") local[keygen] = true;
        else if (path[1]) {
          local[keygen] = reducer({ VALUE, STATE, id, params: {path, value}, e, _});
        } else if (key === "isArabic") {
          const isInput = local.type === "Input" || local.type === "Textarea";
          const result = isArabic(
            isInput ? local.value : local.type === "Text" && local.text
          );
          local[keygen] = result;
        } else if (key === "duplicates") {
          const data = getParam(`?${params}`, "data=", false);
          local[keygen] = duplicates({STATE, VALUE, params: {data}, id});
        } else if (key === "overflow") {
          local[keygen] = overflow({VALUE, id})[0];
        } else local[keygen] = local[key];

        if (plus) value = value + plus;
        if (minus) value = value - minus;
        if (times) value = value * times;
        if (division) value = value / division;

        if (!local) return (approval = false);

        if (value === undefined) {
          approval = notEqual ? !local[keygen] : local[keygen];
        } else {
          if (value === "undefined") value = undefined;
          if (value === "false") value = false;
          if (value === "true") value = true;
          approval = notEqual ?
            !isEqual(local[keygen], value) :
            isEqual(local[keygen], value);
        }

        delete local[keygen];
      } else if (gt && !gte) {
        var local = VALUE[id];
        var key = "";
        var value = "";
        var test = condition.split("::");

        if (test[1]) {
          test.map((exp) => {
            if (exp.includes(">")) {
              exp = exp.split(">");
              key += exp[0];
              value += exp[1];
            } else if (!value) key += exp + "::";
            else value += "::" + exp;
          });
        } else {
          key = condition.split(">")[0];
          value = condition.split(">")[1];
        }

        // /////////////////// value /////////////////////

        value = toValue({VALUE, STATE, id: mainId, params: {value}, e, _});

        // /////////////////// key /////////////////////

        // id
        if (key.includes("::")) {
          var newId = key.split("::")[1];
          key = key.split("::")[0];

          // id
          id = toValue({VALUE, STATE, id, params: {value: newId}, e, _});
        }

        var local = VALUE[id];
        if (!local) return (approval = false);

        // to path
        key = toCode({VALUE, STATE, id, string: key, e});
        var path = typeof key === "string" ? key.split(".") : [];

        if (path[1]) {
          local[keygen] = reducer({
            VALUE,
            STATE,
            id,
            params: {path, value},
            e,
            _
          });
        }

        approval = local[keygen] > value;
        delete local[keygen];
      }
    } else return approval;
  });

  return approval;
};

module.exports = {toApproval};

},{"./duplicate":47,"./generate":55,"./getParam":58,"./isArabic":59,"./isEqual":60,"./overflow":66,"./reducer":71,"./toCode":90,"./toValue":102}],87:[function(require,module,exports){
const toArray = (data) => {
  return data !== undefined ? (Array.isArray(data) ? data : [data]) : [];
};

module.exports = {toArray};

},{}],88:[function(require,module,exports){
const {clone} = require("./clone");

module.exports = {
  toAwait: ({VALUE, STATE, id, e, params = {}}) => {
    if (!params.asyncer) return;

    const awaiter = clone(params.awaiter);
    const awaits = clone(params.await);

    delete params.asyncer;
    delete params.awaiter;
    delete params.await;

    const {execute} = require("./execute");
    const {toParam} = require("./toParam");
    
    if (awaits && awaits.length > 0) {
      toParam({VALUE, STATE, id, e, string: awaits.join(";")});
    }

    if (awaiter) execute({VALUE, STATE, id, e, actions: awaiter, params});
  },
};

},{"./clone":33,"./execute":50,"./toParam":96}],89:[function(require,module,exports){
module.exports = {
    toCSV: ({ VALUE, STATE, id, e, params = {} }) => {

        var file = params.file
        var data = file.data
        var fileName = file.name

        var CSV = ''
        //Set Report title in first row or line

        CSV += fileName + '\r\n\n'

        //This condition will generate the Label/Header
        var row = ""
        var keys = file.fields || []

        // get all keys
        if (keys.length === 0)
        data.slice(0, 5).map(data => {
            Object.keys(data).map(key => {
                if (!keys.includes(key)) keys.push(key)
            })
        })

        //This loop will extract the label from 1st index of on array
        keys.map(key => row += key + ',')

        row = row.slice(0, -1)

        // line break
        CSV += row + '\r\n'

        //1st loop is to extract each row
        data.map(d => {
            var row = ""

            //2nd loop will extract each column and convert it in string comma-seprated
            keys.map(k => row += '"' + d[k] + '",')

            row = row.slice(0, -1)

            //add a line break after each row
            CSV += row + '\r\n'
        })

        if (CSV == '') {
            alert("Invalid data")
            return
        }

        var blob = new Blob([CSV], { type: 'text/csv;charset=utf-8;' })

        if (navigator.msSaveBlob) { // IE 10+

            navigator.msSaveBlob(blob, fileName)

        } else {

            var link = document.createElement("a")
            if (link.download !== undefined) { // feature detection

                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob)
                link.setAttribute("href", url)
                link.style = "visibility:hidden"
                link.download = fileName + ".csv"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

            }
        }
    }
}
},{}],90:[function(require,module,exports){
const {generate} = require("./generate");

const toCode = ({VALUE, STATE, string, e, id}) => {
  var keys = string.split('[');

  if (keys.length === 1) return string;

  if (keys[1]) {
    var key = `coded()${generate()}`;
    var subKey = keys[1].split(']');

    // ex. [ [ [] [] ] ]
    while (subKey[0] === keys[1] && keys[2] !== undefined) {
      keys[1] += `${'['}${keys[2]}`;
      if (keys[1].includes(']') && keys[2]) keys[1] = toCode({VALUE, STATE, string: keys[1], e, id});
      keys.splice(2, 1);
      subKey = keys[1].split(']');
    }

    // ex. 1.2.3.[4.5.6
    if (subKey[0] === keys[1] && keys.length === 2) 
    return keys.join('[')

    if (subKey[0].includes(',')) subKey[0] = `[${subKey[0]}]`
    STATE.codes[key] = subKey[0];
    var value = key;

    var before = keys[0];
    subKey = subKey.slice(1);
    keys = keys.slice(2);
    var after = keys.join('[') ? `${'['}${keys.join('[')}` : "";

    string = `${before}${value}${subKey.join(']')}${after}`;
  }

  if (string.split('[')[1]) string = toCode({VALUE, STATE, string, e, id});

  // encode round brackets
  // string = toCode({ VALUE, STATE, string, e, id, roundBrackets: true })

  return string;
};

module.exports = {toCode};

},{"./generate":55}],91:[function(require,module,exports){
const {generate} = require("./generate");
const {toArray} = require("./toArray");

const toComponent = (obj) => {
  // class
  obj.class = obj.class || "";

  // id
  obj.id = obj.id || generate();

  // style
  obj.style = obj.style || {};
  obj.style.after = obj.style.after || {};

  // text
  obj.text = obj.text || "";

  // controls
  obj.controls = toArray(obj.controls);

  // children
  obj.children = obj.children || [];

  // model
  obj.featured = obj.featured && "featured";
  obj.model = obj.model || obj.featured || "classic";

  // component
  obj.component = true

  return obj;
};

module.exports = {toComponent};

},{"./generate":55,"./toArray":87}],92:[function(require,module,exports){
const {controls} = require("./controls");
const control = require("../control/control");

const toControls = ({VALUE, STATE, params, id}) => {
  const local = VALUE[id];
  if (!local) return;

  Object.entries(params).map(([type, param]) => {
    if (!control[type]) return;
    controls({
      VALUE,
      STATE,
      id,
      controls: control[type]({
        VALUE,
        STATE,
        params: {controls: param},
        id,
      }),
    });
  });
};

module.exports = {toControls};

},{"../control/control":18,"./controls":36}],93:[function(require,module,exports){
module.exports = {
    toFirebaseOperator: (string) => {
        if (!string || string === 'equal' || string === 'equals' || string === 'equalsTo' || string === 'equalTo') return '=='
        if (string === 'notEqual' || string === 'different') return '!='
        if (string === 'greaterOrEqual' || string === 'greaterorequal') return '>='
        if (string === 'lessOrEqual' || string === 'lessorequal') return '<='
        if (string === 'less' || string === 'lessthan' || string === 'lessThan') return '<'
        if (string === 'greater' || string === 'greaterthan' || string === 'greaterThan') return '>'
        if (string === 'contains' || string === 'contain') return 'array-contains'
        if (string === '!contains' || string === 'doesnotContain' || string === 'doesnotcontain') return 'array-contains-any'
        if (string === 'includes' || string === 'include') return 'in'
        if (string === '!includes' || string === 'doesnotInclude' || string === 'doesnotinclude') return 'not-in'
        else return string
    }
}
},{}],94:[function(require,module,exports){
const {clone} = require("./clone");
const {toValue} = require("./toValue");

const toId = ({VALUE, STATE, id, string, e}) => {
  if (typeof string === "object") return string;

  if (string) {
    string = string
        .split(";")
        .map((newId) =>
          toValue({VALUE, STATE, id, params: {value: newId}, e})
        )
        .flat();
  } else string = [id];

  if (string) string = clone(string);
  return string;
};

module.exports = {toId};

},{"./clone":33,"./toValue":102}],95:[function(require,module,exports){
module.exports = {
  toNumber: (string) => {
    
    if (typeof string === 'number')return string
    
    if (parseFloat(string) && (!isNaN(string.charAt(0)) || string.charAt(0) === '-')) {
      if (!isNaN(string.split(",").join(""))) {
        // is Price
        string = parseFloat(string.split(",").join(""));

      } else if (parseFloat(string).length === string.length) parseFloat(string)
    }

    return string;
  },
};

},{}],96:[function(require,module,exports){
const {toValue} = require("./toValue");
const {reducer} = require("./reducer");
const { toCode } = require("./toCode");
const { generate } = require("./generate");

const toParam = ({VALUE = {}, STATE, string, e, id}) => {
  var {toApproval} = require("./toApproval");

  var localId = id

  if (typeof string !== "string" || !string) return string || {};
  var params = {await: []};

  string.split(";").map((param) => {
    let key;
    let value;
    let id = localId;
    
    if (param.includes("=")) {
      var keys = param.split("=");
      key = keys[0];
      value = param.substring(key.length + 1);

    } else key = param
    
    
    // break
    if (params.break) return

    // await
    if (key.includes("await.")) {
      var awaiter = param.split("await.")[1];
      return params.await.push(awaiter);
    }
    
    value = toValue({VALUE, STATE, id, e, params: {value, params}});

    // condition not approved
    if (value === "*return*") return;

    id = localId;

    var keys = typeof key === "string" ? key.split(".") : [];

    // id
    if (key && key.includes("::")) {
      var newId = key.split("::")[1];
      key = key.split("::")[0];

      // id
      id = toValue({VALUE, STATE, id, params: {value: newId, params}, e});
    }

    // keys from brackets to dots
    key = toCode({ VALUE, STATE, string: key, e, id });

    // array id
    if (Array.isArray(id)) {
      id.slice(1).map(id => {
        var state = generate()
        STATE[state] = value
        toParam({ STATE, VALUE, id, e, string: `${key}=state.${state}` })
      })
      id = id[0]
    }

    // conditions
    if (key && key.includes("<<")) {
      
      var condition = key.split("<<")[1];
      var approved = toApproval({STATE, VALUE, id, e, string: condition});
      if (!approved) return;
      key = key.split("<<")[0];
    }

    // timer
    let timer;
    if (key && key.includes(">>")) {
      timer = key.split(">>")[1];
      key = key.split(">>")[0];
    }

    var path = typeof key === "string" ? key.split(".") : [];

    // object structure
    if (path && path.length > 1) {
      // mount state & value
      if (
        path[0] === "state" ||
        path[0] === "value" ||
        path[0] === "params" ||
        path[0] === "e" ||
        path[0] === "action" ||
        path[0] === "global" ||
        path[0] === "document" ||
        path[0] === "window" ||
        path[0] === "history"
      ) {
        var myFn = () => reducer({VALUE, STATE, id, params: {path, value, key, params}})
        if (timer) VALUE[localId][keys.join(".").split(">>")[0]] = setTimeout(myFn, timer);
        else myFn();
      } else {
        path.reduce((obj, key, index) => {
          if (obj[key] !== undefined) {
            if (index === path.length - 1) {
              // if key=value exists => mount the existing to local, then mount the new value to params
              path.reduce((o, k, i) => {
                if (i === path.length - 1) return (o[k] = value);
                return o[k] || {};
              }, VALUE[id]);

              return (obj[key] = value);
            }
          } else {
            if (index === path.length - 1) return (obj[key] = value);
            else obj[key] = {};
          }

          return obj[key];
        }, params);
      }

      key = path[0];
    } else params[key] = value;
  });

  return params;
};

function addDays(theDate, days) {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {toParam};

},{"./generate":55,"./reducer":71,"./toApproval":86,"./toCode":90,"./toValue":102}],97:[function(require,module,exports){
const toPath = ({VALUE, STATE, string, e, id}) => {
  /* const {toValue} = require("./toValue");
  let keys = [];
  const _keys = string.split("[");

  // is array
  if (!_keys[0] || _keys.length === 1) return string;

  // key1.[key2].
  _keys.map((k, i) => {
    if (i !== 0 && keys[keys.length - 1].slice(-1) === ".") {
      keys[keys.length - 1] += `[${k}`;
    } else keys.push(k);
  });

  // is array
  if (!keys[0] || keys.length === 1) return string;

  if (keys[1]) {
    let subKey = keys[1].split("]");

    // ex. [ [ [] [] ] ]
    while (subKey[0] === keys[1] && keys[2] !== undefined) {
      keys[1] += `[${keys[2]}`;
      if (keys[2]) keys[1] = toPath({VALUE, STATE, string: keys[1], e, id});
      keys.splice(2, 1);
      subKey = keys[1].split("]");
    }

    const value = toValue({VALUE, STATE, params: {value: subKey[0]}, e, id});

    const before = keys[0];
    subKey = subKey.slice(1);
    keys = keys.slice(2);
    const after = keys.join("[") ? `[${keys.join("[")}` : "";

    string = `${before}.${value}${subKey.join("]")}${after}`;

    // a1,a2,a3 => a1.a2.a3
    string = string.split(",").join(".");
    if (string.includes("..")) string.replace("..", ".");
    if (string.slice(-1) === ".") string = string.slice(0, -1);
  }

  if (string.split("[")[1]) string = toPath({VALUE, STATE, string, e, id});  */

  return string;
};

module.exports = {toPath};

},{}],98:[function(require,module,exports){
module.exports = {
  toPrice: (string) => {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

},{}],99:[function(require,module,exports){
const toString = (object) => {
  if (!object) return "";

  let string = "";
  const length = Object.entries(object).length;

  Object.entries(object).map(([key, value], index) => {
    if (Array.isArray(value)) {
      string += `${key}=[${value.join(",")}]`;
    } else if (typeof value === "object") {
      const path = toString(value).split(";");
      string = path.map(path => `${key}.${path}`).join(";");
    } else string += `${key}=${value}`;

    if (index < length - 1) string += ";";
  });

  return string || "";
};

module.exports = {toString};

},{}],100:[function(require,module,exports){
module.exports = {
  toStyle: ({VALUE, STATE, id}) => {
    const local = VALUE[id];
    let style = "";

    if (local.style) {
      Object.entries(local.style).map(([k, v]) => {
        if (k === "after" || k.includes(">>")) return;
        else if (k === "verticalAlign") k = "vertical-align";
        else if (k === "borderBottom") k = "border-bottom";
        else if (k === "borderLeft") k = "border-left";
        else if (k === "borderRight") k = "border-right";
        else if (k === "borderTop") k = "border-top";
        else if (k === "marginBottom") k = "margin-bottom";
        else if (k === "marginLeft") k = "margin-left";
        else if (k === "marginRight") k = "margin-right";
        else if (k === "marginTop") k = "margin-top";
        else if (k === "fontSize") k = "font-size";
        else if (k === "fontWeight") k = "font-weight";
        else if (k === "lineHeight") k = "line-weight";
        else if (k === "textOverflow") k = "text-overflow";
        else if (k === "whiteSpace") k = "white-space";
        else if (k === "backgroundColor") k = "background-color";
        else if (k === "zIndex") k = "z-index";
        else if (k === "boxShadow") k = "box-shadow";
        else if (k === "borderRadius") k = "border-radius";
        else if (k === "zIndex") k = "z-index";
        else if (k === "alignItems") k = "align-items";
        else if (k === "alignSelf") k = "align-self";
        else if (k === "justifyContent") k = "justify-content";
        else if (k === "justifySelf") k = "justify-self";
        else if (k === "userSelect") k = "user-select";
        else if (k === "textAlign") k = "text-align";
        else if (k === "pointerEvents") k = "pointer-events";
        else if (k === "flexDirection") k = "flex-direction";
        else if (k === "flexGrow") k = "flex-grow";
        else if (k === "flexShrink") k = "flex-shrink";
        else if (k === "maxWidth") k = "max-width";
        else if (k === "minWidth") k = "min-width";
        else if (k === "maxHeight") k = "max-height";
        else if (k === "minHeight") k = "min-height";
        else if (k === "gridTemplateColumns") k = "grid-template-columns";
        else if (k === "gridAutoColumns") k = "grid-auto-columns";
        else if (k === "gridTemplateRows") k = "grid-template-rows";
        else if (k === "gridAutoRows") k = "grid-auto-columns";
        style += `${k}:${v}; `;
      });
    }

    return style;
  },
};

},{}],101:[function(require,module,exports){
const {toStyle} = require("./toStyle");
const {toArray} = require("./toArray");
const {generate} = require("./generate");
const {clone} = require("./clone");

module.exports = {
  toTag: ({STATE, VALUE, id}) => {

    var {createElement} = require("./createElement");
    var path = require("path");

    let tag;
    var local = VALUE[id];
    var style = toStyle({STATE, VALUE, id});

    // innerHTML
    var text = (local.text !== undefined && local.text.toString()) || (typeof local.data !== "object" && local.data) || ''
    var innerHTML = text
    var checked = local.input && local.input.type === "radio" && parseFloat(local.data) === parseFloat(local.input.defaultValue);

    if (local.children) {
      innerHTML = toArray(clone(local.children))
          .map((child, index) => {
            var id = child.id || generate();
            VALUE[id] = clone(child);
            VALUE[id].id = id;
            VALUE[id].index = index;
            VALUE[id].parent = local.id;

            return createElement({STATE, VALUE, id});
          })
          .join("");
    }
    
    var value = (local.input && local.input.value) !== undefined ?
        local.input.value :
        local.data !== undefined ?
        local.data : ""

    if (typeof value === 'object') value = ''

    if (local.type === "Image") local.src = local.src || local.data || "";

    if (local.type === "View") {
      tag = `<div class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</div>`;
    } else if (local.type === "Image") {
      tag = `<img class='${local.class}' alt='${local.src}' id='${local.id}' style='${style}'>`;
    } else if (local.type === "Table") {
      tag = `<table class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</table>`;
    } else if (local.type === "Row") {
      tag = `<tr class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</tr>`;
    } else if (local.type === "Header") {
      tag = `<th class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</th>`;
    } else if (local.type === "Cell") {
      tag = `<td class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</td>`;
    } else if (local.type === "Label") {
      tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${local["aria-label"] ? `aria-label="${local["aria-label"]}"` : ""} ${local.for ? `for="${local.for}"` : ""}>${innerHTML}</label>`;
    } else if (local.type === "Span") {
      tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`;
    } else if (local.type === "Text") {
      if (local.label) {
        tag = `<label class='${local.class}' id='${local.id}' style='${style}' ${local["aria-label"] ? `aria-label="${local["aria-label"]}"` : ""} ${local.for ? `for="${local.for}"` : ""}>${innerHTML}</label>`;
      } else if (local.h1) {
        tag = `<h1 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h1>`;
      } else if (local.h2) {
        tag = `<h2 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h2>`;
      } else if (local.h3) {
        tag = `<h3 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h3>`;
      } else if (local.h4) {
        tag = `<h4 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h4>`;
      } else if (local.h5) {
        tag = `<h5 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h5>`;
      } else if (local.h6) {
        tag = `<h6 class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</h6>`;
      } else if (local.span) {
        tag = `<span class='${local.class}' id='${local.id}' style='${style}'>${innerHTML}</span>`;
      } else {
        tag = `<p class='${local.class}' id='${local.id}' style='${style}'>${text}</p>`;
      }
    } else if (local.type === "Icon") {
      tag = `<i class='material-icons${local.outlined ? "-outlined" : local.rounded ? "-round" : local.sharp ? "-sharp" : local.twoTone ? "-two-tone" : ""} ${local.class || ""} ${local.icon.name}' id='${local.id}' style='${style}'>${local.google ? local.icon.name : ""}</i>`;
    } else if (local.type === "Textarea") {
      tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}' ${local.readonly ? "readonly" : ""} ${local.maxlength || ""}>${local.data || local.input.value || ""}</textarea>`;
    } else if (local.type === "Input") {
      if (local.textarea) {
        tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}' ${local.readonly ? "readonly" : ""} ${local.maxlength || ""}>${value}</textarea>`;
      } else {
        tag = `<input class='${local.class}' id='${local.id}' style='${style}' ${local.input.name ? `name="${local.input.name}"` : ""} ${local.input.accept ? `accept="${local.input.accept}/*"` : ""} type='${local.input.type || "text"}' ${local.placeholder ? `placeholder="${local.placeholder}"` : ""} ${value !== undefined ? `value="${value}"` : ""} ${local.readonly ? "readonly" : ""} ${local.input.min ? `min="${local.input.min}"` : ""} ${local.input.max ? `max="${local.input.max}"` : ""} ${local.input.defaultValue ? `defaultValue="${local.input.defaultValue}"` : ""} ${checked ? "checked" : ""} ${local.disabled ? "disabled" : ''}/>`;
      }
    } else if (local.type === "Paragraph") {
      tag = `<textarea class='${local.class}' id='${local.id}' style='${style}' placeholder='${local.placeholder || ""}'>${text}</textarea>`;
    }

    // linkable
    if (local.link) {
      var id = generate();
      tag = `<a id=${id} href=${local.link}>${tag}</a>`
      VALUE[id] = { id }
    }

    return tag
  },
};

},{"./clone":33,"./createElement":40,"./generate":55,"./toArray":87,"./toStyle":100,"path":3}],102:[function(require,module,exports){
const {generate} = require("./generate");
const {reducer} = require("./reducer");

const toValue = ({VALUE = {}, STATE, params: {value, params}, _, id, e}) => {
  const {toApproval} = require("./toApproval");

  var local = VALUE[id], minus = [], plus = [], times = [], division = []

  if (value && value.includes('coded()') && value.length === 12) value = STATE.codes[value]

  // return const value
  if (value && value.split("const.")[1] && !value.split("const.")[0]) {
    return value.split("const.")[1];
  }

  // _
  if (value === "_") return (value = _);

  // auto space
  if (value === "") return (value = "");

  // auto space
  if (value === "_dot") return (value = ".");

  // =
  if (value === "_equal") return (value = "=");

  // =
  if (value === "_equal_equal") return (value = "==");

  // auto space
  if (value === "&nbsp") return (value = "&nbsp;");

  // auto space
  if (value && value.includes("_question")) value = value.split("_question").join("?");

  // space
  if (value === " ") return (value = " ");

  if ( value && value.charAt(0) === "[" && value.charAt(value.length - 1) === "]" && value.slice(1, value.length - 1) ) {
    
    value = value.slice(1, value.length - 1)
    value = value.split(",").map((value) => toValue({VALUE, STATE, id, e, params: {value, params}, _}) )
    value = value.filter((value) => value !== undefined && value !== '')
    
  } else {

    // id
    if (value && value.includes("::")) {
      var newId = value.split("::")[1];
      id = toValue({ VALUE, STATE, id, params: { value: newId, params }, _, e })
      value = value.split("::")[0];
    }

    var local = VALUE[id];
    // if (!local) return value

    // value1 || value2 || value3
    if (value && value.includes("||")) {
      const values = value.split("||");
      value = undefined;

      values.map((val) => {
        if (
          value === undefined ||
          value === "" ||
          Number.isNaN(value) ||
          value === "*return*"
        ) {
          value = toValue({ VALUE, STATE, id, e, params: {value: val, params}, _ })
        }
      });

      return value;
    }

    // conditions
    if (value && value.includes("<<")) {
      var condition = value.split("<<")[1];
      var approved = toApproval({STATE, VALUE, id, e, string: condition, _});
      if (!approved) return "*return*";
      value = value.split("<<")[0];
    }

    if (value) {
      minus = value.split("--");
      plus = value.split("++");
      times = value.split("**");
      division = value.split("÷÷"); // hold Alt + 0247

      if (plus.length > 1) {
        value = plus[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        plus = plus.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, _, e})
        );
      } else if (minus.length > 1) {
        value = minus[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        minus = minus.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, _, e})
        );
      } else if (times.length > 1) {
        value = times[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        times = times.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, _, e})
        );
      } else if (division.length > 1) {
        value = division[0];
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
        division = division.map((value) =>
          toValue({VALUE, STATE, id, params: {params, value}, _, e})
        );
      } else {
        plus.shift();
        minus.shift();
        times.shift();
        division.shift();
      }
    }

    const path = typeof value === "string" ? value.split(".") : [];

    /* value */
    if (typeof value === "boolean") {}
    else if (!isNaN(value)) value = parseFloat(value);
    else if (value === undefined || value === "generate") value = generate();
    else if (path[0].includes("()")) value = reducer({ VALUE, STATE, id, e, params: {path, params, object: VALUE}, _ });
    else if (value === "undefined") value = false;
    else if (value === "input") value = local && local.element.value;
    else if (value === "false") value = false;
    else if (value === "true") value = true;
    else if (value === "['']") value = ['']
    else if (value === "''") value = "";
    else if (value === "{}") value = {};
    else if (value === "[]") value = [];
    else if (value === '[{}]') value = [{}]
    else if (value.includes("%20")) value = value.split("%20").join(" ");
    else if (value.includes("JSON.parse")) value = JSON.parse(value.split("JSON.parse(")[1].slice(0, -1));
    else if (value.includes("JSON.stringify")) value = JSON.stringify(value.split("JSON.stringify(")[1].slice(0, -1));
    else if (path[1]) value = reducer({VALUE, STATE, id, params: { path, value, params }, _, e});

    if (plus.length > 0) {
      plus.map((plus) => (value += plus));
    } else if (minus.length > 0) {
      minus.map((minus) => (value -= minus));
    } else if (times.length > 0) {
      times.map((times) => (value *= times));
    } else if (division.length > 0) {
      division.map((division) => (division /= plus));
    }
  }

  return value;
};

module.exports = {toValue};

},{"./generate":55,"./reducer":71,"./toApproval":86}],103:[function(require,module,exports){
module.exports = {
    toggleView: ({ VALUE, STATE, id, e, params }) => {
        const { execute } = require("./execute")
        var toggle = params.toggle
        
        var actions = [
            `setStyle::${toggle.id}?value.element.style.transition::${toggle.id}=transform .2s, opacity .05s;style.transform=translateY(-150%);style.opacity=0`,
            `setStyle>>400::${toggle.id}?style.transform=translateY(0);style.opacity=1`,
            `createView>>250::${toggle.id}?value.element.innerHTML::${toggle.id}='';value.Data::${toggle.id}=value.data();view=${toggle.view}`,
        ]

        execute({ VALUE, STATE, e, id, actions })
    }
}
},{"./execute":50}],104:[function(require,module,exports){
const {generate} = require("./generate");
const {starter} = require("./starter");
const {setElement} = require("./setElement");
const {toArray} = require("./toArray");
const {createElement} = require("./createElement");
const {clone} = require("./clone");

const update = ({STATE, VALUE, id}) => {
  const local = VALUE[id];
  if (!local) return;
  if (!local.element) return;

  // VALUE.body.element.style.pointerEvents = 'none'

  // remove id from VALUE
  removeIds({VALUE, id});
  local.element.style.opacity = "0";

  local.element.innerHTML = toArray(local.children)
      .map((child, index) => {
        const id = child.id || generate();
        VALUE[id] = clone(child);
        VALUE[id].id = id;
        VALUE[id].index = index;
        VALUE[id].parent = local.id;

        return createElement({STATE, VALUE, id});
      })
      .join("");

  setTimeout(() => {
    local.element.style.opacity = "1";

    const children = [...local.element.children];
    children.map((child) => {
      const id = child.id;
      setElement({VALUE, id});
      starter({STATE, VALUE, id});
    });

    // VALUE.body.element.style.pointerEvents = 'auto'
  }, 25);
};

const removeIds = ({VALUE, id}) => {
  const local = VALUE[id];
  if (!local.element) return;
  const children = [...local.element.children];

  children.map((child) => {
    const id = child.id;
    if (!VALUE[id]) return;

    // clear time out
    Object.entries(VALUE[id]).map(([key, value]) => {
      if (key.includes("-timer")) setTimeout(() => clearTimeout(value), 1000);
      if (key.includes("-watch")) clearTimeout(value);
    });

    removeIds({VALUE, id});
    delete VALUE[id];
  });
};

module.exports = {update, removeIds};

},{"./clone":33,"./createElement":40,"./generate":55,"./setElement":79,"./starter":82,"./toArray":87}],105:[function(require,module,exports){
const { capitalize } = require("./capitalize")
const { save } = require("./save")
const { toAwait } = require("./toAwait")

module.exports = {
    upload: async ({ VALUE, STATE, id, e, params = {} }) => {

        var local = VALUE[id]
        var storage = STATE.storage
        var upload = params.upload || {}
        upload.save = upload.save !== undefined ? upload.save : true
        
        await storage.child(`images/${local.file.fileName}.${local.file.fileType}`).put(local.file.src)
        await storage.child(`images/${local.file.fileName}.${local.file.fileType}`).getDownloadURL().then(url => local.file.url = url)
        
        local.file.id = `${local.file.fileName}.${local.file.fileType}`

        upload.save && await save({ VALUE, STATE, params: {...params, save: { path: "image", data: {
            "creation-date": new Date().getTime() + 10800000 + "", name: `${local.file.fileName}.${local.file.fileType}`, id: `${local.file.fileName}.${local.file.fileType}`, url: local.file.url, description: `${capitalize(local.file.fileName.split('-')[0])} Image`, active: true
        }}}, id, e })

        !upload.save && toAwait({ VALUE, STATE, id, params, e })
    }
}
},{"./capitalize":31,"./save":75,"./toAwait":88}],106:[function(require,module,exports){
module.exports = {
    values: (object) => {
        return Object.values(object)
    }
}
},{}],107:[function(require,module,exports){
const { toApproval } = require("./toApproval")
const { clone } = require("./clone")
const { toParam } = require("./toParam")
const { toValue } = require("./toValue")
const { isEqual } = require("./isEqual")

const watch = ({ VALUE, STATE, controls, id }) => {

    const { execute } = require("./execute")

    var local = VALUE[id]
    if (!local) return

    var watch = controls.watch.split('/?').join('_question')

    watch.split('?')[0].split(';').map(name => {

        var timer = 500
        if (name.includes('>>')) {
            timer = name.split('>>')[1]
            name = name.split('>>')[0]
        }

        local[`${name}-watch`] = toValue({ VALUE, STATE, id, params: { value: name } })

        const myFn = async () => {
            if (!VALUE[id]) return clearInterval(local[`${name}-timer`])
            
            var value = toValue({ VALUE, STATE, id, params: { value: name } })
            
            if ((value === undefined && local[`${name}-watch`] === undefined) 
            || isEqual(value, local[`${name}-watch`])) return

            local[`${name}-watch`] = clone(value)
            
            // approval
            var approved = toApproval({ VALUE, STATE, id, string: watch.split('?')[2] })
            if (!approved) return
            
            // params
            params = toParam({ VALUE, STATE, id, string: watch.split('?')[1] })
            
            // once
            if (params.once) clearInterval(local[`${name}-timer`])
            if (controls.actions) await execute({ VALUE, STATE, controls, id })
                
            // await params
            if (params.await) toParam({ VALUE, STATE, id, string: params.await.join(';') })
            if (local.once) clearInterval(local[`${name}-timer`])
        }

        if (local[`${name}-timer`]) clearInterval(local[`${name}-timer`])
        local[`${name}-timer`] = setInterval(myFn, timer)

    })
}

module.exports = {watch}
},{"./clone":33,"./execute":50,"./isEqual":60,"./toApproval":86,"./toParam":96,"./toValue":102}],108:[function(require,module,exports){
(function (process){(function (){
/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = require('fs')
const path = require('path')
const os = require('os')

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\r\n|\n|\r/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

function resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse

}).call(this)}).call(this,require('_process'))
},{"_process":4,"fs":1,"os":2,"path":3}]},{},[5]);
