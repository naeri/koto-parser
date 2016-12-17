const {Block} = require('./block.js');

class HeadingBlock extends Block
{
	constructor(level, content)
	{
		super();

		this.level = level;
		this.content = content;
	}

	static match(scanner)
	{
		return scanner.assert('#');
	}

	static parse(scanner, data)
	{
		let level = 1;
		scanner.skip(+1);

		while (scanner.currentChar === '#') {
			level++;
			scanner.skip(+1);
		}

		if (level > 3) {
			level = 3;
		}
		
		scanner.skipLineSpaces();
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();

		return new HeadingBlock(level, content);
	}
}

exports.HeadingBlock = HeadingBlock;