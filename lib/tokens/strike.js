const {Token} = require('./token.js');

class StrikeToken extends Token {
	constructor(content) {
		super();

		this.content = content;
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

	static parse(scanner, data) {
		return new StrikeToken(data);
	}

	render(options, callback) {
		callback(null, `<strike>${this.content}</strike>`);
	}
}

exports.StrikeToken = StrikeToken;