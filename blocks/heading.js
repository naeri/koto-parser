const {Block} = require('./block.js');

class HeadingBlock extends Block {
	constructor(level, content) {
		super();

		this.level = level;
		this.content = content;
	}

	static match(scanner) {
		return scanner.ahead('#');
	}

	static parse(scanner, data) {
		let level = 0;

		while (scanner.currentChar === '#') {
			level++;
			scanner.skip(+1);
		}

		if (level > 6) {
			level = 6;
		}

		scanner.skipLineSpaces();
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();

		return new HeadingBlock(level, content);
	}

	render(options, callback) {
		callback(null, `<h${this.level}>${this.content}</h${this.level}>`);
	}
}

exports.HeadingBlock = HeadingBlock;