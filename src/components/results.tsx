import {FunctionComponent} from 'react';
import {points} from '@/literals/points';

interface ResultsProps {
    isDarkMode: boolean;
    results: string[];
}

export const Results: FunctionComponent<ResultsProps> = ({results, isDarkMode}) => {
    return (
        <div
            className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-md rounded-lg overflow-hidden w-full max-w-4xl`}
        >
            <h2
                className={`text-lg font-semibold ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-700'
                } p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
                Results
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4'>
                {results.map((word, index) => {
                    const value = word
                        .split('')
                        .map((_, i) => points[word.toLowerCase().charCodeAt(i) - 97])
                        .reduce((sum, num) => sum + num, 0);

                    return (
                        <div
                            key={index}
                            className={`${
                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                            } rounded p-2 text-center transition-colors`}
                        >
                            <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} truncate`} title={word}>
                                {word},{value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
