class Block {
	constructor() {
	}

	static match(scanner) {
		return false;
	}

	static parse(scanner, data) {
		return new Block();
	}

	render() {
		return Promise.resolve('');
	}
}

exports.Block = Block;