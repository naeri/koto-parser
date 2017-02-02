# Plugin Development Guide

This documentation explains how the parser works and the rendering is processed,
so that the reader can clearly understand the mechanism behind the plugin development.

It is strongly recommended to read this documentation *before* directly jumping into

- [How to Write a Block Plugin](/doc/plugin_block.md) or
- [How to Write a Token/Inline Plugin](/doc/plugin_token.md).

## Basic Concepts

### Block

After the parsing process, KotoParser returns an array of *block*s.
Each block represents the corresponding part of the original markdown text.

For example, the following markdown text ..

```markdown
A paragraph is here.

> This is a blockquote, not just a plain paragraph.

Another plain paragraph here.
```

.. is parsed into the following array of the *block*s.

```javascript
[ ParagraphBlock { ... },
  BlockquoteBlock { ... },
  ParagraphBlock { ... } ]
```

### Token

Then what is a *token*?

Usually, every block has its content.
If the content needs to be parsed and rendered separately,
the block can store its content in the form of *token*s.

For example, a paragraph block may contain a link, a strikethrough, or any other inline syntax.
So the built-in paragraph block implementation has a member named `contentTokens` in it.

The following paragraph ..

```markdown
This is a paragraph *with* a [link](http://www.google.com/).
```

.. is parsed into the following block.

```javascript
ParagraphBlock {
    contentTokens: [
        TextToken   { /* This token is a plain 'This is a paragraph ' */ },
        ItalicToken { /* This token is an italic 'with' */ },
        TextToken   { /* This token is a plain ' a ' */ },
        LinkToken   { /* This token is a link to Google */ },
        TextToken   { /* This token is a plain '.' */ }
    ]
}
```

### Matching and Parsing

Parsing in KotoParser is actually a combination of three different behaviors: *matching*, *parsing*, and *integration*.

- While *matching*, the plugin decides whether the substring is parsable by it.
- If then, the actual *parsing* is started, and the substring is instantiated into a block or token object.
- After all the input text is parsed, the plugin can *integrate* some of the blocks or tokens into another block(s) or token(s).

Though, the integration process is often skipped.

## Writing a plugin

First, you have to decide the plugin's type.

### What is my plugin's type - block or token?

The biggest difference between the block and the token lies in the possibility of nesting.

- The blocks are *not* nested,
- but the tokens *are* nested.

Actually, blocks *can* be nested if you want, but not in the built-in implementations.

### Writing a block plugin

See [How to Write a Block Plugin](/doc/plugin_block.md).

### Writing a token/inline plugin

See [How to Write a Token/Inline Plugin](/doc/plugin_token.md).