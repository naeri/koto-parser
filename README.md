# KotoParser

*KotoParser* is an easily-extensible asyncronous Markdown parser.
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

### KotoParser.render(text[, options], callback);

 Argument             | Description
----------------------|-------------
 text                 |
 [options]            |
 [options.blockTypes] | An *array* of [block-type plugins](/docs/plugin.md#)
 [options.tokenTypes] | An *array* of [token-type plugins](/docs/plugin.md#)
 callback             | A callback function that two arguements: `error` and `result`

### Plugin Development Guide

You can easily add or modify the rule by adding a class that extends `Block` or `Token` to the options.
See the [Plugin Development Guide](/doc/plugin.md) for further information.

## Contribution

If you have any bugs, suggestions, or any other questions, please create an issue.

Pull requests are always welcome. Before submitting pull requests, just make sure your changes pass the unit test by running `npm test` command.

## License

[MIT](/LICENSE)