const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class UnderlineToken extends BaseToken {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('__')) {
			return null;
		}

		scanner.skip(+2);
		scanner.mark();					// [start, contentStart]

		if (!scanner.find('__')) {
			scanner.popAndBack();		// [start]
			scanner.popAndBack();		// []
			return null;
		}

		const content = scanner.pop();	// [start]
		scanner.skip(+2);

		if (!content) {
			scanner.popAndBack();		// []
			return null;
		}

		return content;
	}

	static parse(scanner, match, options) {
		const contentTokens = Inline.parse(match, options);
		return new UnderlineToken(contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<u>${content}</u>`);
			}
		});
	}
}

exports.UnderlineToken = UnderlineToken;