export interface TrieNode {
    children: {[key: string]: TrieNode};
    isEndOfWord: boolean;
}

export class Trie {
    private root: TrieNode;

    constructor() {
        this.root = {children: {}, isEndOfWord: false};
    }

    insert(word: string): void {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = {children: {}, isEndOfWord: false};
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isEndOfWord;
    }

    startsWith(prefix: string): string[] {
        // Return all words in the trie that start with this prefix
        const results: string[] = [];
        let current = this.root;

        // Navigate to the node corresponding to the prefix
        for (const char of prefix) {
            if (!current.children[char]) {
                return results; // empty array if prefix not found
            }
            current = current.children[char];
        }

        this.collectAllWords(current, prefix, results);
        return results;
    }

    private collectAllWords(node: TrieNode, prefix: string, results: string[]): void {
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        for (const [char, childNode] of Object.entries(node.children)) {
            this.collectAllWords(childNode, prefix + char, results);
        }
    }
}
