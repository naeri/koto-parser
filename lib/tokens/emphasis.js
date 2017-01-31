const {Token} = require('./token.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

class BoldToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('**')) {
			return null;
		}

		scanner.skip(+2);
		scanner.mark();					// [start, contentStart]

		if (!scanner.find('**')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		const content = scanner.pop();
		scanner.skip(+1);

		return content;
	}

	static parse(scanner, data) {
		return new BoldToken(data);
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<strong>${content}</strong>`);
			}
		});
	}
}

class ItalicToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		scanner.mark();

		if (!scanner.ahead('*')) {
			return null;
		}

		scanner.skip(+1);
		scanner.mark();

		if (!scanner.find('*')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new ItalicToken(data);
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<i>${content}</i>`);
			}
		});
	}
}

exports.BoldToken = BoldToken;
exports.ItalicToken = ItalicToken;