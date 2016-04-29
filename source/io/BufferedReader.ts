import { Reader } from "./Reader";

export class BufferedReader implements Reader {
    private buffer: string = "";
    constructor(private backend: Reader) {
    }
    isEmpty(): boolean {
        return this.buffer.length == 0 && this.backend.isEmpty();
    }
    peek(length: number = 1): string {
        var next: string = null;
        while (length > this.buffer.length && (next = this.backend.read()))
            this.buffer += next;
        return length > this.buffer.length ? this.buffer : this.buffer.substring(0, length)
    }
    read(length: number = 1): string {
        var result = this.peek(length);
        if (this.buffer.length > 0)
            this.buffer = this.buffer.substring(length);
        return result;
    }
}
