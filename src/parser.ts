import {Child, Children, Init, Issue, Mapped, Node, Property, registerNodeFactory} from "@strumenta/tylasu";
import {Parser} from "@strumenta/tylasu/parsing";
import {SimpleLangLexer} from "./parser/SimpleLangLexer";
import {Lexer} from "antlr4ts/Lexer";
import {CharStream} from "antlr4ts/CharStream";
import {
    BinaryExprContext,
    CompilationUnitContext,
    ExpressionContext,
    LiteralExprContext,
    SetStmtContext,
    SimpleLangParser
} from "./parser/SimpleLangParser";
import {TokenStream} from "antlr4ts/TokenStream";

export class CompilationUnit extends Node {
    @Children()
    @Mapped("statement")
    statements: Statement[];
}

export abstract class Statement extends Node {}

export class SetStatement extends Statement {
    @Property() variable: string;
    @Child() expression: Expression;

    constructor(variable: string) {
        super();
        this.variable = variable;
    }
}

export abstract class Type extends Node {}
export class IntegerType extends Type {}
export class DecimalType extends Type {}
export class StringType extends Type {}
export class BooleanType extends Type {}

export abstract class Operator extends Node {}
export abstract class BinaryOperator extends Operator {}
export class SumOperator extends BinaryOperator {}
export class SubtractionOperator extends BinaryOperator {}
export class MultiplicationOperator extends BinaryOperator {}
export class DivisionOperator extends BinaryOperator {}

export abstract class Expression extends Node {
    @Property() type: Type;
}

export class LiteralExpression extends Expression {
    @Property() value: string;

    constructor(value: string, type: Type) {
        super();
        this.value = value;
        this.type = type;
    }
}

export class BinaryExpression extends Expression {
    @Property() operator: BinaryOperator;
    @Child() @Mapped("_left") left: Expression;
    @Child() @Mapped("_right") right: Expression;

    constructor(operator: BinaryOperator) {
        super();
        this.operator = operator;
    }
}

registerNodeFactory(CompilationUnitContext, () => { return new CompilationUnit(); });

registerNodeFactory(SetStmtContext, (setStmt: SetStmtContext) => {
    return new SetStatement(setStmt.ID().text);
});

registerNodeFactory(LiteralExprContext, (literalExpression: LiteralExprContext) => {
    let type;

    if (literalExpression.INT_LIT() != null) type = new IntegerType();
    if (literalExpression.DEC_LIT() != null) type = new DecimalType();
    if (literalExpression.STRING_LIT() != null) type = new StringType();
    if (literalExpression.BOOLEAN_LIT() != null) type = new BooleanType();

   return new LiteralExpression(literalExpression.text, type);
});

registerNodeFactory(BinaryExprContext, (binaryExpression: BinaryExprContext) => {
    let operator;

    if (binaryExpression.PLUS() != null) operator = new SumOperator();
    if (binaryExpression.PLUS() != null) operator = new SumOperator();
    if (binaryExpression.PLUS() != null) operator = new SumOperator();
    if (binaryExpression.PLUS() != null) operator = new SumOperator();

    return new BinaryExpression(operator);
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
