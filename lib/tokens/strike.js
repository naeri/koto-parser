const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class StrikeToken extends BaseToken {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('~~')) {
			return null;
		}

		scanner.skip(+2);
		scanner.mark();					// [start, contentStart]

		if (!scanner.find('~~')) {
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
		return new StrikeToken(contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<strike>${content}</strike>`);
			}
		});
	}
}

exports.StrikeToken = StrikeToken;