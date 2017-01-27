const path = require('path');

function requireAll(dirpath, filenames) {
	const result = [];

	filenames.forEach(function(filename) {
		const _module = require(path.join(dirpath, `${filename}.js`));

		Object.keys(_module).forEach(function(key) {
			result.push(_module[key]);
		});
	});

	return result;
}

exports.requireAll = requireAll;