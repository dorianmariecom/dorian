var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Parser {
  constructor(text, rules) {
    __publicField(this, "text");
    __publicField(this, "textLength");
    __publicField(this, "textPosition");
    __publicField(this, "rules");
    this.text = text;
    this.textLength = text ? text.length : 0;
    this.textPosition = 0;
    this.rules = rules || [];
  }
  scan() {
    if (this.textPosition >= this.textLength) return null;
    return this.text[this.textPosition++];
  }
  isDone() {
    return this.textPosition >= this.textLength;
  }
  move(length) {
    this.textPosition += length;
  }
  match(cb, expression, wholeword) {
    var _a;
    let result;
    if (expression instanceof RegExp) {
      const modifiedExpression = new RegExp(
        "^(" + expression.source + ")",
        expression.flags,
      );
      const text =
        (_a = this.text
          .substring(this.textPosition)
          .match(modifiedExpression)) == null
          ? void 0
          : _a[0];
      if (text !== void 0) {
        result = text;
      }
    } else if (expression instanceof Array) {
      for (const exp of expression) {
        const match = this.match(cb, exp);
        if (match) {
          result = match;
          break;
        }
      }
    } else if (typeof expression === "function") {
      result = expression(cb, this.text.substring(this.textPosition));
    } else if (typeof expression === "string") {
      if (this.text.substring(this.textPosition).startsWith(expression)) {
        result = expression;
      }
    }
    if (result && wholeword) {
      const prevSymbol = this.text.charAt(this.textPosition - 1);
      const nextSymbol = this.text.charAt(this.textPosition + result.length);
      if (
        prevSymbol.match(/[A-Za-z0-9_]/) ||
        nextSymbol.match(/[A-Za-z0-9_]/)
      ) {
        result = void 0;
      }
    }
    return result;
  }
  matchStart(cb, rule) {
    return this.match(cb, rule.start, rule.wholeword);
  }
  matchEnd(cb, rule) {
    return this.match(cb, rule.end, rule.wholeword);
  }
  matchSkip(cb, rule) {
    return this.match(cb, rule.skip, rule.wholeword);
  }
  createDefaultTextObject(text) {
    return {
      type: "text",
      start: text,
    };
  }
  parse() {
    var _a;
    const root = { type: "root", start: "" };
    const ruleStack = [];
    const objStack = [root];
    while (!this.isDone()) {
      const activeRule = ruleStack[ruleStack.length - 1];
      const activeObj = objStack[objStack.length - 1];
      const activeObjLastChild =
        (_a = activeObj.children) == null
          ? void 0
          : _a[activeObj.children.length - 1];
      if (activeRule) {
        if (activeRule.skip) {
          const activeRuleSkipText = this.matchSkip(activeObj, activeRule);
          if (typeof activeRuleSkipText === "string") {
            if (activeObjLastChild && activeObjLastChild.type === "text") {
              activeObjLastChild.start += activeRuleSkipText;
            } else {
              if (!activeObj.children) {
                activeObj.children = [];
              }
              activeObj.children.push(
                this.createDefaultTextObject(activeRuleSkipText),
              );
            }
            this.move(activeRuleSkipText.length);
            continue;
          }
        }
        if (activeRule.end) {
          const activeRuleText = this.matchEnd(activeObj, activeRule);
          if (typeof activeRuleText === "string") {
            activeObj.end = activeRuleText;
            ruleStack.pop();
            objStack.pop();
            this.move(activeRuleText.length);
            continue;
          }
        }
      }
      if (!(activeRule == null ? void 0 : activeRule.exclusive)) {
        const matchedRule = this.rules.find((r) =>
          this.matchStart(activeObj, r),
        );
        if (matchedRule) {
          const matchedRuleText = this.matchStart(activeObj, matchedRule);
          if (typeof matchedRuleText === "string") {
            const newObj = {
              type: matchedRule.name,
              start: matchedRuleText,
            };
            if (!activeObj.children) {
              activeObj.children = [];
            }
            activeObj.children.push(newObj);
            if (matchedRule.end) {
              ruleStack.push(matchedRule);
              objStack.push(newObj);
            }
            this.move(matchedRuleText.length);
            continue;
          }
        }
      }
      const ch = this.scan();
      if (ch) {
        if (activeObjLastChild && activeObjLastChild.type === "text") {
          activeObjLastChild.start += ch;
        } else {
          if (!activeObj.children) {
            activeObj.children = [];
          }
          activeObj.children.push(this.createDefaultTextObject(ch));
        }
      }
    }
    return root;
  }
}
class ParseRule {
  constructor(name, options) {
    __publicField(this, "name");
    __publicField(this, "exclusive", false);
    __publicField(this, "wholeword", false);
    __publicField(this, "start");
    __publicField(this, "skip");
    __publicField(this, "end");
    this.name = name;
    this.exclusive = !!options.exclusive;
    this.wholeword = !!options.wholeword;
    this.start = options.start;
    this.skip = options.skip;
    this.end = options.end;
  }
}
var GroovyParseRules = [
  new ParseRule("keywordblock", {
    start: (cb, text) => {
      var _a;
      const functionalChildren =
        (_a = cb.children) == null
          ? void 0
          : _a.filter((c) => c.type !== "whitespace");
      const last1 =
        functionalChildren == null ? void 0 : functionalChildren.at(-1);
      const last2 =
        functionalChildren == null ? void 0 : functionalChildren.at(-2);
      const trimmedText = text.trimStart();
      if (
        (last1 == null ? void 0 : last1.type) === "round" &&
        (last2 == null ? void 0 : last2.type) === "keywords" &&
        !trimmedText.startsWith("{")
      ) {
        return text.substring(0, text.length - trimmedText.length);
      }
      return void 0;
    },
    end: /\n|$|(?=})/,
  }),
  new ParseRule("blockcomment", { start: "/*", end: "*/", exclusive: true }),
  new ParseRule("linecomment", { start: "//", end: /(?=\n)/, exclusive: true }),
  new ParseRule("multilinestring", {
    start: "'''",
    end: "'''",
    exclusive: true,
  }),
  new ParseRule("multilinestring", {
    start: '"""',
    end: '"""',
    exclusive: true,
  }),
  new ParseRule("string", {
    start: '"',
    end: '"',
    skip: '\\"',
    exclusive: true,
  }),
  new ParseRule("string", {
    start: "'",
    end: "'",
    skip: "\\'",
    exclusive: true,
  }),
  new ParseRule("regexp", {
    start: /\//g,
    end: /\//g,
    skip: /'/g,
    exclusive: true,
  }),
  new ParseRule("numeric", { start: /0[xX][0-9a-fA-F]+\b/g }),
  new ParseRule("numeric", {
    start: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/g,
  }),
  new ParseRule("boolean", { start: /(?:true|false)\b/g }),
  new ParseRule("block", { start: "{", end: "}" }),
  new ParseRule("square", { start: ["?[", "["], end: "]" }),
  new ParseRule("round", { start: "(", end: ")" }),
  new ParseRule("dot", { start: /((\?|\*|&)+)?\.(?=[^\d])(\*)?/g }),
  new ParseRule("delimiters", { start: [",", ":", ";"] }),
  new ParseRule("incdec", { start: ["--", "++", "**"] }),
  new ParseRule("operators", {
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
  new ParseRule("negation", { start: "!" }),
  new ParseRule("keywords", {
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
    wholeword: true,
  }),
  new ParseRule("identifiers", {
    start: /[a-zA-Z_$][a-zA-Z0-9_$]*\b/g,
    wholeword: true,
  }),
  new ParseRule("whitespace", { start: /\s+/g }),
];
class Formatter {
  constructor(rules, options) {
    __publicField(this, "rules");
    __publicField(this, "options");
    this.rules = (rules == null ? void 0 : rules.map((r) => new r(this))) || [];
    this.options = options || { width: 80 };
  }
  format(obj, indent = 0) {
    let text = "";
    if (obj) {
      const formatRule = this.rules.find((r) => r.matches(obj));
      if (obj.start !== void 0) {
        if (formatRule) {
          text += formatRule.formatStart(obj, indent);
        }
      }
      if (formatRule) {
        text += formatRule.formatChildren(obj, indent);
      }
      if (obj.end !== void 0) {
        if (formatRule) {
          text += formatRule.formatEnd(obj, indent);
        }
      }
    }
    return text;
  }
}
function padLeft(text, indent) {
  return "".padStart(indent * 4) + text;
}
function padRight(text, indent) {
  return text + "".padStart(indent * 4);
}
function trimSpacesAndTabsLeft(text) {
  return text.replace(/^( |\t)+/, "");
}
function trimSpacesAndTabsRight(text) {
  return text.replace(/( |\t)+$/, "");
}
class FormatRule {
  constructor(formatter) {
    __publicField(this, "formatter");
    this.formatter = formatter;
  }
  matches(cb, siblings) {
    return true;
  }
  afterSelf(nextText, indent) {
    return nextText;
  }
  beforeSelf(prevText, indent, newLine) {
    return prevText;
  }
  beforeChild(childText, indent) {
    return childText;
  }
  formatStart(cb, indent) {
    var _a;
    return (_a = cb.start) != null ? _a : "";
  }
  formatEnd(cb, indent) {
    var _a;
    return (_a = cb.end) != null ? _a : "";
  }
  allowBreak(cb) {
    return false;
  }
  formatChildren(parent, indent) {
    var _a;
    return (
      ((_a = parent == null ? void 0 : parent.children) == null
        ? void 0
        : _a.reduce((res, child, i, children) => {
            var _a2, _b, _c, _d;
            const childFormatRule = this.formatter.rules.find((r) =>
              r.matches(child),
            );
            const parentFormatRule = this.formatter.rules.find((r) =>
              r.matches(parent),
            );
            const prevFormatRule = this.formatter.rules.find((r) =>
              r.matches(children[i - 1]),
            );
            const nextFormatRule = this.formatter.rules.find((r) =>
              r.matches(children[i + 1]),
            );
            let childString = this.formatter.format(child, indent);
            if (prevFormatRule) {
              childString = prevFormatRule.afterSelf(childString, indent);
            }
            if (parentFormatRule) {
              childString = parentFormatRule.beforeChild(childString, indent);
            }
            if (nextFormatRule) {
              const trimmed = trimSpacesAndTabsRight(res + childString);
              const newLine =
                !trimmed.length ||
                trimSpacesAndTabsRight(res + childString).endsWith("\n");
              childString = nextFormatRule.beforeSelf(
                childString,
                indent,
                newLine,
              );
            }
            const lastLineLength =
              (_b =
                (_a2 = res.split("\n").at(-1)) == null ? void 0 : _a2.length) !=
              null
                ? _b
                : 0;
            const childFirstLineLength =
              (_d =
                (_c = childString.split("\n").at(0)) == null
                  ? void 0
                  : _c.length) != null
                ? _d
                : 0;
            if (
              lastLineLength + childFirstLineLength >
                this.formatter.options.width &&
              (childFormatRule == null
                ? void 0
                : childFormatRule.allowBreak(child))
            ) {
              childString = "\n" + childString.trimStart();
              if (parentFormatRule) {
                childString = parentFormatRule.beforeChild(
                  childString,
                  indent + 1,
                );
              }
            }
            res += childString;
            return res;
          }, "")) || ""
    );
  }
}
class RootFormatRule extends FormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "root";
  }
  beforeChild(childText) {
    let text = childText;
    const trimmedRight = trimSpacesAndTabsRight(text);
    if (trimmedRight.endsWith("\n")) {
      text = trimmedRight;
    }
    return text;
  }
}
class BaseBlockRule extends FormatRule {
  beforeChild(childText, indent) {
    let text = childText;
    const trimmedLeft = trimSpacesAndTabsLeft(text);
    if (trimmedLeft.startsWith("\n")) {
      text = "\n" + padLeft(trimmedLeft.trimStart(), indent);
    }
    const trimmedRight = trimSpacesAndTabsRight(text);
    if (trimmedRight.endsWith("\n")) {
      text = padRight(trimmedRight, indent);
    }
    return text;
  }
}
class BlockFormatRule extends BaseBlockRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "block";
  }
  beforeSelf(prevText, indent, newLine) {
    if (!newLine) {
      return prevText.trimEnd() + " ";
    } else {
      return prevText;
    }
  }
  formatEnd(cb, indent) {
    return cb.end ? padLeft(cb.end, indent) : "";
  }
  formatChildren(cb, indent) {
    let blockText = super.formatChildren(cb, indent + 1);
    blockText = blockText.trim();
    return "\n" + padLeft(blockText, indent + 1) + "\n";
  }
}
class KeywordBlockFormatRule extends BlockFormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "keywordblock";
  }
  formatStart() {
    return "{";
  }
  formatEnd(cb, indent) {
    return padLeft("}\n", indent);
  }
}
class InlineBlockFormatRule extends BaseBlockRule {
  matches(cb) {
    return (
      (cb == null ? void 0 : cb.type) === "round" ||
      (cb == null ? void 0 : cb.type) === "square"
    );
  }
  isMultiline(cb) {
    var _a;
    return (_a = cb.children) == null
      ? void 0
      : _a.some((child) => {
          var _a2;
          return (_a2 = child.start) == null ? void 0 : _a2.includes("\n");
        });
  }
  beforeSelf(prevText, indent, newLine) {
    if (newLine) {
      return trimSpacesAndTabsRight(prevText);
    } else {
      return prevText;
    }
  }
  formatEnd(cb, indent) {
    var _a;
    if (this.isMultiline(cb)) {
      return cb.end ? padLeft(cb.end, indent) : "";
    } else {
      return (_a = cb.end) != null ? _a : "";
    }
  }
  formatChildren(cb, indent) {
    if (this.isMultiline(cb)) {
      let blockText = super.formatChildren(cb, indent + 1);
      blockText = blockText.trim();
      return "\n" + padLeft(blockText, indent + 1) + "\n";
    } else {
      const blockText = super.formatChildren(cb, indent);
      return blockText.trim();
    }
  }
}
class DotSyntaxFormatRule extends FormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "dot";
  }
  beforeSelf(prevText, indent, newLine) {
    if (newLine) {
      return padRight(trimSpacesAndTabsRight(prevText), indent + 1);
    } else {
      return prevText;
    }
  }
}
class OperatorsRule extends FormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "operators";
  }
  beforeSelf(prevText) {
    return trimSpacesAndTabsRight(prevText) + " ";
  }
  afterSelf(nextText) {
    return " " + nextText.trimStart();
  }
  allowBreak() {
    return true;
  }
}
class DelimitersRule extends FormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "delimiters";
  }
  beforeSelf(prevText) {
    return trimSpacesAndTabsRight(prevText);
  }
  afterSelf(nextText) {
    return " " + trimSpacesAndTabsLeft(nextText);
  }
}
class KeywordRule extends FormatRule {
  matches(cb) {
    return (cb == null ? void 0 : cb.type) === "keywords";
  }
  beforeSelf(prevText, indent, newLine) {
    if (!newLine) {
      return prevText.trimEnd() + " ";
    } else {
      return prevText;
    }
  }
  afterSelf(nextText) {
    return " " + nextText.trimStart();
  }
  allowBreak() {
    return true;
  }
}
var GroovyFormatRules = [
  RootFormatRule,
  BlockFormatRule,
  KeywordBlockFormatRule,
  InlineBlockFormatRule,
  DotSyntaxFormatRule,
  KeywordRule,
  OperatorsRule,
  DelimitersRule,
  FormatRule,
];
function index(groovyCode, options) {
  const parser = new Parser(groovyCode, GroovyParseRules);
  const parsingResult = parser.parse();
  const formatter = new Formatter(GroovyFormatRules, options);
  return formatter.format(parsingResult);
}
export { index as default };
