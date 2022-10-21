parser grammar SimpleLangParser;

options { tokenVocab = SimpleLangLexer; }

compilationUnit: (statement NEWLINE*)* EOF;

statement:
      DISPLAY expression #displayStmt
    | SET ID EQUAL expression #setStmt
    | INPUT ID IS type #inputDeclStmt
    ;

expression:
      INT_LIT                       #literalExpr
    | DEC_LIT                       #literalExpr
    | STRING_LIT                    #literalExpr
    | BOOLEAN_LIT                   #literalExpr
    | left=expression PLUS right=expression    #binaryExpr
    | left=expression MINUS right=expression   #binaryExpr
    | left=expression MULT right=expression    #binaryExpr
    | left=expression DIV right=expression     #binaryExpr
    ;

type:
       INT
     | DEC
     | STRING
     | BOOLEAN
     ;
