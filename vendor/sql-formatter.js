(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["sqlFormatter"] = factory();
  else root["sqlFormatter"] = factory();
})(self, () => {
  return /******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ var __webpack_modules__ = {
      /***/ "./src/core/AliasAs.ts":
        /*!*****************************!*\
  !*** ./src/core/AliasAs.ts ***!
  \*****************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ AliasAs,
            /* harmony export */
          });
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /** Decides addition and removal of AS tokens */

          var AliasAs = /*#__PURE__*/ (function () {
            function AliasAs(aliasAs, formatter) {
              _classCallCheck(this, AliasAs);

              this.aliasAs = aliasAs;
              this.formatter = formatter;
            }
            /** True when AS keyword should be added *before* current token */

            _createClass(AliasAs, [
              {
                key: "shouldAddBefore",
                value: function shouldAddBefore(token) {
                  return (
                    this.isMissingTableAlias(token) ||
                    this.isMissingSelectColumnAlias(token)
                  );
                }, // if table alias is missing and should be added
              },
              {
                key: "isMissingTableAlias",
                value: function isMissingTableAlias(token) {
                  return (
                    this.aliasAs === "always" &&
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.WORD &&
                    this.lookBehind().value === ")"
                  );
                }, // if select column alias is missing and should be added
              },
              {
                key: "isMissingSelectColumnAlias",
                value: function isMissingSelectColumnAlias(token) {
                  var prevToken = this.lookBehind();
                  var nextToken = this.lookAhead();
                  return (
                    (this.aliasAs === "always" || this.aliasAs === "select") &&
                    this.formatter.isWithinSelect() &&
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.WORD &&
                    (_token__WEBPACK_IMPORTED_MODULE_0__.isToken.END(
                      prevToken,
                    ) ||
                      ((prevToken.type ===
                        _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.WORD ||
                        prevToken.type ===
                          _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                            .NUMBER) &&
                        (nextToken.value === "," ||
                          (0, _token__WEBPACK_IMPORTED_MODULE_0__.isCommand)(
                            nextToken,
                          ))))
                  );
                },
                /** True when AS keyword should be added *after* current token */
              },
              {
                key: "shouldAddAfter",
                value: function shouldAddAfter() {
                  return (
                    this.isEdgeCaseCTE() ||
                    this.isEdgeCaseCreateTable() ||
                    this.isMissingTypeCastAs()
                  );
                }, // checks for CAST(«expression» [AS] type)
              },
              {
                key: "isMissingTypeCastAs",
                value: function isMissingTypeCastAs() {
                  return (
                    this.aliasAs === "never" &&
                    this.formatter.isWithinSelect() &&
                    _token__WEBPACK_IMPORTED_MODULE_0__.isToken.CAST(
                      this.formatter.getPreviousReservedToken(),
                    ) &&
                    _token__WEBPACK_IMPORTED_MODULE_0__.isToken.AS(
                      this.lookAhead(),
                    ) &&
                    (this.lookAhead(2).type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.WORD ||
                      this.lookAhead(2).type ===
                        _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                          .RESERVED_KEYWORD) &&
                    this.lookAhead(3).value === ")"
                  );
                }, // checks for WITH `table` [AS] (
              },
              {
                key: "isEdgeCaseCTE",
                value: function isEdgeCaseCTE() {
                  var nextToken = this.lookAhead();
                  return (
                    this.aliasAs === "never" &&
                    _token__WEBPACK_IMPORTED_MODULE_0__.isToken.WITH(
                      this.lookBehind(),
                    ) &&
                    (nextToken.value === "(" ||
                      (_token__WEBPACK_IMPORTED_MODULE_0__.isToken.AS(
                        nextToken,
                      ) &&
                        this.lookAhead(2).value === "("))
                  );
                }, // checks for CREATE TABLE `table` [AS] WITH (
              },
              {
                key: "isEdgeCaseCreateTable",
                value: function isEdgeCaseCreateTable() {
                  var prevToken = this.lookBehind();
                  var nextToken = this.lookAhead();
                  return (
                    this.aliasAs === "never" &&
                    (_token__WEBPACK_IMPORTED_MODULE_0__.isToken.TABLE(
                      prevToken,
                    ) ||
                      prevToken.value.endsWith("TABLE")) &&
                    (_token__WEBPACK_IMPORTED_MODULE_0__.isToken.WITH(
                      nextToken,
                    ) ||
                      (_token__WEBPACK_IMPORTED_MODULE_0__.isToken.AS(
                        nextToken,
                      ) &&
                        _token__WEBPACK_IMPORTED_MODULE_0__.isToken.WITH(
                          this.lookAhead(2),
                        )))
                  );
                },
                /* True when the current AS token should be discarded */
              },
              {
                key: "shouldRemove",
                value: function shouldRemove() {
                  return (
                    this.aliasAs === "never" ||
                    (this.aliasAs === "select" && this.isRemovableNonSelectAs())
                  );
                },
              },
              {
                key: "isRemovableNonSelectAs",
                value: function isRemovableNonSelectAs() {
                  return (
                    this.lookBehind().value === ")" && // ) [AS] alias but not SELECT (a) [AS] alpha
                    !this.formatter.isWithinSelect() &&
                    this.lookAhead().value !== "(" // skip WITH foo [AS] ( ...
                  );
                },
              },
              {
                key: "lookBehind",
                value: function lookBehind(n) {
                  return this.formatter.tokenLookBehind(n);
                },
              },
              {
                key: "lookAhead",
                value: function lookAhead(n) {
                  return this.formatter.tokenLookAhead(n);
                },
              },
            ]);

            return AliasAs;
          })();

          /***/
        },

      /***/ "./src/core/AsTokenFactory.ts":
        /*!************************************!*\
  !*** ./src/core/AsTokenFactory.ts ***!
  \************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ AsTokenFactory,
            /* harmony export */
          });
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          var AsTokenFactory = /*#__PURE__*/ (function () {
            function AsTokenFactory(keywordCase) {
              var tokens =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : [];

              _classCallCheck(this, AsTokenFactory);

              this.keywordCase = keywordCase;
              this.detectedCase = this.autoDetectCase(tokens);
            }

            _createClass(AsTokenFactory, [
              {
                key: "autoDetectCase",
                value: function autoDetectCase(tokens) {
                  var asTokens = tokens.filter(
                    _token__WEBPACK_IMPORTED_MODULE_0__.isToken.AS,
                  );
                  var upperAsTokens = asTokens.filter(function (_ref) {
                    var text = _ref.text;
                    return text === "AS";
                  });
                  return upperAsTokens.length > asTokens.length / 2
                    ? "upper"
                    : "lower";
                },
                /** Returns AS token with either upper- or lowercase text */
              },
              {
                key: "token",
                value: function token() {
                  return {
                    type: _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                      .RESERVED_KEYWORD,
                    value: this.asTokenValue(),
                    text: this.asTokenValue(),
                  };
                },
              },
              {
                key: "asTokenValue",
                value: function asTokenValue() {
                  var keywordCase =
                    this.keywordCase === "preserve"
                      ? this.detectedCase
                      : this.keywordCase;
                  return keywordCase === "upper" ? "AS" : "as";
                },
              },
            ]);

            return AsTokenFactory;
          })();

          /***/
        },

      /***/ "./src/core/Formatter.ts":
        /*!*******************************!*\
  !*** ./src/core/Formatter.ts ***!
  \*******************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ Formatter,
            /* harmony export */
          });
          /* harmony import */ var _Params__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! ./Params */ "./src/core/Params.ts");
          /* harmony import */ var _formatCommaPositions__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ./formatCommaPositions */ "./src/core/formatCommaPositions.ts",
            );
          /* harmony import */ var _formatAliasPositions__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(
              /*! ./formatAliasPositions */ "./src/core/formatAliasPositions.ts",
            );
          /* harmony import */ var _AsTokenFactory__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(
              /*! ./AsTokenFactory */ "./src/core/AsTokenFactory.ts",
            );
          /* harmony import */ var _Parser__WEBPACK_IMPORTED_MODULE_4__ =
            __webpack_require__(/*! ./Parser */ "./src/core/Parser.ts");
          /* harmony import */ var _StatementFormatter__WEBPACK_IMPORTED_MODULE_5__ =
            __webpack_require__(
              /*! ./StatementFormatter */ "./src/core/StatementFormatter.ts",
            );
          /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ =
            __webpack_require__(/*! ./config */ "./src/core/config.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /** Main formatter class that produces a final output string from list of tokens */

          var Formatter = /*#__PURE__*/ (function () {
            function Formatter(cfg) {
              _classCallCheck(this, Formatter);

              this.cfg = cfg;
              this.params = new _Params__WEBPACK_IMPORTED_MODULE_0__["default"](
                this.cfg.params,
              );
            }
            /**
             * SQL Tokenizer for this formatter, provided by subclasses.
             */

            _createClass(Formatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  throw new Error("tokenizer() not implemented by subclass");
                },
                /**
                 * Formats an SQL query.
                 * @param {string} query - The SQL query string to be formatted
                 * @return {string} The formatter query
                 */
              },
              {
                key: "format",
                value: function format(query) {
                  var tokens = this.tokenizer().tokenize(query);
                  var ast = new _Parser__WEBPACK_IMPORTED_MODULE_4__["default"](
                    tokens,
                  ).parse();
                  var formattedQuery = this.formatAst(ast, tokens);
                  var finalQuery = this.postFormat(formattedQuery);
                  return finalQuery.trimEnd();
                },
              },
              {
                key: "formatAst",
                value: function formatAst(statements, tokens) {
                  var _this = this;

                  var asTokenFactory =
                    new _AsTokenFactory__WEBPACK_IMPORTED_MODULE_3__["default"](
                      this.cfg.keywordCase,
                      tokens,
                    );
                  return statements
                    .map(function (stat) {
                      return new _StatementFormatter__WEBPACK_IMPORTED_MODULE_5__[
                        "default"
                      ](_this.cfg, _this.params, asTokenFactory).format(stat);
                    })
                    .join("\n".repeat(this.cfg.linesBetweenQueries + 1));
                },
              },
              {
                key: "postFormat",
                value: function postFormat(query) {
                  if (this.cfg.tabulateAlias) {
                    query = (0,
                    _formatAliasPositions__WEBPACK_IMPORTED_MODULE_2__[
                      "default"
                    ])(query);
                  }

                  if (
                    this.cfg.commaPosition === "before" ||
                    this.cfg.commaPosition === "tabular"
                  ) {
                    query = (0,
                    _formatCommaPositions__WEBPACK_IMPORTED_MODULE_1__[
                      "default"
                    ])(
                      query,
                      this.cfg.commaPosition,
                      (0, _config__WEBPACK_IMPORTED_MODULE_6__.indentString)(
                        this.cfg,
                      ),
                    );
                  }

                  return query;
                },
              },
            ]);

            return Formatter;
          })();

          /***/
        },

      /***/ "./src/core/Indentation.ts":
        /*!*********************************!*\
  !*** ./src/core/Indentation.ts ***!
  \*********************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ Indentation,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          var INDENT_TYPE_TOP_LEVEL = "top-level";
          var INDENT_TYPE_BLOCK_LEVEL = "block-level";
          /**
           * Manages indentation levels.
           *
           * There are two types of indentation levels:
           *
           * - BLOCK_LEVEL : increased by open-parenthesis
           * - TOP_LEVEL : increased by RESERVED_COMMAND words
           */

          var Indentation = /*#__PURE__*/ (function () {
            /**
             * @param {string} indent A string to indent with
             */
            function Indentation(indent) {
              _classCallCheck(this, Indentation);

              this.indent = indent;
              this.indentTypes = [];
            }
            /**
             * Returns indentation string for single indentation step.
             */

            _createClass(Indentation, [
              {
                key: "getSingleIndent",
                value: function getSingleIndent() {
                  return this.indent;
                },
                /**
                 * Returns current indentation string.
                 * @return {string} indentation string based on indentTypes
                 */
              },
              {
                key: "getIndent",
                value: function getIndent() {
                  return this.indent.repeat(this.indentTypes.length);
                },
                /**
                 * Returns current indentation level
                 */
              },
              {
                key: "getLevel",
                value: function getLevel() {
                  return this.indentTypes.length;
                },
                /**
                 * Increases indentation by one top-level indent.
                 */
              },
              {
                key: "increaseTopLevel",
                value: function increaseTopLevel() {
                  this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
                },
                /**
                 * Increases indentation by one block-level indent.
                 */
              },
              {
                key: "increaseBlockLevel",
                value: function increaseBlockLevel() {
                  this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
                },
                /**
                 * Decreases indentation by one top-level indent.
                 * Does nothing when the previous indent is not top-level.
                 */
              },
              {
                key: "decreaseTopLevel",
                value: function decreaseTopLevel() {
                  if (
                    this.indentTypes.length > 0 &&
                    (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.last)(
                      this.indentTypes,
                    ) === INDENT_TYPE_TOP_LEVEL
                  ) {
                    this.indentTypes.pop();
                  }
                },
                /**
                 * Decreases indentation by one block-level indent.
                 * If there are top-level indents within the block-level indent,
                 * throws away these as well.
                 */
              },
              {
                key: "decreaseBlockLevel",
                value: function decreaseBlockLevel() {
                  while (this.indentTypes.length > 0) {
                    var type = this.indentTypes.pop();

                    if (type !== INDENT_TYPE_TOP_LEVEL) {
                      break;
                    }
                  }
                },
                /** Clears all indentation */
              },
              {
                key: "resetIndentation",
                value: function resetIndentation() {
                  this.indentTypes = [];
                },
              },
            ]);

            return Indentation;
          })();

          /***/
        },

      /***/ "./src/core/InlineBlock.ts":
        /*!*********************************!*\
  !*** ./src/core/InlineBlock.ts ***!
  \*********************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ InlineBlock,
            /* harmony export */
          });
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /**
           * Bookkeeper for inline blocks.
           *
           * Inline blocks are parenthesised expressions that are shorter than INLINE_MAX_LENGTH.
           * These blocks are formatted on a single line, unlike longer parenthesised
           * expressions where open-parenthesis causes newline and increase of indentation.
           */

          var InlineBlock = /*#__PURE__*/ (function () {
            function InlineBlock(expressionWidth) {
              _classCallCheck(this, InlineBlock);

              this.level = 0;
              this.expressionWidth = expressionWidth;
            }
            /**
             * Begins inline block when lookahead through upcoming tokens determines
             * that the block would be smaller than INLINE_MAX_LENGTH.
             * @param  {Token[]} tokens Array of all tokens
             * @param  {Number} index Current token position
             */

            _createClass(InlineBlock, [
              {
                key: "beginIfPossible",
                value: function beginIfPossible(tokens, index) {
                  if (this.level === 0 && this.isInlineBlock(tokens, index)) {
                    this.level = 1;
                  } else if (this.level > 0) {
                    this.level++;
                  } else {
                    this.level = 0;
                  }
                },
                /**
                 * Finishes current inline block.
                 * There might be several nested ones.
                 */
              },
              {
                key: "end",
                value: function end() {
                  this.level--;
                },
                /**
                 * True when inside an inline block
                 */
              },
              {
                key: "isActive",
                value: function isActive() {
                  return this.level > 0;
                },
                /**
                 * Check if this should be an inline parentheses block
                 * Examples are "NOW()", "COUNT(*)", "int(10)", key(`somecolumn`), DECIMAL(7,2)
                 */
              },
              {
                key: "isInlineBlock",
                value: function isInlineBlock(tokens, index) {
                  var length = 0;
                  var level = 0;

                  for (var i = index; i < tokens.length; i++) {
                    var token = tokens[i];
                    length += token.value.length;

                    if (this.isForbiddenToken(token)) {
                      return false;
                    } // Overran max length

                    if (length > this.expressionWidth) {
                      return false;
                    }

                    if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.BLOCK_START
                    ) {
                      level++;
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.BLOCK_END
                    ) {
                      level--;

                      if (level === 0) {
                        return true;
                      }
                    }
                  }

                  return false;
                }, // Reserved words that cause newlines, comments and semicolons
                // are not allowed inside inline parentheses block
              },
              {
                key: "isForbiddenToken",
                value: function isForbiddenToken(token) {
                  return (
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                        .RESERVED_COMMAND ||
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                        .RESERVED_LOGICAL_OPERATOR || // token.type === TokenType.LINE_COMMENT ||
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType
                        .BLOCK_COMMENT ||
                    token.value === ";" ||
                    _token__WEBPACK_IMPORTED_MODULE_0__.isToken.CASE(token) // CASE cannot have inline blocks
                  );
                },
              },
            ]);

            return InlineBlock;
          })();

          /***/
        },

      /***/ "./src/core/Params.ts":
        /*!****************************!*\
  !*** ./src/core/Params.ts ***!
  \****************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ Params,
            /* harmony export */
          });
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /**
           * Handles placeholder replacement with given params.
           */
          var Params = /*#__PURE__*/ (function () {
            function Params(params) {
              _classCallCheck(this, Params);

              this.params = params;
              this.index = 0;
            }
            /**
             * Returns param value that matches given placeholder with param key.
             * @param {Token} token
             * @return {string} param or token.value when params are missing
             */

            _createClass(Params, [
              {
                key: "get",
                value: function get(_ref) {
                  var key = _ref.key,
                    value = _ref.value;

                  if (!this.params) {
                    return value;
                  }

                  if (key) {
                    return this.params[key];
                  }

                  return this.params[this.index++];
                },
              },
            ]);

            return Params;
          })();

          /***/
        },

      /***/ "./src/core/Parser.ts":
        /*!****************************!*\
  !*** ./src/core/Parser.ts ***!
  \****************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ Parser,
            /* harmony export */
          });
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /**
           * A rudimentary parser that slices token stream into list of SQL statements.
           */

          var Parser = /*#__PURE__*/ (function () {
            function Parser(tokens) {
              _classCallCheck(this, Parser);

              this.tokens = tokens;
              this.index = 0;
            }

            _createClass(Parser, [
              {
                key: "parse",
                value: function parse() {
                  var statements = [];
                  var stat;

                  while ((stat = this.statement())) {
                    statements.push(stat);
                  }

                  return statements;
                },
              },
              {
                key: "statement",
                value: function statement() {
                  var tokens = [];

                  while (true) {
                    if (this.look().value === ";") {
                      tokens.push(this.next());
                      return {
                        type: "statement",
                        tokens: tokens,
                      };
                    } else if (
                      this.look().type ===
                      _token__WEBPACK_IMPORTED_MODULE_0__.TokenType.EOF
                    ) {
                      if (tokens.length > 0) {
                        return {
                          type: "statement",
                          tokens: tokens,
                        };
                      } else {
                        return undefined;
                      }
                    } else {
                      tokens.push(this.next());
                    }
                  }
                }, // Returns current token without advancing the pointer
              },
              {
                key: "look",
                value: function look() {
                  return (
                    this.tokens[this.index] ||
                    _token__WEBPACK_IMPORTED_MODULE_0__.EOF_TOKEN
                  );
                }, // Returns current token and advances the pointer to next token
              },
              {
                key: "next",
                value: function next() {
                  return (
                    this.tokens[this.index++] ||
                    _token__WEBPACK_IMPORTED_MODULE_0__.EOF_TOKEN
                  );
                },
              },
            ]);

            return Parser;
          })();

          /***/
        },

      /***/ "./src/core/StatementFormatter.ts":
        /*!****************************************!*\
  !*** ./src/core/StatementFormatter.ts ***!
  \****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
              /* binding */ StatementFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          /* harmony import */ var _Indentation__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ./Indentation */ "./src/core/Indentation.ts",
            );
          /* harmony import */ var _InlineBlock__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(
              /*! ./InlineBlock */ "./src/core/InlineBlock.ts",
            );
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          /* harmony import */ var _tabularStyle__WEBPACK_IMPORTED_MODULE_4__ =
            __webpack_require__(
              /*! ./tabularStyle */ "./src/core/tabularStyle.ts",
            );
          /* harmony import */ var _AliasAs__WEBPACK_IMPORTED_MODULE_5__ =
            __webpack_require__(/*! ./AliasAs */ "./src/core/AliasAs.ts");
          /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ =
            __webpack_require__(/*! ./config */ "./src/core/config.ts");
          /* harmony import */ var _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__ =
            __webpack_require__(
              /*! ./WhitespaceBuilder */ "./src/core/WhitespaceBuilder.ts",
            );
          function _createForOfIteratorHelper(o, allowArrayLike) {
            var it =
              (typeof Symbol !== "undefined" && o[Symbol.iterator]) ||
              o["@@iterator"];
            if (!it) {
              if (
                Array.isArray(o) ||
                (it = _unsupportedIterableToArray(o)) ||
                (allowArrayLike && o && typeof o.length === "number")
              ) {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                  s: F,
                  n: function n() {
                    if (i >= o.length) return { done: true };
                    return { done: false, value: o[i++] };
                  },
                  e: function e(_e) {
                    throw _e;
                  },
                  f: F,
                };
              }
              throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            }
            var normalCompletion = true,
              didErr = false,
              err;
            return {
              s: function s() {
                it = it.call(o);
              },
              n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
              },
              e: function e(_e2) {
                didErr = true;
                err = _e2;
              },
              f: function f() {
                try {
                  if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                  if (didErr) throw err;
                }
              },
            };
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /** Formats single SQL statement */

          var StatementFormatter = /*#__PURE__*/ (function () {
            function StatementFormatter(cfg, params, asTokenFactory) {
              _classCallCheck(this, StatementFormatter);

              this.currentNewline = true;
              this.previousReservedToken =
                _token__WEBPACK_IMPORTED_MODULE_3__.EOF_TOKEN;
              this.previousCommandToken =
                _token__WEBPACK_IMPORTED_MODULE_3__.EOF_TOKEN;
              this.tokens = [];
              this.index = -1;
              this.cfg = cfg;
              this.indentation = new _Indentation__WEBPACK_IMPORTED_MODULE_1__[
                "default"
              ]((0, _config__WEBPACK_IMPORTED_MODULE_6__.indentString)(cfg));
              this.inlineBlock = new _InlineBlock__WEBPACK_IMPORTED_MODULE_2__[
                "default"
              ](this.cfg.expressionWidth);
              this.aliasAs = new _AliasAs__WEBPACK_IMPORTED_MODULE_5__[
                "default"
              ](this.cfg.aliasAs, this);
              this.params = params;
              this.asTokenFactory = asTokenFactory;
              this.query = new _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__[
                "default"
              ](this.indentation);
            }

            _createClass(StatementFormatter, [
              {
                key: "format",
                value: function format(statement) {
                  this.tokens = statement.tokens;

                  for (
                    this.index = 0;
                    this.index < this.tokens.length;
                    this.index++
                  ) {
                    var token = this.tokens[this.index]; // if token is a Reserved Keyword, Command, Binary Command, Dependent Clause, Logical Operator, CASE, END

                    if (
                      (0, _token__WEBPACK_IMPORTED_MODULE_3__.isReserved)(token)
                    ) {
                      this.previousReservedToken = token;

                      if (
                        token.type ===
                        _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                          .RESERVED_COMMAND
                      ) {
                        this.previousCommandToken = token;
                      }
                    }

                    if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.LINE_COMMENT
                    ) {
                      this.formatLineComment(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .BLOCK_COMMENT
                    ) {
                      this.formatBlockComment(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_COMMAND
                    ) {
                      this.currentNewline = this.checkNewline(token);
                      this.formatCommand(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_BINARY_COMMAND
                    ) {
                      this.formatBinaryCommand(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_DEPENDENT_CLAUSE
                    ) {
                      this.formatDependentClause(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_JOIN_CONDITION
                    ) {
                      this.formatJoinCondition(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_LOGICAL_OPERATOR
                    ) {
                      this.formatLogicalOperator(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_KEYWORD
                    ) {
                      this.formatKeyword(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.BLOCK_START
                    ) {
                      this.formatBlockStart(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.BLOCK_END
                    ) {
                      this.formatBlockEnd(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_CASE_START
                    ) {
                      this.formatCaseStart(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_CASE_END
                    ) {
                      this.formatCaseEnd(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.PLACEHOLDER
                    ) {
                      this.formatPlaceholder(token);
                    } else if (
                      token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.OPERATOR
                    ) {
                      this.formatOperator(token);
                    } else {
                      this.formatWord(token);
                    }
                  }

                  return this.query.toString();
                },
                /**
                 * Formats word tokens + any potential AS tokens for aliases
                 */
              },
              {
                key: "formatWord",
                value: function formatWord(token) {
                  if (this.aliasAs.shouldAddBefore(token)) {
                    this.query.add(
                      this.show(this.asTokenFactory.token()),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }

                  this.query.add(
                    this.show(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                  );

                  if (this.aliasAs.shouldAddAfter()) {
                    this.query.add(
                      this.show(this.asTokenFactory.token()),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
                /**
                 * Checks if a newline should currently be inserted
                 */
              },
              {
                key: "checkNewline",
                value: function checkNewline(token) {
                  var nextTokens = this.tokensUntilNextCommandOrQueryEnd(); // auto break if SELECT includes CASE statements

                  if (
                    this.isWithinSelect() &&
                    nextTokens.some(
                      _token__WEBPACK_IMPORTED_MODULE_3__.isToken.CASE,
                    )
                  ) {
                    return true;
                  }

                  switch (this.cfg.multilineLists) {
                    case "always":
                      return true;

                    case "avoid":
                      return false;

                    case "expressionWidth":
                      return (
                        this.inlineWidth(token, nextTokens) >
                        this.cfg.expressionWidth
                      );

                    default:
                      // multilineLists mode is a number
                      return (
                        this.countClauses(nextTokens) >
                          this.cfg.multilineLists ||
                        this.inlineWidth(token, nextTokens) >
                          this.cfg.expressionWidth
                      );
                  }
                },
              },
              {
                key: "inlineWidth",
                value: function inlineWidth(token, tokens) {
                  var tokensString = tokens
                    .map(function (_ref) {
                      var value = _ref.value;
                      return value === "," ? value + " " : value;
                    })
                    .join("");
                  return ""
                    .concat(token.whitespaceBefore)
                    .concat(token.value, " ")
                    .concat(tokensString).length;
                },
                /**
                 * Counts comma-separated clauses (doesn't count commas inside blocks)
                 * Note: There's always at least one clause.
                 */
              },
              {
                key: "countClauses",
                value: function countClauses(tokens) {
                  var count = 1;
                  var openBlocks = 0;

                  var _iterator = _createForOfIteratorHelper(tokens),
                    _step;

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                      var _step$value = _step.value,
                        type = _step$value.type,
                        value = _step$value.value;

                      if (value === "," && openBlocks === 0) {
                        count++;
                      }

                      if (
                        type ===
                        _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                          .BLOCK_START
                      ) {
                        openBlocks++;
                      }

                      if (
                        type ===
                        _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.BLOCK_END
                      ) {
                        openBlocks--;
                      }
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  return count;
                },
                /** get all tokens between current token and next Reserved Command or query end */
              },
              {
                key: "tokensUntilNextCommandOrQueryEnd",
                value: function tokensUntilNextCommandOrQueryEnd() {
                  var tail = this.tokens.slice(this.index + 1);
                  return tail.slice(
                    0,
                    tail.length
                      ? tail.findIndex(function (token) {
                          return (
                            (0, _token__WEBPACK_IMPORTED_MODULE_3__.isCommand)(
                              token,
                            ) || token.value === ";"
                          );
                        })
                      : undefined,
                  );
                },
                /** Formats a line comment onto query */
              },
              {
                key: "formatLineComment",
                value: function formatLineComment(token) {
                  this.query.add(
                    this.show(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.NEWLINE,
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                  );
                },
                /** Formats a block comment onto query */
              },
              {
                key: "formatBlockComment",
                value: function formatBlockComment(token) {
                  this.query.add(
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.NEWLINE,
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    this.indentComment(token.value),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.NEWLINE,
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                  );
                },
                /** Aligns comment to current indentation level */
              },
              {
                key: "indentComment",
                value: function indentComment(comment) {
                  return comment.replace(
                    /\n[\t ]*/g,
                    "\n" + this.indentation.getIndent() + " ",
                  );
                },
                /**
                 * Formats a Reserved Command onto query, increasing indentation level where necessary
                 */
              },
              {
                key: "formatCommand",
                value: function formatCommand(token) {
                  this.indentation.decreaseTopLevel();
                  this.query.add(
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.NEWLINE,
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                  ); // indent tabular formats, except when preceding a (

                  if (
                    (0, _config__WEBPACK_IMPORTED_MODULE_6__.isTabularStyle)(
                      this.cfg,
                    )
                  ) {
                    if (this.tokenLookAhead().value !== "(") {
                      this.indentation.increaseTopLevel();
                    }
                  } else {
                    this.indentation.increaseTopLevel();
                  }

                  if (
                    this.currentNewline &&
                    !(0, _config__WEBPACK_IMPORTED_MODULE_6__.isTabularStyle)(
                      this.cfg,
                    )
                  ) {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    );
                  } else {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
                /**
                 * Formats a Reserved Binary Command onto query, joining neighbouring tokens
                 */
              },
              {
                key: "formatBinaryCommand",
                value: function formatBinaryCommand(token) {
                  var isJoin = /JOIN/i.test(token.value); // check if token contains JOIN

                  if (
                    !isJoin ||
                    (0, _config__WEBPACK_IMPORTED_MODULE_6__.isTabularStyle)(
                      this.cfg,
                    )
                  ) {
                    // decrease for boolean set operators or in tabular mode
                    this.indentation.decreaseTopLevel();
                  }

                  if (isJoin) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  } else {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    );
                  }
                },
                /**
                 * Formats a Reserved Keyword onto query, skipping AS if disabled
                 */
              },
              {
                key: "formatKeyword",
                value: function formatKeyword(token) {
                  if (
                    _token__WEBPACK_IMPORTED_MODULE_3__.isToken.AS(token) &&
                    this.aliasAs.shouldRemove()
                  ) {
                    return;
                  }

                  this.query.add(
                    this.show(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                  );
                },
                /**
                 * Formats a Reserved Dependent Clause token onto query, supporting the keyword that precedes it
                 */
              },
              {
                key: "formatDependentClause",
                value: function formatDependentClause(token) {
                  this.query.add(
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.NEWLINE,
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    this.show(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                  );
                }, // Formats ON and USING keywords
              },
              {
                key: "formatJoinCondition",
                value: function formatJoinCondition(token) {
                  this.query.add(
                    this.show(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                  );
                },
                /**
                 * Formats an Operator onto query, following rules for specific characters
                 */
              },
              {
                key: "formatOperator",
                value: function formatOperator(token) {
                  // special operator
                  if (token.value === ",") {
                    this.formatComma(token);
                    return;
                  } else if (token.value === ";") {
                    this.formatQuerySeparator(token);
                    return;
                  } else if (["$", "["].includes(token.value)) {
                    this.query.add(this.show(token));
                    return;
                  } else if ([":", "]"].includes(token.value)) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                    return;
                  } else if ([".", "{", "}", "`"].includes(token.value)) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                    );
                    return;
                  } // other operators
                  // in dense operators mode do not trim whitespace if SELECT *

                  if (
                    this.cfg.denseOperators &&
                    this.tokenLookBehind().type !==
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_COMMAND
                  ) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                    );
                  } else {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
                /**
                 * Formats a Logical Operator onto query, joining boolean conditions
                 */
              },
              {
                key: "formatLogicalOperator",
                value: function formatLogicalOperator(token) {
                  // ignore AND when BETWEEN x [AND] y
                  if (
                    _token__WEBPACK_IMPORTED_MODULE_3__.isToken.AND(token) &&
                    _token__WEBPACK_IMPORTED_MODULE_3__.isToken.BETWEEN(
                      this.tokenLookBehind(2),
                    )
                  ) {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                    return;
                  }

                  if (
                    (0, _config__WEBPACK_IMPORTED_MODULE_6__.isTabularStyle)(
                      this.cfg,
                    )
                  ) {
                    this.indentation.decreaseTopLevel();
                  }

                  if (this.cfg.logicalOperatorNewline === "before") {
                    if (this.currentNewline) {
                      this.query.add(
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .NEWLINE,
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .INDENT,
                        this.show(token),
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .SPACE,
                      );
                    } else {
                      this.query.add(
                        this.show(token),
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .SPACE,
                      );
                    }
                  } else {
                    // eslint-disable-next-line no-lonely-if
                    if (this.currentNewline) {
                      this.query.add(
                        this.show(token),
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .NEWLINE,
                        _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                          .INDENT,
                      );
                    } else {
                      this.query.add(this.show(token));
                    }
                  }
                },
              },
              {
                key: "formatBlockStart",
                value: function formatBlockStart(token) {
                  var _a; // Take out the preceding space unless there was whitespace there in the original query
                  // or another opening parens or line comment

                  var preserveWhitespaceFor = [
                    _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.BLOCK_START,
                    _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.LINE_COMMENT,
                    _token__WEBPACK_IMPORTED_MODULE_3__.TokenType.OPERATOR,
                  ];

                  if (
                    ((_a = token.whitespaceBefore) === null || _a === void 0
                      ? void 0
                      : _a.length) === 0 &&
                    !preserveWhitespaceFor.includes(this.tokenLookBehind().type)
                  ) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                    );
                  } else if (!this.cfg.newlineBeforeOpenParen) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                      this.show(token),
                    );
                  } else {
                    this.query.add(this.show(token));
                  }

                  this.inlineBlock.beginIfPossible(this.tokens, this.index);

                  if (!this.inlineBlock.isActive()) {
                    this.indentation.increaseBlockLevel();
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    );
                  }
                },
              },
              {
                key: "formatBlockEnd",
                value: function formatBlockEnd(token) {
                  if (this.inlineBlock.isActive()) {
                    this.inlineBlock.end();
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  } else {
                    this.formatMultilineBlockEnd(token);
                  }
                },
              },
              {
                key: "formatCaseStart",
                value: function formatCaseStart(token) {
                  this.indentation.increaseBlockLevel();

                  if (this.cfg.multilineLists === "always") {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    );
                  } else {
                    this.query.add(
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
              },
              {
                key: "formatCaseEnd",
                value: function formatCaseEnd(token) {
                  this.formatMultilineBlockEnd(token);
                },
              },
              {
                key: "formatMultilineBlockEnd",
                value: function formatMultilineBlockEnd(token) {
                  this.indentation.decreaseBlockLevel();

                  if (
                    (0, _config__WEBPACK_IMPORTED_MODULE_6__.isTabularStyle)(
                      this.cfg,
                    )
                  ) {
                    // +1 extra indentation step for the closing paren
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .SINGLE_INDENT,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  } else if (this.cfg.newlineBeforeCloseParen) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  } else {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
                /**
                 * Formats a Placeholder item onto query, to be replaced with the value of the placeholder
                 */
              },
              {
                key: "formatPlaceholder",
                value: function formatPlaceholder(token) {
                  this.query.add(
                    this.params.get(token),
                    _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                  );
                },
                /**
                 * Formats a comma Operator onto query, ending line unless in an Inline Block
                 */
              },
              {
                key: "formatComma",
                value: function formatComma(token) {
                  if (
                    !this.inlineBlock.isActive() &&
                    !_token__WEBPACK_IMPORTED_MODULE_3__.isToken.LIMIT(
                      this.getPreviousReservedToken(),
                    ) &&
                    this.currentNewline
                  ) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.INDENT,
                    );
                  } else {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS.SPACE,
                    );
                  }
                },
              },
              {
                key: "formatQuerySeparator",
                value: function formatQuerySeparator(token) {
                  if (this.cfg.newlineBeforeSemicolon) {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NEWLINE,
                      this.show(token),
                    );
                  } else {
                    this.query.add(
                      _WhitespaceBuilder__WEBPACK_IMPORTED_MODULE_7__.WS
                        .NO_SPACE,
                      this.show(token),
                    );
                  }
                },
              },
              {
                key: "show",
                value: function show(token) {
                  if (this.isTabularToken(token)) {
                    return (0,
                    _tabularStyle__WEBPACK_IMPORTED_MODULE_4__["default"])(
                      this.showToken(token),
                      this.cfg.indentStyle,
                    );
                  } else {
                    return this.showToken(token);
                  }
                }, // These token types can be formatted in tabular style
              },
              {
                key: "isTabularToken",
                value: function isTabularToken(token) {
                  return (
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_LOGICAL_OPERATOR ||
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_DEPENDENT_CLAUSE ||
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_COMMAND ||
                    token.type ===
                      _token__WEBPACK_IMPORTED_MODULE_3__.TokenType
                        .RESERVED_BINARY_COMMAND
                  );
                }, // don't call this directly, always use show() instead.
              },
              {
                key: "showToken",
                value: function showToken(token) {
                  if (
                    (0, _token__WEBPACK_IMPORTED_MODULE_3__.isReserved)(token)
                  ) {
                    switch (this.cfg.keywordCase) {
                      case "preserve":
                        return (0,
                        src_utils__WEBPACK_IMPORTED_MODULE_0__.equalizeWhitespace)(
                          token.text,
                        );

                      case "upper":
                        return token.value;

                      case "lower":
                        return token.value.toLowerCase();
                    }
                  } else {
                    return token.value;
                  }
                },
                /** Returns the latest encountered reserved keyword token */
              },
              {
                key: "getPreviousReservedToken",
                value: function getPreviousReservedToken() {
                  return this.previousReservedToken;
                },
                /** True when currently within SELECT command */
              },
              {
                key: "isWithinSelect",
                value: function isWithinSelect() {
                  return _token__WEBPACK_IMPORTED_MODULE_3__.isToken.SELECT(
                    this.previousCommandToken,
                  );
                },
                /** Fetches nth previous token from the token stream */
              },
              {
                key: "tokenLookBehind",
                value: function tokenLookBehind() {
                  var n =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : 1;
                  return (
                    this.tokens[this.index - n] ||
                    _token__WEBPACK_IMPORTED_MODULE_3__.EOF_TOKEN
                  );
                },
                /** Fetches nth next token from the token stream */
              },
              {
                key: "tokenLookAhead",
                value: function tokenLookAhead() {
                  var n =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : 1;
                  return (
                    this.tokens[this.index + n] ||
                    _token__WEBPACK_IMPORTED_MODULE_3__.EOF_TOKEN
                  );
                },
              },
            ]);

            return StatementFormatter;
          })();

          /***/
        },

      /***/ "./src/core/Tokenizer.ts":
        /*!*******************************!*\
  !*** ./src/core/Tokenizer.ts ***!
  \*******************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ WHITESPACE_REGEX: () =>
              /* binding */ WHITESPACE_REGEX,
            /* harmony export */ default: () => /* binding */ Tokenizer,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          /* harmony import */ var _regexFactory__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! ./regexFactory */ "./src/core/regexFactory.ts",
            );
          /* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! ./token */ "./src/core/token.ts");
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          var WHITESPACE_REGEX =
            /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
          var NULL_REGEX = /(?!)/; // zero-width negative lookahead, matches nothing

          var toCanonicalKeyword = function toCanonicalKeyword(text) {
            return (0,
            src_utils__WEBPACK_IMPORTED_MODULE_0__.equalizeWhitespace)(
              text.toUpperCase(),
            );
          };
          /** Converts SQL language string into a token stream */

          var Tokenizer = /*#__PURE__*/ (function () {
            /**
             * @param {TokenizerOptions} cfg
             *  @param {string[]} cfg.reservedKeywords - Reserved words in SQL
             *  @param {string[]} cfg.reservedDependentClauses - Words that following a specific Statement and must have data attached
             *  @param {string[]} cfg.reservedLogicalOperators - Words that are set to newline
             *  @param {string[]} cfg.reservedCommands - Words that are set to new line separately
             *  @param {string[]} cfg.reservedBinaryCommands - Words that are top level but have no indentation
             *  @param {string[]} cfg.reservedJoinConditions - ON and USING
             *  @param {string[]} cfg.stringTypes - string types to enable - "", '', ``, [], N''
             *  @param {string[]} cfg.blockStart - Opening parentheses to enable, like (, [
             *  @param {string[]} cfg.blockEnd - Closing parentheses to enable, like ), ]
             *  @param {string[]} cfg.indexedPlaceholderTypes - Prefixes for indexed placeholders, like ?
             *  @param {string[]} cfg.namedPlaceholderTypes - Prefixes for named placeholders, like @ and :
             *  @param {string[]} cfg.lineCommentTypes - Line comments to enable, like # and --
             *  @param {string[]} cfg.specialWordChars - Special chars that can be found inside of words, like @ and #
             *  @param {string[]} cfg.operators - Additional operators to recognize
             *  @param {Function} cfg.preprocess - Optional function to process tokens before emitting
             */
            function Tokenizer(cfg) {
              var _this = this,
                _this$REGEX_MAP;

              _classCallCheck(this, Tokenizer);

              var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;

              this.preprocess = function (tokens) {
                return tokens;
              };
              /** Curried function of `getTokenOnFirstMatch` that allows token type to be passed first */

              this.matchToken = function (tokenType) {
                return function (input) {
                  return _this.getTokenOnFirstMatch({
                    input: input,
                    type: tokenType,
                    regex: _this.REGEX_MAP[tokenType],
                    transform: src_utils__WEBPACK_IMPORTED_MODULE_0__.id,
                  });
                };
              };

              if (cfg.preprocess) {
                this.preprocess = cfg.preprocess;
              }

              var specialWordCharsAll = Object.values(
                (_a = cfg.specialWordChars) !== null && _a !== void 0 ? _a : {},
              ).join("");
              this.REGEX_MAP =
                ((_this$REGEX_MAP = {}),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.WORD,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createWordRegex(
                    cfg.specialWordChars,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.STRING,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createStringRegex(
                    cfg.stringTypes,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    cfg.reservedKeywords,
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_DEPENDENT_CLAUSE,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    (_b = cfg.reservedDependentClauses) !== null &&
                      _b !== void 0
                      ? _b
                      : [],
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_LOGICAL_OPERATOR,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    (_c = cfg.reservedLogicalOperators) !== null &&
                      _c !== void 0
                      ? _c
                      : ["AND", "OR"],
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_COMMAND,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    cfg.reservedCommands,
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_BINARY_COMMAND,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    cfg.reservedBinaryCommands,
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_JOIN_CONDITION,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(
                    (_d = cfg.reservedJoinConditions) !== null && _d !== void 0
                      ? _d
                      : ["ON", "USING"],
                    specialWordCharsAll,
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.OPERATOR,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createOperatorRegex(
                    "+-/*%&|^><=.,;[]{}`:$@",
                    ["<>", "<=", ">=", "!="].concat(
                      _toConsumableArray(
                        (_e = cfg.operators) !== null && _e !== void 0
                          ? _e
                          : [],
                      ),
                    ),
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.BLOCK_START,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createParenRegex(
                    (_f = cfg.blockStart) !== null && _f !== void 0
                      ? _f
                      : ["("],
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.BLOCK_END,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createParenRegex(
                    (_g = cfg.blockEnd) !== null && _g !== void 0 ? _g : [")"],
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_CASE_START,
                  /^(CA[S\u017F]E)\b/i,
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_CASE_END,
                  /^(END)\b/i,
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.LINE_COMMENT,
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createLineCommentRegex(
                    (_h = cfg.lineCommentTypes) !== null && _h !== void 0
                      ? _h
                      : ["--"],
                  ),
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.BLOCK_COMMENT,
                  /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/,
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.NUMBER,
                  /^(0x[0-9A-Fa-f]+|0b[01]+|(\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]*)?([Ee][\+\x2D]?[0-9]+(\.[0-9]+)?)?)/,
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.PLACEHOLDER,
                  NULL_REGEX,
                ),
                _defineProperty(
                  _this$REGEX_MAP,
                  _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.EOF,
                  NULL_REGEX,
                ),
                _this$REGEX_MAP);
              this.INDEXED_PLACEHOLDER_REGEX =
                _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(
                  (_j = cfg.indexedPlaceholderTypes) !== null && _j !== void 0
                    ? _j
                    : [],
                  "[0-9]*",
                );
              this.IDENT_NAMED_PLACEHOLDER_REGEX =
                _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(
                  (_k = cfg.namedPlaceholderTypes) !== null && _k !== void 0
                    ? _k
                    : [],
                  "[a-zA-Z0-9._$]+",
                );
              this.STRING_NAMED_PLACEHOLDER_REGEX =
                _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(
                  (_l = cfg.namedPlaceholderTypes) !== null && _l !== void 0
                    ? _l
                    : [],
                  _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createStringPattern(
                    cfg.stringTypes,
                  ),
                );
            }
            /**
             * Takes a SQL string and breaks it into tokens.
             * Each token is an object with type and value.
             *
             * @param {string} input - The SQL string
             * @returns {Token[]} output token stream
             */

            _createClass(Tokenizer, [
              {
                key: "tokenize",
                value: function tokenize(input) {
                  var tokens = [];
                  var token; // Keep processing the string until it is empty

                  while (input.length) {
                    // grab any preceding whitespace
                    var whitespaceBefore = this.getWhitespace(input);
                    input = input.substring(whitespaceBefore.length);

                    if (input.length) {
                      // Get the next token and the token type
                      token = this.getNextToken(input, token);

                      if (!token) {
                        throw new Error(
                          'Parse error: Unexpected "'.concat(
                            input.slice(0, 100),
                            '"',
                          ),
                        );
                      } // Advance the string

                      input = input.substring(token.text.length);
                      tokens.push(
                        Object.assign(Object.assign({}, token), {
                          whitespaceBefore: whitespaceBefore,
                        }),
                      );
                    }
                  }

                  return this.preprocess(tokens);
                },
                /** Matches preceding whitespace if present */
              },
              {
                key: "getWhitespace",
                value: function getWhitespace(input) {
                  var matches = input.match(WHITESPACE_REGEX);
                  return matches ? matches[1] : "";
                },
                /** Attempts to match next token from input string, tests RegExp patterns in decreasing priority */
              },
              {
                key: "getNextToken",
                value: function getNextToken(input, previousToken) {
                  return (
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                        .LINE_COMMENT,
                    )(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                        .BLOCK_COMMENT,
                    )(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.STRING,
                    )(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.BLOCK_START,
                    )(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.BLOCK_END,
                    )(input) ||
                    this.getPlaceholderToken(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.NUMBER,
                    )(input) ||
                    this.getReservedWordToken(input, previousToken) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.WORD,
                    )(input) ||
                    this.matchToken(
                      _token__WEBPACK_IMPORTED_MODULE_2__.TokenType.OPERATOR,
                    )(input)
                  );
                },
                /**
                 * Attempts to match a placeholder token pattern
                 * @return {Token | undefined} - The placeholder token if found, otherwise undefined
                 */
              },
              {
                key: "getPlaceholderToken",
                value: function getPlaceholderToken(input) {
                  var _this2 = this;

                  var _a, _b, _c;

                  var placeholderTokenRegexMap = [
                    // pattern for placeholder with identifier name
                    {
                      regex:
                        (_a = this.IDENT_NAMED_PLACEHOLDER_REGEX) !== null &&
                        _a !== void 0
                          ? _a
                          : NULL_REGEX,
                      parseKey: function parseKey(v) {
                        return v.slice(1);
                      },
                    }, // pattern for placeholder with string name
                    {
                      regex:
                        (_b = this.STRING_NAMED_PLACEHOLDER_REGEX) !== null &&
                        _b !== void 0
                          ? _b
                          : NULL_REGEX,
                      parseKey: function parseKey(v) {
                        return _this2.getEscapedPlaceholderKey({
                          key: v.slice(2, -1),
                          quoteChar: v.slice(-1),
                        });
                      },
                    }, // pattern for placeholder with numeric index
                    {
                      regex:
                        (_c = this.INDEXED_PLACEHOLDER_REGEX) !== null &&
                        _c !== void 0
                          ? _c
                          : NULL_REGEX,
                      parseKey: function parseKey(v) {
                        return v.slice(1);
                      },
                    },
                  ];
                  return placeholderTokenRegexMap.reduce(function (acc, _ref) {
                    var regex = _ref.regex,
                      parseKey = _ref.parseKey;

                    var token = _this2.getTokenOnFirstMatch({
                      input: input,
                      regex: regex,
                      type: _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                        .PLACEHOLDER,
                      transform: src_utils__WEBPACK_IMPORTED_MODULE_0__.id,
                    });

                    return token
                      ? Object.assign(Object.assign({}, token), {
                          key: parseKey(token.value),
                        })
                      : acc;
                  }, undefined);
                },
              },
              {
                key: "getEscapedPlaceholderKey",
                value: function getEscapedPlaceholderKey(_ref2) {
                  var key = _ref2.key,
                    quoteChar = _ref2.quoteChar;
                  return key.replace(
                    new RegExp(
                      (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                        "\\" + quoteChar,
                      ),
                      "gu",
                    ),
                    quoteChar,
                  );
                },
                /**
                 * Attempts to match a Reserved word token pattern, avoiding edge cases of Reserved words within string tokens
                 * @return {Token | undefined} - The Reserved word token if found, otherwise undefined
                 */
              },
              {
                key: "getReservedWordToken",
                value: function getReservedWordToken(input, previousToken) {
                  var _this3 = this;

                  // A reserved word cannot be preceded by a '.'
                  // this makes it so in "mytable.from", "from" is not considered a reserved word
                  if (
                    (previousToken === null || previousToken === void 0
                      ? void 0
                      : previousToken.value) === "."
                  ) {
                    return undefined;
                  } // prioritised list of Reserved token types

                  var reservedTokenList = [
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_CASE_START,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_CASE_END,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_COMMAND,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_BINARY_COMMAND,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_DEPENDENT_CLAUSE,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_LOGICAL_OPERATOR,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_KEYWORD,
                    _token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .RESERVED_JOIN_CONDITION,
                  ];
                  return reservedTokenList.reduce(function (
                    matchedToken,
                    tokenType,
                  ) {
                    return (
                      matchedToken ||
                      _this3.getTokenOnFirstMatch({
                        input: input,
                        type: tokenType,
                        regex: _this3.REGEX_MAP[tokenType],
                        transform: toCanonicalKeyword,
                      })
                    );
                  }, undefined);
                },
                /**
                 * Attempts to match RegExp from head of input, returning undefined if not found
                 * @param {string} _.input - The string to match
                 * @param {TokenType} _.type - The type of token to match against
                 * @param {RegExp} _.regex - The regex to match
                 * @return {Token | undefined} - The matched token if found, otherwise undefined
                 */
              },
              {
                key: "getTokenOnFirstMatch",
                value: function getTokenOnFirstMatch(_ref3) {
                  var input = _ref3.input,
                    type = _ref3.type,
                    regex = _ref3.regex,
                    transform = _ref3.transform;
                  var matches = input.match(regex);

                  if (matches) {
                    return {
                      type: type,
                      text: matches[1],
                      value: transform(matches[1]),
                    };
                  }

                  return undefined;
                },
              },
            ]);

            return Tokenizer;
          })();

          /***/
        },

      /***/ "./src/core/WhitespaceBuilder.ts":
        /*!***************************************!*\
  !*** ./src/core/WhitespaceBuilder.ts ***!
  \***************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ WS: () => /* binding */ WS,
            /* harmony export */ default: () => /* binding */ WhitespaceBuilder,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          /** Whitespace modifiers to be used with add() method */

          var WS;

          (function (WS) {
            WS[(WS["SPACE"] = 1)] = "SPACE";
            WS[(WS["NO_SPACE"] = 2)] = "NO_SPACE";
            WS[(WS["NEWLINE"] = 3)] = "NEWLINE";
            WS[(WS["NO_NEWLINE"] = 4)] = "NO_NEWLINE";
            WS[(WS["INDENT"] = 5)] = "INDENT";
            WS[(WS["SINGLE_INDENT"] = 6)] = "SINGLE_INDENT";
          })(WS || (WS = {}));
          /**
           * API for constructing SQL string (especially the whitespace part).
           *
           * It hides the internal implementation.
           * Originally it used plain string concatenation, which was expensive.
           * Now it's storing items to array and builds the string only in the end.
           */

          var WhitespaceBuilder = /*#__PURE__*/ (function () {
            function WhitespaceBuilder(indentation) {
              _classCallCheck(this, WhitespaceBuilder);

              this.indentation = indentation;
              this.query = [];
            }
            /**
             * Appends token strings and whitespace modifications to SQL string.
             */

            _createClass(WhitespaceBuilder, [
              {
                key: "add",
                value: function add() {
                  for (
                    var _len = arguments.length,
                      items = new Array(_len),
                      _key = 0;
                    _key < _len;
                    _key++
                  ) {
                    items[_key] = arguments[_key];
                  }

                  for (var _i = 0, _items = items; _i < _items.length; _i++) {
                    var item = _items[_i];

                    switch (item) {
                      case WS.SPACE:
                        this.query.push(WS.SPACE);
                        break;

                      case WS.NO_SPACE:
                        this.trimHorizontalWhitespace();
                        break;

                      case WS.NEWLINE:
                        this.trimHorizontalWhitespace();
                        this.addNewline();
                        break;

                      case WS.NO_NEWLINE:
                        this.trimAllWhitespace();
                        break;

                      case WS.INDENT:
                        for (var i = 0; i < this.indentation.getLevel(); i++) {
                          this.query.push(WS.SINGLE_INDENT);
                        }

                        break;

                      case WS.SINGLE_INDENT:
                        this.query.push(WS.SINGLE_INDENT);
                        break;

                      default:
                        this.query.push(item);
                    }
                  }
                },
              },
              {
                key: "trimHorizontalWhitespace",
                value: function trimHorizontalWhitespace() {
                  while (
                    isHorizontalWhitespace(
                      (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.last)(
                        this.query,
                      ),
                    )
                  ) {
                    this.query.pop();
                  }
                },
              },
              {
                key: "trimAllWhitespace",
                value: function trimAllWhitespace() {
                  while (
                    isWhitespace(
                      (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.last)(
                        this.query,
                      ),
                    )
                  ) {
                    this.query.pop();
                  }
                },
              },
              {
                key: "addNewline",
                value: function addNewline() {
                  if (
                    this.query.length > 0 &&
                    (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.last)(
                      this.query,
                    ) !== WS.NEWLINE
                  ) {
                    this.query.push(WS.NEWLINE);
                  }
                },
                /**
                 * Returns the final SQL string.
                 */
              },
              {
                key: "toString",
                value: function toString() {
                  var _this = this;

                  return this.query
                    .map(function (item) {
                      return _this.itemToString(item);
                    })
                    .join("");
                },
              },
              {
                key: "itemToString",
                value: function itemToString(item) {
                  switch (item) {
                    case WS.SPACE:
                      return " ";

                    case WS.NEWLINE:
                      return "\n";

                    case WS.SINGLE_INDENT:
                      return this.indentation.getSingleIndent();

                    default:
                      return item;
                  }
                },
              },
            ]);

            return WhitespaceBuilder;
          })();

          var isHorizontalWhitespace = function isHorizontalWhitespace(item) {
            return item === WS.SPACE || item === WS.SINGLE_INDENT;
          };

          var isWhitespace = function isWhitespace(item) {
            return (
              item === WS.SPACE ||
              item === WS.SINGLE_INDENT ||
              item === WS.NEWLINE
            );
          };

          /***/
        },

      /***/ "./src/core/config.ts":
        /*!****************************!*\
  !*** ./src/core/config.ts ***!
  \****************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ indentString: () => /* binding */ indentString,
            /* harmony export */ isTabularStyle: () =>
              /* binding */ isTabularStyle,
            /* harmony export */
          });
          // Utility functions for config options

          /**
           * Creates a string to use for one step of indentation.
           */
          function indentString(cfg) {
            if (
              cfg.indentStyle === "tabularLeft" ||
              cfg.indentStyle === "tabularRight"
            ) {
              return " ".repeat(10);
            }

            if (cfg.useTabs) {
              return "\t";
            }

            return " ".repeat(cfg.tabWidth);
          }
          /**
           * True when indentStyle is one of the tabular ones.
           */

          function isTabularStyle(cfg) {
            return (
              cfg.indentStyle === "tabularLeft" ||
              cfg.indentStyle === "tabularRight"
            );
          }

          /***/
        },

      /***/ "./src/core/formatAliasPositions.ts":
        /*!******************************************!*\
  !*** ./src/core/formatAliasPositions.ts ***!
  \******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
              /* binding */ formatAliasPositions,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          /**
           * Handles select alias placement - tabulates if enabled
           */

          function formatAliasPositions(query) {
            var lines = query.split("\n");
            var newQuery = [];

            for (var i = 0; i < lines.length; i++) {
              // find SELECT rows with trailing comma, if no comma (only one row) - no-op
              if (lines[i].match(/^\s*SELECT/i)) {
                var _ret = (function () {
                  var aliasLines = [];

                  if (lines[i].match(/.*,$/)) {
                    aliasLines = [lines[i]]; // add select to aliasLines in case of tabular formats
                  } else {
                    newQuery.push(lines[i]); // add select to new query

                    if (lines[i].match(/^\s*SELECT\s+.+(?!,$)/i)) {
                      return "continue";
                    }

                    aliasLines.push(lines[++i]);
                  } // get all lines in SELECT clause

                  while (lines[i++].match(/.*,$/)) {
                    aliasLines.push(lines[i]);
                  } // break lines into alias with optional AS, and all preceding text

                  var splitLines = aliasLines
                    .map(function (line) {
                      return {
                        line: line,
                        matches: line.match(/(^.*?\S) (AS )?(\S+,?$)/i),
                      };
                    })
                    .map(function (_ref) {
                      var line = _ref.line,
                        matches = _ref.matches;

                      if (!matches) {
                        return {
                          precedingText: line,
                        };
                      }

                      return {
                        precedingText: matches[1],
                        as: matches[2],
                        alias: matches[3],
                      };
                    }); // get longest of precedingText, trim trailing comma for non-alias columns

                  var aliasMaxLength = (0,
                  src_utils__WEBPACK_IMPORTED_MODULE_0__.maxLength)(
                    splitLines.map(function (_ref2) {
                      var precedingText = _ref2.precedingText;
                      return precedingText.replace(/\s*,\s*$/, "");
                    }),
                  ); // re-construct line, aligning by inserting space before AS or alias

                  aliasLines = splitLines.map(function (_ref3) {
                    var precedingText = _ref3.precedingText,
                      as = _ref3.as,
                      alias = _ref3.alias;
                    return (
                      precedingText +
                      (alias
                        ? " ".repeat(
                            aliasMaxLength - precedingText.length + 1,
                          ) +
                          (as !== null && as !== void 0 ? as : "") +
                          alias
                        : "")
                    );
                  });
                  newQuery = [].concat(
                    _toConsumableArray(newQuery),
                    _toConsumableArray(aliasLines),
                  );
                })();

                if (_ret === "continue") continue;
              }

              newQuery.push(lines[i]);
            }

            return newQuery.join("\n");
          }

          /***/
        },

      /***/ "./src/core/formatCommaPositions.ts":
        /*!******************************************!*\
  !*** ./src/core/formatCommaPositions.ts ***!
  \******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
              /* binding */ formatCommaPositions,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          /* harmony import */ var _Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(/*! ./Tokenizer */ "./src/core/Tokenizer.ts");
          function _slicedToArray(arr, i) {
            return (
              _arrayWithHoles(arr) ||
              _iterableToArrayLimit(arr, i) ||
              _unsupportedIterableToArray(arr, i) ||
              _nonIterableRest()
            );
          }

          function _nonIterableRest() {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _iterableToArrayLimit(arr, i) {
            var _i =
              arr == null
                ? null
                : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
                  arr["@@iterator"];
            if (_i == null) return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _s, _e;
            try {
              for (
                _i = _i.call(arr);
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }

          /**
           * Handles comma placement - either before, after or tabulated
           */

          function formatCommaPositions(query, commaPosition, indent) {
            return groupCommaDelimitedLines(query.split("\n"))
              .flatMap(function (commaLines) {
                if (commaLines.length === 1) {
                  return commaLines;
                } else if (commaPosition === "tabular") {
                  return formatTabular(commaLines);
                } else if (commaPosition === "before") {
                  return formatBefore(commaLines, indent);
                } else {
                  throw new Error(
                    "Unexpected commaPosition: ".concat(commaPosition),
                  );
                }
              })
              .join("\n");
          }
          /**
           * Given lines like this:
           *
           *     [
           *       'SELECT',
           *       '  foo,',
           *       '  bar,',
           *       '  baz',
           *       'FROM'
           *     ]
           *
           * Returns groups like this:
           *
           *     [
           *       ['SELECT'],
           *       ['  foo,', '  bar,', '  baz'],
           *       ['FROM']
           *     ]
           */

          function groupCommaDelimitedLines(lines) {
            var groups = [];

            for (var i = 0; i < lines.length; i++) {
              var group = [lines[i]]; // when line ends with comma,
              // gather together all following lines that also end with comma,
              // plus one (which doesn't end with comma)

              while (lines[i].match(/.*,$/)) {
                i++;
                group.push(lines[i]);
              }

              groups.push(group);
            }

            return groups;
          } // makes all lines the same length by appending spaces before comma

          function formatTabular(commaLines) {
            var maxLineLength = (0,
            src_utils__WEBPACK_IMPORTED_MODULE_0__.maxLength)(commaLines);
            return trimTrailingCommas(commaLines).map(function (line, i) {
              if (i === commaLines.length - 1) {
                return line; // do not add comma for last item
              }

              return line + " ".repeat(maxLineLength - line.length - 1) + ",";
            });
          }

          function formatBefore(commaLines, indent) {
            return trimTrailingCommas(commaLines).map(function (line, i) {
              if (i === 0) {
                return line; // do not add comma for first item
              }

              var _ref = line.match(
                  _Tokenizer__WEBPACK_IMPORTED_MODULE_1__.WHITESPACE_REGEX,
                ) || [""],
                _ref2 = _slicedToArray(_ref, 1),
                whitespace = _ref2[0];

              return (
                removeLastIndent(whitespace, indent) +
                indent.replace(/ {2}$/, ", ") + // add comma to the end of last indent
                line.trimStart()
              );
            });
          }

          function removeLastIndent(whitespace, indent) {
            return whitespace.replace(new RegExp(indent + "$"), "");
          }

          function trimTrailingCommas(lines) {
            return lines.map(function (line) {
              return line.replace(/,$/, "");
            });
          }

          /***/
        },

      /***/ "./src/core/regexFactory.ts":
        /*!**********************************!*\
  !*** ./src/core/regexFactory.ts ***!
  \**********************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ createLineCommentRegex: () =>
              /* binding */ createLineCommentRegex,
            /* harmony export */ createOperatorRegex: () =>
              /* binding */ createOperatorRegex,
            /* harmony export */ createParenRegex: () =>
              /* binding */ createParenRegex,
            /* harmony export */ createPlaceholderRegex: () =>
              /* binding */ createPlaceholderRegex,
            /* harmony export */ createReservedWordRegex: () =>
              /* binding */ createReservedWordRegex,
            /* harmony export */ createStringPattern: () =>
              /* binding */ createStringPattern,
            /* harmony export */ createStringRegex: () =>
              /* binding */ createStringRegex,
            /* harmony export */ createWordRegex: () =>
              /* binding */ createWordRegex,
            /* harmony export */
          });
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");

          /**
           * Builds a RegExp containing all operators for a SQL dialect
           * @param {string} monadOperators - concatenated string of all 1-length operators
           * @param {string[]} polyadOperators - list of strings of all >1-length operators
           */

          var createOperatorRegex = function createOperatorRegex(
            monadOperators,
            polyadOperators,
          ) {
            return new RegExp(
              "^(".concat(
                (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.sortByLengthDesc)(
                  polyadOperators,
                )
                  .map(src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)
                  .join("|"),
                "|",
              ) +
                "[".concat(
                  monadOperators
                    .split("")
                    .map(src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)
                    .join(""),
                  "])",
                ),
              "u",
            );
          };
          /**
           * Builds a RegExp for valid line comments in a SQL dialect
           * @param {string[]} lineCommentTypes - list of character strings that denote line comments
           */

          var createLineCommentRegex = function createLineCommentRegex(
            lineCommentTypes,
          ) {
            return new RegExp(
              "^((?:".concat(
                lineCommentTypes
                  .map(function (c) {
                    return (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(c);
                  })
                  .join("|"),
                ").*?)(?:\r\n|\r|\n|$)",
              ),
              "u",
            );
          };
          /**
           * Builds a RegExp for all Reserved Keywords in a SQL dialect
           * @param {string[]} reservedKeywords - list of strings of all Reserved Keywords
           * @param {string} specialWordChars - concatenated string of all special chars that can appear in valid identifiers (and not in Reserved Keywords)
           */

          var createReservedWordRegex = function createReservedWordRegex(
            reservedKeywords,
          ) {
            var specialWordChars =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : "";

            if (reservedKeywords.length === 0) {
              return /^\b$/;
            }

            var reservedKeywordsPattern = (0,
            src_utils__WEBPACK_IMPORTED_MODULE_0__.sortByLengthDesc)(
              reservedKeywords,
            )
              .join("|")
              .replace(/ /g, "\\s+");
            return new RegExp(
              "^("
                .concat(reservedKeywordsPattern, ")(?![")
                .concat(
                  (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                    specialWordChars,
                  ),
                  "]+)\\b",
                ),
              "iu",
            );
          };
          /**
           * Builds a RegExp for valid identifiers in a SQL dialect
           * @param {Object} specialChars
           * @param {string} specialChars.any - concatenated string of chars that can appear anywhere in a valid identifier
           * @param {string} specialChars.prefix - concatenated string of chars that only appear at the beginning of a valid identifier
           * @param {string} specialChars.suffix - concatenated string of chars that only appear at the end of a valid identifier
           */

          var createWordRegex = function createWordRegex() {
            var specialChars =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};

            var _a, _b, _c;

            var prefixLookBehind = "[".concat(
              (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                (_a = specialChars.prefix) !== null && _a !== void 0 ? _a : "",
              ),
              "]*",
            );
            var suffixLookAhead = "[".concat(
              (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                (_b = specialChars.suffix) !== null && _b !== void 0 ? _b : "",
              ),
              "]*",
            );
            var unicodeWordChar =
              "\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}";
            var specialWordChars = "".concat(
              (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                (_c = specialChars.any) !== null && _c !== void 0 ? _c : "",
              ),
            );
            var arrayAccessor = "\\[\\d\\]";
            var mapAccessor = "\\[['\"][".concat(unicodeWordChar, "]+['\"]\\]");
            return new RegExp(
              "^(("
                .concat(prefixLookBehind, "([")
                .concat(unicodeWordChar)
                .concat(specialWordChars, "]+)")
                .concat(suffixLookAhead, ")(")
                .concat(arrayAccessor, "|")
                .concat(mapAccessor, ")?)"),
              "u",
            );
          }; // This enables the following string patterns:
          // 1. backtick quoted string using `` to escape
          // 2. square bracket quoted string (SQL Server) using ]] to escape
          // 3. double quoted string using "" or \" to escape
          // 4. single quoted string using '' or \' to escape
          // 5. national character quoted string using N'' or N\' to escape
          // 6. Unicode single-quoted string using \' to escape
          // 7. Unicode double-quoted string using \" to escape
          // 8. PostgreSQL dollar-quoted strings

          var patterns = {
            "``": "((`[^`]*($|`))+)",
            "{}": "((\\{[^\\}]*($|\\}))+)",
            "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
            '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
            "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "N''": "((N'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "x''": "(([xX]'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "E''": "((E'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
            $$: "((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))",
          };
          /**
           * Builds a string pattern for matching string patterns for all given string types
           * @param {StringPatternType[]} stringTypes - list of strings that denote string patterns
           */

          var createStringPattern = function createStringPattern(stringTypes) {
            return stringTypes
              .map(function (t) {
                return patterns[t];
              })
              .join("|");
          };
          /**
           * Builds a RegExp for matching string patterns using `createStringPattern`
           * @param {StringPatternType[]} stringTypes - list of strings that denote string patterns
           */

          var createStringRegex = function createStringRegex(stringTypes) {
            return new RegExp(
              "^(" + createStringPattern(stringTypes) + ")",
              "u",
            );
          };
          /** Escapes paren characters for RegExp patterns */

          var escapeParen = function escapeParen(paren) {
            if (paren.length === 1) {
              // A single punctuation character
              return (0, src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(
                paren,
              );
            } else {
              // longer word
              return "\\b" + paren + "\\b";
            }
          };
          /**
           * Builds a RegExp for matching parenthesis patterns, escaping them with `escapeParen`
           * @param {string[]} parens - list of strings that denote parenthesis patterns
           */

          var createParenRegex = function createParenRegex(parens) {
            return new RegExp(
              "^(" + parens.map(escapeParen).join("|") + ")",
              "iu",
            );
          };
          /**
           * Builds a RegExp for placeholder patterns
           * @param {string[]} types - list of strings that denote placeholder types
           * @param {string} pattern - string that denotes placeholder pattern
           */

          var createPlaceholderRegex = function createPlaceholderRegex(
            types,
            pattern,
          ) {
            if ((0, src_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(types)) {
              return undefined;
            }

            var typesRegex = types
              .map(src_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)
              .join("|");
            return new RegExp(
              "^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"),
              "u",
            );
          };

          /***/
        },

      /***/ "./src/core/tabularStyle.ts":
        /*!**********************************!*\
  !*** ./src/core/tabularStyle.ts ***!
  \**********************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ toTabularFormat,
            /* harmony export */
          });
          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _toArray(arr) {
            return (
              _arrayWithHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableRest()
            );
          }

          function _nonIterableRest() {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }

          /**
           * When tabular style enabled,
           * produces a 10-char wide version of token text.
           */
          function toTabularFormat(tokenText, indentStyle) {
            if (indentStyle === "standard") {
              return tokenText;
            }

            var tail = []; // rest of keyword

            if (tokenText.length >= 10 && tokenText.includes(" ")) {
              // split for long keywords like INNER JOIN or UNION DISTINCT
              var _tokenText$split = tokenText.split(" ");

              var _tokenText$split2 = _toArray(_tokenText$split);

              tokenText = _tokenText$split2[0];
              tail = _tokenText$split2.slice(1);
            }

            if (indentStyle === "tabularLeft") {
              tokenText = tokenText.padEnd(9, " ");
            } else {
              tokenText = tokenText.padStart(9, " ");
            }

            return tokenText + [""].concat(_toConsumableArray(tail)).join(" ");
          }

          /***/
        },

      /***/ "./src/core/token.ts":
        /*!***************************!*\
  !*** ./src/core/token.ts ***!
  \***************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ EOF_TOKEN: () => /* binding */ EOF_TOKEN,
            /* harmony export */ TokenType: () => /* binding */ TokenType,
            /* harmony export */ isCommand: () => /* binding */ isCommand,
            /* harmony export */ isReserved: () => /* binding */ isReserved,
            /* harmony export */ isToken: () => /* binding */ isToken,
            /* harmony export */ testToken: () => /* binding */ testToken,
            /* harmony export */
          });
          /** Token type enum for all possible Token categories */
          var TokenType;

          (function (TokenType) {
            TokenType["WORD"] = "WORD";
            TokenType["STRING"] = "STRING";
            TokenType["RESERVED_KEYWORD"] = "RESERVED_KEYWORD";
            TokenType["RESERVED_LOGICAL_OPERATOR"] =
              "RESERVED_LOGICAL_OPERATOR";
            TokenType["RESERVED_DEPENDENT_CLAUSE"] =
              "RESERVED_DEPENDENT_CLAUSE";
            TokenType["RESERVED_BINARY_COMMAND"] = "RESERVED_BINARY_COMMAND";
            TokenType["RESERVED_COMMAND"] = "RESERVED_COMMAND";
            TokenType["RESERVED_JOIN_CONDITION"] = "RESERVED_JOIN_CONDITION";
            TokenType["RESERVED_CASE_START"] = "RESERVED_CASE_START";
            TokenType["RESERVED_CASE_END"] = "RESERVED_CASE_END";
            TokenType["OPERATOR"] = "OPERATOR";
            TokenType["BLOCK_START"] = "BLOCK_START";
            TokenType["BLOCK_END"] = "BLOCK_END";
            TokenType["LINE_COMMENT"] = "LINE_COMMENT";
            TokenType["BLOCK_COMMENT"] = "BLOCK_COMMENT";
            TokenType["NUMBER"] = "NUMBER";
            TokenType["PLACEHOLDER"] = "PLACEHOLDER";
            TokenType["EOF"] = "EOF";
          })(TokenType || (TokenType = {}));
          /**
           * For use as a "missing token"
           * e.g. in lookAhead and lookBehind to avoid dealing with null values
           */

          var EOF_TOKEN = {
            type: TokenType.EOF,
            text: "«EOF»",
            value: "«EOF»",
          };
          /** Checks if two tokens are equivalent */

          var testToken = function testToken(compareToken) {
            return function (token) {
              return (
                token.type === compareToken.type &&
                token.value === compareToken.value
              );
            };
          };
          /** Util object that allows for easy checking of Reserved Keywords */

          var isToken = {
            AS: testToken({
              value: "AS",
              type: TokenType.RESERVED_KEYWORD,
            }),
            AND: testToken({
              value: "AND",
              type: TokenType.RESERVED_LOGICAL_OPERATOR,
            }),
            BETWEEN: testToken({
              value: "BETWEEN",
              type: TokenType.RESERVED_KEYWORD,
            }),
            CASE: testToken({
              value: "CASE",
              type: TokenType.RESERVED_CASE_START,
            }),
            CAST: testToken({
              value: "CAST",
              type: TokenType.RESERVED_KEYWORD,
            }),
            BY: testToken({
              value: "BY",
              type: TokenType.RESERVED_KEYWORD,
            }),
            END: testToken({
              value: "END",
              type: TokenType.RESERVED_CASE_END,
            }),
            FROM: testToken({
              value: "FROM",
              type: TokenType.RESERVED_COMMAND,
            }),
            LIMIT: testToken({
              value: "LIMIT",
              type: TokenType.RESERVED_COMMAND,
            }),
            SELECT: testToken({
              value: "SELECT",
              type: TokenType.RESERVED_COMMAND,
            }),
            SET: testToken({
              value: "SET",
              type: TokenType.RESERVED_COMMAND,
            }),
            TABLE: testToken({
              value: "TABLE",
              type: TokenType.RESERVED_KEYWORD,
            }),
            WINDOW: testToken({
              value: "WINDOW",
              type: TokenType.RESERVED_COMMAND,
            }),
            WITH: testToken({
              value: "WITH",
              type: TokenType.RESERVED_COMMAND,
            }),
          };
          /** Checks if token is a Reserved Command or Reserved Binary Command */

          var isCommand = function isCommand(token) {
            return (
              token.type === TokenType.RESERVED_COMMAND ||
              token.type === TokenType.RESERVED_BINARY_COMMAND
            );
          };
          /** Checks if token is any Reserved Keyword or Command */

          var isReserved = function isReserved(token) {
            return (
              token.type === TokenType.RESERVED_KEYWORD ||
              token.type === TokenType.RESERVED_LOGICAL_OPERATOR ||
              token.type === TokenType.RESERVED_DEPENDENT_CLAUSE ||
              token.type === TokenType.RESERVED_JOIN_CONDITION ||
              token.type === TokenType.RESERVED_COMMAND ||
              token.type === TokenType.RESERVED_BINARY_COMMAND ||
              token.type === TokenType.RESERVED_CASE_START ||
              token.type === TokenType.RESERVED_CASE_END
            );
          };

          /***/
        },

      /***/ "./src/languages/bigquery.formatter.ts":
        /*!*********************************************!*\
  !*** ./src/languages/bigquery.formatter.ts ***!
  \*********************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ BigQueryFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_core_token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/core/token */ "./src/core/token.ts");
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */

          var reservedFunctions = {
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions
            aead: [
              "KEYS.NEW_KEYSET",
              "KEYS.ADD_KEY_FROM_RAW_BYTES",
              "AEAD.DECRYPT_BYTES",
              "AEAD.DECRYPT_STRING",
              "AEAD.ENCRYPT",
              "KEYS.KEYSET_CHAIN",
              "KEYS.KEYSET_FROM_JSON",
              "KEYS.KEYSET_TO_JSON",
              "KEYS.ROTATE_KEYSET",
              "KEYS.KEYSET_LENGTH",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_analytic_functions
            aggregateAnalytic: [
              "ANY_VALUE",
              "ARRAY_AGG",
              "AVG",
              "CORR",
              "COUNT",
              "COUNTIF",
              "COVAR_POP",
              "COVAR_SAMP",
              "MAX",
              "MIN",
              "ST_CLUSTERDBSCAN",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "STRING_AGG",
              "SUM",
              "VAR_POP",
              "VAR_SAMP",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
            aggregate: [
              "ANY_VALUE",
              "ARRAY_AGG",
              "ARRAY_CONCAT_AGG",
              "AVG",
              "BIT_AND",
              "BIT_OR",
              "BIT_XOR",
              "COUNT",
              "COUNTIF",
              "LOGICAL_AND",
              "LOGICAL_OR",
              "MAX",
              "MIN",
              "STRING_AGG",
              "SUM",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions
            approximateAggregate: [
              "APPROX_COUNT_DISTINCT",
              "APPROX_QUANTILES",
              "APPROX_TOP_COUNT",
              "APPROX_TOP_SUM",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions
            array: [
              "ARRAY",
              "ARRAY_CONCAT",
              "ARRAY_LENGTH",
              "ARRAY_TO_STRING",
              "GENERATE_ARRAY",
              "GENERATE_DATE_ARRAY",
              "GENERATE_TIMESTAMP_ARRAY",
              "ARRAY_REVERSE",
              "OFFSET",
              "SAFE_OFFSET",
              "ORDINAL",
              "SAFE_ORDINAL",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions
            bitwise: ["BIT_COUNT"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions
            conversion: [
              // 'CASE',
              "PARSE_BIGNUMERIC",
              "PARSE_NUMERIC",
              "SAFE_CAST",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
            date: [
              "CURRENT_DATE",
              "EXTRACT",
              "DATE",
              "DATE_ADD",
              "DATE_SUB",
              "DATE_DIFF",
              "DATE_TRUNC",
              "DATE_FROM_UNIX_DATE",
              "FORMAT_DATE",
              "LAST_DAY",
              "PARSE_DATE",
              "UNIX_DATE",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions
            datetime: [
              "CURRENT_DATETIME",
              "DATETIME",
              "EXTRACT",
              "DATETIME_ADD",
              "DATETIME_SUB",
              "DATETIME_DIFF",
              "DATETIME_TRUNC",
              "FORMAT_DATETIME",
              "LAST_DAY",
              "PARSE_DATETIME",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging_functions
            debugging: ["ERROR"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/federated_query_functions
            federatedQuery: ["EXTERNAL_QUERY"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions
            geography: [
              "S2_CELLIDFROMPOINT",
              "S2_COVERINGCELLIDS",
              "ST_ANGLE",
              "ST_AREA",
              "ST_ASBINARY",
              "ST_ASGEOJSON",
              "ST_ASTEXT",
              "ST_AZIMUTH",
              "ST_BOUNDARY",
              "ST_BOUNDINGBOX",
              "ST_BUFFER",
              "ST_BUFFERWITHTOLERANCE",
              "ST_CENTROID",
              "ST_CENTROID_AGG",
              "ST_CLOSESTPOINT",
              "ST_CLUSTERDBSCAN",
              "ST_CONTAINS",
              "ST_CONVEXHULL",
              "ST_COVEREDBY",
              "ST_COVERS",
              "ST_DIFFERENCE",
              "ST_DIMENSION",
              "ST_DISJOINT",
              "ST_DISTANCE",
              "ST_DUMP",
              "ST_DWITHIN",
              "ST_ENDPOINT",
              "ST_EQUALS",
              "ST_EXTENT",
              "ST_EXTERIORRING",
              "ST_GEOGFROM",
              "ST_GEOGFROMGEOJSON",
              "ST_GEOGFROMTEXT",
              "ST_GEOGFROMWKB",
              "ST_GEOGPOINT",
              "ST_GEOGPOINTFROMGEOHASH",
              "ST_GEOHASH",
              "ST_GEOMETRYTYPE",
              "ST_INTERIORRINGS",
              "ST_INTERSECTION",
              "ST_INTERSECTS",
              "ST_INTERSECTSBOX",
              "ST_ISCOLLECTION",
              "ST_ISEMPTY",
              "ST_LENGTH",
              "ST_MAKELINE",
              "ST_MAKEPOLYGON",
              "ST_MAKEPOLYGONORIENTED",
              "ST_MAXDISTANCE",
              "ST_NPOINTS",
              "ST_NUMGEOMETRIES",
              "ST_NUMPOINTS",
              "ST_PERIMETER",
              "ST_POINTN",
              "ST_SIMPLIFY",
              "ST_SNAPTOGRID",
              "ST_STARTPOINT",
              "ST_TOUCHES",
              "ST_UNION",
              "ST_UNION_AGG",
              "ST_WITHIN",
              "ST_X",
              "ST_Y",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions
            hash: ["FARM_FINGERPRINT", "MD5", "SHA1", "SHA256", "SHA512"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions
            hll: [
              "HLL_COUNT.INIT",
              "HLL_COUNT.MERGE",
              "HLL_COUNT.MERGE_PARTIAL",
              "HLL_COUNT.EXTRACT",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/interval_functions
            interval: [
              "MAKE_INTERVAL",
              "EXTRACT",
              "JUSTIFY_DAYS",
              "JUSTIFY_HOURS",
              "JUSTIFY_INTERVAL",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions
            json: [
              "JSON_EXTRACT",
              "JSON_QUERY",
              "JSON_EXTRACT_SCALAR",
              "JSON_VALUE",
              "JSON_EXTRACT_ARRAY",
              "JSON_QUERY_ARRAY",
              "JSON_EXTRACT_STRING_ARRAY",
              "JSON_VALUE_ARRAY",
              "TO_JSON_STRING",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions
            math: [
              "ABS",
              "SIGN",
              "IS_INF",
              "IS_NAN",
              "IEEE_DIVIDE",
              "RAND",
              "SQRT",
              "POW",
              "POWER",
              "EXP",
              "LN",
              "LOG",
              "LOG10",
              "GREATEST",
              "LEAST",
              "DIV",
              "SAFE_DIVIDE",
              "SAFE_MULTIPLY",
              "SAFE_NEGATE",
              "SAFE_ADD",
              "SAFE_SUBTRACT",
              "MOD",
              "ROUND",
              "TRUNC",
              "CEIL",
              "CEILING",
              "FLOOR",
              "COS",
              "COSH",
              "ACOS",
              "ACOSH",
              "SIN",
              "SINH",
              "ASIN",
              "ASINH",
              "TAN",
              "TANH",
              "ATAN",
              "ATANH",
              "ATAN2",
              "RANGE_BUCKET",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions
            navigation: [
              "FIRST_VALUE",
              "LAST_VALUE",
              "NTH_VALUE",
              "LEAD",
              "LAG",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions
            net: [
              "NET.IP_FROM_STRING",
              "NET.SAFE_IP_FROM_STRING",
              "NET.IP_TO_STRING",
              "NET.IP_NET_MASK",
              "NET.IP_TRUNC",
              "NET.IPV4_FROM_INT64",
              "NET.IPV4_TO_INT64",
              "NET.HOST",
              "NET.PUBLIC_SUFFIX",
              "NET.REG_DOMAIN",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions
            numbering: [
              "RANK",
              "DENSE_RANK",
              "PERCENT_RANK",
              "CUME_DIST",
              "NTILE",
              "ROW_NUMBER",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/security_functions
            security: ["SESSION_USER"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions
            statisticalAggregate: [
              "CORR",
              "COVAR_POP",
              "COVAR_SAMP",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "STDDEV",
              "VAR_POP",
              "VAR_SAMP",
              "VARIANCE",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions
            string: [
              "ASCII",
              "BYTE_LENGTH",
              "CHAR_LENGTH",
              "CHARACTER_LENGTH",
              "CHR",
              "CODE_POINTS_TO_BYTES",
              "CODE_POINTS_TO_STRING",
              "CONCAT",
              "CONTAINS_SUBSTR",
              "ENDS_WITH",
              "FORMAT",
              "FROM_BASE32",
              "FROM_BASE64",
              "FROM_HEX",
              "INITCAP",
              "INSTR",
              "LEFT",
              "LENGTH",
              "LPAD",
              "LOWER",
              "LTRIM",
              "NORMALIZE",
              "NORMALIZE_AND_CASEFOLD",
              "OCTET_LENGTH",
              "REGEXP_CONTAINS",
              "REGEXP_EXTRACT",
              "REGEXP_EXTRACT_ALL",
              "REGEXP_INSTR",
              "REGEXP_REPLACE",
              "REGEXP_SUBSTR",
              "REPLACE",
              "REPEAT",
              "REVERSE",
              "RIGHT",
              "RPAD",
              "RTRIM",
              "SAFE_CONVERT_BYTES_TO_STRING",
              "SOUNDEX",
              "SPLIT",
              "STARTS_WITH",
              "STRPOS",
              "SUBSTR",
              "SUBSTRING",
              "TO_BASE32",
              "TO_BASE64",
              "TO_CODE_POINTS",
              "TO_HEX",
              "TRANSLATE",
              "TRIM",
              "UNICODE",
              "UPPER",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions
            time: [
              "CURRENT_TIME",
              "TIME",
              "EXTRACT",
              "TIME_ADD",
              "TIME_SUB",
              "TIME_DIFF",
              "TIME_TRUNC",
              "FORMAT_TIME",
              "PARSE_TIME",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions
            timestamp: [
              "CURRENT_TIMESTAMP",
              "EXTRACT",
              "STRING",
              "TIMESTAMP",
              "TIMESTAMP_ADD",
              "TIMESTAMP_SUB",
              "TIMESTAMP_DIFF",
              "TIMESTAMP_TRUNC",
              "FORMAT_TIMESTAMP",
              "PARSE_TIMESTAMP",
              "TIMESTAMP_SECONDS",
              "TIMESTAMP_MILLIS",
              "TIMESTAMP_MICROS",
              "UNIX_SECONDS",
              "UNIX_MILLIS",
              "UNIX_MICROS",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/uuid_functions
            uuid: ["GENERATE_UUID"],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions
            conditional: ["COALESCE", "IF", "IFNULL", "NULLIF"],
            // https://cloud.google.com/bigquery/docs/reference/legacy-sql
            legacyAggregate: [
              "AVG",
              "BIT_AND",
              "BIT_OR",
              "BIT_XOR",
              "CORR",
              "COUNT",
              "COVAR_POP",
              "COVAR_SAMP",
              "EXACT_COUNT_DISTINCT",
              "FIRST",
              "GROUP_CONCAT",
              "GROUP_CONCAT_UNQUOTED",
              "LAST",
              "MAX",
              "MIN",
              "NEST",
              "NTH",
              "QUANTILES",
              "STDDEV",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "SUM",
              "TOP",
              "UNIQUE",
              "VARIANCE",
              "VAR_POP",
              "VAR_SAMP",
            ],
            legacyBitwise: ["BIT_COUNT"],
            legacyCasting: [
              "BOOLEAN",
              "BYTES",
              "CAST",
              "FLOAT",
              "HEX_STRING",
              "INTEGER",
              "STRING",
            ],
            legacyComparison: [
              // expr 'IN',
              "COALESCE",
              "GREATEST",
              "IFNULL",
              "IS_INF",
              "IS_NAN",
              "IS_EXPLICITLY_DEFINED",
              "LEAST",
              "NVL",
            ],
            legacyDatetime: [
              "CURRENT_DATE",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "DATE",
              "DATE_ADD",
              "DATEDIFF",
              "DAY",
              "DAYOFWEEK",
              "DAYOFYEAR",
              "FORMAT_UTC_USEC",
              "HOUR",
              "MINUTE",
              "MONTH",
              "MSEC_TO_TIMESTAMP",
              "NOW",
              "PARSE_UTC_USEC",
              "QUARTER",
              "SEC_TO_TIMESTAMP",
              "SECOND",
              "STRFTIME_UTC_USEC",
              "TIME",
              "TIMESTAMP",
              "TIMESTAMP_TO_MSEC",
              "TIMESTAMP_TO_SEC",
              "TIMESTAMP_TO_USEC",
              "USEC_TO_TIMESTAMP",
              "UTC_USEC_TO_DAY",
              "UTC_USEC_TO_HOUR",
              "UTC_USEC_TO_MONTH",
              "UTC_USEC_TO_WEEK",
              "UTC_USEC_TO_YEAR",
              "WEEK",
              "YEAR",
            ],
            legacyIp: [
              "FORMAT_IP",
              "PARSE_IP",
              "FORMAT_PACKED_IP",
              "PARSE_PACKED_IP",
            ],
            legacyJson: ["JSON_EXTRACT", "JSON_EXTRACT_SCALAR"],
            legacyMath: [
              "ABS",
              "ACOS",
              "ACOSH",
              "ASIN",
              "ASINH",
              "ATAN",
              "ATANH",
              "ATAN2",
              "CEIL",
              "COS",
              "COSH",
              "DEGREES",
              "EXP",
              "FLOOR",
              "LN",
              "LOG",
              "LOG2",
              "LOG10",
              "PI",
              "POW",
              "RADIANS",
              "RAND",
              "ROUND",
              "SIN",
              "SINH",
              "SQRT",
              "TAN",
              "TANH",
            ],
            legacyRegex: ["REGEXP_MATCH", "REGEXP_EXTRACT", "REGEXP_REPLACE"],
            legacyString: [
              "CONCAT", // expr CONTAINS 'str'
              "INSTR",
              "LEFT",
              "LENGTH",
              "LOWER",
              "LPAD",
              "LTRIM",
              "REPLACE",
              "RIGHT",
              "RPAD",
              "RTRIM",
              "SPLIT",
              "SUBSTR",
              "UPPER",
            ],
            legacyTableWildcard: [
              "TABLE_DATE_RANGE",
              "TABLE_DATE_RANGE_STRICT",
              "TABLE_QUERY",
            ],
            legacyUrl: ["HOST", "DOMAIN", "TLD"],
            legacyWindow: [
              "AVG",
              "COUNT",
              "MAX",
              "MIN",
              "STDDEV",
              "SUM",
              "CUME_DIST",
              "DENSE_RANK",
              "FIRST_VALUE",
              "LAG",
              "LAST_VALUE",
              "LEAD",
              "NTH_VALUE",
              "NTILE",
              "PERCENT_RANK",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "RANK",
              "RATIO_TO_REPORT",
              "ROW_NUMBER",
            ],
            legacyMisc: [
              "CURRENT_USER",
              "EVERY",
              "FROM_BASE64",
              "HASH",
              "FARM_FINGERPRINT",
              "IF",
              "POSITION",
              "SHA1",
              "SOME",
              "TO_BASE64",
            ],
            other: ["BQ.JOBS.CANCEL", "BQ.REFRESH_MATERIALIZED_VIEW"],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */

          var reservedKeywords = {
            keywords: [
              "ALL", // 'AND',
              "ANY", // 'ARRAY',
              "AS",
              "ASC",
              "ASSERT_ROWS_MODIFIED",
              "AT",
              "BETWEEN",
              "BY", // 'CASE',
              "CAST",
              "COLLATE",
              "CONTAINS", // 'CREATE',
              // 'CROSS',
              "CUBE",
              "CURRENT",
              "DEFAULT",
              "DEFINE",
              "DESC",
              "DISTINCT", // 'ELSE',
              // 'END',
              "ENUM",
              "ESCAPE", // 'EXCEPT',
              // 'EXCLUDE',
              "EXISTS",
              "EXTRACT",
              "FALSE", // 'FETCH',
              "FOLLOWING",
              "FOR", // 'FROM',
              "FULL", // 'GROUP',
              "GROUPING",
              "GROUPS",
              "HASH", // 'HAVING',
              "IF",
              "IGNORE",
              "IN", // 'INNER',
              // 'INTERSECT',
              // 'INTERVAL',
              "INTO",
              "IS", // 'JOIN',
              // 'LATERAL',
              // 'LEFT',
              "LIKE", // 'LIMIT',
              "LOOKUP", // 'MERGE',
              // 'NATURAL',
              "NEW",
              "NO",
              "NOT",
              "NULL",
              "NULLS",
              "OF", // 'ON',
              // 'OR',
              // 'ORDER',
              // 'OUTER',
              "OVER",
              "PARTITION",
              "PRECEDING",
              "PROTO",
              "RANGE",
              "RECURSIVE",
              "RESPECT", // 'RIGHT',
              "ROLLUP",
              "ROWS", // 'SELECT',
              // 'SET',
              "SOME", // 'STRUCT',
              "TABLE", // 'TABLESAMPLE',
              "THEN",
              "TO",
              "TREAT",
              "TRUE",
              "UNBOUNDED", // 'UNION',
              // 'UNNEST',
              // 'USING',
              // 'WHEN',
              // 'WHERE',
              // 'WINDOW',
              // 'WITH',
              "WITHIN",
            ],
            datatypes: [
              "ARRAY",
              "BOOL",
              "BYTES",
              "DATE",
              "DATETIME",
              "GEOGRAPHY",
              "INTERVAL",
              "INT64",
              "INT",
              "SMALLINT",
              "INTEGER",
              "BIGINT",
              "TINYINT",
              "BYTEINT",
              "NUMERIC",
              "DECIMAL",
              "BIGNUMERIC",
              "BIGDECIMAL",
              "FLOAT64",
              "STRING",
              "STRUCT",
              "TIME",
              "TIMEZONE",
            ],
            // https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions#formatting_syntax
            stringFormat: ["HEX", "BASEX", "BASE64M", "ASCII", "UTF-8", "UTF8"],
            misc: ["SAFE"],
          };
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */

          var reservedCommands = [
            // DQL, https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
            "SELECT",
            "FROM",
            "UNNEST",
            "PIVOT",
            "UNPIVOT",
            "TABLESAMPLE SYSTEM",
            "WHERE",
            "GROUP BY",
            "HAVING",
            "ORDER BY",
            "QUALIFY",
            "WINDOW",
            "LIMIT",
            "OFFSET",
            "WITH",
            "OMIT RECORD IF", // DML, https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax
            "INSERT",
            "INSERT INTO",
            "VALUES",
            "DELETE",
            "DELETE FROM",
            "TRUNCATE TABLE",
            "UPDATE",
            "MERGE",
            "MERGE INTO", // 'USING',
            // DDL, https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
            "SET SCHEMA",
            "CREATE SCHEMA",
            "CREATE TABLE",
            "CREATE TABLE LIKE",
            "CREATE TABLE COPY",
            "CREATE SNAPSHOT TABLE",
            "CREATE TABLE CLONE",
            "CREATE VIEW",
            "CREATE MATERIALIZED VIEW",
            "CREATE EXTERNAL TABLE",
            "CREATE FUNCTION",
            "CREATE TABLE FUNCTION",
            "CREATE PROCEDURE",
            "CREATE ROW ACCESS POLICY",
            "ALTER SCHEMA SET OPTIONS",
            "ALTER TABLE SET OPTIONS",
            "ALTER TABLE ADD COLUMN",
            "ALTER TABLE RENAME TO",
            "ALTER TABLE DROP COLUMN",
            "ALTER COLUMN SET OPTIONS",
            "ALTER COLUMN DROP NOT NULL",
            "ALTER COLUMN SET DATA TYPE",
            "ALTER VIEW SET OPTIONS",
            "ALTER MATERIALIZED VIEW SET OPTIONS",
            "DROP SCHEMA",
            "DROP TABLE",
            "DROP SNAPSHOT TABLE",
            "DROP EXTERNAL TABLE",
            "DROP VIEW",
            "DROP MATERIALIZED VIEW",
            "DROP FUNCTION",
            "DROP TABLE FUNCTION",
            "DROP PROCEDURE",
            "DROP ROW ACCESS POLICY", // DCL, https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language
            "GRANT",
            "REVOKE",
            "CREATE CAPACITY",
            "CREATE RESERVATION",
            "CREATE ASSIGNMENT",
            "DROP CAPACITY",
            "DROP RESERVATION",
            "DROP ASSIGNMENT", // Script, https://cloud.google.com/bigquery/docs/reference/standard-sql/scripting
            "DECLARE",
            "SET",
            "EXECUTE IMMEDIATE",
            "LOOP",
            "END LOOP",
            "REPEAT",
            "END REPEAT",
            "WHILE",
            "END WHILE",
            "BREAK",
            "LEAVE",
            "CONTINUE",
            "ITERATE",
            "FOR",
            "END FOR",
            "BEGIN",
            "BEGIN TRANSACTION",
            "COMMIT TRANSACTION",
            "ROLLBACK TRANSACTION",
            "RAISE",
            "RETURN",
            "CALL", // Debug, https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements
            "ASSERT", // Other, https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements
            "EXPORT DATA",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // https://cloud.google.com/bigquery/docs/reference/#standard-sql-reference

          var BigQueryFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(BigQueryFormatter, _Formatter);

            var _super = _createSuper(BigQueryFormatter);

            function BigQueryFormatter() {
              _classCallCheck(this, BigQueryFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(BigQueryFormatter, [
              {
                key: "tokenizer",
                // TODO: handle trailing comma in select clause
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_3__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        _toConsumableArray(
                          Object.values(reservedKeywords).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                      ),
                    ),
                    stringTypes: BigQueryFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    lineCommentTypes: ["--", "#"],
                    specialWordChars: {
                      any: "_@$-",
                    },
                    operators: BigQueryFormatter.operators,
                    preprocess: preprocess,
                  });
                },
              },
            ]);

            return BigQueryFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          BigQueryFormatter.stringTypes = ['""', "''", "``"]; // add: '''''', """""" ; prefixes: r, b

          BigQueryFormatter.operators = [">>", "<<", "||"];

          function preprocess(tokens) {
            var processed = [];

            for (var i = 0; i < tokens.length; i++) {
              var token = tokens[i];
              var nextToken =
                tokens[i + 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;

              if (
                (token.value === "ARRAY" || token.value === "STRUCT") &&
                nextToken.value === "<"
              ) {
                var endIndex = findClosingAngleBracketIndex(tokens, i + 1);
                var typeDefTokens = tokens.slice(i, endIndex + 1);
                processed.push(
                  Object.assign(Object.assign({}, token), {
                    value: typeDefTokens
                      .map(function (t) {
                        return t.value;
                      })
                      .join(""),
                    text: typeDefTokens
                      .map(function (t) {
                        return t.text;
                      })
                      .join(""),
                  }),
                );
                i = endIndex;
              } else {
                processed.push(token);
              }
            }

            return processed;
          }

          function findClosingAngleBracketIndex(tokens, startIndex) {
            var level = 0;

            for (var i = startIndex; i < tokens.length; i++) {
              var token = tokens[i];

              if (token.value === "<") {
                level++;
              } else if (token.value === ">") {
                level--;
              } else if (token.value === ">>") {
                level -= 2;
              }

              if (level === 0) {
                return i;
              }
            }

            return tokens.length - 1;
          }

          /***/
        },

      /***/ "./src/languages/db2.formatter.ts":
        /*!****************************************!*\
  !*** ./src/languages/db2.formatter.ts ***!
  \****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ Db2Formatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */

          var reservedFunctions = {
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-aggregate
            aggregate: [
              "ARRAY_AGG",
              "AVG",
              "CORR",
              "CORRELATION",
              "COUNT",
              "COUNT_BIG",
              "COVAR_POP",
              "COVARIANCE",
              "COVAR",
              "COVAR_SAMP",
              "COVARIANCE_SAMP",
              "CUME_DIST",
              "GROUPING",
              "LISTAGG",
              "MAX",
              "MEDIAN",
              "MIN",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "PERCENT_RANK",
              "REGR_AVGX",
              "REGR_AVGY",
              "REGR_COUNT",
              "REGR_INTERCEPT",
              "REGR_ICPT",
              "REGR_R2",
              "REGR_SLOPE",
              "REGR_SXX",
              "REGR_SXY",
              "REGR_SYY",
              "STDDEV_POP",
              "STDDEV",
              "STDDEV_SAMP",
              "SUM",
              "VAR_POP",
              "VARIANCE",
              "VAR",
              "VAR_SAMP",
              "VARIANCE_SAMP",
              "XMLAGG",
            ],
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-scalar
            scalar: [
              "ABS",
              "ABSVAL",
              "ACOS",
              "ADD_DAYS",
              "ADD_MONTHS",
              "ARRAY_DELETE",
              "ARRAY_FIRST",
              "ARRAY_LAST",
              "ARRAY_NEXT",
              "ARRAY_PRIOR",
              "ARRAY_TRIM",
              "ASCII",
              "ASCII_CHR",
              "ASCII_STR",
              "ASCIISTR",
              "ASIN",
              "ATAN",
              "ATANH",
              "ATAN2",
              "BIGINT",
              "BINARY",
              "BITAND",
              "BITANDNOT",
              "BITOR",
              "BITXOR",
              "BITNOT",
              "BLOB",
              "BTRIM",
              "CARDINALITY",
              "CCSID_ENCODING",
              "CEILING",
              "CEIL",
              "CHAR",
              "CHAR9",
              "CHARACTER_LENGTH",
              "CHAR_LENGTH",
              "CHR",
              "CLOB",
              "COALESCE",
              "COLLATION_KEY",
              "COMPARE_DECFLOAT",
              "CONCAT",
              "CONTAINS",
              "COS",
              "COSH",
              "DATE",
              "DAY",
              "DAYOFMONTH",
              "DAYOFWEEK",
              "DAYOFWEEK_ISO",
              "DAYOFYEAR",
              "DAYS",
              "DAYS_BETWEEN",
              "DBCLOB",
              "DECFLOAT",
              "DECFLOAT_FORMAT",
              "DECFLOAT_SORTKEY",
              "DECIMAL",
              "DEC",
              "DECODE",
              "DECRYPT_BINARY",
              "DECRYPT_BIT",
              "DECRYPT_CHAR",
              "DECRYPT_DB",
              "DECRYPT_DATAKEY_BIGINT",
              "DECRYPT_DATAKEY_BIT",
              "DECRYPT_DATAKEY_CLOB",
              "DECRYPT_DATAKEY_DBCLOB",
              "DECRYPT_DATAKEY_DECIMAL",
              "DECRYPT_DATAKEY_INTEGER",
              "DECRYPT_DATAKEY_VARCHAR",
              "DECRYPT_DATAKEY_VARGRAPHIC",
              "DEGREES",
              "DIFFERENCE",
              "DIGITS",
              "DOUBLE_PRECISION",
              "DOUBLE",
              "DSN_XMLVALIDATE",
              "EBCDIC_CHR",
              "EBCDIC_STR",
              "ENCRYPT_DATAKEY",
              "ENCRYPT_TDES",
              "EXP",
              "EXTRACT",
              "FLOAT",
              "FLOOR",
              "GENERATE_UNIQUE",
              "GENERATE_UNIQUE_BINARY",
              "GETHINT",
              "GETVARIABLE",
              "GRAPHIC",
              "GREATEST",
              "HASH",
              "HASH_CRC32",
              "HASH_MD5",
              "HASH_SHA1",
              "HASH_SHA256",
              "HEX",
              "HOUR",
              "IDENTITY_VAL_LOCAL",
              "IFNULL",
              "INSERT",
              "INSTR",
              "INTEGER",
              "INT",
              "JULIAN_DAY",
              "LAST_DAY",
              "LCASE",
              "LEAST",
              "LEFT",
              "LENGTH",
              "LN",
              "LOCATE",
              "LOCATE_IN_STRING",
              "LOG10",
              "LOWER",
              "LPAD",
              "LTRIM",
              "MAX",
              "MAX_CARDINALITY",
              "MICROSECOND",
              "MIDNIGHT_SECONDS",
              "MIN",
              "MINUTE",
              "MOD",
              "MONTH",
              "MONTHS_BETWEEN",
              "MQREAD",
              "MQREADCLOB",
              "MQRECEIVE",
              "MQRECEIVECLOB",
              "MQSEND",
              "MULTIPLY_ALT",
              "NEXT_DAY",
              "NEXT_MONTH",
              "NORMALIZE_DECFLOAT",
              "NORMALIZE_STRING",
              "NULLIF",
              "NVL",
              "OVERLAY",
              "PACK",
              "POSITION",
              "POSSTR",
              "POWER",
              "POW",
              "QUANTIZE",
              "QUARTER",
              "RADIANS",
              "RAISE_ERROR",
              "RANDOM",
              "RAND",
              "REAL",
              "REGEXP_COUNT",
              "REGEXP_INSTR",
              "REGEXP_LIKE",
              "REGEXP_REPLACE",
              "REGEXP_SUBSTR",
              "REPEAT",
              "REPLACE",
              "RID",
              "RIGHT",
              "ROUND",
              "ROUND_TIMESTAMP",
              "ROWID",
              "RPAD",
              "RTRIM",
              "SCORE",
              "SECOND",
              "SIGN",
              "SIN",
              "SINH",
              "SMALLINT",
              "SOUNDEX",
              "SOAPHTTPC",
              "SOAPHTTPV",
              "SOAPHTTPNC",
              "SOAPHTTPNV",
              "SPACE",
              "SQRT",
              "STRIP",
              "STRLEFT",
              "STRPOS",
              "STRRIGHT",
              "SUBSTR",
              "SUBSTRING",
              "TAN",
              "TANH",
              "TIME",
              "TIMESTAMP",
              "TIMESTAMPADD",
              "TIMESTAMPDIFF",
              "TIMESTAMP_FORMAT",
              "TIMESTAMP_ISO",
              "TIMESTAMP_TZ",
              "TO_CHAR",
              "TO_CLOB",
              "TO_DATE",
              "TO_NUMBER",
              "TOTALORDER",
              "TO_TIMESTAMP",
              "TRANSLATE",
              "TRIM",
              "TRIM_ARRAY",
              "TRUNCATE",
              "TRUNC",
              "TRUNC_TIMESTAMP",
              "UCASE",
              "UNICODE",
              "UNICODE_STR",
              "UNISTR",
              "UPPER",
              "VALUE",
              "VARBINARY",
              "VARCHAR",
              "VARCHAR9",
              "VARCHAR_BIT_FORMAT",
              "VARCHAR_FORMAT",
              "VARGRAPHIC",
              "VERIFY_GROUP_FOR_USER",
              "VERIFY_ROLE_FOR_USER",
              "VERIFY_TRUSTED_CONTEXT_ROLE_FOR_USER",
              "WEEK",
              "WEEK_ISO",
              "WRAP",
              "XMLATTRIBUTES",
              "XMLCOMMENT",
              "XMLCONCAT",
              "XMLDOCUMENT",
              "XMLELEMENT",
              "XMLFOREST",
              "XMLMODIFY",
              "XMLNAMESPACES",
              "XMLPARSE",
              "XMLPI",
              "XMLQUERY",
              "XMLSERIALIZE",
              "XMLTEXT",
              "XMLXSROBJECTID",
              "XSLTRANSFORM",
              "YEAR",
            ],
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-table
            table: [
              "ADMIN_TASK_LIST",
              "ADMIN_TASK_OUTPUT",
              "ADMIN_TASK_STATUS",
              "BLOCKING_THREADS",
              "MQREADALL",
              "MQREADALLCLOB",
              "MQRECEIVEALL",
              "MQRECEIVEALLCLOB",
              "XMLTABLE",
            ],
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-row
            row: ["UNPACK"],
            // https://www.ibm.com/docs/en/db2-for-zos/12?topic=expressions-olap-specification
            olap: [
              "FIRST_VALUE",
              "LAG",
              "LAST_VALUE",
              "LEAD",
              "NTH_VALUE",
              "NTILE",
              "RATIO_TO_REPORT",
            ],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */

          var reservedKeywords = {
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=words-reserved#db2z_reservedwords__newresword
            standard: [
              "ALL",
              "ALLOCATE",
              "ALLOW",
              "ALTERAND",
              "ANY",
              "AS",
              "ARRAY",
              "ARRAY_EXISTS",
              "ASENSITIVE",
              "ASSOCIATE",
              "ASUTIME",
              "AT",
              "AUDIT",
              "AUX",
              "AUXILIARY",
              "BEFORE",
              "BEGIN",
              "BETWEEN",
              "BUFFERPOOL",
              "BY",
              "CAPTURE",
              "CASCADED",
              "CAST",
              "CCSID",
              "CHARACTER",
              "CHECK",
              "CLONE",
              "CLUSTER",
              "COLLECTION",
              "COLLID",
              "COLUMN",
              "CONDITION",
              "CONNECTION",
              "CONSTRAINT",
              "CONTENT",
              "CONTINUE",
              "CREATE",
              "CUBE",
              "CURRENT",
              "CURRENT_DATE",
              "CURRENT_LC_CTYPE",
              "CURRENT_PATH",
              "CURRENT_SCHEMA",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "CURRVAL",
              "CURSOR",
              "DATA",
              "DATABASE",
              "DBINFO",
              "DECLARE",
              "DEFAULT",
              "DESCRIPTOR",
              "DETERMINISTIC",
              "DISABLE",
              "DISALLOW",
              "DISTINCT",
              "DO",
              "DOCUMENT",
              "DSSIZE",
              "DYNAMIC",
              "EDITPROC",
              "ENCODING",
              "ENCRYPTION",
              "ENDING",
              "END-EXEC",
              "ERASE",
              "ESCAPE",
              "EXCEPTION",
              "EXISTS",
              "EXIT",
              "EXTERNAL",
              "FENCED",
              "FIELDPROC",
              "FINAL",
              "FIRST",
              "FOR",
              "FREE",
              "FULL",
              "FUNCTION",
              "GENERATED",
              "GET",
              "GLOBAL",
              "GOTO",
              "GROUP",
              "HANDLER",
              "HOLD",
              "HOURS",
              "IF",
              "IMMEDIATE",
              "IN",
              "INCLUSIVE",
              "INDEX",
              "INHERIT",
              "INNER",
              "INOUT",
              "INSENSITIVE",
              "INTO",
              "IS",
              "ISOBID",
              "ITERATE",
              "JAR",
              "KEEP",
              "KEY",
              "LANGUAGE",
              "LAST",
              "LC_CTYPE",
              "LEAVE",
              "LIKE",
              "LOCAL",
              "LOCALE",
              "LOCATOR",
              "LOCATORS",
              "LOCK",
              "LOCKMAX",
              "LOCKSIZE",
              "LONG",
              "LOOP",
              "MAINTAINED",
              "MATERIALIZED",
              "MICROSECONDS",
              "MINUTEMINUTES",
              "MODIFIES",
              "MONTHS",
              "NEXT",
              "NEXTVAL",
              "NO",
              "NONE",
              "NOT",
              "NULL",
              "NULLS",
              "NUMPARTS",
              "OBID",
              "OF",
              "OLD",
              "ON DELETE",
              "ON UPDATE",
              "OPTIMIZATION",
              "OPTIMIZE",
              "ORDER",
              "ORGANIZATION",
              "OUT",
              "OUTER",
              "PACKAGE",
              "PARAMETER",
              "PART",
              "PADDED",
              "PARTITION",
              "PARTITIONED",
              "PARTITIONING",
              "PATH",
              "PIECESIZE",
              "PERIOD",
              "PLAN",
              "PRECISION",
              "PREVVAL",
              "PRIOR",
              "PRIQTY",
              "PRIVILEGES",
              "PROCEDURE",
              "PROGRAM",
              "PSID",
              "PUBLIC",
              "QUERY",
              "QUERYNO",
              "READS",
              "REFERENCES",
              "RESIGNAL",
              "RESTRICT",
              "RESULT",
              "RESULT_SET_LOCATOR",
              "RETURN",
              "RETURNS",
              "ROLE",
              "ROLLUP",
              "ROUND_CEILING",
              "ROUND_DOWN",
              "ROUND_FLOOR",
              "ROUND_HALF_DOWN",
              "ROUND_HALF_EVEN",
              "ROUND_HALF_UP",
              "ROUND_UP",
              "ROW",
              "ROWSET",
              "SCHEMA",
              "SCRATCHPAD",
              "SECONDS",
              "SECQTY",
              "SECURITY",
              "SEQUENCE",
              "SENSITIVE",
              "SESSION_USER",
              "SIMPLE",
              "SOME",
              "SOURCE",
              "SPECIFIC",
              "STANDARD",
              "STATIC",
              "STATEMENT",
              "STAY",
              "STOGROUP",
              "STORES",
              "STYLE",
              "SUMMARY",
              "SYNONYM",
              "SYSDATE",
              "SYSTEM",
              "SYSTIMESTAMP",
              "TABLE",
              "TABLESPACE",
              "THEN",
              "TO",
              "TRIGGER",
              "TYPE",
              "UNDO",
              "UNIQUE",
              "UNTIL",
              "USER",
              "VALIDPROC",
              "VARIABLE",
              "VARIANT",
              "VCAT",
              "VERSIONING",
              "VIEW",
              "VOLATILE",
              "VOLUMES",
              "WHILE",
              "WLM",
              "XMLEXISTS",
              "XMLCAST",
              "YEARS",
              "ZONE",
            ],
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=utilities-db2-online
            onlineUtilies: [
              "BACKUP SYSTEM",
              "CATENFM",
              "CATMAINT",
              "CHECK DATA",
              "CHECK INDEX",
              "CHECK LOB",
              "COPY",
              "COPYTOCOPY",
              "DIAGNOSE",
              "EXEC SQL",
              "LISTDEF",
              "LOAD",
              "MERGECOPY",
              "MODIFY RECOVERY",
              "MODIFY STATISTICS",
              "OPTIONS",
              "QUIESCE",
              "REBUILD INDEX",
              "RECOVER",
              "REORG INDEX",
              "REORG TABLESPACE",
              "REPAIR",
              "REPORT",
              "RESTORE SYSTEM",
              "RUNSTATS",
              "STOSPACE",
              "TEMPLATE",
              "UNLOAD",
            ],
            // https://www.ibm.com/docs/en/db2-for-zos/11?topic=db2-commands
            commands: [
              "ABEND",
              "ACCESS DATABASE",
              "ALTER BUFFERPOOL",
              "ALTER GROUPBUFFERPOOL",
              "ALTER UTILITY",
              "ARCHIVE LOG",
              "BIND PACKAGE",
              "BIND PLAN",
              "BIND QUERY",
              "BIND SERVICE",
              "BIND",
              "REBIND",
              "CANCEL THREAD",
              "DCLGEN",
              "DISPLAY ACCEL",
              "DISPLAY ARCHIVE",
              "DISPLAY BLOCKERS",
              "DISPLAY BUFFERPOOL",
              "DISPLAY DATABASE",
              "DISPLAY DDF",
              "DISPLAY FUNCTION SPECIFIC",
              "DISPLAY GROUP",
              "DISPLAY GROUPBUFFERPOOL",
              "DISPLAY LOCATION",
              "DISPLAY LOG",
              "DISPLAY PROCEDURE",
              "DISPLAY PROFILE",
              "DISPLAY RLIMIT",
              "DISPLAY RESTSVC",
              "DISPLAY THREAD",
              "DISPLAY TRACE",
              "DISPLAY UTILITY",
              "DSN",
              "DSNH",
              "FREE PACKAGE",
              "FREE PLAN",
              "FREE QUERY",
              "FREE SERVICE",
              "MODIFY admtproc,APPL=SHUTDOWN",
              "MODIFY admtproc,APPL=TRACE",
              "MODIFY DDF",
              "MODIFY irlmproc,ABEND",
              "MODIFY irlmproc,DIAG",
              "MODIFY irlmproc,PURGE",
              "MODIFY irlmproc,SET",
              "MODIFY irlmproc,STATUS",
              "MODIFY TRACE",
              "REBIND PACKAGE",
              "REBIND PLAN",
              "REBIND TRIGGER PACKAGE",
              "RECOVER BSDS",
              "RECOVER INDOUBT",
              "RECOVER POSTPONED",
              "REFRESH DB2,EARLY",
              "RESET GENERICLU",
              "RESET INDOUBT",
              "RUN",
              "SET ARCHIVE",
              "SET LOG",
              "SET SYSPARM",
              "SPUFI",
              "START ACCEL",
              "START admtproc",
              "START CDDS",
              "START DATABASE",
              "START DB2",
              "START DDF",
              "START FUNCTION SPECIFIC",
              "START irlmproc",
              "START PROCEDURE",
              "START PROFILE",
              "START RLIMIT",
              "START RESTSVC",
              "START TRACE",
              "STOP ACCEL",
              "STOP admtproc",
              "STOP CDDS",
              "STOP DATABASE",
              "STOP DB2",
              "STOP DDF",
              "STOP FUNCTION SPECIFIC",
              "STOP irlmproc",
              "STOP PROCEDURE",
              "STOP PROFILE",
              "STOP RLIMIT",
              "STOP RESTSVC",
              "STOP TRACE",
              "TERM UTILITY",
              "TRACE CT",
            ],
          };
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://www.ibm.com/docs/en/db2-for-zos/11?topic=statements-list-supported

          var reservedCommands = [
            "ALLOCATE CURSOR",
            "ALTER DATABASE",
            "ALTER FUNCTION",
            "ALTER INDEX",
            "ALTER MASK",
            "ALTER PERMISSION",
            "ALTER PROCEDURE",
            "ALTER SEQUENCE",
            "ALTER STOGROUP",
            "ALTER TABLE",
            "ALTER TABLESPACE",
            "ALTER TRIGGER",
            "ALTER TRUSTED CONTEXT",
            "ALTER VIEW",
            "ASSOCIATE LOCATORS",
            "BEGIN DECLARE SECTION",
            "CALL",
            "CLOSE",
            "COMMENT",
            "COMMIT",
            "CONNECT",
            "CREATE ALIAS",
            "CREATE AUXILIARY TABLE",
            "CREATE DATABASE",
            "CREATE FUNCTION",
            "CREATE GLOBAL TEMPORARY TABLE",
            "CREATE INDEX",
            "CREATE LOB TABLESPACE",
            "CREATE MASK",
            "CREATE PERMISSION",
            "CREATE PROCEDURE",
            "CREATE ROLE",
            "CREATE SEQUENCE",
            "CREATE STOGROUP",
            "CREATE SYNONYM",
            "CREATE TABLE",
            "CREATE TABLESPACE",
            "CREATE TRIGGER",
            "CREATE TRUSTED CONTEXT",
            "CREATE TYPE",
            "CREATE VARIABLE",
            "CREATE VIEW",
            "DECLARE CURSOR",
            "DECLARE GLOBAL TEMPORARY TABLE",
            "DECLARE STATEMENT",
            "DECLARE TABLE",
            "DECLARE VARIABLE",
            "DELETE",
            "DELETE FROM",
            "DESCRIBE CURSOR",
            "DESCRIBE INPUT",
            "DESCRIBE OUTPUT",
            "DESCRIBE PROCEDURE",
            "DESCRIBE TABLE",
            "DROP",
            "END DECLARE SECTION",
            "EXCHANGE",
            "EXECUTE",
            "EXECUTE IMMEDIATE",
            "EXPLAIN",
            "FETCH",
            "FREE LOCATOR",
            "GET DIAGNOSTICS",
            "GRANT",
            "HOLD LOCATOR",
            "INCLUDE",
            "INSERT",
            "LABEL",
            "LOCK TABLE",
            "MERGE",
            "OPEN",
            "PREPARE",
            "REFRESH",
            "RELEASE",
            "RELEASE SAVEPOINT",
            "RENAME",
            "REVOKE",
            "ROLLBACK",
            "SAVEPOINT",
            "SELECT",
            "SELECT INTO",
            "SET CONNECTION",
            "SET",
            "SET CURRENT ACCELERATOR",
            "SET CURRENT APPLICATION COMPATIBILITY",
            "SET CURRENT APPLICATION ENCODING SCHEME",
            "SET CURRENT DEBUG MODE",
            "SET CURRENT DECFLOAT ROUNDING MODE",
            "SET CURRENT DEGREE",
            "SET CURRENT EXPLAIN MODE",
            "SET CURRENT GET_ACCEL_ARCHIVE",
            "SET CURRENT LOCALE LC_CTYPE",
            "SET CURRENT MAINTAINED TABLE TYPES FOR OPTIMIZATION",
            "SET CURRENT OPTIMIZATION HINT",
            "SET CURRENT PACKAGE PATH",
            "SET CURRENT PACKAGESET",
            "SET CURRENT PRECISION",
            "SET CURRENT QUERY ACCELERATION",
            "SET CURRENT QUERY ACCELERATION WAITFORDATA",
            "SET CURRENT REFRESH AGE",
            "SET CURRENT ROUTINE VERSION",
            "SET CURRENT RULES",
            "SET CURRENT SQLID",
            "SET CURRENT TEMPORAL BUSINESS_TIME",
            "SET CURRENT TEMPORAL SYSTEM_TIME",
            "SET ENCRYPTION PASSWORD",
            "SET PATH",
            "SET SCHEMA",
            "SET SESSION TIME ZONE",
            "SIGNAL",
            "TRUNCATE",
            "UPDATE",
            "VALUES",
            "VALUES INTO",
            "WHENEVER", // other
            "ADD",
            "ALTER COLUMN",
            "AFTER",
            "DROP TABLE",
            "FETCH FIRST",
            "FROM",
            "GROUP BY",
            "GO",
            "HAVING",
            "INSERT INTO",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "SET CURRENT SCHEMA",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE", "ELSEIF"]; // https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_72/db2/rbafzintro.htm

          var Db2Formatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(Db2Formatter, _Formatter);

            var _super = _createSuper(Db2Formatter);

            function Db2Formatter() {
              _classCallCheck(this, Db2Formatter);

              return _super.apply(this, arguments);
            }

            _createClass(Db2Formatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        _toConsumableArray(
                          Object.values(reservedKeywords).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                      ),
                    ),
                    stringTypes: Db2Formatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    namedPlaceholderTypes: [":"],
                    specialWordChars: {
                      any: "#@",
                    },
                    operators: Db2Formatter.operators,
                  });
                },
              },
            ]);

            return Db2Formatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          Db2Formatter.stringTypes = ['""', "''", "``", "[]", "x''"];
          Db2Formatter.operators = ["**", "!>", "!<", "||"];

          /***/
        },

      /***/ "./src/languages/hive.formatter.ts":
        /*!*****************************************!*\
  !*** ./src/languages/hive.formatter.ts ***!
  \*****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ HiveFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF

          var reservedFunctions = {
            math: [
              "ABS",
              "ACOS",
              "ASIN",
              "ATAN",
              "BIN",
              "BROUND",
              "CBRT",
              "CEIL",
              "CEILING",
              "CONV",
              "COS",
              "DEGREES", // 'E',
              "EXP",
              "FACTORIAL",
              "FLOOR",
              "GREATEST",
              "HEX",
              "LEAST",
              "LN",
              "LOG",
              "LOG10",
              "LOG2",
              "NEGATIVE",
              "PI",
              "PMOD",
              "POSITIVE",
              "POW",
              "POWER",
              "RADIANS",
              "RAND",
              "ROUND",
              "SHIFTLEFT",
              "SHIFTRIGHT",
              "SHIFTRIGHTUNSIGNED",
              "SIGN",
              "SIN",
              "SQRT",
              "TAN",
              "UNHEX",
              "WIDTH_BUCKET",
            ],
            array: [
              "ARRAY_CONTAINS",
              "MAP_KEYS",
              "MAP_VALUES",
              "SIZE",
              "SORT_ARRAY",
            ],
            conversion: ["BINARY", "CAST"],
            date: [
              "ADD_MONTHS",
              "DATE",
              "DATE_ADD",
              "DATE_FORMAT",
              "DATE_SUB",
              "DATEDIFF",
              "DAY",
              "DAYNAME",
              "DAYOFMONTH",
              "DAYOFYEAR",
              "EXTRACT",
              "FROM_UNIXTIME",
              "FROM_UTC_TIMESTAMP",
              "HOUR",
              "LAST_DAY",
              "MINUTE",
              "MONTH",
              "MONTHS_BETWEEN",
              "NEXT_DAY",
              "QUARTER",
              "SECOND",
              "TIMESTAMP",
              "TO_DATE",
              "TO_UTC_TIMESTAMP",
              "TRUNC",
              "UNIX_TIMESTAMP",
              "WEEKOFYEAR",
              "YEAR",
            ],
            conditional: [
              "ASSERT_TRUE",
              "COALESCE",
              "IF",
              "ISNOTNULL",
              "ISNULL",
              "NULLIF",
              "NVL",
            ],
            string: [
              "ASCII",
              "BASE64",
              "CHARACTER_LENGTH",
              "CHR",
              "CONCAT",
              "CONCAT_WS",
              "CONTEXT_NGRAMS",
              "DECODE",
              "ELT",
              "ENCODE",
              "FIELD",
              "FIND_IN_SET",
              "FORMAT_NUMBER",
              "GET_JSON_OBJECT",
              "IN_FILE",
              "INITCAP",
              "INSTR",
              "LCASE",
              "LENGTH",
              "LEVENSHTEIN",
              "LOCATE",
              "LOWER",
              "LPAD",
              "LTRIM",
              "NGRAMS",
              "OCTET_LENGTH",
              "PARSE_URL",
              "PRINTF",
              "QUOTE",
              "REGEXP_EXTRACT",
              "REGEXP_REPLACE",
              "REPEAT",
              "REVERSE",
              "RPAD",
              "RTRIM",
              "SENTENCES",
              "SOUNDEX",
              "SPACE",
              "SPLIT",
              "STR_TO_MAP",
              "SUBSTR",
              "SUBSTRING",
              "TRANSLATE",
              "TRIM",
              "UCASE",
              "UNBASE64",
              "UPPER",
            ],
            masking: [
              "MASK",
              "MASK_FIRST_N",
              "MASK_HASH",
              "MASK_LAST_N",
              "MASK_SHOW_FIRST_N",
              "MASK_SHOW_LAST_N",
            ],
            misc: [
              "AES_DECRYPT",
              "AES_ENCRYPT",
              "CRC32",
              "CURRENT_DATABASE",
              "CURRENT_USER",
              "HASH",
              "JAVA_METHOD",
              "LOGGED_IN_USER",
              "MD5",
              "REFLECT",
              "SHA",
              "SHA1",
              "SHA2",
              "SURROGATE_KEY",
              "VERSION",
            ],
            aggregate: [
              "AVG",
              "COLLECT_LIST",
              "COLLECT_SET",
              "CORR",
              "COUNT",
              "COVAR_POP",
              "COVAR_SAMP",
              "HISTOGRAM_NUMERIC",
              "MAX",
              "MIN",
              "NTILE",
              "PERCENTILE",
              "PERCENTILE_APPROX",
              "REGR_AVGX",
              "REGR_AVGY",
              "REGR_COUNT",
              "REGR_INTERCEPT",
              "REGR_R2",
              "REGR_SLOPE",
              "REGR_SXX",
              "REGR_SXY",
              "REGR_SYY",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "SUM",
              "VAR_POP",
              "VAR_SAMP",
              "VARIANCE",
            ],
            table: [
              "EXPLODE",
              "INLINE",
              "JSON_TUPLE",
              "PARSE_URL_TUPLE",
              "POSEXPLODE",
              "STACK",
            ],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://cwiki.apache.org/confluence/display/hive/languagemanual+ddl

          var reservedKeywords = {
            // Non-reserved keywords have proscribed meanings in. HiveQL, but can still be used as table or column names
            nonReserved: [
              "ADD",
              "ADMIN",
              "AFTER",
              "ANALYZE",
              "ARCHIVE",
              "ASC",
              "BEFORE",
              "BUCKET",
              "BUCKETS",
              "CASCADE",
              "CHANGE",
              "CLUSTER",
              "CLUSTERED",
              "CLUSTERSTATUS",
              "COLLECTION",
              "COLUMNS",
              "COMMENT",
              "COMPACT",
              "COMPACTIONS",
              "COMPUTE",
              "CONCATENATE",
              "CONTINUE",
              "DATA",
              "DATABASES",
              "DATETIME",
              "DAY",
              "DBPROPERTIES",
              "DEFERRED",
              "DEFINED",
              "DELIMITED",
              "DEPENDENCY",
              "DESC",
              "DIRECTORIES",
              "DIRECTORY",
              "DISABLE",
              "DISTRIBUTE",
              "ELEM_TYPE",
              "ENABLE",
              "ESCAPED",
              "EXCLUSIVE",
              "EXPLAIN",
              "EXPORT",
              "FIELDS",
              "FILE",
              "FILEFORMAT",
              "FIRST",
              "FORMAT",
              "FORMATTED",
              "FUNCTIONS",
              "HOLD_DDLTIME",
              "HOUR",
              "IDXPROPERTIES",
              "IGNORE",
              "INDEX",
              "INDEXES",
              "INPATH",
              "INPUTDRIVER",
              "INPUTFORMAT",
              "ITEMS",
              "JAR",
              "KEYS",
              "KEY_TYPE",
              "LIMIT",
              "LINES",
              "LOAD",
              "LOCATION",
              "LOCK",
              "LOCKS",
              "LOGICAL",
              "LONG",
              "MAPJOIN",
              "MATERIALIZED",
              "METADATA",
              "MINUS",
              "MINUTE",
              "MONTH",
              "MSCK",
              "NOSCAN",
              "NO_DROP",
              "OFFLINE",
              "OPTION",
              "OUTPUTDRIVER",
              "OUTPUTFORMAT",
              "OVERWRITE",
              "OWNER",
              "PARTITIONED",
              "PARTITIONS",
              "PLUS",
              "PRETTY",
              "PRINCIPALS",
              "PROTECTION",
              "PURGE",
              "READ",
              "READONLY",
              "REBUILD",
              "RECORDREADER",
              "RECORDWRITER",
              "RELOAD",
              "RENAME",
              "REPAIR",
              "REPLACE",
              "REPLICATION",
              "RESTRICT",
              "REWRITE",
              "ROLE",
              "ROLES",
              "SCHEMA",
              "SCHEMAS",
              "SECOND",
              "SEMI",
              "SERDE",
              "SERDEPROPERTIES",
              "SERVER",
              "SETS",
              "SHARED",
              "SHOW",
              "SHOW_DATABASE",
              "SKEWED",
              "SORT",
              "SORTED",
              "SSL",
              "STATISTICS",
              "STORED",
              "STREAMTABLE",
              "STRING",
              "STRUCT",
              "TABLES",
              "TBLPROPERTIES",
              "TEMPORARY",
              "TERMINATED",
              "TINYINT",
              "TOUCH",
              "TRANSACTIONS",
              "UNARCHIVE",
              "UNDO",
              "UNIONTYPE",
              "UNLOCK",
              "UNSET",
              "UNSIGNED",
              "URI", // 'USE',
              "UTC",
              "UTCTIMESTAMP",
              "VALUE_TYPE",
              "VIEW",
              "WHILE",
              "YEAR",
              "AUTOCOMMIT",
              "ISOLATION",
              "LEVEL",
              "OFFSET",
              "SNAPSHOT",
              "TRANSACTION",
              "WORK",
              "WRITE",
              "ABORT",
              "KEY",
              "LAST",
              "NORELY",
              "NOVALIDATE",
              "NULLS",
              "RELY",
              "VALIDATE",
              "DETAIL",
              "DOW",
              "EXPRESSION",
              "OPERATOR",
              "QUARTER",
              "SUMMARY",
              "VECTORIZATION",
              "WEEK",
              "YEARS",
              "MONTHS",
              "WEEKS",
              "DAYS",
              "HOURS",
              "MINUTES",
              "SECONDS",
              "TIMESTAMPTZ",
              "ZONE",
            ],
            reserved: [
              // reserved
              "ALL", // 'ALTER',
              // 'AND',
              "ARRAY",
              "AS",
              "AUTHORIZATION",
              "BETWEEN",
              "BIGINT",
              "BINARY",
              "BOOLEAN",
              "BOTH",
              "BY", // 'CASE',
              "CAST",
              "CHAR",
              "COLUMN",
              "CONF", // 'CREATE',
              "CROSS",
              "CUBE",
              "CURRENT",
              "CURRENT_DATE",
              "CURRENT_TIMESTAMP",
              "CURSOR",
              "DATABASE",
              "DATE",
              "DECIMAL",
              "DELETE", // 'DESCRIBE',
              "DISTINCT",
              "DOUBLE", // 'DROP',
              // 'ELSE',
              // 'END',
              "EXCHANGE",
              "EXISTS",
              "EXTENDED",
              "EXTERNAL",
              "FALSE", // 'FETCH',
              "FLOAT",
              "FOLLOWING",
              "FOR", // 'FROM',
              "FULL",
              "FUNCTION",
              "GRANT", // 'GROUP',
              "GROUPING", // 'HAVING',
              "IF",
              "IMPORT",
              "IN",
              "INNER", // 'INSERT',
              "INT", // 'INTERSECT',
              "INTERVAL",
              "INTO",
              "IS", // 'JOIN',
              "LATERAL",
              "LEFT",
              "LESS",
              "LIKE",
              "LOCAL",
              "MACRO",
              "MAP",
              "MORE",
              "NONE",
              "NOT",
              "NULL",
              "OF", // 'ON',
              // 'OR',
              "ORDER",
              "OUT",
              "OUTER",
              "OVER",
              "PARTIALSCAN",
              "PARTITION",
              "PERCENT",
              "PRECEDING",
              "PRESERVE",
              "PROCEDURE",
              "RANGE",
              "READS",
              "REDUCE",
              "REVOKE",
              "RIGHT",
              "ROLLUP",
              "ROW",
              "ROWS", // 'SELECT',
              "SET",
              "SMALLINT",
              "TABLE",
              "TABLESAMPLE",
              "THEN",
              "TIMESTAMP",
              "TO",
              "TRANSFORM",
              "TRIGGER",
              "TRUE", // 'TRUNCATE',
              "UNBOUNDED", // 'UNION',
              "UNIQUEJOIN", // 'UPDATE',
              "USER",
              "UTC_TMESTAMP", // 'VALUES',
              "VARCHAR", // 'WHEN',
              // 'WHERE',
              "WINDOW", // 'WITH',
              "COMMIT",
              "ONLY",
              "REGEXP",
              "RLIKE",
              "ROLLBACK",
              "START",
              "CACHE",
              "CONSTRAINT",
              "FOREIGN",
              "PRIMARY",
              "REFERENCES",
              "DAYOFWEEK",
              "EXTRACT",
              "FLOOR",
              "INTEGER",
              "PRECISION",
              "VIEWS",
              "TIME",
              "NUMERIC",
              "SYNC",
            ],
            fileTypes: [
              "TEXTFILE",
              "SEQUENCEFILE",
              "ORC",
              "CSV",
              "TSV",
              "PARQUET",
              "AVRO",
              "RCFILE",
              "JSONFILE",
              "INPUTFORMAT",
              "OUTPUTFORMAT",
            ],
          };
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */

          var reservedCommands = [
            // commands
            "ALTER",
            "ALTER COLUMN",
            "ALTER TABLE",
            "CREATE",
            "CREATE TABLE",
            "USE",
            "DESCRIBE",
            "DROP",
            "DROP TABLE",
            "FETCH",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT",
            "INSERT INTO",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "SET",
            "SET SCHEMA",
            "SHOW",
            "SORT BY",
            "TRUNCATE",
            "UPDATE",
            "VALUES",
            "WHERE",
            "WITH", // newline keywords
            "STORED AS",
            "STORED BY",
            "ROW FORMAT",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous 'Statement', must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // https://cwiki.apache.org/confluence/display/Hive/LanguageManual

          var HiveFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(HiveFormatter, _Formatter);

            var _super = _createSuper(HiveFormatter);

            function HiveFormatter() {
              _classCallCheck(this, HiveFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(HiveFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        _toConsumableArray(
                          Object.values(reservedKeywords).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                      ),
                    ),
                    stringTypes: HiveFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    operators: HiveFormatter.operators,
                  });
                },
              },
            ]);

            return HiveFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          HiveFormatter.stringTypes = ['""', "''", "``"];
          HiveFormatter.operators = ["<=>", "==", "||"];

          /***/
        },

      /***/ "./src/languages/mariadb.formatter.ts":
        /*!********************************************!*\
  !*** ./src/languages/mariadb.formatter.ts ***!
  \********************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ MariaDbFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_core_token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/core/token */ "./src/core/token.ts");
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://mariadb.com/kb/en/information-schema-sql_functions-table/

          var reservedFunctions = [
            "ADDDATE",
            "ADD_MONTHS",
            "BIT_AND",
            "BIT_OR",
            "BIT_XOR",
            "CAST",
            "COUNT",
            "CUME_DIST",
            "CURDATE",
            "CURTIME",
            "DATE_ADD",
            "DATE_SUB",
            "DATE_FORMAT",
            "DECODE",
            "DENSE_RANK",
            "EXTRACT",
            "FIRST_VALUE",
            "GROUP_CONCAT",
            "JSON_ARRAYAGG",
            "JSON_OBJECTAGG",
            "LAG",
            "LEAD",
            "MAX",
            "MEDIAN",
            "MID",
            "MIN",
            "NOW",
            "NTH_VALUE",
            "NTILE",
            "POSITION",
            "PERCENT_RANK",
            "PERCENTILE_CONT",
            "PERCENTILE_DISC",
            "RANK",
            "ROW_NUMBER",
            "SESSION_USER",
            "STD",
            "STDDEV",
            "STDDEV_POP",
            "STDDEV_SAMP",
            "SUBDATE",
            "SUBSTR",
            "SUBSTRING",
            "SUM",
            "SYSTEM_USER",
            "TRIM",
            "TRIM_ORACLE",
            "VARIANCE",
            "VAR_POP",
            "VAR_SAMP",
            "ABS",
            "ACOS",
            "ADDTIME",
            "AES_DECRYPT",
            "AES_ENCRYPT",
            "ASIN",
            "ATAN",
            "ATAN2",
            "BENCHMARK",
            "BIN",
            "BINLOG_GTID_POS",
            "BIT_COUNT",
            "BIT_LENGTH",
            "CEIL",
            "CEILING",
            "CHARACTER_LENGTH",
            "CHAR_LENGTH",
            "CHR",
            "COERCIBILITY",
            "COLUMN_CHECK",
            "COLUMN_EXISTS",
            "COLUMN_LIST",
            "COLUMN_JSON",
            "COMPRESS",
            "CONCAT",
            "CONCAT_OPERATOR_ORACLE",
            "CONCAT_WS",
            "CONNECTION_ID",
            "CONV",
            "CONVERT_TZ",
            "COS",
            "COT",
            "CRC32",
            "DATEDIFF",
            "DAYNAME",
            "DAYOFMONTH",
            "DAYOFWEEK",
            "DAYOFYEAR",
            "DEGREES",
            "DECODE_HISTOGRAM",
            "DECODE_ORACLE",
            "DES_DECRYPT",
            "DES_ENCRYPT",
            "ELT",
            "ENCODE",
            "ENCRYPT",
            "EXP",
            "EXPORT_SET",
            "EXTRACTVALUE",
            "FIELD",
            "FIND_IN_SET",
            "FLOOR",
            "FORMAT",
            "FOUND_ROWS",
            "FROM_BASE64",
            "FROM_DAYS",
            "FROM_UNIXTIME",
            "GET_LOCK",
            "GREATEST",
            "HEX",
            "IFNULL",
            "INSTR",
            "ISNULL",
            "IS_FREE_LOCK",
            "IS_USED_LOCK",
            "JSON_ARRAY",
            "JSON_ARRAY_APPEND",
            "JSON_ARRAY_INSERT",
            "JSON_COMPACT",
            "JSON_CONTAINS",
            "JSON_CONTAINS_PATH",
            "JSON_DEPTH",
            "JSON_DETAILED",
            "JSON_EXISTS",
            "JSON_EXTRACT",
            "JSON_INSERT",
            "JSON_KEYS",
            "JSON_LENGTH",
            "JSON_LOOSE",
            "JSON_MERGE",
            "JSON_MERGE_PATCH",
            "JSON_MERGE_PRESERVE",
            "JSON_QUERY",
            "JSON_QUOTE",
            "JSON_OBJECT",
            "JSON_REMOVE",
            "JSON_REPLACE",
            "JSON_SET",
            "JSON_SEARCH",
            "JSON_TYPE",
            "JSON_UNQUOTE",
            "JSON_VALID",
            "JSON_VALUE",
            "LAST_DAY",
            "LAST_INSERT_ID",
            "LCASE",
            "LEAST",
            "LENGTH",
            "LENGTHB",
            "LN",
            "LOAD_FILE",
            "LOCATE",
            "LOG",
            "LOG10",
            "LOG2",
            "LOWER",
            "LPAD",
            "LPAD_ORACLE",
            "LTRIM",
            "LTRIM_ORACLE",
            "MAKEDATE",
            "MAKETIME",
            "MAKE_SET",
            "MASTER_GTID_WAIT",
            "MASTER_POS_WAIT",
            "MD5",
            "MONTHNAME",
            "NAME_CONST",
            "NVL",
            "NVL2",
            "NULLIF",
            "OCT",
            "OCTET_LENGTH",
            "ORD",
            "PERIOD_ADD",
            "PERIOD_DIFF",
            "PI",
            "POW",
            "POWER",
            "QUOTE",
            "REGEXP_INSTR",
            "REGEXP_REPLACE",
            "REGEXP_SUBSTR",
            "RADIANS",
            "RAND",
            "RELEASE_ALL_LOCKS",
            "RELEASE_LOCK",
            "REPLACE_ORACLE",
            "REVERSE",
            "ROUND",
            "RPAD",
            "RPAD_ORACLE",
            "RTRIM",
            "RTRIM_ORACLE",
            "SEC_TO_TIME",
            "SHA",
            "SHA1",
            "SHA2",
            "SIGN",
            "SIN",
            "SLEEP",
            "SOUNDEX",
            "SPACE",
            "SQRT",
            "STRCMP",
            "STR_TO_DATE",
            "SUBSTR_ORACLE",
            "SUBSTRING_INDEX",
            "SUBTIME",
            "SYS_GUID",
            "TAN",
            "TIMEDIFF",
            "TIME_FORMAT",
            "TIME_TO_SEC",
            "TO_BASE64",
            "TO_CHAR",
            "TO_DAYS",
            "TO_SECONDS",
            "UCASE",
            "UNCOMPRESS",
            "UNCOMPRESSED_LENGTH",
            "UNHEX",
            "UNIX_TIMESTAMP",
            "UPDATEXML",
            "UPPER",
            "UUID",
            "UUID_SHORT",
            "VERSION",
            "WEEKDAY",
            "WEEKOFYEAR",
            "WSREP_LAST_WRITTEN_GTID",
            "WSREP_LAST_SEEN_GTID",
            "WSREP_SYNC_WAIT_UPTO_GTID",
            "YEARWEEK",
          ];
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://mariadb.com/kb/en/information-schema-keywords-table/

          var reservedKeywords = [
            "ACCESSIBLE",
            "ACCOUNT",
            "ACTION",
            "ADMIN",
            "AFTER",
            "AGAINST",
            "AGGREGATE",
            "ALL",
            "ALGORITHM",
            "ALTER",
            "ALWAYS",
            "ANY",
            "AS",
            "ASC",
            "ASCII",
            "ASENSITIVE",
            "AT",
            "ATOMIC",
            "AUTHORS",
            "AUTO_INCREMENT",
            "AUTOEXTEND_SIZE",
            "AUTO",
            "AVG",
            "AVG_ROW_LENGTH",
            "BACKUP",
            "BEFORE",
            "BETWEEN",
            "BIGINT",
            "BINARY",
            "BIT",
            "BLOB",
            "BLOCK",
            "BODY",
            "BOOL",
            "BOOLEAN",
            "BOTH",
            "BTREE",
            "BY",
            "BYTE",
            "CACHE",
            "CASCADE",
            "CASCADED",
            "CATALOG_NAME",
            "CHAIN",
            "CHANGE",
            "CHANGED",
            "CHAR",
            "CHARACTER",
            "CHARACTER SET",
            "CHARSET",
            "CHECK",
            "CHECKPOINT",
            "CHECKSUM",
            "CIPHER",
            "CLASS_ORIGIN",
            "CLIENT",
            "CLOB",
            "CLOSE",
            "COALESCE",
            "CODE",
            "COLLATE",
            "COLLATION",
            "COLUMN",
            "COLUMN_NAME",
            "COLUMNS",
            "COLUMN_ADD",
            "COLUMN_CREATE",
            "COLUMN_DELETE",
            "COLUMN_GET",
            "COMMENT",
            "COMMITTED",
            "COMPACT",
            "COMPLETION",
            "COMPRESSED",
            "CONCURRENT",
            "CONDITION",
            "CONNECTION",
            "CONSISTENT",
            "CONSTRAINT",
            "CONSTRAINT_CATALOG",
            "CONSTRAINT_NAME",
            "CONSTRAINT_SCHEMA",
            "CONTAINS",
            "CONTEXT",
            "CONTINUE",
            "CONTRIBUTORS",
            "CONVERT",
            "CPU",
            "CREATE",
            "CROSS",
            "CUBE",
            "CURRENT",
            "CURRENT_DATE",
            "CURRENT_POS",
            "CURRENT_ROLE",
            "CURRENT_TIME",
            "CURRENT_TIMESTAMP",
            "CURRENT_USER",
            "CURSOR",
            "CURSOR_NAME",
            "CYCLE",
            "DATA",
            "DATABASE",
            "DATABASES",
            "DATAFILE",
            "DATE",
            "DATETIME",
            "DAY",
            "DAY_HOUR",
            "DAY_MICROSECOND",
            "DAY_MINUTE",
            "DAY_SECOND",
            "DEALLOCATE",
            "DEC",
            "DECIMAL",
            "DECLARE",
            "DEFAULT",
            "DEFINER",
            "DELAYED",
            "DELAY_KEY_WRITE",
            "DELETE_DOMAIN_ID",
            "DES_KEY_FILE",
            "DETERMINISTIC",
            "DIAGNOSTICS",
            "DIRECTORY",
            "DISABLE",
            "DISCARD",
            "DISK",
            "DISTINCT",
            "DISTINCTROW",
            "DIV",
            "DOUBLE",
            "DO_DOMAIN_IDS",
            "DROP",
            "DUAL",
            "DUMPFILE",
            "DUPLICATE",
            "DYNAMIC",
            "EACH",
            "EMPTY",
            "ENABLE",
            "ENCLOSED",
            "ENDS",
            "ENGINE",
            "ENGINES",
            "ENUM",
            "ERROR",
            "ERRORS",
            "ESCAPE",
            "ESCAPED",
            "EVENT",
            "EVENTS",
            "EVERY",
            "EXAMINED",
            "EXCHANGE",
            "EXCLUDE",
            "EXCEPTION",
            "EXISTS",
            "EXIT",
            "EXPANSION",
            "EXPIRE",
            "EXPORT",
            "EXTENDED",
            "EXTENT_SIZE",
            "FALSE",
            "FAST",
            "FAULTS",
            "FEDERATED",
            "FETCH",
            "FIELDS",
            "FILE",
            "FIRST",
            "FIXED",
            "FLOAT",
            "FLOAT4",
            "FLOAT8",
            "FOLLOWING",
            "FOLLOWS",
            "FOR",
            "FORCE",
            "FOREIGN",
            "FOUND",
            "FULL",
            "FULLTEXT",
            "FUNCTION",
            "GENERAL",
            "GENERATED",
            "GET_FORMAT",
            "GET",
            "GLOBAL",
            "GOTO",
            "GRANTS",
            "GROUP",
            "HARD",
            "HASH",
            "HIGH_PRIORITY",
            "HISTORY",
            "HOST",
            "HOSTS",
            "HOUR",
            "HOUR_MICROSECOND",
            "HOUR_MINUTE",
            "HOUR_SECOND", // 'ID',
            "IDENTIFIED",
            "IF",
            "IGNORE",
            "IGNORED",
            "IGNORE_DOMAIN_IDS",
            "IGNORE_SERVER_IDS",
            "IMMEDIATE",
            "IMPORT",
            "IN",
            "INCREMENT",
            "INDEX",
            "INDEXES",
            "INFILE",
            "INITIAL_SIZE",
            "INNER",
            "INOUT",
            "INSENSITIVE",
            "INSERT_METHOD",
            "INSTALL",
            "INT",
            "INT1",
            "INT2",
            "INT3",
            "INT4",
            "INT8",
            "INTEGER",
            "INTERVAL",
            "INVISIBLE",
            "INTO",
            "IO",
            "IO_THREAD",
            "IPC",
            "IS",
            "ISOLATION",
            "ISOPEN",
            "ISSUER",
            "ITERATE",
            "INVOKER",
            "JSON",
            "JSON_TABLE",
            "KEY",
            "KEYS",
            "KEY_BLOCK_SIZE",
            "LANGUAGE",
            "LAST",
            "LAST_VALUE",
            "LASTVAL",
            "LEADING",
            "LEAVE",
            "LEAVES",
            "LEFT",
            "LESS",
            "LEVEL",
            "LIKE",
            "LINEAR",
            "LINES",
            "LIST",
            "LOAD",
            "LOCAL",
            "LOCALTIME",
            "LOCALTIMESTAMP",
            "LOCK",
            "LOCKED",
            "LOCKS",
            "LOGFILE",
            "LOGS",
            "LONG",
            "LONGBLOB",
            "LONGTEXT",
            "LOOP",
            "LOW_PRIORITY",
            "MASTER",
            "MASTER_CONNECT_RETRY",
            "MASTER_DELAY",
            "MASTER_GTID_POS",
            "MASTER_HOST",
            "MASTER_LOG_FILE",
            "MASTER_LOG_POS",
            "MASTER_PASSWORD",
            "MASTER_PORT",
            "MASTER_SERVER_ID",
            "MASTER_SSL",
            "MASTER_SSL_CA",
            "MASTER_SSL_CAPATH",
            "MASTER_SSL_CERT",
            "MASTER_SSL_CIPHER",
            "MASTER_SSL_CRL",
            "MASTER_SSL_CRLPATH",
            "MASTER_SSL_KEY",
            "MASTER_SSL_VERIFY_SERVER_CERT",
            "MASTER_USER",
            "MASTER_USE_GTID",
            "MASTER_HEARTBEAT_PERIOD",
            "MATCH",
            "MAX_CONNECTIONS_PER_HOUR",
            "MAX_QUERIES_PER_HOUR",
            "MAX_ROWS",
            "MAX_SIZE",
            "MAX_STATEMENT_TIME",
            "MAX_UPDATES_PER_HOUR",
            "MAX_USER_CONNECTIONS",
            "MAXVALUE",
            "MEDIUM",
            "MEDIUMBLOB",
            "MEDIUMINT",
            "MEDIUMTEXT",
            "MEMORY",
            "MERGE",
            "MESSAGE_TEXT",
            "MICROSECOND",
            "MIDDLEINT",
            "MIGRATE",
            "MINUS",
            "MINUTE",
            "MINUTE_MICROSECOND",
            "MINUTE_SECOND",
            "MINVALUE",
            "MIN_ROWS",
            "MOD",
            "MODE",
            "MODIFIES",
            "MODIFY",
            "MONITOR",
            "MONTH",
            "MUTEX",
            "MYSQL",
            "MYSQL_ERRNO",
            "NAME",
            "NAMES",
            "NATIONAL",
            "NATURAL",
            "NCHAR",
            "NESTED",
            "NEVER",
            "NEW",
            "NEXT",
            "NEXTVAL",
            "NO",
            "NOMAXVALUE",
            "NOMINVALUE",
            "NOCACHE",
            "NOCYCLE",
            "NO_WAIT",
            "NOWAIT",
            "NODEGROUP",
            "NONE",
            "NOT",
            "NOTFOUND",
            "NO_WRITE_TO_BINLOG",
            "NULL",
            "NUMBER",
            "NUMERIC",
            "NVARCHAR",
            "OF",
            "OFFSET",
            "OLD_PASSWORD",
            "ON DELETE",
            "ON UPDATE",
            "ONE",
            "ONLINE",
            "ONLY",
            "OPEN",
            "OPTIMIZE",
            "OPTIONS",
            "OPTION",
            "OPTIONALLY",
            "ORDER",
            "ORDINALITY",
            "OTHERS",
            "OUT",
            "OUTER",
            "OUTFILE",
            "OVER",
            "OVERLAPS",
            "OWNER",
            "PACKAGE",
            "PACK_KEYS",
            "PAGE",
            "PAGE_CHECKSUM",
            "PARSER",
            "PARSE_VCOL_EXPR",
            "PATH",
            "PERIOD",
            "PARTIAL",
            "PARTITION",
            "PARTITIONING",
            "PARTITIONS",
            "PASSWORD",
            "PERSISTENT",
            "PHASE",
            "PLUGIN",
            "PLUGINS",
            "PORT",
            "PORTION",
            "PRECEDES",
            "PRECEDING",
            "PRECISION",
            "PRESERVE",
            "PREV",
            "PREVIOUS",
            "PRIMARY",
            "PRIVILEGES",
            "PROCEDURE",
            "PROCESS",
            "PROCESSLIST",
            "PROFILE",
            "PROFILES",
            "PROXY",
            "PURGE",
            "QUARTER",
            "QUERY",
            "QUICK",
            "RAISE",
            "RANGE",
            "RAW",
            "READ",
            "READ_ONLY",
            "READ_WRITE",
            "READS",
            "REAL",
            "REBUILD",
            "RECOVER",
            "RECURSIVE",
            "REDO_BUFFER_SIZE",
            "REDOFILE",
            "REDUNDANT",
            "REFERENCES",
            "REGEXP",
            "RELAY",
            "RELAYLOG",
            "RELAY_LOG_FILE",
            "RELAY_LOG_POS",
            "RELAY_THREAD",
            "RELEASE",
            "RELOAD",
            "REMOVE",
            "RENAME",
            "REORGANIZE",
            "REPAIR",
            "REPEATABLE",
            "REPLAY",
            "REPLICA",
            "REPLICAS",
            "REPLICA_POS",
            "REPLICATION",
            "REPEAT",
            "REQUIRE",
            "RESET",
            "RESTART",
            "RESTORE",
            "RESTRICT",
            "RESUME",
            "RETURNED_SQLSTATE",
            "RETURN",
            "RETURNS",
            "REUSE",
            "RIGHT",
            "RLIKE",
            "ROLE",
            "ROLLUP",
            "ROUTINE",
            "ROW",
            "ROWCOUNT",
            "ROWNUM",
            "ROWS",
            "ROWTYPE",
            "ROW_COUNT",
            "ROW_FORMAT",
            "RTREE",
            "SCHEDULE",
            "SCHEMA",
            "SCHEMA_NAME",
            "SCHEMAS",
            "SECOND",
            "SECOND_MICROSECOND",
            "SECURITY",
            "SENSITIVE",
            "SEPARATOR",
            "SEQUENCE",
            "SERIAL",
            "SERIALIZABLE",
            "SESSION",
            "SERVER",
            "SETVAL",
            "SHARE",
            "SIGNED",
            "SIMPLE",
            "SKIP",
            "SLAVE",
            "SLAVES",
            "SLAVE_POS",
            "SLOW",
            "SNAPSHOT",
            "SMALLINT",
            "SOCKET",
            "SOFT",
            "SOME",
            "SONAME",
            "SOUNDS",
            "SOURCE",
            "STAGE",
            "STORED",
            "SPATIAL",
            "SPECIFIC",
            "REF_SYSTEM_ID",
            "SQL",
            "SQLEXCEPTION",
            "SQLSTATE",
            "SQLWARNING",
            "SQL_BIG_RESULT",
            "SQL_BUFFER_RESULT",
            "SQL_CACHE",
            "SQL_CALC_FOUND_ROWS",
            "SQL_NO_CACHE",
            "SQL_SMALL_RESULT",
            "SQL_THREAD",
            "SQL_TSI_SECOND",
            "SQL_TSI_MINUTE",
            "SQL_TSI_HOUR",
            "SQL_TSI_DAY",
            "SQL_TSI_WEEK",
            "SQL_TSI_MONTH",
            "SQL_TSI_QUARTER",
            "SQL_TSI_YEAR",
            "SSL",
            "START",
            "STARTING",
            "STARTS",
            "STATEMENT",
            "STATS_AUTO_RECALC",
            "STATS_PERSISTENT",
            "STATS_SAMPLE_PAGES",
            "STATUS",
            "STOP",
            "STORAGE",
            "STRING",
            "SUBCLASS_ORIGIN",
            "SUBJECT",
            "SUBPARTITION",
            "SUBPARTITIONS",
            "SUPER",
            "SUSPEND",
            "SWAPS",
            "SWITCHES",
            "SYSDATE",
            "SYSTEM",
            "SYSTEM_TIME",
            "TABLE",
            "TABLE_NAME",
            "TABLES",
            "TABLESPACE",
            "TABLE_CHECKSUM",
            "TEMPORARY",
            "TEMPTABLE",
            "TERMINATED",
            "TEXT",
            "THAN",
            "THEN",
            "TIES",
            "TIME",
            "TIMESTAMP",
            "TIMESTAMPADD",
            "TIMESTAMPDIFF",
            "TINYBLOB",
            "TINYINT",
            "TINYTEXT",
            "TO",
            "TRAILING",
            "TRANSACTION",
            "TRANSACTIONAL",
            "THREADS",
            "TRIGGER",
            "TRIGGERS",
            "TRUE",
            "TYPE",
            "TYPES",
            "UNBOUNDED",
            "UNCOMMITTED",
            "UNDEFINED",
            "UNDO_BUFFER_SIZE",
            "UNDOFILE",
            "UNDO",
            "UNICODE",
            "UNIQUE",
            "UNKNOWN",
            "UNLOCK",
            "UNINSTALL",
            "UNSIGNED",
            "UNTIL",
            "UPGRADE",
            "USAGE",
            "USER",
            "USER_RESOURCES",
            "USE_FRM",
            "UTC_DATE",
            "UTC_TIME",
            "UTC_TIMESTAMP",
            "VALUE",
            "VARBINARY",
            "VARCHAR",
            "VARCHARACTER",
            "VARCHAR2",
            "VARIABLES",
            "VARYING",
            "VIA",
            "VIEW",
            "VIRTUAL",
            "VISIBLE",
            "VERSIONING",
            "WAIT",
            "WARNINGS",
            "WEEK",
            "WEIGHT_STRING",
            "WHILE",
            "WINDOW",
            "WITHIN",
            "WITHOUT",
            "WORK",
            "WRAPPER",
            "WRITE",
            "X509",
            "XA",
            "XML",
            "YEAR",
            "YEAR_MONTH",
            "ZEROFILL",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://mariadb.com/docs/reference/mdb/sql-statements/

          var reservedCommands = [
            "ALTER DATABASE",
            "ALTER DATABASE COMMENT",
            "ALTER EVENT",
            "ALTER FUNCTION",
            "ALTER PROCEDURE",
            "ALTER SCHEMA",
            "ALTER SCHEMA COMMENT",
            "ALTER SEQUENCE",
            "ALTER SERVER",
            "ALTER TABLE",
            "ALTER USER",
            "ALTER VIEW",
            "ANALYZE",
            "ANALYZE TABLE",
            "BACKUP LOCK",
            "BACKUP STAGE",
            "BACKUP UNLOCK",
            "BEGIN",
            "BINLOG",
            "CACHE INDEX",
            "CALL",
            "CHANGE MASTER TO",
            "CHECK TABLE",
            "CHECK VIEW",
            "CHECKSUM TABLE",
            "COMMIT",
            "CREATE AGGREGATE FUNCTION",
            "CREATE DATABASE",
            "CREATE EVENT",
            "CREATE FUNCTION",
            "CREATE INDEX",
            "CREATE PROCEDURE",
            "CREATE ROLE",
            "CREATE SEQUENCE",
            "CREATE SERVER",
            "CREATE SPATIAL INDEX",
            "CREATE TABLE",
            "CREATE TRIGGER",
            "CREATE UNIQUE INDEX",
            "CREATE USER",
            "CREATE VIEW",
            "DEALLOCATE PREPARE",
            "DELETE",
            "DELETE FROM",
            "DESC",
            "DESCRIBE",
            "DO",
            "DROP DATABASE",
            "DROP EVENT",
            "DROP FUNCTION",
            "DROP INDEX",
            "DROP PREPARE",
            "DROP PROCEDURE",
            "DROP ROLE",
            "DROP SEQUENCE",
            "DROP SERVER",
            "DROP TABLE",
            "DROP TRIGGER",
            "DROP USER",
            "DROP VIEW",
            "EXECUTE",
            "EXPLAIN",
            "FLUSH",
            "GET DIAGNOSTICS",
            "GET DIAGNOSTICS CONDITION",
            "GRANT",
            "HANDLER",
            "HELP",
            "INSERT",
            "INSTALL PLUGIN",
            "INSTALL SONAME",
            "KILL",
            "LOAD DATA INFILE",
            "LOAD INDEX INTO CACHE",
            "LOAD XML INFILE",
            "LOCK TABLE",
            "OPTIMIZE TABLE",
            "PREPARE",
            "PURGE BINARY LOGS",
            "PURGE MASTER LOGS",
            "RELEASE SAVEPOINT",
            "RENAME TABLE",
            "RENAME USER",
            "REPAIR TABLE",
            "REPAIR VIEW",
            "REPLACE",
            "RESET MASTER",
            "RESET QUERY CACHE",
            "RESET REPLICA",
            "RESET SLAVE",
            "RESIGNAL",
            "RETURNING",
            "REVOKE",
            "ROLLBACK",
            "SAVEPOINT",
            "SELECT",
            "SET",
            "SET CHARACTER SET",
            "SET DEFAULT ROLE",
            "SET GLOBAL TRANSACTION",
            "SET NAMES",
            "SET PASSWORD",
            "SET ROLE",
            "SET STATEMENT",
            "SET TRANSACTION",
            "SHOW",
            "SHOW ALL REPLICAS STATUS",
            "SHOW ALL SLAVES STATUS",
            "SHOW AUTHORS",
            "SHOW BINARY LOGS",
            "SHOW BINLOG EVENTS",
            "SHOW BINLOG STATUS",
            "SHOW CHARACTER SET",
            "SHOW CLIENT_STATISTICS",
            "SHOW COLLATION",
            "SHOW COLUMNS",
            "SHOW CONTRIBUTORS",
            "SHOW CREATE DATABASE",
            "SHOW CREATE EVENT",
            "SHOW CREATE FUNCTION",
            "SHOW CREATE PACKAGE",
            "SHOW CREATE PACKAGE BODY",
            "SHOW CREATE PROCEDURE",
            "SHOW CREATE SEQUENCE",
            "SHOW CREATE TABLE",
            "SHOW CREATE TRIGGER",
            "SHOW CREATE USER",
            "SHOW CREATE VIEW",
            "SHOW DATABASES",
            "SHOW ENGINE",
            "SHOW ENGINE INNODB STATUS",
            "SHOW ENGINES",
            "SHOW ERRORS",
            "SHOW EVENTS",
            "SHOW EXPLAIN",
            "SHOW FUNCTION CODE",
            "SHOW FUNCTION STATUS",
            "SHOW GRANTS",
            "SHOW INDEX",
            "SHOW INDEXES",
            "SHOW INDEX_STATISTICS",
            "SHOW KEYS",
            "SHOW LOCALES",
            "SHOW MASTER LOGS",
            "SHOW MASTER STATUS",
            "SHOW OPEN TABLES",
            "SHOW PACKAGE BODY CODE",
            "SHOW PACKAGE BODY STATUS",
            "SHOW PACKAGE STATUS",
            "SHOW PLUGINS",
            "SHOW PLUGINS SONAME",
            "SHOW PRIVILEGES",
            "SHOW PROCEDURE CODE",
            "SHOW PROCEDURE STATUS",
            "SHOW PROCESSLIST",
            "SHOW PROFILE",
            "SHOW PROFILES",
            "SHOW QUERY_RESPONSE_TIME",
            "SHOW RELAYLOG EVENTS",
            "SHOW REPLICA",
            "SHOW REPLICA HOSTS",
            "SHOW REPLICA STATUS",
            "SHOW SCHEMAS",
            "SHOW SLAVE",
            "SHOW SLAVE HOSTS",
            "SHOW SLAVE STATUS",
            "SHOW STATUS",
            "SHOW STORAGE ENGINES",
            "SHOW TABLE STATUS",
            "SHOW TABLES",
            "SHOW TRIGGERS",
            "SHOW USER_STATISTICS",
            "SHOW VARIABLES",
            "SHOW WARNINGS",
            "SHOW WSREP_MEMBERSHIP",
            "SHOW WSREP_STATUS",
            "SHUTDOWN",
            "SIGNAL",
            "START ALL REPLICAS",
            "START ALL SLAVES",
            "START REPLICA",
            "START SLAVE",
            "START TRANSACTION",
            "STOP ALL REPLICAS",
            "STOP ALL SLAVES",
            "STOP REPLICA",
            "STOP SLAVE",
            "TRUNCATE",
            "TRUNCATE TABLE",
            "UNINSTALL PLUGIN",
            "UNINSTALL SONAME",
            "UNLOCK TABLE",
            "UPDATE",
            "USE",
            "WITH",
            "XA BEGIN",
            "XA COMMIT",
            "XA END",
            "XA PREPARE",
            "XA RECOVER",
            "XA ROLLBACK",
            "XA START", // other
            "ADD",
            "ALTER COLUMN",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "INSERT",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "VALUES",
            "WHERE",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN", // non-standard joins
            "STRAIGHT_JOIN",
            "NATURAL LEFT JOIN",
            "NATURAL LEFT OUTER JOIN",
            "NATURAL RIGHT JOIN",
            "NATURAL RIGHT OUTER JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE", "ELSEIF", "ELSIF"]; // For reference: https://mariadb.com/kb/en/sql-statements-structure/

          var MariaDbFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(MariaDbFormatter, _Formatter);

            var _super = _createSuper(MariaDbFormatter);

            function MariaDbFormatter() {
              _classCallCheck(this, MariaDbFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(MariaDbFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedLogicalOperators: ["AND", "OR", "XOR"],
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_3__.dedupe)(
                      [].concat(reservedKeywords, reservedFunctions),
                    ),
                    stringTypes: MariaDbFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    lineCommentTypes: ["--", "#"],
                    specialWordChars: {
                      prefix: "@",
                    },
                    operators: MariaDbFormatter.operators,
                    preprocess: preprocess,
                  });
                },
              },
            ]);

            return MariaDbFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          MariaDbFormatter.stringTypes = ["``", "''", '""'];
          MariaDbFormatter.operators = [":=", "<<", ">>", "<=>", "&&", "||"];

          function preprocess(tokens) {
            return tokens.map(function (token, i) {
              var nextToken =
                tokens[i + 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;

              if (
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.isToken.SET(
                  token,
                ) &&
                nextToken.value === "("
              ) {
                // This is SET datatype, not SET statement
                return Object.assign(Object.assign({}, token), {
                  type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD,
                });
              }

              return token;
            });
          }

          /***/
        },

      /***/ "./src/languages/mysql.formatter.ts":
        /*!******************************************!*\
  !*** ./src/languages/mysql.formatter.ts ***!
  \******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ MySqlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_core_token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/core/token */ "./src/core/token.ts");
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          // TODO: split this into object with function categories

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html

          var reservedFunctions = [
            "ABS",
            "ACOS",
            "ADDDATE",
            "ADDTIME",
            "AES_DECRYPT",
            "AES_ENCRYPT",
            "AND",
            "ANY_VALUE",
            "ASCII",
            "ASIN",
            "ATAN",
            "ATAN2",
            "AVG",
            "BENCHMARK",
            "BIN",
            "BIN_TO_UUID",
            "BINARY",
            "BIT_AND",
            "BIT_COUNT",
            "BIT_LENGTH",
            "BIT_OR",
            "BIT_XOR",
            "CAN_ACCESS_COLUMN",
            "CAN_ACCESS_DATABASE",
            "CAN_ACCESS_TABLE",
            "CAN_ACCESS_USER",
            "CAN_ACCESS_VIEW",
            "CAST",
            "CEIL",
            "CEILING",
            "CHAR",
            "CHAR_LENGTH",
            "CHARACTER_LENGTH",
            "CHARSET",
            "COALESCE",
            "COERCIBILITY",
            "COLLATION",
            "COMPRESS",
            "CONCAT",
            "CONCAT_WS",
            "CONNECTION_ID",
            "CONV",
            "CONVERT",
            "CONVERT_TZ",
            "COS",
            "COT",
            "COUNT",
            "CRC32",
            "CUME_DIST",
            "CURDATE",
            "CURRENT_DATE",
            "CURRENT_ROLE",
            "CURRENT_TIME",
            "CURRENT_TIMESTAMP",
            "CURRENT_USER",
            "CURTIME",
            "DATABASE",
            "DATE",
            "DATE_ADD",
            "DATE_FORMAT",
            "DATE_SUB",
            "DATEDIFF",
            "DAY",
            "DAYNAME",
            "DAYOFMONTH",
            "DAYOFWEEK",
            "DAYOFYEAR",
            "DEFAULT",
            "DEGREES",
            "DENSE_RANK",
            "DIV",
            "ELT",
            "EXP",
            "EXPORT_SET",
            "EXTRACT",
            "ExtractValue",
            "FIELD",
            "FIND_IN_SET",
            "FIRST_VALUE",
            "FLOOR",
            "FORMAT",
            "FORMAT_BYTES",
            "FORMAT_PICO_TIME",
            "FOUND_ROWS",
            "FROM_BASE64",
            "FROM_DAYS",
            "FROM_UNIXTIME",
            "GeomCollection",
            "GeometryCollection",
            "GET_DD_COLUMN_PRIVILEGES",
            "GET_DD_CREATE_OPTIONS",
            "GET_DD_INDEX_SUB_PART_LENGTH",
            "GET_FORMAT",
            "GET_LOCK",
            "GREATEST",
            "GROUP_CONCAT",
            "GROUPING",
            "GTID_SUBSET",
            "GTID_SUBTRACT",
            "HEX",
            "HOUR",
            "ICU_VERSION",
            "IF",
            "IFNULL",
            "IN",
            "INET_ATON",
            "INET_NTOA",
            "INET6_ATON",
            "INET6_NTOA",
            "INSERT",
            "INSTR",
            "INTERNAL_AUTO_INCREMENT",
            "INTERNAL_AVG_ROW_LENGTH",
            "INTERNAL_CHECK_TIME",
            "INTERNAL_CHECKSUM",
            "INTERNAL_DATA_FREE",
            "INTERNAL_DATA_LENGTH",
            "INTERNAL_DD_CHAR_LENGTH",
            "INTERNAL_GET_COMMENT_OR_ERROR",
            "INTERNAL_GET_ENABLED_ROLE_JSON",
            "INTERNAL_GET_HOSTNAME",
            "INTERNAL_GET_USERNAME",
            "INTERNAL_GET_VIEW_WARNING_OR_ERROR",
            "INTERNAL_INDEX_COLUMN_CARDINALITY",
            "INTERNAL_INDEX_LENGTH",
            "INTERNAL_IS_ENABLED_ROLE",
            "INTERNAL_IS_MANDATORY_ROLE",
            "INTERNAL_KEYS_DISABLED",
            "INTERNAL_MAX_DATA_LENGTH",
            "INTERNAL_TABLE_ROWS",
            "INTERNAL_UPDATE_TIME",
            "INTERVAL",
            "IS",
            "IS_FREE_LOCK",
            "IS_IPV4",
            "IS_IPV4_COMPAT",
            "IS_IPV4_MAPPED",
            "IS_IPV6",
            "IS NOT",
            "IS NOT NULL",
            "IS NULL",
            "IS_USED_LOCK",
            "IS_UUID",
            "ISNULL",
            "JSON_ARRAY",
            "JSON_ARRAY_APPEND",
            "JSON_ARRAY_INSERT",
            "JSON_ARRAYAGG",
            "JSON_CONTAINS",
            "JSON_CONTAINS_PATH",
            "JSON_DEPTH",
            "JSON_EXTRACT",
            "JSON_INSERT",
            "JSON_KEYS",
            "JSON_LENGTH",
            "JSON_MERGE",
            "JSON_MERGE_PATCH",
            "JSON_MERGE_PRESERVE",
            "JSON_OBJECT",
            "JSON_OBJECTAGG",
            "JSON_OVERLAPS",
            "JSON_PRETTY",
            "JSON_QUOTE",
            "JSON_REMOVE",
            "JSON_REPLACE",
            "JSON_SCHEMA_VALID",
            "JSON_SCHEMA_VALIDATION_REPORT",
            "JSON_SEARCH",
            "JSON_SET",
            "JSON_STORAGE_FREE",
            "JSON_STORAGE_SIZE",
            "JSON_TABLE",
            "JSON_TYPE",
            "JSON_UNQUOTE",
            "JSON_VALID",
            "JSON_VALUE",
            "LAG",
            "LAST_DAY",
            "LAST_INSERT_ID",
            "LAST_VALUE",
            "LCASE",
            "LEAD",
            "LEAST",
            "LEFT",
            "LENGTH",
            "LIKE",
            "LineString",
            "LN",
            "LOAD_FILE",
            "LOCALTIME",
            "LOCALTIMESTAMP",
            "LOCATE",
            "LOG",
            "LOG10",
            "LOG2",
            "LOWER",
            "LPAD",
            "LTRIM",
            "MAKE_SET",
            "MAKEDATE",
            "MAKETIME",
            "MASTER_POS_WAIT",
            "MATCH",
            "MAX",
            "MBRContains",
            "MBRCoveredBy",
            "MBRCovers",
            "MBRDisjoint",
            "MBREquals",
            "MBRIntersects",
            "MBROverlaps",
            "MBRTouches",
            "MBRWithin",
            "MD5",
            "MEMBER OF",
            "MICROSECOND",
            "MID",
            "MIN",
            "MINUTE",
            "MOD",
            "MONTH",
            "MONTHNAME",
            "MultiLineString",
            "MultiPoint",
            "MultiPolygon",
            "NAME_CONST",
            "NOT",
            "NOT IN",
            "NOT LIKE",
            "NOT REGEXP",
            "NOW",
            "NTH_VALUE",
            "NTILE",
            "NULLIF",
            "OCT",
            "OCTET_LENGTH",
            "OR",
            "ORD",
            "PERCENT_RANK",
            "PERIOD_ADD",
            "PERIOD_DIFF",
            "PI",
            "Point",
            "Polygon",
            "POSITION",
            "POW",
            "POWER",
            "PS_CURRENT_THREAD_ID",
            "PS_THREAD_ID",
            "QUARTER",
            "QUOTE",
            "RADIANS",
            "RAND",
            "RANDOM_BYTES",
            "RANK",
            "REGEXP",
            "REGEXP_INSTR",
            "REGEXP_LIKE",
            "REGEXP_REPLACE",
            "REGEXP_SUBSTR",
            "RELEASE_ALL_LOCKS",
            "RELEASE_LOCK",
            "REPEAT",
            "REPLACE",
            "REVERSE",
            "RIGHT",
            "RLIKE",
            "ROLES_GRAPHML",
            "ROUND",
            "ROW_COUNT",
            "ROW_NUMBER",
            "RPAD",
            "RTRIM",
            "SCHEMA",
            "SEC_TO_TIME",
            "SECOND",
            "SESSION_USER",
            "SHA1",
            "SHA2",
            "SIGN",
            "SIN",
            "SLEEP",
            "SOUNDEX",
            "SOUNDS LIKE",
            "SOURCE_POS_WAIT",
            "SPACE",
            "SQRT",
            "ST_Area",
            "ST_AsBinary",
            "ST_AsGeoJSON",
            "ST_AsText",
            "ST_Buffer",
            "ST_Buffer_Strategy",
            "ST_Centroid",
            "ST_Collect",
            "ST_Contains",
            "ST_ConvexHull",
            "ST_Crosses",
            "ST_Difference",
            "ST_Dimension",
            "ST_Disjoint",
            "ST_Distance",
            "ST_Distance_Sphere",
            "ST_EndPoint",
            "ST_Envelope",
            "ST_Equals",
            "ST_ExteriorRing",
            "ST_FrechetDistance",
            "ST_GeoHash",
            "ST_GeomCollFromText",
            "ST_GeomCollFromWKB",
            "ST_GeometryN",
            "ST_GeometryType",
            "ST_GeomFromGeoJSON",
            "ST_GeomFromText",
            "ST_GeomFromWKB",
            "ST_HausdorffDistance",
            "ST_InteriorRingN",
            "ST_Intersection",
            "ST_Intersects",
            "ST_IsClosed",
            "ST_IsEmpty",
            "ST_IsSimple",
            "ST_IsValid",
            "ST_LatFromGeoHash",
            "ST_Latitude",
            "ST_Length",
            "ST_LineFromText",
            "ST_LineFromWKB",
            "ST_LineInterpolatePoint",
            "ST_LineInterpolatePoints",
            "ST_LongFromGeoHash",
            "ST_Longitude",
            "ST_MakeEnvelope",
            "ST_MLineFromText",
            "ST_MLineFromWKB",
            "ST_MPointFromText",
            "ST_MPointFromWKB",
            "ST_MPolyFromText",
            "ST_MPolyFromWKB",
            "ST_NumGeometries",
            "ST_NumInteriorRing",
            "ST_NumPoints",
            "ST_Overlaps",
            "ST_PointAtDistance",
            "ST_PointFromGeoHash",
            "ST_PointFromText",
            "ST_PointFromWKB",
            "ST_PointN",
            "ST_PolyFromText",
            "ST_PolyFromWKB",
            "ST_Simplify",
            "ST_SRID",
            "ST_StartPoint",
            "ST_SwapXY",
            "ST_SymDifference",
            "ST_Touches",
            "ST_Transform",
            "ST_Union",
            "ST_Validate",
            "ST_Within",
            "ST_X",
            "ST_Y",
            "STATEMENT_DIGEST",
            "STATEMENT_DIGEST_TEXT",
            "STD",
            "STDDEV",
            "STDDEV_POP",
            "STDDEV_SAMP",
            "STR_TO_DATE",
            "STRCMP",
            "SUBDATE",
            "SUBSTR",
            "SUBSTRING",
            "SUBSTRING_INDEX",
            "SUBTIME",
            "SUM",
            "SYSDATE",
            "SYSTEM_USER",
            "TAN",
            "TIME",
            "TIME_FORMAT",
            "TIME_TO_SEC",
            "TIMEDIFF",
            "TIMESTAMP",
            "TIMESTAMPADD",
            "TIMESTAMPDIFF",
            "TO_BASE64",
            "TO_DAYS",
            "TO_SECONDS",
            "TRIM",
            "TRUNCATE",
            "UCASE",
            "UNCOMPRESS",
            "UNCOMPRESSED_LENGTH",
            "UNHEX",
            "UNIX_TIMESTAMP",
            "UpdateXML",
            "UPPER",
            "USER",
            "UTC_DATE",
            "UTC_TIME",
            "UTC_TIMESTAMP",
            "UUID",
            "UUID_SHORT",
            "UUID_TO_BIN",
            "VALIDATE_PASSWORD_STRENGTH",
            "VALUES",
            "VAR_POP",
            "VAR_SAMP",
            "VARIANCE",
            "VERSION",
            "WAIT_FOR_EXECUTED_GTID_SET",
            "WAIT_UNTIL_SQL_THREAD_AFTER_GTIDS",
            "WEEK",
            "WEEKDAY",
            "WEEKOFYEAR",
            "WEIGHT_STRING",
            "XOR",
            "YEAR",
            "YEARWEEK",
          ];
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://dev.mysql.com/doc/refman/8.0/en/keywords.html

          var reservedKeywords = [
            "ACCESSIBLE",
            "ACCOUNT",
            "ACTION",
            "ACTIVE",
            "ADMIN",
            "AFTER",
            "AGAINST",
            "AGGREGATE",
            "ALGORITHM",
            "ALL",
            "ALTER",
            "ALWAYS",
            "ANALYSE",
            "ANALYZE",
            "ANY",
            "ARRAY",
            "AS",
            "ASC",
            "ASENSITIVE",
            "AT",
            "ATTRIBUTE",
            "AUTHENTICATION",
            "AUTOEXTEND_SIZE",
            "AUTO_INCREMENT",
            "AVG_ROW_LENGTH",
            "BACKUP",
            "BEFORE",
            "BEGIN",
            "BETWEEN",
            "BIGINT",
            "BIT",
            "BLOB",
            "BLOCK",
            "BOOL",
            "BOOLEAN",
            "BOTH",
            "BTREE",
            "BUCKETS",
            "BY",
            "BYTE",
            "CACHE",
            "CASCADE",
            "CASCADED",
            "CATALOG_NAME",
            "CHAIN",
            "CHALLENGE_RESPONSE",
            "CHANGE",
            "CHANGED",
            "CHANNEL",
            "CHARACTER",
            "CHARACTER SET",
            "CHECK",
            "CHECKSUM",
            "CIPHER",
            "CLASS_ORIGIN",
            "CLIENT",
            "CLOSE",
            "CODE",
            "COLLATE",
            "COLUMN",
            "COLUMNS",
            "COLUMN_FORMAT",
            "COLUMN_NAME",
            "COMMENT",
            "COMMITTED",
            "COMPACT",
            "COMPLETION",
            "COMPONENT",
            "COMPRESSED",
            "COMPRESSION",
            "CONCURRENT",
            "CONDITION",
            "CONNECTION",
            "CONSISTENT",
            "CONSTRAINT",
            "CONSTRAINT_CATALOG",
            "CONSTRAINT_NAME",
            "CONSTRAINT_SCHEMA",
            "CONTAINS",
            "CONTEXT",
            "CONTINUE",
            "CPU",
            "CREATE",
            "CROSS",
            "CUBE",
            "CURRENT",
            "CURSOR",
            "CURSOR_NAME",
            "DATA",
            "DATABASES",
            "DATAFILE",
            "DATETIME",
            "DAY_HOUR",
            "DAY_MICROSECOND",
            "DAY_MINUTE",
            "DAY_SECOND",
            "DEALLOCATE",
            "DEC",
            "DECIMAL",
            "DECLARE",
            "DEFAULT_AUTH",
            "DEFINER",
            "DEFINITION",
            "DELAYED",
            "DELAY_KEY_WRITE",
            "DESC",
            "DESCRIPTION",
            "DES_KEY_FILE",
            "DETERMINISTIC",
            "DIAGNOSTICS",
            "DIRECTORY",
            "DISABLE",
            "DISCARD",
            "DISK",
            "DISTINCT",
            "DISTINCTROW",
            "DOUBLE",
            "DROP",
            "DUAL",
            "DUMPFILE",
            "DUPLICATE",
            "DYNAMIC",
            "EACH",
            "EMPTY",
            "ENABLE",
            "ENCLOSED",
            "ENCRYPTION",
            "ENDS",
            "ENFORCED",
            "ENGINE",
            "ENGINES",
            "ENGINE_ATTRIBUTE",
            "ENUM",
            "ERROR",
            "ERRORS",
            "ESCAPE",
            "ESCAPED",
            "EVENT",
            "EVENTS",
            "EVERY",
            "EXCHANGE",
            "EXCLUDE",
            "EXISTS",
            "EXIT",
            "EXPANSION",
            "EXPIRE",
            "EXPORT",
            "EXTENDED",
            "EXTENT_SIZE",
            "FACTOR",
            "FAILED_LOGIN_ATTEMPTS",
            "FALSE",
            "FAST",
            "FAULTS",
            "FETCH",
            "FIELDS",
            "FILE",
            "FILE_BLOCK_SIZE",
            "FILTER",
            "FINISH",
            "FIRST",
            "FIXED",
            "FLOAT",
            "FLOAT4",
            "FLOAT8",
            "FOLLOWING",
            "FOLLOWS",
            "FOR",
            "FORCE",
            "FOREIGN",
            "FOUND",
            "FULL",
            "FULLTEXT",
            "FUNCTION",
            "GENERAL",
            "GENERATED",
            "GEOMCOLLECTION",
            "GEOMETRY",
            "GEOMETRYCOLLECTION",
            "GET",
            "GET_MASTER_PUBLIC_KEY",
            "GET_SOURCE_PUBLIC_KEY",
            "GLOBAL",
            "@@GLOBAL",
            "GRANTS",
            "GROUP",
            "GROUPS",
            "GROUP_REPLICATION",
            "GTID_ONLY",
            "HASH",
            "HIGH_PRIORITY",
            "HISTOGRAM",
            "HISTORY",
            "HOST",
            "HOSTS",
            "HOUR_MICROSECOND",
            "HOUR_MINUTE",
            "HOUR_SECOND",
            "IDENTIFIED",
            "IGNORE",
            "IGNORE_SERVER_IDS",
            "IMPORT",
            "INACTIVE",
            "INDEX",
            "INDEXES",
            "INFILE",
            "INITIAL",
            "INITIAL_SIZE",
            "INITIATE",
            "INNER",
            "INOUT",
            "INSENSITIVE",
            "INSERT_METHOD",
            "INSTALL",
            "INSTANCE",
            "INT",
            "INT1",
            "INT2",
            "INT3",
            "INT4",
            "INT8",
            "INTEGER",
            "INTO",
            "INVISIBLE",
            "INVOKER",
            "IO",
            "IO_AFTER_GTIDS",
            "IO_BEFORE_GTIDS",
            "IO_THREAD",
            "IPC",
            "ISOLATION",
            "ISSUER",
            "ITERATE",
            "JSON",
            "KEY",
            "KEYRING",
            "KEYS",
            "KEY_BLOCK_SIZE",
            "LANGUAGE",
            "LAST",
            "LATERAL",
            "LEADING",
            "LEAVE",
            "LEAVES",
            "LESS",
            "LEVEL",
            "LINEAR",
            "LINES",
            "LINESTRING",
            "LIST",
            "LOAD",
            "LOCAL",
            "LOCK",
            "LOCKED",
            "LOCKS",
            "LOGFILE",
            "LOGS",
            "LONG",
            "LONGBLOB",
            "LONGTEXT",
            "LOOP",
            "LOW_PRIORITY",
            "MASTER",
            "MASTER_AUTO_POSITION",
            "MASTER_BIND",
            "MASTER_COMPRESSION_ALGORITHMS",
            "MASTER_CONNECT_RETRY",
            "MASTER_DELAY",
            "MASTER_HEARTBEAT_PERIOD",
            "MASTER_HOST",
            "MASTER_LOG_FILE",
            "MASTER_LOG_POS",
            "MASTER_PASSWORD",
            "MASTER_PORT",
            "MASTER_PUBLIC_KEY_PATH",
            "MASTER_RETRY_COUNT",
            "MASTER_SERVER_ID",
            "MASTER_SSL",
            "MASTER_SSL_CA",
            "MASTER_SSL_CAPATH",
            "MASTER_SSL_CERT",
            "MASTER_SSL_CIPHER",
            "MASTER_SSL_CRL",
            "MASTER_SSL_CRLPATH",
            "MASTER_SSL_KEY",
            "MASTER_SSL_VERIFY_SERVER_CERT",
            "MASTER_TLS_CIPHERSUITES",
            "MASTER_TLS_VERSION",
            "MASTER_USER",
            "MASTER_ZSTD_COMPRESSION_LEVEL",
            "MAXVALUE",
            "MAX_CONNECTIONS_PER_HOUR",
            "MAX_QUERIES_PER_HOUR",
            "MAX_ROWS",
            "MAX_SIZE",
            "MAX_UPDATES_PER_HOUR",
            "MAX_USER_CONNECTIONS",
            "MEDIUM",
            "MEDIUMBLOB",
            "MEDIUMINT",
            "MEDIUMTEXT",
            "MEMBER",
            "MEMORY",
            "MERGE",
            "MESSAGE_TEXT",
            "MIDDLEINT",
            "MIGRATE",
            "MINUTE_MICROSECOND",
            "MINUTE_SECOND",
            "MIN_ROWS",
            "MODE",
            "MODIFIES",
            "MODIFY",
            "MULTILINESTRING",
            "MULTIPOINT",
            "MULTIPOLYGON",
            "MUTEX",
            "MYSQL_ERRNO",
            "NAME",
            "NAMES",
            "NATIONAL",
            "NATURAL",
            "NCHAR",
            "NDB",
            "NDBCLUSTER",
            "NESTED",
            "NETWORK_NAMESPACE",
            "NEVER",
            "NEW",
            "NEXT",
            "NO",
            "NODEGROUP",
            "NONE",
            "NOWAIT",
            "NO_WAIT",
            "NO_WRITE_TO_BINLOG",
            "NULL",
            "NULLS",
            "NUMBER",
            "NUMERIC",
            "NVARCHAR",
            "OF",
            "OFF",
            "OFFSET",
            "OJ",
            "OLD",
            "ON DELETE",
            "ON UPDATE",
            "ONE",
            "ONLY",
            "OPEN",
            "OPTIMIZE",
            "OPTIMIZER_COSTS",
            "OPTION",
            "OPTIONAL",
            "OPTIONALLY",
            "OPTIONS",
            "ORDER",
            "ORDINALITY",
            "ORGANIZATION",
            "OTHERS",
            "OUT",
            "OUTER",
            "OUTFILE",
            "OVER",
            "OWNER",
            "PACK_KEYS",
            "PAGE",
            "PARSER",
            "PARSE_GCOL_EXPR",
            "PARTIAL",
            "PARTITION",
            "PARTITIONING",
            "PARTITIONS",
            "PASSWORD",
            "PASSWORD_LOCK_TIME",
            "PATH",
            "PERSIST",
            "@@PERSIST",
            "PERSIST_ONLY",
            "@@PERSIST_ONLY",
            "PHASE",
            "PLUGIN",
            "PLUGINS",
            "PLUGIN_DIR",
            "POINT",
            "POLYGON",
            "PORT",
            "PRECEDES",
            "PRECEDING",
            "PRECISION",
            "PRESERVE",
            "PREV",
            "PRIMARY",
            "PRIVILEGES",
            "PRIVILEGE_CHECKS_USER",
            "PROCEDURE",
            "PROCESS",
            "PROCESSLIST",
            "PROFILE",
            "PROFILES",
            "PROXY",
            "PURGE",
            "QUERY",
            "QUICK",
            "RANDOM",
            "RANGE",
            "READ",
            "READS",
            "READ_ONLY",
            "READ_WRITE",
            "REAL",
            "REBUILD",
            "RECOVER",
            "RECURSIVE",
            "REDOFILE",
            "REDO_BUFFER_SIZE",
            "REDUNDANT",
            "REFERENCE",
            "REFERENCES",
            "REGISTRATION",
            "RELAY",
            "RELAYLOG",
            "RELAY_LOG_FILE",
            "RELAY_LOG_POS",
            "RELAY_THREAD",
            "RELEASE",
            "RELOAD",
            "REMOTE",
            "REMOVE",
            "RENAME",
            "REORGANIZE",
            "REPAIR",
            "REPEATABLE",
            "REPLICA",
            "REPLICAS",
            "REPLICATE_DO_DB",
            "REPLICATE_DO_TABLE",
            "REPLICATE_IGNORE_DB",
            "REPLICATE_IGNORE_TABLE",
            "REPLICATE_REWRITE_DB",
            "REPLICATE_WILD_DO_TABLE",
            "REPLICATE_WILD_IGNORE_TABLE",
            "REPLICATION",
            "REQUIRE",
            "REQUIRE_ROW_FORMAT",
            "RESIGNAL",
            "RESOURCE",
            "RESPECT",
            "RESTORE",
            "RESTRICT",
            "RESUME",
            "RETAIN",
            "RETURN",
            "RETURNED_SQLSTATE",
            "RETURNING",
            "RETURNS",
            "REUSE",
            "ROLE",
            "ROLLUP",
            "ROTATE",
            "ROUTINE",
            "ROW",
            "ROWS",
            "ROW_FORMAT",
            "RTREE",
            "SCHEDULE",
            "SCHEMAS",
            "SCHEMA_NAME",
            "SECONDARY",
            "SECONDARY_ENGINE",
            "SECONDARY_ENGINE_ATTRIBUTE",
            "SECONDARY_LOAD",
            "SECONDARY_UNLOAD",
            "SECOND_MICROSECOND",
            "SECURITY",
            "SENSITIVE",
            "SEPARATOR",
            "SERIAL",
            "SERIALIZABLE",
            "SERVER",
            "SESSION",
            "@@SESSION",
            "SHARE",
            "SIGNAL",
            "SIGNED",
            "SIMPLE",
            "SKIP",
            "SLAVE",
            "SLOW",
            "SMALLINT",
            "SNAPSHOT",
            "SOCKET",
            "SOME",
            "SONAME",
            "SOUNDS",
            "SOURCE",
            "SOURCE_AUTO_POSITION",
            "SOURCE_BIND",
            "SOURCE_COMPRESSION_ALGORITHMS",
            "SOURCE_CONNECT_RETRY",
            "SOURCE_DELAY",
            "SOURCE_HEARTBEAT_PERIOD",
            "SOURCE_HOST",
            "SOURCE_LOG_FILE",
            "SOURCE_LOG_POS",
            "SOURCE_PASSWORD",
            "SOURCE_PORT",
            "SOURCE_PUBLIC_KEY_PATH",
            "SOURCE_RETRY_COUNT",
            "SOURCE_SSL",
            "SOURCE_SSL_CA",
            "SOURCE_SSL_CAPATH",
            "SOURCE_SSL_CERT",
            "SOURCE_SSL_CIPHER",
            "SOURCE_SSL_CRL",
            "SOURCE_SSL_CRLPATH",
            "SOURCE_SSL_KEY",
            "SOURCE_SSL_VERIFY_SERVER_CERT",
            "SOURCE_TLS_CIPHERSUITES",
            "SOURCE_TLS_VERSION",
            "SOURCE_USER",
            "SOURCE_ZSTD_COMPRESSION_LEVEL",
            "SPATIAL",
            "SPECIFIC",
            "SQL",
            "SQLEXCEPTION",
            "SQLSTATE",
            "SQLWARNING",
            "SQL_AFTER_GTIDS",
            "SQL_AFTER_MTS_GAPS",
            "SQL_BEFORE_GTIDS",
            "SQL_BIG_RESULT",
            "SQL_BUFFER_RESULT",
            "SQL_CACHE",
            "SQL_CALC_FOUND_ROWS",
            "SQL_NO_CACHE",
            "SQL_SMALL_RESULT",
            "SQL_THREAD",
            "SQL_TSI_DAY",
            "SQL_TSI_HOUR",
            "SQL_TSI_MINUTE",
            "SQL_TSI_MONTH",
            "SQL_TSI_QUARTER",
            "SQL_TSI_SECOND",
            "SQL_TSI_WEEK",
            "SQL_TSI_YEAR",
            "SRID",
            "SSL",
            "STACKED",
            "START",
            "STARTING",
            "STARTS",
            "STATS_AUTO_RECALC",
            "STATS_PERSISTENT",
            "STATS_SAMPLE_PAGES",
            "STATUS",
            "STOP",
            "STORAGE",
            "STORED",
            "STREAM",
            "STRING",
            "SUBCLASS_ORIGIN",
            "SUBJECT",
            "SUBPARTITION",
            "SUBPARTITIONS",
            "SUPER",
            "SUSPEND",
            "SWAPS",
            "SWITCHES",
            "SYSTEM",
            "TABLES",
            "TABLESPACE",
            "TABLE_CHECKSUM",
            "TABLE_NAME",
            "TEMPORARY",
            "TEMPTABLE",
            "TERMINATED",
            "TEXT",
            "THAN",
            "THEN",
            "THREAD_PRIORITY",
            "TIES",
            "TINYBLOB",
            "TINYINT",
            "TINYTEXT",
            "TLS",
            "TO",
            "TRAILING",
            "TRANSACTION",
            "TRIGGER",
            "TRIGGERS",
            "TRUE",
            "TYPE",
            "TYPES",
            "UNBOUNDED",
            "UNCOMMITTED",
            "UNDEFINED",
            "UNDO",
            "UNDOFILE",
            "UNDO_BUFFER_SIZE",
            "UNICODE",
            "UNINSTALL",
            "UNIQUE",
            "UNKNOWN",
            "UNLOCK",
            "UNREGISTER",
            "UNSIGNED",
            "UNTIL",
            "UPGRADE",
            "USAGE",
            "USER_RESOURCES",
            "USE_FRM",
            "VALIDATION",
            "VALUE",
            "VARBINARY",
            "VARCHAR",
            "VARCHARACTER",
            "VARIABLES",
            "VARYING",
            "VCPU",
            "VIEW",
            "VIRTUAL",
            "VISIBLE",
            "WAIT",
            "WARNINGS",
            "WHILE",
            "WINDOW",
            "WITHOUT",
            "WORK",
            "WRAPPER",
            "WRITE",
            "X509",
            "XID",
            "XML",
            "YEAR_MONTH",
            "ZEROFILL",
            "ZONE",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html

          var reservedCommands = [
            "ALTER DATABASE",
            "ALTER EVENT",
            "ALTER FUNCTION",
            "ALTER INSTANCE",
            "ALTER LOGFILE GROUP",
            "ALTER PROCEDURE",
            "ALTER RESOURCE GROUP",
            "ALTER SERVER",
            "ALTER TABLE",
            "ALTER TABLESPACE",
            "ALTER USER",
            "ALTER VIEW",
            "ANALYZE TABLE",
            "BINLOG",
            "CACHE INDEX",
            "CALL",
            "CHANGE MASTER TO",
            "CHANGE REPLICATION FILTER",
            "CHANGE REPLICATION SOURCE TO",
            "CHECK TABLE",
            "CHECKSUM TABLE",
            "CLONE",
            "COMMIT",
            "CREATE DATABASE",
            "CREATE EVENT",
            "CREATE FUNCTION",
            "CREATE FUNCTION",
            "CREATE INDEX",
            "CREATE LOGFILE GROUP",
            "CREATE PROCEDURE",
            "CREATE RESOURCE GROUP",
            "CREATE ROLE",
            "CREATE SERVER",
            "CREATE SPATIAL REFERENCE SYSTEM",
            "CREATE TABLE",
            "CREATE TABLESPACE",
            "CREATE TRIGGER",
            "CREATE USER",
            "CREATE VIEW",
            "DEALLOCATE PREPARE",
            "DELETE",
            "DELETE FROM",
            "DESCRIBE",
            "DO",
            "DROP DATABASE",
            "DROP EVENT",
            "DROP FUNCTION",
            "DROP FUNCTION",
            "DROP INDEX",
            "DROP LOGFILE GROUP",
            "DROP PROCEDURE",
            "DROP RESOURCE GROUP",
            "DROP ROLE",
            "DROP SERVER",
            "DROP SPATIAL REFERENCE SYSTEM",
            "DROP TABLE",
            "DROP TABLESPACE",
            "DROP TRIGGER",
            "DROP USER",
            "DROP VIEW",
            "EXECUTE",
            "EXPLAIN",
            "FLUSH",
            "GRANT",
            "HANDLER",
            "HELP",
            "IMPORT TABLE",
            "INSERT",
            "INSTALL COMPONENT",
            "INSTALL PLUGIN",
            "KILL",
            "LOAD DATA",
            "LOAD INDEX INTO CACHE",
            "LOAD XML",
            "LOCK INSTANCE FOR BACKUP",
            "LOCK TABLES",
            "MASTER_POS_WAIT",
            "OPTIMIZE TABLE",
            "PREPARE",
            "PURGE BINARY LOGS",
            "RELEASE SAVEPOINT",
            "RENAME TABLE",
            "RENAME USER",
            "REPAIR TABLE",
            "REPLACE",
            "RESET",
            "RESET MASTER",
            "RESET PERSIST",
            "RESET REPLICA",
            "RESET SLAVE",
            "RESTART",
            "REVOKE",
            "ROLLBACK",
            "ROLLBACK TO SAVEPOINT",
            "SAVEPOINT",
            "SELECT",
            "SET",
            "SET CHARACTER SET",
            "SET DEFAULT ROLE",
            "SET NAMES",
            "SET PASSWORD",
            "SET RESOURCE GROUP",
            "SET ROLE",
            "SET TRANSACTION",
            "SHOW",
            "SHOW BINARY LOGS",
            "SHOW BINLOG EVENTS",
            "SHOW CHARACTER SET",
            "SHOW COLLATION",
            "SHOW COLUMNS",
            "SHOW CREATE DATABASE",
            "SHOW CREATE EVENT",
            "SHOW CREATE FUNCTION",
            "SHOW CREATE PROCEDURE",
            "SHOW CREATE TABLE",
            "SHOW CREATE TRIGGER",
            "SHOW CREATE USER",
            "SHOW CREATE VIEW",
            "SHOW DATABASES",
            "SHOW ENGINE",
            "SHOW ENGINES",
            "SHOW ERRORS",
            "SHOW EVENTS",
            "SHOW FUNCTION CODE",
            "SHOW FUNCTION STATUS",
            "SHOW GRANTS",
            "SHOW INDEX",
            "SHOW MASTER STATUS",
            "SHOW OPEN TABLES",
            "SHOW PLUGINS",
            "SHOW PRIVILEGES",
            "SHOW PROCEDURE CODE",
            "SHOW PROCEDURE STATUS",
            "SHOW PROCESSLIST",
            "SHOW PROFILE",
            "SHOW PROFILES",
            "SHOW RELAYLOG EVENTS",
            "SHOW REPLICA STATUS",
            "SHOW REPLICAS",
            "SHOW SLAVE",
            "SHOW SLAVE HOSTS",
            "SHOW STATUS",
            "SHOW TABLE STATUS",
            "SHOW TABLES",
            "SHOW TRIGGERS",
            "SHOW VARIABLES",
            "SHOW WARNINGS",
            "SHUTDOWN",
            "SOURCE_POS_WAIT",
            "START GROUP_REPLICATION",
            "START REPLICA",
            "START SLAVE",
            "START TRANSACTION",
            "STOP GROUP_REPLICATION",
            "STOP REPLICA",
            "STOP SLAVE",
            "TABLE",
            "TRUNCATE TABLE",
            "UNINSTALL COMPONENT",
            "UNINSTALL PLUGIN",
            "UNLOCK INSTANCE",
            "UNLOCK TABLES",
            "UPDATE",
            "USE",
            "VALUES",
            "WITH",
            "XA", // flow control
            // 'IF',
            "ITERATE",
            "LEAVE",
            "LOOP",
            "REPEAT",
            "RETURN",
            "WHILE", // other
            "ADD",
            "ALTER COLUMN",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "WHERE",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN", // non-standard joins
            "STRAIGHT_JOIN",
            "NATURAL LEFT JOIN",
            "NATURAL LEFT OUTER JOIN",
            "NATURAL RIGHT JOIN",
            "NATURAL RIGHT OUTER JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE", "ELSEIF"]; // https://dev.mysql.com/doc/refman/8.0/en/

          var MySqlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(MySqlFormatter, _Formatter);

            var _super = _createSuper(MySqlFormatter);

            function MySqlFormatter() {
              _classCallCheck(this, MySqlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(MySqlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedLogicalOperators: ["AND", "OR", "XOR"],
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_3__.dedupe)(
                      [].concat(reservedKeywords, reservedFunctions),
                    ),
                    stringTypes: MySqlFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    lineCommentTypes: ["--", "#"],
                    specialWordChars: {
                      prefix: "@:",
                    },
                    operators: MySqlFormatter.operators,
                    preprocess: preprocess,
                  });
                },
              },
            ]);

            return MySqlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          MySqlFormatter.stringTypes = ["``", "''", '""'];
          MySqlFormatter.operators = [
            ":=",
            "<<",
            ">>",
            "<=>",
            "&&",
            "||",
            "->",
            "->>",
          ];

          function preprocess(tokens) {
            return tokens.map(function (token, i) {
              var nextToken =
                tokens[i + 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;

              if (
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.isToken.SET(
                  token,
                ) &&
                nextToken.value === "("
              ) {
                // This is SET datatype, not SET statement
                return Object.assign(Object.assign({}, token), {
                  type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD,
                });
              }

              return token;
            });
          }

          /***/
        },

      /***/ "./src/languages/n1ql.formatter.ts":
        /*!*****************************************!*\
  !*** ./src/languages/n1ql.formatter.ts ***!
  \*****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ N1qlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          // TODO: split this into object with function categories

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/functions.html

          var reservedFunctions = [
            "ABORT",
            "ABS",
            "ACOS",
            "ADVISOR",
            "ARRAY_AGG",
            "ARRAY_AGG",
            "ARRAY_APPEND",
            "ARRAY_AVG",
            "ARRAY_BINARY_SEARCH",
            "ARRAY_CONCAT",
            "ARRAY_CONTAINS",
            "ARRAY_COUNT",
            "ARRAY_DISTINCT",
            "ARRAY_EXCEPT",
            "ARRAY_FLATTEN",
            "ARRAY_IFNULL",
            "ARRAY_INSERT",
            "ARRAY_INTERSECT",
            "ARRAY_LENGTH",
            "ARRAY_MAX",
            "ARRAY_MIN",
            "ARRAY_MOVE",
            "ARRAY_POSITION",
            "ARRAY_PREPEND",
            "ARRAY_PUT",
            "ARRAY_RANGE",
            "ARRAY_REMOVE",
            "ARRAY_REPEAT",
            "ARRAY_REPLACE",
            "ARRAY_REVERSE",
            "ARRAY_SORT",
            "ARRAY_STAR",
            "ARRAY_SUM",
            "ARRAY_SYMDIFF",
            "ARRAY_SYMDIFF1",
            "ARRAY_SYMDIFFN",
            "ARRAY_UNION",
            "ASIN",
            "ATAN",
            "ATAN2",
            "AVG",
            "BASE64",
            "BASE64_DECODE",
            "BASE64_ENCODE",
            "BITAND ",
            "BITCLEAR ",
            "BITNOT ",
            "BITOR ",
            "BITSET ",
            "BITSHIFT ",
            "BITTEST ",
            "BITXOR ",
            "CEIL",
            "CLOCK_LOCAL",
            "CLOCK_MILLIS",
            "CLOCK_STR",
            "CLOCK_TZ",
            "CLOCK_UTC",
            "COALESCE",
            "CONCAT",
            "CONCAT2",
            "CONTAINS",
            "CONTAINS_TOKEN",
            "CONTAINS_TOKEN_LIKE",
            "CONTAINS_TOKEN_REGEXP",
            "COS",
            "COUNT",
            "COUNT",
            "COUNTN",
            "CUME_DIST",
            "CURL",
            "DATE_ADD_MILLIS",
            "DATE_ADD_STR",
            "DATE_DIFF_MILLIS",
            "DATE_DIFF_STR",
            "DATE_FORMAT_STR",
            "DATE_PART_MILLIS",
            "DATE_PART_STR",
            "DATE_RANGE_MILLIS",
            "DATE_RANGE_STR",
            "DATE_TRUNC_MILLIS",
            "DATE_TRUNC_STR",
            "DECODE",
            "DECODE_JSON",
            "DEGREES",
            "DENSE_RANK",
            "DURATION_TO_STR", // 'E',
            "ENCODED_SIZE",
            "ENCODE_JSON",
            "EXP",
            "FIRST_VALUE",
            "FLOOR",
            "GREATEST",
            "HAS_TOKEN",
            "IFINF",
            "IFMISSING",
            "IFMISSINGORNULL",
            "IFNAN",
            "IFNANORINF",
            "IFNULL",
            "INITCAP",
            "ISARRAY",
            "ISATOM",
            "ISBITSET",
            "ISBOOLEAN",
            "ISNUMBER",
            "ISOBJECT",
            "ISSTRING",
            "LAG",
            "LAST_VALUE",
            "LEAD",
            "LEAST",
            "LENGTH",
            "LN",
            "LOG",
            "LOWER",
            "LTRIM",
            "MAX",
            "MEAN",
            "MEDIAN",
            "META",
            "MILLIS",
            "MILLIS_TO_LOCAL",
            "MILLIS_TO_STR",
            "MILLIS_TO_TZ",
            "MILLIS_TO_UTC",
            "MILLIS_TO_ZONE_NAME",
            "MIN",
            "MISSINGIF",
            "NANIF",
            "NEGINFIF",
            "NOW_LOCAL",
            "NOW_MILLIS",
            "NOW_STR",
            "NOW_TZ",
            "NOW_UTC",
            "NTH_VALUE",
            "NTILE",
            "NULLIF",
            "NVL",
            "NVL2",
            "OBJECT_ADD",
            "OBJECT_CONCAT",
            "OBJECT_INNER_PAIRS",
            "OBJECT_INNER_VALUES",
            "OBJECT_LENGTH",
            "OBJECT_NAMES",
            "OBJECT_PAIRS",
            "OBJECT_PUT",
            "OBJECT_REMOVE",
            "OBJECT_RENAME",
            "OBJECT_REPLACE",
            "OBJECT_UNWRAP",
            "OBJECT_VALUES",
            "PAIRS",
            "PERCENT_RANK",
            "PI",
            "POLY_LENGTH",
            "POSINFIF",
            "POSITION",
            "POWER",
            "RADIANS",
            "RANDOM",
            "RANK",
            "RATIO_TO_REPORT",
            "REGEXP_CONTAINS",
            "REGEXP_LIKE",
            "REGEXP_MATCHES",
            "REGEXP_POSITION",
            "REGEXP_REPLACE",
            "REGEXP_SPLIT",
            "REGEX_CONTAINS",
            "REGEX_LIKE",
            "REGEX_MATCHES",
            "REGEX_POSITION",
            "REGEX_REPLACE",
            "REGEX_SPLIT",
            "REPEAT",
            "REPLACE",
            "REVERSE",
            "ROUND",
            "ROW_NUMBER",
            "RTRIM",
            "SEARCH",
            "SEARCH_META",
            "SEARCH_SCORE",
            "SIGN",
            "SIN",
            "SPLIT",
            "SQRT",
            "STDDEV",
            "STDDEV_POP",
            "STDDEV_SAMP",
            "STR_TO_DURATION",
            "STR_TO_MILLIS",
            "STR_TO_TZ",
            "STR_TO_UTC",
            "STR_TO_ZONE_NAME",
            "SUBSTR",
            "SUFFIXES",
            "SUM",
            "TAN",
            "TITLE",
            "TOARRAY",
            "TOATOM",
            "TOBOOLEAN",
            "TOKENS",
            "TOKENS",
            "TONUMBER",
            "TOOBJECT",
            "TOSTRING",
            "TRIM",
            "TRUNC", // 'TYPE', // disabled
            "UPPER",
            "UUID",
            "VARIANCE",
            "VARIANCE_POP",
            "VARIANCE_SAMP",
            "VAR_POP",
            "VAR_SAMP",
            "WEEKDAY_MILLIS",
            "WEEKDAY_STR",
          ];
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html

          var reservedKeywords = [
            "ALL",
            "ALTER",
            "ANALYZE",
            "ANY",
            "ARRAY",
            "AS",
            "ASC",
            "AT",
            "BEGIN",
            "BETWEEN",
            "BINARY",
            "BOOLEAN",
            "BREAK",
            "BUCKET",
            "BUILD",
            "BY",
            "CALL",
            "CAST",
            "CHAR",
            "CLUSTER",
            "COLLATE",
            "COLLECTION",
            "COMMIT",
            "COMMITTED",
            "CONNECT",
            "CONTINUE",
            "CORRELATE",
            "CORRELATED",
            "COVER",
            "CREATE",
            "CURRENT",
            "DATABASE",
            "DATASET",
            "DATASTORE",
            "DECLARE",
            "DECREMENT",
            "DERIVED",
            "DESC",
            "DESCRIBE",
            "DISTINCT",
            "DO",
            "DROP",
            "EACH",
            "ELEMENT",
            "EVERY",
            "EXCLUDE",
            "EXISTS",
            "FALSE",
            "FETCH",
            "FILTER",
            "FIRST",
            "FLATTEN",
            "FLUSH",
            "FOLLOWING",
            "FOR",
            "FORCE",
            "FTS",
            "FUNCTION",
            "GOLANG",
            "GROUP",
            "GROUPS",
            "GSI",
            "HASH",
            "IF",
            "IGNORE",
            "ILIKE",
            "IN",
            "INCLUDE",
            "INCREMENT",
            "INDEX",
            "INLINE",
            "INNER",
            "INTO",
            "IS",
            "ISOLATION",
            "JAVASCRIPT",
            "KEY",
            "KEYS",
            "KEYSPACE",
            "KNOWN",
            "LANGUAGE",
            "LAST",
            "LEFT",
            "LETTING",
            "LEVEL",
            "LIKE",
            "LSM",
            "MAP",
            "MAPPING",
            "MATCHED",
            "MATERIALIZED",
            "MISSING",
            "NAMESPACE",
            "NL",
            "NO",
            "NOT",
            "NULL",
            "NULLS",
            "NUMBER",
            "OBJECT",
            "OFFSET",
            "OPTION",
            "OPTIONS",
            "ORDER",
            "OTHERS",
            "OUTER",
            "OVER",
            "PARSE",
            "PARTITION",
            "PASSWORD",
            "PATH",
            "POOL",
            "PRECEDING",
            "PRIMARY",
            "PRIVATE",
            "PRIVILEGE",
            "PROBE",
            "PROCEDURE",
            "PUBLIC",
            "RANGE",
            "RAW",
            "REALM",
            "REDUCE",
            "RENAME",
            "RESPECT",
            "RETURN",
            "RIGHT",
            "ROLE",
            "ROLLBACK",
            "ROW",
            "ROWS",
            "SATISFIES",
            "SCHEMA",
            "SCOPE",
            "SELF",
            "SEMI",
            "SOME",
            "START",
            "STATISTICS",
            "STRING",
            "SYSTEM",
            "THEN",
            "TIES",
            "TO",
            "TRAN",
            "TRANSACTION",
            "TRIGGER",
            "TRUE",
            "TRUNCATE",
            "UNBOUNDED",
            "UNDER",
            "UNIQUE",
            "UNKNOWN",
            "UNSET",
            "USE",
            "USER",
            "VALIDATE",
            "VALUE",
            "VALUED",
            "VIA",
            "VIEW",
            "WHILE",
            "WINDOW",
            "WITHIN",
            "WORK",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html

          var reservedCommands = [
            "ADVISE",
            "ALTER INDEX",
            "BEGIN TRANSACTION",
            "BUILD INDEX",
            "COMMIT TRANSACTION",
            "CREATE COLLECTION",
            "CREATE FUNCTION",
            "CREATE INDEX",
            "CREATE PRIMARY INDEX",
            "CREATE SCOPE",
            "CREATE TABLE",
            "DELETE",
            "DELETE FROM",
            "DROP COLLECTION",
            "DROP FUNCTION",
            "DROP INDEX",
            "DROP PRIMARY INDEX",
            "DROP SCOPE",
            "EXECUTE",
            "EXECUTE FUNCTION",
            "EXPLAIN",
            "GRANT",
            "INFER",
            "INSERT",
            "MERGE",
            "PREPARE",
            "RETURNING",
            "REVOKE",
            "ROLLBACK TRANSACTION",
            "SAVEPOINT",
            "SELECT",
            "SET TRANSACTION",
            "UPDATE",
            "UPDATE STATISTICS",
            "UPSERT", // other
            "DROP TABLE",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "LET",
            "LIMIT",
            "OFFSET",
            "NEST",
            "ORDER BY",
            "SET CURRENT SCHEMA",
            "SET SCHEMA",
            "SET",
            "SHOW",
            "UNNEST",
            "USE KEYS",
            "VALUES",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html

          var N1qlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(N1qlFormatter, _Formatter);

            var _super = _createSuper(N1qlFormatter);

            function N1qlFormatter() {
              _classCallCheck(this, N1qlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(N1qlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedLogicalOperators: ["AND", "OR", "XOR"],
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(reservedKeywords, reservedFunctions),
                    ),
                    stringTypes: N1qlFormatter.stringTypes,
                    blockStart: ["(", "[", "{"],
                    blockEnd: [")", "]", "}"],
                    namedPlaceholderTypes: ["$"],
                    lineCommentTypes: ["#", "--"],
                    operators: N1qlFormatter.operators,
                  });
                },
              },
            ]);

            return N1qlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          N1qlFormatter.stringTypes = ['""', "''", "``"];
          N1qlFormatter.operators = ["=="];

          /***/
        },

      /***/ "./src/languages/plsql.formatter.ts":
        /*!******************************************!*\
  !*** ./src/languages/plsql.formatter.ts ***!
  \******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ PlSqlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_core_token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/core/token */ "./src/core/token.ts");
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */

          var reservedKeywords = [
            // 'A',
            "ACCESSIBLE",
            "AGENT",
            "AGGREGATE",
            "ALL",
            "ALTER",
            "ANY",
            "ARRAY",
            "AS",
            "ASC",
            "AT",
            "ATTRIBUTE",
            "AUTHID",
            "AVG",
            "BETWEEN",
            "BFILE_BASE",
            "BINARY",
            "BINARY_INTEGER",
            "BLOB_BASE",
            "BLOCK",
            "BODY",
            "BOOLEAN",
            "BOTH",
            "BOUND",
            "BREADTH",
            "BULK",
            "BY",
            "BYTE", // 'C',
            "CALL",
            "CALLING",
            "CASCADE",
            "CAST",
            "CHAR",
            "CHARACTER",
            "CHARSET",
            "CHARSETFORM",
            "CHARSETID",
            "CHAR_BASE",
            "CHECK",
            "CLOB_BASE",
            "CLONE",
            "CLOSE",
            "CLUSTER",
            "CLUSTERS",
            "COALESCE",
            "COLAUTH",
            "COLLECT",
            "COLUMNS",
            "COMMENT",
            "COMMIT",
            "COMMITTED",
            "COMPILED",
            "COMPRESS",
            "CONNECT",
            "CONSTANT",
            "CONSTRUCTOR",
            "CONTEXT",
            "CONTINUE",
            "CONVERT",
            "COUNT",
            "CRASH",
            "CREATE",
            "CREDENTIAL",
            "CURRENT",
            "CURRVAL",
            "CURSOR",
            "CUSTOMDATUM",
            "DANGLING",
            "DATA",
            "DATE",
            "DATE_BASE",
            "DAY",
            "DECIMAL",
            "DEFAULT",
            "DEFINE",
            "DEPTH",
            "DESC",
            "DETERMINISTIC",
            "DIRECTORY",
            "DISTINCT",
            "DO",
            "DOUBLE",
            "DROP",
            "DURATION",
            "ELEMENT",
            "ELSIF",
            "EMPTY",
            "ESCAPE",
            "EXCEPTIONS",
            "EXCLUSIVE",
            "EXECUTE",
            "EXISTS",
            "EXIT",
            "EXTENDS",
            "EXTERNAL",
            "EXTRACT",
            "FALSE",
            "FETCH",
            "FINAL",
            "FIRST",
            "FIXED",
            "FLOAT",
            "FOR",
            "FORALL",
            "FORCE",
            "FUNCTION",
            "GENERAL",
            "GOTO",
            "GRANT",
            "GROUP",
            "HASH",
            "HEAP",
            "HIDDEN",
            "HOUR",
            "IDENTIFIED",
            "IF",
            "IMMEDIATE",
            "IN",
            "INCLUDING",
            "INDEX",
            "INDEXES",
            "INDICATOR",
            "INDICES",
            "INFINITE",
            "INSTANTIABLE",
            "INT",
            "INTEGER",
            "INTERFACE",
            "INTERVAL",
            "INTO",
            "INVALIDATE",
            "IS",
            "ISOLATION",
            "JAVA",
            "LANGUAGE",
            "LARGE",
            "LEADING",
            "LENGTH",
            "LEVEL",
            "LIBRARY",
            "LIKE",
            "LIKE2",
            "LIKE4",
            "LIKEC",
            "LIMITED",
            "LOCAL",
            "LOCK",
            "LONG",
            "MAP",
            "MAX",
            "MAXLEN",
            "MEMBER",
            "MERGE",
            "MIN",
            "MINUTE",
            "MLSLABEL",
            "MOD",
            "MODE",
            "MONTH",
            "MULTISET",
            "NAME",
            "NAN",
            "NATIONAL",
            "NATIVE",
            "NATURAL",
            "NATURALN",
            "NCHAR",
            "NEW",
            "NEXTVAL",
            "NOCOMPRESS",
            "NOCOPY",
            "NOT",
            "NOWAIT",
            "NULL",
            "NULLIF",
            "NUMBER",
            "NUMBER_BASE",
            "OBJECT",
            "OCICOLL",
            "OCIDATE",
            "OCIDATETIME",
            "OCIDURATION",
            "OCIINTERVAL",
            "OCILOBLOCATOR",
            "OCINUMBER",
            "OCIRAW",
            "OCIREF",
            "OCIREFCURSOR",
            "OCIROWID",
            "OCISTRING",
            "OCITYPE",
            "OF",
            "OLD",
            "ON DELETE",
            "ON UPDATE",
            "ONLY",
            "OPAQUE",
            "OPEN",
            "OPERATOR",
            "OPTION",
            "ORACLE",
            "ORADATA",
            "ORDER",
            "ORGANIZATION",
            "ORLANY",
            "ORLVARY",
            "OTHERS",
            "OUT",
            "OVERLAPS",
            "OVERRIDING",
            "PACKAGE",
            "PARALLEL_ENABLE",
            "PARAMETER",
            "PARAMETERS",
            "PARENT",
            "PARTITION",
            "PASCAL",
            "PCTFREE",
            "PIPE",
            "PIPELINED",
            "PLS_INTEGER",
            "PLUGGABLE",
            "POSITIVE",
            "POSITIVEN",
            "PRAGMA",
            "PRECISION",
            "PRIOR",
            "PRIVATE",
            "PROCEDURE",
            "PUBLIC",
            "RAISE",
            "RANGE",
            "RAW",
            "READ",
            "REAL",
            "RECORD",
            "REF",
            "REFERENCE",
            "RELEASE",
            "RELIES_ON",
            "REM",
            "REMAINDER",
            "RENAME",
            "RESOURCE",
            "RESULT",
            "RESULT_CACHE",
            "RETURN",
            "REVERSE",
            "REVOKE",
            "ROLLBACK",
            "ROW",
            "ROWID",
            "ROWNUM",
            "ROWTYPE",
            "SAMPLE",
            "SAVE",
            "SAVEPOINT",
            "SB1",
            "SB2",
            "SB4",
            "SEARCH",
            "SECOND",
            "SEGMENT",
            "SELF",
            "SEPARATE",
            "SEQUENCE",
            "SERIALIZABLE",
            "SHARE",
            "SHORT",
            "SIZE",
            "SIZE_T",
            "SMALLINT",
            "SOME",
            "SPACE",
            "SPARSE",
            "SQL",
            "SQLCODE",
            "SQLDATA",
            "SQLERRM",
            "SQLNAME",
            "SQLSTATE",
            "STANDARD",
            "START",
            "STATIC",
            "STDDEV",
            "STORED",
            "STRING",
            "STRUCT",
            "STYLE",
            "SUBMULTISET",
            "SUBPARTITION",
            "SUBSTITUTABLE",
            "SUBTYPE",
            "SUCCESSFUL",
            "SUM",
            "SYNONYM",
            "SYSDATE",
            "TABAUTH",
            "TABLE",
            "TDO",
            "THE",
            "THEN",
            "TIME",
            "TIMESTAMP",
            "TIMEZONE_ABBR",
            "TIMEZONE_HOUR",
            "TIMEZONE_MINUTE",
            "TIMEZONE_REGION",
            "TO",
            "TRAILING",
            "TRANSACTION",
            "TRANSACTIONAL",
            "TRIGGER",
            "TRUE",
            "TRUSTED",
            "TYPE",
            "UB1",
            "UB2",
            "UB4",
            "UID",
            "UNDER",
            "UNIQUE",
            "UNPLUG",
            "UNSIGNED",
            "UNTRUSTED",
            "USE",
            "USER",
            "VALIDATE",
            "VALIST",
            "VALUE",
            "VARCHAR",
            "VARCHAR2",
            "VARIABLE",
            "VARIANCE",
            "VARRAY",
            "VARYING",
            "VIEW",
            "VIEWS",
            "VOID",
            "WHENEVER",
            "WHILE",
            "WORK",
            "WRAPPED",
            "WRITE",
            "YEAR",
            "ZONE",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */

          var reservedCommands = [
            "ADD",
            "ALTER COLUMN",
            "ALTER TABLE",
            "BEGIN",
            "CONNECT BY",
            "CREATE TABLE",
            "DROP TABLE",
            "DECLARE",
            "DELETE",
            "DELETE FROM",
            "EXCEPT",
            "EXCEPTION",
            "FETCH FIRST",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "INSERT",
            "LIMIT",
            "OFFSET",
            "LOOP",
            "MODIFY",
            "ORDER BY",
            "RETURNING",
            "SELECT",
            "SET CURRENT SCHEMA",
            "SET SCHEMA",
            "SET",
            "START WITH",
            "UPDATE",
            "VALUES",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN", // apply
            "CROSS APPLY",
            "OUTER APPLY",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"];

          var PlSqlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(PlSqlFormatter, _Formatter);

            var _super = _createSuper(PlSqlFormatter);

            function PlSqlFormatter() {
              _classCallCheck(this, PlSqlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(PlSqlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedLogicalOperators: ["AND", "OR", "XOR"],
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_3__.dedupe)(
                      reservedKeywords,
                    ),
                    stringTypes: PlSqlFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    namedPlaceholderTypes: [":"],
                    specialWordChars: {
                      any: "_$#",
                    },
                    operators: PlSqlFormatter.operators,
                    preprocess: preprocess,
                  });
                },
              },
            ]);

            return PlSqlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          PlSqlFormatter.stringTypes = ['""', "N''", "''", "``"];
          PlSqlFormatter.operators = [
            "||",
            "**",
            ":=",
            "~=",
            "^=",
            ">>",
            "<<",
            "=>", //  '..' // breaks operator test, handled by .
          ];

          function preprocess(tokens) {
            var previousReservedToken =
              src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;
            return tokens.map(function (token, i) {
              var prevToken =
                tokens[i - 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;
              var nextToken =
                tokens[i + 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN; // `table`[.]`column`

              if (
                token.value === "." &&
                nextToken.value.startsWith("`") &&
                prevToken.value.endsWith("`")
              ) {
                // This is an operator, do not insert spaces
                return Object.assign(Object.assign({}, token), {
                  type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .OPERATOR,
                });
              } // BY [SET]

              if (
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.isToken.SET(
                  token,
                ) &&
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.isToken.BY(
                  previousReservedToken,
                )
              ) {
                return Object.assign(Object.assign({}, token), {
                  type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD,
                });
              }

              if (
                (0, src_core_token__WEBPACK_IMPORTED_MODULE_2__.isReserved)(
                  token,
                )
              ) {
                previousReservedToken = token;
              }

              return token;
            });
          }

          /***/
        },

      /***/ "./src/languages/postgresql.formatter.ts":
        /*!***********************************************!*\
  !*** ./src/languages/postgresql.formatter.ts ***!
  \***********************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () =>
              /* binding */ PostgreSqlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://www.postgresql.org/docs/14/functions.html

          var reservedFunctions = {
            // https://www.postgresql.org/docs/14/functions-math.html
            math: [
              "ABS",
              "ACOS",
              "ACOSD",
              "ACOSH",
              "ASIN",
              "ASIND",
              "ASINH",
              "ATAN",
              "ATAN2",
              "ATAN2D",
              "ATAND",
              "ATANH",
              "CBRT",
              "CEIL",
              "CEILING",
              "COS",
              "COSD",
              "COSH",
              "COT",
              "COTD",
              "DEGREES",
              "DIV",
              "EXP",
              "FACTORIAL",
              "FLOOR",
              "GCD",
              "LCM",
              "LN",
              "LOG",
              "LOG10",
              "MIN_SCALE",
              "MOD",
              "PI",
              "POWER",
              "RADIANS",
              "RANDOM",
              "ROUND",
              "SCALE",
              "SETSEED",
              "SIGN",
              "SIN",
              "SIND",
              "SINH",
              "SQRT",
              "TAN",
              "TAND",
              "TANH",
              "TRIM_SCALE",
              "TRUNC",
              "WIDTH_BUCKET",
            ],
            // https://www.postgresql.org/docs/14/functions-string.html
            string: [
              "ABS",
              "ASCII",
              "BIT_LENGTH",
              "BTRIM",
              "CHARACTER_LENGTH",
              "CHAR_LENGTH",
              "CHR",
              "CONCAT",
              "CONCAT_WS",
              "FORMAT",
              "INITCAP",
              "LEFT",
              "LENGTH",
              "LOWER",
              "LPAD",
              "LTRIM",
              "MD5",
              "NORMALIZE",
              "OCTET_LENGTH",
              "OVERLAY",
              "PARSE_IDENT",
              "PG_CLIENT_ENCODING",
              "POSITION",
              "QUOTE_IDENT",
              "QUOTE_LITERAL",
              "QUOTE_NULLABLE",
              "REGEXP_MATCH",
              "REGEXP_MATCHES",
              "REGEXP_REPLACE",
              "REGEXP_SPLIT_TO_ARRAY",
              "REGEXP_SPLIT_TO_TABLE",
              "REPEAT",
              "REPLACE",
              "REVERSE",
              "RIGHT",
              "RPAD",
              "RTRIM",
              "SPLIT_PART",
              "SPRINTF",
              "STARTS_WITH",
              "STRING_AGG",
              "STRING_TO_ARRAY",
              "STRING_TO_TABLE",
              "STRPOS",
              "SUBSTR",
              "SUBSTRING",
              "TO_ASCII",
              "TO_HEX",
              "TRANSLATE",
              "TRIM",
              "UNISTR",
              "UPPER",
            ],
            // https://www.postgresql.org/docs/14/functions-binarystring.html
            binary: [
              "BIT_COUNT",
              "BIT_LENGTH",
              "BTRIM",
              "CONVERT",
              "CONVERT_FROM",
              "CONVERT_TO",
              "DECODE",
              "ENCODE",
              "GET_BIT",
              "GET_BYTE",
              "LENGTH",
              "LTRIM",
              "MD5",
              "OCTET_LENGTH",
              "OVERLAY",
              "POSITION",
              "RTRIM",
              "SET_BIT",
              "SET_BYTE",
              "SHA224",
              "SHA256",
              "SHA384",
              "SHA512",
              "STRING_AGG",
              "SUBSTR",
              "SUBSTRING",
              "TRIM",
            ],
            // https://www.postgresql.org/docs/14/functions-bitstring.html
            bitstring: [
              "BIT_COUNT",
              "BIT_LENGTH",
              "GET_BIT",
              "LENGTH",
              "OCTET_LENGTH",
              "OVERLAY",
              "POSITION",
              "SET_BIT",
              "SUBSTRING",
            ],
            // https://www.postgresql.org/docs/14/functions-matching.html
            pattern: [
              "REGEXP_MATCH",
              "REGEXP_MATCHES",
              "REGEXP_REPLACE",
              "REGEXP_SPLIT_TO_ARRAY",
              "REGEXP_SPLIT_TO_TABLE",
            ],
            // https://www.postgresql.org/docs/14/functions-formatting.html
            datatype: ["TO_CHAR", "TO_DATE", "TO_NUMBER", "TO_TIMESTAMP"],
            // https://www.postgresql.org/docs/14/functions-datetime.html
            datetime: [
              // 'AGE',
              "CLOCK_TIMESTAMP",
              "CURRENT_DATE",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "DATE_BIN",
              "DATE_PART",
              "DATE_TRUNC",
              "EXTRACT",
              "ISFINITE",
              "JUSTIFY_DAYS",
              "JUSTIFY_HOURS",
              "JUSTIFY_INTERVAL",
              "LOCALTIME",
              "LOCALTIMESTAMP",
              "MAKE_DATE",
              "MAKE_INTERVAL",
              "MAKE_TIME",
              "MAKE_TIMESTAMP",
              "MAKE_TIMESTAMPTZ",
              "NOW",
              "PG_SLEEP",
              "PG_SLEEP_FOR",
              "PG_SLEEP_UNTIL",
              "STATEMENT_TIMESTAMP",
              "TIMEOFDAY",
              "TO_TIMESTAMP",
              "TRANSACTION_TIMESTAMP",
            ],
            // https://www.postgresql.org/docs/14/functions-enum.html
            enum: ["ENUM_FIRST", "ENUM_LAST", "ENUM_RANGE"],
            // https://www.postgresql.org/docs/14/functions-geometry.html
            geometry: [
              "AREA",
              "BOUND_BOX",
              "BOX",
              "CENTER",
              "CIRCLE",
              "DIAGONAL",
              "DIAMETER",
              "HEIGHT",
              "ISCLOSED",
              "ISOPEN",
              "LENGTH",
              "LINE",
              "LSEG",
              "NPOINTS",
              "PATH",
              "PCLOSE",
              "POINT",
              "POLYGON",
              "POPEN",
              "RADIUS",
              "SLOPE",
              "WIDTH",
            ],
            // https://www.postgresql.org/docs/14/functions-net.html
            network: [
              "ABBREV",
              "BROADCAST",
              "FAMILY",
              "HOST",
              "HOSTMASK",
              "INET_MERGE",
              "INET_SAME_FAMILY",
              "MACADDR8_SET7BIT",
              "MASKLEN",
              "NETMASK",
              "NETWORK",
              "SET_MASKLEN",
              "TEXT",
              "TRUNC",
            ],
            // https://www.postgresql.org/docs/14/functions-textsearch.html
            textsearch: [
              "ARRAY_TO_TSVECTOR",
              "GET_CURRENT_TS_CONFIG",
              "JSONB_TO_TSVECTOR",
              "JSON_TO_TSVECTOR",
              "LENGTH",
              "NUMNODE",
              "PHRASETO_TSQUERY",
              "PLAINTO_TSQUERY",
              "QUERYTREE",
              "SETWEIGHT",
              "STRIP",
              "TO_TSQUERY",
              "TO_TSVECTOR",
              "TSQUERY_PHRASE",
              "TSVECTOR_TO_ARRAY",
              "TS_DEBUG",
              "TS_DELETE",
              "TS_FILTER",
              "TS_HEADLINE",
              "TS_LEXIZE",
              "TS_PARSE",
              "TS_RANK",
              "TS_RANK_CD",
              "TS_REWRITE",
              "TS_STAT",
              "TS_TOKEN_TYPE",
              "WEBSEARCH_TO_TSQUERY",
            ],
            // https://www.postgresql.org/docs/14/functions-uuid.html
            uuid: ["UUID"],
            // https://www.postgresql.org/docs/14/functions-xml.html
            xml: [
              "CURSOR_TO_XML",
              "CURSOR_TO_XMLSCHEMA",
              "DATABASE_TO_XML",
              "DATABASE_TO_XMLSCHEMA",
              "DATABASE_TO_XML_AND_XMLSCHEMA",
              "NEXTVAL",
              "QUERY_TO_XML",
              "QUERY_TO_XMLSCHEMA",
              "QUERY_TO_XML_AND_XMLSCHEMA",
              "SCHEMA_TO_XML",
              "SCHEMA_TO_XMLSCHEMA",
              "SCHEMA_TO_XML_AND_XMLSCHEMA",
              "STRING",
              "TABLE_TO_XML",
              "TABLE_TO_XMLSCHEMA",
              "TABLE_TO_XML_AND_XMLSCHEMA",
              "XMLAGG",
              "XMLCOMMENT",
              "XMLCONCAT",
              "XMLELEMENT",
              "XMLEXISTS",
              "XMLFOREST",
              "XMLPARSE",
              "XMLPI",
              "XMLROOT",
              "XMLSERIALIZE",
              "XMLTABLE",
              "XML_IS_WELL_FORMED",
              "XML_IS_WELL_FORMED_CONTENT",
              "XML_IS_WELL_FORMED_DOCUMENT",
              "XPATH",
              "XPATH_EXISTS",
            ],
            // https://www.postgresql.org/docs/14/functions-json.html
            json: [
              "ARRAY_TO_JSON",
              "JSONB_AGG",
              "JSONB_ARRAY_ELEMENTS",
              "JSONB_ARRAY_ELEMENTS_TEXT",
              "JSONB_ARRAY_LENGTH",
              "JSONB_BUILD_ARRAY",
              "JSONB_BUILD_OBJECT",
              "JSONB_EACH",
              "JSONB_EACH_TEXT",
              "JSONB_EXTRACT_PATH",
              "JSONB_EXTRACT_PATH_TEXT",
              "JSONB_INSERT",
              "JSONB_OBJECT",
              "JSONB_OBJECT_AGG",
              "JSONB_OBJECT_KEYS",
              "JSONB_PATH_EXISTS",
              "JSONB_PATH_EXISTS_TZ",
              "JSONB_PATH_MATCH",
              "JSONB_PATH_MATCH_TZ",
              "JSONB_PATH_QUERY",
              "JSONB_PATH_QUERY_ARRAY",
              "JSONB_PATH_QUERY_ARRAY_TZ",
              "JSONB_PATH_QUERY_FIRST",
              "JSONB_PATH_QUERY_FIRST_TZ",
              "JSONB_PATH_QUERY_TZ",
              "JSONB_POPULATE_RECORD",
              "JSONB_POPULATE_RECORDSET",
              "JSONB_PRETTY",
              "JSONB_SET",
              "JSONB_SET_LAX",
              "JSONB_STRIP_NULLS",
              "JSONB_TO_RECORD",
              "JSONB_TO_RECORDSET",
              "JSONB_TYPEOF",
              "JSON_AGG",
              "JSON_ARRAY_ELEMENTS",
              "JSON_ARRAY_ELEMENTS_TEXT",
              "JSON_ARRAY_LENGTH",
              "JSON_BUILD_ARRAY",
              "JSON_BUILD_OBJECT",
              "JSON_EACH",
              "JSON_EACH_TEXT",
              "JSON_EXTRACT_PATH",
              "JSON_EXTRACT_PATH_TEXT",
              "JSON_OBJECT",
              "JSON_OBJECT_AGG",
              "JSON_OBJECT_KEYS",
              "JSON_POPULATE_RECORD",
              "JSON_POPULATE_RECORDSET",
              "JSON_STRIP_NULLS",
              "JSON_TO_RECORD",
              "JSON_TO_RECORDSET",
              "JSON_TYPEOF",
              "ROW_TO_JSON",
              "TO_JSON",
              "TO_JSONB",
              "TO_TIMESTAMP",
            ],
            // https://www.postgresql.org/docs/14/functions-sequence.html
            sequence: ["CURRVAL", "LASTVAL", "NEXTVAL", "SETVAL"],
            // https://www.postgresql.org/docs/14/functions-conditional.html
            conditional: [
              // 'CASE',
              "COALESCE",
              "GREATEST",
              "LEAST",
              "NULLIF",
            ],
            // https://www.postgresql.org/docs/14/functions-array.html
            array: [
              "ARRAY_AGG",
              "ARRAY_APPEND",
              "ARRAY_CAT",
              "ARRAY_DIMS",
              "ARRAY_FILL",
              "ARRAY_LENGTH",
              "ARRAY_LOWER",
              "ARRAY_NDIMS",
              "ARRAY_POSITION",
              "ARRAY_POSITIONS",
              "ARRAY_PREPEND",
              "ARRAY_REMOVE",
              "ARRAY_REPLACE",
              "ARRAY_TO_STRING",
              "ARRAY_UPPER",
              "CARDINALITY",
              "STRING_TO_ARRAY",
              "TRIM_ARRAY",
              "UNNEST",
            ],
            // https://www.postgresql.org/docs/14/functions-range.html
            range: [
              "ISEMPTY",
              "LOWER",
              "LOWER_INC",
              "LOWER_INF",
              "MULTIRANGE",
              "RANGE_MERGE",
              "UPPER",
              "UPPER_INC",
              "UPPER_INF",
            ],
            // https://www.postgresql.org/docs/14/functions-aggregate.html
            aggregate: [
              "ANY",
              "ARRAY_AGG",
              "AVG",
              "BIT_AND",
              "BIT_OR",
              "BIT_XOR",
              "BOOL_AND",
              "BOOL_OR",
              "COALESCE",
              "CORR",
              "COUNT",
              "COVAR_POP",
              "COVAR_SAMP",
              "CUME_DIST",
              "DENSE_RANK",
              "EVERY",
              "GROUPING",
              "JSONB_AGG",
              "JSONB_OBJECT_AGG",
              "JSON_AGG",
              "JSON_OBJECT_AGG",
              "MAX",
              "MIN",
              "MODE",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "PERCENT_RANK",
              "RANGE_AGG",
              "RANGE_INTERSECT_AGG",
              "RANK",
              "REGR_AVGX",
              "REGR_AVGY",
              "REGR_COUNT",
              "REGR_INTERCEPT",
              "REGR_R2",
              "REGR_SLOPE",
              "REGR_SXX",
              "REGR_SXY",
              "REGR_SYY",
              "SOME",
              "STDDEV",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "STRING_AGG",
              "SUM",
              "TO_JSON",
              "TO_JSONB",
              "VARIANCE",
              "VAR_POP",
              "VAR_SAMP",
              "XMLAGG",
            ],
            // https://www.postgresql.org/docs/14/functions-window.html
            window: [
              "CUME_DIST",
              "DENSE_RANK",
              "FIRST_VALUE",
              "LAG",
              "LAST_VALUE",
              "LEAD",
              "NTH_VALUE",
              "NTILE",
              "PERCENT_RANK",
              "RANK",
              "ROW_NUMBER",
            ],
            // https://www.postgresql.org/docs/14/functions-srf.html
            set: ["GENERATE_SERIES", "GENERATE_SUBSCRIPTS"],
            // https://www.postgresql.org/docs/14/functions-info.html
            sysInfo: [
              "ACLDEFAULT",
              "ACLEXPLODE",
              "COL_DESCRIPTION",
              "CURRENT_CATALOG",
              "CURRENT_DATABASE",
              "CURRENT_QUERY",
              "CURRENT_ROLE",
              "CURRENT_SCHEMA",
              "CURRENT_SCHEMAS",
              "CURRENT_USER",
              "FORMAT_TYPE",
              "HAS_ANY_COLUMN_PRIVILEGE",
              "HAS_COLUMN_PRIVILEGE",
              "HAS_DATABASE_PRIVILEGE",
              "HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE",
              "HAS_FUNCTION_PRIVILEGE",
              "HAS_LANGUAGE_PRIVILEGE",
              "HAS_SCHEMA_PRIVILEGE",
              "HAS_SEQUENCE_PRIVILEGE",
              "HAS_SERVER_PRIVILEGE",
              "HAS_TABLESPACE_PRIVILEGE",
              "HAS_TABLE_PRIVILEGE",
              "HAS_TYPE_PRIVILEGE",
              "INET_CLIENT_ADDR",
              "INET_CLIENT_PORT",
              "INET_SERVER_ADDR",
              "INET_SERVER_PORT",
              "MAKEACLITEM",
              "OBJ_DESCRIPTION",
              "PG_BACKEND_PID",
              "PG_BLOCKING_PIDS",
              "PG_COLLATION_IS_VISIBLE",
              "PG_CONF_LOAD_TIME",
              "PG_CONTROL_CHECKPOINT",
              "PG_CONTROL_INIT",
              "PG_CONTROL_SYSTEM",
              "PG_CONVERSION_IS_VISIBLE",
              "PG_CURRENT_LOGFILE",
              "PG_CURRENT_SNAPSHOT",
              "PG_CURRENT_XACT_ID",
              "PG_CURRENT_XACT_ID_IF_ASSIGNED",
              "PG_DESCRIBE_OBJECT",
              "PG_FUNCTION_IS_VISIBLE",
              "PG_GET_CATALOG_FOREIGN_KEYS",
              "PG_GET_CONSTRAINTDEF",
              "PG_GET_EXPR",
              "PG_GET_FUNCTIONDEF",
              "PG_GET_FUNCTION_ARGUMENTS",
              "PG_GET_FUNCTION_IDENTITY_ARGUMENTS",
              "PG_GET_FUNCTION_RESULT",
              "PG_GET_INDEXDEF",
              "PG_GET_KEYWORDS",
              "PG_GET_OBJECT_ADDRESS",
              "PG_GET_OWNED_SEQUENCE",
              "PG_GET_RULEDEF",
              "PG_GET_SERIAL_SEQUENCE",
              "PG_GET_STATISTICSOBJDEF",
              "PG_GET_TRIGGERDEF",
              "PG_GET_USERBYID",
              "PG_GET_VIEWDEF",
              "PG_HAS_ROLE",
              "PG_IDENTIFY_OBJECT",
              "PG_IDENTIFY_OBJECT_AS_ADDRESS",
              "PG_INDEXAM_HAS_PROPERTY",
              "PG_INDEX_COLUMN_HAS_PROPERTY",
              "PG_INDEX_HAS_PROPERTY",
              "PG_IS_OTHER_TEMP_SCHEMA",
              "PG_JIT_AVAILABLE",
              "PG_LAST_COMMITTED_XACT",
              "PG_LISTENING_CHANNELS",
              "PG_MY_TEMP_SCHEMA",
              "PG_NOTIFICATION_QUEUE_USAGE",
              "PG_OPCLASS_IS_VISIBLE",
              "PG_OPERATOR_IS_VISIBLE",
              "PG_OPFAMILY_IS_VISIBLE",
              "PG_OPTIONS_TO_TABLE",
              "PG_POSTMASTER_START_TIME",
              "PG_SAFE_SNAPSHOT_BLOCKING_PIDS",
              "PG_SNAPSHOT_XIP",
              "PG_SNAPSHOT_XMAX",
              "PG_SNAPSHOT_XMIN",
              "PG_STATISTICS_OBJ_IS_VISIBLE",
              "PG_TABLESPACE_DATABASES",
              "PG_TABLESPACE_LOCATION",
              "PG_TABLE_IS_VISIBLE",
              "PG_TRIGGER_DEPTH",
              "PG_TS_CONFIG_IS_VISIBLE",
              "PG_TS_DICT_IS_VISIBLE",
              "PG_TS_PARSER_IS_VISIBLE",
              "PG_TS_TEMPLATE_IS_VISIBLE",
              "PG_TYPEOF",
              "PG_TYPE_IS_VISIBLE",
              "PG_VISIBLE_IN_SNAPSHOT",
              "PG_XACT_COMMIT_TIMESTAMP",
              "PG_XACT_COMMIT_TIMESTAMP_ORIGIN",
              "PG_XACT_STATUS",
              "PQSERVERVERSION",
              "ROW_SECURITY_ACTIVE",
              "SESSION_USER",
              "SHOBJ_DESCRIPTION",
              "TO_REGCLASS",
              "TO_REGCOLLATION",
              "TO_REGNAMESPACE",
              "TO_REGOPER",
              "TO_REGOPERATOR",
              "TO_REGPROC",
              "TO_REGPROCEDURE",
              "TO_REGROLE",
              "TO_REGTYPE",
              "TXID_CURRENT",
              "TXID_CURRENT_IF_ASSIGNED",
              "TXID_CURRENT_SNAPSHOT",
              "TXID_SNAPSHOT_XIP",
              "TXID_SNAPSHOT_XMAX",
              "TXID_SNAPSHOT_XMIN",
              "TXID_STATUS",
              "TXID_VISIBLE_IN_SNAPSHOT",
              "USER",
              "VERSION",
            ],
            // https://www.postgresql.org/docs/14/functions-admin.html
            sysAdmin: [
              "BRIN_DESUMMARIZE_RANGE",
              "BRIN_SUMMARIZE_NEW_VALUES",
              "BRIN_SUMMARIZE_RANGE",
              "CONVERT_FROM",
              "CURRENT_SETTING",
              "GIN_CLEAN_PENDING_LIST",
              "PG_ADVISORY_LOCK",
              "PG_ADVISORY_LOCK_SHARED",
              "PG_ADVISORY_UNLOCK",
              "PG_ADVISORY_UNLOCK_ALL",
              "PG_ADVISORY_UNLOCK_SHARED",
              "PG_ADVISORY_XACT_LOCK",
              "PG_ADVISORY_XACT_LOCK_SHARED",
              "PG_BACKUP_START_TIME",
              "PG_CANCEL_BACKEND",
              "PG_COLLATION_ACTUAL_VERSION",
              "PG_COLUMN_COMPRESSION",
              "PG_COLUMN_SIZE",
              "PG_COPY_LOGICAL_REPLICATION_SLOT",
              "PG_COPY_PHYSICAL_REPLICATION_SLOT",
              "PG_CREATE_LOGICAL_REPLICATION_SLOT",
              "PG_CREATE_PHYSICAL_REPLICATION_SLOT",
              "PG_CREATE_RESTORE_POINT",
              "PG_CURRENT_WAL_FLUSH_LSN",
              "PG_CURRENT_WAL_INSERT_LSN",
              "PG_CURRENT_WAL_LSN",
              "PG_DATABASE_SIZE",
              "PG_DROP_REPLICATION_SLOT",
              "PG_EXPORT_SNAPSHOT",
              "PG_FILENODE_RELATION",
              "PG_GET_WAL_REPLAY_PAUSE_STATE",
              "PG_IMPORT_SYSTEM_COLLATIONS",
              "PG_INDEXES_SIZE",
              "PG_IS_IN_BACKUP",
              "PG_IS_IN_RECOVERY",
              "PG_IS_WAL_REPLAY_PAUSED",
              "PG_LAST_WAL_RECEIVE_LSN",
              "PG_LAST_WAL_REPLAY_LSN",
              "PG_LAST_XACT_REPLAY_TIMESTAMP",
              "PG_LOGICAL_EMIT_MESSAGE",
              "PG_LOGICAL_SLOT_GET_BINARY_CHANGES",
              "PG_LOGICAL_SLOT_GET_CHANGES",
              "PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES",
              "PG_LOGICAL_SLOT_PEEK_CHANGES",
              "PG_LOG_BACKEND_MEMORY_CONTEXTS",
              "PG_LS_ARCHIVE_STATUSDIR",
              "PG_LS_DIR",
              "PG_LS_LOGDIR",
              "PG_LS_TMPDIR",
              "PG_LS_WALDIR",
              "PG_PARTITION_ANCESTORS",
              "PG_PARTITION_ROOT",
              "PG_PARTITION_TREE",
              "PG_PROMOTE",
              "PG_READ_BINARY_FILE",
              "PG_READ_FILE",
              "PG_RELATION_FILENODE",
              "PG_RELATION_FILEPATH",
              "PG_RELATION_SIZE",
              "PG_RELOAD_CONF",
              "PG_REPLICATION_ORIGIN_ADVANCE",
              "PG_REPLICATION_ORIGIN_CREATE",
              "PG_REPLICATION_ORIGIN_DROP",
              "PG_REPLICATION_ORIGIN_OID",
              "PG_REPLICATION_ORIGIN_PROGRESS",
              "PG_REPLICATION_ORIGIN_SESSION_IS_SETUP",
              "PG_REPLICATION_ORIGIN_SESSION_PROGRESS",
              "PG_REPLICATION_ORIGIN_SESSION_RESET",
              "PG_REPLICATION_ORIGIN_SESSION_SETUP",
              "PG_REPLICATION_ORIGIN_XACT_RESET",
              "PG_REPLICATION_ORIGIN_XACT_SETUP",
              "PG_REPLICATION_SLOT_ADVANCE",
              "PG_ROTATE_LOGFILE",
              "PG_SIZE_BYTES",
              "PG_SIZE_PRETTY",
              "PG_START_BACKUP",
              "PG_STAT_FILE",
              "PG_STOP_BACKUP",
              "PG_SWITCH_WAL",
              "PG_TABLESPACE_SIZE",
              "PG_TABLE_SIZE",
              "PG_TERMINATE_BACKEND",
              "PG_TOTAL_RELATION_SIZE",
              "PG_TRY_ADVISORY_LOCK",
              "PG_TRY_ADVISORY_LOCK_SHARED",
              "PG_TRY_ADVISORY_XACT_LOCK",
              "PG_TRY_ADVISORY_XACT_LOCK_SHARED",
              "PG_WALFILE_NAME",
              "PG_WALFILE_NAME_OFFSET",
              "PG_WAL_LSN_DIFF",
              "PG_WAL_REPLAY_PAUSE",
              "PG_WAL_REPLAY_RESUME",
              "SET_CONFIG",
            ],
            // https://www.postgresql.org/docs/14/functions-trigger.html
            trigger: [
              "SUPPRESS_REDUNDANT_UPDATES_TRIGGER",
              "TSVECTOR_UPDATE_TRIGGER",
              "TSVECTOR_UPDATE_TRIGGER_COLUMN",
            ],
            // https://www.postgresql.org/docs/14/functions-event-triggers.html
            eventTrigger: [
              "PG_EVENT_TRIGGER_DDL_COMMANDS",
              "PG_EVENT_TRIGGER_DROPPED_OBJECTS",
              "PG_EVENT_TRIGGER_TABLE_REWRITE_OID",
              "PG_EVENT_TRIGGER_TABLE_REWRITE_REASON",
              "PG_GET_OBJECT_ADDRESS",
            ],
            // https://www.postgresql.org/docs/14/functions-statistics.html
            stats: ["PG_MCV_LIST_ITEMS"],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://www.postgresql.org/docs/14/sql-keywords-appendix.html

          var reservedKeywords = [
            "ABSENT",
            "ABSOLUTE",
            "ACCESS",
            "ACCORDING",
            "ACTION",
            "ADA",
            "ADMIN",
            "AGGREGATE",
            "ALL",
            "ALLOCATE",
            "ALSO",
            "ALTER",
            "ALWAYS",
            "ANALYSE",
            "ARE",
            "ARRAY",
            "ARRAY_MAX_CARDINALITY",
            "AS",
            "ASC",
            "ASENSITIVE",
            "ASSERTION",
            "ASSIGNMENT",
            "ASYMMETRIC",
            "AT",
            "ATOMIC",
            "ATTACH",
            "ATTRIBUTE",
            "ATTRIBUTES",
            "AUTHORIZATION",
            "BACKWARD",
            "BASE64",
            "BEFORE",
            "BEGIN_FRAME",
            "BEGIN_PARTITION",
            "BERNOULLI",
            "BETWEEN",
            "BIGINT",
            "BINARY",
            "BIT",
            "BLOB",
            "BLOCKED",
            "BOM",
            "BOOLEAN",
            "BOTH",
            "BREADTH",
            "BY",
            "CACHE",
            "CALLED",
            "CASCADE",
            "CASCADED",
            "CAST",
            "CATALOG",
            "CATALOG_NAME",
            "CHAIN",
            "CHAINING",
            "CHAR",
            "CHARACTER",
            "CHARACTERISTICS",
            "CHARACTERS",
            "CHARACTER_SET_CATALOG",
            "CHARACTER_SET_NAME",
            "CHARACTER_SET_SCHEMA",
            "CHECK",
            "CLASS",
            "CLASSIFIER",
            "CLASS_ORIGIN",
            "CLOB",
            "COBOL",
            "COLLATE",
            "COLLATION",
            "COLLATION_CATALOG",
            "COLLATION_NAME",
            "COLLATION_SCHEMA",
            "COLLECT",
            "COLUMN",
            "COLUMNS",
            "COLUMN_NAME",
            "COMMAND_FUNCTION",
            "COMMAND_FUNCTION_CODE",
            "COMMENTS",
            "COMMITTED",
            "COMPRESSION",
            "CONCURRENTLY",
            "CONDITION",
            "CONDITIONAL",
            "CONDITION_NUMBER",
            "CONFIGURATION",
            "CONFLICT",
            "CONNECT",
            "CONNECTION",
            "CONNECTION_NAME",
            "CONSTRAINT",
            "CONSTRAINTS",
            "CONSTRAINT_CATALOG",
            "CONSTRAINT_NAME",
            "CONSTRAINT_SCHEMA",
            "CONSTRUCTOR",
            "CONTAINS",
            "CONTENT",
            "CONTINUE",
            "CONTROL",
            "CONVERSION",
            "CORRESPONDING",
            "COST",
            "CREATE",
            "CROSS",
            "CSV",
            "CUBE",
            "CURRENT",
            "CURRENT_DEFAULT_TRANSFORM_GROUP",
            "CURRENT_PATH",
            "CURRENT_ROW",
            "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
            "CURSOR",
            "CURSOR_NAME",
            "CYCLE",
            "DATA",
            "DATABASE",
            "DATALINK",
            "DATE",
            "DATETIME_INTERVAL_CODE",
            "DATETIME_INTERVAL_PRECISION",
            "DAY",
            "DB",
            "DEC",
            "DECFLOAT",
            "DECIMAL",
            "DEFAULT",
            "DEFAULTS",
            "DEFERRABLE",
            "DEFERRED",
            "DEFINE",
            "DEFINED",
            "DEFINER",
            "DEGREE",
            "DELIMITER",
            "DELIMITERS",
            "DEPENDS",
            "DEPTH",
            "DEREF",
            "DERIVED",
            "DESC",
            "DESCRIBE",
            "DESCRIPTOR",
            "DETACH",
            "DETERMINISTIC",
            "DIAGNOSTICS",
            "DICTIONARY",
            "DISABLE",
            "DISCONNECT",
            "DISPATCH",
            "DISTINCT",
            "DLNEWCOPY",
            "DLPREVIOUSCOPY",
            "DLURLCOMPLETE",
            "DLURLCOMPLETEONLY",
            "DLURLCOMPLETEWRITE",
            "DLURLPATH",
            "DLURLPATHONLY",
            "DLURLPATHWRITE",
            "DLURLSCHEME",
            "DLURLSERVER",
            "DLVALUE",
            "DOCUMENT",
            "DOMAIN",
            "DOUBLE",
            "DROP",
            "DYNAMIC",
            "DYNAMIC_FUNCTION",
            "DYNAMIC_FUNCTION_CODE",
            "EACH",
            "ELEMENT",
            "EMPTY",
            "ENABLE",
            "ENCODING",
            "ENCRYPTED",
            "END-EXEC",
            "END_FRAME",
            "END_PARTITION",
            "ENFORCED",
            "ENUM",
            "EQUALS",
            "ERROR",
            "ESCAPE",
            "EVENT",
            "EXCEPTION",
            "EXCLUDE",
            "EXCLUDING",
            "EXCLUSIVE",
            "EXEC",
            "EXISTS",
            "EXPRESSION",
            "EXTENSION",
            "EXTERNAL",
            "FALSE",
            "FILE",
            "FILTER",
            "FINAL",
            "FINALIZE",
            "FINISH",
            "FIRST",
            "FLAG",
            "FLOAT",
            "FOLLOWING",
            "FOR",
            "FORCE",
            "FOREIGN",
            "FORTRAN",
            "FORWARD",
            "FOUND",
            "FRAME_ROW",
            "FREE",
            "FREEZE",
            "FS",
            "FULFILL",
            "FULL",
            "FUNCTION",
            "FUNCTIONS",
            "FUSION",
            "GENERAL",
            "GENERATED",
            "GET",
            "GLOBAL",
            "GO",
            "GOTO",
            "GRANTED",
            "GROUP",
            "GROUPS",
            "HANDLER",
            "HEADER",
            "HEX",
            "HIERARCHY",
            "HOLD",
            "HOUR", // 'ID',
            "IDENTITY",
            "IF",
            "IGNORE",
            "ILIKE",
            "IMMEDIATE",
            "IMMEDIATELY",
            "IMMUTABLE",
            "IMPLEMENTATION",
            "IMPLICIT",
            "IMPORT",
            "IN",
            "INCLUDE",
            "INCLUDING",
            "INCREMENT",
            "INDENT",
            "INDEX",
            "INDEXES",
            "INDICATOR",
            "INHERIT",
            "INHERITS",
            "INITIAL",
            "INITIALLY",
            "INLINE",
            "INNER",
            "INOUT",
            "INPUT",
            "INSENSITIVE",
            "INSTANCE",
            "INSTANTIABLE",
            "INSTEAD",
            "INT",
            "INTEGER",
            "INTEGRITY",
            "INTERSECTION",
            "INTERVAL",
            "INTO",
            "INVOKER",
            "IS",
            "ISNULL",
            "ISOLATION",
            "JSON",
            "JSON_ARRAY",
            "JSON_ARRAYAGG",
            "JSON_EXISTS",
            "JSON_OBJECTAGG",
            "JSON_QUERY",
            "JSON_TABLE",
            "JSON_TABLE_PRIMITIVE",
            "JSON_VALUE",
            "KEEP",
            "KEY",
            "KEYS",
            "KEY_MEMBER",
            "KEY_TYPE",
            "LABEL",
            "LANGUAGE",
            "LARGE",
            "LAST",
            "LATERAL",
            "LEADING",
            "LEAKPROOF",
            "LEVEL",
            "LIBRARY",
            "LIKE",
            "LIKE_REGEX",
            "LINK",
            "LISTAGG",
            "LOCAL",
            "LOCATION",
            "LOCATOR",
            "LOCKED",
            "LOGGED",
            "MAP",
            "MAPPING",
            "MATCH",
            "MATCHED",
            "MATCHES",
            "MATCH_NUMBER",
            "MATCH_RECOGNIZE",
            "MATERIALIZED",
            "MAXVALUE",
            "MEASURES",
            "MEMBER",
            "MERGE",
            "MESSAGE_LENGTH",
            "MESSAGE_OCTET_LENGTH",
            "MESSAGE_TEXT",
            "METHOD",
            "MINUTE",
            "MINVALUE",
            "MODIFIES",
            "MODULE",
            "MONTH",
            "MORE",
            "MULTISET",
            "MUMPS",
            "NAME",
            "NAMES",
            "NAMESPACE",
            "NATIONAL",
            "NATURAL",
            "NCHAR",
            "NCLOB",
            "NESTED",
            "NESTING",
            "NEW",
            "NEXT",
            "NFC",
            "NFD",
            "NFKC",
            "NFKD",
            "NIL",
            "NO",
            "NONE",
            "NORMALIZED",
            "NOT",
            "NOTHING",
            "NOTNULL",
            "NOWAIT",
            "NULL",
            "NULLABLE",
            "NULLS",
            "NUMBER",
            "NUMERIC",
            "OBJECT",
            "OCCURRENCES_REGEX",
            "OCTETS",
            "OF",
            "OFF",
            "OFFSET",
            "OIDS",
            "OLD",
            "OMIT",
            "ON COMMIT",
            "ON DELETE",
            "ON UPDATE",
            "ONE",
            "ONLY",
            "OPEN",
            "OPERATOR",
            "OPTION",
            "OPTIONS",
            "ORDER",
            "ORDERING",
            "ORDINALITY",
            "OTHERS",
            "OUT",
            "OUTER",
            "OUTPUT",
            "OVER",
            "OVERFLOW",
            "OVERLAPS",
            "OVERRIDING",
            "OWNED",
            "OWNER",
            "PAD",
            "PARALLEL",
            "PARAMETER",
            "PARAMETER_MODE",
            "PARAMETER_NAME",
            "PARAMETER_ORDINAL_POSITION",
            "PARAMETER_SPECIFIC_CATALOG",
            "PARAMETER_SPECIFIC_NAME",
            "PARAMETER_SPECIFIC_SCHEMA",
            "PARSER",
            "PARTIAL",
            "PARTITION",
            "PASCAL",
            "PASS",
            "PASSING",
            "PASSTHROUGH",
            "PASSWORD",
            "PAST",
            "PATTERN",
            "PER",
            "PERCENT",
            "PERIOD",
            "PERMISSION",
            "PERMUTE",
            "PLACING",
            "PLAN",
            "PLANS",
            "PLI",
            "POLICY",
            "PORTION",
            "POSITION_REGEX",
            "PRECEDES",
            "PRECEDING",
            "PRECISION",
            "PREPARED",
            "PRESERVE",
            "PRIMARY",
            "PRIOR",
            "PRIVATE",
            "PRIVILEGES",
            "PROCEDURAL",
            "PROCEDURE",
            "PROCEDURES",
            "PROGRAM",
            "PRUNE",
            "PTF",
            "PUBLIC",
            "PUBLICATION",
            "QUOTE",
            "QUOTES",
            "RANGE",
            "READ",
            "READS",
            "REAL",
            "REASSIGN",
            "RECHECK",
            "RECOVERY",
            "RECURSIVE",
            "REF",
            "REFERENCES",
            "REFERENCING",
            "REFRESH",
            "RELATIVE",
            "RELEASE",
            "RENAME",
            "REPEATABLE",
            "REPLICA",
            "REQUIRING",
            "RESPECT",
            "RESTART",
            "RESTORE",
            "RESTRICT",
            "RESULT",
            "RETURN",
            "RETURNED_CARDINALITY",
            "RETURNED_LENGTH",
            "RETURNED_OCTET_LENGTH",
            "RETURNED_SQLSTATE",
            "RETURNS",
            "ROLE",
            "ROLLUP",
            "ROUTINE",
            "ROUTINES",
            "ROUTINE_CATALOG",
            "ROUTINE_NAME",
            "ROUTINE_SCHEMA",
            "ROW",
            "ROWS",
            "ROW_COUNT",
            "RULE",
            "RUNNING",
            "SCALAR",
            "SCHEMA",
            "SCHEMAS",
            "SCHEMA_NAME",
            "SCOPE",
            "SCOPE_CATALOG",
            "SCOPE_NAME",
            "SCOPE_SCHEMA",
            "SCROLL",
            "SEARCH",
            "SECOND",
            "SECTION",
            "SECURITY",
            "SEEK",
            "SELECTIVE",
            "SELF",
            "SENSITIVE",
            "SEQUENCE",
            "SEQUENCES",
            "SERIALIZABLE",
            "SERVER",
            "SERVER_NAME",
            "SESSION",
            "SETOF",
            "SETS",
            "SHARE",
            "SIMILAR",
            "SIMPLE",
            "SIZE",
            "SKIP",
            "SMALLINT",
            "SNAPSHOT",
            "SOURCE",
            "SPACE",
            "SPECIFIC",
            "SPECIFICTYPE",
            "SPECIFIC_NAME",
            "SQL",
            "SQLCODE",
            "SQLERROR",
            "SQLEXCEPTION",
            "SQLSTATE",
            "SQLWARNING",
            "STABLE",
            "STANDALONE",
            "START",
            "STATE",
            "STATEMENT",
            "STATIC",
            "STATISTICS",
            "STDIN",
            "STDOUT",
            "STORAGE",
            "STORED",
            "STRICT",
            "STRUCTURE",
            "STYLE",
            "SUBCLASS_ORIGIN",
            "SUBMULTISET",
            "SUBSCRIPTION",
            "SUBSET",
            "SUBSTRING_REGEX",
            "SUCCEEDS",
            "SUPPORT",
            "SYMMETRIC",
            "SYSID",
            "SYSTEM",
            "SYSTEM_TIME",
            "SYSTEM_USER",
            "TABLE",
            "TABLES",
            "TABLESAMPLE",
            "TABLESPACE",
            "TABLE_NAME",
            "TEMP",
            "TEMPLATE",
            "TEMPORARY",
            "THEN",
            "THROUGH",
            "TIES",
            "TIME",
            "TIMESTAMP",
            "TIMEZONE_HOUR",
            "TIMEZONE_MINUTE",
            "TO",
            "TOKEN",
            "TOP_LEVEL_COUNT",
            "TRAILING",
            "TRANSACTION",
            "TRANSACTIONS_COMMITTED",
            "TRANSACTIONS_ROLLED_BACK",
            "TRANSACTION_ACTIVE",
            "TRANSFORM",
            "TRANSFORMS",
            "TRANSLATE_REGEX",
            "TRANSLATION",
            "TREAT",
            "TRIGGER",
            "TRIGGER_CATALOG",
            "TRIGGER_NAME",
            "TRIGGER_SCHEMA",
            "TRUE",
            "TRUSTED",
            "TYPE",
            "TYPES",
            "UESCAPE",
            "UNBOUNDED",
            "UNCOMMITTED",
            "UNCONDITIONAL",
            "UNDER",
            "UNENCRYPTED",
            "UNIQUE",
            "UNKNOWN",
            "UNLINK",
            "UNLOGGED",
            "UNMATCHED",
            "UNNAMED",
            "UNTIL",
            "UNTYPED",
            "URI",
            "USAGE",
            "USER_DEFINED_TYPE_CATALOG",
            "USER_DEFINED_TYPE_CODE",
            "USER_DEFINED_TYPE_NAME",
            "USER_DEFINED_TYPE_SCHEMA",
            "UTF16",
            "UTF32",
            "UTF8",
            "VALID",
            "VALIDATE",
            "VALIDATOR",
            "VALUE",
            "VALUE_OF",
            "VARBINARY",
            "VARCHAR",
            "VARIADIC",
            "VARYING",
            "VERBOSE",
            "VERSIONING",
            "VIEW",
            "VIEWS",
            "VOLATILE",
            "WHENEVER",
            "WHITESPACE",
            "WINDOW",
            "WITHIN",
            "WITHOUT",
            "WORK",
            "WRAPPER",
            "WRITE",
            "XML",
            "XMLATTRIBUTES",
            "XMLBINARY",
            "XMLCAST",
            "XMLDECLARATION",
            "XMLDOCUMENT",
            "XMLITERATE",
            "XMLNAMESPACES",
            "XMLQUERY",
            "XMLSCHEMA",
            "XMLTEXT",
            "XMLVALIDATE",
            "YEAR",
            "YES",
            "ZONE",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://www.postgresql.org/docs/14/sql-commands.html

          var reservedCommands = [
            "ABORT",
            "ALTER AGGREGATE",
            "ALTER COLLATION",
            "ALTER CONVERSION",
            "ALTER DATABASE",
            "ALTER DEFAULT PRIVILEGES",
            "ALTER DOMAIN",
            "ALTER EVENT TRIGGER",
            "ALTER EXTENSION",
            "ALTER FOREIGN DATA WRAPPER",
            "ALTER FOREIGN TABLE",
            "ALTER FUNCTION",
            "ALTER GROUP",
            "ALTER INDEX",
            "ALTER LANGUAGE",
            "ALTER LARGE OBJECT",
            "ALTER MATERIALIZED VIEW",
            "ALTER OPERATOR",
            "ALTER OPERATOR CLASS",
            "ALTER OPERATOR FAMILY",
            "ALTER POLICY",
            "ALTER PROCEDURE",
            "ALTER PUBLICATION",
            "ALTER ROLE",
            "ALTER ROUTINE",
            "ALTER RULE",
            "ALTER SCHEMA",
            "ALTER SEQUENCE",
            "ALTER SERVER",
            "ALTER STATISTICS",
            "ALTER SUBSCRIPTION",
            "ALTER SYSTEM",
            "ALTER TABLE",
            "ALTER TABLESPACE",
            "ALTER TEXT SEARCH CONFIGURATION",
            "ALTER TEXT SEARCH DICTIONARY",
            "ALTER TEXT SEARCH PARSER",
            "ALTER TEXT SEARCH TEMPLATE",
            "ALTER TRIGGER",
            "ALTER TYPE",
            "ALTER USER",
            "ALTER USER MAPPING",
            "ALTER VIEW",
            "ANALYZE",
            "BEGIN",
            "CALL",
            "CHECKPOINT",
            "CLOSE",
            "CLUSTER",
            "COMMENT",
            "COMMIT",
            "COMMIT PREPARED",
            "COPY",
            "CREATE ACCESS METHOD",
            "CREATE AGGREGATE",
            "CREATE CAST",
            "CREATE COLLATION",
            "CREATE CONVERSION",
            "CREATE DATABASE",
            "CREATE DOMAIN",
            "CREATE EVENT TRIGGER",
            "CREATE EXTENSION",
            "CREATE FOREIGN DATA WRAPPER",
            "CREATE FOREIGN TABLE",
            "CREATE FUNCTION",
            "CREATE GROUP",
            "CREATE INDEX",
            "CREATE LANGUAGE",
            "CREATE MATERIALIZED VIEW",
            "CREATE OPERATOR",
            "CREATE OPERATOR CLASS",
            "CREATE OPERATOR FAMILY",
            "CREATE POLICY",
            "CREATE PROCEDURE",
            "CREATE PUBLICATION",
            "CREATE ROLE",
            "CREATE RULE",
            "CREATE SCHEMA",
            "CREATE SEQUENCE",
            "CREATE SERVER",
            "CREATE STATISTICS",
            "CREATE SUBSCRIPTION",
            "CREATE TABLE",
            "CREATE TABLE AS",
            "CREATE TABLESPACE",
            "CREATE TEXT SEARCH CONFIGURATION",
            "CREATE TEXT SEARCH DICTIONARY",
            "CREATE TEXT SEARCH PARSER",
            "CREATE TEXT SEARCH TEMPLATE",
            "CREATE TRANSFORM",
            "CREATE TRIGGER",
            "CREATE TYPE",
            "CREATE USER",
            "CREATE USER MAPPING",
            "CREATE VIEW",
            "DEALLOCATE",
            "DECLARE",
            "DELETE",
            "DELETE FROM",
            "DISCARD",
            "DO",
            "DROP ACCESS METHOD",
            "DROP AGGREGATE",
            "DROP CAST",
            "DROP COLLATION",
            "DROP CONVERSION",
            "DROP DATABASE",
            "DROP DOMAIN",
            "DROP EVENT TRIGGER",
            "DROP EXTENSION",
            "DROP FOREIGN DATA WRAPPER",
            "DROP FOREIGN TABLE",
            "DROP FUNCTION",
            "DROP GROUP",
            "DROP INDEX",
            "DROP LANGUAGE",
            "DROP MATERIALIZED VIEW",
            "DROP OPERATOR",
            "DROP OPERATOR CLASS",
            "DROP OPERATOR FAMILY",
            "DROP OWNED",
            "DROP POLICY",
            "DROP PROCEDURE",
            "DROP PUBLICATION",
            "DROP ROLE",
            "DROP ROUTINE",
            "DROP RULE",
            "DROP SCHEMA",
            "DROP SEQUENCE",
            "DROP SERVER",
            "DROP STATISTICS",
            "DROP SUBSCRIPTION",
            "DROP TABLE",
            "DROP TABLESPACE",
            "DROP TEXT SEARCH CONFIGURATION",
            "DROP TEXT SEARCH DICTIONARY",
            "DROP TEXT SEARCH PARSER",
            "DROP TEXT SEARCH TEMPLATE",
            "DROP TRANSFORM",
            "DROP TRIGGER",
            "DROP TYPE",
            "DROP USER",
            "DROP USER MAPPING",
            "DROP VIEW",
            "EXECUTE",
            "EXPLAIN",
            "FETCH",
            "GRANT",
            "IMPORT FOREIGN SCHEMA",
            "INSERT",
            "LISTEN",
            "LOAD",
            "LOCK",
            "MOVE",
            "NOTIFY",
            "PREPARE",
            "PREPARE TRANSACTION",
            "REASSIGN OWNED",
            "REFRESH MATERIALIZED VIEW",
            "REINDEX",
            "RELEASE SAVEPOINT",
            "RESET",
            "RETURNING",
            "REVOKE",
            "ROLLBACK",
            "ROLLBACK PREPARED",
            "ROLLBACK TO SAVEPOINT",
            "SAVEPOINT",
            "SECURITY LABEL",
            "SELECT",
            "SELECT INTO",
            "SET",
            "SET CONSTRAINTS",
            "SET ROLE",
            "SET SESSION AUTHORIZATION",
            "SET TRANSACTION",
            "SHOW",
            "START TRANSACTION",
            "TRUNCATE",
            "UNLISTEN",
            "UPDATE",
            "VACUUM",
            "VALUES", // other
            "ADD",
            "AFTER",
            "ALTER COLUMN",
            "INSERT INTO",
            "SET SCHEMA",
            "FROM",
            "GROUP BY",
            "HAVING",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"];
          var binaryOperators = [
            "<<",
            ">>",
            "||/",
            "|/",
            "::",
            ":=",
            "->>",
            "->",
            "#>>",
            "#>",
            "=>",
            "~~*",
            "~~",
            "!~~*",
            "!~~",
            "~*",
            "!~*",
            "!~",
            "!!",
            "||",
            "@-@",
            "@@",
            "##",
            "<->",
            "&&",
            "&<",
            "&>",
            "<<|",
            "&<|",
            "|>>",
            "|&>",
            "<^",
            "^>",
            "?#",
            "?-",
            "?|",
            "?-|",
            "?||",
            "@>",
            "<@",
            "~=",
            ">>=",
            "<<=",
            "@@@",
          ]; // https://www.postgresql.org/docs/14/index.html

          var PostgreSqlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(PostgreSqlFormatter, _Formatter);

            var _super = _createSuper(PostgreSqlFormatter);

            function PostgreSqlFormatter() {
              _classCallCheck(this, PostgreSqlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(PostgreSqlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        reservedKeywords,
                      ),
                    ),
                    stringTypes: PostgreSqlFormatter.stringTypes,
                    indexedPlaceholderTypes: ["$"],
                    namedPlaceholderTypes: [":"],
                    operators: PostgreSqlFormatter.operators,
                  });
                },
              },
            ]);

            return PostgreSqlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          PostgreSqlFormatter.stringTypes = [
            '""',
            "''",
            "U&''",
            'U&""',
            "$$",
            "``",
            "E''",
          ];
          PostgreSqlFormatter.operators = binaryOperators;

          /***/
        },

      /***/ "./src/languages/redshift.formatter.ts":
        /*!*********************************************!*\
  !*** ./src/languages/redshift.formatter.ts ***!
  \*********************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ RedshiftFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */

          var reservedFunctions = {
            // https://docs.aws.amazon.com/redshift/latest/dg/c_Aggregate_Functions.html
            aggregate: [
              "ANY_VALUE",
              "APPROXIMATE PERCENTILE_DISC",
              "AVG",
              "COUNT",
              "LISTAGG",
              "MAX",
              "MEDIAN",
              "MIN",
              "PERCENTILE_CONT",
              "STDDEV_SAMP",
              "STDDEV_POP",
              "SUM",
              "VAR_SAMP",
              "VAR_POP",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_Array_Functions.html
            array: [
              "array",
              "array_concat",
              "array_flatten",
              "get_array_length",
              "split_to_array",
              "subarray",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_bitwise_aggregate_functions.html
            bitwise: ["BIT_AND", "BIT_OR", "BOOL_AND", "BOOL_OR"],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_conditional_expressions.html
            conditional: [
              "COALESCE",
              "DECODE",
              "GREATEST",
              "LEAST",
              "NVL",
              "NVL2",
              "NULLIF",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/Date_functions_header.html
            dateTime: [
              "ADD_MONTHS",
              "AT TIME ZONE",
              "CONVERT_TIMEZONE",
              "CURRENT_DATE",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "DATE_CMP",
              "DATE_CMP_TIMESTAMP",
              "DATE_CMP_TIMESTAMPTZ",
              "DATE_PART_YEAR",
              "DATEADD",
              "DATEDIFF",
              "DATE_PART",
              "DATE_TRUNC",
              "EXTRACT",
              "GETDATE",
              "INTERVAL_CMP",
              "LAST_DAY",
              "MONTHS_BETWEEN",
              "NEXT_DAY",
              "SYSDATE",
              "TIMEOFDAY",
              "TIMESTAMP_CMP",
              "TIMESTAMP_CMP_DATE",
              "TIMESTAMP_CMP_TIMESTAMPTZ",
              "TIMESTAMPTZ_CMP",
              "TIMESTAMPTZ_CMP_DATE",
              "TIMESTAMPTZ_CMP_TIMESTAMP",
              "TIMEZONE",
              "TO_TIMESTAMP",
              "TRUNC",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/geospatial-functions.html
            spatial: [
              "AddBBox",
              "DropBBox",
              "GeometryType",
              "ST_AddPoint",
              "ST_Angle",
              "ST_Area",
              "ST_AsBinary",
              "ST_AsEWKB",
              "ST_AsEWKT",
              "ST_AsGeoJSON",
              "ST_AsText",
              "ST_Azimuth",
              "ST_Boundary",
              "ST_Collect",
              "ST_Contains",
              "ST_ContainsProperly",
              "ST_ConvexHull",
              "ST_CoveredBy",
              "ST_Covers",
              "ST_Crosses",
              "ST_Dimension",
              "ST_Disjoint",
              "ST_Distance",
              "ST_DistanceSphere",
              "ST_DWithin",
              "ST_EndPoint",
              "ST_Envelope",
              "ST_Equals",
              "ST_ExteriorRing",
              "ST_Force2D",
              "ST_Force3D",
              "ST_Force3DM",
              "ST_Force3DZ",
              "ST_Force4D",
              "ST_GeometryN",
              "ST_GeometryType",
              "ST_GeomFromEWKB",
              "ST_GeomFromEWKT",
              "ST_GeomFromText",
              "ST_GeomFromWKB",
              "ST_InteriorRingN",
              "ST_Intersects",
              "ST_IsPolygonCCW",
              "ST_IsPolygonCW",
              "ST_IsClosed",
              "ST_IsCollection",
              "ST_IsEmpty",
              "ST_IsSimple",
              "ST_IsValid",
              "ST_Length",
              "ST_LengthSphere",
              "ST_Length2D",
              "ST_LineFromMultiPoint",
              "ST_LineInterpolatePoint",
              "ST_M",
              "ST_MakeEnvelope",
              "ST_MakeLine",
              "ST_MakePoint",
              "ST_MakePolygon",
              "ST_MemSize",
              "ST_MMax",
              "ST_MMin",
              "ST_Multi",
              "ST_NDims",
              "ST_NPoints",
              "ST_NRings",
              "ST_NumGeometries",
              "ST_NumInteriorRings",
              "ST_NumPoints",
              "ST_Perimeter",
              "ST_Perimeter2D",
              "ST_Point",
              "ST_PointN",
              "ST_Points",
              "ST_Polygon",
              "ST_RemovePoint",
              "ST_Reverse",
              "ST_SetPoint",
              "ST_SetSRID",
              "ST_Simplify",
              "ST_SRID",
              "ST_StartPoint",
              "ST_Touches",
              "ST_Within",
              "ST_X",
              "ST_XMax",
              "ST_XMin",
              "ST_Y",
              "ST_YMax",
              "ST_YMin",
              "ST_Z",
              "ST_ZMax",
              "ST_ZMin",
              "SupportsBBox",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/hash-functions.html
            hash: [
              "CHECKSUM",
              "FUNC_SHA1",
              "FNV_HASH",
              "MD5",
              "SHA",
              "SHA1",
              "SHA2",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/hyperloglog-functions.html
            hyperLogLog: [
              "HLL",
              "HLL_CREATE_SKETCH",
              "HLL_CARDINALITY",
              "HLL_COMBINE",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/json-functions.html
            json: [
              "IS_VALID_JSON",
              "IS_VALID_JSON_ARRAY",
              "JSON_ARRAY_LENGTH",
              "JSON_EXTRACT_ARRAY_ELEMENT_TEXT",
              "JSON_EXTRACT_PATH_TEXT",
              "JSON_PARSE",
              "JSON_SERIALIZE",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/Math_functions.html
            math: [
              "ABS",
              "ACOS",
              "ASIN",
              "ATAN",
              "ATAN2",
              "CBRT",
              "CEILING",
              "CEIL",
              "COS",
              "COT",
              "DEGREES",
              "DEXP",
              "DLOG1",
              "DLOG10",
              "EXP",
              "FLOOR",
              "LN",
              "LOG",
              "MOD",
              "PI",
              "POWER",
              "RADIANS",
              "RANDOM",
              "ROUND",
              "SIN",
              "SIGN",
              "SQRT",
              "TAN",
              "TO_HEX",
              "TRUNC",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/ml-function.html
            machineLearning: ["EXPLAIN_MODEL"],
            // https://docs.aws.amazon.com/redshift/latest/dg/String_functions_header.html
            string: [
              "ASCII",
              "BPCHARCMP",
              "BTRIM",
              "BTTEXT_PATTERN_CMP",
              "CHAR_LENGTH",
              "CHARACTER_LENGTH",
              "CHARINDEX",
              "CHR",
              "COLLATE",
              "CONCAT",
              "CRC32",
              "DIFFERENCE",
              "INITCAP",
              "LEFT",
              "RIGHT",
              "LEN",
              "LENGTH",
              "LOWER",
              "LPAD",
              "RPAD",
              "LTRIM",
              "OCTETINDEX",
              "OCTET_LENGTH",
              "POSITION",
              "QUOTE_IDENT",
              "QUOTE_LITERAL",
              "REGEXP_COUNT",
              "REGEXP_INSTR",
              "REGEXP_REPLACE",
              "REGEXP_SUBSTR",
              "REPEAT",
              "REPLACE",
              "REPLICATE",
              "REVERSE",
              "RTRIM",
              "SOUNDEX",
              "SPLIT_PART",
              "STRPOS",
              "STRTOL",
              "SUBSTRING",
              "TEXTLEN",
              "TRANSLATE",
              "TRIM",
              "UPPER",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_Type_Info_Functions.html
            superType: [
              "decimal_precision",
              "decimal_scale",
              "is_array",
              "is_bigint",
              "is_boolean",
              "is_char",
              "is_decimal",
              "is_float",
              "is_integer",
              "is_object",
              "is_scalar",
              "is_smallint",
              "is_varchar",
              "json_typeof",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_Window_functions.html
            window: [
              "AVG",
              "COUNT",
              "CUME_DIST",
              "DENSE_RANK",
              "FIRST_VALUE",
              "LAST_VALUE",
              "LAG",
              "LEAD",
              "LISTAGG",
              "MAX",
              "MEDIAN",
              "MIN",
              "NTH_VALUE",
              "NTILE",
              "PERCENT_RANK",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "RANK",
              "RATIO_TO_REPORT",
              "ROW_NUMBER",
              "STDDEV_SAMP",
              "STDDEV_POP",
              "SUM",
              "VAR_SAMP",
              "VAR_POP",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/r_Data_type_formatting.html
            dataType: [
              "CAST",
              "CONVERT",
              "TO_CHAR",
              "TO_DATE",
              "TO_NUMBER",
              "TEXT_TO_INT_ALT",
              "TEXT_TO_NUMERIC_ALT",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/r_System_administration_functions.html
            sysAdmin: [
              "CHANGE_QUERY_PRIORITY",
              "CHANGE_SESSION_PRIORITY",
              "CHANGE_USER_PRIORITY",
              "CURRENT_SETTING",
              "PG_CANCEL_BACKEND",
              "PG_TERMINATE_BACKEND",
              "REBOOT_CLUSTER",
              "SET_CONFIG",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/r_System_information_functions.html
            sysInfo: [
              "CURRENT_AWS_ACCOUNT",
              "CURRENT_DATABASE",
              "CURRENT_NAMESPACE",
              "CURRENT_SCHEMA",
              "CURRENT_SCHEMAS",
              "CURRENT_USER",
              "CURRENT_USER_ID",
              "HAS_ASSUMEROLE_PRIVILEGE",
              "HAS_DATABASE_PRIVILEGE",
              "HAS_SCHEMA_PRIVILEGE",
              "HAS_TABLE_PRIVILEGE",
              "PG_BACKEND_PID",
              "PG_GET_COLS",
              "PG_GET_GRANTEE_BY_IAM_ROLE",
              "PG_GET_IAM_ROLE_BY_USER",
              "PG_GET_LATE_BINDING_VIEW_COLS",
              "PG_LAST_COPY_COUNT",
              "PG_LAST_COPY_ID",
              "PG_LAST_UNLOAD_ID",
              "PG_LAST_QUERY_ID",
              "PG_LAST_UNLOAD_COUNT",
              "SESSION_USER",
              "SLICE_NUM",
              "USER",
              "VERSION",
            ],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */

          var reservedKeywords = {
            // https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html
            standard: [
              "AES128",
              "AES256",
              "ALL",
              "ALLOWOVERWRITE",
              "ANY",
              "ARRAY",
              "AS",
              "ASC",
              "AUTHORIZATION",
              "BACKUP",
              "BETWEEN",
              "BINARY",
              "BOTH",
              "CHECK",
              "COLUMN",
              "CONSTRAINT",
              "CREATE",
              "CROSS",
              "DEFAULT",
              "DEFERRABLE",
              "DEFLATE",
              "DEFRAG",
              "DESC",
              "DISABLE",
              "DISTINCT",
              "DO",
              "ENABLE",
              "ENCODE",
              "ENCRYPT",
              "ENCRYPTION",
              "EXPLICIT",
              "FALSE",
              "FOR",
              "FOREIGN",
              "FREEZE",
              "FROM",
              "FULL",
              "GLOBALDICT256",
              "GLOBALDICT64K",
              "GROUP",
              "IDENTITY",
              "IGNORE",
              "ILIKE",
              "IN",
              "INITIALLY",
              "INNER",
              "INTO",
              "IS",
              "ISNULL",
              "LANGUAGE",
              "LEADING",
              "LIKE",
              "LIMIT",
              "LOCALTIME",
              "LOCALTIMESTAMP",
              "LUN",
              "LUNS",
              "MINUS",
              "NATURAL",
              "NEW",
              "NOT",
              "NOTNULL",
              "NULL",
              "NULLS",
              "OFF",
              "OFFLINE",
              "OFFSET",
              "OID",
              "OLD",
              "ONLY",
              "OPEN",
              "ORDER",
              "OUTER",
              "OVERLAPS",
              "PARALLEL",
              "PARTITION",
              "PERCENT",
              "PERMISSIONS",
              "PLACING",
              "PRIMARY",
              "RECOVER",
              "REFERENCES",
              "REJECTLOG",
              "RESORT",
              "RESPECT",
              "RESTORE",
              "SIMILAR",
              "SNAPSHOT",
              "SOME",
              "SYSTEM",
              "TABLE",
              "TAG",
              "TDES",
              "THEN",
              "TIMESTAMP",
              "TO",
              "TOP",
              "TRAILING",
              "TRUE",
              "UNIQUE",
              "VERBOSE",
              "WALLET",
              "WITHOUT",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-conversion.html
            dataConversionParams: [
              "ACCEPTANYDATE",
              "ACCEPTINVCHARS",
              "BLANKSASNULL",
              "DATEFORMAT",
              "EMPTYASNULL",
              "ENCODING",
              "ESCAPE",
              "EXPLICIT_IDS",
              "FILLRECORD",
              "IGNOREBLANKLINES",
              "IGNOREHEADER",
              "NULL AS",
              "REMOVEQUOTES",
              "ROUNDEC",
              "TIMEFORMAT",
              "TRIMBLANKS",
              "TRUNCATECOLUMNS",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-load.html
            dataLoadParams: [
              "COMPROWS",
              "COMPUPDATE",
              "MAXERROR",
              "NOLOAD",
              "STATUPDATE",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-format.html
            dataFormatParams: [
              "FORMAT",
              "CSV",
              "DELIMITER",
              "FIXEDWIDTH",
              "SHAPEFILE",
              "AVRO",
              "JSON",
              "PARQUET",
              "ORC",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html
            copyAuthParams: [
              "ACCESS_KEY_ID",
              "CREDENTIALS",
              "ENCRYPTED",
              "IAM_ROLE",
              "MASTER_SYMMETRIC_KEY",
              "SECRET_ACCESS_KEY",
              "SESSION_TOKEN",
            ],
            // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-file-compression.html
            copyCompressionParams: ["BZIP2", "GZIP", "LZOP", "ZSTD"],
            // https://docs.aws.amazon.com/redshift/latest/dg/r_COPY-alphabetical-parm-list.html
            copyMiscParams: ["MANIFEST", "READRATIO", "REGION", "SSH"],
            // https://docs.aws.amazon.com/redshift/latest/dg/c_Compression_encodings.html
            compressionEncodings: [
              "RAW",
              "AZ64",
              "BYTEDICT",
              "DELTA",
              "DELTA32K",
              "LZO",
              "MOSTLY8",
              "MOSTLY16",
              "MOSTLY32",
              "RUNLENGTH",
              "TEXT255",
              "TEXT32K",
            ],
            misc: [
              // CREATE EXTERNAL SCHEMA (https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_EXTERNAL_SCHEMA.html)
              "CATALOG_ROLE",
              "SECRET_ARN",
              "EXTERNAL",
              "HIVE METASTORE", // https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_dist_sort.html
              "AUTO",
              "EVEN",
              "KEY",
              "PREDICATE", // unknown
              "COMPRESSION",
              "DATA CATALOG",
            ],

            /**
             * Other keywords not included:
             * STL: https://docs.aws.amazon.com/redshift/latest/dg/c_intro_STL_tables.html
             * SVCS: https://docs.aws.amazon.com/redshift/latest/dg/svcs_views.html
             * SVL: https://docs.aws.amazon.com/redshift/latest/dg/svl_views.html
             * SVV: https://docs.aws.amazon.com/redshift/latest/dg/svv_views.html
             */
            dataTypes: [
              "CHAR",
              "CHARACTER",
              "NCHAR",
              "VARCHAR",
              "CHARACTER VARYING",
              "NVARCHAR",
              "BPCHAR",
              "TEXT",
            ],
          };
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://docs.aws.amazon.com/redshift/latest/dg/c_SQL_commands.html

          var reservedCommands = [
            "ABORT",
            "ALTER DATABASE",
            "ALTER DATASHARE",
            "ALTER DEFAULT PRIVILEGES",
            "ALTER GROUP",
            "ALTER MATERIALIZED VIEW",
            "ALTER PROCEDURE",
            "ALTER SCHEMA",
            "ALTER TABLE",
            "ALTER TABLE APPEND",
            "ALTER USER",
            "ANALYSE",
            "ANALYZE",
            "ANALYSE COMPRESSION",
            "ANALYZE COMPRESSION",
            "BEGIN",
            "CALL",
            "CANCEL",
            "CLOSE",
            "COMMENT",
            "COMMIT",
            "COPY",
            "CREATE DATABASE",
            "CREATE DATASHARE",
            "CREATE EXTERNAL FUNCTION",
            "CREATE EXTERNAL SCHEMA",
            "CREATE EXTERNAL TABLE",
            "CREATE FUNCTION",
            "CREATE GROUP",
            "CREATE LIBRARY",
            "CREATE MATERIALIZED VIEW",
            "CREATE MODEL",
            "CREATE PROCEDURE",
            "CREATE SCHEMA",
            "CREATE TABLE",
            "CREATE TABLE AS",
            "CREATE USER",
            "CREATE VIEW",
            "DEALLOCATE",
            "DECLARE",
            "DELETE",
            "DELETE FROM",
            "DESC DATASHARE",
            "DROP DATABASE",
            "DROP DATASHARE",
            "DROP FUNCTION",
            "DROP GROUP",
            "DROP LIBRARY",
            "DROP MODEL",
            "DROP MATERIALIZED VIEW",
            "DROP PROCEDURE",
            "DROP SCHEMA",
            "DROP TABLE",
            "DROP USER",
            "DROP VIEW",
            "DROP",
            "EXECUTE",
            "EXPLAIN",
            "FETCH",
            "FROM",
            "GRANT",
            "HAVING",
            "INSERT",
            "LOCK",
            "PREPARE",
            "REFRESH MATERIALIZED VIEW",
            "RESET",
            "REVOKE",
            "ROLLBACK",
            "SELECT",
            "SELECT INTO",
            "SET",
            "SET SESSION AUTHORIZATION",
            "SET SESSION CHARACTERISTICS",
            "SHOW",
            "SHOW EXTERNAL TABLE",
            "SHOW MODEL",
            "SHOW DATASHARES",
            "SHOW PROCEDURE",
            "SHOW TABLE",
            "SHOW VIEW",
            "START TRANSACTION",
            "TRUNCATE",
            "UNLOAD",
            "UPDATE",
            "VACUUM",
            "WHERE",
            "WITH", // other
            "GROUP BY",
            "ORDER BY",
            "LIMIT",
            "OFFSET",
            "VALUES",
            "MODIFY",
            "INSERT INTO",
            "ALTER COLUMN",
            "SET SCHEMA", // verify
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // https://docs.aws.amazon.com/redshift/latest/dg/cm_chap_SQLCommandRef.html

          var RedshiftFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(RedshiftFormatter, _Formatter);

            var _super = _createSuper(RedshiftFormatter);

            function RedshiftFormatter() {
              _classCallCheck(this, RedshiftFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(RedshiftFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        _toConsumableArray(
                          Object.values(reservedKeywords).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                      ),
                    ),
                    stringTypes: RedshiftFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    // XXX: Seems like redshift only supports $1, $2, $3 parameters,
                    // but for some reason we list lots of types in here.
                    // https://docs.aws.amazon.com/redshift/latest/dg/r_PREPARE.html
                    namedPlaceholderTypes: ["@", "#", "$"],
                    operators: RedshiftFormatter.operators,
                  });
                },
              },
            ]);

            return RedshiftFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          RedshiftFormatter.stringTypes = ['""', "''", "``"];
          RedshiftFormatter.operators = ["|/", "||/", "<<", ">>", "||"];

          /***/
        },

      /***/ "./src/languages/spark.formatter.ts":
        /*!******************************************!*\
  !*** ./src/languages/spark.formatter.ts ***!
  \******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ SparkFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_core_token__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/core/token */ "./src/core/token.ts");
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // http://spark.apache.org/docs/latest/sql-ref-functions.html

          var reservedFunctions = {
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#aggregate-functions
            aggregate: [
              "ANY",
              "APPROX_COUNT_DISTINCT",
              "APPROX_PERCENTILE",
              "AVG",
              "BIT_AND",
              "BIT_OR",
              "BIT_XOR",
              "BOOL_AND",
              "BOOL_OR",
              "COLLECT_LIST",
              "COLLECT_SET",
              "CORR",
              "COUNT",
              "COUNT",
              "COUNT",
              "COUNT_IF",
              "COUNT_MIN_SKETCH",
              "COVAR_POP",
              "COVAR_SAMP",
              "EVERY",
              "FIRST",
              "FIRST_VALUE",
              "GROUPING",
              "GROUPING_ID",
              "KURTOSIS",
              "LAST",
              "LAST_VALUE",
              "MAX",
              "MAX_BY",
              "MEAN",
              "MIN",
              "MIN_BY",
              "PERCENTILE",
              "PERCENTILE",
              "PERCENTILE_APPROX",
              "SKEWNESS",
              "SOME",
              "STD",
              "STDDEV",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "SUM",
              "VAR_POP",
              "VAR_SAMP",
              "VARIANCE",
            ],
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#window-functions
            window: [
              "CUME_DIST",
              "DENSE_RANK",
              "LAG",
              "LEAD",
              "NTH_VALUE",
              "NTILE",
              "PERCENT_RANK",
              "RANK",
              "ROW_NUMBER",
            ],
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#array-functions
            array: [
              "ARRAY",
              "ARRAY_CONTAINS",
              "ARRAY_DISTINCT",
              "ARRAY_EXCEPT",
              "ARRAY_INTERSECT",
              "ARRAY_JOIN",
              "ARRAY_MAX",
              "ARRAY_MIN",
              "ARRAY_POSITION",
              "ARRAY_REMOVE",
              "ARRAY_REPEAT",
              "ARRAY_UNION",
              "ARRAYS_OVERLAP",
              "ARRAYS_ZIP",
              "FLATTEN",
              "SEQUENCE",
              "SHUFFLE",
              "SLICE",
              "SORT_ARRAY",
            ],
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#map-functions
            map: [
              "ELEMENT_AT",
              "ELEMENT_AT",
              "MAP",
              "MAP_CONCAT",
              "MAP_ENTRIES",
              "MAP_FROM_ARRAYS",
              "MAP_FROM_ENTRIES",
              "MAP_KEYS",
              "MAP_VALUES",
              "STR_TO_MAP",
            ],
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#date-and-timestamp-functions
            datetime: [
              "ADD_MONTHS",
              "CURRENT_DATE",
              "CURRENT_DATE",
              "CURRENT_TIMESTAMP",
              "CURRENT_TIMESTAMP",
              "CURRENT_TIMEZONE",
              "DATE_ADD",
              "DATE_FORMAT",
              "DATE_FROM_UNIX_DATE",
              "DATE_PART",
              "DATE_SUB",
              "DATE_TRUNC",
              "DATEDIFF",
              "DAY",
              "DAYOFMONTH",
              "DAYOFWEEK",
              "DAYOFYEAR",
              "EXTRACT",
              "FROM_UNIXTIME",
              "FROM_UTC_TIMESTAMP",
              "HOUR",
              "LAST_DAY",
              "MAKE_DATE",
              "MAKE_DT_INTERVAL",
              "MAKE_INTERVAL",
              "MAKE_TIMESTAMP",
              "MAKE_YM_INTERVAL",
              "MINUTE",
              "MONTH",
              "MONTHS_BETWEEN",
              "NEXT_DAY",
              "NOW",
              "QUARTER",
              "SECOND",
              "SESSION_WINDOW",
              "TIMESTAMP_MICROS",
              "TIMESTAMP_MILLIS",
              "TIMESTAMP_SECONDS",
              "TO_DATE",
              "TO_TIMESTAMP",
              "TO_UNIX_TIMESTAMP",
              "TO_UTC_TIMESTAMP",
              "TRUNC",
              "UNIX_DATE",
              "UNIX_MICROS",
              "UNIX_MILLIS",
              "UNIX_SECONDS",
              "UNIX_TIMESTAMP",
              "WEEKDAY",
              "WEEKOFYEAR",
              "WINDOW",
              "YEAR",
            ],
            // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#json-functions
            json: [
              "FROM_JSON",
              "GET_JSON_OBJECT",
              "JSON_ARRAY_LENGTH",
              "JSON_OBJECT_KEYS",
              "JSON_TUPLE",
              "SCHEMA_OF_JSON",
              "TO_JSON",
            ],
            // http://spark.apache.org/docs/latest/api/sql/index.html
            misc: [
              "ABS",
              "ACOS",
              "ACOSH",
              "AGGREGATE",
              "ARRAY_SORT",
              "ASCII",
              "ASIN",
              "ASINH",
              "ASSERT_TRUE",
              "ATAN",
              "ATAN2",
              "ATANH",
              "BASE64",
              "BIGINT",
              "BIN",
              "BINARY",
              "BIT_COUNT",
              "BIT_GET",
              "BIT_LENGTH",
              "BOOLEAN",
              "BROUND",
              "BTRIM",
              "CARDINALITY",
              "CBRT",
              "CEIL",
              "CEILING",
              "CHAR",
              "CHAR_LENGTH",
              "CHARACTER_LENGTH",
              "CHR",
              "CONCAT",
              "CONCAT_WS",
              "CONV",
              "COS",
              "COSH",
              "COT",
              "CRC32",
              "CURRENT_CATALOG",
              "CURRENT_DATABASE",
              "CURRENT_USER",
              "DATE",
              "DECIMAL",
              "DEGREES",
              "DOUBLE", // 'E',
              "ELT",
              "EXP",
              "EXPM1",
              "FACTORIAL",
              "FIND_IN_SET",
              "FLOAT",
              "FLOOR",
              "FORALL",
              "FORMAT_NUMBER",
              "FORMAT_STRING",
              "FROM_CSV",
              "GETBIT",
              "HASH",
              "HEX",
              "HYPOT",
              "INITCAP",
              "INLINE",
              "INLINE_OUTER",
              "INPUT_FILE_BLOCK_LENGTH",
              "INPUT_FILE_BLOCK_START",
              "INPUT_FILE_NAME",
              "INSTR",
              "INT",
              "ISNAN",
              "ISNOTNULL",
              "ISNULL",
              "JAVA_METHOD",
              "LCASE",
              "LEFT",
              "LENGTH",
              "LEVENSHTEIN",
              "LN",
              "LOCATE",
              "LOG",
              "LOG10",
              "LOG1P",
              "LOG2",
              "LOWER",
              "LPAD",
              "LTRIM",
              "MAP_FILTER",
              "MAP_ZIP_WITH",
              "MD5",
              "MOD",
              "MONOTONICALLY_INCREASING_ID",
              "NAMED_STRUCT",
              "NANVL",
              "NEGATIVE",
              "NVL",
              "NVL2",
              "OCTET_LENGTH",
              "OVERLAY",
              "PARSE_URL",
              "PI",
              "PMOD",
              "POSEXPLODE",
              "POSEXPLODE_OUTER",
              "POSITION",
              "POSITIVE",
              "POW",
              "POWER",
              "PRINTF",
              "RADIANS",
              "RAISE_ERROR",
              "RAND",
              "RANDN",
              "RANDOM",
              "REFLECT",
              "REGEXP_EXTRACT",
              "REGEXP_EXTRACT_ALL",
              "REGEXP_LIKE",
              "REGEXP_REPLACE",
              "REPEAT",
              "REPLACE",
              "REVERSE",
              "RIGHT",
              "RINT",
              "ROUND",
              "RPAD",
              "RTRIM",
              "SCHEMA_OF_CSV",
              "SENTENCES",
              "SHA",
              "SHA1",
              "SHA2",
              "SHIFTLEFT",
              "SHIFTRIGHT",
              "SHIFTRIGHTUNSIGNED",
              "SIGN",
              "SIGNUM",
              "SIN",
              "SINH",
              "SMALLINT",
              "SOUNDEX",
              "SPACE",
              "SPARK_PARTITION_ID",
              "SPLIT",
              "SQRT",
              "STACK",
              "SUBSTR",
              "SUBSTRING",
              "SUBSTRING_INDEX",
              "TAN",
              "TANH",
              "TIMESTAMP",
              "TINYINT",
              "TO_CSV",
              "TRANSFORM_KEYS",
              "TRANSFORM_VALUES",
              "TRANSLATE",
              "TRIM",
              "TRY_ADD",
              "TRY_DIVIDE",
              "TYPEOF",
              "UCASE",
              "UNBASE64",
              "UNHEX",
              "UPPER",
              "UUID",
              "VERSION",
              "WIDTH_BUCKET",
              "XPATH",
              "XPATH_BOOLEAN",
              "XPATH_DOUBLE",
              "XPATH_FLOAT",
              "XPATH_INT",
              "XPATH_LONG",
              "XPATH_NUMBER",
              "XPATH_SHORT",
              "XPATH_STRING",
              "XXHASH64",
              "ZIP_WITH",
            ],
          };
          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://deepkb.com/CO_000013/en/kb/IMPORT-fbfa59f0-2bf1-31fe-bb7b-0f9efe9932c6/spark-sql-keywords

          var reservedKeywords = [
            "ADD",
            "AFTER",
            "ALL",
            "ALTER",
            "ANALYZE",
            "AND",
            "ANTI",
            "ANY",
            "ARCHIVE",
            "ARRAY",
            "AS",
            "ASC",
            "AT",
            "AUTHORIZATION",
            "BETWEEN",
            "BOTH",
            "BUCKET",
            "BUCKETS",
            "BY",
            "CACHE",
            "CASCADE",
            "CAST",
            "CHANGE",
            "CHECK",
            "CLEAR",
            "CLUSTER",
            "CLUSTERED",
            "CODEGEN",
            "COLLATE",
            "COLLECTION",
            "COLUMN",
            "COLUMNS",
            "COMMENT",
            "COMMIT",
            "COMPACT",
            "COMPACTIONS",
            "COMPUTE",
            "CONCATENATE",
            "CONSTRAINT",
            "COST",
            "CREATE",
            "CROSS",
            "CUBE",
            "CURRENT",
            "CURRENT_DATE",
            "CURRENT_TIME",
            "CURRENT_TIMESTAMP",
            "CURRENT_USER",
            "DATA",
            "DATABASE",
            "DATABASES",
            "DAY",
            "DBPROPERTIES",
            "DEFINED",
            "DELETE",
            "DELIMITED",
            "DESC",
            "DESCRIBE",
            "DFS",
            "DIRECTORIES",
            "DIRECTORY",
            "DISTINCT",
            "DISTRIBUTE",
            "DIV",
            "DROP",
            "ESCAPE",
            "ESCAPED",
            "EXCEPT",
            "EXCHANGE",
            "EXISTS",
            "EXPORT",
            "EXTENDED",
            "EXTERNAL",
            "EXTRACT",
            "FALSE",
            "FETCH",
            "FIELDS",
            "FILTER",
            "FILEFORMAT",
            "FIRST",
            "FIRST_VALUE",
            "FOLLOWING",
            "FOR",
            "FOREIGN",
            "FORMAT",
            "FORMATTED",
            "FULL",
            "FUNCTION",
            "FUNCTIONS",
            "GLOBAL",
            "GRANT",
            "GROUP",
            "GROUPING",
            "HOUR",
            "IF",
            "IGNORE",
            "IMPORT",
            "IN",
            "INDEX",
            "INDEXES",
            "INNER",
            "INPATH",
            "INPUTFORMAT",
            "INTERSECT",
            "INTERVAL",
            "INTO",
            "IS",
            "ITEMS",
            "KEYS",
            "LAST",
            "LAST_VALUE",
            "LATERAL",
            "LAZY",
            "LEADING",
            "LEFT",
            "LIKE",
            "LINES",
            "LIST",
            "LOCAL",
            "LOCATION",
            "LOCK",
            "LOCKS",
            "LOGICAL",
            "MACRO",
            "MAP",
            "MATCHED",
            "MERGE",
            "MINUTE",
            "MONTH",
            "MSCK",
            "NAMESPACE",
            "NAMESPACES",
            "NATURAL",
            "NO",
            "NOT",
            "NULL",
            "NULLS",
            "OF",
            "ONLY",
            "OPTION",
            "OPTIONS",
            "OR",
            "ORDER",
            "OUT",
            "OUTER",
            "OUTPUTFORMAT",
            "OVER",
            "OVERLAPS",
            "OVERLAY",
            "OVERWRITE",
            "OWNER",
            "PARTITION",
            "PARTITIONED",
            "PARTITIONS",
            "PERCENT",
            "PLACING",
            "POSITION",
            "PRECEDING",
            "PRIMARY",
            "PRINCIPALS",
            "PROPERTIES",
            "PURGE",
            "QUERY",
            "RANGE",
            "RECORDREADER",
            "RECORDWRITER",
            "RECOVER",
            "REDUCE",
            "REFERENCES",
            "RENAME",
            "REPAIR",
            "REPLACE",
            "RESPECT",
            "RESTRICT",
            "REVOKE",
            "RIGHT",
            "RLIKE",
            "ROLE",
            "ROLES",
            "ROLLBACK",
            "ROLLUP",
            "ROW",
            "ROWS",
            "SCHEMA",
            "SECOND",
            "SELECT",
            "SEMI",
            "SEPARATED",
            "SERDE",
            "SERDEPROPERTIES",
            "SESSION_USER",
            "SETS",
            "SHOW",
            "SKEWED",
            "SOME",
            "SORT",
            "SORTED",
            "START",
            "STATISTICS",
            "STORED",
            "STRATIFY",
            "STRUCT",
            "SUBSTR",
            "SUBSTRING",
            "TABLE",
            "TABLES",
            "TBLPROPERTIES",
            "TEMPORARY",
            "TERMINATED",
            "THEN",
            "TO",
            "TOUCH",
            "TRAILING",
            "TRANSACTION",
            "TRANSACTIONS",
            "TRIM",
            "TRUE",
            "TRUNCATE",
            "UNARCHIVE",
            "UNBOUNDED",
            "UNCACHE",
            "UNIQUE",
            "UNKNOWN",
            "UNLOCK",
            "UNSET",
            "USE",
            "USER",
            "VIEW",
            "WINDOW",
            "YEAR", // other
            "ANALYSE",
            "ARRAY_ZIP",
            "COALESCE",
            "CONTAINS",
            "CONVERT",
            "CURRENT ROW",
            "DAYS",
            "DAY_HOUR",
            "DAY_MINUTE",
            "DAY_SECOND",
            "DECODE",
            "DEFAULT",
            "DISTINCTROW",
            "ENCODE",
            "EXPLODE",
            "EXPLODE_OUTER",
            "FIXED",
            "GREATEST",
            "GROUP_CONCAT",
            "HOURS",
            "HOUR_MINUTE",
            "HOUR_SECOND",
            "IFNULL",
            "LEAST",
            "LEVEL",
            "MINUTE_SECOND",
            "NULLIF",
            "OFFSET",
            "ON DELETE",
            "ON UPDATE",
            "OPTIMIZE",
            "REGEXP",
            "SEPARATOR",
            "SIZE",
            "STRING",
            "TYPE",
            "TYPES",
            "UNSIGNED",
            "VARIABLES",
            "YEAR_MONTH",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // http://spark.apache.org/docs/latest/sql-ref-syntax.html

          var reservedCommands = [
            // DDL
            "ALTER COLUMN",
            "ALTER DATABASE",
            "ALTER TABLE",
            "ALTER VIEW",
            "CREATE DATABASE",
            "CREATE FUNCTION",
            "CREATE TABLE",
            "CREATE VIEW",
            "DROP DATABASE",
            "DROP FUNCTION",
            "DROP TABLE",
            "DROP VIEW",
            "REPAIR TABLE",
            "TRUNCATE TABLE",
            "USE DATABASE", // DML
            "INSERT INTO",
            "INSERT OVERWRITE",
            "INSERT OVERWRITE DIRECTORY",
            "LOAD", // Data Retrieval
            "SELECT",
            "WITH",
            "CLUSTER BY",
            "DISTRIBUTE BY",
            "PARTITION BY",
            "GROUP BY",
            "HAVING",
            "VALUES",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SORT BY",
            "TABLESAMPLE",
            "WHERE",
            "PIVOT",
            "TRANSFORM",
            "EXPLAIN", // Auxiliary
            "ADD FILE",
            "ADD JAR",
            "ANALYZE TABLE",
            "CACHE TABLE",
            "CLEAR CACHE",
            "DESCRIBE DATABASE",
            "DESCRIBE FUNCTION",
            "DESCRIBE QUERY",
            "DESCRIBE TABLE",
            "LIST FILE",
            "LIST JAR",
            "REFRESH",
            "REFRESH TABLE",
            "REFRESH FUNCTION",
            "RESET",
            "SET",
            "SET SCHEMA",
            "SHOW COLUMNS",
            "SHOW CREATE TABLE",
            "SHOW DATABASES",
            "SHOW FUNCTIONS",
            "SHOW PARTITIONS",
            "SHOW TABLE EXTENDED",
            "SHOW TABLES",
            "SHOW TBLPROPERTIES",
            "SHOW VIEWS",
            "UNCACHE TABLE", // other
            "FROM",
            "INSERT",
            "LATERAL VIEW",
            "UPDATE",
            "WINDOW", // verify
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN", // apply
            "CROSS APPLY",
            "OUTER APPLY", // non-standard-joins
            "ANTI JOIN",
            "SEMI JOIN",
            "LEFT ANTI JOIN",
            "LEFT SEMI JOIN",
            "RIGHT OUTER JOIN",
            "RIGHT SEMI JOIN",
            "NATURAL ANTI JOIN",
            "NATURAL FULL OUTER JOIN",
            "NATURAL INNER JOIN",
            "NATURAL LEFT ANTI JOIN",
            "NATURAL LEFT OUTER JOIN",
            "NATURAL LEFT SEMI JOIN",
            "NATURAL OUTER JOIN",
            "NATURAL RIGHT OUTER JOIN",
            "NATURAL RIGHT SEMI JOIN",
            "NATURAL SEMI JOIN",
            "CROSS APPLY",
            "OUTER APPLY",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // http://spark.apache.org/docs/latest/sql-programming-guide.html

          var SparkFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(SparkFormatter, _Formatter);

            var _super = _createSuper(SparkFormatter);

            function SparkFormatter() {
              _classCallCheck(this, SparkFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(SparkFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedLogicalOperators: ["AND", "OR", "XOR"],
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_3__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        reservedKeywords,
                      ),
                    ),
                    stringTypes: SparkFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                    namedPlaceholderTypes: ["$"],
                    operators: SparkFormatter.operators,
                    preprocess: preprocess,
                  });
                },
              },
            ]);

            return SparkFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          SparkFormatter.stringTypes = ['""', "''", "``", "{}"];
          SparkFormatter.operators = ["<=>", "&&", "||", "==", "->"];

          function preprocess(tokens) {
            return tokens.map(function (token, i) {
              var prevToken =
                tokens[i - 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN;
              var nextToken =
                tokens[i + 1] ||
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.EOF_TOKEN; // [WINDOW](...)

              if (
                src_core_token__WEBPACK_IMPORTED_MODULE_2__.isToken.WINDOW(
                  token,
                ) &&
                nextToken.type ===
                  src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .BLOCK_START
              ) {
                // This is a function call, treat it as a reserved word
                return Object.assign(Object.assign({}, token), {
                  type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD,
                });
              } // TODO: deprecate this once ITEMS is merged with COLLECTION

              if (
                token.value === "ITEMS" &&
                token.type ===
                  src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                    .RESERVED_KEYWORD
              ) {
                if (
                  !(
                    prevToken.value === "COLLECTION" &&
                    nextToken.value === "TERMINATED"
                  )
                ) {
                  // this is a word and not COLLECTION ITEMS
                  return {
                    type: src_core_token__WEBPACK_IMPORTED_MODULE_2__.TokenType
                      .WORD,
                    text: token.text,
                    value: token.text,
                  };
                }
              }

              return token;
            });
          }

          /***/
        },

      /***/ "./src/languages/sql.formatter.ts":
        /*!****************************************!*\
  !*** ./src/languages/sql.formatter.ts ***!
  \****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ SqlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */
          // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word

          var reservedKeywords = [
            "ABS",
            "ALL",
            "ALLOCATE",
            "ALTER",
            "ANY",
            "ARE",
            "ARRAY",
            "AS",
            "ASENSITIVE",
            "ASYMMETRIC",
            "AT",
            "ATOMIC",
            "AUTHORIZATION",
            "AVG",
            "BEGIN",
            "BETWEEN",
            "BIGINT",
            "BINARY",
            "BLOB",
            "BOOLEAN",
            "BOTH",
            "BY",
            "CALL",
            "CALLED",
            "CARDINALITY",
            "CASCADED",
            "CAST",
            "CEIL",
            "CEILING",
            "CHAR",
            "CHARACTER",
            "CHARACTER_LENGTH",
            "CHAR_LENGTH",
            "CHECK",
            "CLOB",
            "CLOSE",
            "COALESCE",
            "COLLATE",
            "COLLECT",
            "COLUMN",
            "COMMIT",
            "CONDITION",
            "CONNECT",
            "CONSTRAINT",
            "CONVERT",
            "CORR",
            "CORRESPONDING",
            "COUNT",
            "COVAR_POP",
            "COVAR_SAMP",
            "CREATE",
            "CROSS",
            "CUBE",
            "CUME_DIST",
            "CURRENT",
            "CURRENT_CATALOG",
            "CURRENT_DATE",
            "CURRENT_DEFAULT_TRANSFORM_GROUP",
            "CURRENT_PATH",
            "CURRENT_ROLE",
            "CURRENT_SCHEMA",
            "CURRENT_TIME",
            "CURRENT_TIMESTAMP",
            "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
            "CURRENT_USER",
            "CURSOR",
            "CYCLE",
            "DATE",
            "DAY",
            "DEALLOCATE",
            "DEC",
            "DECIMAL",
            "DECLARE",
            "DEFAULT",
            "DELETE",
            "DENSE_RANK",
            "DEREF",
            "DESCRIBE",
            "DETERMINISTIC",
            "DISCONNECT",
            "DISTINCT",
            "DOUBLE",
            "DROP",
            "DYNAMIC",
            "EACH",
            "ELEMENT",
            "END-EXEC",
            "ESCAPE",
            "EVERY",
            "EXCEPT",
            "EXEC",
            "EXECUTE",
            "EXISTS",
            "EXP",
            "EXTERNAL",
            "EXTRACT",
            "FALSE",
            "FETCH",
            "FILTER",
            "FLOAT",
            "FLOOR",
            "FOR",
            "FOREIGN",
            "FREE",
            "FROM",
            "FULL",
            "FUNCTION",
            "FUSION",
            "GET",
            "GLOBAL",
            "GRANT",
            "GROUP",
            "GROUPING",
            "HAVING",
            "HOLD",
            "HOUR",
            "IDENTITY",
            "IN",
            "INDICATOR",
            "INNER",
            "INOUT",
            "INSENSITIVE",
            "INSERT",
            "INT",
            "INTEGER",
            "INTERSECT",
            "INTERSECTION",
            "INTERVAL",
            "INTO",
            "IS",
            "LANGUAGE",
            "LARGE",
            "LATERAL",
            "LEADING",
            "LEFT",
            "LIKE",
            "LIKE_REGEX",
            "LN",
            "LOCAL",
            "LOCALTIME",
            "LOCALTIMESTAMP",
            "LOWER",
            "MATCH",
            "MAX",
            "MEMBER",
            "MERGE",
            "METHOD",
            "MIN",
            "MINUTE",
            "MOD",
            "MODIFIES",
            "MODULE",
            "MONTH",
            "MULTISET",
            "NATIONAL",
            "NATURAL",
            "NCHAR",
            "NCLOB",
            "NEW",
            "NO",
            "NONE",
            "NORMALIZE",
            "NOT",
            "NULL",
            "NULLIF",
            "NUMERIC",
            "OCCURRENCES_REGEX",
            "OCTET_LENGTH",
            "OF",
            "OLD",
            "ON DELETE",
            "ON UPDATE",
            "ONLY",
            "OPEN",
            "ORDER",
            "OUT",
            "OUTER",
            "OVER",
            "OVERLAPS",
            "OVERLAY",
            "PARAMETER",
            "PARTITION",
            "PERCENTILE_CONT",
            "PERCENTILE_DISC",
            "PERCENT_RANK",
            "POSITION",
            "POSITION_REGEX",
            "POWER",
            "PRECISION",
            "PREPARE",
            "PRIMARY",
            "PROCEDURE",
            "RANGE",
            "RANK",
            "READS",
            "REAL",
            "RECURSIVE",
            "REF",
            "REFERENCES",
            "REFERENCING",
            "REGR_AVGX",
            "REGR_AVGY",
            "REGR_COUNT",
            "REGR_INTERCEPT",
            "REGR_R2",
            "REGR_SLOPE",
            "REGR_SXX",
            "REGR_SXY",
            "REGR_SYY",
            "RELEASE",
            "RESULT",
            "RETURN",
            "RETURNS",
            "REVOKE",
            "RIGHT",
            "ROLLBACK",
            "ROLLUP",
            "ROW",
            "ROWS",
            "ROW_NUMBER",
            "SAVEPOINT",
            "SCOPE",
            "SCROLL",
            "SEARCH",
            "SECOND",
            "SELECT",
            "SENSITIVE",
            "SESSION_USER",
            "SET",
            "SIMILAR",
            "SMALLINT",
            "SOME",
            "SPECIFIC",
            "SPECIFICTYPE",
            "SQL",
            "SQLEXCEPTION",
            "SQLSTATE",
            "SQLWARNING",
            "SQRT",
            "START",
            "STATIC",
            "STDDEV_POP",
            "STDDEV_SAMP",
            "SUBMULTISET",
            "SUBSTRING",
            "SUBSTRING_REGEX",
            "SUM",
            "SYMMETRIC",
            "SYSTEM",
            "SYSTEM_USER",
            "TABLE",
            "TABLESAMPLE",
            "THEN",
            "TIME",
            "TIMESTAMP",
            "TIMEZONE_HOUR",
            "TIMEZONE_MINUTE",
            "TO",
            "TRAILING",
            "TRANSLATE",
            "TRANSLATE_REGEX",
            "TRANSLATION",
            "TREAT",
            "TRIGGER",
            "TRIM",
            "TRUE",
            "UESCAPE",
            "UNION",
            "UNIQUE",
            "UNKNOWN",
            "UNNEST",
            "UPDATE",
            "UPPER",
            "USER",
            "VALUE",
            "VALUES",
            "VARBINARY",
            "VARCHAR",
            "VARYING",
            "VAR_POP",
            "VAR_SAMP",
            "WHENEVER",
            "WIDTH_BUCKET",
            "WINDOW",
            "WITHIN",
            "WITHOUT",
            "YEAR",
          ];
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */

          var reservedCommands = [
            "ADD",
            "ALTER COLUMN",
            "ALTER TABLE",
            "CREATE TABLE",
            "DROP TABLE",
            "DELETE FROM",
            "FETCH FIRST",
            "FETCH NEXT",
            "FETCH PRIOR",
            "FETCH LAST",
            "FETCH ABSOLUTE",
            "FETCH RELATIVE",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "SET SCHEMA",
            "SET",
            "UPDATE",
            "VALUES",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"];

          var SqlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(SqlFormatter, _Formatter);

            var _super = _createSuper(SqlFormatter);

            function SqlFormatter() {
              _classCallCheck(this, SqlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(SqlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      reservedKeywords,
                    ),
                    stringTypes: SqlFormatter.stringTypes,
                    indexedPlaceholderTypes: ["?"],
                  });
                },
              },
            ]);

            return SqlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          SqlFormatter.stringTypes = ['""', "''", "``"];
          SqlFormatter.operators = [];

          /***/
        },

      /***/ "./src/languages/sqlite.formatter.ts":
        /*!*******************************************!*\
  !*** ./src/languages/sqlite.formatter.ts ***!
  \*******************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ SqliteFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word

          var standardReservedWords = [
            "ABS",
            "ALL",
            "ALLOCATE",
            "ALTER",
            "AND",
            "ANY",
            "ARE",
            "ARRAY",
            "AS",
            "ASENSITIVE",
            "ASYMMETRIC",
            "AT",
            "ATOMIC",
            "AUTHORIZATION",
            "AVG",
            "BEGIN",
            "BETWEEN",
            "BIGINT",
            "BINARY",
            "BLOB",
            "BOOLEAN",
            "BOTH",
            "BY",
            "CALL",
            "CALLED",
            "CARDINALITY",
            "CASCADED",
            "CAST",
            "CEIL",
            "CEILING",
            "CHAR",
            "CHAR_LENGTH",
            "CHARACTER",
            "CHARACTER_LENGTH",
            "CHECK",
            "CLOB",
            "CLOSE",
            "COALESCE",
            "COLLATE",
            "COLLECT",
            "COLUMN",
            "COMMIT",
            "CONDITION",
            "CONNECT",
            "CONSTRAINT",
            "CONVERT",
            "CORR",
            "CORRESPONDING",
            "COUNT",
            "COVAR_POP",
            "COVAR_SAMP",
            "CREATE",
            "CROSS",
            "CUBE",
            "CUME_DIST",
            "CURRENT",
            "CURRENT_CATALOG",
            "CURRENT_DATE",
            "CURRENT_DEFAULT_TRANSFORM_GROUP",
            "CURRENT_PATH",
            "CURRENT_ROLE",
            "CURRENT_SCHEMA",
            "CURRENT_TIME",
            "CURRENT_TIMESTAMP",
            "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
            "CURRENT_USER",
            "CURSOR",
            "CYCLE",
            "DATE",
            "DAY",
            "DEALLOCATE",
            "DEC",
            "DECIMAL",
            "DECLARE",
            "DEFAULT",
            "DELETE",
            "DENSE_RANK",
            "DEREF",
            "DESCRIBE",
            "DETERMINISTIC",
            "DISCONNECT",
            "DISTINCT",
            "DOUBLE",
            "DROP",
            "DYNAMIC",
            "EACH",
            "ELEMENT",
            "ELSE",
            "END-EXEC",
            "ESCAPE",
            "EVERY",
            "EXCEPT",
            "EXEC",
            "EXECUTE",
            "EXISTS",
            "EXP",
            "EXTERNAL",
            "EXTRACT",
            "FALSE",
            "FETCH",
            "FILTER",
            "FLOAT",
            "FLOOR",
            "FOR",
            "FOREIGN",
            "FREE",
            "FROM",
            "FULL",
            "FUNCTION",
            "FUSION",
            "GET",
            "GLOBAL",
            "GRANT",
            "GROUP",
            "GROUPING",
            "HAVING",
            "HOLD",
            "HOUR",
            "IDENTITY",
            "IN",
            "INDICATOR",
            "INNER",
            "INOUT",
            "INSENSITIVE",
            "INSERT",
            "INT",
            "INTEGER",
            "INTERSECT",
            "INTERSECTION",
            "INTERVAL",
            "INTO",
            "IS",
            "JOIN",
            "LANGUAGE",
            "LARGE",
            "LATERAL",
            "LEADING",
            "LEFT",
            "LIKE",
            "LIKE_REGEX",
            "LN",
            "LOCAL",
            "LOCALTIME",
            "LOCALTIMESTAMP",
            "LOWER",
            "MATCH",
            "MAX",
            "MEMBER",
            "MERGE",
            "METHOD",
            "MIN",
            "MINUTE",
            "MOD",
            "MODIFIES",
            "MODULE",
            "MONTH",
            "MULTISET",
            "NATIONAL",
            "NATURAL",
            "NCHAR",
            "NCLOB",
            "NEW",
            "NO",
            "NONE",
            "NORMALIZE",
            "NOT",
            "NULL",
            "NULLIF",
            "NUMERIC",
            "OCTET_LENGTH",
            "OCCURRENCES_REGEX",
            "OF",
            "OLD",
            "ON DELETE",
            "ON UPDATE",
            "ONLY",
            "OPEN",
            "OR",
            "ORDER",
            "OUT",
            "OUTER",
            "OVER",
            "OVERLAPS",
            "OVERLAY",
            "PARAMETER",
            "PARTITION",
            "PERCENT_RANK",
            "PERCENTILE_CONT",
            "PERCENTILE_DISC",
            "POSITION",
            "POSITION_REGEX",
            "POWER",
            "PRECISION",
            "PREPARE",
            "PRIMARY",
            "PROCEDURE",
            "RANGE",
            "RANK",
            "READS",
            "REAL",
            "RECURSIVE",
            "REF",
            "REFERENCES",
            "REFERENCING",
            "REGR_AVGX",
            "REGR_AVGY",
            "REGR_COUNT",
            "REGR_INTERCEPT",
            "REGR_R2",
            "REGR_SLOPE",
            "REGR_SXX",
            "REGR_SXY",
            "REGR_SYY",
            "RELEASE",
            "RESULT",
            "RETURN",
            "RETURNS",
            "REVOKE",
            "RIGHT",
            "ROLLBACK",
            "ROLLUP",
            "ROW",
            "ROW_NUMBER",
            "ROWS",
            "SAVEPOINT",
            "SCOPE",
            "SCROLL",
            "SEARCH",
            "SECOND",
            "SELECT",
            "SENSITIVE",
            "SESSION_USER",
            "SET",
            "SIMILAR",
            "SMALLINT",
            "SOME",
            "SPECIFIC",
            "SPECIFICTYPE",
            "SQL",
            "SQLEXCEPTION",
            "SQLSTATE",
            "SQLWARNING",
            "SQRT",
            "START",
            "STATIC",
            "STDDEV_POP",
            "STDDEV_SAMP",
            "SUBMULTISET",
            "SUBSTRING",
            "SUBSTRING_REGEX",
            "SUM",
            "SYMMETRIC",
            "SYSTEM",
            "SYSTEM_USER",
            "TABLE",
            "TABLESAMPLE",
            "THEN",
            "TIME",
            "TIMESTAMP",
            "TIMEZONE_HOUR",
            "TIMEZONE_MINUTE",
            "TO",
            "TRAILING",
            "TRANSLATE",
            "TRANSLATE_REGEX",
            "TRANSLATION",
            "TREAT",
            "TRIGGER",
            "TRIM",
            "TRUE",
            "UESCAPE",
            "UNION",
            "UNIQUE",
            "UNKNOWN",
            "UNNEST",
            "UPDATE",
            "UPPER",
            "USER",
            "USING",
            "VALUE",
            "VALUES",
            "VAR_POP",
            "VAR_SAMP",
            "VARBINARY",
            "VARCHAR",
            "VARYING",
            "WHEN",
            "WHENEVER",
            "WHERE",
            "WIDTH_BUCKET",
            "WINDOW",
            "WITHIN",
            "WITHOUT",
            "YEAR",
          ]; // https://www.sqlite.org/lang_keywords.html <- minus those keywords already defined somewhere else in the standard

          var nonStandardSqliteReservedWords = [
            "ABORT",
            "ACTION",
            "AFTER",
            "ALWAYS",
            "ANALYZE",
            "ASC",
            "ATTACH",
            "AUTOINCREMENT",
            "BEFORE",
            "CASCADE",
            "CONFLICT",
            "DATABASE",
            "DEFERRABLE",
            "DEFERRED",
            "DESC",
            "DETACH",
            "DO",
            "EXCLUDE",
            "EXCLUSIVE",
            "EXPLAIN",
            "FAIL",
            "FIRST",
            "FOLLOWING",
            "GENERATED",
            "GLOB",
            "GROUPS",
            "IF",
            "IGNORE",
            "IMMEDIATE",
            "INDEX",
            "INDEXED",
            "INITIALLY",
            "INSTEAD",
            "ISNULL",
            "KEY",
            "LAST",
            "MATERIALIZED",
            "NOTHING",
            "NOTNULL",
            "NULLS",
            "OTHERS",
            "PLAN",
            "PRAGMA",
            "PRECEDING",
            "QUERY",
            "RAISE",
            "REGEXP",
            "REINDEX",
            "RENAME",
            "REPLACE",
            "RESTRICT",
            "RETURNING",
            "TEMP",
            "TEMPORARY",
            "TIES",
            "TRANSACTION",
            "UNBOUNDED",
            "VACUUM",
            "VIEW",
            "VIRTUAL",
          ];
          var reservedCommands = [
            "ADD",
            "ALTER COLUMN",
            "ALTER TABLE",
            "CREATE TABLE",
            "DROP TABLE",
            "DELETE",
            "DELETE FROM",
            "FETCH FIRST",
            "FETCH NEXT",
            "FETCH PRIOR",
            "FETCH LAST",
            "FETCH ABSOLUTE",
            "FETCH RELATIVE",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "SET SCHEMA",
            "SET",
            "UPDATE",
            "VALUES",
            "WHERE",
            "WITH",
          ];
          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT", // joins - https://www.sqlite.org/syntax/join-operator.html
            "JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "INNER JOIN",
            "CROSS JOIN",
            "NATURAL JOIN",
            "NATURAL LEFT JOIN",
            "NATURAL LEFT OUTER JOIN",
            "NATURAL INNER JOIN",
            "NATURAL CROSS JOIN",
          ];
          var reservedDependentClauses = ["WHEN", "ELSE"];

          var SqliteFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(SqliteFormatter, _Formatter);

            var _super = _createSuper(SqliteFormatter);

            function SqliteFormatter() {
              _classCallCheck(this, SqliteFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(SqliteFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    // https://www.sqlite.org/lang_keywords.html
                    reservedKeywords: [].concat(
                      standardReservedWords,
                      nonStandardSqliteReservedWords,
                    ),
                    stringTypes: SqliteFormatter.stringTypes,
                    // https://www.sqlite.org/lang_expr.html#parameters
                    indexedPlaceholderTypes: ["?"],
                    namedPlaceholderTypes: [":", "@", "$"],
                    operators: SqliteFormatter.operators,
                  });
                },
              },
            ]);

            return SqliteFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          SqliteFormatter.stringTypes = ['""', "''", "``", "[]"]; // https://www.sqlite.org/lang_expr.html

          SqliteFormatter.operators = ["||", "<<", ">>", "==", "!="];

          /***/
        },

      /***/ "./src/languages/tsql.formatter.ts":
        /*!*****************************************!*\
  !*** ./src/languages/tsql.formatter.ts ***!
  \*****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ default: () => /* binding */ TSqlFormatter,
            /* harmony export */
          });
          /* harmony import */ var src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/core/Formatter */ "./src/core/Formatter.ts",
            );
          /* harmony import */ var src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/core/Tokenizer */ "./src/core/Tokenizer.ts",
            );
          /* harmony import */ var src_utils__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(/*! src/utils */ "./src/utils.ts");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          /**
           * Priority 5 (last)
           * Full list of reserved functions
           * distinct from Keywords due to interaction with parentheses
           */
          // https://docs.microsoft.com/en-us/sql/t-sql/functions/functions?view=sql-server-ver15

          var reservedFunctions = {
            aggregate: [
              "APPROX_COUNT_DISTINCT",
              "AVG",
              "CHECKSUM_AGG",
              "COUNT",
              "COUNT_BIG",
              "GROUPING",
              "GROUPING_ID",
              "MAX",
              "MIN",
              "STDEV",
              "STDEVP",
              "SUM",
              "VAR",
              "VARP",
            ],
            analytic: [
              "CUME_DIST",
              "FIRST_VALUE",
              "LAG",
              "LAST_VALUE",
              "LEAD",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "PERCENT_RANK",
              "Collation - COLLATIONPROPERTY",
              "Collation - TERTIARY_WEIGHTS",
            ],
            configuration: [
              "@@DBTS",
              "@@LANGID",
              "@@LANGUAGE",
              "@@LOCK_TIMEOUT",
              "@@MAX_CONNECTIONS",
              "@@MAX_PRECISION",
              "@@NESTLEVEL",
              "@@OPTIONS",
              "@@REMSERVER",
              "@@SERVERNAME",
              "@@SERVICENAME",
              "@@SPID",
              "@@TEXTSIZE",
              "@@VERSION",
            ],
            conversion: [
              "CAST",
              "CONVERT",
              "PARSE",
              "TRY_CAST",
              "TRY_CONVERT",
              "TRY_PARSE",
            ],
            cryptographic: [
              "ASYMKEY_ID",
              "ASYMKEYPROPERTY",
              "CERTPROPERTY",
              "CERT_ID",
              "CRYPT_GEN_RANDOM",
              "DECRYPTBYASYMKEY",
              "DECRYPTBYCERT",
              "DECRYPTBYKEY",
              "DECRYPTBYKEYAUTOASYMKEY",
              "DECRYPTBYKEYAUTOCERT",
              "DECRYPTBYPASSPHRASE",
              "ENCRYPTBYASYMKEY",
              "ENCRYPTBYCERT",
              "ENCRYPTBYKEY",
              "ENCRYPTBYPASSPHRASE",
              "HASHBYTES",
              "IS_OBJECTSIGNED",
              "KEY_GUID",
              "KEY_ID",
              "KEY_NAME",
              "SIGNBYASYMKEY",
              "SIGNBYCERT",
              "SYMKEYPROPERTY",
              "VERIFYSIGNEDBYCERT",
              "VERIFYSIGNEDBYASYMKEY",
            ],
            cursor: ["@@CURSOR_ROWS", "@@FETCH_STATUS", "CURSOR_STATUS"],
            dataType: [
              "DATALENGTH",
              "IDENT_CURRENT",
              "IDENT_INCR",
              "IDENT_SEED",
              "IDENTITY",
              "SQL_VARIANT_PROPERTY",
            ],
            datetime: [
              "@@DATEFIRST",
              "CURRENT_TIMESTAMP",
              "CURRENT_TIMEZONE",
              "CURRENT_TIMEZONE_ID",
              "DATEADD",
              "DATEDIFF",
              "DATEDIFF_BIG",
              "DATEFROMPARTS",
              "DATENAME",
              "DATEPART",
              "DATETIME2FROMPARTS",
              "DATETIMEFROMPARTS",
              "DATETIMEOFFSETFROMPARTS",
              "DAY",
              "EOMONTH",
              "GETDATE",
              "GETUTCDATE",
              "ISDATE",
              "MONTH",
              "SMALLDATETIMEFROMPARTS",
              "SWITCHOFFSET",
              "SYSDATETIME",
              "SYSDATETIMEOFFSET",
              "SYSUTCDATETIME",
              "TIMEFROMPARTS",
              "TODATETIMEOFFSET",
              "YEAR",
              "JSON",
              "ISJSON",
              "JSON_VALUE",
              "JSON_QUERY",
              "JSON_MODIFY",
            ],
            mathematical: [
              "ABS",
              "ACOS",
              "ASIN",
              "ATAN",
              "ATN2",
              "CEILING",
              "COS",
              "COT",
              "DEGREES",
              "EXP",
              "FLOOR",
              "LOG",
              "LOG10",
              "PI",
              "POWER",
              "RADIANS",
              "RAND",
              "ROUND",
              "SIGN",
              "SIN",
              "SQRT",
              "SQUARE",
              "TAN",
              "CHOOSE",
              "GREATEST",
              "IIF",
              "LEAST",
            ],
            metadata: [
              "@@PROCID",
              "APP_NAME",
              "APPLOCK_MODE",
              "APPLOCK_TEST",
              "ASSEMBLYPROPERTY",
              "COL_LENGTH",
              "COL_NAME",
              "COLUMNPROPERTY",
              "DATABASEPROPERTYEX",
              "DB_ID",
              "DB_NAME",
              "FILE_ID",
              "FILE_IDEX",
              "FILE_NAME",
              "FILEGROUP_ID",
              "FILEGROUP_NAME",
              "FILEGROUPPROPERTY",
              "FILEPROPERTY",
              "FILEPROPERTYEX",
              "FULLTEXTCATALOGPROPERTY",
              "FULLTEXTSERVICEPROPERTY",
              "INDEX_COL",
              "INDEXKEY_PROPERTY",
              "INDEXPROPERTY",
              "NEXT VALUE FOR",
              "OBJECT_DEFINITION",
              "OBJECT_ID",
              "OBJECT_NAME",
              "OBJECT_SCHEMA_NAME",
              "OBJECTPROPERTY",
              "OBJECTPROPERTYEX",
              "ORIGINAL_DB_NAME",
              "PARSENAME",
              "SCHEMA_ID",
              "SCHEMA_NAME",
              "SCOPE_IDENTITY",
              "SERVERPROPERTY",
              "STATS_DATE",
              "TYPE_ID",
              "TYPE_NAME",
              "TYPEPROPERTY",
            ],
            ranking: [
              "DENSE_RANK",
              "NTILE",
              "RANK",
              "ROW_NUMBER",
              "PUBLISHINGSERVERNAME",
            ],
            security: [
              "CERTENCODED",
              "CERTPRIVATEKEY",
              "CURRENT_USER",
              "DATABASE_PRINCIPAL_ID",
              "HAS_DBACCESS",
              "HAS_PERMS_BY_NAME",
              "IS_MEMBER",
              "IS_ROLEMEMBER",
              "IS_SRVROLEMEMBER",
              "LOGINPROPERTY",
              "ORIGINAL_LOGIN",
              "PERMISSIONS",
              "PWDENCRYPT",
              "PWDCOMPARE",
              "SESSION_USER",
              "SESSIONPROPERTY",
              "SUSER_ID",
              "SUSER_NAME",
              "SUSER_SID",
              "SUSER_SNAME",
              "SYSTEM_USER",
              "USER",
              "USER_ID",
              "USER_NAME",
            ],
            string: [
              "ASCII",
              "CHAR",
              "CHARINDEX",
              "CONCAT",
              "CONCAT_WS",
              "DIFFERENCE",
              "FORMAT",
              "LEFT",
              "LEN",
              "LOWER",
              "LTRIM",
              "NCHAR",
              "PATINDEX",
              "QUOTENAME",
              "REPLACE",
              "REPLICATE",
              "REVERSE",
              "RIGHT",
              "RTRIM",
              "SOUNDEX",
              "SPACE",
              "STR",
              "STRING_AGG",
              "STRING_ESCAPE",
              "STUFF",
              "SUBSTRING",
              "TRANSLATE",
              "TRIM",
              "UNICODE",
              "UPPER",
            ],
            system: [
              "$PARTITION",
              "@@ERROR",
              "@@IDENTITY",
              "@@PACK_RECEIVED",
              "@@ROWCOUNT",
              "@@TRANCOUNT",
              "BINARY_CHECKSUM",
              "CHECKSUM",
              "COMPRESS",
              "CONNECTIONPROPERTY",
              "CONTEXT_INFO",
              "CURRENT_REQUEST_ID",
              "CURRENT_TRANSACTION_ID",
              "DECOMPRESS",
              "ERROR_LINE",
              "ERROR_MESSAGE",
              "ERROR_NUMBER",
              "ERROR_PROCEDURE",
              "ERROR_SEVERITY",
              "ERROR_STATE",
              "FORMATMESSAGE",
              "GET_FILESTREAM_TRANSACTION_CONTEXT",
              "GETANSINULL",
              "HOST_ID",
              "HOST_NAME",
              "ISNULL",
              "ISNUMERIC",
              "MIN_ACTIVE_ROWVERSION",
              "NEWID",
              "NEWSEQUENTIALID",
              "ROWCOUNT_BIG",
              "SESSION_CONTEXT",
              "XACT_STATE",
            ],
            statistical: [
              "@@CONNECTIONS",
              "@@CPU_BUSY",
              "@@IDLE",
              "@@IO_BUSY",
              "@@PACK_SENT",
              "@@PACKET_ERRORS",
              "@@TIMETICKS",
              "@@TOTAL_ERRORS",
              "@@TOTAL_READ",
              "@@TOTAL_WRITE",
              "TEXTPTR",
              "TEXTVALID",
            ],
            trigger: [
              "COLUMNS_UPDATED",
              "EVENTDATA",
              "TRIGGER_NESTLEVEL",
              "UPDATE",
            ],
          }; // TODO: dedupe these reserved word lists
          // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql?view=sql-server-ver15

          /**
           * Priority 5 (last)
           * Full list of reserved words
           * any words that are in a higher priority are removed
           */

          var reservedKeywords = {
            standard: [
              "ADD",
              "ALL",
              "ALTER",
              "AND",
              "ANY",
              "AS",
              "ASC",
              "AUTHORIZATION",
              "BACKUP",
              "BEGIN",
              "BETWEEN",
              "BREAK",
              "BROWSE",
              "BULK",
              "BY",
              "CASCADE",
              "CHECK",
              "CHECKPOINT",
              "CLOSE",
              "CLUSTERED",
              "COALESCE",
              "COLLATE",
              "COLUMN",
              "COMMIT",
              "COMPUTE",
              "CONSTRAINT",
              "CONTAINS",
              "CONTAINSTABLE",
              "CONTINUE",
              "CONVERT",
              "CREATE",
              "CROSS",
              "CURRENT",
              "CURRENT_DATE",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "CURRENT_USER",
              "CURSOR",
              "DATABASE",
              "DBCC",
              "DEALLOCATE",
              "DECLARE",
              "DEFAULT",
              "DELETE",
              "DENY",
              "DESC",
              "DISK",
              "DISTINCT",
              "DISTRIBUTED",
              "DOUBLE",
              "DROP",
              "DUMP",
              "ERRLVL",
              "ESCAPE",
              "EXEC",
              "EXECUTE",
              "EXISTS",
              "EXIT",
              "EXTERNAL",
              "FETCH",
              "FILE",
              "FILLFACTOR",
              "FOR",
              "FOREIGN",
              "FREETEXT",
              "FREETEXTTABLE",
              "FROM",
              "FULL",
              "FUNCTION",
              "GOTO",
              "GRANT",
              "GROUP",
              "HAVING",
              "HOLDLOCK",
              "IDENTITY",
              "IDENTITYCOL",
              "IDENTITY_INSERT",
              "IF",
              "IN",
              "INDEX",
              "INNER",
              "INSERT",
              "INTERSECT",
              "INTO",
              "IS",
              "JOIN",
              "KEY",
              "KILL",
              "LEFT",
              "LIKE",
              "LINENO",
              "LOAD",
              "MERGE",
              "NATIONAL",
              "NOCHECK",
              "NONCLUSTERED",
              "NOT",
              "NULL",
              "NULLIF",
              "OF",
              "OFF",
              "OFFSETS",
              "ON DELETE",
              "ON UPDATE",
              "OPEN",
              "OPENDATASOURCE",
              "OPENQUERY",
              "OPENROWSET",
              "OPENXML",
              "OPTION",
              "OR",
              "ORDER",
              "OUTER",
              "OVER",
              "PERCENT",
              "PIVOT",
              "PLAN",
              "PRECISION",
              "PRIMARY",
              "PRINT",
              "PROC",
              "PROCEDURE",
              "PUBLIC",
              "RAISERROR",
              "READ",
              "READTEXT",
              "RECONFIGURE",
              "REFERENCES",
              "REPLICATION",
              "RESTORE",
              "RESTRICT",
              "RETURN",
              "REVERT",
              "REVOKE",
              "RIGHT",
              "ROLLBACK",
              "ROWCOUNT",
              "ROWGUIDCOL",
              "RULE",
              "SAVE",
              "SCHEMA",
              "SECURITYAUDIT",
              "SELECT",
              "SEMANTICKEYPHRASETABLE",
              "SEMANTICSIMILARITYDETAILSTABLE",
              "SEMANTICSIMILARITYTABLE",
              "SESSION_USER",
              "SET",
              "SETUSER",
              "SHUTDOWN",
              "SOME",
              "STATISTICS",
              "SYSTEM_USER",
              "TABLE",
              "TABLESAMPLE",
              "TEXTSIZE",
              "THEN",
              "TO",
              "TOP",
              "TRAN",
              "TRANSACTION",
              "TRIGGER",
              "TRUNCATE",
              "TRY_CONVERT",
              "TSEQUAL",
              "UNION",
              "UNIQUE",
              "UNPIVOT",
              "UPDATE",
              "UPDATETEXT",
              "USE",
              "USER",
              "VALUES",
              "VARYING",
              "VIEW",
              "WAITFOR",
              "WHERE",
              "WHILE",
              "WITH",
              "WITHIN GROUP",
              "WRITETEXT",
            ],
            odbc: [
              "ABSOLUTE",
              "ACTION",
              "ADA",
              "ADD",
              "ALL",
              "ALLOCATE",
              "ALTER",
              "AND",
              "ANY",
              "ARE",
              "AS",
              "ASC",
              "ASSERTION",
              "AT",
              "AUTHORIZATION",
              "AVG",
              "BEGIN",
              "BETWEEN",
              "BIT",
              "BIT_LENGTH",
              "BOTH",
              "BY",
              "CASCADE",
              "CASCADED",
              "CAST",
              "CATALOG",
              "CHAR",
              "CHARACTER",
              "CHARACTER_LENGTH",
              "CHAR_LENGTH",
              "CHECK",
              "CLOSE",
              "COALESCE",
              "COLLATE",
              "COLLATION",
              "COLUMN",
              "COMMIT",
              "CONNECT",
              "CONNECTION",
              "CONSTRAINT",
              "CONSTRAINTS",
              "CONTINUE",
              "CONVERT",
              "CORRESPONDING",
              "COUNT",
              "CREATE",
              "CROSS",
              "CURRENT",
              "CURRENT_DATE",
              "CURRENT_TIME",
              "CURRENT_TIMESTAMP",
              "CURRENT_USER",
              "CURSOR",
              "DATE",
              "DAY",
              "DEALLOCATE",
              "DEC",
              "DECIMAL",
              "DECLARE",
              "DEFAULT",
              "DEFERRABLE",
              "DEFERRED",
              "DELETE",
              "DESC",
              "DESCRIBE",
              "DESCRIPTOR",
              "DIAGNOSTICS",
              "DISCONNECT",
              "DISTINCT",
              "DOMAIN",
              "DOUBLE",
              "DROP",
              "END-EXEC",
              "ESCAPE",
              "EXCEPTION",
              "EXEC",
              "EXECUTE",
              "EXISTS",
              "EXTERNAL",
              "EXTRACT",
              "FALSE",
              "FETCH",
              "FIRST",
              "FLOAT",
              "FOR",
              "FOREIGN",
              "FORTRAN",
              "FOUND",
              "FROM",
              "FULL",
              "GET",
              "GLOBAL",
              "GO",
              "GOTO",
              "GRANT",
              "GROUP",
              "HAVING",
              "HOUR",
              "IDENTITY",
              "IMMEDIATE",
              "IN",
              "INCLUDE",
              "INDEX",
              "INDICATOR",
              "INITIALLY",
              "INNER",
              "INPUT",
              "INSENSITIVE",
              "INSERT",
              "INT",
              "INTEGER",
              "INTERSECT",
              "INTERVAL",
              "INTO",
              "IS",
              "ISOLATION",
              "JOIN",
              "KEY",
              "LANGUAGE",
              "LAST",
              "LEADING",
              "LEFT",
              "LEVEL",
              "LIKE",
              "LOCAL",
              "LOWER",
              "MATCH",
              "MAX",
              "MIN",
              "MINUTE",
              "MODULE",
              "MONTH",
              "NAMES",
              "NATIONAL",
              "NATURAL",
              "NCHAR",
              "NEXT",
              "NO",
              "NONE",
              "NOT",
              "NULL",
              "NULLIF",
              "NUMERIC",
              "OCTET_LENGTH",
              "OF",
              "ONLY",
              "OPEN",
              "OPTION",
              "OR",
              "ORDER",
              "OUTER",
              "OUTPUT",
              "OVERLAPS",
              "PAD",
              "PARTIAL",
              "PASCAL",
              "POSITION",
              "PRECISION",
              "PREPARE",
              "PRESERVE",
              "PRIMARY",
              "PRIOR",
              "PRIVILEGES",
              "PROCEDURE",
              "PUBLIC",
              "READ",
              "REAL",
              "REFERENCES",
              "RELATIVE",
              "RESTRICT",
              "REVOKE",
              "RIGHT",
              "ROLLBACK",
              "ROWS",
              "SCHEMA",
              "SCROLL",
              "SECOND",
              "SECTION",
              "SELECT",
              "SESSION",
              "SESSION_USER",
              "SET",
              "SIZE",
              "SMALLINT",
              "SOME",
              "SPACE",
              "SQL",
              "SQLCA",
              "SQLCODE",
              "SQLERROR",
              "SQLSTATE",
              "SQLWARNING",
              "SUBSTRING",
              "SUM",
              "SYSTEM_USER",
              "TABLE",
              "TEMPORARY",
              "TIME",
              "TIMESTAMP",
              "TIMEZONE_HOUR",
              "TIMEZONE_MINUTE",
              "TO",
              "TRAILING",
              "TRANSACTION",
              "TRANSLATE",
              "TRANSLATION",
              "TRIM",
              "TRUE",
              "UNION",
              "UNIQUE",
              "UNKNOWN",
              "UPDATE",
              "UPPER",
              "USAGE",
              "USER",
              "VALUE",
              "VALUES",
              "VARCHAR",
              "VARYING",
              "VIEW",
              "WHENEVER",
              "WHERE",
              "WITH",
              "WORK",
              "WRITE",
              "YEAR",
              "ZONE",
            ],
            future: [
              "ABSOLUTE",
              "ACTION",
              "ADMIN",
              "AFTER",
              "AGGREGATE",
              "ALIAS",
              "ALLOCATE",
              "ARE",
              "ARRAY",
              "ASENSITIVE",
              "ASSERTION",
              "ASYMMETRIC",
              "AT",
              "ATOMIC",
              "BEFORE",
              "BINARY",
              "BIT",
              "BLOB",
              "BOOLEAN",
              "BOTH",
              "BREADTH",
              "CALL",
              "CALLED",
              "CARDINALITY",
              "CASCADED",
              "CAST",
              "CATALOG",
              "CHAR",
              "CHARACTER",
              "CLASS",
              "CLOB",
              "COLLATION",
              "COLLECT",
              "COMPLETION",
              "CONDITION",
              "CONNECT",
              "CONNECTION",
              "CONSTRAINTS",
              "CONSTRUCTOR",
              "CORR",
              "CORRESPONDING",
              "COVAR_POP",
              "COVAR_SAMP",
              "CUBE",
              "CUME_DIST",
              "CURRENT_CATALOG",
              "CURRENT_DEFAULT_TRANSFORM_GROUP",
              "CURRENT_PATH",
              "CURRENT_ROLE",
              "CURRENT_SCHEMA",
              "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
              "CYCLE",
              "DATA",
              "DATE",
              "DAY",
              "DEC",
              "DECIMAL",
              "DEFERRABLE",
              "DEFERRED",
              "DEPTH",
              "DEREF",
              "DESCRIBE",
              "DESCRIPTOR",
              "DESTROY",
              "DESTRUCTOR",
              "DETERMINISTIC",
              "DIAGNOSTICS",
              "DICTIONARY",
              "DISCONNECT",
              "DOMAIN",
              "DYNAMIC",
              "EACH",
              "ELEMENT",
              "END-EXEC",
              "EQUALS",
              "EVERY",
              "FALSE",
              "FILTER",
              "FIRST",
              "FLOAT",
              "FOUND",
              "FREE",
              "FULLTEXTTABLE",
              "FUSION",
              "GENERAL",
              "GET",
              "GLOBAL",
              "GO",
              "GROUPING",
              "HOLD",
              "HOST",
              "HOUR",
              "IGNORE",
              "IMMEDIATE",
              "INDICATOR",
              "INITIALIZE",
              "INITIALLY",
              "INOUT",
              "INPUT",
              "INT",
              "INTEGER",
              "INTERSECTION",
              "INTERVAL",
              "ISOLATION",
              "ITERATE",
              "LANGUAGE",
              "LARGE",
              "LAST",
              "LATERAL",
              "LEADING",
              "LESS",
              "LEVEL",
              "LIKE_REGEX",
              "LIMIT",
              "LN",
              "LOCAL",
              "LOCALTIME",
              "LOCALTIMESTAMP",
              "LOCATOR",
              "MAP",
              "MATCH",
              "MEMBER",
              "METHOD",
              "MINUTE",
              "MOD",
              "MODIFIES",
              "MODIFY",
              "MODULE",
              "MONTH",
              "MULTISET",
              "NAMES",
              "NATURAL",
              "NCHAR",
              "NCLOB",
              "NEW",
              "NEXT",
              "NO",
              "NONE",
              "NORMALIZE",
              "NUMERIC",
              "OBJECT",
              "OCCURRENCES_REGEX",
              "OLD",
              "ONLY",
              "OPERATION",
              "ORDINALITY",
              "OUT",
              "OUTPUT",
              "OVERLAY",
              "PAD",
              "PARAMETER",
              "PARAMETERS",
              "PARTIAL",
              "PARTITION",
              "PATH",
              "PERCENTILE_CONT",
              "PERCENTILE_DISC",
              "PERCENT_RANK",
              "POSITION_REGEX",
              "POSTFIX",
              "PREFIX",
              "PREORDER",
              "PREPARE",
              "PRESERVE",
              "PRIOR",
              "PRIVILEGES",
              "RANGE",
              "READS",
              "REAL",
              "RECURSIVE",
              "REF",
              "REFERENCING",
              "REGR_AVGX",
              "REGR_AVGY",
              "REGR_COUNT",
              "REGR_INTERCEPT",
              "REGR_R2",
              "REGR_SLOPE",
              "REGR_SXX",
              "REGR_SXY",
              "REGR_SYY",
              "RELATIVE",
              "RELEASE",
              "RESULT",
              "RETURNS",
              "ROLE",
              "ROLLUP",
              "ROUTINE",
              "ROW",
              "ROWS",
              "SAVEPOINT",
              "SCOPE",
              "SCROLL",
              "SEARCH",
              "SECOND",
              "SECTION",
              "SENSITIVE",
              "SEQUENCE",
              "SESSION",
              "SETS",
              "SIMILAR",
              "SIZE",
              "SMALLINT",
              "SPACE",
              "SPECIFIC",
              "SPECIFICTYPE",
              "SQL",
              "SQLEXCEPTION",
              "SQLSTATE",
              "SQLWARNING",
              "START",
              "STATE",
              "STATEMENT",
              "STATIC",
              "STDDEV_POP",
              "STDDEV_SAMP",
              "STRUCTURE",
              "SUBMULTISET",
              "SUBSTRING_REGEX",
              "SYMMETRIC",
              "SYSTEM",
              "TEMPORARY",
              "TERMINATE",
              "THAN",
              "TIME",
              "TIMESTAMP",
              "TIMEZONE_HOUR",
              "TIMEZONE_MINUTE",
              "TRAILING",
              "TRANSLATE_REGEX",
              "TRANSLATION",
              "TREAT",
              "TRUE",
              "UESCAPE",
              "UNDER",
              "UNKNOWN",
              "UNNEST",
              "USAGE",
              "USING",
              "VALUE",
              "VARCHAR",
              "VARIABLE",
              "VAR_POP",
              "VAR_SAMP",
              "WHENEVER",
              "WIDTH_BUCKET",
              "WINDOW",
              "WITHIN",
              "WITHOUT",
              "WORK",
              "WRITE",
              "XMLAGG",
              "XMLATTRIBUTES",
              "XMLBINARY",
              "XMLCAST",
              "XMLCOMMENT",
              "XMLCONCAT",
              "XMLDOCUMENT",
              "XMLELEMENT",
              "XMLEXISTS",
              "XMLFOREST",
              "XMLITERATE",
              "XMLNAMESPACES",
              "XMLPARSE",
              "XMLPI",
              "XMLQUERY",
              "XMLSERIALIZE",
              "XMLTABLE",
              "XMLTEXT",
              "XMLVALIDATE",
              "YEAR",
              "ZONE",
            ],
          };
          /**
           * Priority 1 (first)
           * keywords that begin a new statement
           * will begin new indented block
           */
          // https://docs.microsoft.com/en-us/sql/t-sql/statements/statements?view=sql-server-ver15

          var reservedCommands = [
            "ADD SENSITIVITY CLASSIFICATION",
            "ADD SIGNATURE",
            "AGGREGATE",
            "ANSI_DEFAULTS",
            "ANSI_NULLS",
            "ANSI_NULL_DFLT_OFF",
            "ANSI_NULL_DFLT_ON",
            "ANSI_PADDING",
            "ANSI_WARNINGS",
            "APPLICATION ROLE",
            "ARITHABORT",
            "ARITHIGNORE",
            "ASSEMBLY",
            "ASYMMETRIC KEY",
            "AUTHORIZATION",
            "AVAILABILITY GROUP",
            "BACKUP",
            "BACKUP CERTIFICATE",
            "BACKUP MASTER KEY",
            "BACKUP SERVICE MASTER KEY",
            "BEGIN CONVERSATION TIMER",
            "BEGIN DIALOG CONVERSATION",
            "BROKER PRIORITY",
            "BULK INSERT",
            "CERTIFICATE",
            "CLOSE MASTER KEY",
            "CLOSE SYMMETRIC KEY",
            "COLLATE",
            "COLUMN ENCRYPTION KEY",
            "COLUMN MASTER KEY",
            "COLUMNSTORE INDEX",
            "CONCAT_NULL_YIELDS_NULL",
            "CONTEXT_INFO",
            "CONTRACT",
            "CREDENTIAL",
            "CRYPTOGRAPHIC PROVIDER",
            "CURSOR_CLOSE_ON_COMMIT",
            "DATABASE",
            "DATABASE AUDIT SPECIFICATION",
            "DATABASE ENCRYPTION KEY",
            "DATABASE HADR",
            "DATABASE SCOPED CONFIGURATION",
            "DATABASE SCOPED CREDENTIAL",
            "DATABASE SET",
            "DATEFIRST",
            "DATEFORMAT",
            "DEADLOCK_PRIORITY",
            "DEFAULT",
            "DELETE",
            "DELETE FROM",
            "DENY",
            "DENY XML",
            "DISABLE TRIGGER",
            "ENABLE TRIGGER",
            "END CONVERSATION",
            "ENDPOINT",
            "EVENT NOTIFICATION",
            "EVENT SESSION",
            "EXECUTE AS",
            "EXTERNAL DATA SOURCE",
            "EXTERNAL FILE FORMAT",
            "EXTERNAL LANGUAGE",
            "EXTERNAL LIBRARY",
            "EXTERNAL RESOURCE POOL",
            "EXTERNAL TABLE",
            "FIPS_FLAGGER",
            "FMTONLY",
            "FORCEPLAN",
            "FULLTEXT CATALOG",
            "FULLTEXT INDEX",
            "FULLTEXT STOPLIST",
            "FUNCTION",
            "GET CONVERSATION GROUP",
            "GET_TRANSMISSION_STATUS",
            "GRANT",
            "GRANT XML",
            "IDENTITY_INSERT",
            "IMPLICIT_TRANSACTIONS",
            "INDEX",
            "INSERT",
            "LANGUAGE",
            "LOCK_TIMEOUT",
            "LOGIN",
            "MASTER KEY",
            "MERGE",
            "MESSAGE TYPE",
            "MOVE CONVERSATION",
            "NOCOUNT",
            "NOEXEC",
            "NUMERIC_ROUNDABORT",
            "OFFSETS",
            "OPEN MASTER KEY",
            "OPEN SYMMETRIC KEY",
            "PARSEONLY",
            "PARTITION FUNCTION",
            "PARTITION SCHEME",
            "PROCEDURE",
            "QUERY_GOVERNOR_COST_LIMIT",
            "QUEUE",
            "QUOTED_IDENTIFIER",
            "RECEIVE",
            "REMOTE SERVICE BINDING",
            "REMOTE_PROC_TRANSACTIONS",
            "RESOURCE GOVERNOR",
            "RESOURCE POOL",
            "RESTORE",
            "RESTORE FILELISTONLY",
            "RESTORE HEADERONLY",
            "RESTORE LABELONLY",
            "RESTORE MASTER KEY",
            "RESTORE REWINDONLY",
            "RESTORE SERVICE MASTER KEY",
            "RESTORE VERIFYONLY",
            "REVERT",
            "REVOKE",
            "REVOKE XML",
            "ROLE",
            "ROUTE",
            "ROWCOUNT",
            "RULE",
            "SCHEMA",
            "SEARCH PROPERTY LIST",
            "SECURITY POLICY",
            "SELECTIVE XML INDEX",
            "SEND",
            "SENSITIVITY CLASSIFICATION",
            "SEQUENCE",
            "SERVER AUDIT",
            "SERVER AUDIT SPECIFICATION",
            "SERVER CONFIGURATION",
            "SERVER ROLE",
            "SERVICE",
            "SERVICE MASTER KEY",
            "SET",
            "SETUSER",
            "SHOWPLAN_ALL",
            "SHOWPLAN_TEXT",
            "SHOWPLAN_XML",
            "SIGNATURE",
            "SPATIAL INDEX",
            "STATISTICS",
            "STATISTICS IO",
            "STATISTICS PROFILE",
            "STATISTICS TIME",
            "STATISTICS XML",
            "SYMMETRIC KEY",
            "SYNONYM",
            "TABLE",
            "TABLE IDENTITY",
            "TEXTSIZE",
            "TRANSACTION ISOLATION LEVEL",
            "TRIGGER",
            "TRUNCATE TABLE",
            "TYPE",
            "UPDATE",
            "UPDATE STATISTICS",
            "USER",
            "VIEW",
            "WORKLOAD GROUP",
            "XACT_ABORT",
            "XML INDEX",
            "XML SCHEMA COLLECTION", // other
            "ALTER COLUMN",
            "ALTER TABLE",
            "CREATE TABLE",
            "FROM",
            "GROUP BY",
            "HAVING",
            "INSERT INTO",
            "DROP TABLE",
            "SET SCHEMA",
            "LIMIT",
            "OFFSET",
            "ORDER BY",
            "SELECT",
            "VALUES",
            "WHERE",
            "WITH",
          ];
          /**
           * Priority 2
           * commands that operate on two tables or subqueries
           * two main categories: joins and boolean set operators
           */

          var reservedBinaryCommands = [
            // set booleans
            "INTERSECT",
            "INTERSECT ALL",
            "INTERSECT DISTINCT",
            "UNION",
            "UNION ALL",
            "UNION DISTINCT",
            "EXCEPT",
            "EXCEPT ALL",
            "EXCEPT DISTINCT",
            "MINUS",
            "MINUS ALL",
            "MINUS DISTINCT", // joins
            "JOIN",
            "INNER JOIN",
            "LEFT JOIN",
            "LEFT OUTER JOIN",
            "RIGHT JOIN",
            "RIGHT OUTER JOIN",
            "FULL JOIN",
            "FULL OUTER JOIN",
            "CROSS JOIN",
          ];
          /**
           * Priority 3
           * keywords that follow a previous Statement, must be attached to subsequent data
           * can be fully inline or on newline with optional indent
           */

          var reservedDependentClauses = ["WHEN", "ELSE"]; // https://docs.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver15

          var TSqlFormatter = /*#__PURE__*/ (function (_Formatter) {
            _inherits(TSqlFormatter, _Formatter);

            var _super = _createSuper(TSqlFormatter);

            function TSqlFormatter() {
              _classCallCheck(this, TSqlFormatter);

              return _super.apply(this, arguments);
            }

            _createClass(TSqlFormatter, [
              {
                key: "tokenizer",
                value: function tokenizer() {
                  return new src_core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__[
                    "default"
                  ]({
                    reservedCommands: reservedCommands,
                    reservedBinaryCommands: reservedBinaryCommands,
                    reservedDependentClauses: reservedDependentClauses,
                    reservedKeywords: (0,
                    src_utils__WEBPACK_IMPORTED_MODULE_2__.dedupe)(
                      [].concat(
                        _toConsumableArray(
                          Object.values(reservedFunctions).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                        _toConsumableArray(
                          Object.values(reservedKeywords).reduce(function (
                            acc,
                            arr,
                          ) {
                            return [].concat(
                              _toConsumableArray(acc),
                              _toConsumableArray(arr),
                            );
                          }, []),
                        ),
                      ),
                    ),
                    stringTypes: TSqlFormatter.stringTypes,
                    namedPlaceholderTypes: ["@"],
                    specialWordChars: {
                      any: "#@",
                    },
                    operators: TSqlFormatter.operators, // TODO: Support for money constants
                  });
                },
              },
            ]);

            return TSqlFormatter;
          })(src_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);

          TSqlFormatter.stringTypes = ['""', "N''", "''", "[]", "``"];
          TSqlFormatter.operators = [
            "!<",
            "!>",
            "+=",
            "-=",
            "*=",
            "/=",
            "%=",
            "|=",
            "&=",
            "^=",
            "::",
          ];

          /***/
        },

      /***/ "./src/sqlFormatter.ts":
        /*!*****************************!*\
  !*** ./src/sqlFormatter.ts ***!
  \*****************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ ConfigError: () => /* binding */ ConfigError,
            /* harmony export */ format: () => /* binding */ format,
            /* harmony export */ formatters: () => /* binding */ formatters,
            /* harmony export */ supportedDialects: () =>
              /* binding */ supportedDialects,
            /* harmony export */
          });
          /* harmony import */ var src_languages_bigquery_formatter__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              /*! src/languages/bigquery.formatter */ "./src/languages/bigquery.formatter.ts",
            );
          /* harmony import */ var src_languages_db2_formatter__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              /*! src/languages/db2.formatter */ "./src/languages/db2.formatter.ts",
            );
          /* harmony import */ var src_languages_hive_formatter__WEBPACK_IMPORTED_MODULE_2__ =
            __webpack_require__(
              /*! src/languages/hive.formatter */ "./src/languages/hive.formatter.ts",
            );
          /* harmony import */ var src_languages_mariadb_formatter__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(
              /*! src/languages/mariadb.formatter */ "./src/languages/mariadb.formatter.ts",
            );
          /* harmony import */ var src_languages_mysql_formatter__WEBPACK_IMPORTED_MODULE_4__ =
            __webpack_require__(
              /*! src/languages/mysql.formatter */ "./src/languages/mysql.formatter.ts",
            );
          /* harmony import */ var src_languages_n1ql_formatter__WEBPACK_IMPORTED_MODULE_5__ =
            __webpack_require__(
              /*! src/languages/n1ql.formatter */ "./src/languages/n1ql.formatter.ts",
            );
          /* harmony import */ var src_languages_plsql_formatter__WEBPACK_IMPORTED_MODULE_6__ =
            __webpack_require__(
              /*! src/languages/plsql.formatter */ "./src/languages/plsql.formatter.ts",
            );
          /* harmony import */ var src_languages_postgresql_formatter__WEBPACK_IMPORTED_MODULE_7__ =
            __webpack_require__(
              /*! src/languages/postgresql.formatter */ "./src/languages/postgresql.formatter.ts",
            );
          /* harmony import */ var src_languages_redshift_formatter__WEBPACK_IMPORTED_MODULE_8__ =
            __webpack_require__(
              /*! src/languages/redshift.formatter */ "./src/languages/redshift.formatter.ts",
            );
          /* harmony import */ var src_languages_spark_formatter__WEBPACK_IMPORTED_MODULE_9__ =
            __webpack_require__(
              /*! src/languages/spark.formatter */ "./src/languages/spark.formatter.ts",
            );
          /* harmony import */ var src_languages_sqlite_formatter__WEBPACK_IMPORTED_MODULE_10__ =
            __webpack_require__(
              /*! src/languages/sqlite.formatter */ "./src/languages/sqlite.formatter.ts",
            );
          /* harmony import */ var src_languages_sql_formatter__WEBPACK_IMPORTED_MODULE_11__ =
            __webpack_require__(
              /*! src/languages/sql.formatter */ "./src/languages/sql.formatter.ts",
            );
          /* harmony import */ var src_languages_tsql_formatter__WEBPACK_IMPORTED_MODULE_12__ =
            __webpack_require__(
              /*! src/languages/tsql.formatter */ "./src/languages/tsql.formatter.ts",
            );
          /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ =
            __webpack_require__(/*! ./utils */ "./src/utils.ts");
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
              writable: false,
            });
            return Constructor;
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError(
                "Super expression must either be null or a function",
              );
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              },
            );
            Object.defineProperty(subClass, "prototype", { writable: false });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }

          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived),
                result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === "object" || typeof call === "function")
            ) {
              return call;
            } else if (call !== void 0) {
              throw new TypeError(
                "Derived constructors may only return object or undefined",
              );
            }
            return _assertThisInitialized(self);
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            }
            return self;
          }

          function _wrapNativeSuper(Class) {
            var _cache = typeof Map === "function" ? new Map() : undefined;
            _wrapNativeSuper = function _wrapNativeSuper(Class) {
              if (Class === null || !_isNativeFunction(Class)) return Class;
              if (typeof Class !== "function") {
                throw new TypeError(
                  "Super expression must either be null or a function",
                );
              }
              if (typeof _cache !== "undefined") {
                if (_cache.has(Class)) return _cache.get(Class);
                _cache.set(Class, Wrapper);
              }
              function Wrapper() {
                return _construct(
                  Class,
                  arguments,
                  _getPrototypeOf(this).constructor,
                );
              }
              Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                  value: Wrapper,
                  enumerable: false,
                  writable: true,
                  configurable: true,
                },
              });
              return _setPrototypeOf(Wrapper, Class);
            };
            return _wrapNativeSuper(Class);
          }

          function _construct(Parent, args, Class) {
            if (_isNativeReflectConstruct()) {
              _construct = Reflect.construct;
            } else {
              _construct = function _construct(Parent, args, Class) {
                var a = [null];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a);
                var instance = new Constructor();
                if (Class) _setPrototypeOf(instance, Class.prototype);
                return instance;
              };
            }
            return _construct.apply(null, arguments);
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
              return true;
            } catch (e) {
              return false;
            }
          }

          function _isNativeFunction(fn) {
            return Function.toString.call(fn).indexOf("[native code]") !== -1;
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
            return _setPrototypeOf(o, p);
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                };
            return _getPrototypeOf(o);
          }

          function _typeof(obj) {
            "@babel/helpers - typeof";
            return (
              (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (obj) {
                      return typeof obj;
                    }
                  : function (obj) {
                      return obj &&
                        "function" == typeof Symbol &&
                        obj.constructor === Symbol &&
                        obj !== Symbol.prototype
                        ? "symbol"
                        : typeof obj;
                    }),
              _typeof(obj)
            );
          }

          var formatters = {
            bigquery:
              src_languages_bigquery_formatter__WEBPACK_IMPORTED_MODULE_0__[
                "default"
              ],
            db2: src_languages_db2_formatter__WEBPACK_IMPORTED_MODULE_1__[
              "default"
            ],
            hive: src_languages_hive_formatter__WEBPACK_IMPORTED_MODULE_2__[
              "default"
            ],
            mariadb:
              src_languages_mariadb_formatter__WEBPACK_IMPORTED_MODULE_3__[
                "default"
              ],
            mysql:
              src_languages_mysql_formatter__WEBPACK_IMPORTED_MODULE_4__[
                "default"
              ],
            n1ql: src_languages_n1ql_formatter__WEBPACK_IMPORTED_MODULE_5__[
              "default"
            ],
            plsql:
              src_languages_plsql_formatter__WEBPACK_IMPORTED_MODULE_6__[
                "default"
              ],
            postgresql:
              src_languages_postgresql_formatter__WEBPACK_IMPORTED_MODULE_7__[
                "default"
              ],
            redshift:
              src_languages_redshift_formatter__WEBPACK_IMPORTED_MODULE_8__[
                "default"
              ],
            spark:
              src_languages_spark_formatter__WEBPACK_IMPORTED_MODULE_9__[
                "default"
              ],
            sql: src_languages_sql_formatter__WEBPACK_IMPORTED_MODULE_11__[
              "default"
            ],
            sqlite:
              src_languages_sqlite_formatter__WEBPACK_IMPORTED_MODULE_10__[
                "default"
              ],
            tsql: src_languages_tsql_formatter__WEBPACK_IMPORTED_MODULE_12__[
              "default"
            ],
          };
          var supportedDialects = Object.keys(formatters);
          var defaultOptions = {
            language: "sql",
            tabWidth: 2,
            useTabs: false,
            keywordCase: "preserve",
            indentStyle: "standard",
            multilineLists: "always",
            logicalOperatorNewline: "before",
            aliasAs: "preserve",
            tabulateAlias: false,
            commaPosition: "after",
            newlineBeforeOpenParen: true,
            newlineBeforeCloseParen: true,
            expressionWidth: 50,
            linesBetweenQueries: 1,
            denseOperators: false,
            newlineBeforeSemicolon: false,
          };
          /**
           * Format whitespace in a query to make it easier to read.
           *
           * @param {string} query - input SQL query string
           * @param {FormatOptions} cfg Configuration options (see docs in README)
           * @return {string} formatted query
           */

          var format = function format(query) {
            var cfg =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};

            if (typeof query !== "string") {
              throw new Error(
                "Invalid query argument. Expected string, instead got " +
                  _typeof(query),
              );
            }

            var options = validateConfig(
              Object.assign(Object.assign({}, defaultOptions), cfg),
            );
            var Formatter = formatters[options.language];
            return new Formatter(options).format(query);
          };
          var ConfigError = /*#__PURE__*/ (function (_Error) {
            _inherits(ConfigError, _Error);

            var _super = _createSuper(ConfigError);

            function ConfigError() {
              _classCallCheck(this, ConfigError);

              return _super.apply(this, arguments);
            }

            return _createClass(ConfigError);
          })(/*#__PURE__*/ _wrapNativeSuper(Error));

          function validateConfig(cfg) {
            if (!supportedDialects.includes(cfg.language)) {
              throw new ConfigError(
                "Unsupported SQL dialect: ".concat(cfg.language),
              );
            }

            if (
              (0, _utils__WEBPACK_IMPORTED_MODULE_13__.isNumber)(
                cfg.multilineLists,
              ) &&
              cfg.multilineLists <= 0
            ) {
              throw new ConfigError(
                "multilineLists config must be a positive number.",
              );
            }

            if (cfg.expressionWidth <= 0) {
              throw new ConfigError(
                "expressionWidth config must be positive number. Received ".concat(
                  cfg.expressionWidth,
                  " instead.",
                ),
              );
            }

            if (cfg.commaPosition === "before" && cfg.useTabs) {
              throw new ConfigError(
                "commaPosition: before does not work when tabs are used for indentation.",
              );
            }

            return cfg;
          }

          /***/
        },

      /***/ "./src/types.ts":
        /*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);

          /***/
        },

      /***/ "./src/utils.ts":
        /*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__,
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ dedupe: () => /* binding */ dedupe,
            /* harmony export */ equalizeWhitespace: () =>
              /* binding */ equalizeWhitespace,
            /* harmony export */ escapeRegExp: () => /* binding */ escapeRegExp,
            /* harmony export */ id: () => /* binding */ id,
            /* harmony export */ isEmpty: () => /* binding */ isEmpty,
            /* harmony export */ isNumber: () => /* binding */ isNumber,
            /* harmony export */ last: () => /* binding */ last,
            /* harmony export */ maxLength: () => /* binding */ maxLength,
            /* harmony export */ sortByLengthDesc: () =>
              /* binding */ sortByLengthDesc,
            /* harmony export */
          });
          function _toConsumableArray(arr) {
            return (
              _arrayWithoutHoles(arr) ||
              _iterableToArray(arr) ||
              _unsupportedIterableToArray(arr) ||
              _nonIterableSpread()
            );
          }

          function _nonIterableSpread() {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (
              n === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen);
          }

          function _iterableToArray(iter) {
            if (
              (typeof Symbol !== "undefined" &&
                iter[Symbol.iterator] != null) ||
              iter["@@iterator"] != null
            )
              return Array.from(iter);
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          var dedupe = function dedupe(arr) {
            return _toConsumableArray(new Set(arr));
          }; // Last element from array

          var last = function last(arr) {
            return arr[arr.length - 1];
          }; // True array is empty, or it's not an array at all

          var isEmpty = function isEmpty(arr) {
            return !Array.isArray(arr) || arr.length === 0;
          }; // Escapes regex special chars

          var escapeRegExp = function escapeRegExp(string) {
            return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, "\\$&");
          }; // Sorts strings by length, so that longer ones are first
          // Also sorts alphabetically after sorting by length.

          var sortByLengthDesc = function sortByLengthDesc(strings) {
            return strings.sort(function (a, b) {
              return b.length - a.length || a.localeCompare(b);
            });
          };
          /** Get length of longest string in list of strings */

          var maxLength = function maxLength(strings) {
            return strings.reduce(function (max, cur) {
              return Math.max(max, cur.length);
            }, 0);
          };
          var isNumber = function isNumber(value) {
            return typeof value === "number";
          }; // replaces long whitespace sequences with just one space

          var equalizeWhitespace = function equalizeWhitespace(s) {
            return s.replace(
              /[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g,
              " ",
            );
          }; // identity function

          var id = function id(x) {
            return x;
          };

          /***/
        },

      /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId];
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__,
      );
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module",
          });
          /******/
        }
        /******/ Object.defineProperty(exports, "__esModule", { value: true });
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ ConfigError: () =>
          /* reexport safe */ _sqlFormatter__WEBPACK_IMPORTED_MODULE_0__.ConfigError,
        /* harmony export */ format: () =>
          /* reexport safe */ _sqlFormatter__WEBPACK_IMPORTED_MODULE_0__.format,
        /* harmony export */ formatters: () =>
          /* reexport safe */ _sqlFormatter__WEBPACK_IMPORTED_MODULE_0__.formatters,
        /* harmony export */ supportedDialects: () =>
          /* reexport safe */ _sqlFormatter__WEBPACK_IMPORTED_MODULE_0__.supportedDialects,
        /* harmony export */
      });
      /* harmony import */ var _sqlFormatter__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(/*! ./sqlFormatter */ "./src/sqlFormatter.ts");
      /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(/*! ./types */ "./src/types.ts");
    })();

    /******/ return __webpack_exports__;
    /******/
  })();
});