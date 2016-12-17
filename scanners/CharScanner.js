const POR = new Error('Position out of range.');

class CharScanner
{
	constructor(buffer)
	{
		this.buffer = buffer.split('\r\n').join('\n')
										 .split('\r').join('\n');
		this.position = 0;
		this.markers = [];
	}

	get length()
	{
		return this.buffer.length;
	}

	get currentChar()
	{
		return this.getCharAtOffset(0);
	}

	getCharAt(position)
	{
		if (position === this.length)
		{
			return '\0';
		}
		else
		{
			return this.buffer[position];
		}
	}

	getCharAtOffset(offset)
	{
		let position = this.position + offset;

		if (position < 0 || position > this.length)
		{
			throw POR;
		}
		
		return this.getCharAt(position);
	}

	assert(string)
	{
		return (this.buffer.substr(this.position, string.length) === string);
	}

	get isAtEnd()
	{
		return (this.position === this.length);
	}

	get isAtLineEnd()
	{
		return CharScanner.isLineEnd(this.currentChar);
	}

	mark(position)
	{
		if (position === undefined)
		{
			position = this.position;
		}
		else if (position < 0 || position > this.length)
		{
			throw POR;
		}

		this.markers.push(position);
	}

	reset()
	{
		this.markers = [];
	}

	pop()
	{
		const marker = this.markers.pop();

		if (marker < this.position)
		{
			return this.buffer.substring(marker, this.position);
		}
		else if (marker > this.position)
		{
			return this.buffer.substring(this.position, marker);
		}
		else
		{
			return '';
		}
	}

	return()
	{
		this.position = this.markers.pop();
	}

	skip(length)
	{
		let position = this.position + length;

		if (position < 0 || position > this.length)
		{
			throw POR;
		}

		this.position += length;
	}

	skipLineSpaces()
	{
		while (CharScanner.isLineSpace(this.currentChar))
		{
			this.skip(+1)
		}
	}

	skipToLineEnd()
	{
		while (!this.isAtEnd && !this.isAtLineEnd)
		{
			this.skip(+1);
		}
	}

	skipLineEnds()
	{
		while (!this.isAtEnd && this.isAtLineEnd)
		{
			this.skip(+1);
		}
	}

	find(char)
	{
		const foundAt = this.buffer.indexOf(char, this.position);

		if (foundAt >= 0)
		{
			this.position = foundAt;
			return true;
		}

		return false;
	}

	static isLineSpace(char)
	{
		return (char === ' ' || char === '\t');
	}

	static isLineEnd(char)
	{
		return (char === '\n' || char === '\0');
	}
}

exports.CharScanner = CharScanner;