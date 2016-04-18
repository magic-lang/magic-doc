import * as Declaration from "./Declaration";
import { ClassOrCoverDeclaration } from "./ClassOrCoverDeclaration";

export class ClassDeclaration extends ClassOrCoverDeclaration {
    constructor(name: string, modifiers: Declaration.Modifiers) {
        super(name, Declaration.Kind.Class, modifiers);
    }
    isAbstract(): boolean { return this.hasModifier(Declaration.Modifiers.Abstract); }
}
