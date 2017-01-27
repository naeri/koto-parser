const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const {BlockScanner} = require('./scanners/BlockScanner.js');

function requireAll(dirname) {
	const dirpath = path.join(__dirname, dirname);

	const result = [];

	fs.readdirSync(dirname).forEach(function(filename) {
		const filepath = path.join(dirpath, filename);
		const _module = require(filepath);

		Object.keys(_module).forEach(function(key) {
			result.push(_module[key]);
		});
	});

	return result;
}

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
		blockTypes: requireAll('blocks'),
		tokenTypes: requireAll('tokens')
	}, options);

	BlockScanner.parseAndRender(buffer, options, callback);
}

exports.render = render;