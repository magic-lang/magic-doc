
export class OocFile {
    constructor(private filename: string) {}
    static parse(path: string): OocFile {
        // TODO: Parse content
        return new OocFile(path);
    }
}
