const {Block} = require('./block.js');
const {CharScanner} = require('../scanners/CharScanner.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

class ParagraphBlock extends Block {
	constructor(content, isLastContent) {
		super();

		this.content = content;
		this.isLastContent = isLastContent;
	}

	static parse(scanner) {
		scanner.mark();
		scanner.skipToLineEnd();
		const content = scanner.pop();

		const isLastContent = (
			scanner.isAtEnd ||
			CharScanner.isLineEnd(scanner.getCharAtOffset(+1))
		);

		return new ParagraphBlock(content, isLastContent);
	}

	static integrate(results, prev, curr) {
		if (prev instanceof ParagraphBlock && !prev.isLastContent) {
			prev.content += (' ' + curr.content);
			prev.isLastContent = curr.isLastContent;
		} else {
			results.push(curr);
		}
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