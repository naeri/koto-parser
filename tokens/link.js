const {Token} = require('./token.js');

class LinkToken extends Token {
	constructor(title, href) {
		super();

		this.title = title;
		this.href = href;
	}

	static match(scanner) {
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

		const href = scanner.pop();

		return { title: title, href: href };
	}

	static parse(scanner, data) {
		return new LinkToken(data.title, data.href);
	}

	render(options, callback) {
		callback(null, `<a href="${this.href}">${this.title}</a>`)
	}
}

exports.LinkToken = LinkToken;