import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Separator extends Token {
    constructor(value: string) {
        super(value, TokenKind.Separator);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        switch (source.peek()) {
            case ":":
            case ";":
            case ",":
            case "[":
            case "]":
            case "(":
            case ")":
            case "{":
            case "}":
                result = new Separator(source.read())
                break
            default:
                break;
        }
        return result;
    }
}
