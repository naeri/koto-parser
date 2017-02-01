class BaseBlock {
	static match(scanner) {
		return null;
	}

	static parse(scanner, match, options) {
		return new BaseBlock();
	}

	render(options, callback) {
		callback(null, '');
	}

	static integrate(results, prev, curr) {
		results.push(curr);
	}
}

exports.BaseBlock = BaseBlock;