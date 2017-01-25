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

	static integrate(results, curr, next) {
		results.push(curr);
		return results;
	}
}

exports.Block = Block;