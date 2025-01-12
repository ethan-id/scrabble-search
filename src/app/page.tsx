'use client';

import debounce from 'lodash.debounce';
import {useState, useCallback, ChangeEvent} from 'react';
import {ThemeToggle} from '@/components/theme-toggle';
import {Results} from '@/components/results';
import {Search} from '@/components/search';
import {Header} from '@/components/header';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
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

    const handleThemeToggle = (isDark: boolean) => {
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div
            className={`min-h-screen ${
                isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-800'
            } flex flex-col items-center py-12 px-4 transition-colors duration-200`}
        >
            <div className='flex flex-col items-center w-full'>
                <div className='absolute top-4 right-4'>
                    <ThemeToggle onToggle={handleThemeToggle} />
                </div>

                <Header isDarkMode={isDarkMode} />

                <Search onChange={handleChange} query={query} isDarkMode={isDarkMode} />

                {isLoading ? (
                    <div className='w-full max-w-4xl'>
                        <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Loading...
                        </p>
                    </div>
                ) : results.length > 0 ? (
                    <Results isDarkMode={isDarkMode} results={results} />
                ) : (
                    query && (
                        <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No words found.
                        </p>
                    )
                )}
            </div>
        </div>
    );
}
