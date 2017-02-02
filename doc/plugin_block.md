# How to Write a Block Plugin

You can write a block plugin and add block syntax by creating a class that extends `BaseBlock`,
overriding `static match()`, `static parse()`, `static integrate()`, and `render()`.

## Class: BaseBlock

`BaseBlock` is in `/lib/blocks/base.js`. So you can import it by ..

```javascript
const {BaseBlock} = require('koto-parser/lib/blocks/base');
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

### static integrate(results, prev, curr)

The return value has no meaning here.

 Argument | Description
----------|-------------
 results  | An *array* of blocks having been parsed until this `static integrate()` method is called
 prev     | The last item of `results` argument
 curr     | The first block that have not been integrated into `results` yet.

If there is no need to integrate current block, just do not override this method.
Then the `curr` block will be simply `push`ed to the results.

### render(options, callback)

 Argument | Description
----------|-------------
 options  | The parser [options](/README.md##kotoparserrendertext-options-callback)
 callback | The callback function takes two arguments: `error` and `result`.

The callback `result` should be a string of rendered text.
When `error` is set and passed, the whole rendering process will be halted.

## Example

Built-in [heading block](/lib/blocks/heading.js) is a good example for the beginners.
If you need an example for an integration, built-in [paragraph block](/lib/blocks/paragraph.js) would help.