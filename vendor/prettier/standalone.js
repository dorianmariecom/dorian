(function (t) {
  function e() {
    var o = t();
    return o.default || o;
  }
  if (typeof exports == "object" && typeof module == "object")
    module.exports = e();
  else if (typeof define == "function" && define.amd) define(e);
  else {
    var f =
      typeof globalThis < "u"
        ? globalThis
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : this || {};
    f.prettier = e();
  }
})(function () {
  "use strict";
  var yu = Object.create;
  var He = Object.defineProperty;
  var Au = Object.getOwnPropertyDescriptor;
  var Bu = Object.getOwnPropertyNames;
  var wu = Object.getPrototypeOf,
    _u = Object.prototype.hasOwnProperty;
  var or = (e) => {
    throw TypeError(e);
  };
  var xu = (e, t) => () => (e && (t = e((e = 0))), t);
  var At = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t), t.exports
    ),
    We = (e, t) => {
      for (var r in t) He(e, r, { get: t[r], enumerable: !0 });
    },
    sr = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of Bu(t))
          !_u.call(e, i) &&
            i !== r &&
            He(e, i, {
              get: () => t[i],
              enumerable: !(n = Au(t, i)) || n.enumerable,
            });
      return e;
    };
  var Me = (e, t, r) => (
      (r = e != null ? yu(wu(e)) : {}),
      sr(
        t || !e || !e.__esModule
          ? He(r, "default", { value: e, enumerable: !0 })
          : r,
        e,
      )
    ),
    ar = (e) => sr(He({}, "__esModule", { value: !0 }), e);
  var vu = (e, t, r) => t.has(e) || or("Cannot " + r);
  var Dr = (e, t, r) =>
    t.has(e)
      ? or("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r);
  var pe = (e, t, r) => (vu(e, t, "access private method"), r);
  var ot = At((oa, sn) => {
    "use strict";
    var on = new Proxy(String, { get: () => on });
    sn.exports = on;
  });
  var Tn = {};
  We(Tn, { default: () => wi, shouldHighlight: () => Bi });
  var Bi,
    wi,
    kn = xu(() => {
      (Bi = () => !1), (wi = String);
    });
  var Pn = At((bD, Xt) => {
    var g = String,
      Ln = function () {
        return {
          isColorSupported: !1,
          reset: g,
          bold: g,
          dim: g,
          italic: g,
          underline: g,
          inverse: g,
          hidden: g,
          strikethrough: g,
          black: g,
          red: g,
          green: g,
          yellow: g,
          blue: g,
          magenta: g,
          cyan: g,
          white: g,
          gray: g,
          bgBlack: g,
          bgRed: g,
          bgGreen: g,
          bgYellow: g,
          bgBlue: g,
          bgMagenta: g,
          bgCyan: g,
          bgWhite: g,
        };
      };
    Xt.exports = Ln();
    Xt.exports.createColors = Ln;
  });
  var $n = At((Ct) => {
    "use strict";
    Object.defineProperty(Ct, "__esModule", { value: !0 });
    Ct.codeFrameColumns = Mn;
    Ct.default = Si;
    var In = (kn(), ar(Tn)),
      Hn = _i(Pn(), !0);
    function Wn(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Wn = function (n) {
        return n ? r : t;
      })(e);
    }
    function _i(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var r = Wn(t);
      if (r && r.has(e)) return r.get(e);
      var n = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if (u !== "default" && {}.hasOwnProperty.call(e, u)) {
          var o = i ? Object.getOwnPropertyDescriptor(e, u) : null;
          o && (o.get || o.set)
            ? Object.defineProperty(n, u, o)
            : (n[u] = e[u]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    var xi = Hn.default,
      Rn = (e, t) => (r) => e(t(r)),
      Zt;
    function vi(e) {
      if (e) {
        var t;
        return (t = Zt) != null || (Zt = (0, Hn.createColors)(!0)), Zt;
      }
      return xi;
    }
    var Yn = !1;
    function bi(e) {
      return {
        gutter: e.gray,
        marker: Rn(e.red, e.bold),
        message: Rn(e.red, e.bold),
      };
    }
    var jn = /\r\n|[\n\r\u2028\u2029]/;
    function Oi(e, t, r) {
      let n = Object.assign({ column: 0, line: -1 }, e.start),
        i = Object.assign({}, n, e.end),
        { linesAbove: u = 2, linesBelow: o = 3 } = r || {},
        s = n.line,
        a = n.column,
        D = i.line,
        l = i.column,
        d = Math.max(s - (u + 1), 0),
        f = Math.min(t.length, D + o);
      s === -1 && (d = 0), D === -1 && (f = t.length);
      let p = D - s,
        c = {};
      if (p)
        for (let F = 0; F <= p; F++) {
          let m = F + s;
          if (!a) c[m] = !0;
          else if (F === 0) {
            let E = t[m - 1].length;
            c[m] = [a, E - a + 1];
          } else if (F === p) c[m] = [0, l];
          else {
            let E = t[m - F].length;
            c[m] = [0, E];
          }
        }
      else a === l ? (a ? (c[s] = [a, 0]) : (c[s] = !0)) : (c[s] = [a, l - a]);
      return { start: d, end: f, markerLines: c };
    }
    function Mn(e, t, r = {}) {
      let n = (r.highlightCode || r.forceColor) && (0, In.shouldHighlight)(r),
        i = vi(r.forceColor),
        u = bi(i),
        o = (F, m) => (n ? F(m) : m),
        s = e.split(jn),
        { start: a, end: D, markerLines: l } = Oi(t, s, r),
        d = t.start && typeof t.start.column == "number",
        f = String(D).length,
        c = (n ? (0, In.default)(e, r) : e)
          .split(jn, D)
          .slice(a, D)
          .map((F, m) => {
            let E = a + 1 + m,
              w = ` ${` ${E}`.slice(-f)} |`,
              h = l[E],
              C = !l[E + 1];
            if (h) {
              let k = "";
              if (Array.isArray(h)) {
                let v = F.slice(0, Math.max(h[0] - 1, 0)).replace(
                    /[^\t]/g,
                    " ",
                  ),
                  $ = h[1] || 1;
                (k = [
                  `
 `,
                  o(u.gutter, w.replace(/\d/g, " ")),
                  " ",
                  v,
                  o(u.marker, "^").repeat($),
                ].join("")),
                  C && r.message && (k += " " + o(u.message, r.message));
              }
              return [
                o(u.marker, ">"),
                o(u.gutter, w),
                F.length > 0 ? ` ${F}` : "",
                k,
              ].join("");
            } else return ` ${o(u.gutter, w)}${F.length > 0 ? ` ${F}` : ""}`;
          }).join(`
`);
      return (
        r.message &&
          !d &&
          (c = `${" ".repeat(f + 1)}${r.message}
${c}`),
        n ? i.reset(c) : c
      );
    }
    function Si(e, t, r, n = {}) {
      if (!Yn) {
        Yn = !0;
        let u =
          "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        {
          let o = new Error(u);
          (o.name = "DeprecationWarning"), console.warn(new Error(u));
        }
      }
      return (r = Math.max(r, 0)), Mn(e, { start: { column: r, line: t } }, n);
    }
  });
  var po = {};
  We(po, {
    __debug: () => fo,
    check: () => lo,
    doc: () => nr,
    format: () => gu,
    formatWithCursor: () => Cu,
    getSupportInfo: () => co,
    util: () => ir,
    version: () => fu,
  });
  var bu = (e, t, r, n) => {
      if (!(e && t == null))
        return t.replaceAll
          ? t.replaceAll(r, n)
          : r.global
            ? t.replace(r, n)
            : t.split(r).join(n);
    },
    ne = bu;
  function Z() {}
  Z.prototype = {
    diff: function (t, r) {
      var n,
        i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        u = i.callback;
      typeof i == "function" && ((u = i), (i = {})), (this.options = i);
      var o = this;
      function s(h) {
        return u
          ? (setTimeout(function () {
              u(void 0, h);
            }, 0),
            !0)
          : h;
      }
      (t = this.castInput(t)),
        (r = this.castInput(r)),
        (t = this.removeEmpty(this.tokenize(t))),
        (r = this.removeEmpty(this.tokenize(r)));
      var a = r.length,
        D = t.length,
        l = 1,
        d = a + D;
      i.maxEditLength && (d = Math.min(d, i.maxEditLength));
      var f = (n = i.timeout) !== null && n !== void 0 ? n : 1 / 0,
        p = Date.now() + f,
        c = [{ oldPos: -1, lastComponent: void 0 }],
        F = this.extractCommon(c[0], r, t, 0);
      if (c[0].oldPos + 1 >= D && F + 1 >= a)
        return s([{ value: this.join(r), count: r.length }]);
      var m = -1 / 0,
        E = 1 / 0;
      function A() {
        for (var h = Math.max(m, -l); h <= Math.min(E, l); h += 2) {
          var C = void 0,
            k = c[h - 1],
            v = c[h + 1];
          k && (c[h - 1] = void 0);
          var $ = !1;
          if (v) {
            var ye = v.oldPos - h;
            $ = v && 0 <= ye && ye < a;
          }
          var yt = k && k.oldPos + 1 < D;
          if (!$ && !yt) {
            c[h] = void 0;
            continue;
          }
          if (
            (!yt || ($ && k.oldPos + 1 < v.oldPos)
              ? (C = o.addToPath(v, !0, void 0, 0))
              : (C = o.addToPath(k, void 0, !0, 1)),
            (F = o.extractCommon(C, r, t, h)),
            C.oldPos + 1 >= D && F + 1 >= a)
          )
            return s(Ou(o, C.lastComponent, r, t, o.useLongestToken));
          (c[h] = C),
            C.oldPos + 1 >= D && (E = Math.min(E, h - 1)),
            F + 1 >= a && (m = Math.max(m, h + 1));
        }
        l++;
      }
      if (u)
        (function h() {
          setTimeout(function () {
            if (l > d || Date.now() > p) return u();
            A() || h();
          }, 0);
        })();
      else
        for (; l <= d && Date.now() <= p; ) {
          var w = A();
          if (w) return w;
        }
    },
    addToPath: function (t, r, n, i) {
      var u = t.lastComponent;
      return u && u.added === r && u.removed === n
        ? {
            oldPos: t.oldPos + i,
            lastComponent: {
              count: u.count + 1,
              added: r,
              removed: n,
              previousComponent: u.previousComponent,
            },
          }
        : {
            oldPos: t.oldPos + i,
            lastComponent: {
              count: 1,
              added: r,
              removed: n,
              previousComponent: u,
            },
          };
    },
    extractCommon: function (t, r, n, i) {
      for (
        var u = r.length, o = n.length, s = t.oldPos, a = s - i, D = 0;
        a + 1 < u && s + 1 < o && this.equals(r[a + 1], n[s + 1]);

      )
        a++, s++, D++;
      return (
        D &&
          (t.lastComponent = { count: D, previousComponent: t.lastComponent }),
        (t.oldPos = s),
        a
      );
    },
    equals: function (t, r) {
      return this.options.comparator
        ? this.options.comparator(t, r)
        : t === r ||
            (this.options.ignoreCase && t.toLowerCase() === r.toLowerCase());
    },
    removeEmpty: function (t) {
      for (var r = [], n = 0; n < t.length; n++) t[n] && r.push(t[n]);
      return r;
    },
    castInput: function (t) {
      return t;
    },
    tokenize: function (t) {
      return t.split("");
    },
    join: function (t) {
      return t.join("");
    },
  };
  function Ou(e, t, r, n, i) {
    for (var u = [], o; t; )
      u.push(t), (o = t.previousComponent), delete t.previousComponent, (t = o);
    u.reverse();
    for (var s = 0, a = u.length, D = 0, l = 0; s < a; s++) {
      var d = u[s];
      if (d.removed) {
        if (
          ((d.value = e.join(n.slice(l, l + d.count))),
          (l += d.count),
          s && u[s - 1].added)
        ) {
          var p = u[s - 1];
          (u[s - 1] = u[s]), (u[s] = p);
        }
      } else {
        if (!d.added && i) {
          var f = r.slice(D, D + d.count);
          (f = f.map(function (F, m) {
            var E = n[l + m];
            return E.length > F.length ? E : F;
          })),
            (d.value = e.join(f));
        } else d.value = e.join(r.slice(D, D + d.count));
        (D += d.count), d.added || (l += d.count);
      }
    }
    var c = u[a - 1];
    return (
      a > 1 &&
        typeof c.value == "string" &&
        (c.added || c.removed) &&
        e.equals("", c.value) &&
        ((u[a - 2].value += c.value), u.pop()),
      u
    );
  }
  var ho = new Z();
  var lr = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
    cr = /\S/,
    fr = new Z();
  fr.equals = function (e, t) {
    return (
      this.options.ignoreCase && ((e = e.toLowerCase()), (t = t.toLowerCase())),
      e === t || (this.options.ignoreWhitespace && !cr.test(e) && !cr.test(t))
    );
  };
  fr.tokenize = function (e) {
    for (
      var t = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r = 0;
      r < t.length - 1;
      r++
    )
      !t[r + 1] &&
        t[r + 2] &&
        lr.test(t[r]) &&
        lr.test(t[r + 2]) &&
        ((t[r] += t[r + 2]), t.splice(r + 1, 2), r--);
    return t;
  };
  var pr = new Z();
  pr.tokenize = function (e) {
    this.options.stripTrailingCr &&
      (e = e.replace(
        /\r\n/g,
        `
`,
      ));
    var t = [],
      r = e.split(/(\n|\r\n)/);
    r[r.length - 1] || r.pop();
    for (var n = 0; n < r.length; n++) {
      var i = r[n];
      n % 2 && !this.options.newlineIsToken
        ? (t[t.length - 1] += i)
        : (this.options.ignoreWhitespace && (i = i.trim()), t.push(i));
    }
    return t;
  };
  var Su = new Z();
  Su.tokenize = function (e) {
    return e.split(/(\S.+?[.!?])(?=\s+|$)/);
  };
  var Nu = new Z();
  Nu.tokenize = function (e) {
    return e.split(/([{}:;,]|\s+)/);
  };
  function $e(e) {
    "@babel/helpers - typeof";
    return (
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? ($e = function (t) {
            return typeof t;
          })
        : ($e = function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
      $e(e)
    );
  }
  var Tu = Object.prototype.toString,
    Ae = new Z();
  Ae.useLongestToken = !0;
  Ae.tokenize = pr.tokenize;
  Ae.castInput = function (e) {
    var t = this.options,
      r = t.undefinedReplacement,
      n = t.stringifyReplacer,
      i =
        n === void 0
          ? function (u, o) {
              return typeof o > "u" ? r : o;
            }
          : n;
    return typeof e == "string"
      ? e
      : JSON.stringify(Bt(e, null, null, i), i, "  ");
  };
  Ae.equals = function (e, t) {
    return Z.prototype.equals.call(
      Ae,
      e.replace(/,([\r\n])/g, "$1"),
      t.replace(/,([\r\n])/g, "$1"),
    );
  };
  function Bt(e, t, r, n, i) {
    (t = t || []), (r = r || []), n && (e = n(i, e));
    var u;
    for (u = 0; u < t.length; u += 1) if (t[u] === e) return r[u];
    var o;
    if (Tu.call(e) === "[object Array]") {
      for (
        t.push(e), o = new Array(e.length), r.push(o), u = 0;
        u < e.length;
        u += 1
      )
        o[u] = Bt(e[u], t, r, n, i);
      return t.pop(), r.pop(), o;
    }
    if ((e && e.toJSON && (e = e.toJSON()), $e(e) === "object" && e !== null)) {
      t.push(e), (o = {}), r.push(o);
      var s = [],
        a;
      for (a in e) e.hasOwnProperty(a) && s.push(a);
      for (s.sort(), u = 0; u < s.length; u += 1)
        (a = s[u]), (o[a] = Bt(e[a], t, r, n, a));
      t.pop(), r.pop();
    } else o = e;
    return o;
  }
  var Ve = new Z();
  Ve.tokenize = function (e) {
    return e.slice();
  };
  Ve.join = Ve.removeEmpty = function (e) {
    return e;
  };
  function dr(e, t, r) {
    return Ve.diff(e, t, r);
  }
  function Fr(e) {
    let t = e.indexOf("\r");
    return t >= 0
      ? e.charAt(t + 1) ===
        `
`
        ? "crlf"
        : "cr"
      : "lf";
  }
  function Be(e) {
    switch (e) {
      case "cr":
        return "\r";
      case "crlf":
        return `\r
`;
      default:
        return `
`;
    }
  }
  function wt(e, t) {
    let r;
    switch (t) {
      case `
`:
        r = /\n/gu;
        break;
      case "\r":
        r = /\r/gu;
        break;
      case `\r
`:
        r = /\r\n/gu;
        break;
      default:
        throw new Error(`Unexpected "eol" ${JSON.stringify(t)}.`);
    }
    let n = e.match(r);
    return n ? n.length : 0;
  }
  function mr(e) {
    return ne(
      !1,
      e,
      /\r\n?/gu,
      `
`,
    );
  }
  var U = "string",
    W = "array",
    z = "cursor",
    L = "indent",
    P = "align",
    I = "trim",
    _ = "group",
    S = "fill",
    x = "if-break",
    R = "indent-if-break",
    Y = "line-suffix",
    j = "line-suffix-boundary",
    B = "line",
    N = "label",
    b = "break-parent",
    Ue = new Set([z, L, P, I, _, S, x, R, Y, j, B, N, b]);
  function ku(e) {
    if (typeof e == "string") return U;
    if (Array.isArray(e)) return W;
    if (!e) return;
    let { type: t } = e;
    if (Ue.has(t)) return t;
  }
  var G = ku;
  var Lu = (e) =>
    new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
  function Pu(e) {
    let t = e === null ? "null" : typeof e;
    if (t !== "string" && t !== "object")
      return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
    if (G(e)) throw new Error("doc is valid.");
    let r = Object.prototype.toString.call(e);
    if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
    let n = Lu([...Ue].map((i) => `'${i}'`));
    return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
  }
  var _t = class extends Error {
      name = "InvalidDocError";
      constructor(t) {
        super(Pu(t)), (this.doc = t);
      }
    },
    Q = _t;
  var Er = {};
  function Iu(e, t, r, n) {
    let i = [e];
    for (; i.length > 0; ) {
      let u = i.pop();
      if (u === Er) {
        r(i.pop());
        continue;
      }
      r && i.push(u, Er);
      let o = G(u);
      if (!o) throw new Q(u);
      if ((t == null ? void 0 : t(u)) !== !1)
        switch (o) {
          case W:
          case S: {
            let s = o === W ? u : u.parts;
            for (let a = s.length, D = a - 1; D >= 0; --D) i.push(s[D]);
            break;
          }
          case x:
            i.push(u.flatContents, u.breakContents);
            break;
          case _:
            if (n && u.expandedStates)
              for (let s = u.expandedStates.length, a = s - 1; a >= 0; --a)
                i.push(u.expandedStates[a]);
            else i.push(u.contents);
            break;
          case P:
          case L:
          case R:
          case N:
          case Y:
            i.push(u.contents);
            break;
          case U:
          case z:
          case I:
          case j:
          case B:
          case b:
            break;
          default:
            throw new Q(u);
        }
    }
  }
  var we = Iu;
  var hr = () => {},
    K = hr,
    ze = hr;
  function De(e) {
    return K(e), { type: L, contents: e };
  }
  function ae(e, t) {
    return K(t), { type: P, contents: t, n: e };
  }
  function xt(e, t = {}) {
    return (
      K(e),
      ze(t.expandedStates, !0),
      {
        type: _,
        id: t.id,
        contents: e,
        break: !!t.shouldBreak,
        expandedStates: t.expandedStates,
      }
    );
  }
  function Cr(e) {
    return ae(Number.NEGATIVE_INFINITY, e);
  }
  function gr(e) {
    return ae({ type: "root" }, e);
  }
  function yr(e) {
    return ae(-1, e);
  }
  function Ar(e, t) {
    return xt(e[0], { ...t, expandedStates: e });
  }
  function Ge(e) {
    return ze(e), { type: S, parts: e };
  }
  function Br(e, t = "", r = {}) {
    return (
      K(e),
      t !== "" && K(t),
      { type: x, breakContents: e, flatContents: t, groupId: r.groupId }
    );
  }
  function wr(e, t) {
    return K(e), { type: R, contents: e, groupId: t.groupId, negate: t.negate };
  }
  function _e(e) {
    return K(e), { type: Y, contents: e };
  }
  var _r = { type: j },
    de = { type: b },
    xr = { type: I },
    xe = { type: B, hard: !0 },
    vt = { type: B, hard: !0, literal: !0 },
    Ke = { type: B },
    vr = { type: B, soft: !0 },
    q = [xe, de],
    qe = [vt, de],
    ve = { type: z };
  function be(e, t) {
    K(e), ze(t);
    let r = [];
    for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
    return r;
  }
  function Je(e, t, r) {
    K(e);
    let n = e;
    if (t > 0) {
      for (let i = 0; i < Math.floor(t / r); ++i) n = De(n);
      (n = ae(t % r, n)), (n = ae(Number.NEGATIVE_INFINITY, n));
    }
    return n;
  }
  function br(e, t) {
    return K(t), e ? { type: N, label: e, contents: t } : t;
  }
  function ee(e) {
    var t;
    if (!e) return "";
    if (Array.isArray(e)) {
      let r = [];
      for (let n of e)
        if (Array.isArray(n)) r.push(...ee(n));
        else {
          let i = ee(n);
          i !== "" && r.push(i);
        }
      return r;
    }
    return e.type === x
      ? {
          ...e,
          breakContents: ee(e.breakContents),
          flatContents: ee(e.flatContents),
        }
      : e.type === _
        ? {
            ...e,
            contents: ee(e.contents),
            expandedStates: (t = e.expandedStates) == null ? void 0 : t.map(ee),
          }
        : e.type === S
          ? { type: "fill", parts: e.parts.map(ee) }
          : e.contents
            ? { ...e, contents: ee(e.contents) }
            : e;
  }
  function Or(e) {
    let t = Object.create(null),
      r = new Set();
    return n(ee(e));
    function n(u, o, s) {
      var a, D;
      if (typeof u == "string") return JSON.stringify(u);
      if (Array.isArray(u)) {
        let l = u.map(n).filter(Boolean);
        return l.length === 1 ? l[0] : `[${l.join(", ")}]`;
      }
      if (u.type === B) {
        let l =
          ((a = s == null ? void 0 : s[o + 1]) == null ? void 0 : a.type) === b;
        return u.literal
          ? l
            ? "literalline"
            : "literallineWithoutBreakParent"
          : u.hard
            ? l
              ? "hardline"
              : "hardlineWithoutBreakParent"
            : u.soft
              ? "softline"
              : "line";
      }
      if (u.type === b)
        return ((D = s == null ? void 0 : s[o - 1]) == null
          ? void 0
          : D.type) === B && s[o - 1].hard
          ? void 0
          : "breakParent";
      if (u.type === I) return "trim";
      if (u.type === L) return "indent(" + n(u.contents) + ")";
      if (u.type === P)
        return u.n === Number.NEGATIVE_INFINITY
          ? "dedentToRoot(" + n(u.contents) + ")"
          : u.n < 0
            ? "dedent(" + n(u.contents) + ")"
            : u.n.type === "root"
              ? "markAsRoot(" + n(u.contents) + ")"
              : "align(" + JSON.stringify(u.n) + ", " + n(u.contents) + ")";
      if (u.type === x)
        return (
          "ifBreak(" +
          n(u.breakContents) +
          (u.flatContents ? ", " + n(u.flatContents) : "") +
          (u.groupId
            ? (u.flatContents ? "" : ', ""') + `, { groupId: ${i(u.groupId)} }`
            : "") +
          ")"
        );
      if (u.type === R) {
        let l = [];
        u.negate && l.push("negate: true"),
          u.groupId && l.push(`groupId: ${i(u.groupId)}`);
        let d = l.length > 0 ? `, { ${l.join(", ")} }` : "";
        return `indentIfBreak(${n(u.contents)}${d})`;
      }
      if (u.type === _) {
        let l = [];
        u.break && u.break !== "propagated" && l.push("shouldBreak: true"),
          u.id && l.push(`id: ${i(u.id)}`);
        let d = l.length > 0 ? `, { ${l.join(", ")} }` : "";
        return u.expandedStates
          ? `conditionalGroup([${u.expandedStates.map((f) => n(f)).join(",")}]${d})`
          : `group(${n(u.contents)}${d})`;
      }
      if (u.type === S) return `fill([${u.parts.map((l) => n(l)).join(", ")}])`;
      if (u.type === Y) return "lineSuffix(" + n(u.contents) + ")";
      if (u.type === j) return "lineSuffixBoundary";
      if (u.type === N)
        return `label(${JSON.stringify(u.label)}, ${n(u.contents)})`;
      throw new Error("Unknown doc type " + u.type);
    }
    function i(u) {
      if (typeof u != "symbol") return JSON.stringify(String(u));
      if (u in t) return t[u];
      let o = u.description || "symbol";
      for (let s = 0; ; s++) {
        let a = o + (s > 0 ? ` #${s}` : "");
        if (!r.has(a))
          return r.add(a), (t[u] = `Symbol.for(${JSON.stringify(a)})`);
      }
    }
  }
  var Ru = (e, t, r) => {
      if (!(e && t == null))
        return Array.isArray(t) || typeof t == "string"
          ? t[r < 0 ? t.length + r : r]
          : t.at(r);
    },
    y = Ru;
  var Sr = () =>
    /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
  function Nr(e) {
    return (
      e === 12288 || (e >= 65281 && e <= 65376) || (e >= 65504 && e <= 65510)
    );
  }
  function Tr(e) {
    return (
      (e >= 4352 && e <= 4447) ||
      e === 8986 ||
      e === 8987 ||
      e === 9001 ||
      e === 9002 ||
      (e >= 9193 && e <= 9196) ||
      e === 9200 ||
      e === 9203 ||
      e === 9725 ||
      e === 9726 ||
      e === 9748 ||
      e === 9749 ||
      (e >= 9800 && e <= 9811) ||
      e === 9855 ||
      e === 9875 ||
      e === 9889 ||
      e === 9898 ||
      e === 9899 ||
      e === 9917 ||
      e === 9918 ||
      e === 9924 ||
      e === 9925 ||
      e === 9934 ||
      e === 9940 ||
      e === 9962 ||
      e === 9970 ||
      e === 9971 ||
      e === 9973 ||
      e === 9978 ||
      e === 9981 ||
      e === 9989 ||
      e === 9994 ||
      e === 9995 ||
      e === 10024 ||
      e === 10060 ||
      e === 10062 ||
      (e >= 10067 && e <= 10069) ||
      e === 10071 ||
      (e >= 10133 && e <= 10135) ||
      e === 10160 ||
      e === 10175 ||
      e === 11035 ||
      e === 11036 ||
      e === 11088 ||
      e === 11093 ||
      (e >= 11904 && e <= 11929) ||
      (e >= 11931 && e <= 12019) ||
      (e >= 12032 && e <= 12245) ||
      (e >= 12272 && e <= 12287) ||
      (e >= 12289 && e <= 12350) ||
      (e >= 12353 && e <= 12438) ||
      (e >= 12441 && e <= 12543) ||
      (e >= 12549 && e <= 12591) ||
      (e >= 12593 && e <= 12686) ||
      (e >= 12688 && e <= 12771) ||
      (e >= 12783 && e <= 12830) ||
      (e >= 12832 && e <= 12871) ||
      (e >= 12880 && e <= 19903) ||
      (e >= 19968 && e <= 42124) ||
      (e >= 42128 && e <= 42182) ||
      (e >= 43360 && e <= 43388) ||
      (e >= 44032 && e <= 55203) ||
      (e >= 63744 && e <= 64255) ||
      (e >= 65040 && e <= 65049) ||
      (e >= 65072 && e <= 65106) ||
      (e >= 65108 && e <= 65126) ||
      (e >= 65128 && e <= 65131) ||
      (e >= 94176 && e <= 94180) ||
      e === 94192 ||
      e === 94193 ||
      (e >= 94208 && e <= 100343) ||
      (e >= 100352 && e <= 101589) ||
      (e >= 101632 && e <= 101640) ||
      (e >= 110576 && e <= 110579) ||
      (e >= 110581 && e <= 110587) ||
      e === 110589 ||
      e === 110590 ||
      (e >= 110592 && e <= 110882) ||
      e === 110898 ||
      (e >= 110928 && e <= 110930) ||
      e === 110933 ||
      (e >= 110948 && e <= 110951) ||
      (e >= 110960 && e <= 111355) ||
      e === 126980 ||
      e === 127183 ||
      e === 127374 ||
      (e >= 127377 && e <= 127386) ||
      (e >= 127488 && e <= 127490) ||
      (e >= 127504 && e <= 127547) ||
      (e >= 127552 && e <= 127560) ||
      e === 127568 ||
      e === 127569 ||
      (e >= 127584 && e <= 127589) ||
      (e >= 127744 && e <= 127776) ||
      (e >= 127789 && e <= 127797) ||
      (e >= 127799 && e <= 127868) ||
      (e >= 127870 && e <= 127891) ||
      (e >= 127904 && e <= 127946) ||
      (e >= 127951 && e <= 127955) ||
      (e >= 127968 && e <= 127984) ||
      e === 127988 ||
      (e >= 127992 && e <= 128062) ||
      e === 128064 ||
      (e >= 128066 && e <= 128252) ||
      (e >= 128255 && e <= 128317) ||
      (e >= 128331 && e <= 128334) ||
      (e >= 128336 && e <= 128359) ||
      e === 128378 ||
      e === 128405 ||
      e === 128406 ||
      e === 128420 ||
      (e >= 128507 && e <= 128591) ||
      (e >= 128640 && e <= 128709) ||
      e === 128716 ||
      (e >= 128720 && e <= 128722) ||
      (e >= 128725 && e <= 128727) ||
      (e >= 128732 && e <= 128735) ||
      e === 128747 ||
      e === 128748 ||
      (e >= 128756 && e <= 128764) ||
      (e >= 128992 && e <= 129003) ||
      e === 129008 ||
      (e >= 129292 && e <= 129338) ||
      (e >= 129340 && e <= 129349) ||
      (e >= 129351 && e <= 129535) ||
      (e >= 129648 && e <= 129660) ||
      (e >= 129664 && e <= 129672) ||
      (e >= 129680 && e <= 129725) ||
      (e >= 129727 && e <= 129733) ||
      (e >= 129742 && e <= 129755) ||
      (e >= 129760 && e <= 129768) ||
      (e >= 129776 && e <= 129784) ||
      (e >= 131072 && e <= 196605) ||
      (e >= 196608 && e <= 262141)
    );
  }
  var kr = (e) => !(Nr(e) || Tr(e));
  var Yu = /[^\x20-\x7F]/u;
  function ju(e) {
    if (!e) return 0;
    if (!Yu.test(e)) return e.length;
    e = e.replace(Sr(), "  ");
    let t = 0;
    for (let r of e) {
      let n = r.codePointAt(0);
      n <= 31 ||
        (n >= 127 && n <= 159) ||
        (n >= 768 && n <= 879) ||
        (t += kr(n) ? 1 : 2);
    }
    return t;
  }
  var Oe = ju;
  function Ne(e, t) {
    if (typeof e == "string") return t(e);
    let r = new Map();
    return n(e);
    function n(u) {
      if (r.has(u)) return r.get(u);
      let o = i(u);
      return r.set(u, o), o;
    }
    function i(u) {
      switch (G(u)) {
        case W:
          return t(u.map(n));
        case S:
          return t({ ...u, parts: u.parts.map(n) });
        case x:
          return t({
            ...u,
            breakContents: n(u.breakContents),
            flatContents: n(u.flatContents),
          });
        case _: {
          let { expandedStates: o, contents: s } = u;
          return (
            o ? ((o = o.map(n)), (s = o[0])) : (s = n(s)),
            t({ ...u, contents: s, expandedStates: o })
          );
        }
        case P:
        case L:
        case R:
        case N:
        case Y:
          return t({ ...u, contents: n(u.contents) });
        case U:
        case z:
        case I:
        case j:
        case B:
        case b:
          return t(u);
        default:
          throw new Q(u);
      }
    }
  }
  function Xe(e, t, r) {
    let n = r,
      i = !1;
    function u(o) {
      if (i) return !1;
      let s = t(o);
      s !== void 0 && ((i = !0), (n = s));
    }
    return we(e, u), n;
  }
  function Hu(e) {
    if ((e.type === _ && e.break) || (e.type === B && e.hard) || e.type === b)
      return !0;
  }
  function Ir(e) {
    return Xe(e, Hu, !1);
  }
  function Lr(e) {
    if (e.length > 0) {
      let t = y(!1, e, -1);
      !t.expandedStates && !t.break && (t.break = "propagated");
    }
    return null;
  }
  function Rr(e) {
    let t = new Set(),
      r = [];
    function n(u) {
      if ((u.type === b && Lr(r), u.type === _)) {
        if ((r.push(u), t.has(u))) return !1;
        t.add(u);
      }
    }
    function i(u) {
      u.type === _ && r.pop().break && Lr(r);
    }
    we(e, n, i, !0);
  }
  function Wu(e) {
    return e.type === B && !e.hard
      ? e.soft
        ? ""
        : " "
      : e.type === x
        ? e.flatContents
        : e;
  }
  function Yr(e) {
    return Ne(e, Wu);
  }
  function Pr(e) {
    for (
      e = [...e];
      e.length >= 2 && y(!1, e, -2).type === B && y(!1, e, -1).type === b;

    )
      e.length -= 2;
    if (e.length > 0) {
      let t = Se(y(!1, e, -1));
      e[e.length - 1] = t;
    }
    return e;
  }
  function Se(e) {
    switch (G(e)) {
      case L:
      case R:
      case _:
      case Y:
      case N: {
        let t = Se(e.contents);
        return { ...e, contents: t };
      }
      case x:
        return {
          ...e,
          breakContents: Se(e.breakContents),
          flatContents: Se(e.flatContents),
        };
      case S:
        return { ...e, parts: Pr(e.parts) };
      case W:
        return Pr(e);
      case U:
        return e.replace(/[\n\r]*$/u, "");
      case P:
      case z:
      case I:
      case j:
      case B:
      case b:
        break;
      default:
        throw new Q(e);
    }
    return e;
  }
  function Ze(e) {
    return Se($u(e));
  }
  function Mu(e) {
    switch (G(e)) {
      case S:
        if (e.parts.every((t) => t === "")) return "";
        break;
      case _:
        if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
        if (
          e.contents.type === _ &&
          e.contents.id === e.id &&
          e.contents.break === e.break &&
          e.contents.expandedStates === e.expandedStates
        )
          return e.contents;
        break;
      case P:
      case L:
      case R:
      case Y:
        if (!e.contents) return "";
        break;
      case x:
        if (!e.flatContents && !e.breakContents) return "";
        break;
      case W: {
        let t = [];
        for (let r of e) {
          if (!r) continue;
          let [n, ...i] = Array.isArray(r) ? r : [r];
          typeof n == "string" && typeof y(!1, t, -1) == "string"
            ? (t[t.length - 1] += n)
            : t.push(n),
            t.push(...i);
        }
        return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
      }
      case U:
      case z:
      case I:
      case j:
      case B:
      case N:
      case b:
        break;
      default:
        throw new Q(e);
    }
    return e;
  }
  function $u(e) {
    return Ne(e, (t) => Mu(t));
  }
  function jr(e, t = qe) {
    return Ne(e, (r) =>
      typeof r == "string"
        ? be(
            t,
            r.split(`
`),
          )
        : r,
    );
  }
  function Vu(e) {
    if (e.type === B) return !0;
  }
  function Hr(e) {
    return Xe(e, Vu, !1);
  }
  function Qe(e, t) {
    return e.type === N ? { ...e, contents: t(e.contents) } : t(e);
  }
  var H = Symbol("MODE_BREAK"),
    J = Symbol("MODE_FLAT"),
    Te = Symbol("cursor");
  function Wr() {
    return { value: "", length: 0, queue: [] };
  }
  function Uu(e, t) {
    return bt(e, { type: "indent" }, t);
  }
  function zu(e, t, r) {
    return t === Number.NEGATIVE_INFINITY
      ? e.root || Wr()
      : t < 0
        ? bt(e, { type: "dedent" }, r)
        : t
          ? t.type === "root"
            ? { ...e, root: e }
            : bt(
                e,
                {
                  type: typeof t == "string" ? "stringAlign" : "numberAlign",
                  n: t,
                },
                r,
              )
          : e;
  }
  function bt(e, t, r) {
    let n = t.type === "dedent" ? e.queue.slice(0, -1) : [...e.queue, t],
      i = "",
      u = 0,
      o = 0,
      s = 0;
    for (let c of n)
      switch (c.type) {
        case "indent":
          l(), r.useTabs ? a(1) : D(r.tabWidth);
          break;
        case "stringAlign":
          l(), (i += c.n), (u += c.n.length);
          break;
        case "numberAlign":
          (o += 1), (s += c.n);
          break;
        default:
          throw new Error(`Unexpected type '${c.type}'`);
      }
    return f(), { ...e, value: i, length: u, queue: n };
    function a(c) {
      (i += "	".repeat(c)), (u += r.tabWidth * c);
    }
    function D(c) {
      (i += " ".repeat(c)), (u += c);
    }
    function l() {
      r.useTabs ? d() : f();
    }
    function d() {
      o > 0 && a(o), p();
    }
    function f() {
      s > 0 && D(s), p();
    }
    function p() {
      (o = 0), (s = 0);
    }
  }
  function Ot(e) {
    let t = 0,
      r = 0,
      n = e.length;
    e: for (; n--; ) {
      let i = e[n];
      if (i === Te) {
        r++;
        continue;
      }
      for (let u = i.length - 1; u >= 0; u--) {
        let o = i[u];
        if (o === " " || o === "	") t++;
        else {
          e[n] = i.slice(0, u + 1);
          break e;
        }
      }
    }
    if (t > 0 || r > 0) for (e.length = n + 1; r-- > 0; ) e.push(Te);
    return t;
  }
  function et(e, t, r, n, i, u) {
    if (r === Number.POSITIVE_INFINITY) return !0;
    let o = t.length,
      s = [e],
      a = [];
    for (; r >= 0; ) {
      if (s.length === 0) {
        if (o === 0) return !0;
        s.push(t[--o]);
        continue;
      }
      let { mode: D, doc: l } = s.pop(),
        d = G(l);
      switch (d) {
        case U:
          a.push(l), (r -= Oe(l));
          break;
        case W:
        case S: {
          let f = d === W ? l : l.parts;
          for (let p = f.length - 1; p >= 0; p--)
            s.push({ mode: D, doc: f[p] });
          break;
        }
        case L:
        case P:
        case R:
        case N:
          s.push({ mode: D, doc: l.contents });
          break;
        case I:
          r += Ot(a);
          break;
        case _: {
          if (u && l.break) return !1;
          let f = l.break ? H : D,
            p =
              l.expandedStates && f === H
                ? y(!1, l.expandedStates, -1)
                : l.contents;
          s.push({ mode: f, doc: p });
          break;
        }
        case x: {
          let p =
            (l.groupId ? i[l.groupId] || J : D) === H
              ? l.breakContents
              : l.flatContents;
          p && s.push({ mode: D, doc: p });
          break;
        }
        case B:
          if (D === H || l.hard) return !0;
          l.soft || (a.push(" "), r--);
          break;
        case Y:
          n = !0;
          break;
        case j:
          if (n) return !1;
          break;
      }
    }
    return !1;
  }
  function Fe(e, t) {
    let r = {},
      n = t.printWidth,
      i = Be(t.endOfLine),
      u = 0,
      o = [{ ind: Wr(), mode: H, doc: e }],
      s = [],
      a = !1,
      D = [],
      l = 0;
    for (Rr(e); o.length > 0; ) {
      let { ind: f, mode: p, doc: c } = o.pop();
      switch (G(c)) {
        case U: {
          let F =
            i !==
            `
`
              ? ne(
                  !1,
                  c,
                  `
`,
                  i,
                )
              : c;
          s.push(F), o.length > 0 && (u += Oe(F));
          break;
        }
        case W:
          for (let F = c.length - 1; F >= 0; F--)
            o.push({ ind: f, mode: p, doc: c[F] });
          break;
        case z:
          if (l >= 2) throw new Error("There are too many 'cursor' in doc.");
          s.push(Te), l++;
          break;
        case L:
          o.push({ ind: Uu(f, t), mode: p, doc: c.contents });
          break;
        case P:
          o.push({ ind: zu(f, c.n, t), mode: p, doc: c.contents });
          break;
        case I:
          u -= Ot(s);
          break;
        case _:
          switch (p) {
            case J:
              if (!a) {
                o.push({ ind: f, mode: c.break ? H : J, doc: c.contents });
                break;
              }
            case H: {
              a = !1;
              let F = { ind: f, mode: J, doc: c.contents },
                m = n - u,
                E = D.length > 0;
              if (!c.break && et(F, o, m, E, r)) o.push(F);
              else if (c.expandedStates) {
                let A = y(!1, c.expandedStates, -1);
                if (c.break) {
                  o.push({ ind: f, mode: H, doc: A });
                  break;
                } else
                  for (let w = 1; w < c.expandedStates.length + 1; w++)
                    if (w >= c.expandedStates.length) {
                      o.push({ ind: f, mode: H, doc: A });
                      break;
                    } else {
                      let h = c.expandedStates[w],
                        C = { ind: f, mode: J, doc: h };
                      if (et(C, o, m, E, r)) {
                        o.push(C);
                        break;
                      }
                    }
              } else o.push({ ind: f, mode: H, doc: c.contents });
              break;
            }
          }
          c.id && (r[c.id] = y(!1, o, -1).mode);
          break;
        case S: {
          let F = n - u,
            { parts: m } = c;
          if (m.length === 0) break;
          let [E, A] = m,
            w = { ind: f, mode: J, doc: E },
            h = { ind: f, mode: H, doc: E },
            C = et(w, [], F, D.length > 0, r, !0);
          if (m.length === 1) {
            C ? o.push(w) : o.push(h);
            break;
          }
          let k = { ind: f, mode: J, doc: A },
            v = { ind: f, mode: H, doc: A };
          if (m.length === 2) {
            C ? o.push(k, w) : o.push(v, h);
            break;
          }
          m.splice(0, 2);
          let $ = { ind: f, mode: p, doc: Ge(m) },
            ye = m[0];
          et({ ind: f, mode: J, doc: [E, A, ye] }, [], F, D.length > 0, r, !0)
            ? o.push($, k, w)
            : C
              ? o.push($, v, w)
              : o.push($, v, h);
          break;
        }
        case x:
        case R: {
          let F = c.groupId ? r[c.groupId] : p;
          if (F === H) {
            let m =
              c.type === x
                ? c.breakContents
                : c.negate
                  ? c.contents
                  : De(c.contents);
            m && o.push({ ind: f, mode: p, doc: m });
          }
          if (F === J) {
            let m =
              c.type === x
                ? c.flatContents
                : c.negate
                  ? De(c.contents)
                  : c.contents;
            m && o.push({ ind: f, mode: p, doc: m });
          }
          break;
        }
        case Y:
          D.push({ ind: f, mode: p, doc: c.contents });
          break;
        case j:
          D.length > 0 && o.push({ ind: f, mode: p, doc: xe });
          break;
        case B:
          switch (p) {
            case J:
              if (c.hard) a = !0;
              else {
                c.soft || (s.push(" "), (u += 1));
                break;
              }
            case H:
              if (D.length > 0) {
                o.push({ ind: f, mode: p, doc: c }, ...D.reverse()),
                  (D.length = 0);
                break;
              }
              c.literal
                ? f.root
                  ? (s.push(i, f.root.value), (u = f.root.length))
                  : (s.push(i), (u = 0))
                : ((u -= Ot(s)), s.push(i + f.value), (u = f.length));
              break;
          }
          break;
        case N:
          o.push({ ind: f, mode: p, doc: c.contents });
          break;
        case b:
          break;
        default:
          throw new Q(c);
      }
      o.length === 0 &&
        D.length > 0 &&
        (o.push(...D.reverse()), (D.length = 0));
    }
    let d = s.indexOf(Te);
    if (d !== -1) {
      let f = s.indexOf(Te, d + 1),
        p = s.slice(0, d).join(""),
        c = s.slice(d + 1, f).join(""),
        F = s.slice(f + 1).join("");
      return {
        formatted: p + c + F,
        cursorNodeStart: p.length,
        cursorNodeText: c,
      };
    }
    return { formatted: s.join("") };
  }
  function Gu(e, t, r = 0) {
    let n = 0;
    for (let i = r; i < e.length; ++i)
      e[i] === "	" ? (n = n + t - (n % t)) : n++;
    return n;
  }
  var me = Gu;
  var te,
    Nt,
    tt,
    St = class {
      constructor(t) {
        Dr(this, te);
        this.stack = [t];
      }
      get key() {
        let { stack: t, siblings: r } = this;
        return y(!1, t, r === null ? -2 : -4) ?? null;
      }
      get index() {
        return this.siblings === null ? null : y(!1, this.stack, -2);
      }
      get node() {
        return y(!1, this.stack, -1);
      }
      get parent() {
        return this.getNode(1);
      }
      get grandparent() {
        return this.getNode(2);
      }
      get isInArray() {
        return this.siblings !== null;
      }
      get siblings() {
        let { stack: t } = this,
          r = y(!1, t, -3);
        return Array.isArray(r) ? r : null;
      }
      get next() {
        let { siblings: t } = this;
        return t === null ? null : t[this.index + 1];
      }
      get previous() {
        let { siblings: t } = this;
        return t === null ? null : t[this.index - 1];
      }
      get isFirst() {
        return this.index === 0;
      }
      get isLast() {
        let { siblings: t, index: r } = this;
        return t !== null && r === t.length - 1;
      }
      get isRoot() {
        return this.stack.length === 1;
      }
      get root() {
        return this.stack[0];
      }
      get ancestors() {
        return [...pe(this, te, tt).call(this)];
      }
      getName() {
        let { stack: t } = this,
          { length: r } = t;
        return r > 1 ? y(!1, t, -2) : null;
      }
      getValue() {
        return y(!1, this.stack, -1);
      }
      getNode(t = 0) {
        let r = pe(this, te, Nt).call(this, t);
        return r === -1 ? null : this.stack[r];
      }
      getParentNode(t = 0) {
        return this.getNode(t + 1);
      }
      call(t, ...r) {
        let { stack: n } = this,
          { length: i } = n,
          u = y(!1, n, -1);
        for (let o of r) (u = u[o]), n.push(o, u);
        try {
          return t(this);
        } finally {
          n.length = i;
        }
      }
      callParent(t, r = 0) {
        let n = pe(this, te, Nt).call(this, r + 1),
          i = this.stack.splice(n + 1);
        try {
          return t(this);
        } finally {
          this.stack.push(...i);
        }
      }
      each(t, ...r) {
        let { stack: n } = this,
          { length: i } = n,
          u = y(!1, n, -1);
        for (let o of r) (u = u[o]), n.push(o, u);
        try {
          for (let o = 0; o < u.length; ++o)
            n.push(o, u[o]), t(this, o, u), (n.length -= 2);
        } finally {
          n.length = i;
        }
      }
      map(t, ...r) {
        let n = [];
        return (
          this.each(
            (i, u, o) => {
              n[u] = t(i, u, o);
            },
            ...r,
          ),
          n
        );
      }
      match(...t) {
        let r = this.stack.length - 1,
          n = null,
          i = this.stack[r--];
        for (let u of t) {
          if (i === void 0) return !1;
          let o = null;
          if (
            (typeof n == "number" &&
              ((o = n), (n = this.stack[r--]), (i = this.stack[r--])),
            u && !u(i, n, o))
          )
            return !1;
          (n = this.stack[r--]), (i = this.stack[r--]);
        }
        return !0;
      }
      findAncestor(t) {
        for (let r of pe(this, te, tt).call(this)) if (t(r)) return r;
      }
      hasAncestor(t) {
        for (let r of pe(this, te, tt).call(this)) if (t(r)) return !0;
        return !1;
      }
    };
  (te = new WeakSet()),
    (Nt = function (t) {
      let { stack: r } = this;
      for (let n = r.length - 1; n >= 0; n -= 2)
        if (!Array.isArray(r[n]) && --t < 0) return n;
      return -1;
    }),
    (tt = function* () {
      let { stack: t } = this;
      for (let r = t.length - 3; r >= 0; r -= 2) {
        let n = t[r];
        Array.isArray(n) || (yield n);
      }
    });
  var Mr = St;
  var $r = new Proxy(() => {}, { get: () => $r }),
    ke = $r;
  function Ku(e) {
    return e !== null && typeof e == "object";
  }
  var Vr = Ku;
  function* Tt(e, t) {
    let { getVisitorKeys: r, filter: n = () => !0 } = t,
      i = (u) => Vr(u) && n(u);
    for (let u of r(e)) {
      let o = e[u];
      if (Array.isArray(o)) for (let s of o) i(s) && (yield s);
      else i(o) && (yield o);
    }
  }
  function* Ur(e, t) {
    let r = [e];
    for (let n = 0; n < r.length; n++) {
      let i = r[n];
      for (let u of Tt(i, t)) yield u, r.push(u);
    }
  }
  function Ee(e) {
    return (t, r, n) => {
      let i = !!(n != null && n.backwards);
      if (r === !1) return !1;
      let { length: u } = t,
        o = r;
      for (; o >= 0 && o < u; ) {
        let s = t.charAt(o);
        if (e instanceof RegExp) {
          if (!e.test(s)) return o;
        } else if (!e.includes(s)) return o;
        i ? o-- : o++;
      }
      return o === -1 || o === u ? o : !1;
    };
  }
  var zr = Ee(/\s/u),
    T = Ee(" 	"),
    rt = Ee(",; 	"),
    nt = Ee(/[^\n\r]/u);
  function qu(e, t, r) {
    let n = !!(r != null && r.backwards);
    if (t === !1) return !1;
    let i = e.charAt(t);
    if (n) {
      if (
        e.charAt(t - 1) === "\r" &&
        i ===
          `
`
      )
        return t - 2;
      if (
        i ===
          `
` ||
        i === "\r" ||
        i === "\u2028" ||
        i === "\u2029"
      )
        return t - 1;
    } else {
      if (
        i === "\r" &&
        e.charAt(t + 1) ===
          `
`
      )
        return t + 2;
      if (
        i ===
          `
` ||
        i === "\r" ||
        i === "\u2028" ||
        i === "\u2029"
      )
        return t + 1;
    }
    return t;
  }
  var M = qu;
  function Ju(e, t, r = {}) {
    let n = T(e, r.backwards ? t - 1 : t, r),
      i = M(e, n, r);
    return n !== i;
  }
  var V = Ju;
  function Xu(e) {
    return Array.isArray(e) && e.length > 0;
  }
  var kt = Xu;
  var Gr = new Set([
      "tokens",
      "comments",
      "parent",
      "enclosingNode",
      "precedingNode",
      "followingNode",
    ]),
    Zu = (e) => Object.keys(e).filter((t) => !Gr.has(t));
  function Qu(e) {
    return e ? (t) => e(t, Gr) : Zu;
  }
  var X = Qu;
  function ei(e) {
    let t = e.type || e.kind || "(unknown type)",
      r = String(
        e.name ||
          (e.id && (typeof e.id == "object" ? e.id.name : e.id)) ||
          (e.key && (typeof e.key == "object" ? e.key.name : e.key)) ||
          (e.value && (typeof e.value == "object" ? "" : String(e.value))) ||
          e.operator ||
          "",
      );
    return (
      r.length > 20 && (r = r.slice(0, 19) + "\u2026"), t + (r ? " " + r : "")
    );
  }
  function Lt(e, t) {
    (e.comments ?? (e.comments = [])).push(t),
      (t.printed = !1),
      (t.nodeDescription = ei(e));
  }
  function ue(e, t) {
    (t.leading = !0), (t.trailing = !1), Lt(e, t);
  }
  function re(e, t, r) {
    (t.leading = !1), (t.trailing = !1), r && (t.marker = r), Lt(e, t);
  }
  function ie(e, t) {
    (t.leading = !1), (t.trailing = !0), Lt(e, t);
  }
  var Pt = new WeakMap();
  function ut(e, t) {
    if (Pt.has(e)) return Pt.get(e);
    let {
      printer: {
        getCommentChildNodes: r,
        canAttachComment: n,
        getVisitorKeys: i,
      },
      locStart: u,
      locEnd: o,
    } = t;
    if (!n) return [];
    let s = (
      (r == null ? void 0 : r(e, t)) ?? [...Tt(e, { getVisitorKeys: X(i) })]
    ).flatMap((a) => (n(a) ? [a] : ut(a, t)));
    return s.sort((a, D) => u(a) - u(D) || o(a) - o(D)), Pt.set(e, s), s;
  }
  function qr(e, t, r, n) {
    let { locStart: i, locEnd: u } = r,
      o = i(t),
      s = u(t),
      a = ut(e, r),
      D,
      l,
      d = 0,
      f = a.length;
    for (; d < f; ) {
      let p = (d + f) >> 1,
        c = a[p],
        F = i(c),
        m = u(c);
      if (F <= o && s <= m) return qr(c, t, r, c);
      if (m <= o) {
        (D = c), (d = p + 1);
        continue;
      }
      if (s <= F) {
        (l = c), (f = p);
        continue;
      }
      throw new Error("Comment location overlaps with node location");
    }
    if ((n == null ? void 0 : n.type) === "TemplateLiteral") {
      let { quasis: p } = n,
        c = Rt(p, t, r);
      D && Rt(p, D, r) !== c && (D = null),
        l && Rt(p, l, r) !== c && (l = null);
    }
    return { enclosingNode: n, precedingNode: D, followingNode: l };
  }
  var It = () => !1;
  function Jr(e, t) {
    let { comments: r } = e;
    if ((delete e.comments, !kt(r) || !t.printer.canAttachComment)) return;
    let n = [],
      {
        locStart: i,
        locEnd: u,
        printer: {
          experimentalFeatures: { avoidAstMutation: o = !1 } = {},
          handleComments: s = {},
        },
        originalText: a,
      } = t,
      { ownLine: D = It, endOfLine: l = It, remaining: d = It } = s,
      f = r.map((p, c) => ({
        ...qr(e, p, t),
        comment: p,
        text: a,
        options: t,
        ast: e,
        isLastComment: r.length - 1 === c,
      }));
    for (let [p, c] of f.entries()) {
      let {
        comment: F,
        precedingNode: m,
        enclosingNode: E,
        followingNode: A,
        text: w,
        options: h,
        ast: C,
        isLastComment: k,
      } = c;
      if (
        h.parser === "json" ||
        h.parser === "json5" ||
        h.parser === "jsonc" ||
        h.parser === "__js_expression" ||
        h.parser === "__ts_expression" ||
        h.parser === "__vue_expression" ||
        h.parser === "__vue_ts_expression"
      ) {
        if (i(F) - i(C) <= 0) {
          ue(C, F);
          continue;
        }
        if (u(F) - u(C) >= 0) {
          ie(C, F);
          continue;
        }
      }
      let v;
      if (
        (o
          ? (v = [c])
          : ((F.enclosingNode = E),
            (F.precedingNode = m),
            (F.followingNode = A),
            (v = [F, w, h, C, k])),
        ti(w, h, f, p))
      )
        (F.placement = "ownLine"),
          D(...v) || (A ? ue(A, F) : m ? ie(m, F) : E ? re(E, F) : re(C, F));
      else if (ri(w, h, f, p))
        (F.placement = "endOfLine"),
          l(...v) || (m ? ie(m, F) : A ? ue(A, F) : E ? re(E, F) : re(C, F));
      else if (((F.placement = "remaining"), !d(...v)))
        if (m && A) {
          let $ = n.length;
          $ > 0 && n[$ - 1].followingNode !== A && Kr(n, h), n.push(c);
        } else m ? ie(m, F) : A ? ue(A, F) : E ? re(E, F) : re(C, F);
    }
    if ((Kr(n, t), !o))
      for (let p of r)
        delete p.precedingNode, delete p.enclosingNode, delete p.followingNode;
  }
  var Xr = (e) => !/[\S\n\u2028\u2029]/u.test(e);
  function ti(e, t, r, n) {
    let { comment: i, precedingNode: u } = r[n],
      { locStart: o, locEnd: s } = t,
      a = o(i);
    if (u)
      for (let D = n - 1; D >= 0; D--) {
        let { comment: l, precedingNode: d } = r[D];
        if (d !== u || !Xr(e.slice(s(l), a))) break;
        a = o(l);
      }
    return V(e, a, { backwards: !0 });
  }
  function ri(e, t, r, n) {
    let { comment: i, followingNode: u } = r[n],
      { locStart: o, locEnd: s } = t,
      a = s(i);
    if (u)
      for (let D = n + 1; D < r.length; D++) {
        let { comment: l, followingNode: d } = r[D];
        if (d !== u || !Xr(e.slice(a, o(l)))) break;
        a = s(l);
      }
    return V(e, a);
  }
  function Kr(e, t) {
    var s, a;
    let r = e.length;
    if (r === 0) return;
    let { precedingNode: n, followingNode: i } = e[0],
      u = t.locStart(i),
      o;
    for (o = r; o > 0; --o) {
      let { comment: D, precedingNode: l, followingNode: d } = e[o - 1];
      ke.strictEqual(l, n), ke.strictEqual(d, i);
      let f = t.originalText.slice(t.locEnd(D), u);
      if (
        ((a = (s = t.printer).isGap) == null ? void 0 : a.call(s, f, t)) ??
        /^[\s(]*$/u.test(f)
      )
        u = t.locStart(D);
      else break;
    }
    for (let [D, { comment: l }] of e.entries()) D < o ? ie(n, l) : ue(i, l);
    for (let D of [n, i])
      D.comments &&
        D.comments.length > 1 &&
        D.comments.sort((l, d) => t.locStart(l) - t.locStart(d));
    e.length = 0;
  }
  function Rt(e, t, r) {
    let n = r.locStart(t) - 1;
    for (let i = 1; i < e.length; ++i) if (n < r.locStart(e[i])) return i - 1;
    return 0;
  }
  function ni(e, t) {
    let r = t - 1;
    (r = T(e, r, { backwards: !0 })),
      (r = M(e, r, { backwards: !0 })),
      (r = T(e, r, { backwards: !0 }));
    let n = M(e, r, { backwards: !0 });
    return r !== n;
  }
  var Le = ni;
  function Zr(e, t) {
    let r = e.node;
    return (r.printed = !0), t.printer.printComment(e, t);
  }
  function ui(e, t) {
    var l;
    let r = e.node,
      n = [Zr(e, t)],
      { printer: i, originalText: u, locStart: o, locEnd: s } = t;
    if ((l = i.isBlockComment) == null ? void 0 : l.call(i, r)) {
      let d = V(u, s(r)) ? (V(u, o(r), { backwards: !0 }) ? q : Ke) : " ";
      n.push(d);
    } else n.push(q);
    let D = M(u, T(u, s(r)));
    return D !== !1 && V(u, D) && n.push(q), n;
  }
  function ii(e, t, r) {
    var D;
    let n = e.node,
      i = Zr(e, t),
      { printer: u, originalText: o, locStart: s } = t,
      a = (D = u.isBlockComment) == null ? void 0 : D.call(u, n);
    if (
      (r != null && r.hasLineSuffix && !(r != null && r.isBlock)) ||
      V(o, s(n), { backwards: !0 })
    ) {
      let l = Le(o, s(n));
      return { doc: _e([q, l ? q : "", i]), isBlock: a, hasLineSuffix: !0 };
    }
    return !a || (r != null && r.hasLineSuffix)
      ? { doc: [_e([" ", i]), de], isBlock: a, hasLineSuffix: !0 }
      : { doc: [" ", i], isBlock: a, hasLineSuffix: !1 };
  }
  function oi(e, t) {
    let r = e.node;
    if (!r) return {};
    let n = t[Symbol.for("printedComments")];
    if ((r.comments || []).filter((a) => !n.has(a)).length === 0)
      return { leading: "", trailing: "" };
    let u = [],
      o = [],
      s;
    return (
      e.each(() => {
        let a = e.node;
        if (n != null && n.has(a)) return;
        let { leading: D, trailing: l } = a;
        D ? u.push(ui(e, t)) : l && ((s = ii(e, t, s)), o.push(s.doc));
      }, "comments"),
      { leading: u, trailing: o }
    );
  }
  function Qr(e, t, r) {
    let { leading: n, trailing: i } = oi(e, r);
    return !n && !i ? t : Qe(t, (u) => [n, u, i]);
  }
  function en(e) {
    let { [Symbol.for("comments")]: t, [Symbol.for("printedComments")]: r } = e;
    for (let n of t) {
      if (!n.printed && !r.has(n))
        throw new Error(
          'Comment "' +
            n.value.trim() +
            '" was not printed. Please report this error!',
        );
      delete n.printed;
    }
  }
  function si(e) {
    return () => {};
  }
  var tn = si;
  var Pe = class extends Error {
      name = "ConfigError";
    },
    Ie = class extends Error {
      name = "UndefinedParserError";
    };
  var rn = {
    cursorOffset: {
      category: "Special",
      type: "int",
      default: -1,
      range: { start: -1, end: 1 / 0, step: 1 },
      description:
        "Print (to stderr) where a cursor at the given position would move to after formatting.",
      cliCategory: "Editor",
    },
    endOfLine: {
      category: "Global",
      type: "choice",
      default: "lf",
      description: "Which end of line characters to apply.",
      choices: [
        {
          value: "lf",
          description:
            "Line Feed only (\\n), common on Linux and macOS as well as inside git repos",
        },
        {
          value: "crlf",
          description:
            "Carriage Return + Line Feed characters (\\r\\n), common on Windows",
        },
        {
          value: "cr",
          description: "Carriage Return character only (\\r), used very rarely",
        },
        {
          value: "auto",
          description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`,
        },
      ],
    },
    filepath: {
      category: "Special",
      type: "path",
      description:
        "Specify the input filepath. This will be used to do parser inference.",
      cliName: "stdin-filepath",
      cliCategory: "Other",
      cliDescription: "Path to the file to pretend that stdin comes from.",
    },
    insertPragma: {
      category: "Special",
      type: "boolean",
      default: !1,
      description: "Insert @format pragma into file's first docblock comment.",
      cliCategory: "Other",
    },
    parser: {
      category: "Global",
      type: "choice",
      default: void 0,
      description: "Which parser to use.",
      exception: (e) => typeof e == "string" || typeof e == "function",
      choices: [
        { value: "flow", description: "Flow" },
        { value: "babel", description: "JavaScript" },
        { value: "babel-flow", description: "Flow" },
        { value: "babel-ts", description: "TypeScript" },
        { value: "typescript", description: "TypeScript" },
        { value: "acorn", description: "JavaScript" },
        { value: "espree", description: "JavaScript" },
        { value: "meriyah", description: "JavaScript" },
        { value: "css", description: "CSS" },
        { value: "less", description: "Less" },
        { value: "scss", description: "SCSS" },
        { value: "json", description: "JSON" },
        { value: "json5", description: "JSON5" },
        { value: "jsonc", description: "JSON with Comments" },
        { value: "json-stringify", description: "JSON.stringify" },
        { value: "graphql", description: "GraphQL" },
        { value: "markdown", description: "Markdown" },
        { value: "mdx", description: "MDX" },
        { value: "vue", description: "Vue" },
        { value: "yaml", description: "YAML" },
        { value: "glimmer", description: "Ember / Handlebars" },
        { value: "html", description: "HTML" },
        { value: "angular", description: "Angular" },
        { value: "lwc", description: "Lightning Web Components" },
      ],
    },
    plugins: {
      type: "path",
      array: !0,
      default: [{ value: [] }],
      category: "Global",
      description:
        "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
      exception: (e) => typeof e == "string" || typeof e == "object",
      cliName: "plugin",
      cliCategory: "Config",
    },
    printWidth: {
      category: "Global",
      type: "int",
      default: 80,
      description: "The line length where Prettier will try wrap.",
      range: { start: 0, end: 1 / 0, step: 1 },
    },
    rangeEnd: {
      category: "Special",
      type: "int",
      default: 1 / 0,
      range: { start: 0, end: 1 / 0, step: 1 },
      description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`,
      cliCategory: "Editor",
    },
    rangeStart: {
      category: "Special",
      type: "int",
      default: 0,
      range: { start: 0, end: 1 / 0, step: 1 },
      description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`,
      cliCategory: "Editor",
    },
    requirePragma: {
      category: "Special",
      type: "boolean",
      default: !1,
      description: `Require either '@prettier' or '@format' to be present in the file's first docblock comment
in order for it to be formatted.`,
      cliCategory: "Other",
    },
    tabWidth: {
      type: "int",
      category: "Global",
      default: 2,
      description: "Number of spaces per indentation level.",
      range: { start: 0, end: 1 / 0, step: 1 },
    },
    useTabs: {
      category: "Global",
      type: "boolean",
      default: !1,
      description: "Indent with tabs instead of spaces.",
    },
    embeddedLanguageFormatting: {
      category: "Global",
      type: "choice",
      default: "auto",
      description:
        "Control how Prettier formats quoted code embedded in the file.",
      choices: [
        {
          value: "auto",
          description:
            "Format embedded code if Prettier can automatically identify it.",
        },
        {
          value: "off",
          description: "Never automatically format embedded code.",
        },
      ],
    },
  };
  function it({ plugins: e = [], showDeprecated: t = !1 } = {}) {
    let r = e.flatMap((i) => i.languages ?? []),
      n = [];
    for (let i of Di(Object.assign({}, ...e.map(({ options: u }) => u), rn)))
      (!t && i.deprecated) ||
        (Array.isArray(i.choices) &&
          (t || (i.choices = i.choices.filter((u) => !u.deprecated)),
          i.name === "parser" &&
            (i.choices = [...i.choices, ...ai(i.choices, r, e)])),
        (i.pluginDefaults = Object.fromEntries(
          e
            .filter((u) => {
              var o;
              return (
                ((o = u.defaultOptions) == null ? void 0 : o[i.name]) !== void 0
              );
            })
            .map((u) => [u.name, u.defaultOptions[i.name]]),
        )),
        n.push(i));
    return { languages: r, options: n };
  }
  function* ai(e, t, r) {
    let n = new Set(e.map((i) => i.value));
    for (let i of t)
      if (i.parsers) {
        for (let u of i.parsers)
          if (!n.has(u)) {
            n.add(u);
            let o = r.find(
                (a) =>
                  a.parsers &&
                  Object.prototype.hasOwnProperty.call(a.parsers, u),
              ),
              s = i.name;
            o != null && o.name && (s += ` (plugin: ${o.name})`),
              yield { value: u, description: s };
          }
      }
  }
  function Di(e) {
    let t = [];
    for (let [r, n] of Object.entries(e)) {
      let i = { name: r, ...n };
      Array.isArray(i.default) && (i.default = y(!1, i.default, -1).value),
        t.push(i);
    }
    return t;
  }
  var li = (e) => String(e).split(/[/\\]/u).pop();
  function nn(e, t) {
    if (!t) return;
    let r = li(t).toLowerCase();
    return (
      e.find(({ filenames: n }) =>
        n == null ? void 0 : n.some((i) => i.toLowerCase() === r),
      ) ??
      e.find(({ extensions: n }) =>
        n == null ? void 0 : n.some((i) => r.endsWith(i)),
      )
    );
  }
  function ci(e, t) {
    if (t)
      return (
        e.find(({ name: r }) => r.toLowerCase() === t) ??
        e.find(({ aliases: r }) => (r == null ? void 0 : r.includes(t))) ??
        e.find(({ extensions: r }) =>
          r == null ? void 0 : r.includes(`.${t}`),
        )
      );
  }
  function fi(e, t) {
    let r = e.plugins.flatMap((i) => i.languages ?? []),
      n =
        ci(r, t.language) ??
        nn(r, t.physicalFile) ??
        nn(r, t.file) ??
        (t.physicalFile, void 0);
    return n == null ? void 0 : n.parsers[0];
  }
  var un = fi;
  var oe = {
    key: (e) => (/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e)),
    value(e) {
      if (e === null || typeof e != "object") return JSON.stringify(e);
      if (Array.isArray(e)) return `[${e.map((r) => oe.value(r)).join(", ")}]`;
      let t = Object.keys(e);
      return t.length === 0
        ? "{}"
        : `{ ${t.map((r) => `${oe.key(r)}: ${oe.value(e[r])}`).join(", ")} }`;
    },
    pair: ({ key: e, value: t }) => oe.value({ [e]: t }),
  };
  var Yt = Me(ot(), 1),
    an = (e, t, { descriptor: r }) => {
      let n = [
        `${Yt.default.yellow(typeof e == "string" ? r.key(e) : r.pair(e))} is deprecated`,
      ];
      return (
        t &&
          n.push(
            `we now treat it as ${Yt.default.blue(typeof t == "string" ? r.key(t) : r.pair(t))}`,
          ),
        n.join("; ") + "."
      );
    };
  var le = Me(ot(), 1);
  var st = Symbol.for("vnopts.VALUE_NOT_EXIST"),
    he = Symbol.for("vnopts.VALUE_UNCHANGED");
  var Dn = " ".repeat(2),
    cn = (e, t, r) => {
      let { text: n, list: i } = r.normalizeExpectedResult(
          r.schemas[e].expected(r),
        ),
        u = [];
      return (
        n && u.push(ln(e, t, n, r.descriptor)),
        i &&
          u.push(
            [ln(e, t, i.title, r.descriptor)].concat(
              i.values.map((o) => fn(o, r.loggerPrintWidth)),
            ).join(`
`),
          ),
        pn(u, r.loggerPrintWidth)
      );
    };
  function ln(e, t, r, n) {
    return [
      `Invalid ${le.default.red(n.key(e))} value.`,
      `Expected ${le.default.blue(r)},`,
      `but received ${t === st ? le.default.gray("nothing") : le.default.red(n.value(t))}.`,
    ].join(" ");
  }
  function fn({ text: e, list: t }, r) {
    let n = [];
    return (
      e && n.push(`- ${le.default.blue(e)}`),
      t &&
        n.push(
          [`- ${le.default.blue(t.title)}:`].concat(
            t.values.map((i) =>
              fn(i, r - Dn.length).replace(/^|\n/g, `$&${Dn}`),
            ),
          ).join(`
`),
        ),
      pn(n, r)
    );
  }
  function pn(e, t) {
    if (e.length === 1) return e[0];
    let [r, n] = e,
      [i, u] = e.map(
        (o) =>
          o.split(
            `
`,
            1,
          )[0].length,
      );
    return i > t && i > u ? n : r;
  }
  var Wt = Me(ot(), 1);
  var jt = [],
    dn = [];
  function Ht(e, t) {
    if (e === t) return 0;
    let r = e;
    e.length > t.length && ((e = t), (t = r));
    let n = e.length,
      i = t.length;
    for (; n > 0 && e.charCodeAt(~-n) === t.charCodeAt(~-i); ) n--, i--;
    let u = 0;
    for (; u < n && e.charCodeAt(u) === t.charCodeAt(u); ) u++;
    if (((n -= u), (i -= u), n === 0)) return i;
    let o,
      s,
      a,
      D,
      l = 0,
      d = 0;
    for (; l < n; ) (dn[l] = e.charCodeAt(u + l)), (jt[l] = ++l);
    for (; d < i; )
      for (o = t.charCodeAt(u + d), a = d++, s = d, l = 0; l < n; l++)
        (D = o === dn[l] ? a : a + 1),
          (a = jt[l]),
          (s = jt[l] = a > s ? (D > s ? s + 1 : D) : D > a ? a + 1 : D);
    return s;
  }
  var at = (e, t, { descriptor: r, logger: n, schemas: i }) => {
    let u = [
        `Ignored unknown option ${Wt.default.yellow(r.pair({ key: e, value: t }))}.`,
      ],
      o = Object.keys(i)
        .sort()
        .find((s) => Ht(e, s) < 3);
    o && u.push(`Did you mean ${Wt.default.blue(r.key(o))}?`),
      n.warn(u.join(" "));
  };
  var pi = [
    "default",
    "expected",
    "validate",
    "deprecated",
    "forward",
    "redirect",
    "overlap",
    "preprocess",
    "postprocess",
  ];
  function di(e, t) {
    let r = new e(t),
      n = Object.create(r);
    for (let i of pi) i in t && (n[i] = Fi(t[i], r, O.prototype[i].length));
    return n;
  }
  var O = class {
    static create(t) {
      return di(this, t);
    }
    constructor(t) {
      this.name = t.name;
    }
    default(t) {}
    expected(t) {
      return "nothing";
    }
    validate(t, r) {
      return !1;
    }
    deprecated(t, r) {
      return !1;
    }
    forward(t, r) {}
    redirect(t, r) {}
    overlap(t, r, n) {
      return t;
    }
    preprocess(t, r) {
      return t;
    }
    postprocess(t, r) {
      return he;
    }
  };
  function Fi(e, t, r) {
    return typeof e == "function"
      ? (...n) => e(...n.slice(0, r - 1), t, ...n.slice(r - 1))
      : () => e;
  }
  var Dt = class extends O {
    constructor(t) {
      super(t), (this._sourceName = t.sourceName);
    }
    expected(t) {
      return t.schemas[this._sourceName].expected(t);
    }
    validate(t, r) {
      return r.schemas[this._sourceName].validate(t, r);
    }
    redirect(t, r) {
      return this._sourceName;
    }
  };
  var lt = class extends O {
    expected() {
      return "anything";
    }
    validate() {
      return !0;
    }
  };
  var ct = class extends O {
    constructor({ valueSchema: t, name: r = t.name, ...n }) {
      super({ ...n, name: r }), (this._valueSchema = t);
    }
    expected(t) {
      let { text: r, list: n } = t.normalizeExpectedResult(
        this._valueSchema.expected(t),
      );
      return {
        text: r && `an array of ${r}`,
        list: n && {
          title: "an array of the following values",
          values: [{ list: n }],
        },
      };
    }
    validate(t, r) {
      if (!Array.isArray(t)) return !1;
      let n = [];
      for (let i of t) {
        let u = r.normalizeValidateResult(this._valueSchema.validate(i, r), i);
        u !== !0 && n.push(u.value);
      }
      return n.length === 0 ? !0 : { value: n };
    }
    deprecated(t, r) {
      let n = [];
      for (let i of t) {
        let u = r.normalizeDeprecatedResult(
          this._valueSchema.deprecated(i, r),
          i,
        );
        u !== !1 && n.push(...u.map(({ value: o }) => ({ value: [o] })));
      }
      return n;
    }
    forward(t, r) {
      let n = [];
      for (let i of t) {
        let u = r.normalizeForwardResult(this._valueSchema.forward(i, r), i);
        n.push(...u.map(Fn));
      }
      return n;
    }
    redirect(t, r) {
      let n = [],
        i = [];
      for (let u of t) {
        let o = r.normalizeRedirectResult(this._valueSchema.redirect(u, r), u);
        "remain" in o && n.push(o.remain), i.push(...o.redirect.map(Fn));
      }
      return n.length === 0 ? { redirect: i } : { redirect: i, remain: n };
    }
    overlap(t, r) {
      return t.concat(r);
    }
  };
  function Fn({ from: e, to: t }) {
    return { from: [e], to: t };
  }
  var ft = class extends O {
    expected() {
      return "true or false";
    }
    validate(t) {
      return typeof t == "boolean";
    }
  };
  function En(e, t) {
    let r = Object.create(null);
    for (let n of e) {
      let i = n[t];
      if (r[i]) throw new Error(`Duplicate ${t} ${JSON.stringify(i)}`);
      r[i] = n;
    }
    return r;
  }
  function hn(e, t) {
    let r = new Map();
    for (let n of e) {
      let i = n[t];
      if (r.has(i)) throw new Error(`Duplicate ${t} ${JSON.stringify(i)}`);
      r.set(i, n);
    }
    return r;
  }
  function Cn() {
    let e = Object.create(null);
    return (t) => {
      let r = JSON.stringify(t);
      return e[r] ? !0 : ((e[r] = !0), !1);
    };
  }
  function gn(e, t) {
    let r = [],
      n = [];
    for (let i of e) t(i) ? r.push(i) : n.push(i);
    return [r, n];
  }
  function yn(e) {
    return e === Math.floor(e);
  }
  function An(e, t) {
    if (e === t) return 0;
    let r = typeof e,
      n = typeof t,
      i = ["undefined", "object", "boolean", "number", "string"];
    return r !== n
      ? i.indexOf(r) - i.indexOf(n)
      : r !== "string"
        ? Number(e) - Number(t)
        : e.localeCompare(t);
  }
  function Bn(e) {
    return (...t) => {
      let r = e(...t);
      return typeof r == "string" ? new Error(r) : r;
    };
  }
  function Mt(e) {
    return e === void 0 ? {} : e;
  }
  function $t(e) {
    if (typeof e == "string") return { text: e };
    let { text: t, list: r } = e;
    return (
      mi(
        (t || r) !== void 0,
        "Unexpected `expected` result, there should be at least one field.",
      ),
      r
        ? { text: t, list: { title: r.title, values: r.values.map($t) } }
        : { text: t }
    );
  }
  function Vt(e, t) {
    return e === !0 ? !0 : e === !1 ? { value: t } : e;
  }
  function Ut(e, t, r = !1) {
    return e === !1
      ? !1
      : e === !0
        ? r
          ? !0
          : [{ value: t }]
        : "value" in e
          ? [e]
          : e.length === 0
            ? !1
            : e;
  }
  function mn(e, t) {
    return typeof e == "string" || "key" in e
      ? { from: t, to: e }
      : "from" in e
        ? { from: e.from, to: e.to }
        : { from: t, to: e.to };
  }
  function pt(e, t) {
    return e === void 0
      ? []
      : Array.isArray(e)
        ? e.map((r) => mn(r, t))
        : [mn(e, t)];
  }
  function zt(e, t) {
    let r = pt(typeof e == "object" && "redirect" in e ? e.redirect : e, t);
    return r.length === 0
      ? { remain: t, redirect: r }
      : typeof e == "object" && "remain" in e
        ? { remain: e.remain, redirect: r }
        : { redirect: r };
  }
  function mi(e, t) {
    if (!e) throw new Error(t);
  }
  var dt = class extends O {
    constructor(t) {
      super(t),
        (this._choices = hn(
          t.choices.map((r) => (r && typeof r == "object" ? r : { value: r })),
          "value",
        ));
    }
    expected({ descriptor: t }) {
      let r = Array.from(this._choices.keys())
          .map((o) => this._choices.get(o))
          .filter(({ hidden: o }) => !o)
          .map((o) => o.value)
          .sort(An)
          .map(t.value),
        n = r.slice(0, -2),
        i = r.slice(-2);
      return {
        text: n.concat(i.join(" or ")).join(", "),
        list: { title: "one of the following values", values: r },
      };
    }
    validate(t) {
      return this._choices.has(t);
    }
    deprecated(t) {
      let r = this._choices.get(t);
      return r && r.deprecated ? { value: t } : !1;
    }
    forward(t) {
      let r = this._choices.get(t);
      return r ? r.forward : void 0;
    }
    redirect(t) {
      let r = this._choices.get(t);
      return r ? r.redirect : void 0;
    }
  };
  var Ft = class extends O {
    expected() {
      return "a number";
    }
    validate(t, r) {
      return typeof t == "number";
    }
  };
  var mt = class extends Ft {
    expected() {
      return "an integer";
    }
    validate(t, r) {
      return r.normalizeValidateResult(super.validate(t, r), t) === !0 && yn(t);
    }
  };
  var Re = class extends O {
    expected() {
      return "a string";
    }
    validate(t) {
      return typeof t == "string";
    }
  };
  var wn = oe,
    _n = at,
    xn = cn,
    vn = an;
  var Et = class {
    constructor(t, r) {
      let {
        logger: n = console,
        loggerPrintWidth: i = 80,
        descriptor: u = wn,
        unknown: o = _n,
        invalid: s = xn,
        deprecated: a = vn,
        missing: D = () => !1,
        required: l = () => !1,
        preprocess: d = (p) => p,
        postprocess: f = () => he,
      } = r || {};
      (this._utils = {
        descriptor: u,
        logger: n || { warn: () => {} },
        loggerPrintWidth: i,
        schemas: En(t, "name"),
        normalizeDefaultResult: Mt,
        normalizeExpectedResult: $t,
        normalizeDeprecatedResult: Ut,
        normalizeForwardResult: pt,
        normalizeRedirectResult: zt,
        normalizeValidateResult: Vt,
      }),
        (this._unknownHandler = o),
        (this._invalidHandler = Bn(s)),
        (this._deprecatedHandler = a),
        (this._identifyMissing = (p, c) => !(p in c) || D(p, c)),
        (this._identifyRequired = l),
        (this._preprocess = d),
        (this._postprocess = f),
        this.cleanHistory();
    }
    cleanHistory() {
      this._hasDeprecationWarned = Cn();
    }
    normalize(t) {
      let r = {},
        i = [this._preprocess(t, this._utils)],
        u = () => {
          for (; i.length !== 0; ) {
            let o = i.shift(),
              s = this._applyNormalization(o, r);
            i.push(...s);
          }
        };
      u();
      for (let o of Object.keys(this._utils.schemas)) {
        let s = this._utils.schemas[o];
        if (!(o in r)) {
          let a = Mt(s.default(this._utils));
          "value" in a && i.push({ [o]: a.value });
        }
      }
      u();
      for (let o of Object.keys(this._utils.schemas)) {
        if (!(o in r)) continue;
        let s = this._utils.schemas[o],
          a = r[o],
          D = s.postprocess(a, this._utils);
        D !== he && (this._applyValidation(D, o, s), (r[o] = D));
      }
      return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
    }
    _applyNormalization(t, r) {
      let n = [],
        { knownKeys: i, unknownKeys: u } = this._partitionOptionKeys(t);
      for (let o of i) {
        let s = this._utils.schemas[o],
          a = s.preprocess(t[o], this._utils);
        this._applyValidation(a, o, s);
        let D = ({ from: p, to: c }) => {
            n.push(typeof c == "string" ? { [c]: p } : { [c.key]: c.value });
          },
          l = ({ value: p, redirectTo: c }) => {
            let F = Ut(s.deprecated(p, this._utils), a, !0);
            if (F !== !1)
              if (F === !0)
                this._hasDeprecationWarned(o) ||
                  this._utils.logger.warn(
                    this._deprecatedHandler(o, c, this._utils),
                  );
              else
                for (let { value: m } of F) {
                  let E = { key: o, value: m };
                  if (!this._hasDeprecationWarned(E)) {
                    let A = typeof c == "string" ? { key: c, value: m } : c;
                    this._utils.logger.warn(
                      this._deprecatedHandler(E, A, this._utils),
                    );
                  }
                }
          };
        pt(s.forward(a, this._utils), a).forEach(D);
        let f = zt(s.redirect(a, this._utils), a);
        if ((f.redirect.forEach(D), "remain" in f)) {
          let p = f.remain;
          (r[o] = o in r ? s.overlap(r[o], p, this._utils) : p),
            l({ value: p });
        }
        for (let { from: p, to: c } of f.redirect)
          l({ value: p, redirectTo: c });
      }
      for (let o of u) {
        let s = t[o];
        this._applyUnknownHandler(o, s, r, (a, D) => {
          n.push({ [a]: D });
        });
      }
      return n;
    }
    _applyRequiredCheck(t) {
      for (let r of Object.keys(this._utils.schemas))
        if (this._identifyMissing(r, t) && this._identifyRequired(r))
          throw this._invalidHandler(r, st, this._utils);
    }
    _partitionOptionKeys(t) {
      let [r, n] = gn(
        Object.keys(t).filter((i) => !this._identifyMissing(i, t)),
        (i) => i in this._utils.schemas,
      );
      return { knownKeys: r, unknownKeys: n };
    }
    _applyValidation(t, r, n) {
      let i = Vt(n.validate(t, this._utils), t);
      if (i !== !0) throw this._invalidHandler(r, i.value, this._utils);
    }
    _applyUnknownHandler(t, r, n, i) {
      let u = this._unknownHandler(t, r, this._utils);
      if (u)
        for (let o of Object.keys(u)) {
          if (this._identifyMissing(o, u)) continue;
          let s = u[o];
          o in this._utils.schemas ? i(o, s) : (n[o] = s);
        }
    }
    _applyPostprocess(t) {
      let r = this._postprocess(t, this._utils);
      if (r !== he) {
        if (r.delete) for (let n of r.delete) delete t[n];
        if (r.override) {
          let { knownKeys: n, unknownKeys: i } = this._partitionOptionKeys(
            r.override,
          );
          for (let u of n) {
            let o = r.override[u];
            this._applyValidation(o, u, this._utils.schemas[u]), (t[u] = o);
          }
          for (let u of i) {
            let o = r.override[u];
            this._applyUnknownHandler(u, o, t, (s, a) => {
              let D = this._utils.schemas[s];
              this._applyValidation(a, s, D), (t[s] = a);
            });
          }
        }
      }
    }
  };
  var Gt;
  function hi(
    e,
    t,
    {
      logger: r = !1,
      isCLI: n = !1,
      passThrough: i = !1,
      FlagSchema: u,
      descriptor: o,
    } = {},
  ) {
    if (n) {
      if (!u) throw new Error("'FlagSchema' option is required.");
      if (!o) throw new Error("'descriptor' option is required.");
    } else o = oe;
    let s = i
        ? Array.isArray(i)
          ? (f, p) => (i.includes(f) ? { [f]: p } : void 0)
          : (f, p) => ({ [f]: p })
        : (f, p, c) => {
            let { _: F, ...m } = c.schemas;
            return at(f, p, { ...c, schemas: m });
          },
      a = Ci(t, { isCLI: n, FlagSchema: u }),
      D = new Et(a, { logger: r, unknown: s, descriptor: o }),
      l = r !== !1;
    l && Gt && (D._hasDeprecationWarned = Gt);
    let d = D.normalize(e);
    return l && (Gt = D._hasDeprecationWarned), d;
  }
  function Ci(e, { isCLI: t, FlagSchema: r }) {
    let n = [];
    t && n.push(lt.create({ name: "_" }));
    for (let i of e)
      n.push(gi(i, { isCLI: t, optionInfos: e, FlagSchema: r })),
        i.alias &&
          t &&
          n.push(Dt.create({ name: i.alias, sourceName: i.name }));
    return n;
  }
  function gi(e, { isCLI: t, optionInfos: r, FlagSchema: n }) {
    let { name: i } = e,
      u = { name: i },
      o,
      s = {};
    switch (e.type) {
      case "int":
        (o = mt), t && (u.preprocess = Number);
        break;
      case "string":
        o = Re;
        break;
      case "choice":
        (o = dt),
          (u.choices = e.choices.map((a) =>
            a != null && a.redirect
              ? { ...a, redirect: { to: { key: e.name, value: a.redirect } } }
              : a,
          ));
        break;
      case "boolean":
        o = ft;
        break;
      case "flag":
        (o = n),
          (u.flags = r.flatMap((a) =>
            [
              a.alias,
              a.description && a.name,
              a.oppositeDescription && `no-${a.name}`,
            ].filter(Boolean),
          ));
        break;
      case "path":
        o = Re;
        break;
      default:
        throw new Error(`Unexpected type ${e.type}`);
    }
    if (
      (e.exception
        ? (u.validate = (a, D, l) => e.exception(a) || D.validate(a, l))
        : (u.validate = (a, D, l) => a === void 0 || D.validate(a, l)),
      e.redirect &&
        (s.redirect = (a) =>
          a
            ? {
                to:
                  typeof e.redirect == "string"
                    ? e.redirect
                    : { key: e.redirect.option, value: e.redirect.value },
              }
            : void 0),
      e.deprecated && (s.deprecated = !0),
      t && !e.array)
    ) {
      let a = u.preprocess || ((D) => D);
      u.preprocess = (D, l, d) =>
        l.preprocess(a(Array.isArray(D) ? y(!1, D, -1) : D), d);
    }
    return e.array
      ? ct.create({
          ...(t ? { preprocess: (a) => (Array.isArray(a) ? a : [a]) } : {}),
          ...s,
          valueSchema: o.create(u),
        })
      : o.create({ ...u, ...s });
  }
  var bn = hi;
  var yi = (e, t, r) => {
      if (!(e && t == null)) {
        if (t.findLast) return t.findLast(r);
        for (let n = t.length - 1; n >= 0; n--) {
          let i = t[n];
          if (r(i, n, t)) return i;
        }
      }
    },
    Kt = yi;
  function qt(e, t) {
    if (!t) throw new Error("parserName is required.");
    let r = Kt(
      !1,
      e,
      (i) => i.parsers && Object.prototype.hasOwnProperty.call(i.parsers, t),
    );
    if (r) return r;
    let n = `Couldn't resolve parser "${t}".`;
    throw (
      ((n += " Plugins must be explicitly added to the standalone bundle."),
      new Pe(n))
    );
  }
  function On(e, t) {
    if (!t) throw new Error("astFormat is required.");
    let r = Kt(
      !1,
      e,
      (i) => i.printers && Object.prototype.hasOwnProperty.call(i.printers, t),
    );
    if (r) return r;
    let n = `Couldn't find plugin for AST format "${t}".`;
    throw (
      ((n += " Plugins must be explicitly added to the standalone bundle."),
      new Pe(n))
    );
  }
  function ht({ plugins: e, parser: t }) {
    let r = qt(e, t);
    return Jt(r, t);
  }
  function Jt(e, t) {
    let r = e.parsers[t];
    return typeof r == "function" ? r() : r;
  }
  function Sn(e, t) {
    let r = e.printers[t];
    return typeof r == "function" ? r() : r;
  }
  var Nn = {
    astFormat: "estree",
    printer: {},
    originalText: void 0,
    locStart: null,
    locEnd: null,
  };
  async function Ai(e, t = {}) {
    var d;
    let r = { ...e };
    if (!r.parser)
      if (r.filepath) {
        if (((r.parser = un(r, { physicalFile: r.filepath })), !r.parser))
          throw new Ie(`No parser could be inferred for file "${r.filepath}".`);
      } else
        throw new Ie(
          "No parser and no file path given, couldn't infer a parser.",
        );
    let n = it({ plugins: e.plugins, showDeprecated: !0 }).options,
      i = {
        ...Nn,
        ...Object.fromEntries(
          n.filter((f) => f.default !== void 0).map((f) => [f.name, f.default]),
        ),
      },
      u = qt(r.plugins, r.parser),
      o = await Jt(u, r.parser);
    (r.astFormat = o.astFormat),
      (r.locEnd = o.locEnd),
      (r.locStart = o.locStart);
    let s =
        (d = u.printers) != null && d[o.astFormat]
          ? u
          : On(r.plugins, o.astFormat),
      a = await Sn(s, o.astFormat);
    r.printer = a;
    let D = s.defaultOptions
        ? Object.fromEntries(
            Object.entries(s.defaultOptions).filter(([, f]) => f !== void 0),
          )
        : {},
      l = { ...i, ...D };
    for (let [f, p] of Object.entries(l))
      (r[f] === null || r[f] === void 0) && (r[f] = p);
    return (
      r.parser === "json" && (r.trailingComma = "none"),
      bn(r, n, { passThrough: Object.keys(Nn), ...t })
    );
  }
  var se = Ai;
  var Vn = Me($n(), 1);
  async function Ni(e, t) {
    let r = await ht(t),
      n = r.preprocess ? r.preprocess(e, t) : e;
    t.originalText = n;
    let i;
    try {
      i = await r.parse(n, t, t);
    } catch (u) {
      Ti(u, e);
    }
    return { text: n, ast: i };
  }
  function Ti(e, t) {
    let { loc: r } = e;
    if (r) {
      let n = (0, Vn.codeFrameColumns)(t, r, { highlightCode: !0 });
      throw (
        ((e.message +=
          `
` + n),
        (e.codeFrame = n),
        e)
      );
    }
    throw e;
  }
  var ce = Ni;
  async function Un(e, t, r, n, i) {
    let {
      embeddedLanguageFormatting: u,
      printer: { embed: o, hasPrettierIgnore: s = () => !1, getVisitorKeys: a },
    } = r;
    if (!o || u !== "auto") return;
    if (o.length > 2)
      throw new Error(
        "printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/en/plugins.html#optional-embed",
      );
    let D = X(o.getVisitorKeys ?? a),
      l = [];
    p();
    let d = e.stack;
    for (let { print: c, node: F, pathStack: m } of l)
      try {
        e.stack = m;
        let E = await c(f, t, e, r);
        E && i.set(F, E);
      } catch (E) {
        if (globalThis.PRETTIER_DEBUG) throw E;
      }
    e.stack = d;
    function f(c, F) {
      return ki(c, F, r, n);
    }
    function p() {
      let { node: c } = e;
      if (c === null || typeof c != "object" || s(e)) return;
      for (let m of D(c)) Array.isArray(c[m]) ? e.each(p, m) : e.call(p, m);
      let F = o(e, r);
      if (F) {
        if (typeof F == "function") {
          l.push({ print: F, node: c, pathStack: [...e.stack] });
          return;
        }
        i.set(c, F);
      }
    }
  }
  async function ki(e, t, r, n) {
    let i = await se(
        { ...r, ...t, parentParser: r.parser, originalText: e },
        { passThrough: !0 },
      ),
      { ast: u } = await ce(e, i),
      o = await n(u, i);
    return Ze(o);
  }
  function Li(e, t) {
    let {
        originalText: r,
        [Symbol.for("comments")]: n,
        locStart: i,
        locEnd: u,
        [Symbol.for("printedComments")]: o,
      } = t,
      { node: s } = e,
      a = i(s),
      D = u(s);
    for (let l of n) i(l) >= a && u(l) <= D && o.add(l);
    return r.slice(a, D);
  }
  var zn = Li;
  async function Ye(e, t) {
    ({ ast: e } = await Qt(e, t));
    let r = new Map(),
      n = new Mr(e),
      i = tn(t),
      u = new Map();
    await Un(n, s, t, Ye, u);
    let o = await Gn(n, t, s, void 0, u);
    return en(t), o;
    function s(D, l) {
      return D === void 0 || D === n
        ? a(l)
        : Array.isArray(D)
          ? n.call(() => a(l), ...D)
          : n.call(() => a(l), D);
    }
    function a(D) {
      i(n);
      let l = n.node;
      if (l == null) return "";
      let d = l && typeof l == "object" && D === void 0;
      if (d && r.has(l)) return r.get(l);
      let f = Gn(n, t, s, D, u);
      return d && r.set(l, f), f;
    }
  }
  function Gn(e, t, r, n, i) {
    var a;
    let { node: u } = e,
      { printer: o } = t,
      s;
    return (
      (a = o.hasPrettierIgnore) != null && a.call(o, e)
        ? (s = zn(e, t))
        : i.has(u)
          ? (s = i.get(u))
          : (s = o.print(e, t, r, n)),
      u === t.cursorNode && (s = Qe(s, (D) => [ve, D, ve])),
      o.printComment &&
        (!o.willPrintOwnComments || !o.willPrintOwnComments(e, t)) &&
        (s = Qr(e, s, t)),
      s
    );
  }
  async function Qt(e, t) {
    let r = e.comments ?? [];
    (t[Symbol.for("comments")] = r),
      (t[Symbol.for("tokens")] = e.tokens ?? []),
      (t[Symbol.for("printedComments")] = new Set()),
      Jr(e, t);
    let {
      printer: { preprocess: n },
    } = t;
    return (e = n ? await n(e, t) : e), { ast: e, comments: r };
  }
  function Pi(e, t) {
    let { cursorOffset: r, locStart: n, locEnd: i } = t,
      u = X(t.printer.getVisitorKeys),
      o = (a) => n(a) <= r && i(a) >= r,
      s = e;
    for (let a of Ur(e, { getVisitorKeys: u, filter: o })) s = a;
    return s;
  }
  var Kn = Pi;
  function Ii(e, t) {
    let {
      printer: { massageAstNode: r, getVisitorKeys: n },
    } = t;
    if (!r) return e;
    let i = X(n),
      u = r.ignoredProperties ?? new Set();
    return o(e);
    function o(s, a) {
      if (!(s !== null && typeof s == "object")) return s;
      if (Array.isArray(s)) return s.map((f) => o(f, a)).filter(Boolean);
      let D = {},
        l = new Set(i(s));
      for (let f in s)
        !Object.prototype.hasOwnProperty.call(s, f) ||
          u.has(f) ||
          (l.has(f) ? (D[f] = o(s[f], s)) : (D[f] = s[f]));
      let d = r(s, D, a);
      if (d !== null) return d ?? D;
    }
  }
  var qn = Ii;
  var Ri = (e, t, r) => {
      if (!(e && t == null)) {
        if (t.findLastIndex) return t.findLastIndex(r);
        for (let n = t.length - 1; n >= 0; n--) {
          let i = t[n];
          if (r(i, n, t)) return n;
        }
        return -1;
      }
    },
    Jn = Ri;
  var Yi = ({ parser: e }) =>
    e === "json" || e === "json5" || e === "jsonc" || e === "json-stringify";
  function ji(e, t) {
    let r = [e.node, ...e.parentNodes],
      n = new Set([t.node, ...t.parentNodes]);
    return r.find((i) => Qn.has(i.type) && n.has(i));
  }
  function Xn(e) {
    let t = Jn(!1, e, (r) => r.type !== "Program" && r.type !== "File");
    return t === -1 ? e : e.slice(0, t + 1);
  }
  function Hi(e, t, { locStart: r, locEnd: n }) {
    let i = e.node,
      u = t.node;
    if (i === u) return { startNode: i, endNode: u };
    let o = r(e.node);
    for (let a of Xn(t.parentNodes))
      if (r(a) >= o) u = a;
      else break;
    let s = n(t.node);
    for (let a of Xn(e.parentNodes)) {
      if (n(a) <= s) i = a;
      else break;
      if (i === u) break;
    }
    return { startNode: i, endNode: u };
  }
  function er(e, t, r, n, i = [], u) {
    let { locStart: o, locEnd: s } = r,
      a = o(e),
      D = s(e);
    if (
      !(
        t > D ||
        t < a ||
        (u === "rangeEnd" && t === a) ||
        (u === "rangeStart" && t === D)
      )
    ) {
      for (let l of ut(e, r)) {
        let d = er(l, t, r, n, [e, ...i], u);
        if (d) return d;
      }
      if (!n || n(e, i[0])) return { node: e, parentNodes: i };
    }
  }
  function Wi(e, t) {
    return (
      t !== "DeclareExportDeclaration" &&
      e !== "TypeParameterDeclaration" &&
      (e === "Directive" ||
        e === "TypeAlias" ||
        e === "TSExportAssignment" ||
        e.startsWith("Declare") ||
        e.startsWith("TSDeclare") ||
        e.endsWith("Statement") ||
        e.endsWith("Declaration"))
    );
  }
  var Qn = new Set([
      "JsonRoot",
      "ObjectExpression",
      "ArrayExpression",
      "StringLiteral",
      "NumericLiteral",
      "BooleanLiteral",
      "NullLiteral",
      "UnaryExpression",
      "TemplateLiteral",
    ]),
    Mi = new Set([
      "OperationDefinition",
      "FragmentDefinition",
      "VariableDefinition",
      "TypeExtensionDefinition",
      "ObjectTypeDefinition",
      "FieldDefinition",
      "DirectiveDefinition",
      "EnumTypeDefinition",
      "EnumValueDefinition",
      "InputValueDefinition",
      "InputObjectTypeDefinition",
      "SchemaDefinition",
      "OperationTypeDefinition",
      "InterfaceTypeDefinition",
      "UnionTypeDefinition",
      "ScalarTypeDefinition",
    ]);
  function Zn(e, t, r) {
    if (!t) return !1;
    switch (e.parser) {
      case "flow":
      case "babel":
      case "babel-flow":
      case "babel-ts":
      case "typescript":
      case "acorn":
      case "espree":
      case "meriyah":
      case "__babel_estree":
        return Wi(t.type, r == null ? void 0 : r.type);
      case "json":
      case "json5":
      case "jsonc":
      case "json-stringify":
        return Qn.has(t.type);
      case "graphql":
        return Mi.has(t.kind);
      case "vue":
        return t.tag !== "root";
    }
    return !1;
  }
  function eu(e, t, r) {
    let { rangeStart: n, rangeEnd: i, locStart: u, locEnd: o } = t;
    ke.ok(i > n);
    let s = e.slice(n, i).search(/\S/u),
      a = s === -1;
    if (!a) for (n += s; i > n && !/\S/u.test(e[i - 1]); --i);
    let D = er(r, n, t, (p, c) => Zn(t, p, c), [], "rangeStart"),
      l = a ? D : er(r, i, t, (p) => Zn(t, p), [], "rangeEnd");
    if (!D || !l) return { rangeStart: 0, rangeEnd: 0 };
    let d, f;
    if (Yi(t)) {
      let p = ji(D, l);
      (d = p), (f = p);
    } else ({ startNode: d, endNode: f } = Hi(D, l, t));
    return { rangeStart: Math.min(u(d), u(f)), rangeEnd: Math.max(o(d), o(f)) };
  }
  var uu = "\uFEFF",
    tu = Symbol("cursor");
  async function iu(e, t, r = 0) {
    if (!e || e.trim().length === 0)
      return { formatted: "", cursorOffset: -1, comments: [] };
    let { ast: n, text: i } = await ce(e, t);
    t.cursorOffset >= 0 && (t.cursorNode = Kn(n, t));
    let u = await Ye(n, t, r);
    r > 0 && (u = Je([q, u], r, t.tabWidth));
    let o = Fe(u, t);
    if (r > 0) {
      let a = o.formatted.trim();
      o.cursorNodeStart !== void 0 &&
        (o.cursorNodeStart -= o.formatted.indexOf(a)),
        (o.formatted = a + Be(t.endOfLine));
    }
    let s = t[Symbol.for("comments")];
    if (t.cursorOffset >= 0) {
      let a, D, l, d, f;
      if (
        (t.cursorNode && o.cursorNodeText
          ? ((a = t.locStart(t.cursorNode)),
            (D = i.slice(a, t.locEnd(t.cursorNode))),
            (l = t.cursorOffset - a),
            (d = o.cursorNodeStart),
            (f = o.cursorNodeText))
          : ((a = 0),
            (D = i),
            (l = t.cursorOffset),
            (d = 0),
            (f = o.formatted)),
        D === f)
      )
        return { formatted: o.formatted, cursorOffset: d + l, comments: s };
      let p = D.split("");
      p.splice(l, 0, tu);
      let c = f.split(""),
        F = dr(p, c),
        m = d;
      for (let E of F)
        if (E.removed) {
          if (E.value.includes(tu)) break;
        } else m += E.count;
      return { formatted: o.formatted, cursorOffset: m, comments: s };
    }
    return { formatted: o.formatted, cursorOffset: -1, comments: s };
  }
  async function $i(e, t) {
    let { ast: r, text: n } = await ce(e, t),
      { rangeStart: i, rangeEnd: u } = eu(n, t, r),
      o = n.slice(i, u),
      s = Math.min(
        i,
        n.lastIndexOf(
          `
`,
          i,
        ) + 1,
      ),
      a = n.slice(s, i).match(/^\s*/u)[0],
      D = me(a, t.tabWidth),
      l = await iu(
        o,
        {
          ...t,
          rangeStart: 0,
          rangeEnd: Number.POSITIVE_INFINITY,
          cursorOffset:
            t.cursorOffset > i && t.cursorOffset <= u ? t.cursorOffset - i : -1,
          endOfLine: "lf",
        },
        D,
      ),
      d = l.formatted.trimEnd(),
      { cursorOffset: f } = t;
    f > u
      ? (f += d.length - o.length)
      : l.cursorOffset >= 0 && (f = l.cursorOffset + i);
    let p = n.slice(0, i) + d + n.slice(u);
    if (t.endOfLine !== "lf") {
      let c = Be(t.endOfLine);
      f >= 0 &&
        c ===
          `\r
` &&
        (f += wt(
          p.slice(0, f),
          `
`,
        )),
        (p = ne(
          !1,
          p,
          `
`,
          c,
        ));
    }
    return { formatted: p, cursorOffset: f, comments: l.comments };
  }
  function tr(e, t, r) {
    return typeof t != "number" || Number.isNaN(t) || t < 0 || t > e.length
      ? r
      : t;
  }
  function ru(e, t) {
    let { cursorOffset: r, rangeStart: n, rangeEnd: i } = t;
    return (
      (r = tr(e, r, -1)),
      (n = tr(e, n, 0)),
      (i = tr(e, i, e.length)),
      { ...t, cursorOffset: r, rangeStart: n, rangeEnd: i }
    );
  }
  function ou(e, t) {
    let {
        cursorOffset: r,
        rangeStart: n,
        rangeEnd: i,
        endOfLine: u,
      } = ru(e, t),
      o = e.charAt(0) === uu;
    if (
      (o && ((e = e.slice(1)), r--, n--, i--),
      u === "auto" && (u = Fr(e)),
      e.includes("\r"))
    ) {
      let s = (a) =>
        wt(
          e.slice(0, Math.max(a, 0)),
          `\r
`,
        );
      (r -= s(r)), (n -= s(n)), (i -= s(i)), (e = mr(e));
    }
    return {
      hasBOM: o,
      text: e,
      options: ru(e, {
        ...t,
        cursorOffset: r,
        rangeStart: n,
        rangeEnd: i,
        endOfLine: u,
      }),
    };
  }
  async function nu(e, t) {
    let r = await ht(t);
    return !r.hasPragma || r.hasPragma(e);
  }
  async function rr(e, t) {
    let { hasBOM: r, text: n, options: i } = ou(e, await se(t));
    if (
      (i.rangeStart >= i.rangeEnd && n !== "") ||
      (i.requirePragma && !(await nu(n, i)))
    )
      return { formatted: e, cursorOffset: t.cursorOffset, comments: [] };
    let u;
    return (
      i.rangeStart > 0 || i.rangeEnd < n.length
        ? (u = await $i(n, i))
        : (!i.requirePragma &&
            i.insertPragma &&
            i.printer.insertPragma &&
            !(await nu(n, i)) &&
            (n = i.printer.insertPragma(n)),
          (u = await iu(n, i))),
      r &&
        ((u.formatted = uu + u.formatted),
        u.cursorOffset >= 0 && u.cursorOffset++),
      u
    );
  }
  async function su(e, t, r) {
    let { text: n, options: i } = ou(e, await se(t)),
      u = await ce(n, i);
    return (
      r &&
        (r.preprocessForPrint && (u.ast = await Qt(u.ast, i)),
        r.massage && (u.ast = qn(u.ast, i))),
      u
    );
  }
  async function au(e, t) {
    t = await se(t);
    let r = await Ye(e, t);
    return Fe(r, t);
  }
  async function Du(e, t) {
    let r = Or(e),
      { formatted: n } = await rr(r, { ...t, parser: "__js_expression" });
    return n;
  }
  async function lu(e, t) {
    t = await se(t);
    let { ast: r } = await ce(e, t);
    return Ye(r, t);
  }
  async function cu(e, t) {
    return Fe(e, await se(t));
  }
  var nr = {};
  We(nr, { builders: () => Ui, printer: () => zi, utils: () => Gi });
  var Ui = {
      join: be,
      line: Ke,
      softline: vr,
      hardline: q,
      literalline: qe,
      group: xt,
      conditionalGroup: Ar,
      fill: Ge,
      lineSuffix: _e,
      lineSuffixBoundary: _r,
      cursor: ve,
      breakParent: de,
      ifBreak: Br,
      trim: xr,
      indent: De,
      indentIfBreak: wr,
      align: ae,
      addAlignmentToDoc: Je,
      markAsRoot: gr,
      dedentToRoot: Cr,
      dedent: yr,
      hardlineWithoutBreakParent: xe,
      literallineWithoutBreakParent: vt,
      label: br,
      concat: (e) => e,
    },
    zi = { printDocToString: Fe },
    Gi = {
      willBreak: Ir,
      traverseDoc: we,
      findInDoc: Xe,
      mapDoc: Ne,
      removeLines: Yr,
      stripTrailingHardline: Ze,
      replaceEndOfLine: jr,
      canBreak: Hr,
    };
  var fu = "3.3.3";
  var ir = {};
  We(ir, {
    addDanglingComment: () => re,
    addLeadingComment: () => ue,
    addTrailingComment: () => ie,
    getAlignmentSize: () => me,
    getIndentSize: () => pu,
    getMaxContinuousCount: () => du,
    getNextNonSpaceNonCommentCharacter: () => Fu,
    getNextNonSpaceNonCommentCharacterIndex: () => io,
    getStringWidth: () => Oe,
    hasNewline: () => V,
    hasNewlineInRange: () => mu,
    hasSpaces: () => Eu,
    isNextLineEmpty: () => Do,
    isNextLineEmptyAfterIndex: () => gt,
    isPreviousLineEmpty: () => so,
    makeString: () => hu,
    skip: () => Ee,
    skipEverythingButNewLine: () => nt,
    skipInlineComment: () => Ce,
    skipNewline: () => M,
    skipSpaces: () => T,
    skipToLineEnd: () => rt,
    skipTrailingComment: () => ge,
    skipWhitespace: () => zr,
  });
  function Ki(e, t) {
    if (t === !1) return !1;
    if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
      for (let r = t + 2; r < e.length; ++r)
        if (e.charAt(r) === "*" && e.charAt(r + 1) === "/") return r + 2;
    }
    return t;
  }
  var Ce = Ki;
  function qi(e, t) {
    return t === !1
      ? !1
      : e.charAt(t) === "/" && e.charAt(t + 1) === "/"
        ? nt(e, t)
        : t;
  }
  var ge = qi;
  function Ji(e, t) {
    let r = null,
      n = t;
    for (; n !== r; )
      (r = n), (n = T(e, n)), (n = Ce(e, n)), (n = ge(e, n)), (n = M(e, n));
    return n;
  }
  var je = Ji;
  function Xi(e, t) {
    let r = null,
      n = t;
    for (; n !== r; ) (r = n), (n = rt(e, n)), (n = Ce(e, n)), (n = T(e, n));
    return (n = ge(e, n)), (n = M(e, n)), n !== !1 && V(e, n);
  }
  var gt = Xi;
  function Zi(e, t) {
    let r = e.lastIndexOf(`
`);
    return r === -1 ? 0 : me(e.slice(r + 1).match(/^[\t ]*/u)[0], t);
  }
  var pu = Zi;
  function ur(e) {
    if (typeof e != "string") throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  function Qi(e, t) {
    let r = e.match(new RegExp(`(${ur(t)})+`, "gu"));
    return r === null
      ? 0
      : r.reduce((n, i) => Math.max(n, i.length / t.length), 0);
  }
  var du = Qi;
  function eo(e, t) {
    let r = je(e, t);
    return r === !1 ? "" : e.charAt(r);
  }
  var Fu = eo;
  function to(e, t, r) {
    for (let n = t; n < r; ++n)
      if (
        e.charAt(n) ===
        `
`
      )
        return !0;
    return !1;
  }
  var mu = to;
  function ro(e, t, r = {}) {
    return T(e, r.backwards ? t - 1 : t, r) !== t;
  }
  var Eu = ro;
  function no(e, t, r) {
    let n = t === '"' ? "'" : '"',
      u = ne(!1, e, /\\(.)|(["'])/gsu, (o, s, a) =>
        s === n
          ? s
          : a === t
            ? "\\" + a
            : a ||
              (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(s)
                ? s
                : "\\" + s),
      );
    return t + u + t;
  }
  var hu = no;
  function uo(e, t, r) {
    return je(e, r(t));
  }
  function io(e, t) {
    return arguments.length === 2 || typeof t == "number"
      ? je(e, t)
      : uo(...arguments);
  }
  function oo(e, t, r) {
    return Le(e, r(t));
  }
  function so(e, t) {
    return arguments.length === 2 || typeof t == "number"
      ? Le(e, t)
      : oo(...arguments);
  }
  function ao(e, t, r) {
    return gt(e, r(t));
  }
  function Do(e, t) {
    return arguments.length === 2 || typeof t == "number"
      ? gt(e, t)
      : ao(...arguments);
  }
  function fe(e, t = 1) {
    return async (...r) => {
      let n = r[t] ?? {},
        i = n.plugins ?? [];
      return (
        (r[t] = { ...n, plugins: Array.isArray(i) ? i : Object.values(i) }),
        e(...r)
      );
    };
  }
  var Cu = fe(rr);
  async function gu(e, t) {
    let { formatted: r } = await Cu(e, { ...t, cursorOffset: -1 });
    return r;
  }
  async function lo(e, t) {
    return (await gu(e, t)) === e;
  }
  var co = fe(it, 0),
    fo = {
      parse: fe(su),
      formatAST: fe(au),
      formatDoc: fe(Du),
      printToDoc: fe(lu),
      printDocToString: fe(cu),
    };
  return ar(po);
});
