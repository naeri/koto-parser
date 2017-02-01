const {BaseBlock} = require('./base');
const Inline = require('../core/inline');

class BlockquoteBlock extends BaseBlock {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		return scanner.ahead('> ');
	}

	static parse(scanner, match, options) {
		scanner.skip(+2);
		scanner.mark();

		scanner.skipToLineEnd();
		const content = scanner.pop();
		const contentTokens = Inline.parse(content, options);

		return new BlockquoteBlock(contentTokens);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<blockquote>${content}</blockquote>`);
			}
		});
	}
}

exports.BlockquoteBlock = BlockquoteBlock;