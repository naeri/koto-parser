const async = require('async');
const {BaseBlock} = require('./base');
const Inline = require('../core/inline');

function integrate(results, prev, curr) {
	if (prev instanceof DefinitionBlock) {
		prev.append(curr);
	} else {
		results.push(new DefinitionBlock(curr));
	}
}

class DefinitionBlock extends BaseBlock {
	constructor(firstItem) {
		super();

		this.items = [firstItem];
	}

	append(item) {
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

class TermBlock extends BaseBlock {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		return scanner.ahead('; ');
	}

	static parse(scanner, match, options) {
		scanner.skip(2);

		scanner.mark();
		scanner.find(': ');
		const content = scanner.pop();
		const contentTokens = Inline.parse(content, options);

		return new TermBlock(contentTokens);
	}

	static integrate(results, prev, curr) {
		integrate(results, prev, curr);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<dt>${content}</dt>`);
			}
		});
	}
}

class DescriptionBlock extends BaseBlock {
	constructor(contentTokens) {
		super();

		this.contentTokens = contentTokens;
	}

	static match(scanner) {
		return scanner.ahead(': ');
	}

	static parse(scanner, match, options) {
		scanner.skip(2);

		scanner.mark();
		scanner.skipToLineEnd();
		const content = scanner.pop();
		const contentTokens = Inline.parse(content, options);

		return new DescriptionBlock(contentTokens);
	}

	static integrate(results, prev, curr) {
		integrate(results, prev, curr);
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, function(error, content) {
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