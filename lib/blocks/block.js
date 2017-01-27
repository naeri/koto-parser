class Block {
	static match(scanner) {
		return null;
	}

	static parse(scanner, data) {
		return new Block();
	}

	render(options, callback) {
		callback(null, '');
	}

	static integrate(results, prev, curr) {
		results.push(curr);
	}
}

exports.Block = Block;