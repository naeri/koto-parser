const _ = require('lodash');
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
		tokenTypes: require('./tokens/')
	}, options);

	BlockScanner.parseAndRender(buffer, options, callback);
}

exports.render = render;