const _first = require('lodash.first');
const _last = require('lodash.last');
const async = require('async');

const {BaseBlock} = require('./base');
const Inline = require('../core/inline');

class ListBlock extends BaseBlock {
	constructor(items, indentUnit) {
		super();

		this.items = items;
		this.indentUnit = (indentUnit || -1);

		this.startTag = this.firstItem.isOrdered ? '<ol>' : '<ul>';
		this.endTag = this.firstItem.isOrdered ? '</ol>' : '</ul>';
	}

	get firstItem() {
		return _first(this.items);
	}

	get lastItem() {
		return _last(this.items);
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

		async.reduce(this.items.concat([null]), ['', []], (result, item, callback) => {
			const itemRenderReady = (item !== null && item.indent === siblingIndent);
			const blockRenderReady = ((item === null || item.indent === siblingIndent) && result[1].length > 0);

			async.parallel([
				(callback) => {
					if (blockRenderReady) {
						new ListBlock(result[1], this.indentUnit).render(options, callback);
					} else {
						callback(null, null);
					}
				},
				function(callback) {
					if (itemRenderReady) {
						item.render(options, callback);
					} else {
						callback(null, null);
					}
				}
			], function(error, [renderedBlock, renderedItem]) {
				if (error) {
					callback(error, null);
					return;
				}

				if (renderedBlock !== null) {
					result[0] += renderedBlock;
					result[1] = [];
				}

				if (renderedItem !== null) {
					result[0] += ('</li><li>' + renderedItem);
				} else {
					result[1].push(item);
				}

				callback(null, result);
			});
		}, (error, result) => {
			if (error) {
				callback(error, null);
				return;
			}

			const items = result[0].substr('<li>'.length + 1) + '</li>';
			callback(null, this.startTag + items + this.endTag);
		});
	}
}

class ListItemBlock extends BaseBlock {
	constructor(isOrdered, indent, contentTokens) {
		super();

		this.isOrdered = isOrdered;
		this.indent = indent;
		this.contentTokens = contentTokens;
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

	static parse(scanner, match, options) {
		const {isOrdered, indent} = match;
		const contentTokens = Inline.parse(match.content, options);

		return new ListItemBlock(isOrdered, indent, contentTokens);
	}

	static integrate(results, prev, curr) {
		if (prev instanceof ListBlock && prev.isAppendable(curr)) {
			prev.append(curr);
		} else {
			results.push(new ListBlock([curr]));
		}
	}

	render(options, callback) {
		Inline.render(this.contentTokens, options, callback);
	}
}

exports.ListItemBlock = ListItemBlock;