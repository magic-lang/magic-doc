import * as fs from "fs";

export class UseFile {
    constructor(private name: string, private description: string, private sourcePath: string, private requires: string[], private imports: string[]) {}
    getName(): string { return this.name; }
    getDescription(): string { return this.description; }
    getSourcePath(): string { return this.sourcePath; }
    getRequires(): string[] { return this.requires; }
    getImports(): string[] { return this.imports; }
    //
    // TODO: Refactor
    //
    static parse(file: string): UseFile {
        var result: UseFile;
        var name: string;
        var description: string;
        var sourcePath: string;
        var requires: string[] = [];
        var imports: string[] = [];
        var useFileLines = fs.readFileSync(file, "utf-8").split("\n");
        for (var i = 0; i < useFileLines.length; i++) {
            var tokenEndIndex: number;
            if ((tokenEndIndex = useFileLines[i].indexOf(":")) > -1) {
                var token = useFileLines[i].substring(0, tokenEndIndex).trim();
                var value = useFileLines[i].substring(tokenEndIndex + 1).trim();
                switch (token) {
                    case "Name":
                        name = value;
                        break;
                    case "Description":
                        description = value;
                        break;
                    case "SourcePath":
                        sourcePath = value;
                        break;
                    case "Requires":
                        requires = requires.concat(UseFile.insertValues(value))
                        break;
                    case "Imports":
                        imports = imports.concat(UseFile.insertValues(value));
                        break;
                    default:
                        console.log("WARNING: Unrecognized use-file token: '" + token + "'");
                        break;
                }
            }
            result = new UseFile(name, description, sourcePath, requires, imports);
        }
        return result;
    }
    private static insertValues(values: string): string[] {
        var result: string[] = [];
        if (values.indexOf(",") > -1) {
            result = values.split(",").map((value: string) => {
                return value.trim();
            });
        } else {
            result.push(values.trim());
        }
        return result;
    }
}
