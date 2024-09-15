(function (f) {
  function e() {
    var i = f();
    return i.default || i;
  }
  if (typeof exports == "object" && typeof module == "object")
    module.exports = e();
  else if (typeof define == "function" && define.amd) define(e);
  else {
    var t =
      typeof globalThis < "u"
        ? globalThis
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : this || {};
    (t.prettierPlugins = t.prettierPlugins || {}),
      (t.prettierPlugins.postcss = e());
  }
})(function () {
  "use strict";
  var al = Object.create;
  var bt = Object.defineProperty;
  var ul = Object.getOwnPropertyDescriptor;
  var ll = Object.getOwnPropertyNames;
  var cl = Object.getPrototypeOf,
    fl = Object.prototype.hasOwnProperty;
  var y = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
    Js = (t, e) => {
      for (var s in e) bt(t, s, { get: e[s], enumerable: !0 });
    },
    Xs = (t, e, s, r) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let n of ll(e))
          !fl.call(t, n) &&
            n !== s &&
            bt(t, n, {
              get: () => e[n],
              enumerable: !(r = ul(e, n)) || r.enumerable,
            });
      return t;
    };
  var ye = (t, e, s) => (
      (s = t != null ? al(cl(t)) : {}),
      Xs(
        e || !t || !t.__esModule
          ? bt(s, "default", { value: t, enumerable: !0 })
          : s,
        t,
      )
    ),
    pl = (t) => Xs(bt({}, "__esModule", { value: !0 }), t);
  var Ft = y((rv, ts) => {
    "use strict";
    ts.exports.isClean = Symbol("isClean");
    ts.exports.my = Symbol("my");
  });
  var yi = y((sv, rs) => {
    var S = String,
      mi = function () {
        return {
          isColorSupported: !1,
          reset: S,
          bold: S,
          dim: S,
          italic: S,
          underline: S,
          inverse: S,
          hidden: S,
          strikethrough: S,
          black: S,
          red: S,
          green: S,
          yellow: S,
          blue: S,
          magenta: S,
          cyan: S,
          white: S,
          gray: S,
          bgBlack: S,
          bgRed: S,
          bgGreen: S,
          bgYellow: S,
          bgBlue: S,
          bgMagenta: S,
          bgCyan: S,
          bgWhite: S,
        };
      };
    rs.exports = mi();
    rs.exports.createColors = mi;
  });
  var ss = y(() => {});
  var $t = y((ov, vi) => {
    "use strict";
    var wi = yi(),
      gi = ss(),
      st = class t extends Error {
        constructor(e, s, r, n, i, o) {
          super(e),
            (this.name = "CssSyntaxError"),
            (this.reason = e),
            i && (this.file = i),
            n && (this.source = n),
            o && (this.plugin = o),
            typeof s < "u" &&
              typeof r < "u" &&
              (typeof s == "number"
                ? ((this.line = s), (this.column = r))
                : ((this.line = s.line),
                  (this.column = s.column),
                  (this.endLine = r.line),
                  (this.endColumn = r.column))),
            this.setMessage(),
            Error.captureStackTrace && Error.captureStackTrace(this, t);
        }
        setMessage() {
          (this.message = this.plugin ? this.plugin + ": " : ""),
            (this.message += this.file ? this.file : "<css input>"),
            typeof this.line < "u" &&
              (this.message += ":" + this.line + ":" + this.column),
            (this.message += ": " + this.reason);
        }
        showSourceCode(e) {
          if (!this.source) return "";
          let s = this.source;
          e == null && (e = wi.isColorSupported), gi && e && (s = gi(s));
          let r = s.split(/\r?\n/),
            n = Math.max(this.line - 3, 0),
            i = Math.min(this.line + 2, r.length),
            o = String(i).length,
            a,
            u;
          if (e) {
            let { bold: c, gray: f, red: p } = wi.createColors(!0);
            (a = (l) => c(p(l))), (u = (l) => f(l));
          } else a = u = (c) => c;
          return r.slice(n, i).map((c, f) => {
            let p = n + 1 + f,
              l = " " + (" " + p).slice(-o) + " | ";
            if (p === this.line) {
              let w =
                u(l.replace(/\d/g, " ")) +
                c.slice(0, this.column - 1).replace(/[^\t]/g, " ");
              return (
                a(">") +
                u(l) +
                c +
                `
 ` +
                w +
                a("^")
              );
            }
            return " " + u(l) + c;
          }).join(`
`);
        }
        toString() {
          let e = this.showSourceCode();
          return (
            e &&
              (e =
                `

` +
                e +
                `
`),
            this.name + ": " + this.message + e
          );
        }
      };
    vi.exports = st;
    st.default = st;
  });
  var Wt = y((av, bi) => {
    "use strict";
    var xi = {
      after: `
`,
      beforeClose: `
`,
      beforeComment: `
`,
      beforeDecl: `
`,
      beforeOpen: " ",
      beforeRule: `
`,
      colon: ": ",
      commentLeft: " ",
      commentRight: " ",
      emptyBody: "",
      indent: "    ",
      semicolon: !1,
    };
    function lc(t) {
      return t[0].toUpperCase() + t.slice(1);
    }
    var nt = class {
      constructor(e) {
        this.builder = e;
      }
      atrule(e, s) {
        let r = "@" + e.name,
          n = e.params ? this.rawValue(e, "params") : "";
        if (
          (typeof e.raws.afterName < "u"
            ? (r += e.raws.afterName)
            : n && (r += " "),
          e.nodes)
        )
          this.block(e, r + n);
        else {
          let i = (e.raws.between || "") + (s ? ";" : "");
          this.builder(r + n + i, e);
        }
      }
      beforeAfter(e, s) {
        let r;
        e.type === "decl"
          ? (r = this.raw(e, null, "beforeDecl"))
          : e.type === "comment"
            ? (r = this.raw(e, null, "beforeComment"))
            : s === "before"
              ? (r = this.raw(e, null, "beforeRule"))
              : (r = this.raw(e, null, "beforeClose"));
        let n = e.parent,
          i = 0;
        for (; n && n.type !== "root"; ) (i += 1), (n = n.parent);
        if (
          r.includes(`
`)
        ) {
          let o = this.raw(e, null, "indent");
          if (o.length) for (let a = 0; a < i; a++) r += o;
        }
        return r;
      }
      block(e, s) {
        let r = this.raw(e, "between", "beforeOpen");
        this.builder(s + r + "{", e, "start");
        let n;
        e.nodes && e.nodes.length
          ? (this.body(e), (n = this.raw(e, "after")))
          : (n = this.raw(e, "after", "emptyBody")),
          n && this.builder(n),
          this.builder("}", e, "end");
      }
      body(e) {
        let s = e.nodes.length - 1;
        for (; s > 0 && e.nodes[s].type === "comment"; ) s -= 1;
        let r = this.raw(e, "semicolon");
        for (let n = 0; n < e.nodes.length; n++) {
          let i = e.nodes[n],
            o = this.raw(i, "before");
          o && this.builder(o), this.stringify(i, s !== n || r);
        }
      }
      comment(e) {
        let s = this.raw(e, "left", "commentLeft"),
          r = this.raw(e, "right", "commentRight");
        this.builder("/*" + s + e.text + r + "*/", e);
      }
      decl(e, s) {
        let r = this.raw(e, "between", "colon"),
          n = e.prop + r + this.rawValue(e, "value");
        e.important && (n += e.raws.important || " !important"),
          s && (n += ";"),
          this.builder(n, e);
      }
      document(e) {
        this.body(e);
      }
      raw(e, s, r) {
        let n;
        if ((r || (r = s), s && ((n = e.raws[s]), typeof n < "u"))) return n;
        let i = e.parent;
        if (
          r === "before" &&
          (!i ||
            (i.type === "root" && i.first === e) ||
            (i && i.type === "document"))
        )
          return "";
        if (!i) return xi[r];
        let o = e.root();
        if ((o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u"))
          return o.rawCache[r];
        if (r === "before" || r === "after") return this.beforeAfter(e, r);
        {
          let a = "raw" + lc(r);
          this[a]
            ? (n = this[a](o, e))
            : o.walk((u) => {
                if (((n = u.raws[s]), typeof n < "u")) return !1;
              });
        }
        return typeof n > "u" && (n = xi[r]), (o.rawCache[r] = n), n;
      }
      rawBeforeClose(e) {
        let s;
        return (
          e.walk((r) => {
            if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
              return (
                (s = r.raws.after),
                s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")),
                !1
              );
          }),
          s && (s = s.replace(/\S/g, "")),
          s
        );
      }
      rawBeforeComment(e, s) {
        let r;
        return (
          e.walkComments((n) => {
            if (typeof n.raws.before < "u")
              return (
                (r = n.raws.before),
                r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
                !1
              );
          }),
          typeof r > "u"
            ? (r = this.raw(s, null, "beforeDecl"))
            : r && (r = r.replace(/\S/g, "")),
          r
        );
      }
      rawBeforeDecl(e, s) {
        let r;
        return (
          e.walkDecls((n) => {
            if (typeof n.raws.before < "u")
              return (
                (r = n.raws.before),
                r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")),
                !1
              );
          }),
          typeof r > "u"
            ? (r = this.raw(s, null, "beforeRule"))
            : r && (r = r.replace(/\S/g, "")),
          r
        );
      }
      rawBeforeOpen(e) {
        let s;
        return (
          e.walk((r) => {
            if (r.type !== "decl" && ((s = r.raws.between), typeof s < "u"))
              return !1;
          }),
          s
        );
      }
      rawBeforeRule(e) {
        let s;
        return (
          e.walk((r) => {
            if (
              r.nodes &&
              (r.parent !== e || e.first !== r) &&
              typeof r.raws.before < "u"
            )
              return (
                (s = r.raws.before),
                s.includes(`
`) && (s = s.replace(/[^\n]+$/, "")),
                !1
              );
          }),
          s && (s = s.replace(/\S/g, "")),
          s
        );
      }
      rawColon(e) {
        let s;
        return (
          e.walkDecls((r) => {
            if (typeof r.raws.between < "u")
              return (s = r.raws.between.replace(/[^\s:]/g, "")), !1;
          }),
          s
        );
      }
      rawEmptyBody(e) {
        let s;
        return (
          e.walk((r) => {
            if (
              r.nodes &&
              r.nodes.length === 0 &&
              ((s = r.raws.after), typeof s < "u")
            )
              return !1;
          }),
          s
        );
      }
      rawIndent(e) {
        if (e.raws.indent) return e.raws.indent;
        let s;
        return (
          e.walk((r) => {
            let n = r.parent;
            if (
              n &&
              n !== e &&
              n.parent &&
              n.parent === e &&
              typeof r.raws.before < "u"
            ) {
              let i = r.raws.before.split(`
`);
              return (s = i[i.length - 1]), (s = s.replace(/\S/g, "")), !1;
            }
          }),
          s
        );
      }
      rawSemicolon(e) {
        let s;
        return (
          e.walk((r) => {
            if (
              r.nodes &&
              r.nodes.length &&
              r.last.type === "decl" &&
              ((s = r.raws.semicolon), typeof s < "u")
            )
              return !1;
          }),
          s
        );
      }
      rawValue(e, s) {
        let r = e[s],
          n = e.raws[s];
        return n && n.value === r ? n.raw : r;
      }
      root(e) {
        this.body(e), e.raws.after && this.builder(e.raws.after);
      }
      rule(e) {
        this.block(e, this.rawValue(e, "selector")),
          e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
      }
      stringify(e, s) {
        if (!this[e.type])
          throw new Error(
            "Unknown AST node type " +
              e.type +
              ". Maybe you need to change PostCSS stringifier.",
          );
        this[e.type](e, s);
      }
    };
    bi.exports = nt;
    nt.default = nt;
  });
  var it = y((uv, _i) => {
    "use strict";
    var cc = Wt();
    function ns(t, e) {
      new cc(e).stringify(t);
    }
    _i.exports = ns;
    ns.default = ns;
  });
  var at = y((lv, ki) => {
    "use strict";
    var { isClean: Yt, my: fc } = Ft(),
      pc = $t(),
      hc = Wt(),
      dc = it();
    function is(t, e) {
      let s = new t.constructor();
      for (let r in t) {
        if (!Object.prototype.hasOwnProperty.call(t, r) || r === "proxyCache")
          continue;
        let n = t[r],
          i = typeof n;
        r === "parent" && i === "object"
          ? e && (s[r] = e)
          : r === "source"
            ? (s[r] = n)
            : Array.isArray(n)
              ? (s[r] = n.map((o) => is(o, s)))
              : (i === "object" && n !== null && (n = is(n)), (s[r] = n));
      }
      return s;
    }
    var ot = class {
      constructor(e = {}) {
        (this.raws = {}), (this[Yt] = !1), (this[fc] = !0);
        for (let s in e)
          if (s === "nodes") {
            this.nodes = [];
            for (let r of e[s])
              typeof r.clone == "function"
                ? this.append(r.clone())
                : this.append(r);
          } else this[s] = e[s];
      }
      addToError(e) {
        if (
          ((e.postcssNode = this),
          e.stack && this.source && /\n\s{4}at /.test(e.stack))
        ) {
          let s = this.source;
          e.stack = e.stack.replace(
            /\n\s{4}at /,
            `$&${s.input.from}:${s.start.line}:${s.start.column}$&`,
          );
        }
        return e;
      }
      after(e) {
        return this.parent.insertAfter(this, e), this;
      }
      assign(e = {}) {
        for (let s in e) this[s] = e[s];
        return this;
      }
      before(e) {
        return this.parent.insertBefore(this, e), this;
      }
      cleanRaws(e) {
        delete this.raws.before,
          delete this.raws.after,
          e || delete this.raws.between;
      }
      clone(e = {}) {
        let s = is(this);
        for (let r in e) s[r] = e[r];
        return s;
      }
      cloneAfter(e = {}) {
        let s = this.clone(e);
        return this.parent.insertAfter(this, s), s;
      }
      cloneBefore(e = {}) {
        let s = this.clone(e);
        return this.parent.insertBefore(this, s), s;
      }
      error(e, s = {}) {
        if (this.source) {
          let { end: r, start: n } = this.rangeBy(s);
          return this.source.input.error(
            e,
            { column: n.column, line: n.line },
            { column: r.column, line: r.line },
            s,
          );
        }
        return new pc(e);
      }
      getProxyProcessor() {
        return {
          get(e, s) {
            return s === "proxyOf"
              ? e
              : s === "root"
                ? () => e.root().toProxy()
                : e[s];
          },
          set(e, s, r) {
            return (
              e[s] === r ||
                ((e[s] = r),
                (s === "prop" ||
                  s === "value" ||
                  s === "name" ||
                  s === "params" ||
                  s === "important" ||
                  s === "text") &&
                  e.markDirty()),
              !0
            );
          },
        };
      }
      markDirty() {
        if (this[Yt]) {
          this[Yt] = !1;
          let e = this;
          for (; (e = e.parent); ) e[Yt] = !1;
        }
      }
      next() {
        if (!this.parent) return;
        let e = this.parent.index(this);
        return this.parent.nodes[e + 1];
      }
      positionBy(e, s) {
        let r = this.source.start;
        if (e.index) r = this.positionInside(e.index, s);
        else if (e.word) {
          s = this.toString();
          let n = s.indexOf(e.word);
          n !== -1 && (r = this.positionInside(n, s));
        }
        return r;
      }
      positionInside(e, s) {
        let r = s || this.toString(),
          n = this.source.start.column,
          i = this.source.start.line;
        for (let o = 0; o < e; o++)
          r[o] ===
          `
`
            ? ((n = 1), (i += 1))
            : (n += 1);
        return { column: n, line: i };
      }
      prev() {
        if (!this.parent) return;
        let e = this.parent.index(this);
        return this.parent.nodes[e - 1];
      }
      rangeBy(e) {
        let s = {
            column: this.source.start.column,
            line: this.source.start.line,
          },
          r = this.source.end
            ? { column: this.source.end.column + 1, line: this.source.end.line }
            : { column: s.column + 1, line: s.line };
        if (e.word) {
          let n = this.toString(),
            i = n.indexOf(e.word);
          i !== -1 &&
            ((s = this.positionInside(i, n)),
            (r = this.positionInside(i + e.word.length, n)));
        } else
          e.start
            ? (s = { column: e.start.column, line: e.start.line })
            : e.index && (s = this.positionInside(e.index)),
            e.end
              ? (r = { column: e.end.column, line: e.end.line })
              : typeof e.endIndex == "number"
                ? (r = this.positionInside(e.endIndex))
                : e.index && (r = this.positionInside(e.index + 1));
        return (
          (r.line < s.line || (r.line === s.line && r.column <= s.column)) &&
            (r = { column: s.column + 1, line: s.line }),
          { end: r, start: s }
        );
      }
      raw(e, s) {
        return new hc().raw(this, e, s);
      }
      remove() {
        return (
          this.parent && this.parent.removeChild(this),
          (this.parent = void 0),
          this
        );
      }
      replaceWith(...e) {
        if (this.parent) {
          let s = this,
            r = !1;
          for (let n of e)
            n === this
              ? (r = !0)
              : r
                ? (this.parent.insertAfter(s, n), (s = n))
                : this.parent.insertBefore(s, n);
          r || this.remove();
        }
        return this;
      }
      root() {
        let e = this;
        for (; e.parent && e.parent.type !== "document"; ) e = e.parent;
        return e;
      }
      toJSON(e, s) {
        let r = {},
          n = s == null;
        s = s || new Map();
        let i = 0;
        for (let o in this) {
          if (
            !Object.prototype.hasOwnProperty.call(this, o) ||
            o === "parent" ||
            o === "proxyCache"
          )
            continue;
          let a = this[o];
          if (Array.isArray(a))
            r[o] = a.map((u) =>
              typeof u == "object" && u.toJSON ? u.toJSON(null, s) : u,
            );
          else if (typeof a == "object" && a.toJSON) r[o] = a.toJSON(null, s);
          else if (o === "source") {
            let u = s.get(a.input);
            u == null && ((u = i), s.set(a.input, i), i++),
              (r[o] = { end: a.end, inputId: u, start: a.start });
          } else r[o] = a;
        }
        return n && (r.inputs = [...s.keys()].map((o) => o.toJSON())), r;
      }
      toProxy() {
        return (
          this.proxyCache ||
            (this.proxyCache = new Proxy(this, this.getProxyProcessor())),
          this.proxyCache
        );
      }
      toString(e = dc) {
        e.stringify && (e = e.stringify);
        let s = "";
        return (
          e(this, (r) => {
            s += r;
          }),
          s
        );
      }
      warn(e, s, r) {
        let n = { node: this };
        for (let i in r) n[i] = r[i];
        return e.warn(s, n);
      }
      get proxyOf() {
        return this;
      }
    };
    ki.exports = ot;
    ot.default = ot;
  });
  var lt = y((cv, Ei) => {
    "use strict";
    var mc = at(),
      ut = class extends mc {
        constructor(e) {
          e &&
            typeof e.value < "u" &&
            typeof e.value != "string" &&
            (e = { ...e, value: String(e.value) }),
            super(e),
            (this.type = "decl");
        }
        get variable() {
          return this.prop.startsWith("--") || this.prop[0] === "$";
        }
      };
    Ei.exports = ut;
    ut.default = ut;
  });
  var Oe = y((fv, Si) => {
    "use strict";
    var yc = at(),
      ct = class extends yc {
        constructor(e) {
          super(e), (this.type = "comment");
        }
      };
    Si.exports = ct;
    ct.default = ct;
  });
  var re = y((pv, qi) => {
    "use strict";
    var { isClean: Ti, my: Oi } = Ft(),
      Ci = lt(),
      Ai = Oe(),
      wc = at(),
      Ni,
      os,
      as,
      Pi;
    function Ri(t) {
      return t.map(
        (e) => (e.nodes && (e.nodes = Ri(e.nodes)), delete e.source, e),
      );
    }
    function Ii(t) {
      if (((t[Ti] = !1), t.proxyOf.nodes)) for (let e of t.proxyOf.nodes) Ii(e);
    }
    var Y = class t extends wc {
      append(...e) {
        for (let s of e) {
          let r = this.normalize(s, this.last);
          for (let n of r) this.proxyOf.nodes.push(n);
        }
        return this.markDirty(), this;
      }
      cleanRaws(e) {
        if ((super.cleanRaws(e), this.nodes))
          for (let s of this.nodes) s.cleanRaws(e);
      }
      each(e) {
        if (!this.proxyOf.nodes) return;
        let s = this.getIterator(),
          r,
          n;
        for (
          ;
          this.indexes[s] < this.proxyOf.nodes.length &&
          ((r = this.indexes[s]), (n = e(this.proxyOf.nodes[r], r)), n !== !1);

        )
          this.indexes[s] += 1;
        return delete this.indexes[s], n;
      }
      every(e) {
        return this.nodes.every(e);
      }
      getIterator() {
        this.lastEach || (this.lastEach = 0),
          this.indexes || (this.indexes = {}),
          (this.lastEach += 1);
        let e = this.lastEach;
        return (this.indexes[e] = 0), e;
      }
      getProxyProcessor() {
        return {
          get(e, s) {
            return s === "proxyOf"
              ? e
              : e[s]
                ? s === "each" || (typeof s == "string" && s.startsWith("walk"))
                  ? (...r) =>
                      e[s](
                        ...r.map((n) =>
                          typeof n == "function"
                            ? (i, o) => n(i.toProxy(), o)
                            : n,
                        ),
                      )
                  : s === "every" || s === "some"
                    ? (r) => e[s]((n, ...i) => r(n.toProxy(), ...i))
                    : s === "root"
                      ? () => e.root().toProxy()
                      : s === "nodes"
                        ? e.nodes.map((r) => r.toProxy())
                        : s === "first" || s === "last"
                          ? e[s].toProxy()
                          : e[s]
                : e[s];
          },
          set(e, s, r) {
            return (
              e[s] === r ||
                ((e[s] = r),
                (s === "name" || s === "params" || s === "selector") &&
                  e.markDirty()),
              !0
            );
          },
        };
      }
      index(e) {
        return typeof e == "number"
          ? e
          : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
      }
      insertAfter(e, s) {
        let r = this.index(e),
          n = this.normalize(s, this.proxyOf.nodes[r]).reverse();
        r = this.index(e);
        for (let o of n) this.proxyOf.nodes.splice(r + 1, 0, o);
        let i;
        for (let o in this.indexes)
          (i = this.indexes[o]), r < i && (this.indexes[o] = i + n.length);
        return this.markDirty(), this;
      }
      insertBefore(e, s) {
        let r = this.index(e),
          n = r === 0 ? "prepend" : !1,
          i = this.normalize(s, this.proxyOf.nodes[r], n).reverse();
        r = this.index(e);
        for (let a of i) this.proxyOf.nodes.splice(r, 0, a);
        let o;
        for (let a in this.indexes)
          (o = this.indexes[a]), r <= o && (this.indexes[a] = o + i.length);
        return this.markDirty(), this;
      }
      normalize(e, s) {
        if (typeof e == "string") e = Ri(Ni(e).nodes);
        else if (typeof e > "u") e = [];
        else if (Array.isArray(e)) {
          e = e.slice(0);
          for (let n of e) n.parent && n.parent.removeChild(n, "ignore");
        } else if (e.type === "root" && this.type !== "document") {
          e = e.nodes.slice(0);
          for (let n of e) n.parent && n.parent.removeChild(n, "ignore");
        } else if (e.type) e = [e];
        else if (e.prop) {
          if (typeof e.value > "u")
            throw new Error("Value field is missed in node creation");
          typeof e.value != "string" && (e.value = String(e.value)),
            (e = [new Ci(e)]);
        } else if (e.selector) e = [new os(e)];
        else if (e.name) e = [new as(e)];
        else if (e.text) e = [new Ai(e)];
        else throw new Error("Unknown node type in node creation");
        return e.map(
          (n) => (
            n[Oi] || t.rebuild(n),
            (n = n.proxyOf),
            n.parent && n.parent.removeChild(n),
            n[Ti] && Ii(n),
            typeof n.raws.before > "u" &&
              s &&
              typeof s.raws.before < "u" &&
              (n.raws.before = s.raws.before.replace(/\S/g, "")),
            (n.parent = this.proxyOf),
            n
          ),
        );
      }
      prepend(...e) {
        e = e.reverse();
        for (let s of e) {
          let r = this.normalize(s, this.first, "prepend").reverse();
          for (let n of r) this.proxyOf.nodes.unshift(n);
          for (let n in this.indexes)
            this.indexes[n] = this.indexes[n] + r.length;
        }
        return this.markDirty(), this;
      }
      push(e) {
        return (e.parent = this), this.proxyOf.nodes.push(e), this;
      }
      removeAll() {
        for (let e of this.proxyOf.nodes) e.parent = void 0;
        return (this.proxyOf.nodes = []), this.markDirty(), this;
      }
      removeChild(e) {
        (e = this.index(e)),
          (this.proxyOf.nodes[e].parent = void 0),
          this.proxyOf.nodes.splice(e, 1);
        let s;
        for (let r in this.indexes)
          (s = this.indexes[r]), s >= e && (this.indexes[r] = s - 1);
        return this.markDirty(), this;
      }
      replaceValues(e, s, r) {
        return (
          r || ((r = s), (s = {})),
          this.walkDecls((n) => {
            (s.props && !s.props.includes(n.prop)) ||
              (s.fast && !n.value.includes(s.fast)) ||
              (n.value = n.value.replace(e, r));
          }),
          this.markDirty(),
          this
        );
      }
      some(e) {
        return this.nodes.some(e);
      }
      walk(e) {
        return this.each((s, r) => {
          let n;
          try {
            n = e(s, r);
          } catch (i) {
            throw s.addToError(i);
          }
          return n !== !1 && s.walk && (n = s.walk(e)), n;
        });
      }
      walkAtRules(e, s) {
        return s
          ? e instanceof RegExp
            ? this.walk((r, n) => {
                if (r.type === "atrule" && e.test(r.name)) return s(r, n);
              })
            : this.walk((r, n) => {
                if (r.type === "atrule" && r.name === e) return s(r, n);
              })
          : ((s = e),
            this.walk((r, n) => {
              if (r.type === "atrule") return s(r, n);
            }));
      }
      walkComments(e) {
        return this.walk((s, r) => {
          if (s.type === "comment") return e(s, r);
        });
      }
      walkDecls(e, s) {
        return s
          ? e instanceof RegExp
            ? this.walk((r, n) => {
                if (r.type === "decl" && e.test(r.prop)) return s(r, n);
              })
            : this.walk((r, n) => {
                if (r.type === "decl" && r.prop === e) return s(r, n);
              })
          : ((s = e),
            this.walk((r, n) => {
              if (r.type === "decl") return s(r, n);
            }));
      }
      walkRules(e, s) {
        return s
          ? e instanceof RegExp
            ? this.walk((r, n) => {
                if (r.type === "rule" && e.test(r.selector)) return s(r, n);
              })
            : this.walk((r, n) => {
                if (r.type === "rule" && r.selector === e) return s(r, n);
              })
          : ((s = e),
            this.walk((r, n) => {
              if (r.type === "rule") return s(r, n);
            }));
      }
      get first() {
        if (this.proxyOf.nodes) return this.proxyOf.nodes[0];
      }
      get last() {
        if (this.proxyOf.nodes)
          return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
    };
    Y.registerParse = (t) => {
      Ni = t;
    };
    Y.registerRule = (t) => {
      os = t;
    };
    Y.registerAtRule = (t) => {
      as = t;
    };
    Y.registerRoot = (t) => {
      Pi = t;
    };
    qi.exports = Y;
    Y.default = Y;
    Y.rebuild = (t) => {
      t.type === "atrule"
        ? Object.setPrototypeOf(t, as.prototype)
        : t.type === "rule"
          ? Object.setPrototypeOf(t, os.prototype)
          : t.type === "decl"
            ? Object.setPrototypeOf(t, Ci.prototype)
            : t.type === "comment"
              ? Object.setPrototypeOf(t, Ai.prototype)
              : t.type === "root" && Object.setPrototypeOf(t, Pi.prototype),
        (t[Oi] = !0),
        t.nodes &&
          t.nodes.forEach((e) => {
            Y.rebuild(e);
          });
    };
  });
  var Gt = y((hv, Di) => {
    "use strict";
    var zt = /[\t\n\f\r "#'()/;[\\\]{}]/g,
      Vt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
      gc = /.[\r\n"'(/\\]/,
      Li = /[\da-f]/i;
    Di.exports = function (e, s = {}) {
      let r = e.css.valueOf(),
        n = s.ignoreErrors,
        i,
        o,
        a,
        u,
        c,
        f,
        p,
        l,
        w,
        x,
        h = r.length,
        d = 0,
        m = [],
        b = [];
      function g() {
        return d;
      }
      function v($) {
        throw e.error("Unclosed " + $, d);
      }
      function R() {
        return b.length === 0 && d >= h;
      }
      function F($) {
        if (b.length) return b.pop();
        if (d >= h) return;
        let T = $ ? $.ignoreUnclosed : !1;
        switch (((i = r.charCodeAt(d)), i)) {
          case 10:
          case 32:
          case 9:
          case 13:
          case 12: {
            o = d;
            do (o += 1), (i = r.charCodeAt(o));
            while (i === 32 || i === 10 || i === 9 || i === 13 || i === 12);
            (x = ["space", r.slice(d, o)]), (d = o - 1);
            break;
          }
          case 91:
          case 93:
          case 123:
          case 125:
          case 58:
          case 59:
          case 41: {
            let O = String.fromCharCode(i);
            x = [O, O, d];
            break;
          }
          case 40: {
            if (
              ((l = m.length ? m.pop()[1] : ""),
              (w = r.charCodeAt(d + 1)),
              l === "url" &&
                w !== 39 &&
                w !== 34 &&
                w !== 32 &&
                w !== 10 &&
                w !== 9 &&
                w !== 12 &&
                w !== 13)
            ) {
              o = d;
              do {
                if (((f = !1), (o = r.indexOf(")", o + 1)), o === -1))
                  if (n || T) {
                    o = d;
                    break;
                  } else v("bracket");
                for (p = o; r.charCodeAt(p - 1) === 92; ) (p -= 1), (f = !f);
              } while (f);
              (x = ["brackets", r.slice(d, o + 1), d, o]), (d = o);
            } else
              (o = r.indexOf(")", d + 1)),
                (u = r.slice(d, o + 1)),
                o === -1 || gc.test(u)
                  ? (x = ["(", "(", d])
                  : ((x = ["brackets", u, d, o]), (d = o));
            break;
          }
          case 39:
          case 34: {
            (a = i === 39 ? "'" : '"'), (o = d);
            do {
              if (((f = !1), (o = r.indexOf(a, o + 1)), o === -1))
                if (n || T) {
                  o = d + 1;
                  break;
                } else v("string");
              for (p = o; r.charCodeAt(p - 1) === 92; ) (p -= 1), (f = !f);
            } while (f);
            (x = ["string", r.slice(d, o + 1), d, o]), (d = o);
            break;
          }
          case 64: {
            (zt.lastIndex = d + 1),
              zt.test(r),
              zt.lastIndex === 0 ? (o = r.length - 1) : (o = zt.lastIndex - 2),
              (x = ["at-word", r.slice(d, o + 1), d, o]),
              (d = o);
            break;
          }
          case 92: {
            for (o = d, c = !0; r.charCodeAt(o + 1) === 92; )
              (o += 1), (c = !c);
            if (
              ((i = r.charCodeAt(o + 1)),
              c &&
                i !== 47 &&
                i !== 32 &&
                i !== 10 &&
                i !== 9 &&
                i !== 13 &&
                i !== 12 &&
                ((o += 1), Li.test(r.charAt(o))))
            ) {
              for (; Li.test(r.charAt(o + 1)); ) o += 1;
              r.charCodeAt(o + 1) === 32 && (o += 1);
            }
            (x = ["word", r.slice(d, o + 1), d, o]), (d = o);
            break;
          }
          default: {
            i === 47 && r.charCodeAt(d + 1) === 42
              ? ((o = r.indexOf("*/", d + 2) + 1),
                o === 0 && (n || T ? (o = r.length) : v("comment")),
                (x = ["comment", r.slice(d, o + 1), d, o]),
                (d = o))
              : ((Vt.lastIndex = d + 1),
                Vt.test(r),
                Vt.lastIndex === 0
                  ? (o = r.length - 1)
                  : (o = Vt.lastIndex - 2),
                (x = ["word", r.slice(d, o + 1), d, o]),
                m.push(x),
                (d = o));
            break;
          }
        }
        return d++, x;
      }
      function H($) {
        b.push($);
      }
      return { back: H, endOfFile: R, nextToken: F, position: g };
    };
  });
  var jt = y((dv, Bi) => {
    "use strict";
    var Mi = re(),
      Ce = class extends Mi {
        constructor(e) {
          super(e), (this.type = "atrule");
        }
        append(...e) {
          return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
        }
        prepend(...e) {
          return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
        }
      };
    Bi.exports = Ce;
    Ce.default = Ce;
    Mi.registerAtRule(Ce);
  });
  var Ae = y((mv, Wi) => {
    "use strict";
    var Ui = re(),
      Fi,
      $i,
      se = class extends Ui {
        constructor(e) {
          super(e), (this.type = "root"), this.nodes || (this.nodes = []);
        }
        normalize(e, s, r) {
          let n = super.normalize(e);
          if (s) {
            if (r === "prepend")
              this.nodes.length > 1
                ? (s.raws.before = this.nodes[1].raws.before)
                : delete s.raws.before;
            else if (this.first !== s)
              for (let i of n) i.raws.before = s.raws.before;
          }
          return n;
        }
        removeChild(e, s) {
          let r = this.index(e);
          return (
            !s &&
              r === 0 &&
              this.nodes.length > 1 &&
              (this.nodes[1].raws.before = this.nodes[r].raws.before),
            super.removeChild(e)
          );
        }
        toResult(e = {}) {
          return new Fi(new $i(), this, e).stringify();
        }
      };
    se.registerLazyResult = (t) => {
      Fi = t;
    };
    se.registerProcessor = (t) => {
      $i = t;
    };
    Wi.exports = se;
    se.default = se;
    Ui.registerRoot(se);
  });
  var us = y((yv, Yi) => {
    "use strict";
    var ft = {
      comma(t) {
        return ft.split(t, [","], !0);
      },
      space(t) {
        let e = [
          " ",
          `
`,
          "	",
        ];
        return ft.split(t, e);
      },
      split(t, e, s) {
        let r = [],
          n = "",
          i = !1,
          o = 0,
          a = !1,
          u = "",
          c = !1;
        for (let f of t)
          c
            ? (c = !1)
            : f === "\\"
              ? (c = !0)
              : a
                ? f === u && (a = !1)
                : f === '"' || f === "'"
                  ? ((a = !0), (u = f))
                  : f === "("
                    ? (o += 1)
                    : f === ")"
                      ? o > 0 && (o -= 1)
                      : o === 0 && e.includes(f) && (i = !0),
            i ? (n !== "" && r.push(n.trim()), (n = ""), (i = !1)) : (n += f);
        return (s || n !== "") && r.push(n.trim()), r;
      },
    };
    Yi.exports = ft;
    ft.default = ft;
  });
  var Ht = y((wv, Vi) => {
    "use strict";
    var zi = re(),
      vc = us(),
      Ne = class extends zi {
        constructor(e) {
          super(e), (this.type = "rule"), this.nodes || (this.nodes = []);
        }
        get selectors() {
          return vc.comma(this.selector);
        }
        set selectors(e) {
          let s = this.selector ? this.selector.match(/,\s*/) : null,
            r = s ? s[0] : "," + this.raw("between", "beforeOpen");
          this.selector = e.join(r);
        }
      };
    Vi.exports = Ne;
    Ne.default = Ne;
    zi.registerRule(Ne);
  });
  var Kt = y((gv, Hi) => {
    "use strict";
    var xc = lt(),
      bc = Gt(),
      _c = Oe(),
      kc = jt(),
      Ec = Ae(),
      Gi = Ht(),
      ji = { empty: !0, space: !0 };
    function Sc(t) {
      for (let e = t.length - 1; e >= 0; e--) {
        let s = t[e],
          r = s[3] || s[2];
        if (r) return r;
      }
    }
    var ls = class {
      constructor(e) {
        (this.input = e),
          (this.root = new Ec()),
          (this.current = this.root),
          (this.spaces = ""),
          (this.semicolon = !1),
          this.createTokenizer(),
          (this.root.source = {
            input: e,
            start: { column: 1, line: 1, offset: 0 },
          });
      }
      atrule(e) {
        let s = new kc();
        (s.name = e[1].slice(1)),
          s.name === "" && this.unnamedAtrule(s, e),
          this.init(s, e[2]);
        let r,
          n,
          i,
          o = !1,
          a = !1,
          u = [],
          c = [];
        for (; !this.tokenizer.endOfFile(); ) {
          if (
            ((e = this.tokenizer.nextToken()),
            (r = e[0]),
            r === "(" || r === "["
              ? c.push(r === "(" ? ")" : "]")
              : r === "{" && c.length > 0
                ? c.push("}")
                : r === c[c.length - 1] && c.pop(),
            c.length === 0)
          )
            if (r === ";") {
              (s.source.end = this.getPosition(e[2])),
                s.source.end.offset++,
                (this.semicolon = !0);
              break;
            } else if (r === "{") {
              a = !0;
              break;
            } else if (r === "}") {
              if (u.length > 0) {
                for (i = u.length - 1, n = u[i]; n && n[0] === "space"; )
                  n = u[--i];
                n &&
                  ((s.source.end = this.getPosition(n[3] || n[2])),
                  s.source.end.offset++);
              }
              this.end(e);
              break;
            } else u.push(e);
          else u.push(e);
          if (this.tokenizer.endOfFile()) {
            o = !0;
            break;
          }
        }
        (s.raws.between = this.spacesAndCommentsFromEnd(u)),
          u.length
            ? ((s.raws.afterName = this.spacesAndCommentsFromStart(u)),
              this.raw(s, "params", u),
              o &&
                ((e = u[u.length - 1]),
                (s.source.end = this.getPosition(e[3] || e[2])),
                s.source.end.offset++,
                (this.spaces = s.raws.between),
                (s.raws.between = "")))
            : ((s.raws.afterName = ""), (s.params = "")),
          a && ((s.nodes = []), (this.current = s));
      }
      checkMissedSemicolon(e) {
        let s = this.colon(e);
        if (s === !1) return;
        let r = 0,
          n;
        for (
          let i = s - 1;
          i >= 0 && ((n = e[i]), !(n[0] !== "space" && ((r += 1), r === 2)));
          i--
        );
        throw this.input.error(
          "Missed semicolon",
          n[0] === "word" ? n[3] + 1 : n[2],
        );
      }
      colon(e) {
        let s = 0,
          r,
          n,
          i;
        for (let [o, a] of e.entries()) {
          if (
            ((r = a),
            (n = r[0]),
            n === "(" && (s += 1),
            n === ")" && (s -= 1),
            s === 0 && n === ":")
          )
            if (!i) this.doubleColon(r);
            else {
              if (i[0] === "word" && i[1] === "progid") continue;
              return o;
            }
          i = r;
        }
        return !1;
      }
      comment(e) {
        let s = new _c();
        this.init(s, e[2]),
          (s.source.end = this.getPosition(e[3] || e[2])),
          s.source.end.offset++;
        let r = e[1].slice(2, -2);
        if (/^\s*$/.test(r))
          (s.text = ""), (s.raws.left = r), (s.raws.right = "");
        else {
          let n = r.match(/^(\s*)([^]*\S)(\s*)$/);
          (s.text = n[2]), (s.raws.left = n[1]), (s.raws.right = n[3]);
        }
      }
      createTokenizer() {
        this.tokenizer = bc(this.input);
      }
      decl(e, s) {
        let r = new xc();
        this.init(r, e[0][2]);
        let n = e[e.length - 1];
        for (
          n[0] === ";" && ((this.semicolon = !0), e.pop()),
            r.source.end = this.getPosition(n[3] || n[2] || Sc(e)),
            r.source.end.offset++;
          e[0][0] !== "word";

        )
          e.length === 1 && this.unknownWord(e),
            (r.raws.before += e.shift()[1]);
        for (
          r.source.start = this.getPosition(e[0][2]), r.prop = "";
          e.length;

        ) {
          let c = e[0][0];
          if (c === ":" || c === "space" || c === "comment") break;
          r.prop += e.shift()[1];
        }
        r.raws.between = "";
        let i;
        for (; e.length; )
          if (((i = e.shift()), i[0] === ":")) {
            r.raws.between += i[1];
            break;
          } else
            i[0] === "word" && /\w/.test(i[1]) && this.unknownWord([i]),
              (r.raws.between += i[1]);
        (r.prop[0] === "_" || r.prop[0] === "*") &&
          ((r.raws.before += r.prop[0]), (r.prop = r.prop.slice(1)));
        let o = [],
          a;
        for (
          ;
          e.length && ((a = e[0][0]), !(a !== "space" && a !== "comment"));

        )
          o.push(e.shift());
        this.precheckMissedSemicolon(e);
        for (let c = e.length - 1; c >= 0; c--) {
          if (((i = e[c]), i[1].toLowerCase() === "!important")) {
            r.important = !0;
            let f = this.stringFrom(e, c);
            (f = this.spacesFromEnd(e) + f),
              f !== " !important" && (r.raws.important = f);
            break;
          } else if (i[1].toLowerCase() === "important") {
            let f = e.slice(0),
              p = "";
            for (let l = c; l > 0; l--) {
              let w = f[l][0];
              if (p.trim().indexOf("!") === 0 && w !== "space") break;
              p = f.pop()[1] + p;
            }
            p.trim().indexOf("!") === 0 &&
              ((r.important = !0), (r.raws.important = p), (e = f));
          }
          if (i[0] !== "space" && i[0] !== "comment") break;
        }
        e.some((c) => c[0] !== "space" && c[0] !== "comment") &&
          ((r.raws.between += o.map((c) => c[1]).join("")), (o = [])),
          this.raw(r, "value", o.concat(e), s),
          r.value.includes(":") && !s && this.checkMissedSemicolon(e);
      }
      doubleColon(e) {
        throw this.input.error(
          "Double colon",
          { offset: e[2] },
          { offset: e[2] + e[1].length },
        );
      }
      emptyRule(e) {
        let s = new Gi();
        this.init(s, e[2]),
          (s.selector = ""),
          (s.raws.between = ""),
          (this.current = s);
      }
      end(e) {
        this.current.nodes &&
          this.current.nodes.length &&
          (this.current.raws.semicolon = this.semicolon),
          (this.semicolon = !1),
          (this.current.raws.after =
            (this.current.raws.after || "") + this.spaces),
          (this.spaces = ""),
          this.current.parent
            ? ((this.current.source.end = this.getPosition(e[2])),
              this.current.source.end.offset++,
              (this.current = this.current.parent))
            : this.unexpectedClose(e);
      }
      endFile() {
        this.current.parent && this.unclosedBlock(),
          this.current.nodes &&
            this.current.nodes.length &&
            (this.current.raws.semicolon = this.semicolon),
          (this.current.raws.after =
            (this.current.raws.after || "") + this.spaces),
          (this.root.source.end = this.getPosition(this.tokenizer.position()));
      }
      freeSemicolon(e) {
        if (((this.spaces += e[1]), this.current.nodes)) {
          let s = this.current.nodes[this.current.nodes.length - 1];
          s &&
            s.type === "rule" &&
            !s.raws.ownSemicolon &&
            ((s.raws.ownSemicolon = this.spaces), (this.spaces = ""));
        }
      }
      getPosition(e) {
        let s = this.input.fromOffset(e);
        return { column: s.col, line: s.line, offset: e };
      }
      init(e, s) {
        this.current.push(e),
          (e.source = { input: this.input, start: this.getPosition(s) }),
          (e.raws.before = this.spaces),
          (this.spaces = ""),
          e.type !== "comment" && (this.semicolon = !1);
      }
      other(e) {
        let s = !1,
          r = null,
          n = !1,
          i = null,
          o = [],
          a = e[1].startsWith("--"),
          u = [],
          c = e;
        for (; c; ) {
          if (((r = c[0]), u.push(c), r === "(" || r === "["))
            i || (i = c), o.push(r === "(" ? ")" : "]");
          else if (a && n && r === "{") i || (i = c), o.push("}");
          else if (o.length === 0)
            if (r === ";")
              if (n) {
                this.decl(u, a);
                return;
              } else break;
            else if (r === "{") {
              this.rule(u);
              return;
            } else if (r === "}") {
              this.tokenizer.back(u.pop()), (s = !0);
              break;
            } else r === ":" && (n = !0);
          else r === o[o.length - 1] && (o.pop(), o.length === 0 && (i = null));
          c = this.tokenizer.nextToken();
        }
        if (
          (this.tokenizer.endOfFile() && (s = !0),
          o.length > 0 && this.unclosedBracket(i),
          s && n)
        ) {
          if (!a)
            for (
              ;
              u.length &&
              ((c = u[u.length - 1][0]), !(c !== "space" && c !== "comment"));

            )
              this.tokenizer.back(u.pop());
          this.decl(u, a);
        } else this.unknownWord(u);
      }
      parse() {
        let e;
        for (; !this.tokenizer.endOfFile(); )
          switch (((e = this.tokenizer.nextToken()), e[0])) {
            case "space":
              this.spaces += e[1];
              break;
            case ";":
              this.freeSemicolon(e);
              break;
            case "}":
              this.end(e);
              break;
            case "comment":
              this.comment(e);
              break;
            case "at-word":
              this.atrule(e);
              break;
            case "{":
              this.emptyRule(e);
              break;
            default:
              this.other(e);
              break;
          }
        this.endFile();
      }
      precheckMissedSemicolon() {}
      raw(e, s, r, n) {
        let i,
          o,
          a = r.length,
          u = "",
          c = !0,
          f,
          p;
        for (let l = 0; l < a; l += 1)
          (i = r[l]),
            (o = i[0]),
            o === "space" && l === a - 1 && !n
              ? (c = !1)
              : o === "comment"
                ? ((p = r[l - 1] ? r[l - 1][0] : "empty"),
                  (f = r[l + 1] ? r[l + 1][0] : "empty"),
                  !ji[p] && !ji[f]
                    ? u.slice(-1) === ","
                      ? (c = !1)
                      : (u += i[1])
                    : (c = !1))
                : (u += i[1]);
        if (!c) {
          let l = r.reduce((w, x) => w + x[1], "");
          e.raws[s] = { raw: l, value: u };
        }
        e[s] = u;
      }
      rule(e) {
        e.pop();
        let s = new Gi();
        this.init(s, e[0][2]),
          (s.raws.between = this.spacesAndCommentsFromEnd(e)),
          this.raw(s, "selector", e),
          (this.current = s);
      }
      spacesAndCommentsFromEnd(e) {
        let s,
          r = "";
        for (
          ;
          e.length &&
          ((s = e[e.length - 1][0]), !(s !== "space" && s !== "comment"));

        )
          r = e.pop()[1] + r;
        return r;
      }
      spacesAndCommentsFromStart(e) {
        let s,
          r = "";
        for (
          ;
          e.length && ((s = e[0][0]), !(s !== "space" && s !== "comment"));

        )
          r += e.shift()[1];
        return r;
      }
      spacesFromEnd(e) {
        let s,
          r = "";
        for (; e.length && ((s = e[e.length - 1][0]), s === "space"); )
          r = e.pop()[1] + r;
        return r;
      }
      stringFrom(e, s) {
        let r = "";
        for (let n = s; n < e.length; n++) r += e[n][1];
        return e.splice(s, e.length - s), r;
      }
      unclosedBlock() {
        let e = this.current.source.start;
        throw this.input.error("Unclosed block", e.line, e.column);
      }
      unclosedBracket(e) {
        throw this.input.error(
          "Unclosed bracket",
          { offset: e[2] },
          { offset: e[2] + 1 },
        );
      }
      unexpectedClose(e) {
        throw this.input.error(
          "Unexpected }",
          { offset: e[2] },
          { offset: e[2] + 1 },
        );
      }
      unknownWord(e) {
        throw this.input.error(
          "Unknown word",
          { offset: e[0][2] },
          { offset: e[0][2] + e[0][1].length },
        );
      }
      unnamedAtrule(e, s) {
        throw this.input.error(
          "At-rule without name",
          { offset: s[2] },
          { offset: s[2] + s[1].length },
        );
      }
    };
    Hi.exports = ls;
  });
  var Ki = y(() => {});
  var Ji = y((bv, Qi) => {
    var Tc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",
      Oc =
        (t, e = 21) =>
        (s = e) => {
          let r = "",
            n = s;
          for (; n--; ) r += t[(Math.random() * t.length) | 0];
          return r;
        },
      Cc = (t = 21) => {
        let e = "",
          s = t;
        for (; s--; ) e += Tc[(Math.random() * 64) | 0];
        return e;
      };
    Qi.exports = { nanoid: Cc, customAlphabet: Oc };
  });
  var cs = y((_v, Xi) => {
    Xi.exports = class {};
  });
  var Re = y((Ev, ro) => {
    "use strict";
    var { SourceMapConsumer: Ac, SourceMapGenerator: Nc } = Ki(),
      { fileURLToPath: Zi, pathToFileURL: Qt } = {},
      { isAbsolute: hs, resolve: ds } = {},
      { nanoid: Pc } = Ji(),
      fs = ss(),
      eo = $t(),
      Rc = cs(),
      ps = Symbol("fromOffsetCache"),
      Ic = !!(Ac && Nc),
      to = !!(ds && hs),
      Pe = class {
        constructor(e, s = {}) {
          if (
            e === null ||
            typeof e > "u" ||
            (typeof e == "object" && !e.toString)
          )
            throw new Error(`PostCSS received ${e} instead of CSS string`);
          if (
            ((this.css = e.toString()),
            this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE"
              ? ((this.hasBOM = !0), (this.css = this.css.slice(1)))
              : (this.hasBOM = !1),
            s.from &&
              (!to || /^\w+:\/\//.test(s.from) || hs(s.from)
                ? (this.file = s.from)
                : (this.file = ds(s.from))),
            to && Ic)
          ) {
            let r = new Rc(this.css, s);
            if (r.text) {
              this.map = r;
              let n = r.consumer().file;
              !this.file && n && (this.file = this.mapResolve(n));
            }
          }
          this.file || (this.id = "<input css " + Pc(6) + ">"),
            this.map && (this.map.file = this.from);
        }
        error(e, s, r, n = {}) {
          let i, o, a;
          if (s && typeof s == "object") {
            let c = s,
              f = r;
            if (typeof c.offset == "number") {
              let p = this.fromOffset(c.offset);
              (s = p.line), (r = p.col);
            } else (s = c.line), (r = c.column);
            if (typeof f.offset == "number") {
              let p = this.fromOffset(f.offset);
              (o = p.line), (a = p.col);
            } else (o = f.line), (a = f.column);
          } else if (!r) {
            let c = this.fromOffset(s);
            (s = c.line), (r = c.col);
          }
          let u = this.origin(s, r, o, a);
          return (
            u
              ? (i = new eo(
                  e,
                  u.endLine === void 0
                    ? u.line
                    : { column: u.column, line: u.line },
                  u.endLine === void 0
                    ? u.column
                    : { column: u.endColumn, line: u.endLine },
                  u.source,
                  u.file,
                  n.plugin,
                ))
              : (i = new eo(
                  e,
                  o === void 0 ? s : { column: r, line: s },
                  o === void 0 ? r : { column: a, line: o },
                  this.css,
                  this.file,
                  n.plugin,
                )),
            (i.input = {
              column: r,
              endColumn: a,
              endLine: o,
              line: s,
              source: this.css,
            }),
            this.file &&
              (Qt && (i.input.url = Qt(this.file).toString()),
              (i.input.file = this.file)),
            i
          );
        }
        fromOffset(e) {
          let s, r;
          if (this[ps]) r = this[ps];
          else {
            let i = this.css.split(`
`);
            r = new Array(i.length);
            let o = 0;
            for (let a = 0, u = i.length; a < u; a++)
              (r[a] = o), (o += i[a].length + 1);
            this[ps] = r;
          }
          s = r[r.length - 1];
          let n = 0;
          if (e >= s) n = r.length - 1;
          else {
            let i = r.length - 2,
              o;
            for (; n < i; )
              if (((o = n + ((i - n) >> 1)), e < r[o])) i = o - 1;
              else if (e >= r[o + 1]) n = o + 1;
              else {
                n = o;
                break;
              }
          }
          return { col: e - r[n] + 1, line: n + 1 };
        }
        mapResolve(e) {
          return /^\w+:\/\//.test(e)
            ? e
            : ds(this.map.consumer().sourceRoot || this.map.root || ".", e);
        }
        origin(e, s, r, n) {
          if (!this.map) return !1;
          let i = this.map.consumer(),
            o = i.originalPositionFor({ column: s, line: e });
          if (!o.source) return !1;
          let a;
          typeof r == "number" &&
            (a = i.originalPositionFor({ column: n, line: r }));
          let u;
          hs(o.source)
            ? (u = Qt(o.source))
            : (u = new URL(
                o.source,
                this.map.consumer().sourceRoot || Qt(this.map.mapFile),
              ));
          let c = {
            column: o.column,
            endColumn: a && a.column,
            endLine: a && a.line,
            line: o.line,
            url: u.toString(),
          };
          if (u.protocol === "file:")
            if (Zi) c.file = Zi(u);
            else
              throw new Error(
                "file: protocol is not available in this PostCSS build",
              );
          let f = i.sourceContentFor(o.source);
          return f && (c.source = f), c;
        }
        toJSON() {
          let e = {};
          for (let s of ["hasBOM", "css", "file", "id"])
            this[s] != null && (e[s] = this[s]);
          return (
            this.map &&
              ((e.map = { ...this.map }),
              e.map.consumerCache && (e.map.consumerCache = void 0)),
            e
          );
        }
        get from() {
          return this.file || this.id;
        }
      };
    ro.exports = Pe;
    Pe.default = Pe;
    fs && fs.registerInput && fs.registerInput(Pe);
  });
  var pt = y((Sv, so) => {
    "use strict";
    var qc = re(),
      Lc = Kt(),
      Dc = Re();
    function Jt(t, e) {
      let s = new Dc(t, e),
        r = new Lc(s);
      try {
        r.parse();
      } catch (n) {
        throw n;
      }
      return r.root;
    }
    so.exports = Jt;
    Jt.default = Jt;
    qc.registerParse(Jt);
  });
  var no = y((Tv, ms) => {
    var Mc = Gt(),
      Bc = Re();
    ms.exports = {
      isInlineComment(t) {
        if (t[0] === "word" && t[1].slice(0, 2) === "//") {
          let e = t,
            s = [],
            r,
            n;
          for (; t; ) {
            if (/\r?\n/.test(t[1])) {
              if (/['"].*\r?\n/.test(t[1])) {
                s.push(
                  t[1].substring(
                    0,
                    t[1].indexOf(`
`),
                  ),
                ),
                  (n = t[1].substring(
                    t[1].indexOf(`
`),
                  ));
                let o = this.input.css
                  .valueOf()
                  .substring(this.tokenizer.position());
                (n += o), (r = t[3] + o.length - n.length);
              } else this.tokenizer.back(t);
              break;
            }
            s.push(t[1]),
              (r = t[2]),
              (t = this.tokenizer.nextToken({ ignoreUnclosed: !0 }));
          }
          let i = ["comment", s.join(""), e[2], r];
          return (
            this.inlineComment(i),
            n && ((this.input = new Bc(n)), (this.tokenizer = Mc(this.input))),
            !0
          );
        } else if (t[1] === "/") {
          let e = this.tokenizer.nextToken({ ignoreUnclosed: !0 });
          if (e[0] === "comment" && /^\/\*/.test(e[1]))
            return (
              (e[0] = "word"),
              (e[1] = e[1].slice(1)),
              (t[1] = "//"),
              this.tokenizer.back(e),
              ms.exports.isInlineComment.bind(this)(t)
            );
        }
        return !1;
      },
    };
  });
  var oo = y((Ov, io) => {
    io.exports = {
      interpolation(t) {
        let e = [t, this.tokenizer.nextToken()],
          s = ["word", "}"];
        if (e[0][1].length > 1 || e[1][0] !== "{")
          return this.tokenizer.back(e[1]), !1;
        for (t = this.tokenizer.nextToken(); t && s.includes(t[0]); )
          e.push(t), (t = this.tokenizer.nextToken());
        let r = e.map((a) => a[1]),
          [n] = e,
          i = e.pop(),
          o = ["word", r.join(""), n[2], i[2]];
        return this.tokenizer.back(t), this.tokenizer.back(o), !0;
      },
    };
  });
  var uo = y((Cv, ao) => {
    var Uc = /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/,
      Fc = /\.[0-9]/,
      $c = (t) => {
        let [, e] = t,
          [s] = e;
        return (
          (s === "." || s === "#") && Uc.test(e) === !1 && Fc.test(e) === !1
        );
      };
    ao.exports = { isMixinToken: $c };
  });
  var co = y((Av, lo) => {
    var Wc = Gt(),
      Yc = /^url\((.+)\)/;
    lo.exports = (t) => {
      let { name: e, params: s = "" } = t;
      if (e === "import" && s.length) {
        t.import = !0;
        let r = Wc({ css: s });
        for (t.filename = s.replace(Yc, "$1"); !r.endOfFile(); ) {
          let [n, i] = r.nextToken();
          if (n === "word" && i === "url") return;
          if (n === "brackets") {
            (t.options = i), (t.filename = s.replace(i, "").trim());
            break;
          }
        }
      }
    };
  });
  var mo = y((Nv, ho) => {
    var fo = /:$/,
      po = /^:(\s+)?/;
    ho.exports = (t) => {
      let { name: e, params: s = "" } = t;
      if (t.name.slice(-1) === ":") {
        if (fo.test(e)) {
          let [r] = e.match(fo);
          (t.name = e.replace(r, "")),
            (t.raws.afterName = r + (t.raws.afterName || "")),
            (t.variable = !0),
            (t.value = t.params);
        }
        if (po.test(s)) {
          let [r] = s.match(po);
          (t.value = s.replace(r, "")),
            (t.raws.afterName = (t.raws.afterName || "") + r),
            (t.variable = !0);
        }
      }
    };
  });
  var go = y((Rv, wo) => {
    var zc = Oe(),
      Vc = Kt(),
      { isInlineComment: Gc } = no(),
      { interpolation: yo } = oo(),
      { isMixinToken: jc } = uo(),
      Hc = co(),
      Kc = mo(),
      Qc = /(!\s*important)$/i;
    wo.exports = class extends Vc {
      constructor(...e) {
        super(...e), (this.lastNode = null);
      }
      atrule(e) {
        yo.bind(this)(e) ||
          (super.atrule(e), Hc(this.lastNode), Kc(this.lastNode));
      }
      decl(...e) {
        super.decl(...e),
          /extend\(.+\)/i.test(this.lastNode.value) &&
            (this.lastNode.extend = !0);
      }
      each(e) {
        e[0][1] = ` ${e[0][1]}`;
        let s = e.findIndex((a) => a[0] === "("),
          r = e.reverse().find((a) => a[0] === ")"),
          n = e.reverse().indexOf(r),
          o = e
            .splice(s, n)
            .map((a) => a[1])
            .join("");
        for (let a of e.reverse()) this.tokenizer.back(a);
        this.atrule(this.tokenizer.nextToken()),
          (this.lastNode.function = !0),
          (this.lastNode.params = o);
      }
      init(e, s, r) {
        super.init(e, s, r), (this.lastNode = e);
      }
      inlineComment(e) {
        let s = new zc(),
          r = e[1].slice(2);
        if (
          (this.init(s, e[2]),
          (s.source.end = this.getPosition(e[3] || e[2])),
          (s.inline = !0),
          (s.raws.begin = "//"),
          /^\s*$/.test(r))
        )
          (s.text = ""), (s.raws.left = r), (s.raws.right = "");
        else {
          let n = r.match(/^(\s*)([^]*[^\s])(\s*)$/);
          [, s.raws.left, s.text, s.raws.right] = n;
        }
      }
      mixin(e) {
        let [s] = e,
          r = s[1].slice(0, 1),
          n = e.findIndex((c) => c[0] === "brackets"),
          i = e.findIndex((c) => c[0] === "("),
          o = "";
        if ((n < 0 || n > 3) && i > 0) {
          let c = e.reduce((g, v, R) => (v[0] === ")" ? R : g)),
            p = e
              .slice(i, c + i)
              .map((g) => g[1])
              .join(""),
            [l] = e.slice(i),
            w = [l[2], l[3]],
            [x] = e.slice(c, c + 1),
            h = [x[2], x[3]],
            d = ["brackets", p].concat(w, h),
            m = e.slice(0, i),
            b = e.slice(c + 1);
          (e = m), e.push(d), (e = e.concat(b));
        }
        let a = [];
        for (let c of e)
          if (((c[1] === "!" || a.length) && a.push(c), c[1] === "important"))
            break;
        if (a.length) {
          let [c] = a,
            f = e.indexOf(c),
            p = a[a.length - 1],
            l = [c[2], c[3]],
            w = [p[4], p[5]],
            h = ["word", a.map((d) => d[1]).join("")].concat(l, w);
          e.splice(f, a.length, h);
        }
        let u = e.findIndex((c) => Qc.test(c[1]));
        u > 0 && (([, o] = e[u]), e.splice(u, 1));
        for (let c of e.reverse()) this.tokenizer.back(c);
        this.atrule(this.tokenizer.nextToken()),
          (this.lastNode.mixin = !0),
          (this.lastNode.raws.identifier = r),
          o &&
            ((this.lastNode.important = !0),
            (this.lastNode.raws.important = o));
      }
      other(e) {
        Gc.bind(this)(e) || super.other(e);
      }
      rule(e) {
        let s = e[e.length - 1],
          r = e[e.length - 2];
        if (
          r[0] === "at-word" &&
          s[0] === "{" &&
          (this.tokenizer.back(s), yo.bind(this)(r))
        ) {
          let i = this.tokenizer.nextToken();
          e = e.slice(0, e.length - 2).concat([i]);
          for (let o of e.reverse()) this.tokenizer.back(o);
          return;
        }
        super.rule(e),
          /:extend\(.+\)/i.test(this.lastNode.selector) &&
            (this.lastNode.extend = !0);
      }
      unknownWord(e) {
        let [s] = e;
        if (e[0][1] === "each" && e[1][0] === "(") {
          this.each(e);
          return;
        }
        if (jc(s)) {
          this.mixin(e);
          return;
        }
        super.unknownWord(e);
      }
    };
  });
  var xo = y((qv, vo) => {
    var Jc = Wt();
    vo.exports = class extends Jc {
      atrule(e, s) {
        if (!e.mixin && !e.variable && !e.function) {
          super.atrule(e, s);
          return;
        }
        let n = `${e.function ? "" : e.raws.identifier || "@"}${e.name}`,
          i = e.params ? this.rawValue(e, "params") : "",
          o = e.raws.important || "";
        if (
          (e.variable && (i = e.value),
          typeof e.raws.afterName < "u"
            ? (n += e.raws.afterName)
            : i && (n += " "),
          e.nodes)
        )
          this.block(e, n + i + o);
        else {
          let a = (e.raws.between || "") + o + (s ? ";" : "");
          this.builder(n + i + a, e);
        }
      }
      comment(e) {
        if (e.inline) {
          let s = this.raw(e, "left", "commentLeft"),
            r = this.raw(e, "right", "commentRight");
          this.builder(`//${s}${e.text}${r}`, e);
        } else super.comment(e);
      }
    };
  });
  var bo = y((Lv, ys) => {
    var Xc = Re(),
      Zc = go(),
      ef = xo();
    ys.exports = {
      parse(t, e) {
        let s = new Xc(t, e),
          r = new Zc(s);
        return (
          r.parse(),
          r.root.walk((n) => {
            let i = s.css.lastIndexOf(n.source.input.css);
            if (i === 0) return;
            if (i + n.source.input.css.length !== s.css.length)
              throw new Error("Invalid state detected in postcss-less");
            let o = i + n.source.start.offset,
              a = s.fromOffset(i + n.source.start.offset);
            if (
              ((n.source.start = { offset: o, line: a.line, column: a.col }),
              n.source.end)
            ) {
              let u = i + n.source.end.offset,
                c = s.fromOffset(i + n.source.end.offset);
              n.source.end = { offset: u, line: c.line, column: c.col };
            }
          }),
          r.root
        );
      },
      stringify(t, e) {
        new ef(e).stringify(t);
      },
      nodeToString(t) {
        let e = "";
        return (
          ys.exports.stringify(t, (s) => {
            e += s;
          }),
          e
        );
      },
    };
  });
  var ws = y((Dv, _o) => {
    _o.exports = class {
      generate() {}
    };
  });
  var Xt = y((Bv, So) => {
    "use strict";
    var tf = re(),
      ko,
      Eo,
      pe = class extends tf {
        constructor(e) {
          super({ type: "document", ...e }), this.nodes || (this.nodes = []);
        }
        toResult(e = {}) {
          return new ko(new Eo(), this, e).stringify();
        }
      };
    pe.registerLazyResult = (t) => {
      ko = t;
    };
    pe.registerProcessor = (t) => {
      Eo = t;
    };
    So.exports = pe;
    pe.default = pe;
  });
  var gs = y((Uv, Oo) => {
    "use strict";
    var To = {};
    Oo.exports = function (e) {
      To[e] ||
        ((To[e] = !0), typeof console < "u" && console.warn && console.warn(e));
    };
  });
  var vs = y((Fv, Co) => {
    "use strict";
    var ht = class {
      constructor(e, s = {}) {
        if (
          ((this.type = "warning"), (this.text = e), s.node && s.node.source)
        ) {
          let r = s.node.rangeBy(s);
          (this.line = r.start.line),
            (this.column = r.start.column),
            (this.endLine = r.end.line),
            (this.endColumn = r.end.column);
        }
        for (let r in s) this[r] = s[r];
      }
      toString() {
        return this.node
          ? this.node.error(this.text, {
              index: this.index,
              plugin: this.plugin,
              word: this.word,
            }).message
          : this.plugin
            ? this.plugin + ": " + this.text
            : this.text;
      }
    };
    Co.exports = ht;
    ht.default = ht;
  });
  var Zt = y(($v, Ao) => {
    "use strict";
    var rf = vs(),
      dt = class {
        constructor(e, s, r) {
          (this.processor = e),
            (this.messages = []),
            (this.root = s),
            (this.opts = r),
            (this.css = void 0),
            (this.map = void 0);
        }
        toString() {
          return this.css;
        }
        warn(e, s = {}) {
          s.plugin ||
            (this.lastPlugin &&
              this.lastPlugin.postcssPlugin &&
              (s.plugin = this.lastPlugin.postcssPlugin));
          let r = new rf(e, s);
          return this.messages.push(r), r;
        }
        warnings() {
          return this.messages.filter((e) => e.type === "warning");
        }
        get content() {
          return this.css;
        }
      };
    Ao.exports = dt;
    dt.default = dt;
  });
  var _s = y((Yv, Io) => {
    "use strict";
    var { isClean: j, my: sf } = Ft(),
      nf = ws(),
      of = it(),
      af = re(),
      uf = Xt(),
      Wv = gs(),
      No = Zt(),
      lf = pt(),
      cf = Ae(),
      ff = {
        atrule: "AtRule",
        comment: "Comment",
        decl: "Declaration",
        document: "Document",
        root: "Root",
        rule: "Rule",
      },
      pf = {
        AtRule: !0,
        AtRuleExit: !0,
        Comment: !0,
        CommentExit: !0,
        Declaration: !0,
        DeclarationExit: !0,
        Document: !0,
        DocumentExit: !0,
        Once: !0,
        OnceExit: !0,
        postcssPlugin: !0,
        prepare: !0,
        Root: !0,
        RootExit: !0,
        Rule: !0,
        RuleExit: !0,
      },
      hf = { Once: !0, postcssPlugin: !0, prepare: !0 },
      Ie = 0;
    function mt(t) {
      return typeof t == "object" && typeof t.then == "function";
    }
    function Ro(t) {
      let e = !1,
        s = ff[t.type];
      return (
        t.type === "decl"
          ? (e = t.prop.toLowerCase())
          : t.type === "atrule" && (e = t.name.toLowerCase()),
        e && t.append
          ? [s, s + "-" + e, Ie, s + "Exit", s + "Exit-" + e]
          : e
            ? [s, s + "-" + e, s + "Exit", s + "Exit-" + e]
            : t.append
              ? [s, Ie, s + "Exit"]
              : [s, s + "Exit"]
      );
    }
    function Po(t) {
      let e;
      return (
        t.type === "document"
          ? (e = ["Document", Ie, "DocumentExit"])
          : t.type === "root"
            ? (e = ["Root", Ie, "RootExit"])
            : (e = Ro(t)),
        {
          eventIndex: 0,
          events: e,
          iterator: 0,
          node: t,
          visitorIndex: 0,
          visitors: [],
        }
      );
    }
    function xs(t) {
      return (t[j] = !1), t.nodes && t.nodes.forEach((e) => xs(e)), t;
    }
    var bs = {},
      ne = class t {
        constructor(e, s, r) {
          (this.stringified = !1), (this.processed = !1);
          let n;
          if (
            typeof s == "object" &&
            s !== null &&
            (s.type === "root" || s.type === "document")
          )
            n = xs(s);
          else if (s instanceof t || s instanceof No)
            (n = xs(s.root)),
              s.map &&
                (typeof r.map > "u" && (r.map = {}),
                r.map.inline || (r.map.inline = !1),
                (r.map.prev = s.map));
          else {
            let i = lf;
            r.syntax && (i = r.syntax.parse),
              r.parser && (i = r.parser),
              i.parse && (i = i.parse);
            try {
              n = i(s, r);
            } catch (o) {
              (this.processed = !0), (this.error = o);
            }
            n && !n[sf] && af.rebuild(n);
          }
          (this.result = new No(e, n, r)),
            (this.helpers = { ...bs, postcss: bs, result: this.result }),
            (this.plugins = this.processor.plugins.map((i) =>
              typeof i == "object" && i.prepare
                ? { ...i, ...i.prepare(this.result) }
                : i,
            ));
        }
        async() {
          return this.error
            ? Promise.reject(this.error)
            : this.processed
              ? Promise.resolve(this.result)
              : (this.processing || (this.processing = this.runAsync()),
                this.processing);
        }
        catch(e) {
          return this.async().catch(e);
        }
        finally(e) {
          return this.async().then(e, e);
        }
        getAsyncError() {
          throw new Error(
            "Use process(css).then(cb) to work with async plugins",
          );
        }
        handleError(e, s) {
          let r = this.result.lastPlugin;
          try {
            s && s.addToError(e),
              (this.error = e),
              e.name === "CssSyntaxError" && !e.plugin
                ? ((e.plugin = r.postcssPlugin), e.setMessage())
                : r.postcssVersion;
          } catch (n) {
            console && console.error && console.error(n);
          }
          return e;
        }
        prepareVisitors() {
          this.listeners = {};
          let e = (s, r, n) => {
            this.listeners[r] || (this.listeners[r] = []),
              this.listeners[r].push([s, n]);
          };
          for (let s of this.plugins)
            if (typeof s == "object")
              for (let r in s) {
                if (!pf[r] && /^[A-Z]/.test(r))
                  throw new Error(
                    `Unknown event ${r} in ${s.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`,
                  );
                if (!hf[r])
                  if (typeof s[r] == "object")
                    for (let n in s[r])
                      n === "*"
                        ? e(s, r, s[r][n])
                        : e(s, r + "-" + n.toLowerCase(), s[r][n]);
                  else typeof s[r] == "function" && e(s, r, s[r]);
              }
          this.hasListener = Object.keys(this.listeners).length > 0;
        }
        async runAsync() {
          this.plugin = 0;
          for (let e = 0; e < this.plugins.length; e++) {
            let s = this.plugins[e],
              r = this.runOnRoot(s);
            if (mt(r))
              try {
                await r;
              } catch (n) {
                throw this.handleError(n);
              }
          }
          if ((this.prepareVisitors(), this.hasListener)) {
            let e = this.result.root;
            for (; !e[j]; ) {
              e[j] = !0;
              let s = [Po(e)];
              for (; s.length > 0; ) {
                let r = this.visitTick(s);
                if (mt(r))
                  try {
                    await r;
                  } catch (n) {
                    let i = s[s.length - 1].node;
                    throw this.handleError(n, i);
                  }
              }
            }
            if (this.listeners.OnceExit)
              for (let [s, r] of this.listeners.OnceExit) {
                this.result.lastPlugin = s;
                try {
                  if (e.type === "document") {
                    let n = e.nodes.map((i) => r(i, this.helpers));
                    await Promise.all(n);
                  } else await r(e, this.helpers);
                } catch (n) {
                  throw this.handleError(n);
                }
              }
          }
          return (this.processed = !0), this.stringify();
        }
        runOnRoot(e) {
          this.result.lastPlugin = e;
          try {
            if (typeof e == "object" && e.Once) {
              if (this.result.root.type === "document") {
                let s = this.result.root.nodes.map((r) =>
                  e.Once(r, this.helpers),
                );
                return mt(s[0]) ? Promise.all(s) : s;
              }
              return e.Once(this.result.root, this.helpers);
            } else if (typeof e == "function")
              return e(this.result.root, this.result);
          } catch (s) {
            throw this.handleError(s);
          }
        }
        stringify() {
          if (this.error) throw this.error;
          if (this.stringified) return this.result;
          (this.stringified = !0), this.sync();
          let e = this.result.opts,
            s = of;
          e.syntax && (s = e.syntax.stringify),
            e.stringifier && (s = e.stringifier),
            s.stringify && (s = s.stringify);
          let n = new nf(s, this.result.root, this.result.opts).generate();
          return (
            (this.result.css = n[0]), (this.result.map = n[1]), this.result
          );
        }
        sync() {
          if (this.error) throw this.error;
          if (this.processed) return this.result;
          if (((this.processed = !0), this.processing))
            throw this.getAsyncError();
          for (let e of this.plugins) {
            let s = this.runOnRoot(e);
            if (mt(s)) throw this.getAsyncError();
          }
          if ((this.prepareVisitors(), this.hasListener)) {
            let e = this.result.root;
            for (; !e[j]; ) (e[j] = !0), this.walkSync(e);
            if (this.listeners.OnceExit)
              if (e.type === "document")
                for (let s of e.nodes)
                  this.visitSync(this.listeners.OnceExit, s);
              else this.visitSync(this.listeners.OnceExit, e);
          }
          return this.result;
        }
        then(e, s) {
          return this.async().then(e, s);
        }
        toString() {
          return this.css;
        }
        visitSync(e, s) {
          for (let [r, n] of e) {
            this.result.lastPlugin = r;
            let i;
            try {
              i = n(s, this.helpers);
            } catch (o) {
              throw this.handleError(o, s.proxyOf);
            }
            if (s.type !== "root" && s.type !== "document" && !s.parent)
              return !0;
            if (mt(i)) throw this.getAsyncError();
          }
        }
        visitTick(e) {
          let s = e[e.length - 1],
            { node: r, visitors: n } = s;
          if (r.type !== "root" && r.type !== "document" && !r.parent) {
            e.pop();
            return;
          }
          if (n.length > 0 && s.visitorIndex < n.length) {
            let [o, a] = n[s.visitorIndex];
            (s.visitorIndex += 1),
              s.visitorIndex === n.length &&
                ((s.visitors = []), (s.visitorIndex = 0)),
              (this.result.lastPlugin = o);
            try {
              return a(r.toProxy(), this.helpers);
            } catch (u) {
              throw this.handleError(u, r);
            }
          }
          if (s.iterator !== 0) {
            let o = s.iterator,
              a;
            for (; (a = r.nodes[r.indexes[o]]); )
              if (((r.indexes[o] += 1), !a[j])) {
                (a[j] = !0), e.push(Po(a));
                return;
              }
            (s.iterator = 0), delete r.indexes[o];
          }
          let i = s.events;
          for (; s.eventIndex < i.length; ) {
            let o = i[s.eventIndex];
            if (((s.eventIndex += 1), o === Ie)) {
              r.nodes &&
                r.nodes.length &&
                ((r[j] = !0), (s.iterator = r.getIterator()));
              return;
            } else if (this.listeners[o]) {
              s.visitors = this.listeners[o];
              return;
            }
          }
          e.pop();
        }
        walkSync(e) {
          e[j] = !0;
          let s = Ro(e);
          for (let r of s)
            if (r === Ie)
              e.nodes &&
                e.each((n) => {
                  n[j] || this.walkSync(n);
                });
            else {
              let n = this.listeners[r];
              if (n && this.visitSync(n, e.toProxy())) return;
            }
        }
        warnings() {
          return this.sync().warnings();
        }
        get content() {
          return this.stringify().content;
        }
        get css() {
          return this.stringify().css;
        }
        get map() {
          return this.stringify().map;
        }
        get messages() {
          return this.sync().messages;
        }
        get opts() {
          return this.result.opts;
        }
        get processor() {
          return this.result.processor;
        }
        get root() {
          return this.sync().root;
        }
        get [Symbol.toStringTag]() {
          return "LazyResult";
        }
      };
    ne.registerPostcss = (t) => {
      bs = t;
    };
    Io.exports = ne;
    ne.default = ne;
    cf.registerLazyResult(ne);
    uf.registerLazyResult(ne);
  });
  var Lo = y((Vv, qo) => {
    "use strict";
    var df = ws(),
      mf = it(),
      zv = gs(),
      yf = pt(),
      wf = Zt(),
      yt = class {
        constructor(e, s, r) {
          (s = s.toString()),
            (this.stringified = !1),
            (this._processor = e),
            (this._css = s),
            (this._opts = r),
            (this._map = void 0);
          let n,
            i = mf;
          (this.result = new wf(this._processor, n, this._opts)),
            (this.result.css = s);
          let o = this;
          Object.defineProperty(this.result, "root", {
            get() {
              return o.root;
            },
          });
          let a = new df(i, n, this._opts, s);
          if (a.isMap()) {
            let [u, c] = a.generate();
            u && (this.result.css = u), c && (this.result.map = c);
          } else a.clearAnnotation(), (this.result.css = a.css);
        }
        async() {
          return this.error
            ? Promise.reject(this.error)
            : Promise.resolve(this.result);
        }
        catch(e) {
          return this.async().catch(e);
        }
        finally(e) {
          return this.async().then(e, e);
        }
        sync() {
          if (this.error) throw this.error;
          return this.result;
        }
        then(e, s) {
          return this.async().then(e, s);
        }
        toString() {
          return this._css;
        }
        warnings() {
          return [];
        }
        get content() {
          return this.result.css;
        }
        get css() {
          return this.result.css;
        }
        get map() {
          return this.result.map;
        }
        get messages() {
          return [];
        }
        get opts() {
          return this.result.opts;
        }
        get processor() {
          return this.result.processor;
        }
        get root() {
          if (this._root) return this._root;
          let e,
            s = yf;
          try {
            e = s(this._css, this._opts);
          } catch (r) {
            this.error = r;
          }
          if (this.error) throw this.error;
          return (this._root = e), e;
        }
        get [Symbol.toStringTag]() {
          return "NoWorkResult";
        }
      };
    qo.exports = yt;
    yt.default = yt;
  });
  var Mo = y((Gv, Do) => {
    "use strict";
    var gf = Lo(),
      vf = _s(),
      xf = Xt(),
      bf = Ae(),
      he = class {
        constructor(e = []) {
          (this.version = "8.4.39"), (this.plugins = this.normalize(e));
        }
        normalize(e) {
          let s = [];
          for (let r of e)
            if (
              (r.postcss === !0 ? (r = r()) : r.postcss && (r = r.postcss),
              typeof r == "object" && Array.isArray(r.plugins))
            )
              s = s.concat(r.plugins);
            else if (typeof r == "object" && r.postcssPlugin) s.push(r);
            else if (typeof r == "function") s.push(r);
            else if (!(typeof r == "object" && (r.parse || r.stringify)))
              throw new Error(r + " is not a PostCSS plugin");
          return s;
        }
        process(e, s = {}) {
          return !this.plugins.length &&
            !s.parser &&
            !s.stringifier &&
            !s.syntax
            ? new gf(this, e, s)
            : new vf(this, e, s);
        }
        use(e) {
          return (
            (this.plugins = this.plugins.concat(this.normalize([e]))), this
          );
        }
      };
    Do.exports = he;
    he.default = he;
    bf.registerProcessor(he);
    xf.registerProcessor(he);
  });
  var Uo = y((jv, Bo) => {
    "use strict";
    var _f = lt(),
      kf = cs(),
      Ef = Oe(),
      Sf = jt(),
      Tf = Re(),
      Of = Ae(),
      Cf = Ht();
    function wt(t, e) {
      if (Array.isArray(t)) return t.map((n) => wt(n));
      let { inputs: s, ...r } = t;
      if (s) {
        e = [];
        for (let n of s) {
          let i = { ...n, __proto__: Tf.prototype };
          i.map && (i.map = { ...i.map, __proto__: kf.prototype }), e.push(i);
        }
      }
      if ((r.nodes && (r.nodes = t.nodes.map((n) => wt(n, e))), r.source)) {
        let { inputId: n, ...i } = r.source;
        (r.source = i), n != null && (r.source.input = e[n]);
      }
      if (r.type === "root") return new Of(r);
      if (r.type === "decl") return new _f(r);
      if (r.type === "rule") return new Cf(r);
      if (r.type === "comment") return new Ef(r);
      if (r.type === "atrule") return new Sf(r);
      throw new Error("Unknown node type: " + t.type);
    }
    Bo.exports = wt;
    wt.default = wt;
  });
  var er = y((Hv, Go) => {
    "use strict";
    var Af = $t(),
      Fo = lt(),
      Nf = _s(),
      Pf = re(),
      ks = Mo(),
      Rf = it(),
      If = Uo(),
      $o = Xt(),
      qf = vs(),
      Wo = Oe(),
      Yo = jt(),
      Lf = Zt(),
      Df = Re(),
      Mf = pt(),
      Bf = us(),
      zo = Ht(),
      Vo = Ae(),
      Uf = at();
    function k(...t) {
      return t.length === 1 && Array.isArray(t[0]) && (t = t[0]), new ks(t);
    }
    k.plugin = function (e, s) {
      let r = !1;
      function n(...o) {
        console &&
          console.warn &&
          !r &&
          ((r = !0),
          console.warn(
            e +
              `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`,
          ));
        let a = s(...o);
        return (a.postcssPlugin = e), (a.postcssVersion = new ks().version), a;
      }
      let i;
      return (
        Object.defineProperty(n, "postcss", {
          get() {
            return i || (i = n()), i;
          },
        }),
        (n.process = function (o, a, u) {
          return k([n(u)]).process(o, a);
        }),
        n
      );
    };
    k.stringify = Rf;
    k.parse = Mf;
    k.fromJSON = If;
    k.list = Bf;
    k.comment = (t) => new Wo(t);
    k.atRule = (t) => new Yo(t);
    k.decl = (t) => new Fo(t);
    k.rule = (t) => new zo(t);
    k.root = (t) => new Vo(t);
    k.document = (t) => new $o(t);
    k.CssSyntaxError = Af;
    k.Declaration = Fo;
    k.Container = Pf;
    k.Processor = ks;
    k.Document = $o;
    k.Comment = Wo;
    k.Warning = qf;
    k.AtRule = Yo;
    k.Result = Lf;
    k.Input = Df;
    k.Rule = zo;
    k.Root = Vo;
    k.Node = Uf;
    Nf.registerPostcss(k);
    Go.exports = k;
    k.default = k;
  });
  var Ho = y((Kv, jo) => {
    var { Container: Ff } = er(),
      Es = class extends Ff {
        constructor(e) {
          super(e),
            (this.type = "decl"),
            (this.isNested = !0),
            this.nodes || (this.nodes = []);
        }
      };
    jo.exports = Es;
  });
  var Jo = y((Qv, Qo) => {
    "use strict";
    var tr = /[\t\n\f\r "#'()/;[\\\]{}]/g,
      rr = /[,\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,
      $f = /.[\r\n"'(/\\]/,
      Ko = /[\da-f]/i,
      sr = /[\n\f\r]/g;
    Qo.exports = function (e, s = {}) {
      let r = e.css.valueOf(),
        n = s.ignoreErrors,
        i,
        o,
        a,
        u,
        c,
        f,
        p,
        l,
        w,
        x = r.length,
        h = 0,
        d = [],
        m = [],
        b;
      function g() {
        return h;
      }
      function v(T) {
        throw e.error("Unclosed " + T, h);
      }
      function R() {
        return m.length === 0 && h >= x;
      }
      function F() {
        let T = 1,
          O = !1,
          C = !1;
        for (; T > 0; )
          (o += 1),
            r.length <= o && v("interpolation"),
            (i = r.charCodeAt(o)),
            (l = r.charCodeAt(o + 1)),
            O
              ? !C && i === O
                ? ((O = !1), (C = !1))
                : i === 92
                  ? (C = !C)
                  : C && (C = !1)
              : i === 39 || i === 34
                ? (O = i)
                : i === 125
                  ? (T -= 1)
                  : i === 35 && l === 123 && (T += 1);
      }
      function H(T) {
        if (m.length) return m.pop();
        if (h >= x) return;
        let O = T ? T.ignoreUnclosed : !1;
        switch (((i = r.charCodeAt(h)), i)) {
          case 10:
          case 32:
          case 9:
          case 13:
          case 12: {
            o = h;
            do (o += 1), (i = r.charCodeAt(o));
            while (i === 32 || i === 10 || i === 9 || i === 13 || i === 12);
            (w = ["space", r.slice(h, o)]), (h = o - 1);
            break;
          }
          case 91:
          case 93:
          case 123:
          case 125:
          case 58:
          case 59:
          case 41: {
            let C = String.fromCharCode(i);
            w = [C, C, h];
            break;
          }
          case 44: {
            w = ["word", ",", h, h + 1];
            break;
          }
          case 40: {
            if (
              ((p = d.length ? d.pop()[1] : ""),
              (l = r.charCodeAt(h + 1)),
              p === "url" && l !== 39 && l !== 34)
            ) {
              for (b = 1, f = !1, o = h + 1; o <= r.length - 1; ) {
                if (((l = r.charCodeAt(o)), l === 92)) f = !f;
                else if (l === 40) b += 1;
                else if (l === 41 && ((b -= 1), b === 0)) break;
                o += 1;
              }
              (u = r.slice(h, o + 1)), (w = ["brackets", u, h, o]), (h = o);
            } else
              (o = r.indexOf(")", h + 1)),
                (u = r.slice(h, o + 1)),
                o === -1 || $f.test(u)
                  ? (w = ["(", "(", h])
                  : ((w = ["brackets", u, h, o]), (h = o));
            break;
          }
          case 39:
          case 34: {
            for (
              a = i, o = h, f = !1;
              o < x &&
              (o++,
              o === x && v("string"),
              (i = r.charCodeAt(o)),
              (l = r.charCodeAt(o + 1)),
              !(!f && i === a));

            )
              i === 92 ? (f = !f) : f ? (f = !1) : i === 35 && l === 123 && F();
            (w = ["string", r.slice(h, o + 1), h, o]), (h = o);
            break;
          }
          case 64: {
            (tr.lastIndex = h + 1),
              tr.test(r),
              tr.lastIndex === 0 ? (o = r.length - 1) : (o = tr.lastIndex - 2),
              (w = ["at-word", r.slice(h, o + 1), h, o]),
              (h = o);
            break;
          }
          case 92: {
            for (o = h, c = !0; r.charCodeAt(o + 1) === 92; )
              (o += 1), (c = !c);
            if (
              ((i = r.charCodeAt(o + 1)),
              c &&
                i !== 47 &&
                i !== 32 &&
                i !== 10 &&
                i !== 9 &&
                i !== 13 &&
                i !== 12 &&
                ((o += 1), Ko.test(r.charAt(o))))
            ) {
              for (; Ko.test(r.charAt(o + 1)); ) o += 1;
              r.charCodeAt(o + 1) === 32 && (o += 1);
            }
            (w = ["word", r.slice(h, o + 1), h, o]), (h = o);
            break;
          }
          default:
            (l = r.charCodeAt(h + 1)),
              i === 35 && l === 123
                ? ((o = h),
                  F(),
                  (u = r.slice(h, o + 1)),
                  (w = ["word", u, h, o]),
                  (h = o))
                : i === 47 && l === 42
                  ? ((o = r.indexOf("*/", h + 2) + 1),
                    o === 0 && (n || O ? (o = r.length) : v("comment")),
                    (w = ["comment", r.slice(h, o + 1), h, o]),
                    (h = o))
                  : i === 47 && l === 47
                    ? ((sr.lastIndex = h + 1),
                      sr.test(r),
                      sr.lastIndex === 0
                        ? (o = r.length - 1)
                        : (o = sr.lastIndex - 2),
                      (u = r.slice(h, o + 1)),
                      (w = ["comment", u, h, o, "inline"]),
                      (h = o))
                    : ((rr.lastIndex = h + 1),
                      rr.test(r),
                      rr.lastIndex === 0
                        ? (o = r.length - 1)
                        : (o = rr.lastIndex - 2),
                      (w = ["word", r.slice(h, o + 1), h, o]),
                      d.push(w),
                      (h = o));
            break;
        }
        return h++, w;
      }
      function $(T) {
        m.push(T);
      }
      return { back: $, endOfFile: R, nextToken: H, position: g };
    };
  });
  var Zo = y((Jv, Xo) => {
    var { Comment: Wf } = er(),
      Yf = Kt(),
      zf = Ho(),
      Vf = Jo(),
      Ss = class extends Yf {
        atrule(e) {
          let s = e[1],
            r = e;
          for (; !this.tokenizer.endOfFile(); ) {
            let n = this.tokenizer.nextToken();
            if (n[0] === "word" && n[2] === r[3] + 1) (s += n[1]), (r = n);
            else {
              this.tokenizer.back(n);
              break;
            }
          }
          super.atrule(["at-word", s, e[2], r[3]]);
        }
        comment(e) {
          if (e[4] === "inline") {
            let s = new Wf();
            this.init(s, e[2]), (s.raws.inline = !0);
            let r = this.input.fromOffset(e[3]);
            s.source.end = { column: r.col, line: r.line, offset: e[3] + 1 };
            let n = e[1].slice(2);
            if (/^\s*$/.test(n))
              (s.text = ""), (s.raws.left = n), (s.raws.right = "");
            else {
              let i = n.match(/^(\s*)([^]*\S)(\s*)$/),
                o = i[2].replace(/(\*\/|\/\*)/g, "*//*");
              (s.text = o),
                (s.raws.left = i[1]),
                (s.raws.right = i[3]),
                (s.raws.text = i[2]);
            }
          } else super.comment(e);
        }
        createTokenizer() {
          this.tokenizer = Vf(this.input);
        }
        raw(e, s, r, n) {
          if ((super.raw(e, s, r, n), e.raws[s])) {
            let i = e.raws[s].raw;
            (e.raws[s].raw = r.reduce((o, a) => {
              if (a[0] === "comment" && a[4] === "inline") {
                let u = a[1].slice(2).replace(/(\*\/|\/\*)/g, "*//*");
                return o + "/*" + u + "*/";
              } else return o + a[1];
            }, "")),
              i !== e.raws[s].raw && (e.raws[s].scss = i);
          }
        }
        rule(e) {
          let s = !1,
            r = 0,
            n = "";
          for (let i of e)
            if (s) i[0] !== "comment" && i[0] !== "{" && (n += i[1]);
            else {
              if (
                i[0] === "space" &&
                i[1].includes(`
`)
              )
                break;
              i[0] === "("
                ? (r += 1)
                : i[0] === ")"
                  ? (r -= 1)
                  : r === 0 && i[0] === ":" && (s = !0);
            }
          if (!s || n.trim() === "" || /^[#:A-Za-z-]/.test(n)) super.rule(e);
          else {
            e.pop();
            let i = new zf();
            this.init(i, e[0][2]);
            let o;
            for (let u = e.length - 1; u >= 0; u--)
              if (e[u][0] !== "space") {
                o = e[u];
                break;
              }
            if (o[3]) {
              let u = this.input.fromOffset(o[3]);
              i.source.end = { column: u.col, line: u.line, offset: o[3] + 1 };
            } else {
              let u = this.input.fromOffset(o[2]);
              i.source.end = { column: u.col, line: u.line, offset: o[2] + 1 };
            }
            for (; e[0][0] !== "word"; ) i.raws.before += e.shift()[1];
            if (e[0][2]) {
              let u = this.input.fromOffset(e[0][2]);
              i.source.start = { column: u.col, line: u.line, offset: e[0][2] };
            }
            for (i.prop = ""; e.length; ) {
              let u = e[0][0];
              if (u === ":" || u === "space" || u === "comment") break;
              i.prop += e.shift()[1];
            }
            i.raws.between = "";
            let a;
            for (; e.length; )
              if (((a = e.shift()), a[0] === ":")) {
                i.raws.between += a[1];
                break;
              } else i.raws.between += a[1];
            (i.prop[0] === "_" || i.prop[0] === "*") &&
              ((i.raws.before += i.prop[0]), (i.prop = i.prop.slice(1))),
              (i.raws.between += this.spacesAndCommentsFromStart(e)),
              this.precheckMissedSemicolon(e);
            for (let u = e.length - 1; u > 0; u--) {
              if (((a = e[u]), a[1] === "!important")) {
                i.important = !0;
                let c = this.stringFrom(e, u);
                (c = this.spacesFromEnd(e) + c),
                  c !== " !important" && (i.raws.important = c);
                break;
              } else if (a[1] === "important") {
                let c = e.slice(0),
                  f = "";
                for (let p = u; p > 0; p--) {
                  let l = c[p][0];
                  if (f.trim().indexOf("!") === 0 && l !== "space") break;
                  f = c.pop()[1] + f;
                }
                f.trim().indexOf("!") === 0 &&
                  ((i.important = !0), (i.raws.important = f), (e = c));
              }
              if (a[0] !== "space" && a[0] !== "comment") break;
            }
            this.raw(i, "value", e),
              i.value.includes(":") && this.checkMissedSemicolon(e),
              (this.current = i);
          }
        }
      };
    Xo.exports = Ss;
  });
  var ta = y((Xv, ea) => {
    var { Input: Gf } = er(),
      jf = Zo();
    ea.exports = function (e, s) {
      let r = new Gf(e, s),
        n = new jf(r);
      return n.parse(), n.root;
    };
  });
  var Os = y((Ts) => {
    "use strict";
    Object.defineProperty(Ts, "__esModule", { value: !0 });
    function Kf(t) {
      (this.after = t.after),
        (this.before = t.before),
        (this.type = t.type),
        (this.value = t.value),
        (this.sourceIndex = t.sourceIndex);
    }
    Ts.default = Kf;
  });
  var As = y((Cs) => {
    "use strict";
    Object.defineProperty(Cs, "__esModule", { value: !0 });
    var Qf = Os(),
      sa = Jf(Qf);
    function Jf(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function gt(t) {
      var e = this;
      this.constructor(t),
        (this.nodes = t.nodes),
        this.after === void 0 &&
          (this.after =
            this.nodes.length > 0
              ? this.nodes[this.nodes.length - 1].after
              : ""),
        this.before === void 0 &&
          (this.before = this.nodes.length > 0 ? this.nodes[0].before : ""),
        this.sourceIndex === void 0 && (this.sourceIndex = this.before.length),
        this.nodes.forEach(function (s) {
          s.parent = e;
        });
    }
    gt.prototype = Object.create(sa.default.prototype);
    gt.constructor = sa.default;
    gt.prototype.walk = function (e, s) {
      for (
        var r = typeof e == "string" || e instanceof RegExp,
          n = r ? s : e,
          i = typeof e == "string" ? new RegExp(e) : e,
          o = 0;
        o < this.nodes.length;
        o++
      ) {
        var a = this.nodes[o],
          u = r ? i.test(a.type) : !0;
        if (
          (u && n && n(a, o, this.nodes) === !1) ||
          (a.nodes && a.walk(e, s) === !1)
        )
          return !1;
      }
      return !0;
    };
    gt.prototype.each = function () {
      for (
        var e =
            arguments.length <= 0 || arguments[0] === void 0
              ? function () {}
              : arguments[0],
          s = 0;
        s < this.nodes.length;
        s++
      ) {
        var r = this.nodes[s];
        if (e(r, s, this.nodes) === !1) return !1;
      }
      return !0;
    };
    Cs.default = gt;
  });
  var aa = y((vt) => {
    "use strict";
    Object.defineProperty(vt, "__esModule", { value: !0 });
    vt.parseMediaFeature = oa;
    vt.parseMediaQuery = Ps;
    vt.parseMediaList = ep;
    var Xf = Os(),
      na = ia(Xf),
      Zf = As(),
      Ns = ia(Zf);
    function ia(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function oa(t) {
      var e =
          arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1],
        s = [{ mode: "normal", character: null }],
        r = [],
        n = 0,
        i = "",
        o = null,
        a = null,
        u = e,
        c = t;
      t[0] === "(" &&
        t[t.length - 1] === ")" &&
        ((c = t.substring(1, t.length - 1)), u++);
      for (var f = 0; f < c.length; f++) {
        var p = c[f];
        if (
          ((p === "'" || p === '"') &&
            (s[n].isCalculationEnabled === !0
              ? (s.push({
                  mode: "string",
                  isCalculationEnabled: !1,
                  character: p,
                }),
                n++)
              : s[n].mode === "string" &&
                s[n].character === p &&
                c[f - 1] !== "\\" &&
                (s.pop(), n--)),
          p === "{"
            ? (s.push({ mode: "interpolation", isCalculationEnabled: !0 }), n++)
            : p === "}" && (s.pop(), n--),
          s[n].mode === "normal" && p === ":")
        ) {
          var l = c.substring(f + 1);
          (a = {
            type: "value",
            before: /^(\s*)/.exec(l)[1],
            after: /(\s*)$/.exec(l)[1],
            value: l.trim(),
          }),
            (a.sourceIndex = a.before.length + f + 1 + u),
            (o = {
              type: "colon",
              sourceIndex: f + u,
              after: a.before,
              value: ":",
            });
          break;
        }
        i += p;
      }
      return (
        (i = {
          type: "media-feature",
          before: /^(\s*)/.exec(i)[1],
          after: /(\s*)$/.exec(i)[1],
          value: i.trim(),
        }),
        (i.sourceIndex = i.before.length + u),
        r.push(i),
        o !== null && ((o.before = i.after), r.push(o)),
        a !== null && r.push(a),
        r
      );
    }
    function Ps(t) {
      var e =
          arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1],
        s = [],
        r = 0,
        n = !1,
        i = void 0;
      function o() {
        return { before: "", after: "", value: "" };
      }
      i = o();
      for (var a = 0; a < t.length; a++) {
        var u = t[a];
        n
          ? ((i.value += u),
            (u === "{" || u === "(") && r++,
            (u === ")" || u === "}") && r--)
          : u.search(/\s/) !== -1
            ? (i.before += u)
            : (u === "(" && ((i.type = "media-feature-expression"), r++),
              (i.value = u),
              (i.sourceIndex = e + a),
              (n = !0)),
          n &&
            r === 0 &&
            (u === ")" || a === t.length - 1 || t[a + 1].search(/\s/) !== -1) &&
            (["not", "only", "and"].indexOf(i.value) !== -1 &&
              (i.type = "keyword"),
            i.type === "media-feature-expression" &&
              (i.nodes = oa(i.value, i.sourceIndex)),
            s.push(
              Array.isArray(i.nodes) ? new Ns.default(i) : new na.default(i),
            ),
            (i = o()),
            (n = !1));
      }
      for (var c = 0; c < s.length; c++)
        if (
          ((i = s[c]), c > 0 && (s[c - 1].after = i.before), i.type === void 0)
        ) {
          if (c > 0) {
            if (s[c - 1].type === "media-feature-expression") {
              i.type = "keyword";
              continue;
            }
            if (s[c - 1].value === "not" || s[c - 1].value === "only") {
              i.type = "media-type";
              continue;
            }
            if (s[c - 1].value === "and") {
              i.type = "media-feature-expression";
              continue;
            }
            s[c - 1].type === "media-type" &&
              (s[c + 1]
                ? (i.type =
                    s[c + 1].type === "media-feature-expression"
                      ? "keyword"
                      : "media-feature-expression")
                : (i.type = "media-feature-expression"));
          }
          if (c === 0) {
            if (!s[c + 1]) {
              i.type = "media-type";
              continue;
            }
            if (
              s[c + 1] &&
              (s[c + 1].type === "media-feature-expression" ||
                s[c + 1].type === "keyword")
            ) {
              i.type = "media-type";
              continue;
            }
            if (s[c + 2]) {
              if (s[c + 2].type === "media-feature-expression") {
                (i.type = "media-type"), (s[c + 1].type = "keyword");
                continue;
              }
              if (s[c + 2].type === "keyword") {
                (i.type = "keyword"), (s[c + 1].type = "media-type");
                continue;
              }
            }
            if (s[c + 3] && s[c + 3].type === "media-feature-expression") {
              (i.type = "keyword"),
                (s[c + 1].type = "media-type"),
                (s[c + 2].type = "keyword");
              continue;
            }
          }
        }
      return s;
    }
    function ep(t) {
      var e = [],
        s = 0,
        r = 0,
        n = /^(\s*)url\s*\(/.exec(t);
      if (n !== null) {
        for (var i = n[0].length, o = 1; o > 0; ) {
          var a = t[i];
          a === "(" && o++, a === ")" && o--, i++;
        }
        e.unshift(
          new na.default({
            type: "url",
            value: t.substring(0, i).trim(),
            sourceIndex: n[1].length,
            before: n[1],
            after: /^(\s*)/.exec(t.substring(i))[1],
          }),
        ),
          (s = i);
      }
      for (var u = s; u < t.length; u++) {
        var c = t[u];
        if ((c === "(" && r++, c === ")" && r--, r === 0 && c === ",")) {
          var f = t.substring(s, u),
            p = /^(\s*)/.exec(f)[1];
          e.push(
            new Ns.default({
              type: "media-query",
              value: f.trim(),
              sourceIndex: s + p.length,
              nodes: Ps(f, s),
              before: p,
              after: /(\s*)$/.exec(f)[1],
            }),
          ),
            (s = u + 1);
        }
      }
      var l = t.substring(s),
        w = /^(\s*)/.exec(l)[1];
      return (
        e.push(
          new Ns.default({
            type: "media-query",
            value: l.trim(),
            sourceIndex: s + w.length,
            nodes: Ps(l, s),
            before: w,
            after: /(\s*)$/.exec(l)[1],
          }),
        ),
        e
      );
    }
  });
  var ua = y((Rs) => {
    "use strict";
    Object.defineProperty(Rs, "__esModule", { value: !0 });
    Rs.default = ip;
    var tp = As(),
      rp = np(tp),
      sp = aa();
    function np(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function ip(t) {
      return new rp.default({
        nodes: (0, sp.parseMediaList)(t),
        type: "media-query-list",
        value: t.trim(),
      });
    }
  });
  var qs = y((ax, fa) => {
    fa.exports = function (e, s) {
      if (((s = typeof s == "number" ? s : 1 / 0), !s))
        return Array.isArray(e)
          ? e.map(function (n) {
              return n;
            })
          : e;
      return r(e, 1);
      function r(n, i) {
        return n.reduce(function (o, a) {
          return Array.isArray(a) && i < s
            ? o.concat(r(a, i + 1))
            : o.concat(a);
        }, []);
      }
    };
  });
  var Ls = y((ux, pa) => {
    pa.exports = function (t, e) {
      for (var s = -1, r = []; (s = t.indexOf(e, s + 1)) !== -1; ) r.push(s);
      return r;
    };
  });
  var Ds = y((lx, ha) => {
    "use strict";
    function up(t, e) {
      for (var s = 1, r = t.length, n = t[0], i = t[0], o = 1; o < r; ++o)
        if (((i = n), (n = t[o]), e(n, i))) {
          if (o === s) {
            s++;
            continue;
          }
          t[s++] = n;
        }
      return (t.length = s), t;
    }
    function lp(t) {
      for (
        var e = 1, s = t.length, r = t[0], n = t[0], i = 1;
        i < s;
        ++i, n = r
      )
        if (((n = r), (r = t[i]), r !== n)) {
          if (i === e) {
            e++;
            continue;
          }
          t[e++] = r;
        }
      return (t.length = e), t;
    }
    function cp(t, e, s) {
      return t.length === 0
        ? t
        : e
          ? (s || t.sort(e), up(t, e))
          : (s || t.sort(), lp(t));
    }
    ha.exports = cp;
  });
  var de = y((nr, ma) => {
    "use strict";
    nr.__esModule = !0;
    var da =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          };
    function fp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var pp = function t(e, s) {
        if ((typeof e > "u" ? "undefined" : da(e)) !== "object") return e;
        var r = new e.constructor();
        for (var n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n],
              o = typeof i > "u" ? "undefined" : da(i);
            n === "parent" && o === "object"
              ? s && (r[n] = s)
              : i instanceof Array
                ? (r[n] = i.map(function (a) {
                    return t(a, r);
                  }))
                : (r[n] = t(i, r));
          }
        return r;
      },
      hp = (function () {
        function t() {
          var e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          fp(this, t);
          for (var s in e) this[s] = e[s];
          var r = e.spaces;
          r = r === void 0 ? {} : r;
          var n = r.before,
            i = n === void 0 ? "" : n,
            o = r.after,
            a = o === void 0 ? "" : o;
          this.spaces = { before: i, after: a };
        }
        return (
          (t.prototype.remove = function () {
            return (
              this.parent && this.parent.removeChild(this),
              (this.parent = void 0),
              this
            );
          }),
          (t.prototype.replaceWith = function () {
            if (this.parent) {
              for (var s in arguments)
                this.parent.insertBefore(this, arguments[s]);
              this.remove();
            }
            return this;
          }),
          (t.prototype.next = function () {
            return this.parent.at(this.parent.index(this) + 1);
          }),
          (t.prototype.prev = function () {
            return this.parent.at(this.parent.index(this) - 1);
          }),
          (t.prototype.clone = function () {
            var s =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {},
              r = pp(this);
            for (var n in s) r[n] = s[n];
            return r;
          }),
          (t.prototype.toString = function () {
            return [
              this.spaces.before,
              String(this.value),
              this.spaces.after,
            ].join("");
          }),
          t
        );
      })();
    nr.default = hp;
    ma.exports = nr.default;
  });
  var D = y((B) => {
    "use strict";
    B.__esModule = !0;
    var cx = (B.TAG = "tag"),
      fx = (B.STRING = "string"),
      px = (B.SELECTOR = "selector"),
      hx = (B.ROOT = "root"),
      dx = (B.PSEUDO = "pseudo"),
      mx = (B.NESTING = "nesting"),
      yx = (B.ID = "id"),
      wx = (B.COMMENT = "comment"),
      gx = (B.COMBINATOR = "combinator"),
      vx = (B.CLASS = "class"),
      xx = (B.ATTRIBUTE = "attribute"),
      bx = (B.UNIVERSAL = "universal");
  });
  var or = y((ir, ya) => {
    "use strict";
    ir.__esModule = !0;
    var dp = (function () {
        function t(e, s) {
          for (var r = 0; r < s.length; r++) {
            var n = s[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (e, s, r) {
          return s && t(e.prototype, s), r && t(e, r), e;
        };
      })(),
      mp = de(),
      yp = vp(mp),
      wp = D(),
      X = gp(wp);
    function gp(t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (t != null)
        for (var s in t)
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
      return (e.default = t), e;
    }
    function vp(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function xp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function bp(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function _p(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var kp = (function (t) {
      _p(e, t);
      function e(s) {
        xp(this, e);
        var r = bp(this, t.call(this, s));
        return r.nodes || (r.nodes = []), r;
      }
      return (
        (e.prototype.append = function (r) {
          return (r.parent = this), this.nodes.push(r), this;
        }),
        (e.prototype.prepend = function (r) {
          return (r.parent = this), this.nodes.unshift(r), this;
        }),
        (e.prototype.at = function (r) {
          return this.nodes[r];
        }),
        (e.prototype.index = function (r) {
          return typeof r == "number" ? r : this.nodes.indexOf(r);
        }),
        (e.prototype.removeChild = function (r) {
          (r = this.index(r)),
            (this.at(r).parent = void 0),
            this.nodes.splice(r, 1);
          var n = void 0;
          for (var i in this.indexes)
            (n = this.indexes[i]), n >= r && (this.indexes[i] = n - 1);
          return this;
        }),
        (e.prototype.removeAll = function () {
          for (
            var i = this.nodes,
              r = Array.isArray(i),
              n = 0,
              i = r ? i : i[Symbol.iterator]();
            ;

          ) {
            var o;
            if (r) {
              if (n >= i.length) break;
              o = i[n++];
            } else {
              if (((n = i.next()), n.done)) break;
              o = n.value;
            }
            var a = o;
            a.parent = void 0;
          }
          return (this.nodes = []), this;
        }),
        (e.prototype.empty = function () {
          return this.removeAll();
        }),
        (e.prototype.insertAfter = function (r, n) {
          var i = this.index(r);
          this.nodes.splice(i + 1, 0, n);
          var o = void 0;
          for (var a in this.indexes)
            (o = this.indexes[a]),
              i <= o && (this.indexes[a] = o + this.nodes.length);
          return this;
        }),
        (e.prototype.insertBefore = function (r, n) {
          var i = this.index(r);
          this.nodes.splice(i, 0, n);
          var o = void 0;
          for (var a in this.indexes)
            (o = this.indexes[a]),
              i <= o && (this.indexes[a] = o + this.nodes.length);
          return this;
        }),
        (e.prototype.each = function (r) {
          this.lastEach || (this.lastEach = 0),
            this.indexes || (this.indexes = {}),
            this.lastEach++;
          var n = this.lastEach;
          if (((this.indexes[n] = 0), !!this.length)) {
            for (
              var i = void 0, o = void 0;
              this.indexes[n] < this.length &&
              ((i = this.indexes[n]), (o = r(this.at(i), i)), o !== !1);

            )
              this.indexes[n] += 1;
            if ((delete this.indexes[n], o === !1)) return !1;
          }
        }),
        (e.prototype.walk = function (r) {
          return this.each(function (n, i) {
            var o = r(n, i);
            if ((o !== !1 && n.length && (o = n.walk(r)), o === !1)) return !1;
          });
        }),
        (e.prototype.walkAttributes = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.ATTRIBUTE) return r.call(n, i);
          });
        }),
        (e.prototype.walkClasses = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.CLASS) return r.call(n, i);
          });
        }),
        (e.prototype.walkCombinators = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.COMBINATOR) return r.call(n, i);
          });
        }),
        (e.prototype.walkComments = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.COMMENT) return r.call(n, i);
          });
        }),
        (e.prototype.walkIds = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.ID) return r.call(n, i);
          });
        }),
        (e.prototype.walkNesting = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.NESTING) return r.call(n, i);
          });
        }),
        (e.prototype.walkPseudos = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.PSEUDO) return r.call(n, i);
          });
        }),
        (e.prototype.walkTags = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.TAG) return r.call(n, i);
          });
        }),
        (e.prototype.walkUniversals = function (r) {
          var n = this;
          return this.walk(function (i) {
            if (i.type === X.UNIVERSAL) return r.call(n, i);
          });
        }),
        (e.prototype.split = function (r) {
          var n = this,
            i = [];
          return this.reduce(function (o, a, u) {
            var c = r.call(n, a);
            return (
              i.push(a),
              c ? (o.push(i), (i = [])) : u === n.length - 1 && o.push(i),
              o
            );
          }, []);
        }),
        (e.prototype.map = function (r) {
          return this.nodes.map(r);
        }),
        (e.prototype.reduce = function (r, n) {
          return this.nodes.reduce(r, n);
        }),
        (e.prototype.every = function (r) {
          return this.nodes.every(r);
        }),
        (e.prototype.some = function (r) {
          return this.nodes.some(r);
        }),
        (e.prototype.filter = function (r) {
          return this.nodes.filter(r);
        }),
        (e.prototype.sort = function (r) {
          return this.nodes.sort(r);
        }),
        (e.prototype.toString = function () {
          return this.map(String).join("");
        }),
        dp(e, [
          {
            key: "first",
            get: function () {
              return this.at(0);
            },
          },
          {
            key: "last",
            get: function () {
              return this.at(this.length - 1);
            },
          },
          {
            key: "length",
            get: function () {
              return this.nodes.length;
            },
          },
        ]),
        e
      );
    })(yp.default);
    ir.default = kp;
    ya.exports = ir.default;
  });
  var ga = y((ar, wa) => {
    "use strict";
    ar.__esModule = !0;
    var Ep = or(),
      Sp = Op(Ep),
      Tp = D();
    function Op(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Cp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Ap(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Np(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var Pp = (function (t) {
      Np(e, t);
      function e(s) {
        Cp(this, e);
        var r = Ap(this, t.call(this, s));
        return (r.type = Tp.ROOT), r;
      }
      return (
        (e.prototype.toString = function () {
          var r = this.reduce(function (n, i) {
            var o = String(i);
            return o ? n + o + "," : "";
          }, "").slice(0, -1);
          return this.trailingComma ? r + "," : r;
        }),
        e
      );
    })(Sp.default);
    ar.default = Pp;
    wa.exports = ar.default;
  });
  var xa = y((ur, va) => {
    "use strict";
    ur.__esModule = !0;
    var Rp = or(),
      Ip = Lp(Rp),
      qp = D();
    function Lp(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Dp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Mp(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Bp(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var Up = (function (t) {
      Bp(e, t);
      function e(s) {
        Dp(this, e);
        var r = Mp(this, t.call(this, s));
        return (r.type = qp.SELECTOR), r;
      }
      return e;
    })(Ip.default);
    ur.default = Up;
    va.exports = ur.default;
  });
  var qe = y((lr, ba) => {
    "use strict";
    lr.__esModule = !0;
    var Fp = (function () {
        function t(e, s) {
          for (var r = 0; r < s.length; r++) {
            var n = s[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (e, s, r) {
          return s && t(e.prototype, s), r && t(e, r), e;
        };
      })(),
      $p = de(),
      Wp = Yp($p);
    function Yp(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function zp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Vp(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Gp(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var jp = (function (t) {
      Gp(e, t);
      function e() {
        return zp(this, e), Vp(this, t.apply(this, arguments));
      }
      return (
        (e.prototype.toString = function () {
          return [
            this.spaces.before,
            this.ns,
            String(this.value),
            this.spaces.after,
          ].join("");
        }),
        Fp(e, [
          {
            key: "ns",
            get: function () {
              var r = this.namespace;
              return r ? (typeof r == "string" ? r : "") + "|" : "";
            },
          },
        ]),
        e
      );
    })(Wp.default);
    lr.default = jp;
    ba.exports = lr.default;
  });
  var ka = y((cr, _a) => {
    "use strict";
    cr.__esModule = !0;
    var Hp = qe(),
      Kp = Jp(Hp),
      Qp = D();
    function Jp(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Xp(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Zp(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function eh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var th = (function (t) {
      eh(e, t);
      function e(s) {
        Xp(this, e);
        var r = Zp(this, t.call(this, s));
        return (r.type = Qp.CLASS), r;
      }
      return (
        (e.prototype.toString = function () {
          return [
            this.spaces.before,
            this.ns,
            "." + this.value,
            this.spaces.after,
          ].join("");
        }),
        e
      );
    })(Kp.default);
    cr.default = th;
    _a.exports = cr.default;
  });
  var Sa = y((fr, Ea) => {
    "use strict";
    fr.__esModule = !0;
    var rh = de(),
      sh = ih(rh),
      nh = D();
    function ih(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function oh(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function ah(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function uh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var lh = (function (t) {
      uh(e, t);
      function e(s) {
        oh(this, e);
        var r = ah(this, t.call(this, s));
        return (r.type = nh.COMMENT), r;
      }
      return e;
    })(sh.default);
    fr.default = lh;
    Ea.exports = fr.default;
  });
  var Oa = y((pr, Ta) => {
    "use strict";
    pr.__esModule = !0;
    var ch = qe(),
      fh = hh(ch),
      ph = D();
    function hh(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function dh(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function mh(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function yh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var wh = (function (t) {
      yh(e, t);
      function e(s) {
        dh(this, e);
        var r = mh(this, t.call(this, s));
        return (r.type = ph.ID), r;
      }
      return (
        (e.prototype.toString = function () {
          return [
            this.spaces.before,
            this.ns,
            "#" + this.value,
            this.spaces.after,
          ].join("");
        }),
        e
      );
    })(fh.default);
    pr.default = wh;
    Ta.exports = pr.default;
  });
  var Aa = y((hr, Ca) => {
    "use strict";
    hr.__esModule = !0;
    var gh = qe(),
      vh = bh(gh),
      xh = D();
    function bh(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function _h(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function kh(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Eh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var Sh = (function (t) {
      Eh(e, t);
      function e(s) {
        _h(this, e);
        var r = kh(this, t.call(this, s));
        return (r.type = xh.TAG), r;
      }
      return e;
    })(vh.default);
    hr.default = Sh;
    Ca.exports = hr.default;
  });
  var Pa = y((dr, Na) => {
    "use strict";
    dr.__esModule = !0;
    var Th = de(),
      Oh = Ah(Th),
      Ch = D();
    function Ah(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Nh(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Ph(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Rh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var Ih = (function (t) {
      Rh(e, t);
      function e(s) {
        Nh(this, e);
        var r = Ph(this, t.call(this, s));
        return (r.type = Ch.STRING), r;
      }
      return e;
    })(Oh.default);
    dr.default = Ih;
    Na.exports = dr.default;
  });
  var Ia = y((mr, Ra) => {
    "use strict";
    mr.__esModule = !0;
    var qh = or(),
      Lh = Mh(qh),
      Dh = D();
    function Mh(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Bh(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Uh(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Fh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var $h = (function (t) {
      Fh(e, t);
      function e(s) {
        Bh(this, e);
        var r = Uh(this, t.call(this, s));
        return (r.type = Dh.PSEUDO), r;
      }
      return (
        (e.prototype.toString = function () {
          var r = this.length ? "(" + this.map(String).join(",") + ")" : "";
          return [
            this.spaces.before,
            String(this.value),
            r,
            this.spaces.after,
          ].join("");
        }),
        e
      );
    })(Lh.default);
    mr.default = $h;
    Ra.exports = mr.default;
  });
  var La = y((yr, qa) => {
    "use strict";
    yr.__esModule = !0;
    var Wh = qe(),
      Yh = Vh(Wh),
      zh = D();
    function Vh(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function Gh(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function jh(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function Hh(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var Kh = (function (t) {
      Hh(e, t);
      function e(s) {
        Gh(this, e);
        var r = jh(this, t.call(this, s));
        return (r.type = zh.ATTRIBUTE), (r.raws = {}), r;
      }
      return (
        (e.prototype.toString = function () {
          var r = [this.spaces.before, "[", this.ns, this.attribute];
          return (
            this.operator && r.push(this.operator),
            this.value && r.push(this.value),
            this.raws.insensitive
              ? r.push(this.raws.insensitive)
              : this.insensitive && r.push(" i"),
            r.push("]"),
            r.concat(this.spaces.after).join("")
          );
        }),
        e
      );
    })(Yh.default);
    yr.default = Kh;
    qa.exports = yr.default;
  });
  var Ma = y((wr, Da) => {
    "use strict";
    wr.__esModule = !0;
    var Qh = qe(),
      Jh = Zh(Qh),
      Xh = D();
    function Zh(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function ed(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function td(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function rd(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var sd = (function (t) {
      rd(e, t);
      function e(s) {
        ed(this, e);
        var r = td(this, t.call(this, s));
        return (r.type = Xh.UNIVERSAL), (r.value = "*"), r;
      }
      return e;
    })(Jh.default);
    wr.default = sd;
    Da.exports = wr.default;
  });
  var Ua = y((gr, Ba) => {
    "use strict";
    gr.__esModule = !0;
    var nd = de(),
      id = ad(nd),
      od = D();
    function ad(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function ud(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function ld(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function cd(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var fd = (function (t) {
      cd(e, t);
      function e(s) {
        ud(this, e);
        var r = ld(this, t.call(this, s));
        return (r.type = od.COMBINATOR), r;
      }
      return e;
    })(id.default);
    gr.default = fd;
    Ba.exports = gr.default;
  });
  var $a = y((vr, Fa) => {
    "use strict";
    vr.__esModule = !0;
    var pd = de(),
      hd = md(pd),
      dd = D();
    function md(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function yd(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function wd(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e && (typeof e == "object" || typeof e == "function") ? e : t;
    }
    function gd(t, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e,
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    var vd = (function (t) {
      gd(e, t);
      function e(s) {
        yd(this, e);
        var r = wd(this, t.call(this, s));
        return (r.type = dd.NESTING), (r.value = "&"), r;
      }
      return e;
    })(hd.default);
    vr.default = vd;
    Fa.exports = vr.default;
  });
  var Ya = y((xr, Wa) => {
    "use strict";
    xr.__esModule = !0;
    xr.default = xd;
    function xd(t) {
      return t.sort(function (e, s) {
        return e - s;
      });
    }
    Wa.exports = xr.default;
  });
  var Xa = y((kr, Ja) => {
    "use strict";
    kr.__esModule = !0;
    kr.default = Pd;
    var za = 39,
      bd = 34,
      Ms = 92,
      Va = 47,
      xt = 10,
      Bs = 32,
      Us = 12,
      Fs = 9,
      $s = 13,
      Ga = 43,
      ja = 62,
      Ha = 126,
      Ka = 124,
      _d = 44,
      kd = 40,
      Ed = 41,
      Sd = 91,
      Td = 93,
      Od = 59,
      Qa = 42,
      Cd = 58,
      Ad = 38,
      Nd = 64,
      br = /[ \n\t\r\{\(\)'"\\;/]/g,
      _r = /[ \n\t\r\(\)\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g;
    function Pd(t) {
      for (
        var e = [],
          s = t.css.valueOf(),
          r = void 0,
          n = void 0,
          i = void 0,
          o = void 0,
          a = void 0,
          u = void 0,
          c = void 0,
          f = void 0,
          p = void 0,
          l = void 0,
          w = void 0,
          x = s.length,
          h = -1,
          d = 1,
          m = 0,
          b = function (v, R) {
            if (t.safe) (s += R), (n = s.length - 1);
            else throw t.error("Unclosed " + v, d, m - h, m);
          };
        m < x;

      ) {
        switch (((r = s.charCodeAt(m)), r === xt && ((h = m), (d += 1)), r)) {
          case xt:
          case Bs:
          case Fs:
          case $s:
          case Us:
            n = m;
            do (n += 1), (r = s.charCodeAt(n)), r === xt && ((h = n), (d += 1));
            while (r === Bs || r === xt || r === Fs || r === $s || r === Us);
            e.push(["space", s.slice(m, n), d, m - h, m]), (m = n - 1);
            break;
          case Ga:
          case ja:
          case Ha:
          case Ka:
            n = m;
            do (n += 1), (r = s.charCodeAt(n));
            while (r === Ga || r === ja || r === Ha || r === Ka);
            e.push(["combinator", s.slice(m, n), d, m - h, m]), (m = n - 1);
            break;
          case Qa:
            e.push(["*", "*", d, m - h, m]);
            break;
          case Ad:
            e.push(["&", "&", d, m - h, m]);
            break;
          case _d:
            e.push([",", ",", d, m - h, m]);
            break;
          case Sd:
            e.push(["[", "[", d, m - h, m]);
            break;
          case Td:
            e.push(["]", "]", d, m - h, m]);
            break;
          case Cd:
            e.push([":", ":", d, m - h, m]);
            break;
          case Od:
            e.push([";", ";", d, m - h, m]);
            break;
          case kd:
            e.push(["(", "(", d, m - h, m]);
            break;
          case Ed:
            e.push([")", ")", d, m - h, m]);
            break;
          case za:
          case bd:
            (i = r === za ? "'" : '"'), (n = m);
            do
              for (
                l = !1,
                  n = s.indexOf(i, n + 1),
                  n === -1 && b("quote", i),
                  w = n;
                s.charCodeAt(w - 1) === Ms;

              )
                (w -= 1), (l = !l);
            while (l);
            e.push(["string", s.slice(m, n + 1), d, m - h, d, n - h, m]),
              (m = n);
            break;
          case Nd:
            (br.lastIndex = m + 1),
              br.test(s),
              br.lastIndex === 0 ? (n = s.length - 1) : (n = br.lastIndex - 2),
              e.push(["at-word", s.slice(m, n + 1), d, m - h, d, n - h, m]),
              (m = n);
            break;
          case Ms:
            for (n = m, c = !0; s.charCodeAt(n + 1) === Ms; )
              (n += 1), (c = !c);
            (r = s.charCodeAt(n + 1)),
              c &&
                r !== Va &&
                r !== Bs &&
                r !== xt &&
                r !== Fs &&
                r !== $s &&
                r !== Us &&
                (n += 1),
              e.push(["word", s.slice(m, n + 1), d, m - h, d, n - h, m]),
              (m = n);
            break;
          default:
            r === Va && s.charCodeAt(m + 1) === Qa
              ? ((n = s.indexOf("*/", m + 2) + 1),
                n === 0 && b("comment", "*/"),
                (u = s.slice(m, n + 1)),
                (o = u.split(`
`)),
                (a = o.length - 1),
                a > 0
                  ? ((f = d + a), (p = n - o[a].length))
                  : ((f = d), (p = h)),
                e.push(["comment", u, d, m - h, f, n - p, m]),
                (h = p),
                (d = f),
                (m = n))
              : ((_r.lastIndex = m + 1),
                _r.test(s),
                _r.lastIndex === 0
                  ? (n = s.length - 1)
                  : (n = _r.lastIndex - 2),
                e.push(["word", s.slice(m, n + 1), d, m - h, d, n - h, m]),
                (m = n));
            break;
        }
        m++;
      }
      return e;
    }
    Ja.exports = kr.default;
  });
  var tu = y((Er, eu) => {
    "use strict";
    Er.__esModule = !0;
    var Rd = (function () {
        function t(e, s) {
          for (var r = 0; r < s.length; r++) {
            var n = s[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (e, s, r) {
          return s && t(e.prototype, s), r && t(e, r), e;
        };
      })(),
      Id = qs(),
      qd = I(Id),
      Ld = Ls(),
      Ws = I(Ld),
      Dd = Ds(),
      Md = I(Dd),
      Bd = ga(),
      Ud = I(Bd),
      Fd = xa(),
      Ys = I(Fd),
      $d = ka(),
      Wd = I($d),
      Yd = Sa(),
      zd = I(Yd),
      Vd = Oa(),
      Gd = I(Vd),
      jd = Aa(),
      Hd = I(jd),
      Kd = Pa(),
      Qd = I(Kd),
      Jd = Ia(),
      Xd = I(Jd),
      Zd = La(),
      em = I(Zd),
      tm = Ma(),
      rm = I(tm),
      sm = Ua(),
      nm = I(sm),
      im = $a(),
      om = I(im),
      am = Ya(),
      um = I(am),
      lm = Xa(),
      Za = I(lm),
      cm = D(),
      fm = pm(cm);
    function pm(t) {
      if (t && t.__esModule) return t;
      var e = {};
      if (t != null)
        for (var s in t)
          Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
      return (e.default = t), e;
    }
    function I(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function hm(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var dm = (function () {
      function t(e) {
        hm(this, t),
          (this.input = e),
          (this.lossy = e.options.lossless === !1),
          (this.position = 0),
          (this.root = new Ud.default());
        var s = new Ys.default();
        return (
          this.root.append(s),
          (this.current = s),
          this.lossy
            ? (this.tokens = (0, Za.default)({
                safe: e.safe,
                css: e.css.trim(),
              }))
            : (this.tokens = (0, Za.default)(e)),
          this.loop()
        );
      }
      return (
        (t.prototype.attribute = function () {
          var s = "",
            r = void 0,
            n = this.currToken;
          for (
            this.position++;
            this.position < this.tokens.length && this.currToken[0] !== "]";

          )
            (s += this.tokens[this.position][1]), this.position++;
          this.position === this.tokens.length &&
            !~s.indexOf("]") &&
            this.error("Expected a closing square bracket.");
          var i = s.split(/((?:[*~^$|]?=))([^]*)/),
            o = i[0].split(/(\|)/g),
            a = {
              operator: i[1],
              value: i[2],
              source: {
                start: { line: n[2], column: n[3] },
                end: { line: this.currToken[2], column: this.currToken[3] },
              },
              sourceIndex: n[4],
            };
          if (
            (o.length > 1
              ? (o[0] === "" && (o[0] = !0),
                (a.attribute = this.parseValue(o[2])),
                (a.namespace = this.parseNamespace(o[0])))
              : (a.attribute = this.parseValue(i[0])),
            (r = new em.default(a)),
            i[2])
          ) {
            var u = i[2].split(/(\s+i\s*?)$/),
              c = u[0].trim();
            (r.value = this.lossy ? c : u[0]),
              u[1] &&
                ((r.insensitive = !0),
                this.lossy || (r.raws.insensitive = u[1])),
              (r.quoted = c[0] === "'" || c[0] === '"'),
              (r.raws.unquoted = r.quoted ? c.slice(1, -1) : c);
          }
          this.newNode(r), this.position++;
        }),
        (t.prototype.combinator = function () {
          if (this.currToken[1] === "|") return this.namespace();
          for (
            var s = new nm.default({
              value: "",
              source: {
                start: { line: this.currToken[2], column: this.currToken[3] },
                end: { line: this.currToken[2], column: this.currToken[3] },
              },
              sourceIndex: this.currToken[4],
            });
            this.position < this.tokens.length &&
            this.currToken &&
            (this.currToken[0] === "space" ||
              this.currToken[0] === "combinator");

          )
            this.nextToken && this.nextToken[0] === "combinator"
              ? ((s.spaces.before = this.parseSpace(this.currToken[1])),
                (s.source.start.line = this.nextToken[2]),
                (s.source.start.column = this.nextToken[3]),
                (s.source.end.column = this.nextToken[3]),
                (s.source.end.line = this.nextToken[2]),
                (s.sourceIndex = this.nextToken[4]))
              : this.prevToken && this.prevToken[0] === "combinator"
                ? (s.spaces.after = this.parseSpace(this.currToken[1]))
                : this.currToken[0] === "combinator"
                  ? (s.value = this.currToken[1])
                  : this.currToken[0] === "space" &&
                    (s.value = this.parseSpace(this.currToken[1], " ")),
              this.position++;
          return this.newNode(s);
        }),
        (t.prototype.comma = function () {
          if (this.position === this.tokens.length - 1) {
            (this.root.trailingComma = !0), this.position++;
            return;
          }
          var s = new Ys.default();
          this.current.parent.append(s), (this.current = s), this.position++;
        }),
        (t.prototype.comment = function () {
          var s = new zd.default({
            value: this.currToken[1],
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[4], column: this.currToken[5] },
            },
            sourceIndex: this.currToken[6],
          });
          this.newNode(s), this.position++;
        }),
        (t.prototype.error = function (s) {
          throw new this.input.error(s);
        }),
        (t.prototype.missingBackslash = function () {
          return this.error("Expected a backslash preceding the semicolon.");
        }),
        (t.prototype.missingParenthesis = function () {
          return this.error("Expected opening parenthesis.");
        }),
        (t.prototype.missingSquareBracket = function () {
          return this.error("Expected opening square bracket.");
        }),
        (t.prototype.namespace = function () {
          var s = (this.prevToken && this.prevToken[1]) || !0;
          if (this.nextToken[0] === "word")
            return this.position++, this.word(s);
          if (this.nextToken[0] === "*")
            return this.position++, this.universal(s);
        }),
        (t.prototype.nesting = function () {
          this.newNode(
            new om.default({
              value: this.currToken[1],
              source: {
                start: { line: this.currToken[2], column: this.currToken[3] },
                end: { line: this.currToken[2], column: this.currToken[3] },
              },
              sourceIndex: this.currToken[4],
            }),
          ),
            this.position++;
        }),
        (t.prototype.parentheses = function () {
          var s = this.current.last;
          if (s && s.type === fm.PSEUDO) {
            var r = new Ys.default(),
              n = this.current;
            s.append(r), (this.current = r);
            var i = 1;
            for (this.position++; this.position < this.tokens.length && i; )
              this.currToken[0] === "(" && i++,
                this.currToken[0] === ")" && i--,
                i
                  ? this.parse()
                  : ((r.parent.source.end.line = this.currToken[2]),
                    (r.parent.source.end.column = this.currToken[3]),
                    this.position++);
            i && this.error("Expected closing parenthesis."),
              (this.current = n);
          } else {
            var o = 1;
            for (
              this.position++, s.value += "(";
              this.position < this.tokens.length && o;

            )
              this.currToken[0] === "(" && o++,
                this.currToken[0] === ")" && o--,
                (s.value += this.parseParenthesisToken(this.currToken)),
                this.position++;
            o && this.error("Expected closing parenthesis.");
          }
        }),
        (t.prototype.pseudo = function () {
          for (
            var s = this, r = "", n = this.currToken;
            this.currToken && this.currToken[0] === ":";

          )
            (r += this.currToken[1]), this.position++;
          if (!this.currToken)
            return this.error("Expected pseudo-class or pseudo-element");
          if (this.currToken[0] === "word") {
            var i = void 0;
            this.splitWord(!1, function (o, a) {
              (r += o),
                (i = new Xd.default({
                  value: r,
                  source: {
                    start: { line: n[2], column: n[3] },
                    end: { line: s.currToken[4], column: s.currToken[5] },
                  },
                  sourceIndex: n[4],
                })),
                s.newNode(i),
                a > 1 &&
                  s.nextToken &&
                  s.nextToken[0] === "(" &&
                  s.error("Misplaced parenthesis.");
            });
          } else this.error('Unexpected "' + this.currToken[0] + '" found.');
        }),
        (t.prototype.space = function () {
          var s = this.currToken;
          this.position === 0 ||
          this.prevToken[0] === "," ||
          this.prevToken[0] === "("
            ? ((this.spaces = this.parseSpace(s[1])), this.position++)
            : this.position === this.tokens.length - 1 ||
                this.nextToken[0] === "," ||
                this.nextToken[0] === ")"
              ? ((this.current.last.spaces.after = this.parseSpace(s[1])),
                this.position++)
              : this.combinator();
        }),
        (t.prototype.string = function () {
          var s = this.currToken;
          this.newNode(
            new Qd.default({
              value: this.currToken[1],
              source: {
                start: { line: s[2], column: s[3] },
                end: { line: s[4], column: s[5] },
              },
              sourceIndex: s[6],
            }),
          ),
            this.position++;
        }),
        (t.prototype.universal = function (s) {
          var r = this.nextToken;
          if (r && r[1] === "|") return this.position++, this.namespace();
          this.newNode(
            new rm.default({
              value: this.currToken[1],
              source: {
                start: { line: this.currToken[2], column: this.currToken[3] },
                end: { line: this.currToken[2], column: this.currToken[3] },
              },
              sourceIndex: this.currToken[4],
            }),
            s,
          ),
            this.position++;
        }),
        (t.prototype.splitWord = function (s, r) {
          for (
            var n = this, i = this.nextToken, o = this.currToken[1];
            i && i[0] === "word";

          ) {
            this.position++;
            var a = this.currToken[1];
            if (((o += a), a.lastIndexOf("\\") === a.length - 1)) {
              var u = this.nextToken;
              u &&
                u[0] === "space" &&
                ((o += this.parseSpace(u[1], " ")), this.position++);
            }
            i = this.nextToken;
          }
          var c = (0, Ws.default)(o, "."),
            f = (0, Ws.default)(o, "#"),
            p = (0, Ws.default)(o, "#{");
          p.length &&
            (f = f.filter(function (w) {
              return !~p.indexOf(w);
            }));
          var l = (0, um.default)(
            (0, Md.default)((0, qd.default)([[0], c, f])),
          );
          l.forEach(function (w, x) {
            var h = l[x + 1] || o.length,
              d = o.slice(w, h);
            if (x === 0 && r) return r.call(n, d, l.length);
            var m = void 0;
            ~c.indexOf(w)
              ? (m = new Wd.default({
                  value: d.slice(1),
                  source: {
                    start: { line: n.currToken[2], column: n.currToken[3] + w },
                    end: {
                      line: n.currToken[4],
                      column: n.currToken[3] + (h - 1),
                    },
                  },
                  sourceIndex: n.currToken[6] + l[x],
                }))
              : ~f.indexOf(w)
                ? (m = new Gd.default({
                    value: d.slice(1),
                    source: {
                      start: {
                        line: n.currToken[2],
                        column: n.currToken[3] + w,
                      },
                      end: {
                        line: n.currToken[4],
                        column: n.currToken[3] + (h - 1),
                      },
                    },
                    sourceIndex: n.currToken[6] + l[x],
                  }))
                : (m = new Hd.default({
                    value: d,
                    source: {
                      start: {
                        line: n.currToken[2],
                        column: n.currToken[3] + w,
                      },
                      end: {
                        line: n.currToken[4],
                        column: n.currToken[3] + (h - 1),
                      },
                    },
                    sourceIndex: n.currToken[6] + l[x],
                  })),
              n.newNode(m, s);
          }),
            this.position++;
        }),
        (t.prototype.word = function (s) {
          var r = this.nextToken;
          return r && r[1] === "|"
            ? (this.position++, this.namespace())
            : this.splitWord(s);
        }),
        (t.prototype.loop = function () {
          for (; this.position < this.tokens.length; ) this.parse(!0);
          return this.root;
        }),
        (t.prototype.parse = function (s) {
          switch (this.currToken[0]) {
            case "space":
              this.space();
              break;
            case "comment":
              this.comment();
              break;
            case "(":
              this.parentheses();
              break;
            case ")":
              s && this.missingParenthesis();
              break;
            case "[":
              this.attribute();
              break;
            case "]":
              this.missingSquareBracket();
              break;
            case "at-word":
            case "word":
              this.word();
              break;
            case ":":
              this.pseudo();
              break;
            case ";":
              this.missingBackslash();
              break;
            case ",":
              this.comma();
              break;
            case "*":
              this.universal();
              break;
            case "&":
              this.nesting();
              break;
            case "combinator":
              this.combinator();
              break;
            case "string":
              this.string();
              break;
          }
        }),
        (t.prototype.parseNamespace = function (s) {
          if (this.lossy && typeof s == "string") {
            var r = s.trim();
            return r.length ? r : !0;
          }
          return s;
        }),
        (t.prototype.parseSpace = function (s, r) {
          return this.lossy ? r || "" : s;
        }),
        (t.prototype.parseValue = function (s) {
          return this.lossy && s && typeof s == "string" ? s.trim() : s;
        }),
        (t.prototype.parseParenthesisToken = function (s) {
          return this.lossy
            ? s[0] === "space"
              ? this.parseSpace(s[1], " ")
              : this.parseValue(s[1])
            : s[1];
        }),
        (t.prototype.newNode = function (s, r) {
          return (
            r && (s.namespace = this.parseNamespace(r)),
            this.spaces &&
              ((s.spaces.before = this.spaces), (this.spaces = "")),
            this.current.append(s)
          );
        }),
        Rd(t, [
          {
            key: "currToken",
            get: function () {
              return this.tokens[this.position];
            },
          },
          {
            key: "nextToken",
            get: function () {
              return this.tokens[this.position + 1];
            },
          },
          {
            key: "prevToken",
            get: function () {
              return this.tokens[this.position - 1];
            },
          },
        ]),
        t
      );
    })();
    Er.default = dm;
    eu.exports = Er.default;
  });
  var su = y((Sr, ru) => {
    "use strict";
    Sr.__esModule = !0;
    var mm = (function () {
        function t(e, s) {
          for (var r = 0; r < s.length; r++) {
            var n = s[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (e, s, r) {
          return s && t(e.prototype, s), r && t(e, r), e;
        };
      })(),
      ym = tu(),
      wm = gm(ym);
    function gm(t) {
      return t && t.__esModule ? t : { default: t };
    }
    function vm(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var xm = (function () {
      function t(e) {
        return vm(this, t), (this.func = e || function () {}), this;
      }
      return (
        (t.prototype.process = function (s) {
          var r =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            n = new wm.default({
              css: s,
              error: function (o) {
                throw new Error(o);
              },
              options: r,
            });
          return (this.res = n), this.func(n), this;
        }),
        mm(t, [
          {
            key: "result",
            get: function () {
              return String(this.res);
            },
          },
        ]),
        t
      );
    })();
    Sr.default = xm;
    ru.exports = Sr.default;
  });
  var z = y((Tx, iu) => {
    "use strict";
    var zs = function (t, e) {
      let s = new t.constructor();
      for (let r in t) {
        if (!t.hasOwnProperty(r)) continue;
        let n = t[r],
          i = typeof n;
        r === "parent" && i === "object"
          ? e && (s[r] = e)
          : r === "source"
            ? (s[r] = n)
            : n instanceof Array
              ? (s[r] = n.map((o) => zs(o, s)))
              : r !== "before" &&
                r !== "after" &&
                r !== "between" &&
                r !== "semicolon" &&
                (i === "object" && n !== null && (n = zs(n)), (s[r] = n));
      }
      return s;
    };
    iu.exports = class {
      constructor(e) {
        (e = e || {}), (this.raws = { before: "", after: "" });
        for (let s in e) this[s] = e[s];
      }
      remove() {
        return (
          this.parent && this.parent.removeChild(this),
          (this.parent = void 0),
          this
        );
      }
      toString() {
        return [this.raws.before, String(this.value), this.raws.after].join("");
      }
      clone(e) {
        e = e || {};
        let s = zs(this);
        for (let r in e) s[r] = e[r];
        return s;
      }
      cloneBefore(e) {
        e = e || {};
        let s = this.clone(e);
        return this.parent.insertBefore(this, s), s;
      }
      cloneAfter(e) {
        e = e || {};
        let s = this.clone(e);
        return this.parent.insertAfter(this, s), s;
      }
      replaceWith() {
        let e = Array.prototype.slice.call(arguments);
        if (this.parent) {
          for (let s of e) this.parent.insertBefore(this, s);
          this.remove();
        }
        return this;
      }
      moveTo(e) {
        return (
          this.cleanRaws(this.root() === e.root()),
          this.remove(),
          e.append(this),
          this
        );
      }
      moveBefore(e) {
        return (
          this.cleanRaws(this.root() === e.root()),
          this.remove(),
          e.parent.insertBefore(e, this),
          this
        );
      }
      moveAfter(e) {
        return (
          this.cleanRaws(this.root() === e.root()),
          this.remove(),
          e.parent.insertAfter(e, this),
          this
        );
      }
      next() {
        let e = this.parent.index(this);
        return this.parent.nodes[e + 1];
      }
      prev() {
        let e = this.parent.index(this);
        return this.parent.nodes[e - 1];
      }
      toJSON() {
        let e = {};
        for (let s in this) {
          if (!this.hasOwnProperty(s) || s === "parent") continue;
          let r = this[s];
          r instanceof Array
            ? (e[s] = r.map((n) =>
                typeof n == "object" && n.toJSON ? n.toJSON() : n,
              ))
            : typeof r == "object" && r.toJSON
              ? (e[s] = r.toJSON())
              : (e[s] = r);
        }
        return e;
      }
      root() {
        let e = this;
        for (; e.parent; ) e = e.parent;
        return e;
      }
      cleanRaws(e) {
        delete this.raws.before,
          delete this.raws.after,
          e || delete this.raws.between;
      }
      positionInside(e) {
        let s = this.toString(),
          r = this.source.start.column,
          n = this.source.start.line;
        for (let i = 0; i < e; i++)
          s[i] ===
          `
`
            ? ((r = 1), (n += 1))
            : (r += 1);
        return { line: n, column: r };
      }
      positionBy(e) {
        let s = this.source.start;
        if (Object(e).index) s = this.positionInside(e.index);
        else if (Object(e).word) {
          let r = this.toString().indexOf(e.word);
          r !== -1 && (s = this.positionInside(r));
        }
        return s;
      }
    };
  });
  var U = y((Ox, ou) => {
    "use strict";
    var _m = z(),
      Le = class extends _m {
        constructor(e) {
          super(e), this.nodes || (this.nodes = []);
        }
        push(e) {
          return (e.parent = this), this.nodes.push(e), this;
        }
        each(e) {
          this.lastEach || (this.lastEach = 0),
            this.indexes || (this.indexes = {}),
            (this.lastEach += 1);
          let s = this.lastEach,
            r,
            n;
          if (((this.indexes[s] = 0), !!this.nodes)) {
            for (
              ;
              this.indexes[s] < this.nodes.length &&
              ((r = this.indexes[s]), (n = e(this.nodes[r], r)), n !== !1);

            )
              this.indexes[s] += 1;
            return delete this.indexes[s], n;
          }
        }
        walk(e) {
          return this.each((s, r) => {
            let n = e(s, r);
            return n !== !1 && s.walk && (n = s.walk(e)), n;
          });
        }
        walkType(e, s) {
          if (!e || !s)
            throw new Error("Parameters {type} and {callback} are required.");
          let r = typeof e == "function";
          return this.walk((n, i) => {
            if ((r && n instanceof e) || (!r && n.type === e))
              return s.call(this, n, i);
          });
        }
        append(e) {
          return (e.parent = this), this.nodes.push(e), this;
        }
        prepend(e) {
          return (e.parent = this), this.nodes.unshift(e), this;
        }
        cleanRaws(e) {
          if ((super.cleanRaws(e), this.nodes))
            for (let s of this.nodes) s.cleanRaws(e);
        }
        insertAfter(e, s) {
          let r = this.index(e),
            n;
          this.nodes.splice(r + 1, 0, s);
          for (let i in this.indexes)
            (n = this.indexes[i]),
              r <= n && (this.indexes[i] = n + this.nodes.length);
          return this;
        }
        insertBefore(e, s) {
          let r = this.index(e),
            n;
          this.nodes.splice(r, 0, s);
          for (let i in this.indexes)
            (n = this.indexes[i]),
              r <= n && (this.indexes[i] = n + this.nodes.length);
          return this;
        }
        removeChild(e) {
          (e = this.index(e)),
            (this.nodes[e].parent = void 0),
            this.nodes.splice(e, 1);
          let s;
          for (let r in this.indexes)
            (s = this.indexes[r]), s >= e && (this.indexes[r] = s - 1);
          return this;
        }
        removeAll() {
          for (let e of this.nodes) e.parent = void 0;
          return (this.nodes = []), this;
        }
        every(e) {
          return this.nodes.every(e);
        }
        some(e) {
          return this.nodes.some(e);
        }
        index(e) {
          return typeof e == "number" ? e : this.nodes.indexOf(e);
        }
        get first() {
          if (this.nodes) return this.nodes[0];
        }
        get last() {
          if (this.nodes) return this.nodes[this.nodes.length - 1];
        }
        toString() {
          let e = this.nodes.map(String).join("");
          return (
            this.value && (e = this.value + e),
            this.raws.before && (e = this.raws.before + e),
            this.raws.after && (e += this.raws.after),
            e
          );
        }
      };
    Le.registerWalker = (t) => {
      let e = "walk" + t.name;
      e.lastIndexOf("s") !== e.length - 1 && (e += "s"),
        !Le.prototype[e] &&
          (Le.prototype[e] = function (s) {
            return this.walkType(t, s);
          });
    };
    ou.exports = Le;
  });
  var uu = y((Ax, au) => {
    "use strict";
    var km = U();
    au.exports = class extends km {
      constructor(e) {
        super(e), (this.type = "root");
      }
    };
  });
  var cu = y((Px, lu) => {
    "use strict";
    var Em = U();
    lu.exports = class extends Em {
      constructor(e) {
        super(e), (this.type = "value"), (this.unbalanced = 0);
      }
    };
  });
  var hu = y((Rx, pu) => {
    "use strict";
    var fu = U(),
      Tr = class extends fu {
        constructor(e) {
          super(e), (this.type = "atword");
        }
        toString() {
          let e = this.quoted ? this.raws.quote : "";
          return [
            this.raws.before,
            "@",
            String.prototype.toString.call(this.value),
            this.raws.after,
          ].join("");
        }
      };
    fu.registerWalker(Tr);
    pu.exports = Tr;
  });
  var mu = y((Ix, du) => {
    "use strict";
    var Sm = U(),
      Tm = z(),
      Or = class extends Tm {
        constructor(e) {
          super(e), (this.type = "colon");
        }
      };
    Sm.registerWalker(Or);
    du.exports = Or;
  });
  var wu = y((qx, yu) => {
    "use strict";
    var Om = U(),
      Cm = z(),
      Cr = class extends Cm {
        constructor(e) {
          super(e), (this.type = "comma");
        }
      };
    Om.registerWalker(Cr);
    yu.exports = Cr;
  });
  var vu = y((Lx, gu) => {
    "use strict";
    var Am = U(),
      Nm = z(),
      Ar = class extends Nm {
        constructor(e) {
          super(e),
            (this.type = "comment"),
            (this.inline = Object(e).inline || !1);
        }
        toString() {
          return [
            this.raws.before,
            this.inline ? "//" : "/*",
            String(this.value),
            this.inline ? "" : "*/",
            this.raws.after,
          ].join("");
        }
      };
    Am.registerWalker(Ar);
    gu.exports = Ar;
  });
  var _u = y((Dx, bu) => {
    "use strict";
    var xu = U(),
      Nr = class extends xu {
        constructor(e) {
          super(e), (this.type = "func"), (this.unbalanced = -1);
        }
      };
    xu.registerWalker(Nr);
    bu.exports = Nr;
  });
  var Eu = y((Mx, ku) => {
    "use strict";
    var Pm = U(),
      Rm = z(),
      Pr = class extends Rm {
        constructor(e) {
          super(e), (this.type = "number"), (this.unit = Object(e).unit || "");
        }
        toString() {
          return [
            this.raws.before,
            String(this.value),
            this.unit,
            this.raws.after,
          ].join("");
        }
      };
    Pm.registerWalker(Pr);
    ku.exports = Pr;
  });
  var Tu = y((Bx, Su) => {
    "use strict";
    var Im = U(),
      qm = z(),
      Rr = class extends qm {
        constructor(e) {
          super(e), (this.type = "operator");
        }
      };
    Im.registerWalker(Rr);
    Su.exports = Rr;
  });
  var Cu = y((Ux, Ou) => {
    "use strict";
    var Lm = U(),
      Dm = z(),
      Ir = class extends Dm {
        constructor(e) {
          super(e), (this.type = "paren"), (this.parenType = "");
        }
      };
    Lm.registerWalker(Ir);
    Ou.exports = Ir;
  });
  var Nu = y((Fx, Au) => {
    "use strict";
    var Mm = U(),
      Bm = z(),
      qr = class extends Bm {
        constructor(e) {
          super(e), (this.type = "string");
        }
        toString() {
          let e = this.quoted ? this.raws.quote : "";
          return [
            this.raws.before,
            e,
            this.value + "",
            e,
            this.raws.after,
          ].join("");
        }
      };
    Mm.registerWalker(qr);
    Au.exports = qr;
  });
  var Ru = y(($x, Pu) => {
    "use strict";
    var Um = U(),
      Fm = z(),
      Lr = class extends Fm {
        constructor(e) {
          super(e), (this.type = "word");
        }
      };
    Um.registerWalker(Lr);
    Pu.exports = Lr;
  });
  var qu = y((Wx, Iu) => {
    "use strict";
    var $m = U(),
      Wm = z(),
      Dr = class extends Wm {
        constructor(e) {
          super(e), (this.type = "unicode-range");
        }
      };
    $m.registerWalker(Dr);
    Iu.exports = Dr;
  });
  var Du = y((Yx, Lu) => {
    "use strict";
    var Vs = class extends Error {
      constructor(e) {
        super(e),
          (this.name = this.constructor.name),
          (this.message = e || "An error ocurred while tokzenizing."),
          typeof Error.captureStackTrace == "function"
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error(e).stack);
      }
    };
    Lu.exports = Vs;
  });
  var Uu = y((zx, Bu) => {
    "use strict";
    var Mr = /[ \n\t\r\{\(\)'"\\;,/]/g,
      Ym = /[ \n\t\r\(\)\{\}\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g,
      De = /[ \n\t\r\(\)\{\}\*:;@!&'"\-\+\|~>,\[\]\\]|\//g,
      zm = /^[a-z0-9]/i,
      Vm = /^[a-f0-9?\-]/i,
      Mu = Du();
    Bu.exports = function (e, s) {
      s = s || {};
      let r = [],
        n = e.valueOf(),
        i = n.length,
        o = -1,
        a = 1,
        u = 0,
        c = 0,
        f = null,
        p,
        l,
        w,
        x,
        h,
        d,
        m,
        b,
        g,
        v,
        R,
        F;
      function H(T) {
        let O = `Unclosed ${T} at line: ${a}, column: ${u - o}, token: ${u}`;
        throw new Mu(O);
      }
      function $() {
        let T = `Syntax error at line: ${a}, column: ${u - o}, token: ${u}`;
        throw new Mu(T);
      }
      for (; u < i; ) {
        switch (((p = n.charCodeAt(u)), p === 10 && ((o = u), (a += 1)), p)) {
          case 10:
          case 32:
          case 9:
          case 13:
          case 12:
            l = u;
            do (l += 1), (p = n.charCodeAt(l)), p === 10 && ((o = l), (a += 1));
            while (p === 32 || p === 10 || p === 9 || p === 13 || p === 12);
            r.push(["space", n.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
            break;
          case 58:
            (l = u + 1),
              r.push(["colon", n.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
            break;
          case 44:
            (l = u + 1),
              r.push(["comma", n.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
            break;
          case 123:
            r.push(["{", "{", a, u - o, a, l - o, u]);
            break;
          case 125:
            r.push(["}", "}", a, u - o, a, l - o, u]);
            break;
          case 40:
            c++,
              (f =
                !f &&
                c === 1 &&
                r.length > 0 &&
                r[r.length - 1][0] === "word" &&
                r[r.length - 1][1] === "url"),
              r.push(["(", "(", a, u - o, a, l - o, u]);
            break;
          case 41:
            c--, (f = f && c > 0), r.push([")", ")", a, u - o, a, l - o, u]);
            break;
          case 39:
          case 34:
            (w = p === 39 ? "'" : '"'), (l = u);
            do
              for (
                v = !1,
                  l = n.indexOf(w, l + 1),
                  l === -1 && H("quote", w),
                  R = l;
                n.charCodeAt(R - 1) === 92;

              )
                (R -= 1), (v = !v);
            while (v);
            r.push(["string", n.slice(u, l + 1), a, u - o, a, l - o, u]),
              (u = l);
            break;
          case 64:
            (Mr.lastIndex = u + 1),
              Mr.test(n),
              Mr.lastIndex === 0 ? (l = n.length - 1) : (l = Mr.lastIndex - 2),
              r.push(["atword", n.slice(u, l + 1), a, u - o, a, l - o, u]),
              (u = l);
            break;
          case 92:
            (l = u),
              (p = n.charCodeAt(l + 1)),
              m &&
                p !== 47 &&
                p !== 32 &&
                p !== 10 &&
                p !== 9 &&
                p !== 13 &&
                p !== 12 &&
                (l += 1),
              r.push(["word", n.slice(u, l + 1), a, u - o, a, l - o, u]),
              (u = l);
            break;
          case 43:
          case 45:
          case 42:
            (l = u + 1), (F = n.slice(u + 1, l + 1));
            let T = n.slice(u - 1, u);
            if (p === 45 && F.charCodeAt(0) === 45) {
              l++,
                r.push(["word", n.slice(u, l), a, u - o, a, l - o, u]),
                (u = l - 1);
              break;
            }
            r.push(["operator", n.slice(u, l), a, u - o, a, l - o, u]),
              (u = l - 1);
            break;
          default:
            if (
              p === 47 &&
              (n.charCodeAt(u + 1) === 42 ||
                (s.loose && !f && n.charCodeAt(u + 1) === 47))
            ) {
              if (n.charCodeAt(u + 1) === 42)
                (l = n.indexOf("*/", u + 2) + 1), l === 0 && H("comment", "*/");
              else {
                let C = n.indexOf(
                  `
`,
                  u + 2,
                );
                l = C !== -1 ? C - 1 : i;
              }
              (d = n.slice(u, l + 1)),
                (x = d.split(`
`)),
                (h = x.length - 1),
                h > 0
                  ? ((b = a + h), (g = l - x[h].length))
                  : ((b = a), (g = o)),
                r.push(["comment", d, a, u - o, b, l - g, u]),
                (o = g),
                (a = b),
                (u = l);
            } else if (p === 35 && !zm.test(n.slice(u + 1, u + 2)))
              (l = u + 1),
                r.push(["#", n.slice(u, l), a, u - o, a, l - o, u]),
                (u = l - 1);
            else if ((p === 117 || p === 85) && n.charCodeAt(u + 1) === 43) {
              l = u + 2;
              do (l += 1), (p = n.charCodeAt(l));
              while (l < i && Vm.test(n.slice(l, l + 1)));
              r.push(["unicoderange", n.slice(u, l), a, u - o, a, l - o, u]),
                (u = l - 1);
            } else if (p === 47)
              (l = u + 1),
                r.push(["operator", n.slice(u, l), a, u - o, a, l - o, u]),
                (u = l - 1);
            else {
              let O = Ym;
              if (
                (p >= 48 && p <= 57 && (O = De),
                (O.lastIndex = u + 1),
                O.test(n),
                O.lastIndex === 0 ? (l = n.length - 1) : (l = O.lastIndex - 2),
                O === De || p === 46)
              ) {
                let C = n.charCodeAt(l),
                  me = n.charCodeAt(l + 1),
                  Qs = n.charCodeAt(l + 2);
                (C === 101 || C === 69) &&
                  (me === 45 || me === 43) &&
                  Qs >= 48 &&
                  Qs <= 57 &&
                  ((De.lastIndex = l + 2),
                  De.test(n),
                  De.lastIndex === 0
                    ? (l = n.length - 1)
                    : (l = De.lastIndex - 2));
              }
              r.push(["word", n.slice(u, l + 1), a, u - o, a, l - o, u]),
                (u = l);
            }
            break;
        }
        u++;
      }
      return r;
    };
  });
  var $u = y((Vx, Fu) => {
    "use strict";
    var Gs = class extends Error {
      constructor(e) {
        super(e),
          (this.name = this.constructor.name),
          (this.message = e || "An error ocurred while parsing."),
          typeof Error.captureStackTrace == "function"
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error(e).stack);
      }
    };
    Fu.exports = Gs;
  });
  var Vu = y((jx, zu) => {
    "use strict";
    var Gm = uu(),
      jm = cu(),
      Hm = hu(),
      Km = mu(),
      Qm = wu(),
      Jm = vu(),
      Xm = _u(),
      Zm = Eu(),
      ey = Tu(),
      Wu = Cu(),
      ty = Nu(),
      Yu = Ru(),
      ry = qu(),
      sy = Uu(),
      ny = qs(),
      iy = Ls(),
      oy = Ds(),
      ay = $u();
    function uy(t) {
      return t.sort((e, s) => e - s);
    }
    zu.exports = class {
      constructor(e, s) {
        let r = { loose: !1 };
        (this.cache = []),
          (this.input = e),
          (this.options = Object.assign({}, r, s)),
          (this.position = 0),
          (this.unbalanced = 0),
          (this.root = new Gm());
        let n = new jm();
        this.root.append(n),
          (this.current = n),
          (this.tokens = sy(e, this.options));
      }
      parse() {
        return this.loop();
      }
      colon() {
        let e = this.currToken;
        this.newNode(
          new Km({
            value: e[1],
            source: {
              start: { line: e[2], column: e[3] },
              end: { line: e[4], column: e[5] },
            },
            sourceIndex: e[6],
          }),
        ),
          this.position++;
      }
      comma() {
        let e = this.currToken;
        this.newNode(
          new Qm({
            value: e[1],
            source: {
              start: { line: e[2], column: e[3] },
              end: { line: e[4], column: e[5] },
            },
            sourceIndex: e[6],
          }),
        ),
          this.position++;
      }
      comment() {
        let e = !1,
          s = this.currToken[1].replace(/\/\*|\*\//g, ""),
          r;
        this.options.loose &&
          s.startsWith("//") &&
          ((s = s.substring(2)), (e = !0)),
          (r = new Jm({
            value: s,
            inline: e,
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[4], column: this.currToken[5] },
            },
            sourceIndex: this.currToken[6],
          })),
          this.newNode(r),
          this.position++;
      }
      error(e, s) {
        throw new ay(e + ` at line: ${s[2]}, column ${s[3]}`);
      }
      loop() {
        for (; this.position < this.tokens.length; ) this.parseTokens();
        return (
          !this.current.last && this.spaces
            ? (this.current.raws.before += this.spaces)
            : this.spaces && (this.current.last.raws.after += this.spaces),
          (this.spaces = ""),
          this.root
        );
      }
      operator() {
        let e = this.currToken[1],
          s;
        if (e === "+" || e === "-") {
          if (
            (this.options.loose ||
              (this.position > 0 &&
                (this.current.type === "func" && this.current.value === "calc"
                  ? this.prevToken[0] !== "space" && this.prevToken[0] !== "("
                    ? this.error("Syntax Error", this.currToken)
                    : this.nextToken[0] !== "space" &&
                        this.nextToken[0] !== "word"
                      ? this.error("Syntax Error", this.currToken)
                      : this.nextToken[0] === "word" &&
                        this.current.last.type !== "operator" &&
                        this.current.last.value !== "(" &&
                        this.error("Syntax Error", this.currToken)
                  : (this.nextToken[0] === "space" ||
                      this.nextToken[0] === "operator" ||
                      this.prevToken[0] === "operator") &&
                    this.error("Syntax Error", this.currToken))),
            this.options.loose)
          ) {
            if (
              (!this.current.nodes.length ||
                (this.current.last && this.current.last.type === "operator")) &&
              this.nextToken[0] === "word"
            )
              return this.word();
          } else if (this.nextToken[0] === "word") return this.word();
        }
        return (
          (s = new ey({
            value: this.currToken[1],
            source: {
              start: { line: this.currToken[2], column: this.currToken[3] },
              end: { line: this.currToken[2], column: this.currToken[3] },
            },
            sourceIndex: this.currToken[4],
          })),
          this.position++,
          this.newNode(s)
        );
      }
      parseTokens() {
        switch (this.currToken[0]) {
          case "space":
            this.space();
            break;
          case "colon":
            this.colon();
            break;
          case "comma":
            this.comma();
            break;
          case "comment":
            this.comment();
            break;
          case "(":
            this.parenOpen();
            break;
          case ")":
            this.parenClose();
            break;
          case "atword":
          case "word":
            this.word();
            break;
          case "operator":
            this.operator();
            break;
          case "string":
            this.string();
            break;
          case "unicoderange":
            this.unicodeRange();
            break;
          default:
            this.word();
            break;
        }
      }
      parenOpen() {
        let e = 1,
          s = this.position + 1,
          r = this.currToken,
          n;
        for (; s < this.tokens.length && e; ) {
          let i = this.tokens[s];
          i[0] === "(" && e++, i[0] === ")" && e--, s++;
        }
        if (
          (e && this.error("Expected closing parenthesis", r),
          (n = this.current.last),
          n &&
            n.type === "func" &&
            n.unbalanced < 0 &&
            ((n.unbalanced = 0), (this.current = n)),
          this.current.unbalanced++,
          this.newNode(
            new Wu({
              value: r[1],
              source: {
                start: { line: r[2], column: r[3] },
                end: { line: r[4], column: r[5] },
              },
              sourceIndex: r[6],
            }),
          ),
          this.position++,
          this.current.type === "func" &&
            this.current.unbalanced &&
            this.current.value === "url" &&
            this.currToken[0] !== "string" &&
            this.currToken[0] !== ")" &&
            !this.options.loose)
        ) {
          let i = this.nextToken,
            o = this.currToken[1],
            a = { line: this.currToken[2], column: this.currToken[3] };
          for (; i && i[0] !== ")" && this.current.unbalanced; )
            this.position++, (o += this.currToken[1]), (i = this.nextToken);
          this.position !== this.tokens.length - 1 &&
            (this.position++,
            this.newNode(
              new Yu({
                value: o,
                source: {
                  start: a,
                  end: { line: this.currToken[4], column: this.currToken[5] },
                },
                sourceIndex: this.currToken[6],
              }),
            ));
        }
      }
      parenClose() {
        let e = this.currToken;
        this.newNode(
          new Wu({
            value: e[1],
            source: {
              start: { line: e[2], column: e[3] },
              end: { line: e[4], column: e[5] },
            },
            sourceIndex: e[6],
          }),
        ),
          this.position++,
          !(
            this.position >= this.tokens.length - 1 && !this.current.unbalanced
          ) &&
            (this.current.unbalanced--,
            this.current.unbalanced < 0 &&
              this.error("Expected opening parenthesis", e),
            !this.current.unbalanced &&
              this.cache.length &&
              (this.current = this.cache.pop()));
      }
      space() {
        let e = this.currToken;
        this.position === this.tokens.length - 1 ||
        this.nextToken[0] === "," ||
        this.nextToken[0] === ")"
          ? ((this.current.last.raws.after += e[1]), this.position++)
          : ((this.spaces = e[1]), this.position++);
      }
      unicodeRange() {
        let e = this.currToken;
        this.newNode(
          new ry({
            value: e[1],
            source: {
              start: { line: e[2], column: e[3] },
              end: { line: e[4], column: e[5] },
            },
            sourceIndex: e[6],
          }),
        ),
          this.position++;
      }
      splitWord() {
        let e = this.nextToken,
          s = this.currToken[1],
          r = /^[\+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][\+\-]?\d+)?/,
          n = /^(?!\#([a-z0-9]+))[\#\{\}]/gi,
          i,
          o;
        if (!n.test(s))
          for (; e && e[0] === "word"; ) {
            this.position++;
            let a = this.currToken[1];
            (s += a), (e = this.nextToken);
          }
        (i = iy(s, "@")),
          (o = uy(oy(ny([[0], i])))),
          o.forEach((a, u) => {
            let c = o[u + 1] || s.length,
              f = s.slice(a, c),
              p;
            if (~i.indexOf(a))
              p = new Hm({
                value: f.slice(1),
                source: {
                  start: {
                    line: this.currToken[2],
                    column: this.currToken[3] + a,
                  },
                  end: {
                    line: this.currToken[4],
                    column: this.currToken[3] + (c - 1),
                  },
                },
                sourceIndex: this.currToken[6] + o[u],
              });
            else if (r.test(this.currToken[1])) {
              let l = f.replace(r, "");
              p = new Zm({
                value: f.replace(l, ""),
                source: {
                  start: {
                    line: this.currToken[2],
                    column: this.currToken[3] + a,
                  },
                  end: {
                    line: this.currToken[4],
                    column: this.currToken[3] + (c - 1),
                  },
                },
                sourceIndex: this.currToken[6] + o[u],
                unit: l,
              });
            } else
              (p = new (e && e[0] === "(" ? Xm : Yu)({
                value: f,
                source: {
                  start: {
                    line: this.currToken[2],
                    column: this.currToken[3] + a,
                  },
                  end: {
                    line: this.currToken[4],
                    column: this.currToken[3] + (c - 1),
                  },
                },
                sourceIndex: this.currToken[6] + o[u],
              })),
                p.type === "word"
                  ? ((p.isHex = /^#(.+)/.test(f)),
                    (p.isColor =
                      /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
                        f,
                      )))
                  : this.cache.push(this.current);
            this.newNode(p);
          }),
          this.position++;
      }
      string() {
        let e = this.currToken,
          s = this.currToken[1],
          r = /^(\"|\')/,
          n = r.test(s),
          i = "",
          o;
        n && ((i = s.match(r)[0]), (s = s.slice(1, s.length - 1))),
          (o = new ty({
            value: s,
            source: {
              start: { line: e[2], column: e[3] },
              end: { line: e[4], column: e[5] },
            },
            sourceIndex: e[6],
            quoted: n,
          })),
          (o.raws.quote = i),
          this.newNode(o),
          this.position++;
      }
      word() {
        return this.splitWord();
      }
      newNode(e) {
        return (
          this.spaces && ((e.raws.before += this.spaces), (this.spaces = "")),
          this.current.append(e)
        );
      }
      get currToken() {
        return this.tokens[this.position];
      }
      get nextToken() {
        return this.tokens[this.position + 1];
      }
      get prevToken() {
        return this.tokens[this.position - 1];
      }
    };
  });
  var Sy = {};
  Js(Sy, {
    languages: () => pi,
    options: () => di,
    parsers: () => Ks,
    printers: () => Ey,
  });
  var hl = (t, e, s, r) => {
      if (!(t && e == null))
        return e.replaceAll
          ? e.replaceAll(s, r)
          : s.global
            ? e.replace(s, r)
            : e.split(s).join(r);
    },
    _ = hl;
  var Me = "string",
    Be = "array",
    Ue = "cursor",
    we = "indent",
    ge = "align",
    Fe = "trim",
    ve = "group",
    xe = "fill",
    oe = "if-break",
    $e = "indent-if-break",
    We = "line-suffix",
    Ye = "line-suffix-boundary",
    K = "line",
    ze = "label",
    be = "break-parent",
    _t = new Set([Ue, we, ge, Fe, ve, xe, oe, $e, We, Ye, K, ze, be]);
  function dl(t) {
    if (typeof t == "string") return Me;
    if (Array.isArray(t)) return Be;
    if (!t) return;
    let { type: e } = t;
    if (_t.has(e)) return e;
  }
  var Ve = dl;
  var ml = (t) =>
    new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
  function yl(t) {
    let e = t === null ? "null" : typeof t;
    if (e !== "string" && e !== "object")
      return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
    if (Ve(t)) throw new Error("doc is valid.");
    let s = Object.prototype.toString.call(t);
    if (s !== "[object Object]") return `Unexpected doc '${s}'.`;
    let r = ml([..._t].map((n) => `'${n}'`));
    return `Unexpected doc.type '${t.type}'.
Expected it to be ${r}.`;
  }
  var Fr = class extends Error {
      name = "InvalidDocError";
      constructor(e) {
        super(yl(e)), (this.doc = e);
      }
    },
    $r = Fr;
  var Zs = () => {},
    ae = Zs,
    kt = Zs;
  function q(t) {
    return ae(t), { type: we, contents: t };
  }
  function en(t, e) {
    return ae(e), { type: ge, contents: e, n: t };
  }
  function L(t, e = {}) {
    return (
      ae(t),
      kt(e.expandedStates, !0),
      {
        type: ve,
        id: e.id,
        contents: t,
        break: !!e.shouldBreak,
        expandedStates: e.expandedStates,
      }
    );
  }
  function tn(t) {
    return en({ type: "root" }, t);
  }
  function ue(t) {
    return en(-1, t);
  }
  function Ge(t) {
    return kt(t), { type: xe, parts: t };
  }
  function Et(t, e = "", s = {}) {
    return (
      ae(t),
      e !== "" && ae(e),
      { type: oe, breakContents: t, flatContents: e, groupId: s.groupId }
    );
  }
  var je = { type: be };
  var wl = { type: K, hard: !0 };
  var A = { type: K },
    M = { type: K, soft: !0 },
    E = [wl, je];
  function V(t, e) {
    ae(t), kt(e);
    let s = [];
    for (let r = 0; r < e.length; r++) r !== 0 && s.push(t), s.push(e[r]);
    return s;
  }
  var gl = (t, e, s) => {
      if (!(t && e == null))
        return Array.isArray(e) || typeof e == "string"
          ? e[s < 0 ? e.length + s : s]
          : e.at(s);
    },
    G = gl;
  function vl(t, e) {
    if (typeof t == "string") return e(t);
    let s = new Map();
    return r(t);
    function r(i) {
      if (s.has(i)) return s.get(i);
      let o = n(i);
      return s.set(i, o), o;
    }
    function n(i) {
      switch (Ve(i)) {
        case Be:
          return e(i.map(r));
        case xe:
          return e({ ...i, parts: i.parts.map(r) });
        case oe:
          return e({
            ...i,
            breakContents: r(i.breakContents),
            flatContents: r(i.flatContents),
          });
        case ve: {
          let { expandedStates: o, contents: a } = i;
          return (
            o ? ((o = o.map(r)), (a = o[0])) : (a = r(a)),
            e({ ...i, contents: a, expandedStates: o })
          );
        }
        case ge:
        case we:
        case $e:
        case ze:
        case We:
          return e({ ...i, contents: r(i.contents) });
        case Me:
        case Ue:
        case Fe:
        case Ye:
        case K:
        case be:
          return e(i);
        default:
          throw new $r(i);
      }
    }
  }
  function xl(t) {
    return t.type === K && !t.hard
      ? t.soft
        ? ""
        : " "
      : t.type === oe
        ? t.flatContents
        : t;
  }
  function rn(t) {
    return vl(t, xl);
  }
  function bl(t) {
    return Array.isArray(t) && t.length > 0;
  }
  var ee = bl;
  var St = "'",
    sn = '"';
  function _l(t, e) {
    let s = e === !0 || e === St ? St : sn,
      r = s === St ? sn : St,
      n = 0,
      i = 0;
    for (let o of t) o === s ? n++ : o === r && i++;
    return n > i ? r : s;
  }
  var nn = _l;
  function kl(t, e, s) {
    let r = e === '"' ? "'" : '"',
      i = _(!1, t, /\\(.)|(["'])/gsu, (o, a, u) =>
        a === r
          ? a
          : u === e
            ? "\\" + u
            : u ||
              (s && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(a)
                ? a
                : "\\" + a),
      );
    return e + i + e;
  }
  var on = kl;
  function El(t, e) {
    let s = t.slice(1, -1),
      r =
        e.parser === "json" ||
        e.parser === "jsonc" ||
        (e.parser === "json5" && e.quoteProps === "preserve" && !e.singleQuote)
          ? '"'
          : e.__isInHtmlAttribute
            ? "'"
            : nn(s, e.singleQuote);
    return on(
      s,
      r,
      !(
        e.parser === "css" ||
        e.parser === "less" ||
        e.parser === "scss" ||
        e.__embeddedInHtml
      ),
    );
  }
  var Tt = El;
  var Wr = class extends Error {
      name = "UnexpectedNodeError";
      constructor(e, s, r = "type") {
        super(`Unexpected ${s} node ${r}: ${JSON.stringify(e[r])}.`),
          (this.node = e);
      }
    },
    an = Wr;
  function Sl(t) {
    return (t == null ? void 0 : t.type) === "front-matter";
  }
  var _e = Sl;
  var Tl = new Set([
    "raw",
    "raws",
    "sourceIndex",
    "source",
    "before",
    "after",
    "trailingComma",
    "spaces",
  ]);
  function un(t, e, s) {
    if (
      (_e(t) && t.language === "yaml" && delete e.value,
      t.type === "css-comment" &&
        s.type === "css-root" &&
        s.nodes.length > 0 &&
        (((s.nodes[0] === t || (_e(s.nodes[0]) && s.nodes[1] === t)) &&
          (delete e.text, /^\*\s*@(?:format|prettier)\s*$/u.test(t.text))) ||
          (s.type === "css-root" && G(!1, s.nodes, -1) === t)))
    )
      return null;
    if (
      (t.type === "value-root" && delete e.text,
      (t.type === "media-query" ||
        t.type === "media-query-list" ||
        t.type === "media-feature-expression") &&
        delete e.value,
      t.type === "css-rule" && delete e.params,
      (t.type === "media-feature" ||
        t.type === "media-keyword" ||
        t.type === "media-type" ||
        t.type === "media-unknown" ||
        t.type === "media-url" ||
        t.type === "media-value" ||
        t.type === "selector-attribute" ||
        t.type === "selector-string" ||
        t.type === "selector-class" ||
        t.type === "selector-combinator" ||
        t.type === "value-string") &&
        t.value &&
        (e.value = Ol(t.value)),
      t.type === "selector-combinator" &&
        (e.value = _(!1, e.value, /\s+/gu, " ")),
      t.type === "media-feature" && (e.value = _(!1, e.value, " ", "")),
      ((t.type === "value-word" &&
        ((t.isColor && t.isHex) ||
          ["initial", "inherit", "unset", "revert"].includes(
            t.value.toLowerCase(),
          ))) ||
        t.type === "media-feature" ||
        t.type === "selector-root-invalid" ||
        t.type === "selector-pseudo") &&
        (e.value = e.value.toLowerCase()),
      t.type === "css-decl" && (e.prop = t.prop.toLowerCase()),
      (t.type === "css-atrule" || t.type === "css-import") &&
        (e.name = t.name.toLowerCase()),
      t.type === "value-number" && (e.unit = t.unit.toLowerCase()),
      t.type === "value-unknown" && (e.value = _(!1, e.value, /;$/gu, "")),
      t.type === "selector-attribute" &&
        ((e.attribute = t.attribute.trim()),
        t.namespace &&
          typeof t.namespace == "string" &&
          (e.namespace = t.namespace.trim() || !0),
        t.value &&
          ((e.value = _(!1, e.value.trim(), /^["']|["']$/gu, "")),
          delete e.quoted)),
      (t.type === "media-value" ||
        t.type === "media-type" ||
        t.type === "value-number" ||
        t.type === "selector-root-invalid" ||
        t.type === "selector-class" ||
        t.type === "selector-combinator" ||
        t.type === "selector-tag") &&
        t.value &&
        (e.value = _(!1, e.value, /([\d+.e-]+)([a-z]*)/giu, (r, n, i) => {
          let o = Number(n);
          return Number.isNaN(o) ? r : o + i.toLowerCase();
        })),
      t.type === "selector-tag")
    ) {
      let r = e.value.toLowerCase();
      ["from", "to"].includes(r) && (e.value = r);
    }
    if (
      (t.type === "css-atrule" &&
        t.name.toLowerCase() === "supports" &&
        delete e.value,
      t.type === "selector-unknown" && delete e.value,
      t.type === "value-comma_group")
    ) {
      let r = t.groups.findIndex(
        (n) => n.type === "value-number" && n.unit === "...",
      );
      r !== -1 &&
        ((e.groups[r].unit = ""),
        e.groups.splice(r + 1, 0, {
          type: "value-word",
          value: "...",
          isColor: !1,
          isHex: !1,
        }));
    }
    if (
      t.type === "value-comma_group" &&
      t.groups.some(
        (r) =>
          (r.type === "value-atword" && r.value.endsWith("[")) ||
          (r.type === "value-word" && r.value.startsWith("]")),
      )
    )
      return {
        type: "value-atword",
        value: t.groups.map((r) => r.value).join(""),
        group: {
          open: null,
          close: null,
          groups: [],
          type: "value-paren_group",
        },
      };
  }
  un.ignoredProperties = Tl;
  function Ol(t) {
    return _(!1, _(!1, t, "'", '"'), /\\([^\da-f])/giu, "$1");
  }
  var ln = un;
  async function Cl(t, e) {
    if (t.language === "yaml") {
      let s = t.value.trim(),
        r = s ? await e(s, { parser: "yaml" }) : "";
      return tn([
        t.startDelimiter,
        t.explicitLanguage,
        E,
        r,
        r ? E : "",
        t.endDelimiter,
      ]);
    }
  }
  var cn = Cl;
  function fn(t) {
    let { node: e } = t;
    if (e.type === "front-matter")
      return async (s) => {
        let r = await cn(e, s);
        return r ? [r, E] : void 0;
      };
  }
  fn.getVisitorKeys = (t) => (t.type === "css-root" ? ["frontMatter"] : []);
  var pn = fn;
  var He = null;
  function Ke(t) {
    if (He !== null && typeof He.property) {
      let e = He;
      return (He = Ke.prototype = null), e;
    }
    return (He = Ke.prototype = t ?? Object.create(null)), new Ke();
  }
  var Al = 10;
  for (let t = 0; t <= Al; t++) Ke();
  function Yr(t) {
    return Ke(t);
  }
  function Nl(t, e = "type") {
    Yr(t);
    function s(r) {
      let n = r[e],
        i = t[n];
      if (!Array.isArray(i))
        throw Object.assign(new Error(`Missing visitor keys for '${n}'.`), {
          node: r,
        });
      return i;
    }
    return s;
  }
  var hn = Nl;
  var Pl = {
      "front-matter": [],
      "css-root": ["frontMatter", "nodes"],
      "css-comment": [],
      "css-rule": ["selector", "nodes"],
      "css-decl": ["value", "selector", "nodes"],
      "css-atrule": ["selector", "params", "value", "nodes"],
      "media-query-list": ["nodes"],
      "media-query": ["nodes"],
      "media-type": [],
      "media-feature-expression": ["nodes"],
      "media-feature": [],
      "media-colon": [],
      "media-value": [],
      "media-keyword": [],
      "media-url": [],
      "media-unknown": [],
      "selector-root": ["nodes"],
      "selector-selector": ["nodes"],
      "selector-comment": [],
      "selector-string": [],
      "selector-tag": [],
      "selector-id": [],
      "selector-class": [],
      "selector-attribute": [],
      "selector-combinator": ["nodes"],
      "selector-universal": [],
      "selector-pseudo": ["nodes"],
      "selector-nesting": [],
      "selector-unknown": [],
      "value-value": ["group"],
      "value-root": ["group"],
      "value-comment": [],
      "value-comma_group": ["groups"],
      "value-paren_group": ["open", "groups", "close"],
      "value-func": ["group"],
      "value-paren": [],
      "value-number": [],
      "value-operator": [],
      "value-word": [],
      "value-colon": [],
      "value-comma": [],
      "value-string": [],
      "value-atword": [],
      "value-unicode-range": [],
      "value-unknown": [],
    },
    dn = Pl;
  var Rl = hn(dn),
    mn = Rl;
  function Il(t, e) {
    let s = 0;
    for (let r = 0; r < t.line - 1; ++r)
      s =
        e.indexOf(
          `
`,
          s,
        ) + 1;
    return s + t.column;
  }
  var zr = Il;
  function Ot(t) {
    return (e, s, r) => {
      let n = !!(r != null && r.backwards);
      if (s === !1) return !1;
      let { length: i } = e,
        o = s;
      for (; o >= 0 && o < i; ) {
        let a = e.charAt(o);
        if (t instanceof RegExp) {
          if (!t.test(a)) return o;
        } else if (!t.includes(a)) return o;
        n ? o-- : o++;
      }
      return o === -1 || o === i ? o : !1;
    };
  }
  var Tw = Ot(/\s/u),
    Ct = Ot(" 	"),
    yn = Ot(",; 	"),
    At = Ot(/[^\n\r]/u);
  function wn(t, e) {
    var s, r, n;
    if (
      typeof ((r = (s = t.source) == null ? void 0 : s.start) == null
        ? void 0
        : r.offset) == "number"
    )
      return t.source.start.offset;
    if (typeof t.sourceIndex == "number") return t.sourceIndex;
    if ((n = t.source) != null && n.start) return zr(t.source.start, e);
    throw Object.assign(new Error("Can not locate node."), { node: t });
  }
  function Vr(t, e) {
    var s, r;
    if (t.type === "css-comment" && t.inline)
      return At(e, t.source.startOffset);
    if (
      typeof ((r = (s = t.source) == null ? void 0 : s.end) == null
        ? void 0
        : r.offset) == "number"
    )
      return t.source.end.offset;
    if (t.source) {
      if (t.source.end) return zr(t.source.end, e);
      if (ee(t.nodes)) return Vr(G(!1, t.nodes, -1), e);
    }
    return null;
  }
  function Gr(t, e) {
    t.source &&
      ((t.source.startOffset = wn(t, e)), (t.source.endOffset = Vr(t, e)));
    for (let s in t) {
      let r = t[s];
      s === "source" ||
        !r ||
        typeof r != "object" ||
        (r.type === "value-root" || r.type === "value-unknown"
          ? gn(r, ql(t), r.text || r.value)
          : Gr(r, e));
    }
  }
  function gn(t, e, s) {
    t.source &&
      ((t.source.startOffset = wn(t, s) + e),
      (t.source.endOffset = Vr(t, s) + e));
    for (let r in t) {
      let n = t[r];
      r === "source" || !n || typeof n != "object" || gn(n, e, s);
    }
  }
  function ql(t) {
    var s;
    let e = t.source.startOffset;
    return (
      typeof t.prop == "string" && (e += t.prop.length),
      t.type === "css-atrule" &&
        typeof t.name == "string" &&
        (e +=
          1 + t.name.length + t.raws.afterName.match(/^\s*:?\s*/u)[0].length),
      t.type !== "css-atrule" &&
        typeof ((s = t.raws) == null ? void 0 : s.between) == "string" &&
        (e += t.raws.between.length),
      e
    );
  }
  function vn(t) {
    let e = "initial",
      s = "initial",
      r,
      n = !1,
      i = [];
    for (let o = 0; o < t.length; o++) {
      let a = t[o];
      switch (e) {
        case "initial":
          if (a === "'") {
            e = "single-quotes";
            continue;
          }
          if (a === '"') {
            e = "double-quotes";
            continue;
          }
          if (
            (a === "u" || a === "U") &&
            t.slice(o, o + 4).toLowerCase() === "url("
          ) {
            (e = "url"), (o += 3);
            continue;
          }
          if (a === "*" && t[o - 1] === "/") {
            e = "comment-block";
            continue;
          }
          if (a === "/" && t[o - 1] === "/") {
            (e = "comment-inline"), (r = o - 1);
            continue;
          }
          continue;
        case "single-quotes":
          if (
            (a === "'" && t[o - 1] !== "\\" && ((e = s), (s = "initial")),
            a ===
              `
` || a === "\r")
          )
            return t;
          continue;
        case "double-quotes":
          if (
            (a === '"' && t[o - 1] !== "\\" && ((e = s), (s = "initial")),
            a ===
              `
` || a === "\r")
          )
            return t;
          continue;
        case "url":
          if (
            (a === ")" && (e = "initial"),
            a ===
              `
` || a === "\r")
          )
            return t;
          if (a === "'") {
            (e = "single-quotes"), (s = "url");
            continue;
          }
          if (a === '"') {
            (e = "double-quotes"), (s = "url");
            continue;
          }
          continue;
        case "comment-block":
          a === "/" && t[o - 1] === "*" && (e = "initial");
          continue;
        case "comment-inline":
          (a === '"' || a === "'" || a === "*") && (n = !0),
            (a ===
              `
` ||
              a === "\r") &&
              (n && i.push([r, o]), (e = "initial"), (n = !1));
          continue;
      }
    }
    for (let [o, a] of i)
      t = t.slice(0, o) + _(!1, t.slice(o, a), /["'*]/gu, " ") + t.slice(a);
    return t;
  }
  function N(t) {
    var e;
    return (e = t.source) == null ? void 0 : e.startOffset;
  }
  function P(t) {
    var e;
    return (e = t.source) == null ? void 0 : e.endOffset;
  }
  var Ll = /\*\/$/,
    Dl = /^\/\*\*?/,
    kn = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/,
    Ml = /(^|\s+)\/\/([^\n\r]*)/g,
    xn = /^(\r?\n)+/,
    Bl =
      /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g,
    bn = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g,
    Ul = /(\r?\n|^) *\* ?/g,
    En = [];
  function Sn(t) {
    let e = t.match(kn);
    return e ? e[0].trimStart() : "";
  }
  function Tn(t) {
    let e = t.match(kn),
      s = e == null ? void 0 : e[0];
    return s == null ? t : t.slice(s.length);
  }
  function On(t) {
    let e = `
`;
    t = _(!1, t.replace(Dl, "").replace(Ll, ""), Ul, "$1");
    let s = "";
    for (; s !== t; ) (s = t), (t = _(!1, t, Bl, `${e}$1 $2${e}`));
    t = t.replace(xn, "").trimEnd();
    let r = Object.create(null),
      n = _(!1, t, bn, "").replace(xn, "").trimEnd(),
      i;
    for (; (i = bn.exec(t)); ) {
      let o = _(!1, i[2], Ml, "");
      if (typeof r[i[1]] == "string" || Array.isArray(r[i[1]])) {
        let a = r[i[1]];
        r[i[1]] = [...En, ...(Array.isArray(a) ? a : [a]), o];
      } else r[i[1]] = o;
    }
    return { comments: n, pragmas: r };
  }
  function Cn({ comments: t = "", pragmas: e = {} }) {
    let s = `
`,
      r = "/**",
      n = " *",
      i = " */",
      o = Object.keys(e),
      a = o
        .flatMap((c) => _n(c, e[c]))
        .map((c) => `${n} ${c}${s}`)
        .join("");
    if (!t) {
      if (o.length === 0) return "";
      if (o.length === 1 && !Array.isArray(e[o[0]])) {
        let c = e[o[0]];
        return `${r} ${_n(o[0], c)[0]}${i}`;
      }
    }
    let u =
      t
        .split(s)
        .map((c) => `${n} ${c}`)
        .join(s) + s;
    return r + s + (t ? u : "") + (t && o.length > 0 ? n + s : "") + a + i;
  }
  function _n(t, e) {
    return [...En, ...(Array.isArray(e) ? e : [e])].map((s) =>
      `@${t} ${s}`.trim(),
    );
  }
  function Fl(t) {
    if (!t.startsWith("#!")) return "";
    let e = t.indexOf(`
`);
    return e === -1 ? t : t.slice(0, e);
  }
  var An = Fl;
  function Nn(t) {
    let e = An(t);
    e && (t = t.slice(e.length + 1));
    let s = Sn(t),
      { pragmas: r, comments: n } = On(s);
    return { shebang: e, text: t, pragmas: r, comments: n };
  }
  function Pn(t) {
    let { pragmas: e } = Nn(t);
    return (
      Object.prototype.hasOwnProperty.call(e, "prettier") ||
      Object.prototype.hasOwnProperty.call(e, "format")
    );
  }
  function Rn(t) {
    let { shebang: e, text: s, pragmas: r, comments: n } = Nn(t),
      i = Tn(s),
      o = Cn({ pragmas: { format: "", ...r }, comments: n.trimStart() });
    return (
      (e
        ? `${e}
`
        : "") +
      o +
      (i.startsWith(`
`)
        ? `
`
        : `

`) +
      i
    );
  }
  var Qe = 3;
  function $l(t) {
    let e = t.slice(0, Qe);
    if (e !== "---" && e !== "+++") return;
    let s = t.indexOf(
      `
`,
      Qe,
    );
    if (s === -1) return;
    let r = t.slice(Qe, s).trim(),
      n = t.indexOf(
        `
${e}`,
        s,
      ),
      i = r;
    if (
      (i || (i = e === "+++" ? "toml" : "yaml"),
      n === -1 &&
        e === "---" &&
        i === "yaml" &&
        (n = t.indexOf(
          `
...`,
          s,
        )),
      n === -1)
    )
      return;
    let o = n + 1 + Qe,
      a = t.charAt(o + 1);
    if (!/\s?/u.test(a)) return;
    let u = t.slice(0, o);
    return {
      type: "front-matter",
      language: i,
      explicitLanguage: r,
      value: t.slice(s + 1, n),
      startDelimiter: e,
      endDelimiter: u.slice(-Qe),
      raw: u,
    };
  }
  function Wl(t) {
    let e = $l(t);
    if (!e) return { content: t };
    let { raw: s } = e;
    return {
      frontMatter: e,
      content: _(!1, s, /[^\n]/gu, " ") + t.slice(s.length),
    };
  }
  var Je = Wl;
  function In(t) {
    return Pn(Je(t).content);
  }
  function qn(t) {
    let { frontMatter: e, content: s } = Je(t);
    return (
      (e
        ? e.raw +
          `

`
        : "") + Rn(s)
    );
  }
  var Yl = new Set([
    "red",
    "green",
    "blue",
    "alpha",
    "a",
    "rgb",
    "hue",
    "h",
    "saturation",
    "s",
    "lightness",
    "l",
    "whiteness",
    "w",
    "blackness",
    "b",
    "tint",
    "shade",
    "blend",
    "blenda",
    "contrast",
    "hsl",
    "hsla",
    "hwb",
    "hwba",
  ]);
  function Ln(t) {
    var e, s;
    return (s =
      (e = t.findAncestor((r) => r.type === "css-decl")) == null
        ? void 0
        : e.prop) == null
      ? void 0
      : s.toLowerCase();
  }
  var zl = new Set(["initial", "inherit", "unset", "revert"]);
  function Dn(t) {
    return zl.has(t.toLowerCase());
  }
  function Mn(t, e) {
    var r;
    let s = t.findAncestor((n) => n.type === "css-atrule");
    return (
      ((r = s == null ? void 0 : s.name) == null
        ? void 0
        : r.toLowerCase().endsWith("keyframes")) &&
      ["from", "to"].includes(e.toLowerCase())
    );
  }
  function te(t) {
    return t.includes("$") ||
      t.includes("@") ||
      t.includes("#") ||
      t.startsWith("%") ||
      t.startsWith("--") ||
      t.startsWith(":--") ||
      (t.includes("(") && t.includes(")"))
      ? t
      : t.toLowerCase();
  }
  function ke(t, e) {
    var r;
    let s = t.findAncestor((n) => n.type === "value-func");
    return (
      ((r = s == null ? void 0 : s.value) == null
        ? void 0
        : r.toLowerCase()) === e
    );
  }
  function Bn(t) {
    var r;
    let e = t.findAncestor((n) => n.type === "css-rule"),
      s = (r = e == null ? void 0 : e.raws) == null ? void 0 : r.selector;
    return s && (s.startsWith(":import") || s.startsWith(":export"));
  }
  function Ee(t, e) {
    let s = Array.isArray(e) ? e : [e],
      r = t.findAncestor((n) => n.type === "css-atrule");
    return r && s.includes(r.name.toLowerCase());
  }
  function Un(t) {
    var s;
    let { node: e } = t;
    return (
      e.groups[0].value === "url" &&
      e.groups.length === 2 &&
      ((s = t.findAncestor((r) => r.type === "css-atrule")) == null
        ? void 0
        : s.name) === "import"
    );
  }
  function Fn(t) {
    return t.type === "value-func" && t.value.toLowerCase() === "url";
  }
  function $n(t) {
    return t.type === "value-func" && t.value.toLowerCase() === "var";
  }
  function Wn(t) {
    let { selector: e } = t;
    return e
      ? (typeof e == "string" && /^@.+:.*$/u.test(e)) ||
          (e.value && /^@.+:.*$/u.test(e.value))
      : !1;
  }
  function Yn(t) {
    return (
      t.type === "value-word" && ["from", "through", "end"].includes(t.value)
    );
  }
  function zn(t) {
    return t.type === "value-word" && ["and", "or", "not"].includes(t.value);
  }
  function Vn(t) {
    return t.type === "value-word" && t.value === "in";
  }
  function Nt(t) {
    return t.type === "value-operator" && t.value === "*";
  }
  function Xe(t) {
    return t.type === "value-operator" && t.value === "/";
  }
  function Q(t) {
    return t.type === "value-operator" && t.value === "+";
  }
  function le(t) {
    return t.type === "value-operator" && t.value === "-";
  }
  function Vl(t) {
    return t.type === "value-operator" && t.value === "%";
  }
  function Pt(t) {
    return Nt(t) || Xe(t) || Q(t) || le(t) || Vl(t);
  }
  function Gn(t) {
    return t.type === "value-word" && ["==", "!="].includes(t.value);
  }
  function jn(t) {
    return t.type === "value-word" && ["<", ">", "<=", ">="].includes(t.value);
  }
  function Ze(t, e) {
    return (
      e.parser === "scss" &&
      t.type === "css-atrule" &&
      ["if", "else", "for", "each", "while"].includes(t.name)
    );
  }
  function Hr(t) {
    var e;
    return (
      ((e = t.raws) == null ? void 0 : e.params) &&
      /^\(\s*\)$/u.test(t.raws.params)
    );
  }
  function Rt(t) {
    return t.name.startsWith("prettier-placeholder");
  }
  function Hn(t) {
    return t.prop.startsWith("@prettier-placeholder");
  }
  function Kn(t, e) {
    return (
      t.value === "$$" &&
      t.type === "value-func" &&
      (e == null ? void 0 : e.type) === "value-word" &&
      !e.raws.before
    );
  }
  function Qn(t) {
    var e, s;
    return (
      ((e = t.value) == null ? void 0 : e.type) === "value-root" &&
      ((s = t.value.group) == null ? void 0 : s.type) === "value-value" &&
      t.prop.toLowerCase() === "composes"
    );
  }
  function Jn(t) {
    var e, s, r;
    return (
      ((r =
        (s = (e = t.value) == null ? void 0 : e.group) == null
          ? void 0
          : s.group) == null
        ? void 0
        : r.type) === "value-paren_group" &&
      t.value.group.group.open !== null &&
      t.value.group.group.close !== null
    );
  }
  function ce(t) {
    var e;
    return ((e = t.raws) == null ? void 0 : e.before) === "";
  }
  function It(t) {
    var e, s;
    return (
      t.type === "value-comma_group" &&
      ((s = (e = t.groups) == null ? void 0 : e[1]) == null
        ? void 0
        : s.type) === "value-colon"
    );
  }
  function jr(t) {
    var e;
    return (
      t.type === "value-paren_group" &&
      ((e = t.groups) == null ? void 0 : e[0]) &&
      It(t.groups[0])
    );
  }
  function Kr(t, e) {
    var i;
    if (e.parser !== "scss") return !1;
    let { node: s } = t;
    if (s.groups.length === 0) return !1;
    let r = t.grandparent;
    if (!jr(s) && !(r && jr(r))) return !1;
    let n = t.findAncestor((o) => o.type === "css-decl");
    return !!(
      ((i = n == null ? void 0 : n.prop) != null && i.startsWith("$")) ||
      jr(r) ||
      r.type === "value-func"
    );
  }
  function Qr(t) {
    return t.type === "value-comment" && t.inline;
  }
  function qt(t) {
    return t.type === "value-word" && t.value === "#";
  }
  function Jr(t) {
    return t.type === "value-word" && t.value === "{";
  }
  function Lt(t) {
    return t.type === "value-word" && t.value === "}";
  }
  function et(t) {
    return ["value-word", "value-atword"].includes(t.type);
  }
  function Dt(t) {
    return (t == null ? void 0 : t.type) === "value-colon";
  }
  function Xn(t, e) {
    if (!It(e)) return !1;
    let { groups: s } = e,
      r = s.indexOf(t);
    return r === -1 ? !1 : Dt(s[r + 1]);
  }
  function Zn(t) {
    return t.value && ["not", "and", "or"].includes(t.value.toLowerCase());
  }
  function ei(t) {
    return t.type !== "value-func" ? !1 : Yl.has(t.value.toLowerCase());
  }
  function Se(t) {
    return /\/\//u.test(t.split(/[\n\r]/u).pop());
  }
  function tt(t) {
    return (
      (t == null ? void 0 : t.type) === "value-atword" &&
      t.value.startsWith("prettier-placeholder-")
    );
  }
  function ti(t, e) {
    var s, r;
    if (
      ((s = t.open) == null ? void 0 : s.value) !== "(" ||
      ((r = t.close) == null ? void 0 : r.value) !== ")" ||
      t.groups.some((n) => n.type !== "value-comma_group")
    )
      return !1;
    if (e.type === "value-comma_group") {
      let n = e.groups.indexOf(t) - 1,
        i = e.groups[n];
      if ((i == null ? void 0 : i.type) === "value-word" && i.value === "with")
        return !0;
    }
    return !1;
  }
  function rt(t) {
    var e, s;
    return (
      t.type === "value-paren_group" &&
      ((e = t.open) == null ? void 0 : e.value) === "(" &&
      ((s = t.close) == null ? void 0 : s.value) === ")"
    );
  }
  function Gl(t, e, s) {
    var d;
    let { node: r } = t,
      n = t.parent,
      i = t.grandparent,
      o = Ln(t),
      a =
        o &&
        n.type === "value-value" &&
        (o === "grid" || o.startsWith("grid-template")),
      u = t.findAncestor((m) => m.type === "css-atrule"),
      c = u && Ze(u, e),
      f = r.groups.some((m) => Qr(m)),
      p = t.map(s, "groups"),
      l = [],
      w = ke(t, "url"),
      x = !1,
      h = !1;
    for (let m = 0; m < r.groups.length; ++m) {
      l.push(p[m]);
      let b = r.groups[m - 1],
        g = r.groups[m],
        v = r.groups[m + 1],
        R = r.groups[m + 2];
      if (w) {
        ((v && Q(v)) || Q(g)) && l.push(" ");
        continue;
      }
      if (
        (Ee(t, "forward") &&
          g.type === "value-word" &&
          g.value &&
          b !== void 0 &&
          b.type === "value-word" &&
          b.value === "as" &&
          v.type === "value-operator" &&
          v.value === "*") ||
        !v ||
        (g.type === "value-word" && g.value.endsWith("-") && tt(v))
      )
        continue;
      if (g.type === "value-string" && g.quoted) {
        let C = g.value.lastIndexOf("#{"),
          me = g.value.lastIndexOf("}");
        C !== -1 && me !== -1
          ? (x = C > me)
          : C !== -1
            ? (x = !0)
            : me !== -1 && (x = !1);
      }
      if (
        x ||
        Dt(g) ||
        Dt(v) ||
        (g.type === "value-atword" &&
          (g.value === "" || g.value.endsWith("["))) ||
        (v.type === "value-word" && v.value.startsWith("]")) ||
        g.value === "~" ||
        (g.type !== "value-string" &&
          g.value &&
          g.value.includes("\\") &&
          v &&
          v.type !== "value-comment") ||
        (b != null &&
          b.value &&
          b.value.indexOf("\\") === b.value.length - 1 &&
          g.type === "value-operator" &&
          g.value === "/") ||
        g.value === "\\" ||
        Kn(g, v) ||
        qt(g) ||
        Jr(g) ||
        Lt(v) ||
        (Jr(v) && ce(v)) ||
        (Lt(g) && ce(v)) ||
        (g.value === "--" && qt(v))
      )
        continue;
      let F = Pt(g),
        H = Pt(v);
      if (
        (((F && qt(v)) || (H && Lt(g))) && ce(v)) ||
        (!b && Xe(g)) ||
        (ke(t, "calc") && (Q(g) || Q(v) || le(g) || le(v)) && ce(v))
      )
        continue;
      let $ =
          (Q(g) || le(g)) &&
          m === 0 &&
          (v.type === "value-number" || v.isHex) &&
          i &&
          ei(i) &&
          !ce(v),
        T =
          (R == null ? void 0 : R.type) === "value-func" ||
          (R && et(R)) ||
          g.type === "value-func" ||
          et(g),
        O =
          v.type === "value-func" ||
          et(v) ||
          (b == null ? void 0 : b.type) === "value-func" ||
          (b && et(b));
      if (
        e.parser === "scss" &&
        F &&
        g.value === "-" &&
        v.type === "value-func" &&
        P(g) !== N(v)
      ) {
        l.push(" ");
        continue;
      }
      if (
        !(
          !(Nt(v) || Nt(g)) &&
          !ke(t, "calc") &&
          !$ &&
          ((Xe(v) && !T) ||
            (Xe(g) && !O) ||
            (Q(v) && !T) ||
            (Q(g) && !O) ||
            le(v) ||
            le(g)) &&
          (ce(v) || (F && (!b || (b && Pt(b)))))
        ) &&
        !(
          (e.parser === "scss" || e.parser === "less") &&
          F &&
          g.value === "-" &&
          rt(v) &&
          P(g) === N(v.open) &&
          v.open.value === "("
        )
      ) {
        if (Qr(g)) {
          if (n.type === "value-paren_group") {
            l.push(ue(E));
            continue;
          }
          l.push(E);
          continue;
        }
        if (c && (Gn(v) || jn(v) || zn(v) || Vn(g) || Yn(g))) {
          l.push(" ");
          continue;
        }
        if (u && u.name.toLowerCase() === "namespace") {
          l.push(" ");
          continue;
        }
        if (a) {
          g.source && v.source && g.source.start.line !== v.source.start.line
            ? (l.push(E), (h = !0))
            : l.push(" ");
          continue;
        }
        if (H) {
          l.push(" ");
          continue;
        }
        if (
          (v == null ? void 0 : v.value) !== "..." &&
          !(tt(g) && tt(v) && P(g) === N(v))
        ) {
          if (tt(g) && rt(v) && P(g) === N(v.open)) {
            l.push(M);
            continue;
          }
          if (g.value === "with" && rt(v)) {
            l.push(" ");
            continue;
          }
          ((d = g.value) != null &&
            d.endsWith("#") &&
            v.value === "{" &&
            rt(v.group)) ||
            l.push(A);
        }
      }
    }
    return (
      f && l.push(je),
      h && l.unshift(E),
      c ? L(q(l)) : Un(t) ? L(Ge(l)) : L(q(Ge(l)))
    );
  }
  var ri = Gl;
  function jl(t) {
    return t.length === 1
      ? t
      : t
          .toLowerCase()
          .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/u, "$1$2")
          .replace(/^([+-]?[\d.]+)e[+-]?0+$/u, "$1")
          .replace(/^([+-])?\./u, "$10.")
          .replace(/(\.\d+?)0+(?=e|$)/u, "$1")
          .replace(/\.(?=e|$)/u, "");
  }
  var si = jl;
  var Xr = new Map([
    ["em", "em"],
    ["rem", "rem"],
    ["ex", "ex"],
    ["rex", "rex"],
    ["cap", "cap"],
    ["rcap", "rcap"],
    ["ch", "ch"],
    ["rch", "rch"],
    ["ic", "ic"],
    ["ric", "ric"],
    ["lh", "lh"],
    ["rlh", "rlh"],
    ["vw", "vw"],
    ["svw", "svw"],
    ["lvw", "lvw"],
    ["dvw", "dvw"],
    ["vh", "vh"],
    ["svh", "svh"],
    ["lvh", "lvh"],
    ["dvh", "dvh"],
    ["vi", "vi"],
    ["svi", "svi"],
    ["lvi", "lvi"],
    ["dvi", "dvi"],
    ["vb", "vb"],
    ["svb", "svb"],
    ["lvb", "lvb"],
    ["dvb", "dvb"],
    ["vmin", "vmin"],
    ["svmin", "svmin"],
    ["lvmin", "lvmin"],
    ["dvmin", "dvmin"],
    ["vmax", "vmax"],
    ["svmax", "svmax"],
    ["lvmax", "lvmax"],
    ["dvmax", "dvmax"],
    ["cm", "cm"],
    ["mm", "mm"],
    ["q", "Q"],
    ["in", "in"],
    ["pt", "pt"],
    ["pc", "pc"],
    ["px", "px"],
    ["deg", "deg"],
    ["grad", "grad"],
    ["rad", "rad"],
    ["turn", "turn"],
    ["s", "s"],
    ["ms", "ms"],
    ["hz", "Hz"],
    ["khz", "kHz"],
    ["dpi", "dpi"],
    ["dpcm", "dpcm"],
    ["dppx", "dppx"],
    ["x", "x"],
    ["cqw", "cqw"],
    ["cqh", "cqh"],
    ["cqi", "cqi"],
    ["cqb", "cqb"],
    ["cqmin", "cqmin"],
    ["cqmax", "cqmax"],
  ]);
  function ni(t) {
    let e = t.toLowerCase();
    return Xr.has(e) ? Xr.get(e) : t;
  }
  var ii = /(["'])(?:(?!\1)[^\\]|\\.)*\1/gsu,
    Hl = /(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/giu,
    Kl = /[a-z]+/giu,
    Ql = /[$@]?[_a-z\u0080-\uFFFF][\w\u0080-\uFFFF-]*/giu,
    Jl = new RegExp(
      ii.source + `|(${Ql.source})?(${Hl.source})(${Kl.source})?`,
      "giu",
    );
  function W(t, e) {
    return _(!1, t, ii, (s) => Tt(s, e));
  }
  function oi(t, e) {
    let s = e.singleQuote ? "'" : '"';
    return t.includes('"') || t.includes("'") ? t : s + t + s;
  }
  function fe(t) {
    return _(!1, t, Jl, (e, s, r, n, i) => (!r && n ? Zr(n) + te(i || "") : e));
  }
  function Zr(t) {
    return si(t).replace(/\.0(?=$|e)/u, "");
  }
  function ai(t) {
    return t.trailingComma === "es5" || t.trailingComma === "all";
  }
  function Xl(t, e, s) {
    let r = !!(s != null && s.backwards);
    if (e === !1) return !1;
    let n = t.charAt(e);
    if (r) {
      if (
        t.charAt(e - 1) === "\r" &&
        n ===
          `
`
      )
        return e - 2;
      if (
        n ===
          `
` ||
        n === "\r" ||
        n === "\u2028" ||
        n === "\u2029"
      )
        return e - 1;
    } else {
      if (
        n === "\r" &&
        t.charAt(e + 1) ===
          `
`
      )
        return e + 2;
      if (
        n ===
          `
` ||
        n === "\r" ||
        n === "\u2028" ||
        n === "\u2029"
      )
        return e + 1;
    }
    return e;
  }
  var Mt = Xl;
  function Zl(t, e, s = {}) {
    let r = Ct(t, s.backwards ? e - 1 : e, s),
      n = Mt(t, r, s);
    return r !== n;
  }
  var Bt = Zl;
  function ec(t, e) {
    if (e === !1) return !1;
    if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
      for (let s = e + 2; s < t.length; ++s)
        if (t.charAt(s) === "*" && t.charAt(s + 1) === "/") return s + 2;
    }
    return e;
  }
  var ui = ec;
  function tc(t, e) {
    return e === !1
      ? !1
      : t.charAt(e) === "/" && t.charAt(e + 1) === "/"
        ? At(t, e)
        : e;
  }
  var li = tc;
  function rc(t, e) {
    let s = null,
      r = e;
    for (; r !== s; ) (s = r), (r = yn(t, r)), (r = ui(t, r)), (r = Ct(t, r));
    return (r = li(t, r)), (r = Mt(t, r)), r !== !1 && Bt(t, r);
  }
  var Ut = rc;
  function sc({ node: t, parent: e }, s) {
    return !!(
      t.source && s.originalText.slice(N(t), N(e.close)).trimEnd().endsWith(",")
    );
  }
  function nc(t, e) {
    return $n(t.grandparent) && sc(t, e)
      ? ","
      : t.node.type !== "value-comment" &&
          !(
            t.node.type === "value-comma_group" &&
            t.node.groups.every((s) => s.type === "value-comment")
          ) &&
          ai(e) &&
          t.callParent(() => Kr(t, e))
        ? Et(",")
        : "";
  }
  function ci(t, e, s) {
    let { node: r, parent: n } = t,
      i = t.map(({ node: w }) => (typeof w == "string" ? w : s()), "groups");
    if (
      n &&
      Fn(n) &&
      (r.groups.length === 1 ||
        (r.groups.length > 0 &&
          r.groups[0].type === "value-comma_group" &&
          r.groups[0].groups.length > 0 &&
          r.groups[0].groups[0].type === "value-word" &&
          r.groups[0].groups[0].value.startsWith("data:")))
    )
      return [r.open ? s("open") : "", V(",", i), r.close ? s("close") : ""];
    if (!r.open) {
      let w = es(t),
        x = V([",", w ? E : A], i);
      return q(w ? [E, x] : L(Ge(x)));
    }
    let o = t.map(({ node: w, isLast: x, index: h }) => {
        var b;
        let d = i[h];
        if (
          It(w) &&
          w.type === "value-comma_group" &&
          w.groups &&
          w.groups[0].type !== "value-paren_group" &&
          ((b = w.groups[2]) == null ? void 0 : b.type) === "value-paren_group"
        ) {
          let { parts: g } = d.contents.contents;
          (g[1] = L(g[1])), (d = L(ue(d)));
        }
        let m = [d, x ? nc(t, e) : ","];
        if (!x && w.type === "value-comma_group" && ee(w.groups)) {
          let g = G(!1, w.groups, -1);
          !g.source && g.close && (g = g.close),
            g.source && Ut(e.originalText, P(g)) && m.push(E);
        }
        return m;
      }, "groups"),
      a = Xn(r, n),
      u = ti(r, n),
      c = Kr(t, e),
      f = u || (c && !a),
      p = u || a,
      l = L(
        [
          r.open ? s("open") : "",
          q([M, V(A, o)]),
          M,
          r.close ? s("close") : "",
        ],
        { shouldBreak: f },
      );
    return p ? ue(l) : l;
  }
  function es(t) {
    return t.match(
      (e) =>
        e.type === "value-paren_group" &&
        !e.open &&
        e.groups.some((s) => s.type === "value-comma_group"),
      (e, s) => s === "group" && e.type === "value-value",
      (e, s) => s === "group" && e.type === "value-root",
      (e, s) =>
        s === "value" &&
        ((e.type === "css-decl" && !e.prop.startsWith("--")) ||
          (e.type === "css-atrule" && e.variable)),
    );
  }
  function ic(t, e, s) {
    let r = [];
    return (
      t.each(() => {
        let { node: n, previous: i } = t;
        if (
          ((i == null ? void 0 : i.type) === "css-comment" &&
          i.text.trim() === "prettier-ignore"
            ? r.push(e.originalText.slice(N(n), P(n)))
            : r.push(s()),
          t.isLast)
        )
          return;
        let { next: o } = t;
        (o.type === "css-comment" &&
          !Bt(e.originalText, N(o), { backwards: !0 }) &&
          !_e(n)) ||
        (o.type === "css-atrule" &&
          o.name === "else" &&
          n.type !== "css-comment")
          ? r.push(" ")
          : (r.push(e.__isHTMLStyleAttribute ? A : E),
            Ut(e.originalText, P(n)) && !_e(n) && r.push(E));
      }, "nodes"),
      r
    );
  }
  var Te = ic;
  function oc(t, e, s) {
    var n, i, o, a, u, c;
    let { node: r } = t;
    switch (r.type) {
      case "front-matter":
        return [r.raw, E];
      case "css-root": {
        let f = Te(t, e, s),
          p = r.raws.after.trim();
        return (
          p.startsWith(";") && (p = p.slice(1).trim()),
          [
            r.frontMatter ? [s("frontMatter"), E] : "",
            f,
            p ? ` ${p}` : "",
            r.nodes.length > 0 ? E : "",
          ]
        );
      }
      case "css-comment": {
        let f = r.inline || r.raws.inline,
          p = e.originalText.slice(N(r), P(r));
        return f ? p.trimEnd() : p;
      }
      case "css-rule":
        return [
          s("selector"),
          r.important ? " !important" : "",
          r.nodes
            ? [
                ((n = r.selector) == null ? void 0 : n.type) ===
                  "selector-unknown" && Se(r.selector.value)
                  ? A
                  : r.selector
                    ? " "
                    : "",
                "{",
                r.nodes.length > 0 ? q([E, Te(t, e, s)]) : "",
                E,
                "}",
                Wn(r) ? ";" : "",
              ]
            : ";",
        ];
      case "css-decl": {
        let f = t.parent,
          { between: p } = r.raws,
          l = p.trim(),
          w = l === ":",
          x = typeof r.value == "string" && /^ *$/u.test(r.value),
          h = typeof r.value == "string" ? r.value : s("value");
        return (
          (h = Qn(r) ? rn(h) : h),
          !w &&
            Se(l) &&
            !(
              (o = (i = r.value) == null ? void 0 : i.group) != null &&
              o.group &&
              t.call(() => es(t), "value", "group", "group")
            ) &&
            (h = q([E, ue(h)])),
          [
            _(!1, r.raws.before, /[\s;]/gu, ""),
            (f.type === "css-atrule" && f.variable) || Bn(t)
              ? r.prop
              : te(r.prop),
            l.startsWith("//") ? " " : "",
            l,
            r.extend || x ? "" : " ",
            e.parser === "less" && r.extend && r.selector
              ? ["extend(", s("selector"), ")"]
              : "",
            h,
            r.raws.important
              ? r.raws.important.replace(/\s*!\s*important/iu, " !important")
              : r.important
                ? " !important"
                : "",
            r.raws.scssDefault
              ? r.raws.scssDefault.replace(/\s*!default/iu, " !default")
              : r.scssDefault
                ? " !default"
                : "",
            r.raws.scssGlobal
              ? r.raws.scssGlobal.replace(/\s*!global/iu, " !global")
              : r.scssGlobal
                ? " !global"
                : "",
            r.nodes
              ? [" {", q([M, Te(t, e, s)]), M, "}"]
              : Hn(r) && !f.raws.semicolon && e.originalText[P(r) - 1] !== ";"
                ? ""
                : e.__isHTMLStyleAttribute && t.isLast
                  ? Et(";")
                  : ";",
          ]
        );
      }
      case "css-atrule": {
        let f = t.parent,
          p = Rt(r) && !f.raws.semicolon && e.originalText[P(r) - 1] !== ";";
        if (e.parser === "less") {
          if (r.mixin)
            return [
              s("selector"),
              r.important ? " !important" : "",
              p ? "" : ";",
            ];
          if (r.function)
            return [
              r.name,
              typeof r.params == "string" ? r.params : s("params"),
              p ? "" : ";",
            ];
          if (r.variable)
            return [
              "@",
              r.name,
              ": ",
              r.value ? s("value") : "",
              r.raws.between.trim() ? r.raws.between.trim() + " " : "",
              r.nodes
                ? ["{", q([r.nodes.length > 0 ? M : "", Te(t, e, s)]), M, "}"]
                : "",
              p ? "" : ";",
            ];
        }
        let l =
          r.name === "import" &&
          ((a = r.params) == null ? void 0 : a.type) === "value-unknown" &&
          r.params.value.endsWith(";");
        return [
          "@",
          Hr(r) || r.name.endsWith(":") || Rt(r) ? r.name : te(r.name),
          r.params
            ? [
                Hr(r)
                  ? ""
                  : Rt(r)
                    ? r.raws.afterName === ""
                      ? ""
                      : r.name.endsWith(":")
                        ? " "
                        : /^\s*\n\s*\n/u.test(r.raws.afterName)
                          ? [E, E]
                          : /^\s*\n/u.test(r.raws.afterName)
                            ? E
                            : " "
                    : " ",
                typeof r.params == "string" ? r.params : s("params"),
              ]
            : "",
          r.selector ? q([" ", s("selector")]) : "",
          r.value
            ? L([" ", s("value"), Ze(r, e) ? (Jn(r) ? " " : A) : ""])
            : r.name === "else"
              ? " "
              : "",
          r.nodes
            ? [
                Ze(r, e)
                  ? ""
                  : (r.selector &&
                        !r.selector.nodes &&
                        typeof r.selector.value == "string" &&
                        Se(r.selector.value)) ||
                      (!r.selector &&
                        typeof r.params == "string" &&
                        Se(r.params))
                    ? A
                    : " ",
                "{",
                q([r.nodes.length > 0 ? M : "", Te(t, e, s)]),
                M,
                "}",
              ]
            : p || l
              ? ""
              : ";",
        ];
      }
      case "media-query-list": {
        let f = [];
        return (
          t.each(({ node: p }) => {
            (p.type === "media-query" && p.value === "") || f.push(s());
          }, "nodes"),
          L(q(V(A, f)))
        );
      }
      case "media-query":
        return [V(" ", t.map(s, "nodes")), t.isLast ? "" : ","];
      case "media-type":
        return fe(W(r.value, e));
      case "media-feature-expression":
        return r.nodes ? ["(", ...t.map(s, "nodes"), ")"] : r.value;
      case "media-feature":
        return te(W(_(!1, r.value, / +/gu, " "), e));
      case "media-colon":
        return [r.value, " "];
      case "media-value":
        return fe(W(r.value, e));
      case "media-keyword":
        return W(r.value, e);
      case "media-url":
        return W(
          _(!1, _(!1, r.value, /^url\(\s+/giu, "url("), /\s+\)$/gu, ")"),
          e,
        );
      case "media-unknown":
        return r.value;
      case "selector-root":
        return L([
          Ee(t, "custom-selector")
            ? [t.findAncestor((f) => f.type === "css-atrule").customSelector, A]
            : "",
          V(
            [",", Ee(t, ["extend", "custom-selector", "nest"]) ? A : E],
            t.map(s, "nodes"),
          ),
        ]);
      case "selector-selector":
        return L(q(t.map(s, "nodes")));
      case "selector-comment":
        return r.value;
      case "selector-string":
        return W(r.value, e);
      case "selector-tag":
        return [
          r.namespace
            ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"]
            : "",
          ((u = t.previous) == null ? void 0 : u.type) === "selector-nesting"
            ? r.value
            : fe(Mn(t, r.value) ? r.value.toLowerCase() : r.value),
        ];
      case "selector-id":
        return ["#", r.value];
      case "selector-class":
        return [".", fe(W(r.value, e))];
      case "selector-attribute":
        return [
          "[",
          r.namespace
            ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"]
            : "",
          r.attribute.trim(),
          r.operator ?? "",
          r.value ? oi(W(r.value.trim(), e), e) : "",
          r.insensitive ? " i" : "",
          "]",
        ];
      case "selector-combinator": {
        if (
          r.value === "+" ||
          r.value === ">" ||
          r.value === "~" ||
          r.value === ">>>"
        ) {
          let l = t.parent;
          return [
            l.type === "selector-selector" && l.nodes[0] === r ? "" : A,
            r.value,
            t.isLast ? "" : " ",
          ];
        }
        let f = r.value.trim().startsWith("(") ? A : "",
          p = fe(W(r.value.trim(), e)) || A;
        return [f, p];
      }
      case "selector-universal":
        return [
          r.namespace
            ? [r.namespace === !0 ? "" : r.namespace.trim(), "|"]
            : "",
          r.value,
        ];
      case "selector-pseudo":
        return [
          te(r.value),
          ee(r.nodes)
            ? L(["(", q([M, V([",", A], t.map(s, "nodes"))]), M, ")"])
            : "",
        ];
      case "selector-nesting":
        return r.value;
      case "selector-unknown": {
        let f = t.findAncestor((w) => w.type === "css-rule");
        if (f != null && f.isSCSSNesterProperty) return fe(W(te(r.value), e));
        let p = t.parent;
        if ((c = p.raws) != null && c.selector) {
          let w = N(p),
            x = w + p.raws.selector.length;
          return e.originalText.slice(w, x).trim();
        }
        let l = t.grandparent;
        if (
          p.type === "value-paren_group" &&
          (l == null ? void 0 : l.type) === "value-func" &&
          l.value === "selector"
        ) {
          let w = P(p.open) + 1,
            x = N(p.close),
            h = e.originalText.slice(w, x).trim();
          return Se(h) ? [je, h] : h;
        }
        return r.value;
      }
      case "value-value":
      case "value-root":
        return s("group");
      case "value-comment":
        return e.originalText.slice(N(r), P(r));
      case "value-comma_group":
        return ri(t, e, s);
      case "value-paren_group":
        return ci(t, e, s);
      case "value-func":
        return [r.value, Ee(t, "supports") && Zn(r) ? " " : "", s("group")];
      case "value-paren":
        return r.value;
      case "value-number":
        return [Zr(r.value), ni(r.unit)];
      case "value-operator":
        return r.value;
      case "value-word":
        return (r.isColor && r.isHex) || Dn(r.value)
          ? r.value.toLowerCase()
          : r.value;
      case "value-colon": {
        let { previous: f } = t;
        return [
          r.value,
          (typeof (f == null ? void 0 : f.value) == "string" &&
            f.value.endsWith("\\")) ||
          ke(t, "url")
            ? ""
            : A,
        ];
      }
      case "value-string":
        return Tt(r.raws.quote + r.value + r.raws.quote, e);
      case "value-atword":
        return ["@", r.value];
      case "value-unicode-range":
        return r.value;
      case "value-unknown":
        return r.value;
      case "value-comma":
      default:
        throw new an(r, "PostCSS");
    }
  }
  var ac = {
      print: oc,
      embed: pn,
      insertPragma: qn,
      massageAstNode: ln,
      getVisitorKeys: mn,
    },
    fi = ac;
  var pi = [
    {
      linguistLanguageId: 50,
      name: "CSS",
      type: "markup",
      tmScope: "source.css",
      aceMode: "css",
      codemirrorMode: "css",
      codemirrorMimeType: "text/css",
      color: "#563d7c",
      extensions: [".css", ".wxss"],
      parsers: ["css"],
      vscodeLanguageIds: ["css"],
    },
    {
      linguistLanguageId: 262764437,
      name: "PostCSS",
      type: "markup",
      color: "#dc3a0c",
      tmScope: "source.postcss",
      group: "CSS",
      extensions: [".pcss", ".postcss"],
      aceMode: "text",
      parsers: ["css"],
      vscodeLanguageIds: ["postcss"],
    },
    {
      linguistLanguageId: 198,
      name: "Less",
      type: "markup",
      color: "#1d365d",
      aliases: ["less-css"],
      extensions: [".less"],
      tmScope: "source.css.less",
      aceMode: "less",
      codemirrorMode: "css",
      codemirrorMimeType: "text/css",
      parsers: ["less"],
      vscodeLanguageIds: ["less"],
    },
    {
      linguistLanguageId: 329,
      name: "SCSS",
      type: "markup",
      color: "#c6538c",
      tmScope: "source.css.scss",
      aceMode: "scss",
      codemirrorMode: "css",
      codemirrorMimeType: "text/x-scss",
      extensions: [".scss"],
      parsers: ["scss"],
      vscodeLanguageIds: ["scss"],
    },
  ];
  var hi = {
    bracketSpacing: {
      category: "Common",
      type: "boolean",
      default: !0,
      description: "Print spaces between brackets.",
      oppositeDescription: "Do not print spaces between brackets.",
    },
    singleQuote: {
      category: "Common",
      type: "boolean",
      default: !1,
      description: "Use single quotes instead of double quotes.",
    },
    proseWrap: {
      category: "Common",
      type: "choice",
      default: "preserve",
      description: "How to wrap prose.",
      choices: [
        {
          value: "always",
          description: "Wrap prose if it exceeds the print width.",
        },
        { value: "never", description: "Do not wrap prose." },
        { value: "preserve", description: "Wrap prose as-is." },
      ],
    },
    bracketSameLine: {
      category: "Common",
      type: "boolean",
      default: !1,
      description:
        "Put > of opening tags on the last line instead of on a new line.",
    },
    singleAttributePerLine: {
      category: "Common",
      type: "boolean",
      default: !1,
      description: "Enforce single attribute per line in HTML, Vue and JSX.",
    },
  };
  var uc = { singleQuote: hi.singleQuote },
    di = uc;
  var Ks = {};
  Js(Ks, { css: () => by, less: () => _y, scss: () => ky });
  var el = ye(pt(), 1),
    tl = ye(bo(), 1),
    rl = ye(ta(), 1);
  function Hf(t, e) {
    let s = new SyntaxError(
      t + " (" + e.loc.start.line + ":" + e.loc.start.column + ")",
    );
    return Object.assign(s, e);
  }
  var ra = Hf;
  var la = ye(ua(), 1);
  function J(t, e, s) {
    if (t && typeof t == "object") {
      delete t.parent;
      for (let r in t)
        J(t[r], e, s),
          r === "type" &&
            typeof t[r] == "string" &&
            !t[r].startsWith(e) &&
            (!s || !s.test(t[r])) &&
            (t[r] = e + t[r]);
    }
    return t;
  }
  function Is(t) {
    if (t && typeof t == "object") {
      delete t.parent;
      for (let e in t) Is(t[e]);
      !Array.isArray(t) && t.value && !t.type && (t.type = "unknown");
    }
    return t;
  }
  var op = la.default.default;
  function ap(t) {
    let e;
    try {
      e = op(t);
    } catch {
      return { type: "selector-unknown", value: t };
    }
    return J(Is(e), "media-");
  }
  var ca = ap;
  var nu = ye(su(), 1);
  function bm(t) {
    if (/\/\/|\/\*/u.test(t))
      return { type: "selector-unknown", value: t.trim() };
    let e;
    try {
      new nu.default((s) => {
        e = s;
      }).process(t);
    } catch {
      return { type: "selector-unknown", value: t };
    }
    return J(e, "selector-");
  }
  var Z = bm;
  var Qu = ye(Vu(), 1);
  var ly = (t) => {
      for (; t.parent; ) t = t.parent;
      return t;
    },
    Br = ly;
  function cy(t) {
    return Br(t)
      .text.slice(t.group.open.sourceIndex + 1, t.group.close.sourceIndex)
      .trim();
  }
  var Gu = cy;
  function fy(t) {
    if (ee(t)) {
      for (let e = t.length - 1; e > 0; e--)
        if (
          t[e].type === "word" &&
          t[e].value === "{" &&
          t[e - 1].type === "word" &&
          t[e - 1].value.endsWith("#")
        )
          return !0;
    }
    return !1;
  }
  var ju = fy;
  function py(t) {
    return t.some(
      (e) =>
        e.type === "string" || (e.type === "func" && !e.value.endsWith("\\")),
    );
  }
  var Hu = py;
  function hy(t, e) {
    return !!(
      e.parser === "scss" &&
      (t == null ? void 0 : t.type) === "word" &&
      t.value.startsWith("$")
    );
  }
  var Ku = hy;
  function dy(t, e) {
    var u;
    let { nodes: s } = t,
      r = { open: null, close: null, groups: [], type: "paren_group" },
      n = [r],
      i = r,
      o = { groups: [], type: "comma_group" },
      a = [o];
    for (let c = 0; c < s.length; ++c) {
      let f = s[c];
      if (
        (e.parser === "scss" &&
          f.type === "number" &&
          f.unit === ".." &&
          f.value.endsWith(".") &&
          ((f.value = f.value.slice(0, -1)), (f.unit = "...")),
        f.type === "func" &&
          f.value === "selector" &&
          (f.group.groups = [
            Z(
              Br(t).text.slice(
                f.group.open.sourceIndex + 1,
                f.group.close.sourceIndex,
              ),
            ),
          ]),
        f.type === "func" && f.value === "url")
      ) {
        let p = ((u = f.group) == null ? void 0 : u.groups) ?? [],
          l = [];
        for (let w = 0; w < p.length; w++) {
          let x = p[w];
          x.type === "comma_group" ? (l = [...l, ...x.groups]) : l.push(x);
        }
        (ju(l) || (!Hu(l) && !Ku(l[0], e))) && (f.group.groups = [Gu(f)]);
      }
      if (f.type === "paren" && f.value === "(")
        (r = { open: f, close: null, groups: [], type: "paren_group" }),
          n.push(r),
          (o = { groups: [], type: "comma_group" }),
          a.push(o);
      else if (f.type === "paren" && f.value === ")") {
        if (
          (o.groups.length > 0 && r.groups.push(o),
          (r.close = f),
          a.length === 1)
        )
          throw new Error("Unbalanced parenthesis");
        a.pop(),
          (o = G(!1, a, -1)),
          o.groups.push(r),
          n.pop(),
          (r = G(!1, n, -1));
      } else
        f.type === "comma"
          ? (r.groups.push(o),
            (o = { groups: [], type: "comma_group" }),
            (a[a.length - 1] = o))
          : o.groups.push(f);
    }
    return o.groups.length > 0 && r.groups.push(o), i;
  }
  function Ur(t) {
    return (t.type === "paren_group" &&
      !t.open &&
      !t.close &&
      t.groups.length === 1) ||
      (t.type === "comma_group" && t.groups.length === 1)
      ? Ur(t.groups[0])
      : t.type === "paren_group" || t.type === "comma_group"
        ? { ...t, groups: t.groups.map(Ur) }
        : t;
  }
  function Ju(t, e) {
    if (t && typeof t == "object")
      for (let s in t)
        s !== "parent" &&
          (Ju(t[s], e),
          s === "nodes" && ((t.group = Ur(dy(t, e))), delete t[s]));
    return t;
  }
  function my(t, e) {
    if (e.parser === "less" && t.startsWith("~`"))
      return { type: "value-unknown", value: t };
    let s = null;
    try {
      s = new Qu.default(t, { loose: !0 }).parse();
    } catch {
      return { type: "value-unknown", value: t };
    }
    s.text = t;
    let r = Ju(s, e);
    return J(r, "value-", /^selector-/u);
  }
  var ie = my;
  var yy = new Set(["import", "use", "forward"]);
  function wy(t) {
    return yy.has(t);
  }
  var Xu = wy;
  function gy(t, e) {
    return e.parser !== "scss" || !t.selector
      ? !1
      : t.selector
          .replace(/\/\*.*?\*\//u, "")
          .replace(/\/\/.*\n/u, "")
          .trim()
          .endsWith(":");
  }
  var Zu = gy;
  var vy = /(\s*)(!default).*$/u,
    xy = /(\s*)(!global).*$/u;
  function sl(t, e) {
    var s, r;
    if (t && typeof t == "object") {
      delete t.parent;
      for (let a in t) sl(t[a], e);
      if (!t.type) return t;
      if (
        (t.raws ?? (t.raws = {}),
        t.type === "css-decl" &&
          typeof t.prop == "string" &&
          t.prop.startsWith("--") &&
          typeof t.value == "string" &&
          t.value.startsWith("{"))
      ) {
        let a;
        if (t.value.trimEnd().endsWith("}")) {
          let u = e.originalText.slice(0, t.source.start.offset),
            c =
              "a".repeat(t.prop.length) +
              e.originalText.slice(
                t.source.start.offset + t.prop.length,
                t.source.end.offset,
              ),
            f = _(!1, u, /[^\n]/gu, " ") + c,
            p;
          e.parser === "scss"
            ? (p = ol)
            : e.parser === "less"
              ? (p = il)
              : (p = nl);
          let l;
          try {
            l = p(f, { ...e });
          } catch {}
          ((s = l == null ? void 0 : l.nodes) == null ? void 0 : s.length) ===
            1 &&
            l.nodes[0].type === "css-rule" &&
            (a = l.nodes[0].nodes);
        }
        return (
          a
            ? (t.value = { type: "css-rule", nodes: a })
            : (t.value = { type: "value-unknown", value: t.raws.value.raw }),
          t
        );
      }
      let n = "";
      typeof t.selector == "string" &&
        ((n = t.raws.selector
          ? (t.raws.selector.scss ?? t.raws.selector.raw)
          : t.selector),
        t.raws.between &&
          t.raws.between.trim().length > 0 &&
          (n += t.raws.between),
        (t.raws.selector = n));
      let i = "";
      typeof t.value == "string" &&
        ((i = t.raws.value ? (t.raws.value.scss ?? t.raws.value.raw) : t.value),
        (i = i.trim()),
        (t.raws.value = i));
      let o = "";
      if (
        (typeof t.params == "string" &&
          ((o = t.raws.params
            ? (t.raws.params.scss ?? t.raws.params.raw)
            : t.params),
          t.raws.afterName &&
            t.raws.afterName.trim().length > 0 &&
            (o = t.raws.afterName + o),
          t.raws.between &&
            t.raws.between.trim().length > 0 &&
            (o = o + t.raws.between),
          (o = o.trim()),
          (t.raws.params = o)),
        n.trim().length > 0)
      )
        return n.startsWith("@") && n.endsWith(":")
          ? t
          : t.mixin
            ? ((t.selector = ie(n, e)), t)
            : (Zu(t, e) && (t.isSCSSNesterProperty = !0),
              (t.selector = Z(n)),
              t);
      if (i.length > 0) {
        let a = i.match(vy);
        a &&
          ((i = i.slice(0, a.index)),
          (t.scssDefault = !0),
          a[0].trim() !== "!default" && (t.raws.scssDefault = a[0]));
        let u = i.match(xy);
        if (
          (u &&
            ((i = i.slice(0, u.index)),
            (t.scssGlobal = !0),
            u[0].trim() !== "!global" && (t.raws.scssGlobal = u[0])),
          i.startsWith("progid:"))
        )
          return { type: "value-unknown", value: i };
        t.value = ie(i, e);
      }
      if (
        (e.parser === "less" &&
          t.type === "css-decl" &&
          i.startsWith("extend(") &&
          (t.extend || (t.extend = t.raws.between === ":"),
          t.extend &&
            !t.selector &&
            (delete t.value, (t.selector = Z(i.slice(7, -1))))),
        t.type === "css-atrule")
      ) {
        if (e.parser === "less") {
          if (t.mixin) {
            let a =
              t.raws.identifier + t.name + t.raws.afterName + t.raws.params;
            return (t.selector = Z(a)), delete t.params, t;
          }
          if (t.function) return t;
        }
        if (e.parser === "css" && t.name === "custom-selector") {
          let a = t.params.match(/:--\S+\s+/u)[0].trim();
          return (
            (t.customSelector = a),
            (t.selector = Z(t.params.slice(a.length).trim())),
            delete t.params,
            t
          );
        }
        if (e.parser === "less") {
          if (t.name.includes(":") && !t.params) {
            t.variable = !0;
            let a = t.name.split(":");
            (t.name = a[0]), (t.value = ie(a.slice(1).join(":"), e));
          }
          if (
            !["page", "nest", "keyframes"].includes(t.name) &&
            ((r = t.params) == null ? void 0 : r[0]) === ":"
          ) {
            t.variable = !0;
            let a = t.params.slice(1);
            a && (t.value = ie(a, e)), (t.raws.afterName += ":");
          }
          if (t.variable) return delete t.params, t.value || delete t.value, t;
        }
      }
      if (t.type === "css-atrule" && o.length > 0) {
        let { name: a } = t,
          u = t.name.toLowerCase();
        return a === "warn" || a === "error"
          ? ((t.params = { type: "media-unknown", value: o }), t)
          : a === "extend" || a === "nest"
            ? ((t.selector = Z(o)), delete t.params, t)
            : a === "at-root"
              ? (/^\(\s*(?:without|with)\s*:.+\)$/su.test(o)
                  ? (t.params = ie(o, e))
                  : ((t.selector = Z(o)), delete t.params),
                t)
              : Xu(u)
                ? ((t.import = !0), delete t.filename, (t.params = ie(o, e)), t)
                : [
                      "namespace",
                      "supports",
                      "if",
                      "else",
                      "for",
                      "each",
                      "while",
                      "debug",
                      "mixin",
                      "include",
                      "function",
                      "return",
                      "define-mixin",
                      "add-mixin",
                    ].includes(a)
                  ? ((o = o.replace(/(\$\S+?)(\s+)?\.{3}/u, "$1...$2")),
                    (o = o.replace(/^(?!if)(\S+)(\s+)\(/u, "$1($2")),
                    (t.value = ie(o, e)),
                    delete t.params,
                    t)
                  : ["media", "custom-media"].includes(u)
                    ? o.includes("#{")
                      ? { type: "media-unknown", value: o }
                      : ((t.params = ca(o)), t)
                    : ((t.params = o), t);
      }
    }
    return t;
  }
  function js(t, e, s) {
    let r = Je(e),
      { frontMatter: n } = r;
    e = r.content;
    let i;
    try {
      i = t(e, { map: !1 });
    } catch (o) {
      let { name: a, reason: u, line: c, column: f } = o;
      throw typeof c != "number"
        ? o
        : ra(`${a}: ${u}`, {
            loc: { start: { line: c, column: f } },
            cause: o,
          });
    }
    return (
      (s.originalText = e),
      (i = sl(J(i, "css-"), s)),
      Gr(i, e),
      n &&
        ((n.source = { startOffset: 0, endOffset: n.raw.length }),
        (i.frontMatter = n)),
      i
    );
  }
  function nl(t, e = {}) {
    return js(el.default.default, t, e);
  }
  function il(t, e = {}) {
    return js((s) => tl.default.parse(vn(s)), t, e);
  }
  function ol(t, e = {}) {
    return js(rl.default, t, e);
  }
  var Hs = { astFormat: "postcss", hasPragma: In, locStart: N, locEnd: P },
    by = { ...Hs, parse: nl },
    _y = { ...Hs, parse: il },
    ky = { ...Hs, parse: ol };
  var Ey = { postcss: fi };
  return pl(Sy);
});