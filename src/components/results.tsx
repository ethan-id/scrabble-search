import {useState, useMemo} from 'react';
import {WordCard} from '@/components/word-card';
import {Select, SelectItem} from '@nextui-org/react';
import {points} from '@/literals/points';

interface ResultsProps {
    isDarkMode: boolean;
    results: string[];
}

type SortOption = 'alphabetical' | 'length' | 'points';

export const Results: React.FC<ResultsProps> = ({results, isDarkMode}) => {
    const [sortBy, setSortBy] = useState<SortOption>('alphabetical');

    const sortedResults = useMemo(() => {
        return [...results].sort((a, b) => {
            if (sortBy === 'alphabetical') return a.localeCompare(b);
            if (sortBy === 'length') return a.length - b.length;
            if (sortBy === 'points') {
                const pointsA = a
                    .split('')
                    .reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);
                const pointsB = b
                    .split('')
                    .reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);
                return pointsB - pointsA;
            }
            return 0;
        });
    }, [results, sortBy]);

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
                {/*<Select
                    label='Sort by'
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className={`max-w-xs ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'}`}
                >
                    <SelectItem value='alphabetical'>Alphabetical</SelectItem>
                    <SelectItem value='length'>Word Length</SelectItem>
                    <SelectItem value='points'>Points (High to Low)</SelectItem>
                </Select>*/}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'>
                {sortedResults.map((word) => {
                    const value = word
                        .split('')
                        .reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);

                    return <WordCard key={word} word={word} value={value} isDarkMode={isDarkMode} />;
                })}
            </div>
        </div>
    );
};
