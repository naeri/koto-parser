class Token {
	static match(scanner) {
		return null;
	}

	static parse(scanner, data) {
		return new Token();
	}

	render() {
		return Promise.resolve('');
	}
}

exports.Token = Token;