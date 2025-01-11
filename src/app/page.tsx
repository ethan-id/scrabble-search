'use client';

import {useState} from 'react';
import {Button, Input} from '@nextui-org/react';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        try {
            const response = await fetch(`/api/search?prefix=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-blue-600 mb-2'>Scrabble Search</h1>
                    <p className='text-sm text-gray-600'>Find valid Scrabble words</p>
                </div>

                <form onSubmit={handleSearch} className='mb-8'>
                    <div className='flex shadow-sm'>
                        <Input
                            type='text'
                            placeholder='Enter prefix...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='flex-grow rounded-l-md focus:ring-blue-500 focus:border-blue-500'
                        />
                        <Button
                            type='submit'
                            className='bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Search
                        </Button>
                    </div>
                </form>

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

                {results.length === 0 && query && <p className='text-center text-gray-600 mt-4'>No words found.</p>}
            </div>
        </div>
    );
}
