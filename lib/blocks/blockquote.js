const {Block} = require('./block.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

class BlockquoteBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.ahead('> ');
	}

	static parse(scanner, data) {
		scanner.skip(+2);
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();

		return new BlockquoteBlock(content);
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<blockquote>${content}</blockquote>`);
			}
		});
	}
}

exports.BlockquoteBlock = BlockquoteBlock;