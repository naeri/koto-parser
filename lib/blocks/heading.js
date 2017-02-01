const {BaseBlock} = require('./base');
const Inline = require('../core/inline');

class HeadingBlock extends BaseBlock {
	constructor(level, contentTokens) {
		super();

		this.level = level;
		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		return scanner.ahead('#');
	}

	static parse(scanner, match, options) {
		let level = 0;

		while (scanner.currentChar === '#') {
			level++;
			scanner.skip(+1);
		}

		if (level > 6) {
			level = 6;
		}

		scanner.skipLineSpaces();
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();
		const contentTokens = Inline.parse(content, options);

		return new HeadingBlock(level, contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, (error, content) => {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<h${this.level}>${content}</h${this.level}>`);
			}
		});
	}
}

exports.HeadingBlock = HeadingBlock;