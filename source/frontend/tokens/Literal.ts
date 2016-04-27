import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Literal extends Token {
    constructor(value: string) {
        super(value, TokenKind.Literal);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        var value: string = "";
        return result;
    }
    private static scanNumber() {
    }
    private static scanString() {
    }
    private static scanCharacter() {
    }
}
