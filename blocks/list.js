const {Block} = require('./block.js');
const {CharScanner} = require('../scanners/CharScanner.js');

// TODO: Integration needed

class ListItemBlock extends Block {
	constructor(isOrdered, indent, content) {
		super();

		this.items = items;
	}

	static match(scanner) {
		scanner.mark();
		scanner.skipLineSpaces();
		scanner.mark();

		const isOrdered = (() => {
			if (scanner.assert('*') || scanner.assert('-') || scanner.assert('+')) {
				scanner.skip(+1);

				if (scanner.assert(' ')) {
					scanner.skip(+1);
					return false;
				}
			} else {
				if (scanner.assert(lastBullet.trim() + ' ')) {
					scanner.skip(+2);

					const bullet = scanner.pop();

			if (!isNaN(scanner.currentChar)) {
				scanner.skip(+1);

				if (scanner.assert('. ')) {
					scanner.skip(+2);
					return true;
				}
			}

			scanner.reset();

		if (isOrdered === null) {
			scanner.return();
			scanner.return();
			return false;
		}

			items.push({
				indent: lastBullet.length - 2,
				content: scanner.pop()
			});

			scanner.skipLineEnds();
		}

		return items;
	}

	static parse(scanner, data) {
		return new ListItemBlock(data.isOrdered, data.indent, data.content);
	}
}

exports.BulletListBlock = BulletListBlock;