import * as Declaration from "./declarations/Declaration";
import { ClassDeclaration } from "./declarations/ClassDeclaration";
import { CoverDeclaration } from "./declarations/CoverDeclaration";
import { EnumDeclaration } from "./declarations/EnumDeclaration";
import { ClassOrCoverDeclaration } from "./declarations/ClassOrCoverDeclaration";

export class CodeFile {
    private children: Declaration.Declaration[] = [];
    constructor(private file: string) {
    }
    static parse(file: string): CodeFile {
        return new CodeFile(file);
    }
    private static readBetween(str: string, startMarker: string = "{", endMarker: string = "}", startIndex: number = 0): { content: string, success: boolean } {
        var content: string;
        var success = true;
        var contentStartIndex = str.indexOf(startMarker, startIndex) + 1;
        if (contentStartIndex > 0) {
            var delta = 1;
            var currentIndex = contentStartIndex;
            while (delta > 0 && currentIndex < str.length) {
                if (str[currentIndex] == startMarker)
                    delta++;
                else if (str[currentIndex] == endMarker)
                    delta--;
                currentIndex++;
            }
            if (success = delta == 0)
                content = str.substr(contentStartIndex, currentIndex - contentStartIndex - 1);
        }
        return { content: content, success: success };
    }
}