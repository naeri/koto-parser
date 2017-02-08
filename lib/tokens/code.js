const _escape = require('lodash.escape');
const {BaseToken} = require('./base');

class CodeToken extends BaseToken {
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

		const content = scanner.pop();
		scanner.skip(+1);

		if (!content) {
			scanner.popAndBack();
			return null;
		}

		return content;
	}

	static parse(scanner, match, options) {
		return new CodeToken(match);
	}

	render(options, callback) {
		callback(null, `<code>${_escape(this.content)}</code>`)
	}
}

exports.CodeToken = CodeToken;