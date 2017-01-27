const {requireAll} = require('../utils/requireAll.js');

module.exports = requireAll(__dirname, [
	'blockquote',
	'code',
	'definition',
	'heading',
	'list',
	'paragraph'
]);