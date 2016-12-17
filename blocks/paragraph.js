const Promise = require('bluebird');
const {Block} = require('./block.js');

class ParagraphBlock extends Block
{
	constructor(content)
	{
		super();

		this.content = content;
	}

	static match(scanner)
	{
		return true;
	}

	static parse(scanner)
	{
		scanner.mark();
		scanner.skipToLineEnd();
		return new ParagraphBlock(scanner.pop());
	}

	render()
	{
		return Promise.resolve('<p>' + this.content + '</p>');
	}
}

exports.ParagraphBlock = ParagraphBlock;