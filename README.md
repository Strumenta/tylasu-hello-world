# Tylasu Hello World

This project shows some basic usage of the [Tylasu AST library](https://github.com/Strumenta/tylasu) by [Strumenta](https://strumenta.com).

This project is written in TypeScript, but it's possible to apply the same patterns to a "plain old" JavaScript project as well.

## Installing dependencies

The usual `npm install` or `yarn` is required as a first step to download the necessary dependencies.

## Building

We perform a build with `npm run build` or `yarn build`.

The output of a build ends up in the `dist` directory and consists of:

 * A CommonJS module for use in Node (`dist/cjs`)
 * An ESM module for use in web libraries (`dist/esm`)
 * A bundle meant to be used directly on a web page (`dist/browser`).

For the latter, we use Webpack.

## Running

We can run the built code as a simple demonstration that will parse a statement and output the generated AST.

 * On node.js: `node dist/cjs/main.js`
 * On the browser: open `test.html` in your browser and look at the developer tools console.

Currently, there's no provision for running the parser interactively, and the produced AST is minimal.
