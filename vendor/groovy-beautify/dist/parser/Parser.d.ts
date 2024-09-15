import ParseRule, { MatchExpression } from "./ParseRule";
import { CodeBlock } from "./types";
export declare class Parser {
  text: string;
  textLength: number;
  textPosition: number;
  rules: ParseRule[];
  /**
   * @param text - Text to parse
   * @param rules - Array of parsing rules. If none of specified rules match default rule with type text will be used.
   */
  constructor(text: string, rules?: ParseRule[]);
  scan(): string | null;
  isDone(): boolean;
  move(length: number): void;
  match(
    cb: CodeBlock,
    expression?: MatchExpression | MatchExpression[],
    wholeword?: boolean,
  ): string | undefined;
  matchStart(cb: CodeBlock, rule: ParseRule): string | undefined;
  matchEnd(cb: CodeBlock, rule: ParseRule): string | undefined;
  matchSkip(cb: CodeBlock, rule: ParseRule): string | undefined;
  createDefaultTextObject(text: string): {
    type: string;
    start: string;
  };
  parse(): CodeBlock;
}
