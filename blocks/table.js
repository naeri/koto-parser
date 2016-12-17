const {Block} = require('./block.js');

class TableRowBlock extends Block
{
	constructor()
	{
		super();
	}

	static match(scanner)
	{
		if (['|', '^'].indexOf(scanner.currentChar) < 0)
		{
			return false;
		}

		scanner.mark();
		scanner.skipToLineEnd();

		if (['|', '^'].indexOf(scanner.getCharAtOffset(-1)) < 0)
		{
			scanner.return();
			return false;
		}

		return { content: scanner.pop() };
	}

	static parse(scanner, data)
	{
		const block = new TableRowBlock();
		block.children = [];

		return block;
	}
}

exports.TableRowBlock = TableRowBlock;