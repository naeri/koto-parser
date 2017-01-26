const async = require('async');
const {Block} = require('./block.js');

function integrate(results, prev, curr) {
	if (prev instanceof DefinitionBlock) {
		prev.add(curr);
	} else {
		results.push(new DefinitionBlock(curr));
	}
}

class DefinitionBlock extends Block {
	constructor(firstItem) {
		super();

		this.items = [firstItem];
	}

	add(item) {
		this.items.push(item);
	}

	render(options, callback) {
		async.map(this.items, function(item, callback) {
			item.render(options, callback);
		}, function(error, items) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, '<dl>' + items.join('') + '</dl>');
			}
		});
	}
}

class TermBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert('; ');
	}

	static parse(scanner, data) {
		scanner.skip(2);
		scanner.mark();

		while (!scanner.isAtLineEnd && !scanner.assert(': ')) {
			scanner.skip(1);
		}

		return new TermBlock(scanner.pop());
	}

	static integrate(results, prev, curr) {
		integrate(results, prev, curr);
	}

	render(options, callback) {
		callback(null, `<dt>${this.content}</dt>`)
	}
}

class DescriptionBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.assert(': ');
	}

	static parse(scanner, data) {
		scanner.skip(2);

		scanner.mark();
		scanner.skipToLineEnd();

		return new DescriptionBlock(scanner.pop());
	}

	static integrate(results, prev, curr) {
		integrate(results, prev, curr);
	}

	render(options, callback) {
		callback(null, `<dd>${this.content}</dd>`)
	}
}

exports.TermBlock = TermBlock;
exports.DescriptionBlock = DescriptionBlock;