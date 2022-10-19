import {SLParser} from "./parser";

const code = "set foo = 123";
console.log(`Parsing "${code}"...`);
const parser = new SLParser();
const result = parser.parse(code);
console.log("Parsed into", result.root, `in ${result.time}ms.`);

