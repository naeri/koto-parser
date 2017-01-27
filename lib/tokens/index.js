module.exports = [
	require('./code.js').CodeToken,
	require('./emphasis.js').BoldToken,
	require('./emphasis.js').ItalicToken,
	require('./image.js').ImageToken,
	require('./link.js').LinkToken,
	require('./strike.js').StrikeToken,
	require('./char.js').CharToken
];