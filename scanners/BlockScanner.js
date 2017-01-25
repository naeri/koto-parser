const async = require('async');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./shorthands');

class BlockScanner extends CharScanner {
	constructor(buffer, blockTypes) {
		super(buffer);

		this.blockTypes = blockTypes;
		this.blocks = [];
	}

	parse() {
		while (!this.isAtEnd) {
			const match = matchType(this.blockTypes, this);

			const block = match.type.parse(this, match.data);
			this.skipLineEnds();
			this.reset();

			this.blocks.push(block);
		}

		this.integrate();
	}

	integrate() {
		const results = [];

		this.blocks.forEach((block, index) => {
			results = block.constructor.integrate(results, block, this.blocks[index]);
		});

		this.blocks = results;
	}

	render(callback) {
		async.map(this.blocks, function(block, callback) {
			block.render(callback);
		}, callback);
	}
}

exports.BlockScanner = BlockScanner;