import { Iterator } from "./Iterator";

export class BufferedIterator<T> implements Iterator<T> {
    private buffer: T[] = [];
    constructor(private backend: Iterator<T>) {
    }
    hasNext(): boolean {
        return this.peek() != null;
    }
    peek(position: number = 0): T {
        var next: T = null;
        while (position > this.buffer.length - 1 && (next = this.backend.getNext()))
            this.buffer.push(next);
        return position > this.buffer.length - 1 ? null : this.buffer[position];
    }
    getNext(): T {
        var result = this.peek();
        if (this.buffer.length > 0)
            this.buffer.shift();
        return result;
    }
}
