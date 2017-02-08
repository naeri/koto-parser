const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class ImageToken extends BaseToken {
	constructor(titleTokens, src) {
		super();

		this.titleTokens = titleTokens;
		this.src = src;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('!')) {
			return null;
		}

		scanner.skip(+1);

		if (!scanner.ahead('[')) {
			scanner.popAndBack();		// []
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, titleStart]

		if (!scanner.find(']')) {
			scanner.popAndBack();		// [start]
			scanner.popAndBack();		// []
			return null;
		}

		const title = scanner.pop(); 	// [start]

		if (!title || !scanner.find('(')) {
			scanner.popAndBack();		// []
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, srcStart]

		if (!scanner.find(')')) {
			scanner.popAndBack();		// [start]
			scanner.popAndBack();		// []
			return null;
		}

		const src = scanner.pop();		// [start]
		scanner.skip(+1);

		if (!src) {
			scanner.popAndBack();		// []
			return null;
		}

		return { title: title, src: src };
	}

	static parse(scanner, match, options) {
		const titleTokens = Inline.parse(match.title, options);
		const {src} = match;

		return new ImageToken(titleTokens, src);
	}

	render(options, callback) {
		Inline.render(this.titleTokens, options, (error, title) => {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<img title="${title}" src="${this.src}">`);
			}
		});
	}
}

exports.ImageToken = ImageToken;