const {Token} = require('./token.js');

class CodeToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		if (!scanner.ahead('`')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find('`')) {
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new CodeToken(data);
	}

	render(options, callback) {
		callback(null, `<code>${this.content}</code>`)
	}
}

exports.CodeToken = CodeToken;