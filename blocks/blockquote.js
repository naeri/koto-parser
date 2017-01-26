const {Block} = require('./block.js');

class BlockquoteBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert('> ');
	}

	static parse(scanner, data) {
		scanner.skip(+2);
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();

		return new BlockquoteBlock(content);
	}

	render(options, callback) {
		callback(null, `<blockquote>${this.content}</blockquote>`);
	}
}

exports.BlockquoteBlock = BlockquoteBlock;