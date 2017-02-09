const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class ItalicToken extends BaseToken {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('*')) {
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, contentStart]

		if (!scanner.find('*')) {
			scanner.popAndBack();		// [start]
			scanner.popAndBack();		// []
			return null;
		}

		const content = scanner.pop();	// [start]
		scanner.skip(+1);

		if (!content) {
			scanner.popAndBack();		// []
			return null;
		}

		return content;
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

exports.ItalicToken = ItalicToken;