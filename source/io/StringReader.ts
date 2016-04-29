import { Reader } from "./Reader";

export class StringReader implements Reader {
    private currentPosition = 0;
    constructor(private content: string) {
    }
    isEmpty(): boolean {
        return this.currentPosition >= this.content.length;
    }
    read(): string {
        return this.isEmpty() ? null : this.content.charAt(this.currentPosition++);
    }
}
