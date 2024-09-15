import { CodeBlock } from "../parser/types";
import FormatRule from "./FormatRule";
export declare type FormatterOptions = {
  width: number;
};
export declare class Formatter {
  rules: FormatRule[];
  options: FormatterOptions;
  constructor(rules?: Array<typeof FormatRule>, options?: FormatterOptions);
  format(obj: CodeBlock, indent?: number): string;
}
