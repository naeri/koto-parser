class BaseToken {
	static match(scanner) {
		return null;
	}

	static parse(scanner, data) {
		return new BaseToken();
	}

	render(options, callback) {
		callback(null, '');
	}
}

exports.BaseToken = BaseToken;