import {FC} from 'react';
import {points} from '@/literals/points';

interface WordCardProps {
    word: string;
    isDarkMode: boolean;
}

export const WordCard: FC<WordCardProps> = ({word, isDarkMode}) => {
    const value = word.split('').reduce((sum, char) => sum + points[char.toLowerCase().charCodeAt(0) - 97], 0);

    return (
        <div
            className={`${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } rounded-lg p-3 transition-colors flex flex-col items-center justify-between`}
        >
            <p
                className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} font-medium text-lg truncate w-full text-center`}
                title={word}
            >
                {word}
            </p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>
                {value} {value === 1 ? 'point' : 'points'}
            </p>
        </div>
    );
};
