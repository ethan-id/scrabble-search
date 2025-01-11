import {NextResponse} from 'next/server';
import {buildTrie} from '@/utils/build-trie';

// Build the Trie only once on initial import
const trie = buildTrie();

export async function GET(request: Request) {
    // Parse query parameters
    const {searchParams} = new URL(request.url);
    const prefix = searchParams.get('prefix');

    // Validate the prefix
    if (!prefix) {
        return NextResponse.json({message: 'Please provide a valid prefix string'}, {status: 400});
    }

    // Use the trie to find words that start with `prefix`
    const results = trie.startsWith(prefix.toUpperCase());

    // Return results as JSON
    return NextResponse.json({results});
}
