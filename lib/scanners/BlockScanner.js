const _ = require('lodash');
const async = require('async');
const {CharScanner} = require('./CharScanner.js');
const {matchType} = require('./matchType.js');

class BlockScanner extends CharScanner {
	constructor(buffer, options) {
		super(buffer, options);

		this.blocks = [];
	}

	parse() {
		while (!this.isAtEnd) {
			const match = matchType(this, this.options.blockTypes);

			const block = match.type.parse(this, match.data);
			this.popAll();

			this.skipLineEnds();

			this.blocks.push(block);
		}

		this._integrate();

		return this;
	}

	_integrate() {
		const results = [];

		this.blocks.forEach((curr, index) => {
			curr.constructor.integrate(results, _.last(results), curr);
		});

		this.blocks = results;
	}

	render(callback) {
		async.map(this.blocks, (block, callback) => {
			block.render(this.options, callback);
		}, function(error, blocks) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, blocks.join(''));
			}
		});
	}

	static parseAndRender(buffer, options, callback) {
		new BlockScanner(buffer, options).parse().render(callback);
	}
}

exports.BlockScanner = BlockScanner;