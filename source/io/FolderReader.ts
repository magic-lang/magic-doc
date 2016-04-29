import { Reader } from "./Reader";
import * as fs from "fs";

export class FolderReader implements Reader {
    private position = 0;
    private files: string[] = [];
    constructor(path: string, ignored: string[] = []) {
        this.files = FolderReader.getFiles(path, ignored);
    }
    isEmpty(): boolean {
        return this.position >= this.files.length;
    }
    read(): string {
        return !this.isEmpty() ? this.files[this.position++] : null;
    }
    private static getFiles(path: string, ignored: string[]): string[] {
        var result: string[] = [];
        var files: string[] = fs.readdirSync(path);
        var filename: string;
        files.forEach(file => {
            filename = path + "/" + file
            if (ignored.indexOf(filename) == -1) {
                if (fs.lstatSync(filename).isDirectory())
                    result = result.concat(FolderReader.getFiles(filename, ignored));
                else
                    result.push(filename);
            }
        });
        return result
    }
}
