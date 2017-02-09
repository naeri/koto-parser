const _defaults = require('lodash.defaults');
const escapeHtml = require('escape-html-whitelist');
const Block = require('./core/block');

function createOptions(options) {
	return _defaults(options, {
		blockTypes: require('./blocks/'),
		tokenTypes: require('./tokens/'),
		sanitize: _defaults({ allowedAttrs: { '*': ['style'] } }, escapeHtml.defaultOptions)
	});
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
	} else if (arguments.length >= 2) {
		callback = arguments[1];
	}

	Block.parseAndRender(buffer, createOptions(options), callback);
}

exports.parse = parse;
exports.render = render;