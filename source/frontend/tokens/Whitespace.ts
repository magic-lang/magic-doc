import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Whitespace extends Token {
    constructor(value: string) {
        super(value, TokenKind.Whitespace);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        var buffer: string = "";
        if (Whitespace.isWhitespace(source.peek())) {
            do {
                buffer += source.read();
            } while (Whitespace.isWhitespace(source.peek()));
            result = new Whitespace(buffer);
        }
        return result;
    }
    private static isWhitespace(character: string) {
        return character === "\n" || character === "\r" || character === "\t" || character === " ";
    }
}
