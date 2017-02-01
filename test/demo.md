<div style="text-align: center">
![Logo](images/logo.png)
</div>

# KotoParser
**KotoParser** is a fast, easily-extensible asynchronous Kotodown parser. This document shows how KotoParser can be used in various situations.

# Block-level grammar

## Paragraph
A paragraph can be separated by a blank line. Without a blank line, the paragraph will continue, and the newline will be ignored. If you want to make a line break in the paragraph, use `<br>`.

## Heading
Heading starts with a sharp(#) in the front of the line. As the number of sharps increases, the heading gets smaller. Check how a heading can be wrote below:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Definition List
In KotoParser, a definition list can be written in MediaWiki-style, i.e.

; Term 1 : Definition 1
; Term 2
: Definition 2

Note that the definition block's position does not matter, whether it is placed within the line with the term block or after the newline.

## Lists
In KotoParser, both unordered lists and ordered lists are supported. In case of unordered list, just put a bullet(*) or a dash(-) in front of the list, i.e.

* List 1
* List 2

Also, by making an indent in front of the list item, you can make a sub-list:

* List 1
 * Sub-list 1
  * Sub-list depth 2
 * Sub-list 2
* List 2
 * Sub-list 1
 * Sub-list 2

The same rule applies to the ordered list:

1. List 1
 1. Sub-list 1
 2. Sub-list 2
  1. Sub-list depth 2
 3. Sub-list 3
2. List 2
 1. Sub-list 1
 2. Sub-list 2

## Blockquote
To create a blockquote, put a greater-than sign(>) in front of the content:

> Content

Then a blockquote will be created.

## Code
You can insert a code snippet inside your document by putting the code inside the fences:

```javascript
console.log('Hello, world!')
```

You can also specify the language by writing it down besides the opening fence.

# Inline-level grammar
## Bold
**Bold text** can be written between two star(*)s.

## Emphasis
*Emphasized text*(Italic text) can be written between a star(*).

## Link
A [link](http://www.google.com/) can be written in a Markdown-style, i.e. the text goes between the brackets, and the link address goes between the following parentheses. 

## Image
![Image](https://github.com/apple-touch-icon-180x180.png)

An image can be inserted by a simple grammar similar to link. A exclamation mark(!) is followed by brackets whose content is the image's alternative text. And the image link comes wrapped in parentheses.

## Strike
In KotoParser, ~~striked~~ text can be easily used by writing the text between two tilde(~)s.

## Code
You can create an `inline code` between two grave accent symbol(`)s.