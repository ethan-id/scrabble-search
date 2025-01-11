import {Trie} from './trie';
import words from '../../public/data/dictionary.json'; // Assume JSON array of words

export const buildTrie = (): Trie => {
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word.toUpperCase());
    }
    return trie;
};
