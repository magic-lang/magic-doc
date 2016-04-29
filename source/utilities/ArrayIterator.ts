import { Iterator } from "./Iterator";

export class ArrayIterator<T> implements Iterator<T> {
    private position = 0;
    constructor(private backend: T[]) {
    }
    hasNext(): boolean {
        return this.position < this.backend.length;
    }
    getNext(): T {
        return this.position < this.backend.length ? this.backend[this.position++] : undefined;
    }
}
