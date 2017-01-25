const assert = require('assert');

const Promise = require('bluebird');
const {BlockScanner} = require('../scanners/BlockScanner.js');

function test(text, assertion) {
	const scanner = new BlockScanner(text, [
		require('../blocks/blockquote.js').BlockquoteBlock,
		require('../blocks/paragraph').ParagraphBlock
	]);

	scanner.parse();

	scanner.render().then(function (result) {
		assert.equal(result, assertion);
	});
}

describe('문단 (Paragraph)', function () {
	it('Plain paragraph', function () {
		test('Normal paragraph', '<p>Normal paragraph</p>');
	});
});

describe('인용문 (Blockquote)', function () {
	it('> Blockquoted', function () {
		test('Normal paragraph', '<p>Normal paragraph</p>');
	});
});