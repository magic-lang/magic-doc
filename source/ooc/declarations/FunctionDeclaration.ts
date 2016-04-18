import * as Declaration from "./Declaration";

export const enum Kind {
    Normal,
    Constructor,
    Destructor
}

export class FunctionDeclaration extends Declaration.Declaration {
    constructor(name: string, private functionKind: Kind, modifiers: Declaration.Modifiers) {
        super(name, Declaration.Kind.Function, modifiers);
    }
    isConstructor(): boolean { return false; }
    isDestructor(): boolean { return false; }
    isStatic(): boolean { return this.hasModifier(Declaration.Modifiers.Static); }
    isAbstract(): boolean { return this.hasModifier(Declaration.Modifiers.Abstract); }
    isOverride(): boolean { return this.hasModifier(Declaration.Modifiers.Override); }
    isVirtual(): boolean { return this.hasModifier(Declaration.Modifiers.Virtual); }
    isFinal(): boolean { return this.hasModifier(Declaration.Modifiers.Final); }
    getFunctionKind(): Kind { return this.functionKind; }
}
