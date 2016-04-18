import * as Declaration from "./Declaration";
import { FunctionDeclaration } from "./FunctionDeclaration";

export class EnumDeclaration extends Declaration.Declaration {
    private elements: string[] = [];
    private functions: FunctionDeclaration[] = [];
    constructor(name: string) {
        super(name, Declaration.Kind.Enum, Declaration.Modifiers.None);
    }
    addElement(element: string): void {
        this.elements.push(element);
    }
    addFunction(func: FunctionDeclaration): void {
        this.functions.push(func);
    }
}
