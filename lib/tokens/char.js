const {Token} = require('./token.js');

class CharToken extends Token {
    constructor(content) {
        super();

        this.content = content;
    }

    static match(scanner) {
        return true;
    }

    static parse(scanner, data) {
        return new CharToken(scanner.currentChar);
    }

    render(options, callback) {
        callback(null, this.content);
    }
}

exports.CharToken = CharToken;