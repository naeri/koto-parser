const positionError = new Error('Position out of range.');

class Scanner {
	/**
	 * The input markdown text is browsable only through the scanner object.
	 * @class
	 * @param {string} buffer
	 */
	constructor(buffer) {
		/**
		 * The original markdown text input
		 * @member {string}
		 */
		this.buffer = buffer.replace(/\r\n?/g, '\n');

		/**
		 * The index of where the scanner is currently reading
		 * @member {number}
		 */
		this.position = 0;

		/**
		 * The stack of positions marked by {@link Scanner#mark}
		 * @member {number}
		 */
		this.markers = [];
	}

	/**
	 * The length of the input text
	 * @member {number}
	 */
	get length() {
		return this.buffer.length;
	}

	/**
	 * The character the scanner is currently reading
	 * @member {string}
	 */
	get currentChar() {
		return this.getCharAtOffset(0);
	}

	/**
	 * Get the character by its position
	 * @method
	 * @param {number} position
	 * @returns {string}
	 */
	getCharAt(position) {
		if (position === this.length) {
			return '\0';
		} else {
			return this.buffer[position];
		}
	}

	/**
	 * Get the character by its relative position from current position
	 * @method
	 * @param {number} offset
	 * @returns {string}
	 * @example
	 * // returns the character right behind
	 * getCharAtOffset(-1)
	 */
	getCharAtOffset(offset) {
		let position = this.position + offset;

		if (position < 0 || position > this.length) {
			throw positionError;
		}

		return this.getCharAt(position);
	}

	/**
	 * Compare the given substring with the current character and the characters ahead of it
	 * @method
	 * @param {string} substring
	 * @returns {boolean}
	 */
	ahead(substring) {
		return (this.buffer.substr(this.position, substring.length) === substring);
	}

	/**
	 * Whether the scanner is reading the very first character of the input
	 * @member {boolean}
	 */
	get isAtBegin() {
		return (this.position == 0);
	}

	/**
	 * Whether the scanner is reading the very last character of the input
	 * @member {boolean}
	 */
	get isAtEnd() {
		return (this.position === this.length);
	}

	/**
	 * Whether the scanner is reading the end-of-line or end-of-file
	 * @member {boolean}
	 */
	get isAtLineEnd() {
		return Scanner.isLineEnd(this.currentChar);
	}

	/**
	 * Mark current position
	 * @method
	 */
	mark() {
		this.markers.push(this.position);
	}

	/**
	 * Get the substring between the current position and the last marked position
	 * @method
	 * @returns {string}
	 */
	pop() {
		const marker = this.markers.pop();

		if (marker < this.position) {
			return this.buffer.substring(marker, this.position);
		}
		else if (marker > this.position) {
			return this.buffer.substring(this.position, marker);
		}
		else {
			return '';
		}
	}

	/**
	 * Move back to the last marked position
	 * @method
	 */
	popAndBack() {
		this.position = this.markers.pop();
	}

	/**
	 * Clear all marked positions
	 * @method
	 */
	popAll() {
		this.markers = [];
	}

	/**
	 * Move scanner position by given length.
	 * Use positive numbers for moving forward, and negative numbers for backward.
	 * @method
	 * @param {number} length
	 */
	skip(length) {
		let position = this.position + length;

		if (position < 0 || position > this.length) {
			throw positionError;
		}

		this.position += length;
	}

	/**
	 * Skip whitespaces if they exist immediately right ahead
	 * @method
	 */
	skipLineSpaces() {
		while (Scanner.isLineSpace(this.currentChar)) {
			this.skip(+1)
		}
	}

	/**
	 * Skip line breaks if they exist immediately right ahead
	 * @method
	 */
	skipLineEnds() {
		while (!this.isAtEnd && this.isAtLineEnd) {
			this.skip(+1);
		}
	}

	/**
	 * Move scanner forward until the whitespace character comes out
	 * @method
	 */
	skipToLineEnd() {
		while (!this.isAtEnd && !this.isAtLineEnd) {
			this.skip(+1);
		}
	}

	/**
	 * Find and move to the nearest given substring ahead
	 * @method
	 * @param {string} substring
	 * @returns {boolean} Whether the scanner found the substring
	 */
	find(substring) {
		const foundAt = this.buffer.indexOf(substring, this.position);

		if (foundAt >= 0) {
			this.position = foundAt;
			return true;
		}

		return false;
	}

	/**
	 * Check if the given character is a whitespace
	 * @static
	 * @param {string} char
	 * @returns {boolean}
	 */
	static isLineSpace(char) {
		return (char === ' ' || char === '\t');
	}

	/**
	 * Check if the given character is an end-of-line or an end-of-file
	 * @static
	 * @param {string} char
	 * @returns {boolean}
	 */
	static isLineEnd(char) {
		return (char === '\n' || char === '\0');
	}
}

module.exports = Scanner;