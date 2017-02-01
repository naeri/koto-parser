const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class BoldToken extends BaseToken {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
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

	static parse(scanner, match, options) {
		const contentTokens = Inline.parse(match, options);
		return new BoldToken(contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<strong>${content}</strong>`);
			}
		});
	}
}

class ItalicToken extends BaseToken {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
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

	static parse(scanner, match, options) {
		const contentTokens = Inline.parse(match, options);
		return new ItalicToken(contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
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