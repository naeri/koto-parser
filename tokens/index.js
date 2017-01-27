const {requireAll} = require('../utils/requireAll.js');

module.exports = requireAll(__dirname, [
	'code',
	'emphasis',
	'image',
	'link',
	'strike'
]);