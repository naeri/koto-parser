# How to Write a Token/Inline Plugin

You can write a token/inline plugin and add inline syntax by creating a class that extends `BaseToken`,
overriding `static match()`, `static parse()`, and `render()`.

## Class: BaseToken

`BaseToken` is in `/lib/tokens/base.js`. So you can import it by ..

```javascript
const {BackToken} = require('koto-parser/lib/tokens/base');
```

### static match(scanner)

When the return value is not `false`, `null`, or `undefined`,
it is regarded that the plugin can parse current substring,
and the return value becomes the second argument of `static parse()`.

 Argument | Description
----------|-------------
 scanner  | [Scanner](/doc/scanner.md) object

The only argument, scanner is an instance of [Scanner](/doc/scanner.md) object.
The plugin can browse the given markdown text via the scanner.

### static parse(scanner, match, options)

Only the object returned from this `static parse()` method is appended to the parse result and eventually rendered.

 Argument | Description
----------|-------------
 scanner  | [Scanner](/doc/scanner.md) object
 match    | The return value from `static match()`
 options  | The parser [options](/README.md##kotoparserrendertext-options-callback)

### render(options, callback)

 Argument | Description
----------|-------------
 options  | The parser [options](/README.md##kotoparserrendertext-options-callback)
 callback | The callback function takes two arguments: `error` and `result`.

The callback `result` should be a string of rendered text.
When `error` is set and passed, the whole rendering process will be halted.

## Example

Built-in [strikethrough token](/lib/tokens/strike.js) is a good example for the beginners.