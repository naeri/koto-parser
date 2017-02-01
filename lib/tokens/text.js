const {BaseToken} = require('./base');
const escapeHtml = require('escape-html-whitelist');

class TextToken extends BaseToken {
	constructor(content) {
		super();

		this.content = content;
	}

	render(options, callback) {
		if (options.sanitize) {
			callback(null, escapeHtml(this.content, options.sanitize));
		} else {
			callback(null, this.content);
		}
	}
}

exports.TextToken = TextToken;