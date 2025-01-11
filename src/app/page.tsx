'use client';

import {useState, useCallback, ChangeEvent} from 'react';
import debounce from 'lodash.debounce';
import {ThemeToggle} from '@/components/ThemeToggle';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

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
            className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} flex flex-col items-center py-12 px-4 transition-colors duration-200`}
        >
            <div className='flex flex-col items-center w-full'>
                {/* Theme Toggle */}
                <div className='absolute top-4 right-4'>
                    <ThemeToggle onToggle={handleThemeToggle} />
                </div>

                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                        Scrabble Search
                    </h1>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Find valid (English) Scrabble words
                    </p>
                </div>

                {/* Input with onChange handler (no submit button) */}
                <div className='flex shadow-sm mb-8 max-w-md w-full'>
                    <input
                        type='text'
                        placeholder='Enter prefix...'
                        value={query}
                        onChange={handleChange}
                        className={`flex-grow min-w-[20vw] ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                    />
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden w-full max-w-4xl`}
                    >
                        <h2
                            className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                        >
                            Results:
                        </h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4'>
                            {results.map((word, index) => (
                                <div
                                    key={index}
                                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded p-2 text-center transition-colors`}
                                >
                                    <p
                                        className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} truncate`}
                                        title={word}
                                    >
                                        {word}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No results message */}
                {results.length === 0 && query && (
                    <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>
                        No words found.
                    </p>
                )}
            </div>
        </div>
    );
}
