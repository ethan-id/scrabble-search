'use client';

import debounce from 'lodash.debounce';
import {useState, useCallback, ChangeEvent} from 'react';
import {Results} from '@/components/results';
import {Search} from '@/components/search';
import {Header} from '@/components/header';
import {Spinner} from '@nextui-org/react';
import Link from 'next/link';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedFetch = useCallback(
        debounce(async (value: string) => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?prefix=${encodeURIComponent(value)}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
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
            setIsLoading(false);
        }
    };

    return (
        <div
            className={
                'min-h-screen bg-zinc-300 text-gray-800 flex flex-col items-center py-12 px-4 transition-colors duration-200'
            }
        >
            <div className='flex flex-col items-center w-full'>
                <div className='absolute flex justify-center items-center top-4 right-4 gap-4'>
                    <Link href='/calculator'>
                        <CalculateIcon fontSize={'large'} />
                    </Link>
                </div>

                <Header title={'scrabble'} subtitle={'search'} />

                <Search onChange={handleChange} query={query} />

                {isLoading ? (
                    <div className='flex justify-center items-center w-full h-96'>
                        <Spinner size='lg' />
                    </div>
                ) : results.length > 0 ? (
                    <Results results={results} />
                ) : (
                    query && <p className={'text-center mt-4 text-gray-600'}>No words found.</p>
                )}
            </div>
        </div>
    );
}
