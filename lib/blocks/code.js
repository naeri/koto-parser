const _escape = require('lodash.escape');
const {BaseBlock} = require('./base');
const {isLineEnd} = require('../util/scanner');

class CodeBlock extends BaseBlock {
	constructor(language, content) {
		super();

		this.language = language;
		this.content = content;
	}

	static match(scanner) {
		scanner.mark();

		// 여는 태그의 유효성 확인
		if (!scanner.ahead('```') || scanner.ahead('````')) {
			scanner.popAndBack();
			return null;
		}

		scanner.pop();
		scanner.skip(+3);
		scanner.skipLineSpaces();

		const data = { language: 'text', content: null };

		// 언어 설정
		if (!scanner.isAtLineEnd) {
			scanner.mark();
			scanner.skipToLineEnd();
			data['language'] = scanner.pop();
		}

		scanner.skipLineEnds();
		scanner.mark();

		// 닫는 태그의 유효성 확인
		while (scanner.find('\n```')) {
			if (!isLineEnd(scanner.getCharAtOffset(+4))) {
				scanner.skip(+4);
				continue;
			}

			// 코드 내용 설정
			data['content'] = scanner.pop();
			scanner.skip(+4);

			return data;
		}

		scanner.popAndBack();
		return null;
	}

	static parse(scanner, match, options) {
		return new CodeBlock(match.language, match.content);
	}

	render(options, callback) {
		let result  = `<pre class="lang-${this.language}">`;
			result +=	`<code>${_escape(this.content)}</code>`;
			result += '</pre>';

		callback(null, result);
	}
}

exports.CodeBlock = CodeBlock;