const _ = require('lodash');
const escapeHtml = require('escape-html-whitelist');
const {BlockScanner} = require('./scanners/BlockScanner.js');

function render(buffer) {
	let options = {};
	let callback = new Function();

	if (arguments.length >= 3) {
		options = arguments[1];
		callback = arguments[2];
	} else {
		callback = arguments[1];
	}

	options = _.merge({
		blockTypes: require('./blocks/'),
		tokenTypes: require('./tokens/'),
		sanitize: _.merge(escapeHtml.defaultOptions, { allowedAttrs: { '*': ['style'] } })
	}, options);

	BlockScanner.parseAndRender(buffer, options, callback);
}

exports.render = render;