const {BaseBlock} = require('./base');
const Scanner = require('../util/scanner.js');
const Inline = require('../core/inline');

class HeadingBlock extends BaseBlock {
	constructor(level, contentTokens) {
		super();

		this.level = level;
		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		scanner.mark();							// [start]

		let level = 0;

		while (scanner.currentChar === '#') {
			level++;
			scanner.skip(+1);

			if (level === 6) {
				break;
			}
		}

		if (level === 0 || !Scanner.isLineSpace(scanner.currentChar)) {
			scanner.popAndBack();				// []
			return null;
		}

		return level;
	}

	static parse(scanner, match, options) {
		scanner.skipLineSpaces();

		scanner.mark();
		scanner.skipToLineEnd();
		const content = scanner.pop();

		const contentTokens = Inline.parse(content, options);
		return new HeadingBlock(match, contentTokens);
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