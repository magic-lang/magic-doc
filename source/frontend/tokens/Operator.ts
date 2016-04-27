import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Operator extends Token {
    constructor(value: string) {
        super(value, TokenKind.Operator);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        var length = 1;
        switch (source.peek()) {
            case "~":
            case "@":
            case "$":
                break;
            case "+":
                if (source.peek(2) == "+=" || source.peek(2) == "++")
                    length = 2;
                break;
            case "-":
                if (source.peek(2) == "-=" || source.peek(2) == "->")
                    length = 2;
                break;
            case "*":
                if (source.peek(2) == "*=" || source.peek(2) == "**")
                    length = source.peek(3) == "**=" ? 3 : 2;
                break;
            case "/":
                if (source.peek(2) == "/=")
                    length = 2;
                break;
            case "=":
                if (source.peek(2) == "==" || source.peek(2) == "=>")
                    length = 2;
                break;
            case "^":
                if (source.peek(2) == "^=")
                    length = 2;
                break;
            case "|":
                if (source.peek(2) == "||" || source.peek(2) == "|=")
                    length = 2;
                break;
            case "&":
                if (source.peek(2) == "&&" || source.peek(2) == "&=")
                    length = 2;
                break;
            case "!":
                if (source.peek(2) == "!=")
                    length = 2;
                break;
            case "<":
                if (source.peek(2) == "<<")
                    length = source.peek(3) == "<<=" ? 3 : 2;
                else if (source.peek(2) == "<=")
                    length = source.peek(4) == "<==>" ? 4 : 2;
                break;
            case ">":
                if (source.peek(2) == ">>")
                    length = source.peek(3) == ">>=" ? 3 : 2;
                else if (source.peek(2) == ">=")
                    length = 2;
                break;
            case ":":
                length = 0; // may collide with separator ':'
                if (source.peek(2) == ":=")
                    length = source.peek(3) == ":==" ? 3 : 2;
                else if (source.peek(3) == "::=")
                    length = 3;
                break;
            case ".":
                if (source.peek(2) == "..")
                    length = source.peek(3) == "..." ? 3 : 2;
                break;
            case "%":
                if (source.peek(2) == "%=")
                    length = 2;
                break;
            case "?":
                if (source.peek(2) == "??")
                    length = 2;
                break;
            default:
                length = 0;
                break;
        }
        return length > 0 ? new Operator(source.read(length)) : null;
    }
}
