const {Block} = require('./block.js');
const {CharScanner} = require('../scanners/CharScanner.js');

class BulletListBlock extends Block {
	constructor(items) {
		super();

		this.items = items;
	}

	static match(scanner) {
		const items = [];

		let lastBullet = null;
		let relativeIndent = 0;

		while (!scanner.isAtEnd) {
			scanner.mark();

			scanner.mark();
			scanner.skipLineSpaces();

			if (lastBullet === null) {
				if (scanner.assert('* ') || scanner.assert('- ') || scanner.assert('+ ')) {
					scanner.skip(+2);
					lastBullet = scanner.pop();
				} else {
					scanner.return();
					return null;
				}
			} else {
				if (scanner.assert(lastBullet.trim() + ' ')) {
					scanner.skip(+2);

					const bullet = scanner.pop();

					if (bullet.length > lastBullet.length) {
						relativeIndent++;
					} else if (bullet.length < lastBullet.length) {
						relativeIndent--;
					}

					if (relativeIndent < 0) {
						scanner.return();
						return items;
					}

					lastBullet = bullet;
				} else {
					scanner.return();
					return items;
				}
			}

			scanner.reset();

			scanner.mark();
			scanner.skipToLineEnd();

			items.push({
				indent: lastBullet.length - 2,
				content: scanner.pop()
			});

			scanner.skipLineEnds();
		}

		return items;
	}

	static parse(scanner, data) {
		const items = [];

		data.forEach(function (item, index) {
			if (index === 0 || items[items.length - 1][0].indent !== item.indent) {
				items.push([item]);
			} else {
				items[items.length - 1].push(item);
			}
		});

		return new BulletListBlock(items);
	}
}

exports.BulletListBlock = BulletListBlock;