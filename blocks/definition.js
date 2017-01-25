const {Block} = require('./block.js');

// TODO: Integration needed

class TermBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert('; ');
	}

	static parse(scanner, data) {
		scanner.skip(2);
		scanner.mark();

		while (!scanner.isAtLineEnd && !scanner.assert(': ')) {
			scanner.skip(1);
		}

		return new TermBlock(scanner.pop());
	}
}

class DescriptionBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert(': ');
	}

	static parse(scanner, data) {
		scanner.skip(2);

		scanner.mark();
		scanner.skipToLineEnd();

		return new DescriptionBlock(scanner.pop());
	}
}

exports.TermBlock = TermBlock;
exports.DescriptionBlock = DescriptionBlock;