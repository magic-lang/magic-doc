import { Token } from "./tokens/Token";
import { Comment } from "./tokens/Comment";
import { Whitespace } from "./tokens/Whitespace";
import { Identifier } from "./tokens/Identifier";
import { Separator } from "./tokens/Separator";
import { Operator } from "./tokens/Operator";

import { BufferedReader } from "../io/BufferedReader";
import { Iterator } from "../utilities/Iterator";

export class Lexer implements Iterator<Token> {
    constructor(private reader: BufferedReader) {
    }
    hasNext(): boolean {
        return !this.reader.isEmpty();
    }
    getNext(): Token {
        var result: Token;
        if (!(
            (result = Comment.scan(this.reader)) ||
            (result = Whitespace.scan(this.reader)) ||
            (result = Identifier.scan(this.reader)) ||
            (result = Operator.scan(this.reader)) ||
            (result = Separator.scan(this.reader))))
        {
            // For now, exit completely
            // TODO: output source location
            console.log("Unrecognized token: '" + this.reader.read() + "'");
            process.exit(1);
        }
        return result;
    }
}
