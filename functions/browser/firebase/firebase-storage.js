!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app"))
    : "function" == typeof define && define.amd
    ? define(["@firebase/app"], t)
    : t(
        (e = "undefined" != typeof globalThis ? globalThis : e || self).firebase
      );
})(this, function (mt) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var o = e(mt),
        n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        };
      function t(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " + String(t) + " is not a constructor or null"
          );
        function r() {
          this.constructor = e;
        }
        n(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r()));
      }
      var i = function () {
        return (i =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var o in (t = arguments[r]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
      function l(e, a, s, u) {
        return new (s = s || Promise)(function (r, t) {
          function n(e) {
            try {
              i(u.next(e));
            } catch (e) {
              t(e);
            }
          }
          function o(e) {
            try {
              i(u.throw(e));
            } catch (e) {
              t(e);
            }
          }
          function i(e) {
            var t;
            e.done
              ? r(e.value)
              : ((t = e.value) instanceof s
                  ? t
                  : new s(function (e) {
                      e(t);
                    })
                ).then(n, o);
          }
          i((u = u.apply(e, a || [])).next());
        });
      }
      function h(r, n) {
        var o,
          i,
          a,
          s = {
            label: 0,
            sent: function () {
              if (1 & a[0]) throw a[1];
              return a[1];
            },
            trys: [],
            ops: [],
          },
          e = { next: t(0), throw: t(1), return: t(2) };
        return (
          "function" == typeof Symbol &&
            (e[Symbol.iterator] = function () {
              return this;
            }),
          e
        );
        function t(t) {
          return function (e) {
            return (function (t) {
              if (o) throw new TypeError("Generator is already executing.");
              for (; s; )
                try {
                  if (
                    ((o = 1),
                    i &&
                      (a =
                        2 & t[0]
                          ? i.return
                          : t[0]
                          ? i.throw || ((a = i.return) && a.call(i), 0)
                          : i.next) &&
                      !(a = a.call(i, t[1])).done)
                  )
                    return a;
                  switch (((i = 0), (t = a ? [2 & t[0], a.value] : t)[0])) {
                    case 0:
                    case 1:
                      a = t;
                      break;
                    case 4:
                      return s.label++, { value: t[1], done: !1 };
                    case 5:
                      s.label++, (i = t[1]), (t = [0]);
                      continue;
                    case 7:
                      (t = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (
                        !(a = 0 < (a = s.trys).length && a[a.length - 1]) &&
                        (6 === t[0] || 2 === t[0])
                      ) {
                        s = 0;
                        continue;
                      }
                      if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3]))) {
                        s.label = t[1];
                        break;
                      }
                      if (6 === t[0] && s.label < a[1]) {
                        (s.label = a[1]), (a = t);
                        break;
                      }
                      if (a && s.label < a[2]) {
                        (s.label = a[2]), s.ops.push(t);
                        break;
                      }
                      a[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  t = n.call(r, s);
                } catch (e) {
                  (t = [6, e]), (i = 0);
                } finally {
                  o = a = 0;
                }
              if (5 & t[0]) throw t[1];
              return { value: t[0] ? t[1] : void 0, done: !0 };
            })([t, e]);
          };
        }
      }
      function g(e, t) {
        for (var r = 0, n = t.length, o = e.length; r < n; r++, o++)
          e[o] = t[r];
        return e;
      }
      function r(e) {
        for (var t = [], r = 0, n = 0; n < e.length; n++) {
          var o = e.charCodeAt(n);
          o < 128
            ? (t[r++] = o)
            : (o < 2048
                ? (t[r++] = (o >> 6) | 192)
                : (55296 == (64512 & o) &&
                  n + 1 < e.length &&
                  56320 == (64512 & e.charCodeAt(n + 1))
                    ? ((o =
                        65536 +
                        ((1023 & o) << 10) +
                        (1023 & e.charCodeAt(++n))),
                      (t[r++] = (o >> 18) | 240),
                      (t[r++] = ((o >> 12) & 63) | 128))
                    : (t[r++] = (o >> 12) | 224),
                  (t[r++] = ((o >> 6) & 63) | 128)),
              (t[r++] = (63 & o) | 128));
        }
        return t;
      }
      var a = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
          },
          HAS_NATIVE_SUPPORT: "function" == typeof atob,
          encodeByteArray: function (e, t) {
            if (!Array.isArray(e))
              throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            for (
              var r = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                n = [],
                o = 0;
              o < e.length;
              o += 3
            ) {
              var i = e[o],
                a = o + 1 < e.length,
                s = a ? e[o + 1] : 0,
                u = o + 2 < e.length,
                c = u ? e[o + 2] : 0,
                l = ((15 & s) << 2) | (c >> 6),
                c = 63 & c;
              u || ((c = 64), a || (l = 64)),
                n.push(r[i >> 2], r[((3 & i) << 4) | (s >> 4)], r[l], r[c]);
            }
            return n.join("");
          },
          encodeString: function (e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(r(e), t);
          },
          decodeString: function (e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  for (var t = [], r = 0, n = 0; r < e.length; ) {
                    var o,
                      i,
                      a,
                      s = e[r++];
                    s < 128
                      ? (t[n++] = String.fromCharCode(s))
                      : 191 < s && s < 224
                      ? ((i = e[r++]),
                        (t[n++] = String.fromCharCode(
                          ((31 & s) << 6) | (63 & i)
                        )))
                      : 239 < s && s < 365
                      ? ((o =
                          (((7 & s) << 18) |
                            ((63 & (i = e[r++])) << 12) |
                            ((63 & (a = e[r++])) << 6) |
                            (63 & e[r++])) -
                          65536),
                        (t[n++] = String.fromCharCode(55296 + (o >> 10))),
                        (t[n++] = String.fromCharCode(56320 + (1023 & o))))
                      : ((i = e[r++]),
                        (a = e[r++]),
                        (t[n++] = String.fromCharCode(
                          ((15 & s) << 12) | ((63 & i) << 6) | (63 & a)
                        )));
                  }
                  return t.join("");
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray: function (e, t) {
            this.init_();
            for (
              var r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                n = [],
                o = 0;
              o < e.length;

            ) {
              var i = r[e.charAt(o++)],
                a = o < e.length ? r[e.charAt(o)] : 0,
                s = ++o < e.length ? r[e.charAt(o)] : 64,
                u = ++o < e.length ? r[e.charAt(o)] : 64;
              if ((++o, null == i || null == a || null == s || null == u))
                throw Error();
              n.push((i << 2) | (a >> 4)),
                64 !== s &&
                  (n.push(((a << 4) & 240) | (s >> 2)),
                  64 !== u && n.push(((s << 6) & 192) | u));
            }
            return n;
          },
          init_: function () {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (var e = 0; e < this.ENCODED_VALS.length; e++)
                (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                  (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                  (this.byteToCharMapWebSafe_[e] =
                    this.ENCODED_VALS_WEBSAFE.charAt(e)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                    e) >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                      e),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                      e));
            }
          },
        },
        s = function (e) {
          return (function (e) {
            e = r(e);
            return a.encodeByteArray(e, !0);
          })(e).replace(/\./g, "");
        };
      var u,
        c = "FirebaseError",
        p = (t(f, (u = Error)), f);
      function f(e, t, r) {
        t = u.call(this, t) || this;
        return (
          (t.code = e),
          (t.customData = r),
          (t.name = c),
          Object.setPrototypeOf(t, f.prototype),
          Error.captureStackTrace &&
            Error.captureStackTrace(t, d.prototype.create),
          t
        );
      }
      var d =
        ((_.prototype.create = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          var n,
            o = t[0] || {},
            i = this.service + "/" + e,
            e = this.errors[e],
            e = e
              ? ((n = o),
                e.replace(b, function (e, t) {
                  var r = n[t];
                  return null != r ? String(r) : "<" + t + "?>";
                }))
              : "Error",
            e = this.serviceName + ": " + e + " (" + i + ").";
          return new p(i, e, o);
        }),
        _);
      function _(e, t, r) {
        (this.service = e), (this.serviceName = t), (this.errors = r);
      }
      var b = /\{\$([^}]+)}/g;
      function v(e) {
        return e && e._delegate ? e._delegate : e;
      }
      var y =
        ((m.prototype.setInstantiationMode = function (e) {
          return (this.instantiationMode = e), this;
        }),
        (m.prototype.setMultipleInstances = function (e) {
          return (this.multipleInstances = e), this;
        }),
        (m.prototype.setServiceProps = function (e) {
          return (this.serviceProps = e), this;
        }),
        (m.prototype.setInstanceCreatedCallback = function (e) {
          return (this.onInstanceCreated = e), this;
        }),
        m);
      function m(e, t, r) {
        (this.name = e),
          (this.instanceFactory = t),
          (this.type = r),
          (this.multipleInstances = !1),
          (this.serviceProps = {}),
          (this.instantiationMode = "LAZY"),
          (this.onInstanceCreated = null);
      }
      var w,
        T = "firebasestorage.googleapis.com",
        R = "storageBucket",
        k =
          (t(S, (w = p)),
          (S.prototype._codeEquals = function (e) {
            return O(e) === this.code;
          }),
          Object.defineProperty(S.prototype, "serverResponse", {
            get: function () {
              return this.customData.serverResponse;
            },
            set: function (e) {
              (this.customData.serverResponse = e),
                this.customData.serverResponse
                  ? (this.message =
                      this._baseMessage + "\n" + this.customData.serverResponse)
                  : (this.message = this._baseMessage);
            },
            enumerable: !1,
            configurable: !0,
          }),
          S);
      function S(e, t) {
        e =
          w.call(this, O(e), "Firebase Storage: " + t + " (" + O(e) + ")") ||
          this;
        return (
          (e.customData = { serverResponse: null }),
          (e._baseMessage = e.message),
          Object.setPrototypeOf(e, S.prototype),
          e
        );
      }
      function O(e) {
        return "storage/" + e;
      }
      function C() {
        return new k(
          "unknown",
          "An unknown error occurred, please check the error payload for server response."
        );
      }
      function P() {
        return new k("canceled", "User canceled the upload/download.");
      }
      function E() {
        return new k(
          "cannot-slice-blob",
          "Cannot slice blob for upload. Please retry the upload."
        );
      }
      function x(e) {
        return new k("invalid-argument", e);
      }
      function A() {
        return new k("app-deleted", "The Firebase app was deleted.");
      }
      function U(e) {
        return new k(
          "invalid-root-operation",
          "The operation '" +
            e +
            "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
        );
      }
      function I(e, t) {
        return new k(
          "invalid-format",
          "String does not match format '" + e + "': " + t
        );
      }
      function j(e) {
        throw new k("internal-error", "Internal error: " + e);
      }
      var M = {
          RAW: "raw",
          BASE64: "base64",
          BASE64URL: "base64url",
          DATA_URL: "data_url",
        },
        B = function (e, t) {
          (this.data = e), (this.contentType = t || null);
        };
      function D(e, t) {
        switch (e) {
          case M.RAW:
            return new B(N(t));
          case M.BASE64:
          case M.BASE64URL:
            return new B(L(e, t));
          case M.DATA_URL:
            return new B(
              (function (e) {
                e = new q(e);
                return e.base64
                  ? L(M.BASE64, e.rest)
                  : (function (e) {
                      var t;
                      try {
                        t = decodeURIComponent(e);
                      } catch (e) {
                        throw I(M.DATA_URL, "Malformed data URL.");
                      }
                      return N(t);
                    })(e.rest);
              })(t),
              new q(t).contentType
            );
        }
        throw C();
      }
      function N(e) {
        for (var t = [], r = 0; r < e.length; r++) {
          var n,
            o,
            i = e.charCodeAt(r);
          i <= 127
            ? t.push(i)
            : i <= 2047
            ? t.push(192 | (i >> 6), 128 | (63 & i))
            : 55296 == (64512 & i)
            ? r < e.length - 1 && 56320 == (64512 & e.charCodeAt(r + 1))
              ? ((n = i),
                (o = e.charCodeAt(++r)),
                t.push(
                  240 | ((i = 65536 | ((1023 & n) << 10) | (1023 & o)) >> 18),
                  128 | ((i >> 12) & 63),
                  128 | ((i >> 6) & 63),
                  128 | (63 & i)
                ))
              : t.push(239, 191, 189)
            : 56320 == (64512 & i)
            ? t.push(239, 191, 189)
            : t.push(224 | (i >> 12), 128 | ((i >> 6) & 63), 128 | (63 & i));
        }
        return new Uint8Array(t);
      }
      function L(t, e) {
        switch (t) {
          case M.BASE64:
            var r = -1 !== e.indexOf("-"),
              n = -1 !== e.indexOf("_");
            if (r || n)
              throw I(
                t,
                "Invalid character '" +
                  (r ? "-" : "_") +
                  "' found: is it base64url encoded?"
              );
            break;
          case M.BASE64URL:
            (n = -1 !== e.indexOf("+")), (r = -1 !== e.indexOf("/"));
            if (n || r)
              throw I(
                t,
                "Invalid character '" +
                  (n ? "+" : "/") +
                  "' found: is it base64 encoded?"
              );
            e = e.replace(/-/g, "+").replace(/_/g, "/");
        }
        var o;
        try {
          o = atob(e);
        } catch (e) {
          throw I(t, "Invalid character found");
        }
        for (var i = new Uint8Array(o.length), a = 0; a < o.length; a++)
          i[a] = o.charCodeAt(a);
        return i;
      }
      var q = function (e) {
        var t;
        if (
          ((this.base64 = !1),
          (this.contentType = null) === (t = e.match(/^data:([^,]+)?,/)))
        )
          throw I(
            M.DATA_URL,
            "Must be formatted 'data:[<mediatype>][;base64],<data>"
          );
        var r,
          n = t[1] || null;
        null != n &&
          ((this.base64 =
            ((r = ";base64"),
            (t = n).length >= r.length &&
              t.substring(t.length - r.length) === r)),
          (this.contentType = this.base64
            ? n.substring(0, n.length - ";base64".length)
            : n)),
          (this.rest = e.substring(e.indexOf(",") + 1));
      };
      var F,
        H,
        z = { STATE_CHANGED: "state_changed" },
        W = {
          RUNNING: "running",
          PAUSED: "paused",
          SUCCESS: "success",
          CANCELED: "canceled",
          ERROR: "error",
        };
      function V(e) {
        switch (e) {
          case "running":
          case "pausing":
          case "canceling":
            return W.RUNNING;
          case "paused":
            return W.PAUSED;
          case "success":
            return W.SUCCESS;
          case "canceled":
            return W.CANCELED;
          case "error":
          default:
            return W.ERROR;
        }
      }
      ((H = F = F || {})[(H.NO_ERROR = 0)] = "NO_ERROR"),
        (H[(H.NETWORK_ERROR = 1)] = "NETWORK_ERROR"),
        (H[(H.ABORT = 2)] = "ABORT");
      var G =
        ((X.prototype.send = function (e, t, r, n) {
          if (this.sent_) throw j("cannot .send() more than once");
          if (((this.sent_ = !0), this.xhr_.open(t, e, !0), void 0 !== n))
            for (var o in n)
              n.hasOwnProperty(o) &&
                this.xhr_.setRequestHeader(o, n[o].toString());
          return (
            void 0 !== r ? this.xhr_.send(r) : this.xhr_.send(),
            this.sendPromise_
          );
        }),
        (X.prototype.getErrorCode = function () {
          if (!this.sent_) throw j("cannot .getErrorCode() before sending");
          return this.errorCode_;
        }),
        (X.prototype.getStatus = function () {
          if (!this.sent_) throw j("cannot .getStatus() before sending");
          try {
            return this.xhr_.status;
          } catch (e) {
            return -1;
          }
        }),
        (X.prototype.getResponseText = function () {
          if (!this.sent_) throw j("cannot .getResponseText() before sending");
          return this.xhr_.responseText;
        }),
        (X.prototype.abort = function () {
          this.xhr_.abort();
        }),
        (X.prototype.getResponseHeader = function (e) {
          return this.xhr_.getResponseHeader(e);
        }),
        (X.prototype.addUploadProgressListener = function (e) {
          null != this.xhr_.upload &&
            this.xhr_.upload.addEventListener("progress", e);
        }),
        (X.prototype.removeUploadProgressListener = function (e) {
          null != this.xhr_.upload &&
            this.xhr_.upload.removeEventListener("progress", e);
        }),
        X);
      function X() {
        var t = this;
        (this.sent_ = !1),
          (this.xhr_ = new XMLHttpRequest()),
          (this.errorCode_ = F.NO_ERROR),
          (this.sendPromise_ = new Promise(function (e) {
            t.xhr_.addEventListener("abort", function () {
              (t.errorCode_ = F.ABORT), e();
            }),
              t.xhr_.addEventListener("error", function () {
                (t.errorCode_ = F.NETWORK_ERROR), e();
              }),
              t.xhr_.addEventListener("load", function () {
                e();
              });
          }));
      }
      var K =
        ((J.prototype.createConnection = function () {
          return new G();
        }),
        J);
      function J() {}
      var Z =
        (Object.defineProperty(Y.prototype, "path", {
          get: function () {
            return this.path_;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(Y.prototype, "isRoot", {
          get: function () {
            return 0 === this.path.length;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (Y.prototype.fullServerUrl = function () {
          var e = encodeURIComponent;
          return "/b/" + e(this.bucket) + "/o/" + e(this.path);
        }),
        (Y.prototype.bucketOnlyServerUrl = function () {
          return "/b/" + encodeURIComponent(this.bucket) + "/o";
        }),
        (Y.makeFromBucketSpec = function (t, e) {
          var r;
          try {
            r = Y.makeFromUrl(t, e);
          } catch (e) {
            return new Y(t, "");
          }
          if ("" === r.path) return r;
          throw new k(
            "invalid-default-bucket",
            "Invalid default bucket '" + t + "'."
          );
        }),
        (Y.makeFromUrl = function (e, t) {
          var r = null,
            n = "([A-Za-z0-9.\\-_]+)";
          var o = new RegExp("^gs://" + n + "(/(.*))?$", "i");
          function i(e) {
            e.path_ = decodeURIComponent(e.path);
          }
          for (
            var a = t.replace(/[.]/g, "\\."),
              s = [
                {
                  regex: o,
                  indices: { bucket: 1, path: 3 },
                  postModify: function (e) {
                    "/" === e.path.charAt(e.path.length - 1) &&
                      (e.path_ = e.path_.slice(0, -1));
                  },
                },
                {
                  regex: new RegExp(
                    "^https?://" +
                      a +
                      "/v[A-Za-z0-9_]+/b/" +
                      n +
                      "/o(/([^?#]*).*)?$",
                    "i"
                  ),
                  indices: { bucket: 1, path: 3 },
                  postModify: i,
                },
                {
                  regex: new RegExp(
                    "^https?://" +
                      (t === T
                        ? "(?:storage.googleapis.com|storage.cloud.google.com)"
                        : t) +
                      "/" +
                      n +
                      "/([^?#]*)",
                    "i"
                  ),
                  indices: { bucket: 1, path: 2 },
                  postModify: i,
                },
              ],
              u = 0;
            u < s.length;
            u++
          ) {
            var c = s[u],
              l = c.regex.exec(e);
            if (l) {
              r = new Y(l[c.indices.bucket], l[c.indices.path] || "");
              c.postModify(r);
              break;
            }
          }
          if (null == r) throw new k("invalid-url", "Invalid URL '" + e + "'.");
          return r;
        }),
        Y);
      function Y(e, t) {
        (this.bucket = e), (this.path_ = t);
      }
      var $ =
        ((Q.prototype.getPromise = function () {
          return this.promise_;
        }),
        (Q.prototype.cancel = function (e) {}),
        Q);
      function Q(e) {
        this.promise_ = Promise.reject(e);
      }
      function ee(e) {
        return "string" == typeof e || e instanceof String;
      }
      function te(e) {
        return re() && e instanceof Blob;
      }
      function re() {
        return "undefined" != typeof Blob;
      }
      function ne(e, t, r, n) {
        if (n < t)
          throw x(
            "Invalid value for '" + e + "'. Expected " + t + " or greater."
          );
        if (r < n)
          throw x("Invalid value for '" + e + "'. Expected " + r + " or less.");
      }
      function oe(e, t) {
        var r = t.match(/^(\w+):\/\/.+/);
        return (
          (null == (null == r ? void 0 : r[1]) ? "https://" + t : t) + "/v0" + e
        );
      }
      function ie(e) {
        var t,
          r = encodeURIComponent,
          n = "?";
        for (t in e)
          e.hasOwnProperty(t) && (n = n + (r(t) + "=" + r(e[t])) + "&");
        return (n = n.slice(0, -1));
      }
      var ae =
        ((se.prototype.start_ = function () {
          var t,
            r,
            e,
            n,
            o,
            i,
            a,
            s,
            u,
            c = this;
          function l(e, t) {
            var r,
              n = c.resolve_,
              o = c.reject_,
              i = t.connection;
            if (t.wasSuccessCode)
              try {
                var a = c.callback_(i, i.getResponseText());
                void 0 !== a ? n(a) : n();
              } catch (e) {
                o(e);
              }
            else
              null !== i
                ? (((r = C()).serverResponse = i.getResponseText()),
                  c.errorCallback_ ? o(c.errorCallback_(i, r)) : o(r))
                : t.canceled
                ? o((r = (c.appDelete_ ? A : P)()))
                : o(
                    (r = new k(
                      "retry-limit-exceeded",
                      "Max retry time for operation exceeded, please try again."
                    ))
                  );
          }
          function h() {
            return 2 === a;
          }
          function p() {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            s || ((s = !0), r.apply(null, e));
          }
          function f(e) {
            o = setTimeout(function () {
              (o = null), t(d, h());
            }, e);
          }
          function d(e) {
            for (var t = [], r = 1; r < arguments.length; r++)
              t[r - 1] = arguments[r];
            s ||
              (e || h() || i
                ? p.call.apply(p, g([null, e], t))
                : (n < 64 && (n *= 2),
                  f(1 === a ? ((a = 2), 0) : 1e3 * (n + Math.random()))));
          }
          function _(e) {
            u ||
              ((u = !0),
              s ||
                (null !== o
                  ? (e || (a = 2), clearTimeout(o), f(0))
                  : e || (a = 1)));
          }
          this.canceled_
            ? l(0, new ue(!1, null, !0))
            : (this.backoffId_ =
                ((t = function (n, e) {
                  var o;
                  function i(e) {
                    var t = e.loaded,
                      e = e.lengthComputable ? e.total : -1;
                    null !== c.progressCallback_ && c.progressCallback_(t, e);
                  }
                  e
                    ? n(!1, new ue(!1, null, !0))
                    : ((o = c.pool_.createConnection()),
                      (c.pendingConnection_ = o),
                      null !== c.progressCallback_ &&
                        o.addUploadProgressListener(i),
                      o
                        .send(c.url_, c.method_, c.body_, c.headers_)
                        .then(function () {
                          null !== c.progressCallback_ &&
                            o.removeUploadProgressListener(i),
                            (c.pendingConnection_ = null);
                          var e,
                            t = o.getErrorCode() === F.NO_ERROR,
                            r = o.getStatus();
                          t && !c.isRetryStatusCode_(r)
                            ? ((e = -1 !== c.successCodes_.indexOf(r)),
                              n(!0, new ue(e, o)))
                            : ((e = o.getErrorCode() === F.ABORT),
                              n(!1, new ue(!1, null, e)));
                        }));
                }),
                (r = l),
                (e = this.timeout_),
                (o = null),
                (u = s = i = !(n = 1)),
                f((a = 0)),
                setTimeout(function () {
                  (i = !0), _(!0);
                }, e),
                _));
        }),
        (se.prototype.getPromise = function () {
          return this.promise_;
        }),
        (se.prototype.cancel = function (e) {
          (this.canceled_ = !0),
            (this.appDelete_ = e || !1),
            null !== this.backoffId_ && (0, this.backoffId_)(!1),
            null !== this.pendingConnection_ && this.pendingConnection_.abort();
        }),
        (se.prototype.isRetryStatusCode_ = function (e) {
          var t = 500 <= e && e < 600,
            r = -1 !== [408, 429].indexOf(e),
            e = -1 !== this.additionalRetryCodes_.indexOf(e);
          return t || r || e;
        }),
        se);
      function se(e, t, r, n, o, i, a, s, u, c, l) {
        var h = this;
        (this.pendingConnection_ = null),
          (this.backoffId_ = null),
          (this.canceled_ = !1),
          (this.appDelete_ = !1),
          (this.url_ = e),
          (this.method_ = t),
          (this.headers_ = r),
          (this.body_ = n),
          (this.successCodes_ = o.slice()),
          (this.additionalRetryCodes_ = i.slice()),
          (this.callback_ = a),
          (this.errorCallback_ = s),
          (this.progressCallback_ = c),
          (this.timeout_ = u),
          (this.pool_ = l),
          (this.promise_ = new Promise(function (e, t) {
            (h.resolve_ = e), (h.reject_ = t), h.start_();
          }));
      }
      var ue = function (e, t, r) {
        (this.wasSuccessCode = e), (this.connection = t), (this.canceled = !!r);
      };
      function ce() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r =
          "undefined" != typeof BlobBuilder
            ? BlobBuilder
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : void 0;
        if (void 0 !== r) {
          for (var n = new r(), o = 0; o < e.length; o++) n.append(e[o]);
          return n.getBlob();
        }
        if (re()) return new Blob(e);
        throw new k(
          "unsupported-environment",
          "This browser doesn't seem to support creating Blobs"
        );
      }
      var le =
        ((he.prototype.size = function () {
          return this.size_;
        }),
        (he.prototype.type = function () {
          return this.type_;
        }),
        (he.prototype.slice = function (e, t) {
          if (te(this.data_)) {
            var r = this.data_,
              n =
                ((o = e),
                (n = t),
                (r = r).webkitSlice
                  ? r.webkitSlice(o, n)
                  : r.mozSlice
                  ? r.mozSlice(o, n)
                  : r.slice
                  ? r.slice(o, n)
                  : null);
            return null === n ? null : new he(n);
          }
          var o, n;
          return new he(new Uint8Array(this.data_.buffer, e, t - e), !0);
        }),
        (he.getBlob = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          if (re()) {
            var r = e.map(function (e) {
              return e instanceof he ? e.data_ : e;
            });
            return new he(ce.apply(null, r));
          }
          var r = e.map(function (e) {
              return ee(e) ? D(M.RAW, e).data : e.data_;
            }),
            n = 0;
          r.forEach(function (e) {
            n += e.byteLength;
          });
          var o = new Uint8Array(n),
            i = 0;
          return (
            r.forEach(function (e) {
              for (var t = 0; t < e.length; t++) o[i++] = e[t];
            }),
            new he(o, !0)
          );
        }),
        (he.prototype.uploadData = function () {
          return this.data_;
        }),
        he);
      function he(e, t) {
        var r = 0,
          n = "";
        te(e)
          ? ((r = (this.data_ = e).size), (n = e.type))
          : e instanceof ArrayBuffer
          ? (t
              ? (this.data_ = new Uint8Array(e))
              : ((this.data_ = new Uint8Array(e.byteLength)),
                this.data_.set(new Uint8Array(e))),
            (r = this.data_.length))
          : e instanceof Uint8Array &&
            (t
              ? (this.data_ = e)
              : ((this.data_ = new Uint8Array(e.length)), this.data_.set(e)),
            (r = e.length)),
          (this.size_ = r),
          (this.type_ = n);
      }
      function pe(e) {
        var t;
        try {
          t = JSON.parse(e);
        } catch (e) {
          return null;
        }
        return "object" != typeof (e = t) || Array.isArray(e) ? null : t;
      }
      function fe(e) {
        var t = e.lastIndexOf("/", e.length - 2);
        return -1 === t ? e : e.slice(t + 1);
      }
      function de(e, t) {
        return t;
      }
      var _e = function (e, t, r, n) {
          (this.server = e),
            (this.local = t || e),
            (this.writable = !!r),
            (this.xform = n || de);
        },
        ge = null;
      function be() {
        if (ge) return ge;
        var e = [];
        e.push(new _e("bucket")),
          e.push(new _e("generation")),
          e.push(new _e("metageneration")),
          e.push(new _e("name", "fullPath", !0));
        var t = new _e("name");
        (t.xform = function (e, t) {
          return !ee((t = t)) || t.length < 2 ? t : fe(t);
        }),
          e.push(t);
        t = new _e("size");
        return (
          (t.xform = function (e, t) {
            return void 0 !== t ? Number(t) : t;
          }),
          e.push(t),
          e.push(new _e("timeCreated")),
          e.push(new _e("updated")),
          e.push(new _e("md5Hash", null, !0)),
          e.push(new _e("cacheControl", null, !0)),
          e.push(new _e("contentDisposition", null, !0)),
          e.push(new _e("contentEncoding", null, !0)),
          e.push(new _e("contentLanguage", null, !0)),
          e.push(new _e("contentType", null, !0)),
          e.push(new _e("metadata", "customMetadata", !0)),
          (ge = e)
        );
      }
      function ve(r, n) {
        Object.defineProperty(r, "ref", {
          get: function () {
            var e = r.bucket,
              t = r.fullPath,
              t = new Z(e, t);
            return n._makeStorageReference(t);
          },
        });
      }
      function ye(e, t, r) {
        t = pe(t);
        return null === t
          ? null
          : (function (e, t, r) {
              for (var n = { type: "file" }, o = r.length, i = 0; i < o; i++) {
                var a = r[i];
                n[a.local] = a.xform(n, t[a.server]);
              }
              return ve(n, e), n;
            })(e, t, r);
      }
      function me(e, t) {
        for (var r = {}, n = t.length, o = 0; o < n; o++) {
          var i = t[o];
          i.writable && (r[i.server] = e[i.local]);
        }
        return JSON.stringify(r);
      }
      var we = "prefixes",
        Te = "items";
      function Re(e, t, r) {
        r = pe(r);
        return null === r
          ? null
          : (function (e, t, r) {
              var n = {
                prefixes: [],
                items: [],
                nextPageToken: r.nextPageToken,
              };
              if (r[we])
                for (var o = 0, i = r[we]; o < i.length; o++) {
                  var a = i[o].replace(/\/$/, ""),
                    s = e._makeStorageReference(new Z(t, a));
                  n.prefixes.push(s);
                }
              if (r[Te])
                for (var u = 0, c = r[Te]; u < c.length; u++) {
                  var l = c[u],
                    s = e._makeStorageReference(new Z(t, l.name));
                  n.items.push(s);
                }
              return n;
            })(e, t, r);
      }
      var ke = function (e, t, r, n) {
        (this.url = e),
          (this.method = t),
          (this.handler = r),
          (this.timeout = n),
          (this.urlParams = {}),
          (this.headers = {}),
          (this.body = null),
          (this.errorHandler = null),
          (this.progressCallback = null),
          (this.successCodes = [200]),
          (this.additionalRetryCodes = []);
      };
      function Se(e) {
        if (!e) throw C();
      }
      function Oe(r, n) {
        return function (e, t) {
          return Se(null !== (t = ye(r, t, n))), t;
        };
      }
      function Ce(r, n) {
        return function (e, t) {
          return Se(null !== (t = Re(r, n, t))), t;
        };
      }
      function Pe(n, o) {
        return function (e, t) {
          var r = ye(n, t, o);
          return (
            Se(null !== r),
            (function (n, e, o) {
              if (null === (e = pe(e))) return null;
              if (!ee(e.downloadTokens)) return null;
              if (0 === (e = e.downloadTokens).length) return null;
              var i = encodeURIComponent;
              return e.split(",").map(function (e) {
                var t = n.bucket,
                  r = n.fullPath;
                return (
                  oe("/b/" + i(t) + "/o/" + i(r), o) +
                  ie({ alt: "media", token: e })
                );
              })[0];
            })(r, t, n.host)
          );
        };
      }
      function Ee(o) {
        return function (e, t) {
          var r,
            n =
              401 === e.getStatus()
                ? e
                    .getResponseText()
                    .includes("Firebase App Check token is invalid")
                  ? new k(
                      "unauthorized-app",
                      "This app does not have permission to access Firebase Storage on this project."
                    )
                  : new k(
                      "unauthenticated",
                      "User is not authenticated, please authenticate using Firebase Authentication and try again."
                    )
                : 402 === e.getStatus()
                ? ((r = o.bucket),
                  new k(
                    "quota-exceeded",
                    "Quota for bucket '" +
                      r +
                      "' exceeded, please view quota on https://firebase.google.com/pricing/."
                  ))
                : 403 === e.getStatus()
                ? ((n = o.path),
                  new k(
                    "unauthorized",
                    "User does not have permission to access '" + n + "'."
                  ))
                : t;
          return (n.serverResponse = t.serverResponse), n;
        };
      }
      function xe(n) {
        var o = Ee(n);
        return function (e, t) {
          var r = o(e, t);
          return (
            404 === e.getStatus() &&
              ((e = n.path),
              (r = new k(
                "object-not-found",
                "Object '" + e + "' does not exist."
              ))),
            (r.serverResponse = t.serverResponse),
            r
          );
        };
      }
      function Ae(e, t, r) {
        var n = oe(t.fullServerUrl(), e.host),
          o = e.maxOperationRetryTime,
          o = new ke(n, "GET", Oe(e, r), o);
        return (o.errorHandler = xe(t)), o;
      }
      function Ue(e, t, r) {
        r = Object.assign({}, r);
        return (
          (r.fullPath = e.path),
          (r.size = t.size()),
          r.contentType ||
            (r.contentType =
              ((e = t),
              ((t = null) && t.contentType) ||
                (e && e.type()) ||
                "application/octet-stream")),
          r
        );
      }
      function Ie(e, t, r, n, o) {
        var i = t.bucketOnlyServerUrl(),
          a = { "X-Goog-Upload-Protocol": "multipart" };
        var s = (function () {
          for (var e = "", t = 0; t < 2; t++)
            e += Math.random().toString().slice(2);
          return e;
        })();
        a["Content-Type"] = "multipart/related; boundary=" + s;
        var u = Ue(t, n, o),
          o =
            "--" +
            s +
            "\r\nContent-Type: application/json; charset=utf-8\r\n\r\n" +
            me(u, r) +
            "\r\n--" +
            s +
            "\r\nContent-Type: " +
            u.contentType +
            "\r\n\r\n",
          n = le.getBlob(o, n, "\r\n--" + s + "--");
        if (null === n) throw E();
        (s = { name: u.fullPath }),
          (u = oe(i, e.host)),
          (i = e.maxUploadRetryTime),
          (i = new ke(u, "POST", Oe(e, r), i));
        return (
          (i.urlParams = s),
          (i.headers = a),
          (i.body = n.uploadData()),
          (i.errorHandler = Ee(t)),
          i
        );
      }
      var je = function (e, t, r, n) {
        (this.current = e),
          (this.total = t),
          (this.finalized = !!r),
          (this.metadata = n || null);
      };
      function Me(e, t) {
        var r = null;
        try {
          r = e.getResponseHeader("X-Goog-Upload-Status");
        } catch (e) {
          Se(!1);
        }
        return Se(!!r && -1 !== (t || ["active"]).indexOf(r)), r;
      }
      function Be(e, t, r, n, o) {
        var i = t.bucketOnlyServerUrl(),
          a = Ue(t, n, o),
          o = { name: a.fullPath },
          i = oe(i, e.host),
          n = {
            "X-Goog-Upload-Protocol": "resumable",
            "X-Goog-Upload-Command": "start",
            "X-Goog-Upload-Header-Content-Length": "" + n.size(),
            "X-Goog-Upload-Header-Content-Type": a.contentType,
            "Content-Type": "application/json; charset=utf-8",
          },
          r = me(a, r),
          e = e.maxUploadRetryTime;
        e = new ke(
          i,
          "POST",
          function (e) {
            var t;
            Me(e);
            try {
              t = e.getResponseHeader("X-Goog-Upload-URL");
            } catch (e) {
              Se(!1);
            }
            return Se(ee(t)), t;
          },
          e
        );
        return (
          (e.urlParams = o),
          (e.headers = n),
          (e.body = r),
          (e.errorHandler = Ee(t)),
          e
        );
      }
      function De(e, t, r, n) {
        (e = e.maxUploadRetryTime),
          (e = new ke(
            r,
            "POST",
            function (e) {
              var t = Me(e, ["active", "final"]),
                r = null;
              try {
                r = e.getResponseHeader("X-Goog-Upload-Size-Received");
              } catch (e) {
                Se(!1);
              }
              return (
                r || Se(!1),
                (r = Number(r)),
                Se(!isNaN(r)),
                new je(r, n.size(), "final" === t)
              );
            },
            e
          ));
        return (
          (e.headers = { "X-Goog-Upload-Command": "query" }),
          (e.errorHandler = Ee(t)),
          e
        );
      }
      function Ne(e, i, t, a, r, s, n, o) {
        var u = new je(0, 0);
        if (
          (n
            ? ((u.current = n.current), (u.total = n.total))
            : ((u.current = 0), (u.total = a.size())),
          a.size() !== u.total)
        )
          throw new k(
            "server-file-wrong-size",
            "Server recorded incorrect upload file size, please retry the upload."
          );
        var c = u.total - u.current,
          l = c;
        0 < r && (l = Math.min(l, r));
        (n = u.current),
          (r = {
            "X-Goog-Upload-Command": l === c ? "upload, finalize" : "upload",
            "X-Goog-Upload-Offset": "" + u.current,
          }),
          (c = a.slice(n, n + l));
        if (null === c) throw E();
        (n = i.maxUploadRetryTime),
          (n = new ke(
            t,
            "POST",
            function (e, t) {
              var r = Me(e, ["active", "final"]),
                n = u.current + l,
                o = a.size(),
                t = "final" === r ? Oe(i, s)(e, t) : null;
              return new je(n, o, "final" === r, t);
            },
            n
          ));
        return (
          (n.headers = r),
          (n.body = c.uploadData()),
          (n.progressCallback = o || null),
          (n.errorHandler = Ee(e)),
          n
        );
      }
      var Le = function (e, t, r) {
        "function" == typeof e || null != t || null != r
          ? ((this.next = e), (this.error = t), (this.complete = r))
          : ((this.next = (e = e).next),
            (this.error = e.error),
            (this.complete = e.complete));
      };
      function qe(r) {
        return function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          Promise.resolve().then(function () {
            return r.apply(void 0, e);
          });
        };
      }
      var Fe =
        ((He.prototype._makeProgressCallback = function () {
          var t = this,
            r = this._transferred;
          return function (e) {
            return t._updateProgress(r + e);
          };
        }),
        (He.prototype._shouldDoResumable = function (e) {
          return 262144 < e.size();
        }),
        (He.prototype._start = function () {
          "running" === this._state &&
            void 0 === this._request &&
            (this._resumable
              ? void 0 === this._uploadUrl
                ? this._createResumable()
                : this._needToFetchStatus
                ? this._fetchStatus()
                : this._needToFetchMetadata
                ? this._fetchMetadata()
                : this._continueUpload()
              : this._oneShotUpload());
        }),
        (He.prototype._resolveToken = function (n) {
          var o = this;
          Promise.all([
            this._ref.storage._getAuthToken(),
            this._ref.storage._getAppCheckToken(),
          ]).then(function (e) {
            var t = e[0],
              r = e[1];
            switch (o._state) {
              case "running":
                n(t, r);
                break;
              case "canceling":
                o._transition("canceled");
                break;
              case "pausing":
                o._transition("paused");
            }
          });
        }),
        (He.prototype._createResumable = function () {
          var n = this;
          this._resolveToken(function (e, t) {
            var r = Be(
                n._ref.storage,
                n._ref._location,
                n._mappings,
                n._blob,
                n._metadata
              ),
              t = n._ref.storage._makeRequest(r, e, t);
            (n._request = t).getPromise().then(function (e) {
              (n._request = void 0),
                (n._uploadUrl = e),
                (n._needToFetchStatus = !1),
                n.completeTransitions_();
            }, n._errorHandler);
          });
        }),
        (He.prototype._fetchStatus = function () {
          var n = this,
            o = this._uploadUrl;
          this._resolveToken(function (e, t) {
            var r = De(n._ref.storage, n._ref._location, o, n._blob),
              t = n._ref.storage._makeRequest(r, e, t);
            (n._request = t).getPromise().then(function (e) {
              (n._request = void 0),
                n._updateProgress(e.current),
                (n._needToFetchStatus = !1),
                e.finalized && (n._needToFetchMetadata = !0),
                n.completeTransitions_();
            }, n._errorHandler);
          });
        }),
        (He.prototype._continueUpload = function () {
          var n = this,
            o = 262144 * this._chunkMultiplier,
            i = new je(this._transferred, this._blob.size()),
            a = this._uploadUrl;
          this._resolveToken(function (e, t) {
            var r;
            try {
              r = Ne(
                n._ref._location,
                n._ref.storage,
                a,
                n._blob,
                o,
                n._mappings,
                i,
                n._makeProgressCallback()
              );
            } catch (e) {
              return (n._error = e), void n._transition("error");
            }
            t = n._ref.storage._makeRequest(r, e, t);
            (n._request = t).getPromise().then(function (e) {
              n._increaseMultiplier(),
                (n._request = void 0),
                n._updateProgress(e.current),
                e.finalized
                  ? ((n._metadata = e.metadata), n._transition("success"))
                  : n.completeTransitions_();
            }, n._errorHandler);
          });
        }),
        (He.prototype._increaseMultiplier = function () {
          262144 * this._chunkMultiplier < 33554432 &&
            (this._chunkMultiplier *= 2);
        }),
        (He.prototype._fetchMetadata = function () {
          var n = this;
          this._resolveToken(function (e, t) {
            var r = Ae(n._ref.storage, n._ref._location, n._mappings),
              t = n._ref.storage._makeRequest(r, e, t);
            (n._request = t).getPromise().then(function (e) {
              (n._request = void 0),
                (n._metadata = e),
                n._transition("success");
            }, n._metadataErrorHandler);
          });
        }),
        (He.prototype._oneShotUpload = function () {
          var n = this;
          this._resolveToken(function (e, t) {
            var r = Ie(
                n._ref.storage,
                n._ref._location,
                n._mappings,
                n._blob,
                n._metadata
              ),
              t = n._ref.storage._makeRequest(r, e, t);
            (n._request = t).getPromise().then(function (e) {
              (n._request = void 0),
                (n._metadata = e),
                n._updateProgress(n._blob.size()),
                n._transition("success");
            }, n._errorHandler);
          });
        }),
        (He.prototype._updateProgress = function (e) {
          var t = this._transferred;
          (this._transferred = e),
            this._transferred !== t && this._notifyObservers();
        }),
        (He.prototype._transition = function (e) {
          if (this._state !== e)
            switch (e) {
              case "canceling":
              case "pausing":
                (this._state = e),
                  void 0 !== this._request && this._request.cancel();
                break;
              case "running":
                var t = "paused" === this._state;
                (this._state = e),
                  t && (this._notifyObservers(), this._start());
                break;
              case "paused":
                (this._state = e), this._notifyObservers();
                break;
              case "canceled":
                (this._error = P()), (this._state = e), this._notifyObservers();
                break;
              case "error":
              case "success":
                (this._state = e), this._notifyObservers();
            }
        }),
        (He.prototype.completeTransitions_ = function () {
          switch (this._state) {
            case "pausing":
              this._transition("paused");
              break;
            case "canceling":
              this._transition("canceled");
              break;
            case "running":
              this._start();
          }
        }),
        Object.defineProperty(He.prototype, "snapshot", {
          get: function () {
            var e = V(this._state);
            return {
              bytesTransferred: this._transferred,
              totalBytes: this._blob.size(),
              state: e,
              metadata: this._metadata,
              task: this,
              ref: this._ref,
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (He.prototype.on = function (e, t, r, n) {
          var o = this,
            i = new Le(t, r, n);
          return (
            this._addObserver(i),
            function () {
              o._removeObserver(i);
            }
          );
        }),
        (He.prototype.then = function (e, t) {
          return this._promise.then(e, t);
        }),
        (He.prototype.catch = function (e) {
          return this.then(null, e);
        }),
        (He.prototype._addObserver = function (e) {
          this._observers.push(e), this._notifyObserver(e);
        }),
        (He.prototype._removeObserver = function (e) {
          e = this._observers.indexOf(e);
          -1 !== e && this._observers.splice(e, 1);
        }),
        (He.prototype._notifyObservers = function () {
          var t = this;
          this._finishPromise(),
            this._observers.slice().forEach(function (e) {
              t._notifyObserver(e);
            });
        }),
        (He.prototype._finishPromise = function () {
          if (void 0 !== this._resolve) {
            var e = !0;
            switch (V(this._state)) {
              case W.SUCCESS:
                qe(this._resolve.bind(null, this.snapshot))();
                break;
              case W.CANCELED:
              case W.ERROR:
                qe(this._reject.bind(null, this._error))();
                break;
              default:
                e = !1;
            }
            e && ((this._resolve = void 0), (this._reject = void 0));
          }
        }),
        (He.prototype._notifyObserver = function (e) {
          switch (V(this._state)) {
            case W.RUNNING:
            case W.PAUSED:
              e.next && qe(e.next.bind(e, this.snapshot))();
              break;
            case W.SUCCESS:
              e.complete && qe(e.complete.bind(e))();
              break;
            case W.CANCELED:
            case W.ERROR:
              e.error && qe(e.error.bind(e, this._error))();
              break;
            default:
              e.error && qe(e.error.bind(e, this._error))();
          }
        }),
        (He.prototype.resume = function () {
          var e = "paused" === this._state || "pausing" === this._state;
          return e && this._transition("running"), e;
        }),
        (He.prototype.pause = function () {
          var e = "running" === this._state;
          return e && this._transition("pausing"), e;
        }),
        (He.prototype.cancel = function () {
          var e = "running" === this._state || "pausing" === this._state;
          return e && this._transition("canceling"), e;
        }),
        He);
      function He(e, t, r) {
        var n = this;
        void 0 === r && (r = null),
          (this._transferred = 0),
          (this._needToFetchStatus = !1),
          (this._needToFetchMetadata = !1),
          (this._observers = []),
          (this._error = void 0),
          (this._uploadUrl = void 0),
          (this._request = void 0),
          (this._chunkMultiplier = 1),
          (this._resolve = void 0),
          (this._reject = void 0),
          (this._ref = e),
          (this._blob = t),
          (this._metadata = r),
          (this._mappings = be()),
          (this._resumable = this._shouldDoResumable(this._blob)),
          (this._state = "running"),
          (this._errorHandler = function (e) {
            (n._request = void 0),
              (n._chunkMultiplier = 1),
              e._codeEquals("canceled")
                ? ((n._needToFetchStatus = !0), n.completeTransitions_())
                : ((n._error = e), n._transition("error"));
          }),
          (this._metadataErrorHandler = function (e) {
            (n._request = void 0),
              e._codeEquals("canceled")
                ? n.completeTransitions_()
                : ((n._error = e), n._transition("error"));
          }),
          (this._promise = new Promise(function (e, t) {
            (n._resolve = e), (n._reject = t), n._start();
          })),
          this._promise.then(null, function () {});
      }
      var ze =
        ((We.prototype.toString = function () {
          return "gs://" + this._location.bucket + "/" + this._location.path;
        }),
        (We.prototype._newRef = function (e, t) {
          return new We(e, t);
        }),
        Object.defineProperty(We.prototype, "root", {
          get: function () {
            var e = new Z(this._location.bucket, "");
            return this._newRef(this._service, e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(We.prototype, "bucket", {
          get: function () {
            return this._location.bucket;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(We.prototype, "fullPath", {
          get: function () {
            return this._location.path;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(We.prototype, "name", {
          get: function () {
            return fe(this._location.path);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(We.prototype, "storage", {
          get: function () {
            return this._service;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(We.prototype, "parent", {
          get: function () {
            var e = (function (e) {
              if (0 === e.length) return null;
              var t = e.lastIndexOf("/");
              return -1 === t ? "" : e.slice(0, t);
            })(this._location.path);
            if (null === e) return null;
            e = new Z(this._location.bucket, e);
            return new We(this._service, e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (We.prototype._throwIfRoot = function (e) {
          if ("" === this._location.path) throw U(e);
        }),
        We);
      function We(e, t) {
        (this._service = e),
          (this._location = t instanceof Z ? t : Z.makeFromUrl(t, e.host));
      }
      function Ve(e) {
        var t = { prefixes: [], items: [] };
        return (function n(o, i, a) {
          return l(this, void 0, void 0, function () {
            var t, r;
            return h(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, Ge(o, { pageToken: a })];
                case 1:
                  return (
                    (t = e.sent()),
                    (r = i.prefixes).push.apply(r, t.prefixes),
                    (r = i.items).push.apply(r, t.items),
                    null == t.nextPageToken
                      ? [3, 3]
                      : [4, n(o, i, t.nextPageToken)]
                  );
                case 2:
                  e.sent(), (e.label = 3);
                case 3:
                  return [2];
              }
            });
          });
        })(e, t).then(function () {
          return t;
        });
      }
      function Ge(u, c) {
        return l(this, void 0, void 0, function () {
          var s;
          return h(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  null != c &&
                    "number" == typeof c.maxResults &&
                    ne("options.maxResults", 1, 1e3, c.maxResults),
                  (s = c || {}),
                  (t = u.storage),
                  (r = u._location),
                  (n = "/"),
                  (o = s.pageToken),
                  (i = s.maxResults),
                  (a = {}),
                  r.isRoot ? (a.prefix = "") : (a.prefix = r.path + "/"),
                  n && 0 < n.length && (a.delimiter = n),
                  o && (a.pageToken = o),
                  i && (a.maxResults = i),
                  (o = oe(r.bucketOnlyServerUrl(), t.host)),
                  (i = t.maxOperationRetryTime),
                  ((i = new ke(o, "GET", Ce(t, r.bucket), i)).urlParams = a),
                  (i.errorHandler = Ee(r)),
                  [4, u.storage.makeRequestWithTokens(i)]
                );
              case 1:
                return [2, e.sent().getPromise()];
            }
            var t, r, n, o, i, a;
          });
        });
      }
      function Xe(s, u) {
        return l(this, void 0, void 0, function () {
          return h(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  s._throwIfRoot("updateMetadata"),
                  (t = s.storage),
                  (r = s._location),
                  (n = u),
                  (o = be()),
                  (i = oe(r.fullServerUrl(), t.host)),
                  (a = me(n, o)),
                  (n = t.maxOperationRetryTime),
                  ((n = new ke(i, "PATCH", Oe(t, o), n)).headers = {
                    "Content-Type": "application/json; charset=utf-8",
                  }),
                  (n.body = a),
                  (n.errorHandler = xe(r)),
                  [4, s.storage.makeRequestWithTokens(n)]
                );
              case 1:
                return [2, e.sent().getPromise()];
            }
            var t, r, n, o, i, a;
          });
        });
      }
      function Ke(a) {
        return l(this, void 0, void 0, function () {
          return h(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  a._throwIfRoot("getDownloadURL"),
                  (t = a.storage),
                  (r = a._location),
                  (n = be()),
                  (o = oe(r.fullServerUrl(), t.host)),
                  (i = t.maxOperationRetryTime),
                  ((i = new ke(o, "GET", Pe(t, n), i)).errorHandler = xe(r)),
                  [4, a.storage.makeRequestWithTokens(i)]
                );
              case 1:
                return [
                  2,
                  e
                    .sent()
                    .getPromise()
                    .then(function (e) {
                      if (null === e)
                        throw new k(
                          "no-download-url",
                          "The given file does not have any download URLs."
                        );
                      return e;
                    }),
                ];
            }
            var t, r, n, o, i;
          });
        });
      }
      function Je(o) {
        return l(this, void 0, void 0, function () {
          return h(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  o._throwIfRoot("deleteObject"),
                  (t = o.storage),
                  (r = o._location),
                  (n = oe(r.fullServerUrl(), t.host)),
                  (t = t.maxOperationRetryTime),
                  ((t = new ke(
                    n,
                    "DELETE",
                    function (e, t) {},
                    t
                  )).successCodes = [200, 204]),
                  (t.errorHandler = xe(r)),
                  [4, o.storage.makeRequestWithTokens(t)]
                );
              case 1:
                return [2, e.sent().getPromise()];
            }
            var t, r, n;
          });
        });
      }
      function Ze(e, t) {
        var r,
          t =
            ((r = e._location.path),
            (t = (t = t)
              .split("/")
              .filter(function (e) {
                return 0 < e.length;
              })
              .join("/")),
            0 === r.length ? t : r + "/" + t),
          t = new Z(e._location.bucket, t);
        return new ze(e.storage, t);
      }
      function Ye(e) {
        return /^[A-Za-z]+:\/\//.test(e);
      }
      function $e(e, t) {
        if (e instanceof rt) {
          var r = e;
          if (null == r._bucket)
            throw new k(
              "no-default-bucket",
              "No default bucket found. Did you set the '" +
                R +
                "' property when initializing the app?"
            );
          r = new ze(r, r._bucket);
          return null != t ? $e(r, t) : r;
        }
        return void 0 !== t ? Ze(e, t) : e;
      }
      function Qe(e, t) {
        if (t && Ye(t)) {
          if (e instanceof rt) return new ze(e, t);
          throw x(
            "To use ref(service, url), the first argument must be a Storage instance."
          );
        }
        return $e(e, t);
      }
      function et(e, t) {
        t = null == t ? void 0 : t[R];
        return null == t ? null : Z.makeFromBucketSpec(t, e);
      }
      function tt(e, t, r, n) {
        void 0 === n && (n = {}), (e.host = "http://" + t + ":" + r);
        n = n.mockUserToken;
        n &&
          (e._overrideAuthToken =
            "string" == typeof n
              ? n
              : (function (e, t) {
                  if (e.uid)
                    throw new Error(
                      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                    );
                  var r = t || "demo-project",
                    n = e.iat || 0;
                  if (!(t = e.sub || e.user_id))
                    throw new Error(
                      "mockUserToken must contain 'sub' or 'user_id' field!"
                    );
                  return (
                    (e = i(
                      {
                        iss: "https://securetoken.google.com/" + r,
                        aud: r,
                        iat: n,
                        exp: n + 3600,
                        auth_time: n,
                        sub: t,
                        user_id: t,
                        firebase: {
                          sign_in_provider: "custom",
                          identities: {},
                        },
                      },
                      e
                    )),
                    [
                      s(JSON.stringify({ alg: "none", type: "JWT" })),
                      s(JSON.stringify(e)),
                      "",
                    ].join(".")
                  );
                })(n, e.app.options.projectId));
      }
      var rt =
        (Object.defineProperty(nt.prototype, "host", {
          get: function () {
            return this._host;
          },
          set: function (e) {
            (this._host = e),
              null != this._url
                ? (this._bucket = Z.makeFromBucketSpec(this._url, e))
                : (this._bucket = et(e, this.app.options));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(nt.prototype, "maxUploadRetryTime", {
          get: function () {
            return this._maxUploadRetryTime;
          },
          set: function (e) {
            ne("time", 0, Number.POSITIVE_INFINITY, e),
              (this._maxUploadRetryTime = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(nt.prototype, "maxOperationRetryTime", {
          get: function () {
            return this._maxOperationRetryTime;
          },
          set: function (e) {
            ne("time", 0, Number.POSITIVE_INFINITY, e),
              (this._maxOperationRetryTime = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (nt.prototype._getAuthToken = function () {
          return l(this, void 0, void 0, function () {
            var t;
            return h(this, function (e) {
              switch (e.label) {
                case 0:
                  return this._overrideAuthToken
                    ? [2, this._overrideAuthToken]
                    : (t = this._authProvider.getImmediate({ optional: !0 }))
                    ? [4, t.getToken()]
                    : [3, 2];
                case 1:
                  if (null !== (t = e.sent())) return [2, t.accessToken];
                  e.label = 2;
                case 2:
                  return [2, null];
              }
            });
          });
        }),
        (nt.prototype._getAppCheckToken = function () {
          return l(this, void 0, void 0, function () {
            var t;
            return h(this, function (e) {
              switch (e.label) {
                case 0:
                  return (t = this._appCheckProvider.getImmediate({
                    optional: !0,
                  }))
                    ? [4, t.getToken()]
                    : [3, 2];
                case 1:
                  return [2, e.sent().token];
                case 2:
                  return [2, null];
              }
            });
          });
        }),
        (nt.prototype._delete = function () {
          return (
            this._deleted ||
              ((this._deleted = !0),
              this._requests.forEach(function (e) {
                return e.cancel();
              }),
              this._requests.clear()),
            Promise.resolve()
          );
        }),
        (nt.prototype._makeStorageReference = function (e) {
          return new ze(this, e);
        }),
        (nt.prototype._makeRequest = function (e, t, r) {
          var n = this;
          if (this._deleted) return new $(A());
          var o,
            i,
            a,
            s,
            u,
            c,
            l =
              ((o = e),
              (i = this._appId),
              (a = t),
              (s = r),
              (u = this._pool),
              (c = this._firebaseVersion),
              (e = ie(o.urlParams)),
              (t = o.url + e),
              (r = Object.assign({}, o.headers)),
              (e = r),
              (i = i) && (e["X-Firebase-GMPID"] = i),
              (i = r),
              null !== (a = a) &&
                0 < a.length &&
                (i.Authorization = "Firebase " + a),
              (c = c),
              (r["X-Firebase-Storage-Version"] =
                "webjs/" + (null != c ? c : "AppManager")),
              (c = r),
              null !== (s = s) && (c["X-Firebase-AppCheck"] = s),
              new ae(
                t,
                o.method,
                r,
                o.body,
                o.successCodes,
                o.additionalRetryCodes,
                o.handler,
                o.errorHandler,
                o.timeout,
                o.progressCallback,
                u
              ));
          return (
            this._requests.add(l),
            l.getPromise().then(
              function () {
                return n._requests.delete(l);
              },
              function () {
                return n._requests.delete(l);
              }
            ),
            l
          );
        }),
        (nt.prototype.makeRequestWithTokens = function (n) {
          return l(this, void 0, void 0, function () {
            var t, r;
            return h(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    Promise.all([
                      this._getAuthToken(),
                      this._getAppCheckToken(),
                    ]),
                  ];
                case 1:
                  return (
                    (r = e.sent()),
                    (t = r[0]),
                    (r = r[1]),
                    [2, this._makeRequest(n, t, r)]
                  );
              }
            });
          });
        }),
        nt);
      function nt(e, t, r, n, o, i) {
        (this.app = e),
          (this._authProvider = t),
          (this._appCheckProvider = r),
          (this._pool = n),
          (this._url = o),
          (this._firebaseVersion = i),
          (this._bucket = null),
          (this._host = T),
          (this._appId = null),
          (this._deleted = !1),
          (this._maxOperationRetryTime = 12e4),
          (this._maxUploadRetryTime = 6e5),
          (this._requests = new Set()),
          (this._bucket =
            null != o
              ? Z.makeFromBucketSpec(o, this._host)
              : et(this._host, this.app.options));
      }
      function ot(e, t, r) {
        return (
          (e = v(e)),
          (t = t),
          (r = r),
          (e = e)._throwIfRoot("uploadBytesResumable"),
          new Fe(e, new le(t), r)
        );
      }
      function it(e) {
        return (function (r) {
          return l(this, void 0, void 0, function () {
            var t;
            return h(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    r._throwIfRoot("getMetadata"),
                    (t = Ae(r.storage, r._location, be())),
                    [4, r.storage.makeRequestWithTokens(t)]
                  );
                case 1:
                  return [2, e.sent().getPromise()];
              }
            });
          });
        })((e = v(e)));
      }
      function at(e, t) {
        return Qe((e = v(e)), t);
      }
      var st =
        (Object.defineProperty(ut.prototype, "bytesTransferred", {
          get: function () {
            return this._delegate.bytesTransferred;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(ut.prototype, "metadata", {
          get: function () {
            return this._delegate.metadata;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(ut.prototype, "state", {
          get: function () {
            return this._delegate.state;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(ut.prototype, "totalBytes", {
          get: function () {
            return this._delegate.totalBytes;
          },
          enumerable: !1,
          configurable: !0,
        }),
        ut);
      function ut(e, t, r) {
        (this._delegate = e), (this.task = t), (this.ref = r);
      }
      var ct =
        (Object.defineProperty(lt.prototype, "snapshot", {
          get: function () {
            return new st(this._delegate.snapshot, this, this._ref);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (lt.prototype.then = function (t, e) {
          var r = this;
          return this._delegate.then(function (e) {
            if (t) return t(new st(e, r, r._ref));
          }, e);
        }),
        (lt.prototype.on = function (e, t, r, n) {
          var o = this,
            i = void 0;
          return (
            t &&
              (i =
                "function" == typeof t
                  ? function (e) {
                      return t(new st(e, o, o._ref));
                    }
                  : {
                      next: t.next
                        ? function (e) {
                            return t.next(new st(e, o, o._ref));
                          }
                        : void 0,
                      complete: t.complete || void 0,
                      error: t.error || void 0,
                    }),
            this._delegate.on(e, i, r || void 0, n || void 0)
          );
        }),
        lt);
      function lt(e, t) {
        (this._delegate = e),
          (this._ref = t),
          (this.cancel = this._delegate.cancel.bind(this._delegate)),
          (this.catch = this._delegate.catch.bind(this._delegate)),
          (this.pause = this._delegate.pause.bind(this._delegate)),
          (this.resume = this._delegate.resume.bind(this._delegate));
      }
      var ht =
        (Object.defineProperty(pt.prototype, "prefixes", {
          get: function () {
            var t = this;
            return this._delegate.prefixes.map(function (e) {
              return new ft(e, t._service);
            });
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(pt.prototype, "items", {
          get: function () {
            var t = this;
            return this._delegate.items.map(function (e) {
              return new ft(e, t._service);
            });
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(pt.prototype, "nextPageToken", {
          get: function () {
            return this._delegate.nextPageToken || null;
          },
          enumerable: !1,
          configurable: !0,
        }),
        pt);
      function pt(e, t) {
        (this._delegate = e), (this._service = t);
      }
      var ft =
        (Object.defineProperty(dt.prototype, "name", {
          get: function () {
            return this._delegate.name;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(dt.prototype, "bucket", {
          get: function () {
            return this._delegate.bucket;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(dt.prototype, "fullPath", {
          get: function () {
            return this._delegate.fullPath;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (dt.prototype.toString = function () {
          return this._delegate.toString();
        }),
        (dt.prototype.child = function (e) {
          return new dt(Ze(this._delegate, e), this.storage);
        }),
        Object.defineProperty(dt.prototype, "root", {
          get: function () {
            return new dt(this._delegate.root, this.storage);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(dt.prototype, "parent", {
          get: function () {
            var e = this._delegate.parent;
            return null == e ? null : new dt(e, this.storage);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (dt.prototype.put = function (e, t) {
          return (
            this._throwIfRoot("put"), new ct(ot(this._delegate, e, t), this)
          );
        }),
        (dt.prototype.putString = function (e, t, r) {
          void 0 === t && (t = M.RAW), this._throwIfRoot("putString");
          (e = D(t, e)), (r = i({}, r));
          return (
            null == r.contentType &&
              null != e.contentType &&
              (r.contentType = e.contentType),
            new ct(new Fe(this._delegate, new le(e.data, !0), r), this)
          );
        }),
        (dt.prototype.listAll = function () {
          var t = this;
          return Ve(v(this._delegate)).then(function (e) {
            return new ht(e, t.storage);
          });
        }),
        (dt.prototype.list = function (e) {
          var t,
            r = this;
          return (
            (t = this._delegate),
            (e = e || void 0),
            Ge((t = v(t)), e).then(function (e) {
              return new ht(e, r.storage);
            })
          );
        }),
        (dt.prototype.getMetadata = function () {
          return it(this._delegate);
        }),
        (dt.prototype.updateMetadata = function (e) {
          return Xe(v(this._delegate), e);
        }),
        (dt.prototype.getDownloadURL = function () {
          return Ke(v(this._delegate));
        }),
        (dt.prototype.delete = function () {
          return this._throwIfRoot("delete"), Je(v(this._delegate));
        }),
        (dt.prototype._throwIfRoot = function (e) {
          if ("" === this._delegate._location.path) throw U(e);
        }),
        dt);
      function dt(e, t) {
        (this._delegate = e), (this.storage = t);
      }
      var _t =
        (Object.defineProperty(gt.prototype, "maxOperationRetryTime", {
          get: function () {
            return this._delegate.maxOperationRetryTime;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(gt.prototype, "maxUploadRetryTime", {
          get: function () {
            return this._delegate.maxUploadRetryTime;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (gt.prototype.ref = function (e) {
          if (Ye(e))
            throw x(
              "ref() expected a child path but got a URL, use refFromURL instead."
            );
          return new ft(at(this._delegate, e), this);
        }),
        (gt.prototype.refFromURL = function (e) {
          if (!Ye(e))
            throw x(
              "refFromURL() expected a full URL but got a child path, use ref() instead."
            );
          try {
            Z.makeFromUrl(e, this._delegate.host);
          } catch (e) {
            throw x(
              "refFromUrl() expected a valid full URL but got an invalid one."
            );
          }
          return new ft(at(this._delegate, e), this);
        }),
        (gt.prototype.setMaxUploadRetryTime = function (e) {
          this._delegate.maxUploadRetryTime = e;
        }),
        (gt.prototype.setMaxOperationRetryTime = function (e) {
          this._delegate.maxOperationRetryTime = e;
        }),
        (gt.prototype.useEmulator = function (e, t, r) {
          var n, o;
          (n = this._delegate),
            (o = r = void 0 === r ? {} : r),
            tt(n, e, t, (o = void 0 === r ? {} : o));
        }),
        gt);
      function gt(e, t) {
        (this.app = e), (this._delegate = t);
      }
      var bt, vt;
      function yt(e, t) {
        var r = t.instanceIdentifier,
          n = e.getProvider("app").getImmediate(),
          t = e.getProvider("auth-internal"),
          e = e.getProvider("app-check-internal");
        return new _t(n, new rt(n, t, e, new K(), r, o.default.SDK_VERSION));
      }
      (bt = o.default),
        (vt = {
          TaskState: W,
          TaskEvent: z,
          StringFormat: M,
          Storage: rt,
          Reference: ft,
        }),
        bt.INTERNAL.registerComponent(
          new y("storage", yt, "PUBLIC")
            .setServiceProps(vt)
            .setMultipleInstances(!0)
        ),
        bt.registerVersion("@firebase/storage", "0.7.0");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-storage.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-storage.js.map
