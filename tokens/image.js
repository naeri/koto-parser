const {Token} = require('./token.js');

class ImageToken extends Token {
	constructor(title, src) {
		super();

		this.title = title;
		this.src = src;
	}

	static match(scanner) {
		if (!scanner.ahead('!')) {
			return null;
		}

		if (!scanner.ahead('[')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find(']')) {
			return null;
		}

		const title = scanner.pop();

		if (!scanner.find('(')) {
			return null;
		}

		scanner.mark();

		if (!scanner.find(')')) {
			return null;
		}

		const src = scanner.pop();

		return { title: title, src: src };
	}

	static parse(scanner, data) {
		return new ImageToken(data.title, data.src);
	}

	render(options, callback) {
		callback(null, `<img title="${this.title}" src="${this.src}">`)
	}
}

exports.ImageToken = ImageToken;