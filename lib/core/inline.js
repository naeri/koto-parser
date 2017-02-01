const _ = require('lodash');
const async = require('async');
const Scanner = require('../util/scanner.js');
const matchType = require('../util/matchType.js');
const {TextToken} = require('../tokens/text.js');

function parse(buffer, options) {
	const scanner = new Scanner(buffer);
	const tokens = [];

	while (!scanner.isAtEnd) {
		let match = matchType(scanner, options.tokenTypes);

		if (match) {
			const token = match.type.parse(scanner, match.data, options);
			scanner.popAll();

			tokens.push(token);
		} else {
			const lastToken = _.last(scanner.tokens);

			if (_.isArray(lastToken)) {
				lastToken.push(scanner.currentChar);
			} else {
				tokens.push([scanner.currentChar]);
			}
		}

		scanner.skip(+1);
	}

	return tokens;
}

function render(tokens, options, callback) {
	async.map(tokens, function(token, callback) {
		if (_.isArray(token)) {
			token = new TextToken(token.join(''));
		}

		token.render(options, callback);
	}, function(error, renderedTokens) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, renderedTokens.join(''));
		}
	});
}

function parseAndRender(buffer, options, callback) {
	render(parse(buffer, options), options, callback);
}

exports.parse = parse;
exports.render = render;
exports.parseAndRender = parseAndRender;