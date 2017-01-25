const {Token} = require('./token.js');

class StrikeToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		if (!scanner.assert('~~')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find('~~')) {
			return null;
		}

		return scanner.pop();
	}

	static parse(scanner, data) {
		return new StrikeToken(data);
	}

	render(options, callback) {
		callback(null, `<strike>${this.content}</strike>`);
	}
}

exports.StrikeToken = StrikeToken;