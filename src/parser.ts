import {Child, Children, Init, Issue, Mapped, Node, Property, registerNodeFactory} from "@strumenta/tylasu";
import {Parser} from "@strumenta/tylasu/parsing";
import {SimpleLangLexer} from "./parser/SimpleLangLexer";
import {Lexer} from "antlr4ts/Lexer";
import {CharStream} from "antlr4ts/CharStream";
import {CompilationUnitContext, SetStmtContext, SimpleLangParser} from "./parser/SimpleLangParser";
import {TokenStream} from "antlr4ts/TokenStream";

export class CompilationUnit extends Node {
    // TODO statements: @Child/@Children + @Mapped("propertyName") se il nome nel parse tree è diverso dal nome nell'ast (es. statement/statementS, sqlStatement -> statement)
    @Children()
    @Mapped("statement")
    statements: Statement[];
}

export abstract class Statement extends Node {}

export class SetStatement extends Statement {
    @Property() variable: string;
    //TODO expression (@Child)

    constructor(variable: string) {
        super();
        this.variable = variable;
    }

    @Init
    initNode() {
        console.log("Creating node to set variable " + this.variable);
    }
}

registerNodeFactory(CompilationUnitContext, () => { return new CompilationUnit(); });
registerNodeFactory(SetStmtContext, (setStmt: SetStmtContext) => {
    return new SetStatement(setStmt.ID().text);
});

export class SLParser extends Parser<CompilationUnit, SimpleLangParser, CompilationUnitContext> {
    protected createANTLRLexer(inputStream: CharStream): Lexer {
        return new SimpleLangLexer(inputStream);
    }

    protected createANTLRParser(tokenStream: TokenStream): SimpleLangParser {
        return new SimpleLangParser(tokenStream);
    }

    protected parseTreeToAst(
        parseTreeRoot: CompilationUnitContext/*, considerPosition: boolean, issues: Issue[]*/
    ): CompilationUnit | undefined {
        return parseTreeRoot.toAST() as CompilationUnit;
    }
}
