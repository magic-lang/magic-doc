import * as Declaration from "./Declaration";

export enum Accessors {
    Get = 0,
    Set = 1,
    Both = Get | Set
}

export class PropertyDeclaration extends Declaration.Declaration {
    constructor(name: string, modifier: Declaration.Modifiers, private accessors: Accessors) {
        super(name, Declaration.Kind.Property, modifier);
    }
    isStatic(): boolean { return this.hasModifier(Declaration.Modifiers.Static); }
    getAccessors(): Accessors { return this.accessors; }
}