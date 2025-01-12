import {WordCard} from '@/components/word-card';
import {points} from '@/literals/points';

interface ResultsProps {
    isDarkMode: boolean;
    results: string[];
}

export const Results: React.FC<ResultsProps> = ({results, isDarkMode}) => {
    return (
        <div
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden w-full max-w-4xl`}
        >
            <div
                className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}
            >
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    Results ({results.length})
                </h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'>
                {results.map((word) => {
                    const value = word
                        .split('')
                        .reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);

                    return <WordCard key={word} word={word} value={value} isDarkMode={isDarkMode} />;
                })}
            </div>
        </div>
    );
};
