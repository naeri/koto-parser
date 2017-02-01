# KotoParser

[![npm version](https://badge.fury.io/js/koto-parser.png)](https://badge.fury.io/js/koto-parser)

*KotoParser* is an easily-extensible asynchronous Markdown parser.
[Live Demo](https://hatamake.github.io/koto-parser/demo/).

## Install

```bash
npm install koto-parser
```

## Usage

### In Node.js

```javascript
const KotoParser = require('koto-parser');

KotoParser.render('I am using **markdown**', function(error, result) {
	console.log(result);
});
```

### In the Browser

```html
<script type="application/javascript" src="koto-parser.js"></script>
<script type="application/javascript">
KotoParser.render('I am using **markdown**', function(error, result) {
	console.log(result);
});
</script>
```

### KotoParser.render(text[, options], callback)

Parses and renders all the blocks and tokens of the given text.

 Argument              | Default                           | Description
-----------------------|-----------------------------------|-------------
 text                  |                                   | 
 [options]             |                                   | 
 [options.blockTypes]  |                                   | An *array* of [block-type plugins](/docs/plugin.md#)
 [options.tokenTypes]  |                                   | An *array* of [token-type plugins](/docs/plugin.md#)
 [options.sanitize]    | See [index.js](/lib/index.js#L19) | An option passed to [escape-html-whitelist](https://github.com/hatamake/escape-html). To turn off the sanitization, set to `false`.
 callback              |                                   | A callback function that takes two arguments: `error` and `result`

### KotoParser.parse(text[, options])

Parses all the blocks and tokens of the given text, but not renders them.
Returns an *array* of the root blocks.

### Plugin Development Guide

You can easily add or modify the rule by adding a class that extends `Block` or `Token` to the options.
See the [Plugin Development Guide](/doc/plugin.md) for further information.

## Contribution

If you have any bugs, suggestions, or any other questions, please create an issue.

Pull requests are always welcome. Before submitting pull requests, just make sure your changes pass the unit test by running `npm test` command.

## License

[MIT](/LICENSE)