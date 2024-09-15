import { CodeBlock } from "../parser/types";
import { Formatter } from "./Formatter";
export default class FormatRule {
  formatter: Formatter;
  constructor(formatter: Formatter);
  matches(cb: CodeBlock, siblings?: CodeBlock[]): boolean;
  afterSelf(nextText: string, indent: number): string;
  beforeSelf(prevText: string, indent: number, newLine: boolean): string;
  beforeChild(childText: string, indent: number): string;
  formatStart(cb: CodeBlock, indent: number): string;
  formatEnd(cb: CodeBlock, indent: number): string;
  allowBreak(cb: CodeBlock): boolean;
  formatChildren(parent: CodeBlock, indent: number): string;
}
