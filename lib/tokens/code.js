const {Token} = require('./token.js');
const sanitizeHtml = require('sanitize-html');

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
		callback(null, `<code>${sanitizeHtml(this.content)}</code>`)
	}
}

exports.CodeToken = CodeToken;