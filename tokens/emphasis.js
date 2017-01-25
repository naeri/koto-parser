const {Token} = require('./token.js');

class BoldToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		if (!scanner.assert('**')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find('**')) {
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new BoldToken(data);
	}

	render(options, callback) {
		callback(null, `<strong>${this.content}</strong>`);
	}
}

class ItalicToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		if (!scanner.assert('*')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find('*')) {
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new ItalicToken(data);
	}

	render(options, callback) {
		callback(null, `<i>${this.content}</i>`);
	}
}

exports.BoldToken = BoldToken;
exports.ItalicToken = ItalicToken;