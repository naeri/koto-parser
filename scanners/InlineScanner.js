const _ = require('lodash');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./shorthands.js');

class InlineScanner extends CharScanner {

	constructor(buffer, tokenTypes) {
		super(buffer);

		this.tokenTypes = tokenTypes;
		this.tokens = [];
	}

	parse() {
		while (!this.isAtEnd) {
			let match = matchType(this.tokenTypes, this);

			if (match) {
				const token = match.type.parse(this, match.data);
				this.reset();

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
	}

	render() {
		return Promise.map(this.tokens, function (token) {
			if (_.isArray(token)) {
				return token.join('');
			} else {
				return token.render();
			}
		}).then(function (results) {
			return results.join('');
		});
	}
}