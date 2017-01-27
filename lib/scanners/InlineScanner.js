const _ = require('lodash');
const async = require('async');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./matchType.js');

class InlineScanner extends CharScanner {
	constructor(buffer, options) {
		super(buffer);

		this.options = options;
		this.tokens = [];
	}

	parse() {
		while (!this.isAtEnd) {
			let match = matchType(this.options.tokenTypes, this);

			const token = match.type.parse(this, match.data);
			this.popAll();

			this.skip(+1);

			this.tokens.push(token);
		}

		return this;
	}

	render(callback) {
		async.map(this.tokens, (token, callback) => {
			if (_.isArray(token)) {
				callback(null, token.join(''));
			} else {
				token.render(this.options, callback);
			}
		}, function(error, tokens) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, tokens.join(''));
			}
		});
	}

	static parseAndRender(buffer, options, callback) {
		new InlineScanner(buffer, options).parse().render(callback);
	}
}

exports.InlineScanner = InlineScanner;