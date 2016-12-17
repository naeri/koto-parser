const Promise = require('bluebird');
const {CharScanner} = require('./CharScanner.js');

class BlockScanner extends CharScanner
{
	constructor(buffer, blockTypes)
	{
		super(buffer);

		this.blockTypes = blockTypes;
		this.blocks = [];
	}

	parse()
	{
		while (!this.isAtEnd)
		{
			const match = this.matchBlockType();
			
			const block = match.type.parse(this, match.data);
			this.skipLineEnds();
			this.reset();

			this.blocks.push(block);
		}

		//this.integrate();
	}

	render()
	{
		return Promise.map(this.blocks, function(block) {
			return block.render();
		}).then(function(results) {
			return results.join('');
		});
	}

	matchBlockType()
	{
		for (let i = 0; i < this.blockTypes.length; i++)
		{
			const blockType = this.blockTypes[i];

			const result = blockType.match(this);
			this.reset();

			if (result)
			{
				return { type: blockType, data: result };
			}
		}
	}
}

exports.BlockScanner = BlockScanner;