const _last = require('lodash.last');
const _isArray = require('lodash.isarray');
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
			const lastToken = _last(tokens);

			if (_isArray(lastToken)) {
				lastToken.push(scanner.currentChar);
			} else {
				tokens.push([scanner.currentChar]);
			}
		}

		scanner.skip(+1);
	}

	return integrate(tokens);
}

function integrate(tokens) {
	return tokens.map(function(token) {
		if (_isArray(token)) {
			return new TextToken(token.join(''));
		} else {
			return token;
		}
	});
}

function render(tokens, options, callback) {
	async.map(tokens, function(token, callback) {
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