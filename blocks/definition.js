const async = require('async');
const {Block} = require('./block.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

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
		return scanner.ahead('; ');
	}

	static parse(scanner, data) {
		scanner.skip(2);

		scanner.mark();
		scanner.find(': ');

		return new TermBlock(scanner.pop());
	}

	static integrate(results, prev, curr) {
		integrate(results, prev, curr);
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<dt>${content}</dt>`);
			}
		});
	}
}

class DescriptionBlock extends Block {
	constructor(content) {
		super();

		this.content = content;
	}

	static match(scanner) {
		return scanner.ahead(': ');
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
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<dd>${content}</dd>`);
			}
		});
	}
}

exports.TermBlock = TermBlock;
exports.DescriptionBlock = DescriptionBlock;