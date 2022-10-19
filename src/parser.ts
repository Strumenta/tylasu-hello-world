import {Issue, Node} from "@strumenta/tylasu";
import {Parser} from "@strumenta/tylasu/parsing";
import {SimpleLangLexer} from "./parser/SimpleLangLexer";
import {Lexer} from "antlr4ts/Lexer";
import {CharStream} from "antlr4ts/CharStream";
import {CompilationUnitContext, SimpleLangParser} from "./parser/SimpleLangParser";
import {TokenStream} from "antlr4ts/TokenStream";

export class CompilationUnit extends Node {}

export class SLParser extends Parser<CompilationUnit, SimpleLangParser, CompilationUnitContext> {
    protected createANTLRLexer(inputStream: CharStream): Lexer {
        return new SimpleLangLexer(inputStream);
    }

    protected createANTLRParser(tokenStream: TokenStream): SimpleLangParser {
        return new SimpleLangParser(tokenStream);
    }

    protected parseTreeToAst(
        parseTreeRoot: CompilationUnitContext, considerPosition: boolean, issues: Issue[]
    ): CompilationUnit | undefined {
        return new CompilationUnit().withParseTreeNode(parseTreeRoot); // TODO: build a more comprehensive AST
    }
}
