import * as fs from "fs";
import { UseFile } from "./UseFile";
import { CodeFile } from "./CodeFile";

export const enum FileType {
    All,
    Ooc,
    Use
}

export class Project {
    private useFiles: UseFile[] = [];
    constructor() {}

    static getCodeFilesFromUseFiles(rootFolder: string): CodeFile[] {
        var result: CodeFile[] = [];
        Project.getProjectFiles(rootFolder, FileType.Use).map(useFilePath => {
            return UseFile.parse(useFilePath);
        }).forEach(useFile => {
            useFile.getImports().forEach(sourceFilePath => {
                result.push(CodeFile.parse(useFile.getSourcePath() + "/" + sourceFilePath));
            });
        });
        return result;
    }
    //
    // TODO: Make the ignore filter work with individual files
    //
    private static getProjectFiles(folder: string, type: FileType, ignoreFolders: string[] = [".git", ".libs", "rock_tmp"]): string[] {
        var result: string[] = [];
        var filter = type == FileType.Ooc ? "ooc" : "use";
        var allFiles = fs.readdirSync(folder);
        allFiles.forEach(file => {
            var filename = folder + "/" + file;
            if (ignoreFolders.indexOf(file) < 0) {
                if (fs.lstatSync(filename).isDirectory())
                    result = result.concat(Project.getProjectFiles(filename, type));
                else if (file.length > filter.length && file.lastIndexOf(filter, file.length - filter.length) == file.length - filter.length)
                    result.push(filename);
            }
        });
        return result;
    }
}
