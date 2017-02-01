const _ = require('lodash');
const escapeHtml = require('escape-html-whitelist');
const Block = require('./core/block');

function createOptions(options) {
	return _.merge({
		blockTypes: require('./blocks/'),
		tokenTypes: require('./tokens/'),
		sanitize: _.merge(escapeHtml.defaultOptions, { allowedAttrs: { '*': ['style'] } })
	}, options);
}

function parse(buffer, options) {
	return Block.parse(buffer, createOptions(options));
}

function render(buffer) {
	let options = {};
	let callback = function() {};

	if (arguments.length >= 3) {
		options = arguments[1];
		callback = arguments[2];
	} else {
		callback = arguments[1];
	}

	Block.parseAndRender(buffer, createOptions(options), callback);
}

exports.parse = parse;
exports.render = render;