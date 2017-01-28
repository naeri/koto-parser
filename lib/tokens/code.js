const {Token} = require('./token.js');

class CodeToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		scanner.mark();

		if (!scanner.ahead('`')) {
			return null;
		}

		scanner.skip(+1);
		scanner.mark();

		if (!scanner.find('`')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new CodeToken(data);
	}

	render(options, callback) {
		callback(null, `<pre><code>${this.content}</code></pre>`)
	}
}

exports.CodeToken = CodeToken;