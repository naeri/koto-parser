function parseAndRender(scannerType, ...args) {
	const scanner = new (Function.prototype.bind.apply(scannerType, args));
	scanner.parse();
	return scanner.render();
}

function matchType(types, scanner) {
	for (let i = 0; i < types.length; i++) {
		const type = types[i];

		const result = type.match(scanner);
		scanner.reset();

		if (result) {
			return { type: type, data: result };
		}
	}
}

exports.parseAndRender = parseAndRender;
exports.matchType = matchType;