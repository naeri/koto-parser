class Token {
	static match(scanner) {
		return null;
	}

	static parse(scanner, data) {
		return new Token();
	}

	render(options, callback) {
		callback(null, '');
	}
}

exports.Token = Token;