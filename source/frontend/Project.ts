import { ArrayIterator } from "../utilities/ArrayIterator";
import { FolderReader } from "../io/FolderReader";
import { UseFile } from "./UseFile";
import { OocFile } from "./OocFile";

export const enum FileType {
    Any,
    Ooc,  // .ooc files
    Use   // .use files
}

export class Project {
    constructor() {
    }
    static parse(rootPath: string): Project {
        var targets: OocFile[] = [];
        var useFiles = Project.getUseFiles(rootPath);
        while (useFiles.hasNext()) {
            var useFile = useFiles.getNext();
            var sourcePath = useFile.getSourcePath();
            useFile.getImports().forEach(name => {
                targets.push(OocFile.parse(rootPath + "/" + sourcePath + "/" + name + ".ooc"));
            });
        }
        return new Project(/* TODO */);
    }
    private static getUseFiles(rootPath: string): ArrayIterator<UseFile> {
        var result: UseFile[] = [];
        var useFilePaths = Project.getProjectFiles(rootPath, FileType.Use);
        while (useFilePaths.hasNext())
            result.push(UseFile.parse(useFilePaths.getNext()));
        return new ArrayIterator<UseFile>(result);
    }
    private static getProjectFiles(rootPath: string, fileType: FileType, excluded: string[] = [".git", "rock_tmp", ".libs"]): ArrayIterator<string> {
        var projectFiles: string[] = [];
        var ignored = excluded.map((item: string) => {
            return rootPath + "/" + item;
        });
        var folderReader = new FolderReader(rootPath, ignored);
        while (!folderReader.isEmpty()) {
            var filename = folderReader.read();
            if (fileType == FileType.Any)
                projectFiles.push(filename);
            else {
                var dotIndex = filename.lastIndexOf(".");
                if (dotIndex > 0 && filename.length > 3 && filename.substring(dotIndex + 1) == (fileType == FileType.Ooc ? "ooc" : "use"))
                    projectFiles.push(filename);
            }
        }
        return new ArrayIterator<string>(projectFiles);
    }
}
