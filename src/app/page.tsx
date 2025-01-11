'use client';

import {useState, useCallback, ChangeEvent} from 'react';
import debounce from 'lodash.debounce';
import {Input} from '@nextui-org/react';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const debouncedFetch = useCallback(
        debounce(async (value: string) => {
            try {
                const response = await fetch(`/api/search?prefix=${encodeURIComponent(value)}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error(error);
            }
        }, 200),
        []
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            debouncedFetch(value);
        } else {
            setResults([]);
        }
    };

    return (
        <div className='min-h-screen bg-gray-300 flex flex-col items-center py-12 px-4'>
            <div className='w-full max-w-md'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-blue-600 mb-2'>Scrabble Search</h1>
                    <p className='text-sm text-gray-600'>Find valid Scrabble words</p>
                </div>

                {/* Input with onChange handler (no submit button) */}
                <div className='flex shadow-sm mb-8'>
                    <Input
                        type='text'
                        placeholder='Enter prefix...'
                        value={query}
                        onChange={handleChange}
                        className='flex-grow focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                        <h2 className='text-lg font-semibold text-gray-700 p-4 border-b'>Results:</h2>
                        <ul className='divide-y divide-gray-200'>
                            {results.map((word, index) => (
                                <li key={index} className='p-4 hover:bg-gray-50'>
                                    <p className='text-gray-800'>{word}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* No results message */}
                {results.length === 0 && query && <p className='text-center text-gray-600 mt-4'>No words found.</p>}
            </div>
        </div>
    );
}
