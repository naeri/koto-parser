const _ = require('lodash');
const async = require('async');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./shorthands');

class BlockScanner extends CharScanner {
	constructor(buffer, blockTypes, options) {
		super(buffer);

		this.blockTypes = blockTypes;
		this.options = options;

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

		this.blocks.forEach((curr, index) => {
			curr.constructor.integrate(results, _.last(results), curr);
		});

		this.blocks = results;
	}

	render(callback) {
		async.map(this.blocks, (block, callback) => {
			block.render(this.options, callback);
		}, callback);
	}
}

exports.BlockScanner = BlockScanner;