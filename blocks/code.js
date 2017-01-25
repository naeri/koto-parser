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
			return null;
		}

		scanner.pop();
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
		while (scanner.find('\n```')) {
			if (!CharScanner.isLineEnd(scanner.getCharAtOffset(+4))) {
				continue;
			}

			// 코드 내용 설정
			data['content'] = scanner.pop();
			scanner.skip(+4)

			return data;
		}

		scanner.return();
		return null;
	}

	static parse(scanner, data) {
		return new CodeBlock(data.language, data.content);
	}

	render(options, callback) {
		callback(null, `<pre class="lang-${this.language}"><code>${this.content}</code></pre>`)
	}
}

exports.CodeBlock = CodeBlock;