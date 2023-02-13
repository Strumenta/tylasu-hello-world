import {readFileSync} from "fs";
import {Children} from "@strumenta/tylasu";
import {Node} from "@strumenta/tylasu";

export class JavaParserNode extends Node {

    // A reference to the original JavaParser node
    public readonly javaParserNode: any;

    @Children()
    subtree: JavaParserNode[] = [];

    // This needs to receive a JavaParser Node
    // TODO: is it possible to check the type somehow?
    constructor(node: any) {
        super();

        if (!node)
            throw new Error("Node cannot be undefined or null");

        this.javaParserNode = node;

        // Recreate the whole subtree for this JavaParser node, if any
        this.subtree = node.getChildNodes().map(n => {
            const node = new JavaParserNode(n);
            node.parent = this;
            return node;
        });
    }

    public isJPType(jpNodeType: any): boolean {
        return this.javaParserNode.findFirst(jpNodeType).orElse(undefined) === this.javaParserNode;
    }

    public toString = () : string => {
        return this.javaParserNode.toString();
    }
}

// Read a Java file
//
const javaFileContent = readFileSync("resources/helloworld.java").toString();

// Parse the Java code
//
// @ts-ignore
const javaParser = new (Java.type('com.github.javaparser.JavaParser'));
const result = javaParser.parse(javaFileContent);
const compilationUnit = result.getResult().orElseThrow();

// Try to the root Node of the Java Parser tree
//
// @ts-ignore
const nodeType = Java.type('com.github.javaparser.ast.Node');
const jpTreeRoot = compilationUnit.findFirst(nodeType).orElseThrow().findRootNode();

// Wrap the node
//
const treeRoot = new JavaParserNode(jpTreeRoot);
console.log(treeRoot);
console.log(`========================== JavaParser node wrapped:\n${treeRoot}`);

// List all methods
//
// @ts-ignore
const methodDeclarationType = Java.type('com.github.javaparser.ast.body.MethodDeclaration');
const methods : JavaParserNode[] = [];
for (let node of treeRoot.walk()) {
    if ((node as JavaParserNode).isJPType(methodDeclarationType)) {
        methods.push(node as JavaParserNode);
    }
}
console.log(`========================== Method declarations found: ${methods.length}`);
methods.forEach(method => console.log(`>>>>>>>>>>>>>>> Method declaration:\n${method}\n<<<<<<<<<<<<<<<`));

// Quick check of nodes relationships
//
const methodA = methods[1];
const methodB = methods[2];
console.log(`Do methodA and methodB have the same parent (not undefined)? ${methodA.parent === methodB.parent && methodA !== undefined}`);
console.log(`Can I find methodA starting from methodB.parent?\n${methodB.parent?.find((node, index) => node === methodA)}`);

// Move methodA after methodB, and check if its related comments have been moved along, too
//
if (!methodA.javaParserNode.remove())
    throw new Error("Unable to remove methodA from parent");

const classDeclaration = (methodB.parent as JavaParserNode).javaParserNode.asTypeDeclaration();
classDeclaration.addMember(methodA.javaParserNode);

const newTree = new JavaParserNode(jpTreeRoot);
console.log(`========================== Edited Java code:\n${newTree}`);
