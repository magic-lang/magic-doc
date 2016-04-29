import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Comment extends Token {
    constructor(value: string, kind: TokenKind) {
        super(value, kind);
    }
    static scan(source: BufferedReader): Token {
        var result: Token;
        var comment: string = "";
        var kind: TokenKind;
        switch (source.peek(2)) {
            case "//":
                source.read(2);
                while (source.peek() && source.peek() != "\n")
                    comment += source.read();
                kind = TokenKind.LineComment;
                break;
            case "/*":
                if (source.peek(3) == "/**") {
                    kind = TokenKind.DocComment;
                    source.read(3)
                } else {
                    kind = TokenKind.BlockComment;
                    source.read(2);
                }
                while (source.peek() && source.peek(2) != "*/")
                    comment += source.read();
                source.read(2);
                break;
            default:
                break;
        }
        return comment ? new Comment(comment, kind) : null;
    }
}
