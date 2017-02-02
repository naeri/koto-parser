# Scanner

The input markdown text is browsable only through the scanner object.

## new Scanner(buffer)

| Param | Type |
| --- | --- |
| buffer | `string` | 

## scanner.buffer : `string`
The original markdown text input

## scanner.position : `number`
The index of where the scanner is currently reading

## scanner.markers : `number`
The stack of positions marked by [mark](#Scanner+mark)

## scanner.length : `number`
The length of the input text

## scanner.currentChar : `string`
The character the scanner is currently reading

## scanner.isAtBegin : `boolean`
Whether the scanner is reading the very first character of the input

## scanner.isAtEnd : `boolean`
Whether the scanner is reading the very last character of the input

## scanner.isAtLineEnd : `boolean`
Whether the scanner is reading the end-of-line or end-of-file

## scanner.getCharAt(position) ⇒`string`
Get the character by its position

| Param | Type |
| --- | --- |
| position | `number` | 

## scanner.getCharAtOffset(offset) ⇒`string`
Get the character by its relative position from current position

| Param | Type |
| --- | --- |
| offset | `number` | 

**Example**  
```js
// returns the character right behind
getCharAtOffset(-1)
```

## scanner.ahead(substring) ⇒`boolean`
Compare the given substring with the current character and the characters ahead of it

| Param | Type |
| --- | --- |
| substring | `string` | 

## scanner.mark()
Mark current position

## scanner.pop() ⇒`string`
Get the substring between the current position and the last marked position

## scanner.popAndBack()
Move back to the last marked position

## scanner.popAll()
Clear all marked positions

## scanner.skip(length)
Move scanner position by given length.
Use positive numbers for moving forward, and negative numbers for backward.

| Param | Type |
| --- | --- |
| length | `number` | 

## scanner.skipLineSpaces()
Skip whitespaces if they exist immediately right ahead

## scanner.skipLineEnds()
Skip line breaks if they exist immediately right ahead

## scanner.skipToLineEnd()
Move scanner forward until the whitespace character comes out

## scanner.find(substring) ⇒`boolean`
Find and move to the nearest given substring ahead
**Returns**: `boolean` - Whether the scanner found the substring  

| Param | Type |
| --- | --- |
| substring | `string` | 

## Scanner.isLineSpace(char) ⇒`boolean`
Check if the given character is a whitespace

**Kind**: static method of `[Scanner](#Scanner)`  

| Param | Type |
| --- | --- |
| char | `string` | 

## Scanner.isLineEnd(char) ⇒`boolean`
Check if the given character is an end-of-line or an end-of-file

**Kind**: static method of `[Scanner](#Scanner)`  

| Param | Type |
| --- | --- |
| char | `string` | 

