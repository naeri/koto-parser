const {Block} = require('./block.js');
const {CharScanner} = require('../scanners/CharScanner.js');

class CodeBlock extends Block {
	constructor(language, content) {
		super();

		this.language = language;
		this.content = content;
	}

	static match(scanner) {
		scanner.mark();

		// 여는 태그의 유효성 확인
		if (!scanner.assert('```') || scanner.assert('````')) {
			scanner.return();
			return false;
		}

		scanner.skip(+3);
		scanner.skipLineSpaces();

		// 언어 설정
		const data = {};

		if (!scanner.isAtLineEnd) {
			scanner.mark();
			scanner.skipToLineEnd();
			data['language'] = scanner.pop();
		}

		scanner.skipLineEnds();
		scanner.mark();

		// 닫는 태그의 유효성 확인
		if (!scanner.find('\n```') || !CharScanner.isLineEnd(scanner.getCharAtOffset(+4))) {
			scanner.return();
			scanner.return();
			return false;
		}

		// 코드 내용 설정
		data['content'] = scanner.pop();
		scanner.skip(+4)

		return data;
	}

	static parse(scanner, data) {
		return new CodeBlock(data.language, data.content);
	}
}

exports.CodeBlock = CodeBlock;