import { StringReader } from "./StringReader";
import * as fs from "fs";

export class FileReader extends StringReader {
    constructor(private path: string) {
        super(fs.readFileSync(path, "utf-8"));
    }
}
