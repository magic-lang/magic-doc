import { Token } from "./Token";
import { TokenKind } from "./TokenKind";
import { BufferedReader } from "../../io/BufferedReader";

export class Identifier extends Token {
    constructor(value: string) {
        super(value, TokenKind.Identifier);
    }
    static scan(source: BufferedReader): Token {
        var result: string = "";
        if (Identifier.isValidFirstCharacter(source.peek())) {
            do {
                result += source.read();
            } while (Identifier.isValidCharacter(source.peek()));
        }
        return result ? new Identifier(result) : null;
    }
    private static isValidFirstCharacter(character: string): boolean {
        return character >= "A" && character <= "Z" || character >= "a" && character <= "z" || character == "_"
    }
    private static isValidCharacter(character: string): boolean {
        return Identifier.isValidFirstCharacter(character) || character >= "0" && character <= "9"
    }
}
