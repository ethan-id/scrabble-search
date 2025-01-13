# Scrabble Search

A Search Engine for (English) Scrabble Words

## Features

- Words are stored in a [Trie](https://en.wikipedia.org/wiki/Trie) data structure
- Real-time searching as the user types
    - User's search Input is debounced so that as they type multiple API requests are not made

## Roadmap

- [x] Show point values
- [x] Make results section a two column list of words shown like the words in the header with point values on each tile and their total score
- [x] Add route for calculating score of words (including options for DL, TL, DW, and TW tiles)
- [ ] Add filters/sorting options by point values
- [ ] Support other languages
- [ ] Add definitions for words using merriam-webster's API
- [ ] Replace JSON file of words with SQLite DB
