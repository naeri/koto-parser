const {Block} = require('./block.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

class ParagraphBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return true;
	}

	static parse(scanner) {
		scanner.mark();
		scanner.skipToLineEnd();
		return new ParagraphBlock(scanner.pop());
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<p>${content}</p>`);
			}
		});
	}
}

exports.ParagraphBlock = ParagraphBlock;