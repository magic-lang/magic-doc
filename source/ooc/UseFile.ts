import * as fs from "fs";

export class UseFile {
    constructor(private name: string, private description: string, private requires: string[], private imports: string[]) {}
    getName(): string { return this.name; }
    getDescription(): string { return this.description; }
    getRequires(): string[] { return this.requires; }
    getImports(): string[] { return this.imports; }
    static parse(file: string): UseFile {
        return null;
    }
}