const {Token} = require('./token.js');
const sanitizeHtml = require('sanitize-html');

class TextToken extends Token {
	constructor(content) {
		super();

		this.content = content;
	}

	render(options, callback) {
		if (options.sanitize) {
			callback(null, sanitizeHtml(this.content, options.sanitize));
		} else {
			callback(null, this.content);
		}
	}
}

exports.TextToken = TextToken;