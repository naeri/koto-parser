const Promise = require('bluebird');
const {Block} = require('./block.js');

class BlockquoteBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert('>');
	}

	static parse(scanner, data) {
		scanner.skip(+1);
		scanner.skipLineSpaces();
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();

		return new BlockquoteBlock(content);
	}

	render() {
		return Promise.resolve('<blockquote>' + this.content + '</blockquote>');
	}
}

exports.BlockquoteBlock = BlockquoteBlock;