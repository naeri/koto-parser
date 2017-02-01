const {BaseToken} = require('./base');
const Inline = require('../core/inline');

class LinkToken extends BaseToken {
	constructor(titleTokens, href) {
		super();

		this.titleTokens = titleTokens;
		this.href = href;
	}

	static match(scanner) {
		scanner.mark();					// [start]

		if (!scanner.ahead('[')) {
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, titleStart]

		if (!scanner.find(']')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		const title = scanner.pop();	// [start]

		if (!scanner.find('(')) {
			scanner.popAndBack();
			return null;
		}

		scanner.skip(+1);
		scanner.mark();					// [start, hrefStart]

		if (!scanner.find(')')) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		const href = scanner.pop();

		return { title: title, href: href };
	}

	static parse(scanner, match, options) {
		const titleTokens = Inline.parse(match.title, options);
		const {href} = match;

		return new LinkToken(titleTokens, href);
	}

	render(options, callback) {
		Inline.render(this.titleTokens, options, (error, title) => {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<a href="${this.href}">${title}</a>`);
			}
		});
	}
}

exports.LinkToken = LinkToken;