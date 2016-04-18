import * as Declaration from "./Declaration";
import { ClassOrCoverDeclaration } from "./ClassOrCoverDeclaration";

export class CoverDeclaration extends ClassOrCoverDeclaration {
    constructor(name: string) {
        super(name, Declaration.Kind.Cover, Declaration.Modifiers.None);
    }
}