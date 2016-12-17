const {Block} = require('./block.js');
const {CharScanner} = require('../scanners/CharScanner.js');

class IncludeBlock extends Block
{
	constructor(title, context)
	{
		super();

		this.title = title;
		this.context = context;
	}

	static match(scanner)
	{
		scanner.mark();

		// 여는 태그의 유효성 확인
		if (!scanner.assert('{{') || scanner.assert('{{{'))
		{
			scanner.return();
			return false;
		}

		scanner.skip(2);
		scanner.mark();

		// 닫는 태그의 유효성 확인
		if (!scanner.find('}}') || !CharScanner.isLineEnd(scanner.getCharAtOffset(+2)))
		{
			scanner.return();
			scanner.return();
			return false;
		}

		// 블록 내용 설정
		const content = scanner.pop();
		scanner.skip(+2);

		return { content: content };
	}

	static parse(scanner, data)
	{
		const params = data.content.split('|');

		const title = params[0].trim();
		const context = {};

		for (let i = 1; i < params.length; i++)
		{
			let param = params[i].split('=', 2);

			if (param.length === 2)
			{
				context[param[0].trim()] = param[1].trim();
			}
		}
		
		return new IncludeBlock(title, context);
	}
}

exports.IncludeBlock = IncludeBlock;