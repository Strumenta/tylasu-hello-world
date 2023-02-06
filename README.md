# Tylasu Hello World

This project shows some basic usage of the [Tylasu AST library](https://github.com/Strumenta/tylasu) by [Strumenta](https://strumenta.com).

This project is written in TypeScript, but it's possible to apply the same patterns to a "plain old" JavaScript project as well.

## Installing dependencies

The usual `npm install` or `yarn` is required as a first step to download this project's dependencies on your machine.

## Building

We can perform a build with `npm run build` or `yarn build`.

The output of the build will end up in the `dist` directory, and it consists of:

 * A CommonJS module for use in Node (`dist/cjs`)
 * An ESM module for use in web libraries (`dist/esm`)
 * A bundle meant to be used directly on a web page (`dist/browser`).

To create the latter, we use [Webpack](webpack.config.js).

## Running

We can run the built code as a simple demonstration that will parse a statement and output the generated AST.

 * On node.js: `node dist/cjs/main.js`
 * On the browser: open `test.html` in your browser and look at the developer tools console.

Currently, there's no provision for running the parser interactively, and the produced AST is minimal.

There's also intentionally no test suite. Please refer to Tylasu's test suite, instead. 
