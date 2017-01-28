const _ = require('lodash');
const async = require('async');
const {Block} = require('./block.js');
const {InlineScanner} = require('../scanners/InlineScanner.js');

class ListBlock extends Block {
	constructor(items, indentUnit) {
		super();

		this.items = items;
		this.indentUnit = (indentUnit || -1);

		this.startTag = this.firstItem.isOrdered ? '<ol>' : '<ul>';
		this.endTag = this.firstItem.isOrdered ? '</ol>' : '</ul>';
	}

	get firstItem() {
		return _.first(this.items);
	}

	get lastItem() {
		return _.last(this.items);
	}

	append(item) {
		if (this.indentUnit === -1) {
			this.indentUnit = Math.abs(this.lastItem.indent - item.indent);
		}

		this.items.push(item);
	}

	isAppendable(item) {
		// When dedented than the first item
		if (this.firstItem.indent > item.indent) {
			return false;
		}

		// When the indentation is the same as the last item
		if (this.lastItem.indent === item.indent) {
			// Whether the list type (bullet/ordered) is also the same 
			return (this.lastItem.isOrdered === item.isOrdered);
		}

		// When no children appended yet
		if (this.indentUnit === -1) {
			return true;
		}

		// Get the difference of the indentation level
		const subIndent = item.indent - this.lastItem.indent;

		if (subIndent > 0) {
			// Only one level can be indented
			return (subIndent === this.indentUnit);
		} else {
			// Multiple levels can be dedented
			return (Math.abs(subIndent) % this.indentUnit === 0);
		}
	}

	render(options, callback) {
		const siblingIndent = this.items[0].indent;
		const items = [];

		this.items.forEach((item) => {
			if (item.indent === siblingIndent) {
				items.push(item);
			} else {
				const lastItem = _.last(items);

				if (_.isArray(lastItem)) {
					lastItem.push(item);
				} else {
					items.push([item]);
				}
			}
		});

		async.map(items, (item, callback) => {
			if (_.isArray(item)) {
				item = new ListBlock(item, this.indentUnit);
			}

			item.render(options, callback);
		}, (error, items) => {
			if (error) {
				callback(error, null);
			} else {
				items = this.startTag + items.join('') + this.endTag;
				callback(null, items);
			}
		});
	}
}

class ListItemBlock extends Block {
	constructor(isOrdered, indent, content) {
		super();

		this.isOrdered = isOrdered;
		this.indent = indent;
		this.content = content;
	}

	static match(scanner) {
		scanner.mark();

		scanner.skipLineSpaces();
		scanner.mark();

		const isOrdered = (() => {
			if (scanner.ahead('*') || scanner.ahead('-') || scanner.ahead('+')) {
				scanner.skip(+1);

				if (scanner.ahead(' ')) {
					scanner.skip(+1);
					return false;
				}

				return null;
			}

			if (!isNaN(scanner.currentChar)) {
				scanner.skip(+1);

				if (scanner.ahead('. ')) {
					scanner.skip(+2);
					return true;
				}
			}

			return null;
		})();

		if (isOrdered === null) {
			scanner.popAndBack();
			scanner.popAndBack();
			return null;
		}

		scanner.mark();
		scanner.skipToLineEnd();

		const content = scanner.pop();
		const indent = -(scanner.pop().length - scanner.pop().length);

		return {
			isOrdered: isOrdered,
			indent: indent,
			content: content
		};
	}

	static parse(scanner, data) {
		return new ListItemBlock(data.isOrdered, data.indent, data.content);
	}

	static integrate(results, prev, curr) {
		if (prev instanceof ListBlock && prev.isAppendable(curr)) {
			prev.append(curr);
		} else {
			results.push(new ListBlock([curr]));
		}
	}

	render(options, callback) {
		InlineScanner.parseAndRender(this.content, options, function(error, content) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, `<li>${content}</li>`);
			}
		});
	}
}

exports.ListItemBlock = ListItemBlock;