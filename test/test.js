const fs = require('fs');
const path = require('path');
const async = require('async');
const assert = require('assert');

const {render} = require('../lib');

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
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock]
		}, '<p>Paragraph</p>', done);
	});

	it('Heading', function(done) {
		renderAndTest('# Headline', {
			blockTypes: [require('../lib/blocks/heading').HeadingBlock]
		}, '<h1>Headline</h1>', done);
	});

	it('Bulletin List', function(done) {
		renderAndTest('- Item 1\n  - Child 1\n  - Child 2\n- Item 2', {
			blockTypes: [require('../lib/blocks/list').ListItemBlock]
		}, '<ul><li>Item 1</li><ul><li>Child 1</li><li>Child 2</li></ul><li>Item 2</li></ul>', done);
	});

	it('Ordered List', function(done) {
		renderAndTest('1. Item 1\n  1. Child 1\n  2. Child 2\n2. Item 2', {
			blockTypes: [require('../lib/blocks/list').ListItemBlock]
		}, '<ol><li>Item 1</li><ol><li>Child 1</li><li>Child 2</li></ol><li>Item 2</li></ol>', done);
	});

	it('Definition List', function(done) {
		renderAndTest('; Term: Description', {
			blockTypes: [
				require('../lib/blocks/definition').TermBlock,
				require('../lib/blocks/definition').DescriptionBlock
			]
		}, '<dl><dt>Term</dt><dd>Description</dd></dl>', done);
	});

	it('Blockquote', function(done) {
		renderAndTest('> Blockquote', {
			blockTypes: [require('../lib/blocks/blockquote').BlockquoteBlock]
		}, '<blockquote>Blockquote</blockquote>', done);
	});

	it('Code', function(done) {
		renderAndTest('```\nCode\n```', {
			blockTypes: [require('../lib/blocks/code').CodeBlock]
		}, '<pre class="lang-text"><code>Code</code></pre>', done);
	});
});

describe('Tokens', function() {
	it('Bold', function(done) {
		renderAndTest('**Bold**', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/bold').BoldToken]
		}, '<p><strong>Bold</strong></p>', done);
	});

	it('Italic', function(done) {
		renderAndTest('*Italic*', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/italic').ItalicToken]
		}, '<p><i>Italic</i></p>', done);
	});

	it('Underline', function(done) {
		renderAndTest('__Underline__', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/underline').UnderlineToken]
		}, '<p><u>Underline</u></p>', done);
	});

	it('Strike', function(done) {
		renderAndTest('~~Strike~~', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/strike').StrikeToken]
		}, '<p><del>Strike</del></p>', done);
	});

	it('Link', function(done) {
		renderAndTest('[Link Title](https://link-href/)', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/link').LinkToken]
		}, '<p><a href="https://link-href/">Link Title</a></p>', done);
	});

	it('Image', function(done) {
		renderAndTest('![Image Title](https://image-src/)', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/image').ImageToken]
		}, '<p><img title="Image Title" src="https://image-src/"></p>', done);
	});

	it('Code', function(done) {
		renderAndTest('`Code`', {
			blockTypes: [require('../lib/blocks/paragraph').ParagraphBlock],
			tokenTypes: [require('../lib/tokens/code').CodeToken]
		}, '<p><code>Code</code></p>', done);
	});
});

it('Full Demo', function(done) {
	async.auto({
		demoMarkdown: function(callback) {
			fs.readFile(path.join(__dirname, 'demo.md'), callback);
		},
		demoHtml: function(callback) {
			fs.readFile(path.join(__dirname, 'demo.html'), callback);
		},
		test: ['demoMarkdown', 'demoHtml', function(data, callback) {
			renderAndTest(
				data.demoMarkdown.toString(), {},
				data.demoHtml.toString(),
				callback
			);
		}]
	}, done);
});