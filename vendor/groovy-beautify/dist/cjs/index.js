"use strict";
var B = Object.defineProperty;
var T = (s, t, e) =>
  t in s
    ? B(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e);
var f = (s, t, e) => (T(s, typeof t != "symbol" ? t + "" : t, e), e);
class D {
  constructor(t, e) {
    f(this, "text");
    f(this, "textLength");
    f(this, "textPosition");
    f(this, "rules");
    (this.text = t),
      (this.textLength = t ? t.length : 0),
      (this.textPosition = 0),
      (this.rules = e || []);
  }
  scan() {
    return this.textPosition >= this.textLength
      ? null
      : this.text[this.textPosition++];
  }
  isDone() {
    return this.textPosition >= this.textLength;
  }
  move(t) {
    this.textPosition += t;
  }
  match(t, e, r) {
    var a;
    let n;
    if (e instanceof RegExp) {
      const i = new RegExp("^(" + e.source + ")", e.flags),
        l =
          (a = this.text.substring(this.textPosition).match(i)) == null
            ? void 0
            : a[0];
      l !== void 0 && (n = l);
    } else if (e instanceof Array)
      for (const i of e) {
        const l = this.match(t, i);
        if (l) {
          n = l;
          break;
        }
      }
    else
      typeof e == "function"
        ? (n = e(t, this.text.substring(this.textPosition)))
        : typeof e == "string" &&
          this.text.substring(this.textPosition).startsWith(e) &&
          (n = e);
    if (n && r) {
      const i = this.text.charAt(this.textPosition - 1),
        l = this.text.charAt(this.textPosition + n.length);
      (i.match(/[A-Za-z0-9_]/) || l.match(/[A-Za-z0-9_]/)) && (n = void 0);
    }
    return n;
  }
  matchStart(t, e) {
    return this.match(t, e.start, e.wholeword);
  }
  matchEnd(t, e) {
    return this.match(t, e.end, e.wholeword);
  }
  matchSkip(t, e) {
    return this.match(t, e.skip, e.wholeword);
  }
  createDefaultTextObject(t) {
    return { type: "text", start: t };
  }
  parse() {
    var n;
    const t = { type: "root", start: "" },
      e = [],
      r = [t];
    for (; !this.isDone(); ) {
      const a = e[e.length - 1],
        i = r[r.length - 1],
        l = (n = i.children) == null ? void 0 : n[i.children.length - 1];
      if (a) {
        if (a.skip) {
          const h = this.matchSkip(i, a);
          if (typeof h == "string") {
            l && l.type === "text"
              ? (l.start += h)
              : (i.children || (i.children = []),
                i.children.push(this.createDefaultTextObject(h))),
              this.move(h.length);
            continue;
          }
        }
        if (a.end) {
          const h = this.matchEnd(i, a);
          if (typeof h == "string") {
            (i.end = h), e.pop(), r.pop(), this.move(h.length);
            continue;
          }
        }
      }
      if (!(a != null && a.exclusive)) {
        const h = this.rules.find((c) => this.matchStart(i, c));
        if (h) {
          const c = this.matchStart(i, h);
          if (typeof c == "string") {
            const g = { type: h.name, start: c };
            i.children || (i.children = []),
              i.children.push(g),
              h.end && (e.push(h), r.push(g)),
              this.move(c.length);
            continue;
          }
        }
      }
      const w = this.scan();
      w &&
        (l && l.type === "text"
          ? (l.start += w)
          : (i.children || (i.children = []),
            i.children.push(this.createDefaultTextObject(w))));
    }
    return t;
  }
}
class o {
  constructor(t, e) {
    f(this, "name");
    f(this, "exclusive", !1);
    f(this, "wholeword", !1);
    f(this, "start");
    f(this, "skip");
    f(this, "end");
    (this.name = t),
      (this.exclusive = !!e.exclusive),
      (this.wholeword = !!e.wholeword),
      (this.start = e.start),
      (this.skip = e.skip),
      (this.end = e.end);
  }
}
var O = [
  new o("keywordblock", {
    start: (s, t) => {
      var i;
      const e =
          (i = s.children) == null
            ? void 0
            : i.filter((l) => l.type !== "whitespace"),
        r = e == null ? void 0 : e.at(-1),
        n = e == null ? void 0 : e.at(-2),
        a = t.trimStart();
      if (
        (r == null ? void 0 : r.type) === "round" &&
        (n == null ? void 0 : n.type) === "keywords" &&
        !a.startsWith("{")
      )
        return t.substring(0, t.length - a.length);
    },
    end: /\n|$|(?=})/,
  }),
  new o("blockcomment", { start: "/*", end: "*/", exclusive: !0 }),
  new o("linecomment", { start: "//", end: /(?=\n)/, exclusive: !0 }),
  new o("multilinestring", { start: "'''", end: "'''", exclusive: !0 }),
  new o("multilinestring", { start: '"""', end: '"""', exclusive: !0 }),
  new o("string", { start: '"', end: '"', skip: '\\"', exclusive: !0 }),
  new o("string", { start: "'", end: "'", skip: "\\'", exclusive: !0 }),
  new o("regexp", { start: /\//g, end: /\//g, skip: /'/g, exclusive: !0 }),
  new o("numeric", { start: /0[xX][0-9a-fA-F]+\b/g }),
  new o("numeric", { start: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/g }),
  new o("boolean", { start: /(?:true|false)\b/g }),
  new o("block", { start: "{", end: "}" }),
  new o("square", { start: ["?[", "["], end: "]" }),
  new o("round", { start: "(", end: ")" }),
  new o("dot", { start: /((\?|\*|&)+)?\.(?=[^\d])(\*)?/g }),
  new o("delimiters", { start: [",", ":", ";"] }),
  new o("incdec", { start: ["--", "++", "**"] }),
  new o("operators", {
    start: [
      "--",
      "-=",
      "->",
      "-",
      "::",
      "!==",
      "!=",
      "?:",
      "?=",
      "?",
      "..<",
      "..",
      "**=",
      "**",
      "*=",
      "*",
      "/=",
      "/",
      "&&",
      "&=",
      "&",
      "%=",
      "%",
      "^=",
      "^",
      "++",
      "+=",
      "+",
      "<..<",
      "<..",
      "<<=",
      "<<",
      "<=>",
      "<=",
      "<",
      "===",
      "==~",
      "==",
      "=~",
      "=",
      ">=",
      ">>=",
      ">>>=",
      ">>",
      ">",
      "|=",
      "||",
      "|",
      "~",
    ],
  }),
  new o("negation", { start: "!" }),
  new o("keywords", {
    start: [
      "abstract",
      "assert",
      "boolean",
      "break",
      "byte",
      "case",
      "catch",
      "char",
      "class",
      "continue",
      "default",
      "def",
      "double",
      "do",
      "else",
      "enum",
      "extends",
      "finally",
      "final",
      "float",
      "for",
      "goto",
      "if",
      "implements",
      "import",
      "instanceof",
      "interface",
      "int",
      "long",
      "native",
      "new",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "short",
      "static",
      "strictfp",
      "super",
      "switch",
      "synchronized",
      "throws",
      "throw",
      "transient",
      "try",
      "void",
      "volatile",
      "while",
      "with",
    ],
    wholeword: !0,
  }),
  new o("identifiers", { start: /[a-zA-Z_$][a-zA-Z0-9_$]*\b/g, wholeword: !0 }),
  new o("whitespace", { start: /\s+/g }),
];
class W {
  constructor(t, e) {
    f(this, "rules");
    f(this, "options");
    (this.rules = (t == null ? void 0 : t.map((r) => new r(this))) || []),
      (this.options = e || { width: 80 });
  }
  format(t, e = 0) {
    let r = "";
    if (t) {
      const n = this.rules.find((a) => a.matches(t));
      t.start !== void 0 && n && (r += n.formatStart(t, e)),
        n && (r += n.formatChildren(t, e)),
        t.end !== void 0 && n && (r += n.formatEnd(t, e));
    }
    return r;
  }
}
function x(s, t) {
  return "".padStart(t * 4) + s;
}
function R(s, t) {
  return s + "".padStart(t * 4);
}
function L(s) {
  return s.replace(/^( |\t)+/, "");
}
function m(s) {
  return s.replace(/( |\t)+$/, "");
}
class p {
  constructor(t) {
    f(this, "formatter");
    this.formatter = t;
  }
  matches(t, e) {
    return !0;
  }
  afterSelf(t, e) {
    return t;
  }
  beforeSelf(t, e, r) {
    return t;
  }
  beforeChild(t, e) {
    return t;
  }
  formatStart(t, e) {
    var r;
    return (r = t.start) != null ? r : "";
  }
  formatEnd(t, e) {
    var r;
    return (r = t.end) != null ? r : "";
  }
  allowBreak(t) {
    return !1;
  }
  formatChildren(t, e) {
    var r;
    return (
      ((r = t == null ? void 0 : t.children) == null
        ? void 0
        : r.reduce((n, a, i, l) => {
            var y, k, S, v;
            const w = this.formatter.rules.find((d) => d.matches(a)),
              h = this.formatter.rules.find((d) => d.matches(t)),
              c = this.formatter.rules.find((d) => d.matches(l[i - 1])),
              g = this.formatter.rules.find((d) => d.matches(l[i + 1]));
            let u = this.formatter.format(a, e);
            if (
              (c && (u = c.afterSelf(u, e)), h && (u = h.beforeChild(u, e)), g)
            ) {
              const C =
                !m(n + u).length ||
                m(n + u).endsWith(`
`);
              u = g.beforeSelf(u, e, C);
            }
            const F =
                (k =
                  (y = n
                    .split(
                      `
`,
                    )
                    .at(-1)) == null
                    ? void 0
                    : y.length) != null
                  ? k
                  : 0,
              A =
                (v =
                  (S = u
                    .split(
                      `
`,
                    )
                    .at(0)) == null
                    ? void 0
                    : S.length) != null
                  ? v
                  : 0;
            return (
              F + A > this.formatter.options.width &&
                (w == null ? void 0 : w.allowBreak(a)) &&
                ((u =
                  `
` + u.trimStart()),
                h && (u = h.beforeChild(u, e + 1))),
              (n += u),
              n
            );
          }, "")) || ""
    );
  }
}
class z extends p {
  matches(t) {
    return (t == null ? void 0 : t.type) === "root";
  }
  beforeChild(t) {
    let e = t;
    const r = m(e);
    return (
      r.endsWith(`
`) && (e = r),
      e
    );
  }
}
class P extends p {
  beforeChild(t, e) {
    let r = t;
    const n = L(r);
    n.startsWith(`
`) &&
      (r =
        `
` + x(n.trimStart(), e));
    const a = m(r);
    return (
      a.endsWith(`
`) && (r = R(a, e)),
      r
    );
  }
}
class E extends P {
  matches(t) {
    return (t == null ? void 0 : t.type) === "block";
  }
  beforeSelf(t, e, r) {
    return r ? t : t.trimEnd() + " ";
  }
  formatEnd(t, e) {
    return t.end ? x(t.end, e) : "";
  }
  formatChildren(t, e) {
    let r = super.formatChildren(t, e + 1);
    return (
      (r = r.trim()),
      `
` +
        x(r, e + 1) +
        `
`
    );
  }
}
class Z extends E {
  matches(t) {
    return (t == null ? void 0 : t.type) === "keywordblock";
  }
  formatStart() {
    return "{";
  }
  formatEnd(t, e) {
    return x(
      `}
`,
      e,
    );
  }
}
class _ extends P {
  matches(t) {
    return (
      (t == null ? void 0 : t.type) === "round" ||
      (t == null ? void 0 : t.type) === "square"
    );
  }
  isMultiline(t) {
    var e;
    return (e = t.children) == null
      ? void 0
      : e.some((r) => {
          var n;
          return (n = r.start) == null
            ? void 0
            : n.includes(`
`);
        });
  }
  beforeSelf(t, e, r) {
    return r ? m(t) : t;
  }
  formatEnd(t, e) {
    var r;
    return this.isMultiline(t)
      ? t.end
        ? x(t.end, e)
        : ""
      : (r = t.end) != null
        ? r
        : "";
  }
  formatChildren(t, e) {
    if (this.isMultiline(t)) {
      let r = super.formatChildren(t, e + 1);
      return (
        (r = r.trim()),
        `
` +
          x(r, e + 1) +
          `
`
      );
    } else return super.formatChildren(t, e).trim();
  }
}
class $ extends p {
  matches(t) {
    return (t == null ? void 0 : t.type) === "dot";
  }
  beforeSelf(t, e, r) {
    return r ? R(m(t), e + 1) : t;
  }
}
class b extends p {
  matches(t) {
    return (t == null ? void 0 : t.type) === "operators";
  }
  beforeSelf(t) {
    return m(t) + " ";
  }
  afterSelf(t) {
    return " " + t.trimStart();
  }
  allowBreak() {
    return !0;
  }
}
class M extends p {
  matches(t) {
    return (t == null ? void 0 : t.type) === "delimiters";
  }
  beforeSelf(t) {
    return m(t);
  }
  afterSelf(t) {
    return " " + L(t);
  }
}
class q extends p {
  matches(t) {
    return (t == null ? void 0 : t.type) === "keywords";
  }
  beforeSelf(t, e, r) {
    return r ? t : t.trimEnd() + " ";
  }
  afterSelf(t) {
    return " " + t.trimStart();
  }
  allowBreak() {
    return !0;
  }
}
var G = [z, E, Z, _, $, q, b, M, p];
function K(s, t) {
  const r = new D(s, O).parse();
  return new W(G, t).format(r);
}
module.exports = K;
