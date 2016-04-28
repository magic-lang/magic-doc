import { Iterator } from "../utilities/Iterator";
import { ArrayIterator } from "../utilities/ArrayIterator";
import { FolderReader } from "../io/FolderReader";

export const enum FileType {
    Any,
    Ooc,  // .ooc files
    Use   // .use files
}

export class Project {
    constructor() {
    }
    private static getProjectFiles(projectRootPath: string, fileType: FileType, excluded: string[] = [".git", "rock_tmp", ".libs"]): ArrayIterator<string> {
        var projectFiles: string[] = [];
        var ignored = excluded.map((item: string) => {
            return projectRootPath + "/" + item;
        });
        var folderReader = new FolderReader(projectRootPath, ignored);
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
