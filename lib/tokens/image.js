const {Token} = require('./token.js');

class ImageToken extends Token {
	constructor(title, src) {
		super();

		this.title = title;
		this.src = src;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('!')) {
			return null;
		}

		scanner.skip(+1);

		if (!scanner.ahead('[')) {
			scanner.popAndBack();
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, titleStart]

		if (!scanner.find(']')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		const title = scanner.pop(); 	// [start]

		if (!scanner.find('(')) {
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, srcStart]

		if (!scanner.find(')')) {
			scanner.popAndBack();
			scanner.popAndBack();
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