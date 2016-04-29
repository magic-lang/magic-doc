import { TokenKind } from "./TokenKind";

export abstract class Token {
    constructor(private value: string, private kind: TokenKind) {
    }
    getValue(): string { return this.value; }
    getKind(): TokenKind { return this.kind; }
}
