import * as Declaration from "./Declaration";

export class ClassOrCoverDeclaration extends Declaration.Declaration {
    private base: ClassOrCoverDeclaration;
    private children: Declaration.Declaration[] = [];
    constructor(name: string, kind: Declaration.Kind, modifiers: Declaration.Modifiers) {
        super(name, kind, modifiers);
    }
    addChild(child: Declaration.Declaration) {
        this.children.push(child);
    }
}
