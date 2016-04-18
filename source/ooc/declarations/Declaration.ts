export const enum Kind {
    Class,
    Cover,
    Enum,
    Function,
    Property
}

export const enum Modifiers {
    None = 0,
    Static = 1 << 0,
    Abstract = 1 << 1,
    Virtual = 1 << 2,
    Override = 1 << 3,
    Final = 1 << 4,
}

export abstract class Declaration {
    constructor(private name: string, private kind: Kind, private modifiers: Modifiers) { }
    getName(): string { return this.name; }
    getKind(): Kind { return this.kind; }
    getModifiers(): Modifiers { return this.modifiers; }
    //getLocation(): Location { return this.location; }
    hasModifier(modifier: Modifiers): boolean {
        return (this.modifiers & modifier) == modifier;
    }
}
