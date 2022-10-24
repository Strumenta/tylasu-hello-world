import {CompilationUnit, SetStatement, SLParser} from "./parser";
import {getNodeDefinition} from "@strumenta/tylasu";

console.log("Node definition for CompilationUnit", getNodeDefinition(CompilationUnit));
console.log("Node definition for SetStatement", getNodeDefinition(SetStatement));


const code = `set foo = 123
set goo = "aloha"
set sum = 5 + 10`;
console.log(`Parsing "${code}"...`);
const parser = new SLParser();
const result = parser.parse(code);
console.log("Parsed into", result.root, `in ${result.time}ms.`);

