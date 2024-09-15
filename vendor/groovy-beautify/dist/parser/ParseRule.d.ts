import { CodeBlock } from "./types";
export declare type MatchExpression =
  | RegExp
  | string
  | ((currentBlock: CodeBlock, currentText: string) => string | undefined);
export default class ParseRule {
  name: string;
  exclusive: boolean;
  wholeword: boolean;
  start: MatchExpression | MatchExpression[];
  skip?: MatchExpression | MatchExpression[];
  end?: MatchExpression | MatchExpression[];
  constructor(
    name: string,
    options: {
      exclusive?: boolean;
      wholeword?: boolean;
      start: MatchExpression | MatchExpression[];
      end?: MatchExpression | MatchExpression[];
      skip?: MatchExpression | MatchExpression[];
    },
  );
}
