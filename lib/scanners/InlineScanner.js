const _ = require('lodash');
const async = require('async');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./matchType.js');
const {TextToken} = require('../tokens/text.js');

class InlineScanner extends CharScanner {
	constructor(buffer, options) {
		super(buffer);

		this.options = options;
		this.tokens = [];
	}

	parse() {
		while (!this.isAtEnd) {
			let match = matchType(this, this.options.tokenTypes);

			if (match) {
				const token = match.type.parse(this, match.data);
				this.popAll();

				this.tokens.push(token);
			} else {
				const lastToken = _.last(this.tokens);

				if (_.isArray(lastToken)) {
					lastToken.push(this.currentChar);
				} else {
					this.tokens.push([this.currentChar]);
				}
			}

			this.skip(+1);
		}

		return this;
	}

	render(callback) {
		async.map(this.tokens, (token, callback) => {
			if (_.isArray(token)) {
				token = new TextToken(token.join(''));
			}

			token.render(this.options, callback);
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