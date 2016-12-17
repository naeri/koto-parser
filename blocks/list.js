const {Block} = require('./block.js');

class ListItemBlock extends Block
{
	constructor(isOrdered, indent, content)
	{
		super();

		this.isOrdered = isOrdered;
		this.indent = indent;
		this.content = content;
	}

	static match(scanner)
	{
		scanner.mark();
		scanner.skipLineSpaces();
		scanner.mark();

		const isOrdered = (() => {
			if (scanner.assert('*') || scanner.assert('-') || scanner.assert('+'))
			{
				scanner.skip(+1);

				if (scanner.assert(' '))
				{
					scanner.skip(+1);
					return false;
				}

				return null;
			}

			if (!isNaN(scanner.currentChar))
			{
				scanner.skip(+1);

				if (scanner.assert('. '))
				{
					scanner.skip(+2);
					return true;
				}
			}

			return null;
		})();

		if (isOrdered === null)
		{
			scanner.return();
			scanner.return();
			return false;
		}

		scanner.mark();
		scanner.skipToLineEnd();

		const content = scanner.pop();
		const indent = -(scanner.pop().length - scanner.pop().length);

		return {
			isOrdered: isOrdered,
			indent: indent,
			content: content
		};
	}

	static parse(scanner, data)
	{
		return new ListItemBlock(data.isOrdered, data.indent, data.content);
	}
}

exports.ListItemBlock = ListItemBlock;