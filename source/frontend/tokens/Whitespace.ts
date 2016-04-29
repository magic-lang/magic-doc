import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Whitespace extends Token {
    constructor(value: string) {
        super(value, TokenKind.EndOfLine);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        var buffer: string = "";
        var newLine: boolean = false;
        // We only really care about a single \n, so we discard the leftovers.
        if (Whitespace.isWhitespace(source.peek())) {
            do {
                var read = source.read();
                if (read == "\n")
                    newLine = true;
            } while (Whitespace.isWhitespace(source.peek()));
            if (newLine)
                result = new Whitespace("\n");
        }
        return result;
    }
    private static isWhitespace(character: string) {
        return character === "\n" || character === "\r" || character === "\t" || character === " ";
    }
}
