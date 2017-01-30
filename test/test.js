const assert = require('assert');
const {render} = require('../lib/');

function renderAndTest(buffer, options, test, callback) {
	render(buffer, options, function(error, result) {
		if (error) {
			callback(error);
		} else {
			let assertError = null;

			try {
				assert.equal(result, test)
			} catch(_assertError) {
				assertError = _assertError;
			}

			callback(assertError);
		}
	});
}

describe('Blocks', function() {
	it('Paragraph', function(done) {
		renderAndTest('Paragraph', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock]
		}, '<p>Paragraph</p>', done);
	});

	it('Heading', function(done) {
		renderAndTest('; Term: Description', {
			blockTypes: [
				require('../lib/blocks/definition.js').TermBlock,
				require('../lib/blocks/definition.js').DescriptionBlock
			]
		}, '<dl><dt>Term</dt><dd>Description</dd></dl>', done);
	});

	it('Bulletin List', function(done) {
		renderAndTest('- Item 1\n  - Child 1\n  - Child 2\n- Item 2', {
			blockTypes: [require('../lib/blocks/list.js').ListItemBlock]
		}, '<ul><li>Item 1</li><ul><li>Child 1</li><li>Child 2</li></ul><li>Item 2</li></ul>', done);
	});

	it('Ordered List', function(done) {
		renderAndTest('1. Item 1\n  1. Child 1\n  2. Child 2\n2. Item 2', {
			blockTypes: [require('../lib/blocks/list.js').ListItemBlock]
		}, '<ol><li>Item 1</li><ol><li>Child 1</li><li>Child 2</li></ol><li>Item 2</li></ol>', done);
	});

	it('Definition List', function(done) {
		renderAndTest('; Term: Description', {
			blockTypes: [
				require('../lib/blocks/definition.js').TermBlock,
				require('../lib/blocks/definition.js').DescriptionBlock
			]
		}, '<dl><dt>Term</dt><dd>Description</dd></dl>', done);
	});

	it('Blockquote', function(done) {
		renderAndTest('> Blockquote', {
			blockTypes: [require('../lib/blocks/blockquote.js').BlockquoteBlock]
		}, '<blockquote>Blockquote</blockquote>', done);
	});

	it('Code', function(done) {
		renderAndTest('```\nCode\n```', {
			blockTypes: [require('../lib/blocks/code.js').CodeBlock]
		}, '<pre class="lang-text"><code>Code</code></pre>', done);
	});
});

describe('Tokens', function() {
	it('Bold Emphasis', function(done) {
		renderAndTest('**Bold**', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/emphasis.js').BoldToken]
		}, '<p><strong>Bold</strong></p>', done);
	});

	it('Italic Emphasis', function(done) {
		renderAndTest('*Italic*', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/emphasis.js').ItalicToken]
		}, '<p><i>Italic</i></p>', done);
	});

	it('Link', function(done) {
		renderAndTest('[Link Title](https://link-href/)', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/link.js').LinkToken]
		}, '<p><a href="https://link-href/">Link Title</a></p>', done);
	});

	it('Image', function(done) {
		renderAndTest('![Image Title](https://iamge-src/)', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/link.js').LinkToken]
		}, '<p><img title="Image Title" src="https://iamge-src/"></p>', done);
	});

	it('Strike', function(done) {
		renderAndTest('~~Strike~~', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/strike.js').StrikeToken]
		}, '<p><strike>Strike</strike></p>', done);
	});

	it('Code', function(done) {
		renderAndTest('`Code`', {
			blockTypes: [require('../lib/blocks/paragraph.js').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/code.js').CodeToken]
		}, '<p><code>Code</code></p>', done);
	});
});