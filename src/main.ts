import {SLParser} from "./parser";

const code = "set foo = 123";
console.log(`Parsing "${code}"...`);
const parser = new SLParser();
const result = parser.parse(code);
console.log(`Parsed into a ${Object.getPrototypeOf(result.root).constructor.name} in ${result.time}ms.`)

